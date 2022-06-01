import { FriendStatus } from '../../graphql/generated/graphql';

type User = {
  id: number;
  username: string;
  friendStatus: FriendStatus;
  name?: string;
};

export default User;
