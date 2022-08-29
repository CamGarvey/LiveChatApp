import { ActionIcon, Center, Indicator, Menu } from '@mantine/core';
import { IconBell } from '@tabler/icons';
import { useLiveNotifications } from 'context/LiveNotificationsContext';
import { FriendRequestNotificationFragment } from 'graphql/generated/graphql';
import FriendRequestNotification from './FriendRequestNotification';

type Props = {
  size?: number;
};

const NotificationMenu = ({ size = 16 }: Props) => {
  const { notifications } = useLiveNotifications();

  const friendRequests =
    (notifications?.filter(
      (x) => x.__typename === 'FriendRequest'
    ) as FriendRequestNotificationFragment[]) ?? [];

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
        {friendRequests.length !== 0 ? (
          <>
            <Menu.Label>
              <Center>Friend Requests</Center>
            </Menu.Label>
            {friendRequests.map((request) => (
              <Menu.Item key={request.id}>
                <FriendRequestNotification key={request.id} request={request} />
              </Menu.Item>
            ))}
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
