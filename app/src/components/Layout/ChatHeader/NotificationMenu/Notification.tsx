import { gql } from '@apollo/client';
import { NotificationComponentNotificationFragment } from 'graphql/generated/graphql';
import Alert from './Alert';
import { FriendRequest } from './FriendRequest';

type Props = {
  notification: NotificationComponentNotificationFragment;
};

const Notification = ({ notification }: Props) => {
  console.log({ notification });

  switch (notification.__typename) {
    case 'FriendRequest':
      return <FriendRequest request={notification} />;
    case 'ChatAdminAccessGrantedAlert':
    case 'ChatAdminAccessRevokedAlert':
    case 'ChatMemberAccessGrantedAlert':
    case 'ChatMemberAccessRevokedAlert':
    case 'ChatDeletedAlert':
    case 'FriendDeletedAlert':
    case 'RequestAcceptedAlert':
    case 'RequestDeclinedAlert':
      return <Alert alert={notification} />;
    default:
      return <></>;
  }
};

Notification.fragments = {
  notification: gql`
    fragment NotificationComponentNotification on Notification {
      ... on FriendRequest {
        ...FriendRequestComponentRequest
      }
      ... on Alert {
        ...AlertComponentAlert
      }
    }
    ${FriendRequest.fragments.request}
    ${Alert.fragments.alert}
  `,
};

export default Notification;
