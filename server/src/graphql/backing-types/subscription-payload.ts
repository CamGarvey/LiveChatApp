export type SubscriptionPayload<T = any> = {
  recipients: number[];
  content: T;
};
