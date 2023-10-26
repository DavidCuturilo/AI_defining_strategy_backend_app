import { ChatCompletionRole } from 'openai/resources/chat';

export class GenerateChatResponseDto {
  role: ChatCompletionRole;
  content: string;
}
