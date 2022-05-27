import { Avatar, Box, Checkbox, Flex, Text } from '@chakra-ui/react';
import { User } from '../../graphql/generated/graphql';

type Props = {
  username: string;
  name?: string;
  selected: boolean;
  onClick: () => void;
};

const UserItem = ({ username, name, selected, onClick }: Props) => {
  return (
    <Flex
      gap={3}
      borderRadius={'5'}
      _hover={{ backgroundColor: 'blue.100' }}
      cursor={'pointer'}
      p={3}
      outline={selected && '2px solid #c9e0e7'}
      background={selected && '#f4faff'}
      onClick={onClick}
    >
      <Avatar
        size="sm"
        name={username}
        src={`https://avatars.dicebear.com/api/initials/${username}.svg`}
        alignSelf={'center'}
      />
      <Box alignSelf={'center'}>
        <Text alignSelf={'center'}>{username}</Text>
        {name && (
          <Text alignSelf={'center'} fontWeight={'light'}>
            {name}
          </Text>
        )}
      </Box>
      <Checkbox marginLeft={'auto'} isChecked={selected} />
    </Flex>
  );
};

export default UserItem;
