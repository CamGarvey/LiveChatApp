type SubscriptionPayload<T = any> = {
  recipients: number[];
  content: T;
};

export default SubscriptionPayload;
