import { ActionIcon, Center, Indicator, Menu } from '@mantine/core';
import { IconBell } from '@tabler/icons';
import { useLiveNotifications } from 'context/LiveNotificationsContext';
import {
  ChatAccessAlertComponentFragment,
  FriendRequestComponentFragment,
} from 'graphql/generated/graphql';
import ChatAccessAlert from './ChatAccessAlert';
import FriendRequest from './FriendRequest';

type Props = {
  size?: number;
};

const NotificationMenu = ({ size = 16 }: Props) => {
  const { notifications } = useLiveNotifications();

  const friendRequests =
    (notifications?.filter(
      (x) => x.__typename === 'FriendRequest'
    ) as FriendRequestComponentFragment[]) ?? [];

  const chatAccessAlerts =
    (notifications?.filter(
      (x) =>
        x.__typename &&
        [
          'ChatAdminAccessRevokedAlert',
          'ChatAdminAccessGrantedAlert',
          'ChatMemberAccessRevokedAlert',
          'ChatMemberAccessGrantedAlert',
        ].includes(x.__typename)
    ) as ChatAccessAlertComponentFragment[]) ?? [];

  const totalNotifications = friendRequests.length + chatAccessAlerts.length;
  return (
    <Menu width={'max-content'} shadow="md">
      <Menu.Target>
        <Indicator
          color={'red'}
          label={friendRequests.length}
          disabled={friendRequests.length === 0}
        >
          <ActionIcon variant="default">
            <IconBell size={size} />
          </ActionIcon>
        </Indicator>
      </Menu.Target>
      <Menu.Dropdown>
        {totalNotifications !== 0 ? (
          <>
            {friendRequests.length !== 0 && (
              <>
                <Menu.Label>
                  <Center>Friend Requests</Center>
                </Menu.Label>
                {friendRequests.map((request) => (
                  <Menu.Item key={request.id}>
                    <FriendRequest key={request.id} request={request} />
                  </Menu.Item>
                ))}
              </>
            )}
            {chatAccessAlerts.length !== 0 && (
              <>
                <Menu.Label>
                  <Center>Chat Alerts</Center>
                </Menu.Label>
                {chatAccessAlerts.map((alert) => (
                  <Menu.Item key={alert.id}>
                    <ChatAccessAlert key={alert.id} alert={alert} />
                  </Menu.Item>
                ))}
              </>
            )}
          </>
        ) : (
          <Menu.Label>
            <Center>No notifications</Center>
          </Menu.Label>
        )}
      </Menu.Dropdown>
    </Menu>
  );
};

export default NotificationMenu;
