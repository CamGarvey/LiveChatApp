import React from 'react';
import { BsPersonCheck, BsPersonPlus } from 'react-icons/bs';
import { IoMdMailUnread } from 'react-icons/io';
import { BiMailSend } from 'react-icons/bi';
import { User } from '../../graphql/generated/graphql';
import FriendStatus from '../../models/friend-status';
import {
  ActionIcon,
  Avatar,
  Box,
  Group,
  Menu,
  Stack,
  Text,
} from '@mantine/core';
import { UserPlus } from 'tabler-icons-react';

type Props = {
  user: User;
  friendStatus: FriendStatus;
};

const UserItem = ({ user, friendStatus }: Props) => {
  const { name, username } = user;

  let menu: React.ReactElement;

  switch (friendStatus) {
    case FriendStatus.Friends:
      menu = (
        <Menu>
          <Menu.Item>Unfriend</Menu.Item>
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
    <Group style={{ cursor: 'pointer' }}>
      <Avatar
        size="sm"
        src={`https://avatars.dicebear.com/api/initials/${name}.svg`}
      />
      <Text>{name}</Text>
      <Text>{username}</Text>
      <Box ml={'auto'}>{menu}</Box>
    </Group>
  );
};

export default UserItem;
