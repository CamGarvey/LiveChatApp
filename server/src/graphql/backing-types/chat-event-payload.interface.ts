import { ChatEvent } from './chat-event.type';

export interface ChatEventPayload {
  chatId: string;
  event: ChatEvent;
}
