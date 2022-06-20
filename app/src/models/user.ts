import { FriendStatus } from '../graphql/generated/graphql';

export type User = {
  id: string;
  username: string;
  friendStatus: FriendStatus;
  name?: string;
};
