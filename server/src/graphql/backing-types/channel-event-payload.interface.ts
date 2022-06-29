import { ChannelEvent } from './channel-event.type';

export interface ChannelEventPayload {
  channelId: string;
  event: ChannelEvent;
}
