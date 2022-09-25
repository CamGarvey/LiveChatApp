import { Alert, Chat, Event, Request } from '@prisma/client';
/**
 * Events in a chat
 */
export type EventPayload = {
  recipients: number[];
  content: Event;
};

export type NotificationPayload = {
  recipients: number[];
  content: Alert | Request;
};

export type ChatPayload = {
  recipients: number[];
  content: Chat;
};
