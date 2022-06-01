import React from 'react';
import { IoMdMailUnread } from 'react-icons/io';
import { BiMailSend } from 'react-icons/bi';
import { FriendStatus, User } from '../../graphql/generated/graphql';
import {
  ActionIcon,
  Avatar,
  Box,
  Menu,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { UserPlus } from 'tabler-icons-react';

type Props = {
  user: {
    id: number;
    name?: string;
    username: string;
    friendStatus: FriendStatus;
  };
};

const UserItem = ({ user }: Props) => {
  const { name, username, friendStatus } = user;

  let menu: React.ReactElement;

  switch (friendStatus) {
    case FriendStatus.Friend:
      menu = (
        <Menu>
          <Menu.Item>Unfriend</Menu.Item>
        </Menu>
      );
      break;
    case FriendStatus.NotFriend:
      menu = (
        <ActionIcon aria-label="Add user">
          <UserPlus />
        </ActionIcon>
      );
      break;
    case FriendStatus.RequestSent:
      menu = <BiMailSend />;
      break;
    case FriendStatus.RequestReceived:
      menu = <IoMdMailUnread />;
      break;
  }

  return (
    <UnstyledButton
      sx={(theme) => ({
        display: 'flex',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        gap: '20px',
        color:
          theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
        },
      })}
    >
      <Avatar
        size="sm"
        src={`https://avatars.dicebear.com/api/initials/${name}.svg`}
      />
      {/* <Text>{name}</Text> */}
      <Text>{username}</Text>
      <Box ml={'auto'}>{menu}</Box>
    </UnstyledButton>
  );
};

export default UserItem;
