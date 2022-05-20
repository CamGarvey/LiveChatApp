import { Avatar, Flex, IconButton, Text } from '@chakra-ui/react';
import React from 'react';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { MdOutlinePersonAddAlt, MdPersonRemoveAlt1 } from 'react-icons/md';
import { User } from '../../graphql/generated/graphql';
import FriendStatus from '../../models/friend-status';

type Props = {
  user: User;
  friendStatus: FriendStatus;
};

const UserItem = ({ user, friendStatus }: Props) => {
  const { name, username } = user;

  let icon: React.ReactElement;

  switch (friendStatus) {
    case FriendStatus.Friends:
      icon = <MdPersonRemoveAlt1 />;
      break;
    case FriendStatus.NotFriends:
      icon = <MdOutlinePersonAddAlt />;
      break;
    case FriendStatus.RequestSent:
    case FriendStatus.RequestReceived:
      icon = <BsFillInfoCircleFill />;
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
      <IconButton aria-label="close" icon={icon} marginLeft={'auto'} />
    </Flex>
  );
};

export default UserItem;
