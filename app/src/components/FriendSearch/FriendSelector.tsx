import {
  InputGroup,
  InputLeftElement,
  Input,
  Box,
  Spinner,
  Center,
  Flex,
  Avatar,
  Tooltip,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { useGetFriendsForSearchQuery } from '../../graphql/generated/graphql';
import FriendItem from './FriendItem';

type Props = {
  maxShown?: number;
};

const FriendSelector = (props: Props) => {
  const inputRef = useRef<HTMLInputElement>();
  const [filter, setFilter] = useState('');
  const [selectedFriends, setSelectedFriends] = useState([]);
  const { loading, data, error } = useGetFriendsForSearchQuery();

  if (error) {
    return <>Error!</>;
  }

  if (!data) {
    return <>no data</>;
  }

  const friends = data?.friends.filter((x) => {
    return (
      x.name?.toLowerCase().includes(filter) ||
      x.username.toLowerCase().includes(filter)
    );
  });

  return (
    <Flex direction={'column'} gap="3">
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <BsSearch color="gray.300" />
        </InputLeftElement>
        <Input
          placeholder="Search your friends!"
          onChange={(e) => {
            setFilter(e.target.value.toLowerCase());
          }}
        />
      </InputGroup>

      <Flex
        h={'50px'}
        gap={'2'}
        border={'2px solid lightblue'}
        borderRadius={'5'}
        background={'#f4faff'}
        paddingX={'3'}
      >
        {selectedFriends.map(({ username }) => {
          return (
            <Tooltip label={username}>
              <Avatar
                size="sm"
                name={username}
                src={`https://avatars.dicebear.com/api/initials/${username}.svg`}
                alignSelf={'center'}
                cursor={'pointer'}
                onClick={() =>
                  setSelectedFriends((prev) =>
                    prev.filter((x) => x.username !== username)
                  )
                }
              />
            </Tooltip>
          );
        })}
      </Flex>
      <Center>Selected {selectedFriends.length}</Center>
      <Flex
        direction={'column'}
        paddingTop={'3'}
        h={'400px'}
        overflowY={'scroll'}
        gap={'2'}
        paddingX={'3px'}
      >
        {friends.map((friend) => {
          return (
            <FriendItem
              key={friend.id}
              {...friend}
              selected={selectedFriends.includes(friend)}
              onClick={() => {
                if (selectedFriends.includes(friend)) {
                  setSelectedFriends(
                    selectedFriends.filter((x) => x !== friend)
                  );
                } else {
                  setSelectedFriends([...selectedFriends, friend]);
                }
              }}
            />
          );
        })}
        {loading && (
          <Box textAlign={'center'}>
            <Spinner></Spinner>
          </Box>
        )}
        {inputRef?.current?.value !== '' &&
          !loading &&
          friends?.length === 0 && <Center>🙊 No friends found 🙊</Center>}
      </Flex>
    </Flex>
  );
};

export default FriendSelector;
