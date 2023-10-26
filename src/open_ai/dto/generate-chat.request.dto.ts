import { ChatMessageRequestDto } from './chat-message.request.dto';

export interface GenerateChatRequestDto {
  chat_configuration: ChatConfiguration;
  messages: ChatMessageRequestDto[];
}

export enum ChatConfiguration {
  STRATEGY = 'Strategy',
  OTHER = 'Other',
}
