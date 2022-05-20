import { Avatar, Flex, Text } from '@chakra-ui/react';

type Props = {
  name: string;
};

const ChannelItem = ({ name }: Props) => {
  return (
    <Flex
      gap={3}
      _hover={{ backgroundColor: 'blue.100' }}
      cursor={'pointer'}
      p={3}
    >
      <Avatar
        size="sm"
        name={name}
        src={`https://avatars.dicebear.com/api/initials/${name}.svg`}
      />
      <Text alignSelf={'center'}>{name}</Text>
    </Flex>
  );
};

export default ChannelItem;
