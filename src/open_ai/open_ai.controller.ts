import { GenerateChatRequestDto } from './dto/generate-chat.request.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { OpenAiService } from './open_ai.service';
import { GenerateStrategyRequestDto } from './dto/generate-strategy.request.dto';

@Controller('open-ai')
export class OpenAiController {
  constructor(private readonly openAIService: OpenAiService) {}
  @Post('chat')
  async chat(@Body() generateChatRequestData: GenerateChatRequestDto) {
    return await this.openAIService.chat(generateChatRequestData);
  }

  @Post('strategy')
  async generateStrategy(@Body() data: GenerateStrategyRequestDto) {
    return await this.openAIService.generateStrategy(data);
  }
}
