import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserRequestDto } from './dto/login-user.request.dto';
import { RegisterUserRequestDto } from './dto/register-user.request.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginUserDto: LoginUserRequestDto) {
    return await this.authService.login(loginUserDto);
  }

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserRequestDto) {
    return await this.authService.register(registerUserDto);
  }
}
