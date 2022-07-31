import { RequestStatus } from '../../../graphql/generated/graphql';
import FriendMenu from './FriendMenu';
import FriendRequestReceivedMenu from './FriendRequestReceivedMenu';
import FriendRequestSentMenu from './FriendRequestSentMenu';

type Props = {
  user:
    | {
        __typename?: 'Friend';
        id: any;
        name?: string;
        username: string;
      }
    | {
        __typename?: 'Me';
        id: any;
        name?: string;
        username: string;
      }
    | {
        __typename?: 'Stranger';
        id: any;
        name?: string;
        username: string;
        friendRequest?: {
          id: string;
          status: RequestStatus;
          isCreator: boolean;
        };
      };
};

const UserMenu = ({ user }: Props) => {
  if (user.__typename === 'Friend') {
    return <FriendMenu user={user} />;
  }

  if (user.__typename === 'Stranger') {
    if (user.friendRequest) {
      return user.friendRequest.isCreator ? (
        <FriendRequestSentMenu request={user.friendRequest} />
      ) : (
        <FriendRequestReceivedMenu request={user.friendRequest} />
      );
    }
  }
};

export default UserMenu;
