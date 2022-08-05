import { RequestStatus } from '../../../graphql/generated/graphql';
import FriendMenu from './FriendMenu';
import FriendRequestReceivedMenu from './FriendRequestReceivedMenu';
import FriendRequestSentMenu from './FriendRequestSentMenu';
import StrangerMenu from './StrangerMenu';

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
    const request = user.friendRequest;
    if (request && ['SENT', 'SEEN'].includes(request.status)) {
      return request.isCreator ? (
        <FriendRequestSentMenu requestId={request.id} recipientId={user.id} />
      ) : (
        <FriendRequestReceivedMenu request={user.friendRequest} />
      );
    }
    return <StrangerMenu stranger={user} />;
  }
};

export default UserMenu;
