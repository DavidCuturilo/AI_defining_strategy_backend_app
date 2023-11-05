import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from 'src/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from 'src/config/config.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register(configService.getJwtConfig()),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
