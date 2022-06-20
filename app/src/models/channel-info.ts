import { FriendStatus } from '../graphql/generated/graphql';

export type ChannelInfo = {
  id: string;
  name: string;
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
