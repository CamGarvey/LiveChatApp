import React from 'react';
import { IoMdMailUnread } from 'react-icons/io';
import { BiMailSend } from 'react-icons/bi';
import { User } from '../../graphql/generated/graphql';
import FriendStatus from '../../models/friend-status';
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
  user: User;
  friendStatus: FriendStatus;
  onSendFriendRequestClicked?: () => void;
  onUnFriendClicked?: () => void;
  onCancelRequest?: () => void;
  onAcceptFriendRequest?: () => void;
  onDeleteFriendRequest?: () => void;
};

const UserItem = ({ user, friendStatus, onUnFriendClicked }: Props) => {
  const { name, username } = user;

  let menu: React.ReactElement;

  switch (friendStatus) {
    case FriendStatus.Friends:
      menu = (
        <Menu>
          <Menu.Item onClick={onUnFriendClicked}>Unfriend</Menu.Item>
        </Menu>
      );
      break;
    case FriendStatus.NotFriends:
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
      <Text>{name}</Text>
      <Text>{username}</Text>
      <Box ml={'auto'}>{menu}</Box>
    </UnstyledButton>
  );
};

export default UserItem;
