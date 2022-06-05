import { FriendStatus } from '../../graphql/generated/graphql';

type User = {
  id: string;
  username: string;
  friendStatus: FriendStatus;
  name?: string;
};

export default User;
