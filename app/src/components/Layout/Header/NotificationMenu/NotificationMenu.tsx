import {
  ActionIcon,
  Center,
  Indicator,
  Menu,
  Stack,
  Title,
} from '@mantine/core';
import { Bell } from 'tabler-icons-react';
import { useUserNotifications } from 'context/NotificationContext';
import { FriendRequest as FriendRequestObject } from 'graphql/generated/graphql';
import FriendRequest from './FriendRequest';

type Props = {
  size?: number;
};

const NotificationMenu = ({ size = 16 }: Props) => {
  const { notifications } = useUserNotifications();

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
                <FriendRequest key={request.id} request={request} />
              </Menu.Item>
            ))}
          </>
        ) : (
          <Menu.Item>No notifications</Menu.Item>
        )}
      </Menu.Dropdown>
    </Menu>
  );
};

export default NotificationMenu;
