import { Avatar, Flex, IconButton, Text } from '@chakra-ui/react';
import React from 'react';
import { GrFormClose } from 'react-icons/gr';

type Props = {
  name: string;
};

const UserItem = ({ name }: Props) => {
  console.log(name);

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
      <IconButton
        aria-label="close"
        icon={<GrFormClose />}
        marginLeft={'auto'}
      />
    </Flex>
  );
};

export default UserItem;
