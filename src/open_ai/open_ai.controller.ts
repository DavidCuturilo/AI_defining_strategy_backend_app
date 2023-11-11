import { GenerateChatRequestDto } from './dto/generate-chat.request.dto';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { OpenAiService } from './open_ai.service';
import { GenerateStrategyRequestDto } from './dto/generate-strategy.request.dto';
import { SaveStrategyRequestDto } from './dto/save-strategy.request.dto';

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

  @Post('save-strategy')
  async saveStrategy(@Body() data: SaveStrategyRequestDto) {
    return await this.openAIService.saveStrategy(data);
  }

  @Get('saved-tactics/:id')
  async getSavedTactics(@Param('id') userId: string) {
    return await this.openAIService.getSavedTactics(+userId);
  }

  @Delete('saved-tactics/:id')
  async removeStrategy(@Param('id') strategyId: string) {
    return await this.openAIService.removeStrategy(+strategyId);
  }
}
