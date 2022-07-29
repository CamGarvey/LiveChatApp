import {
  ActionIcon,
  Center,
  Indicator,
  Menu,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import React from 'react';
import { Bell } from 'tabler-icons-react';
import { useUserNotifications } from '../../../context/NotificationContext';
import { FriendRequest as FriendRequestObject } from '../../../graphql/generated/graphql';
import FriendRequest from '../../shared/FriendRequest';
// import FriendRequest from '../../shared/FriendRequest';

type Props = {
  size?: number;
};

const NotificationMenu = ({ size = 16 }: Props) => {
  const { isLoading, notifications } = useUserNotifications();

  const friendRequests = notifications.filter(
    (x) => x.__typename === 'FriendRequest'
  ) as FriendRequestObject[];

  return (
    <Menu
      size={'xl'}
      control={
        <Indicator color={'red'} disabled={friendRequests.length === 0}>
          <ActionIcon variant="default">
            <Bell size={size} />
          </ActionIcon>
        </Indicator>
      }
    >
      <Stack>
        {friendRequests.length ? (
          <>
            <Center>
              <Title order={6}>Friend Requests</Title>
            </Center>
            {friendRequests.map((request) => (
              <FriendRequest key={request.id} request={request} />
            ))}
          </>
        ) : (
          <Center>
            <Text>No notifications</Text>
          </Center>
        )}
      </Stack>
    </Menu>
  );
};

export default NotificationMenu;
