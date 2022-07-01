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
import FriendRequest from '../../shared/FriendRequest';

type Props = {
  size?: number;
  friendRequests: { id: string; name?: string; username: string }[];
};

const NotificationMenu = ({ friendRequests, size = 16 }: Props) => {
  return (
    <Menu
      size={'xl'}
      control={
        <Indicator color={'red'} disabled>
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
              <FriendRequest key={request.id} {...request} />
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
