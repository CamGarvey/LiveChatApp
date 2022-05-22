import {
  Avatar,
  Box,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { BsPersonCheck, BsPersonPlus } from 'react-icons/bs';
import { IoMdMailUnread } from 'react-icons/io';
import { BiMailSend } from 'react-icons/bi';
import { User } from '../../graphql/generated/graphql';
import FriendStatus from '../../models/friend-status';

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
          <MenuButton as={IconButton} icon={<BsPersonCheck />}></MenuButton>
          <MenuList>
            <MenuItem>Unfriend</MenuItem>
          </MenuList>
        </Menu>
      );
      break;
    case FriendStatus.NotFriends:
      menu = <IconButton aria-label="Add user" icon={<BsPersonPlus />} />;
      break;
    case FriendStatus.RequestSent:
      menu = <BiMailSend />;
      break;
    case FriendStatus.RequestReceived:
      menu = <IoMdMailUnread />;
      break;
  }

  return (
    <Flex
      gap={3}
      borderRadius={'5'}
      _hover={{ backgroundColor: 'blue.100' }}
      cursor={'pointer'}
      p={3}
    >
      <Avatar
        size="sm"
        name={name}
        src={`https://avatars.dicebear.com/api/initials/${name}.svg`}
        alignSelf={'center'}
      />
      <Text alignSelf={'center'}>{name}</Text>
      <Text alignSelf={'center'}>{username}</Text>
      <Box marginLeft={'auto'}>{menu}</Box>
    </Flex>
  );
};

export default UserItem;
