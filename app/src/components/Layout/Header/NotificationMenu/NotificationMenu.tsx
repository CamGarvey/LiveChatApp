import { ActionIcon, Center, Indicator, Menu } from '@mantine/core';
import { Bell } from 'tabler-icons-react';
import { useLiveNotifications } from 'context/LiveNotificationsContext';
import { FriendRequest as FriendRequestObject } from 'graphql/generated/graphql';
import FriendRequestNotification from './FriendRequestNotification';

type Props = {
  size?: number;
};

const NotificationMenu = ({ size = 16 }: Props) => {
  const { notifications } = useLiveNotifications();

  const friendRequests =
    (notifications?.filter(
      (x) => x.__typename === 'FriendRequest'
    ) as FriendRequestObject[]) ?? [];

  return (
    <Menu width={200} shadow="md">
      <Menu.Target>
        <Indicator color={'red'} disabled={friendRequests.length === 0}>
          <ActionIcon variant="default">
            <Bell size={size} />
          </ActionIcon>
        </Indicator>
      </Menu.Target>
      <Menu.Dropdown>
        {friendRequests.length ? (
          <>
            <Menu.Item>
              <Center>Friend Requests</Center>
            </Menu.Item>
            {friendRequests.map((request) => (
              <Menu.Item>
                <FriendRequestNotification key={request.id} request={request} />
              </Menu.Item>
            ))}
          </>
        ) : (
          <Menu.Item>
            <Center>No notifications</Center>
          </Menu.Item>
        )}
      </Menu.Dropdown>
    </Menu>
  );
};

export default NotificationMenu;
