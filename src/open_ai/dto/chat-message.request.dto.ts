import { ChatCompletionRole } from 'openai/resources/chat';

export class ChatMessageRequestDto {
  role: ChatCompletionRole;
  content: string;
}
