import { GenerateChatResponseDto } from './dto/generate-chat.response.dto';
import { Injectable, Logger } from '@nestjs/common';
import OpenAI from 'openai';
import { configService } from 'src/config/config.service';
import { ChatMessageRequestDto } from './dto/chat-message.request.dto';
import { GenerateStrategyRequestDto } from './dto/generate-strategy.request.dto';
import {
  ChatConfiguration,
  GenerateChatRequestDto,
} from './dto/generate-chat.request.dto';

@Injectable()
export class OpenAiService {
  logger = new Logger('OpenAI Service');
  private openAI: OpenAI;
  constructor() {
    this.openAI = new OpenAI({
      apiKey: configService.getValue('OPENAI_API_KEY'),
    });
  }

  async chat(
    generateChatRequestData: GenerateChatRequestDto,
  ): Promise<GenerateChatResponseDto> {
    const { chat_configuration, messages } = generateChatRequestData;

    const systemContentRole =
      chat_configuration == ChatConfiguration.STRATEGY
        ? `professional football analyst with long history of coaching football clubs in the Premier League`
        : `helpful assistant`;

    const allMessages: ChatMessageRequestDto[] = [
      { role: 'system', content: `You are ${systemContentRole}` },
      ...messages,
    ];

    const chatGPT = await this.openAI.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: allMessages,
      temperature: 0.7,
    });

    this.logger.log(
      `ChatGPT response message: ${chatGPT.choices[0].message.content}`,
    );
    return chatGPT.choices[0].message;
  }

  async generateStrategy(generateStrategyRequest: GenerateStrategyRequestDto) {
    const strategy = generateStrategyRequest.desiredStrategy.join(', ');
    const message = `I need help. My team ${generateStrategyRequest.club} is playing against ${generateStrategyRequest.opponentClub} this week. 
    Please provide me a competetive strategy against this team including ${strategy} strategy. 
    Also, write me their strengths and weaknesses and some important things you know. 
    When you mention ${generateStrategyRequest.club} say 'your club ${generateStrategyRequest.club}'.`;

    const messages: ChatMessageRequestDto[] = [
      {
        role: 'system',
        content: `You are professional football analyst with long history of coaching football clubs in the Premier League`,
      },
      { role: 'user', content: message },
    ];

    const chatGPT = await this.openAI.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages,
      temperature: 0.7,
    });

    return { message: chatGPT.choices[0].message.content };
  }
}
