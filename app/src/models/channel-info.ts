import { FriendStatus } from '../graphql/generated/graphql';

export type ChatInfo = {
  id: string;
  name: string;
  description?: string;
  createdAt: any;
  createdBy: {
    id: string;
    name?: string;
    username: string;
  };
  members: {
    id: string;
    name?: string;
    username: string;
    friendStatus: FriendStatus;
  }[];
};
