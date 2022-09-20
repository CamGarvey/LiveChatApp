import { NexusGenInterfaces } from 'src/nexus';

export type SubscriptionPayload<T = any> = {
  recipients: number[];
  content: T;
};

export type NotificationPayload = {
  recipients: number[];
  content: NexusGenInterfaces['Notification'];
};
