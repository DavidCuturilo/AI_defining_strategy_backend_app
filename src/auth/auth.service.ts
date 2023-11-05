import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { configService } from 'src/config/config.service';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginUserRequestDto } from './dto/login-user.request.dto';
import { comparePassword, encodePassword } from 'src/utils/bcrypt';
import { RegisterUserRequestDto } from './dto/register-user.request.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(registerUserDto: RegisterUserRequestDto) {
    const hashedPassword = await encodePassword(registerUserDto.password);
    const userExist = await this.userRepository.findOne({
      where: { username: registerUserDto.username },
    });

    if (userExist) {
      throw new HttpException('Bad Request', HttpStatus.NOT_ACCEPTABLE);
    }

    const userData: RegisterUserRequestDto = {
      name: registerUserDto.name,
      lastname: registerUserDto.lastname,
      username: registerUserDto.username,
      password: hashedPassword,
    };
    const user = await this.userRepository.save(userData);
    if (user) {
      console.log('User successfully registered');
      const payload = {
        sub: user.id,
        username: user.username,
        name: user.name,
        lastname: user.lastname,
      };
      const access_token = this.jwtService.sign(payload, {
        secret: configService.getValue('JWT_SECRET'),
        expiresIn: '1h',
      });
      return {
        access_token: access_token,
        expiresIn: 3600,
      };
    }
    throw new HttpException(
      'Error in registration process.',
      HttpStatus.BAD_REQUEST,
    );
  }

  async login(loginUserDto: LoginUserRequestDto) {
    const { username, password } = loginUserDto;
    const user = await this.userRepository.findOne({
      where: { username },
    });
    if (user) {
      const matched = comparePassword(password, user.password);
      if (matched) {
        console.log('Successfully logged in user.');
        const payload = {
          sub: user.id,
          username: user.username,
          name: user.name,
          lastname: user.lastname,
        };
        const access_token = this.jwtService.sign(payload, {
          secret: configService.getValue('JWT_SECRET'),
          expiresIn: '1h',
        });
        return {
          access_token: access_token,
          expiresIn: 3600,
        };
      } else {
        console.log('Passwords do not match.');
        throw new HttpException(
          'Passwords do not match.',
          HttpStatus.UNAUTHORIZED,
        );
      }
    }
    throw new HttpException('User does not exist.', HttpStatus.BAD_REQUEST);
  }
}
