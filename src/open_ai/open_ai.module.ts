import { Module } from '@nestjs/common';
import { OpenAiController } from './open_ai.controller';
import { OpenAiService } from './open_ai.service';
import { Strategy } from 'src/entities/strategy.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Strategy, User])],
  controllers: [OpenAiController],
  providers: [OpenAiService],
})
export class OpenAiModule {}
