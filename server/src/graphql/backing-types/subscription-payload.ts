import { NexusGenInterfaces } from 'src/nexus';

export type SubscriptionPayload<T = any> = {
  recipients: number[];
  content: T;
};

export type RequestPayload = {
  recipients: number[];
  request: NexusGenInterfaces['Request'];
};

export type AlertPayload = {
  recipients: number[];
  alert: NexusGenInterfaces['Alert'];
};
