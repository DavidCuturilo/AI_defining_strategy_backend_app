import { Module } from '@nestjs/common';
import { OpenAiController } from './open_ai.controller';
import { OpenAiService } from './open_ai.service';

@Module({
  controllers: [OpenAiController],
  providers: [OpenAiService],
})
export class OpenAiModule {}
