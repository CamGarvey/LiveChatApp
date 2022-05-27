import { Avatar, Flex, Text } from '@chakra-ui/react';

type Props = {
  name: string;
  memberCount: number;
  onClick?: () => void;
};

const ChannelItem = ({ name, memberCount, onClick }: Props) => {
  return (
    <Flex
      gap={3}
      _hover={{ backgroundColor: 'blue.100' }}
      cursor={'pointer'}
      p={3}
      onClick={onClick}
    >
      <Avatar
        size="sm"
        name={name}
        src={`https://avatars.dicebear.com/api/initials/${name}.svg`}
      />
      <Text alignSelf={'center'}>{name}</Text>
      <Text marginLeft={'auto'}>{memberCount}</Text>
    </Flex>
  );
};

export default ChannelItem;
