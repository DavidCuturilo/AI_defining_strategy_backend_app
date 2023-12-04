import { Module } from '@nestjs/common';
import { OpenAiController } from './open_ai.controller';
import { OpenAiService } from './open_ai.service';
import { Strategy } from 'src/entities/strategy.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { configService } from 'src/config/config.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Strategy, User]),
    JwtModule.register(configService.getJwtConfig()),
  ],
  controllers: [OpenAiController],
  providers: [OpenAiService],
})
export class OpenAiModule {}
