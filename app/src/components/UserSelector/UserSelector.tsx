import {
  InputGroup,
  InputLeftElement,
  Input,
  Center,
  Flex,
  Avatar,
  Tooltip,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import UserItem from './Usertem';

type User = { id: number; name?: string; username: string };

type Props = {
  users: User[];
  onChange: (users: User[]) => void;
};

const UserSelector = ({ users, onChange }: Props) => {
  const inputRef = useRef<HTMLInputElement>();
  const [filter, setFilter] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);

  const usersFiltered = users.filter((x) => {
    return (
      x.name?.toLowerCase().includes(filter) ||
      x.username.toLowerCase().includes(filter)
    );
  });

  useEffect(() => {
    onChange(selectedUsers);
  }, [selectedUsers, onChange]);

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
        minH={'60px'}
        gap={'2'}
        paddingX={'3'}
        paddingY={'10px'}
        border={'2px solid lightblue'}
        borderRadius={'5'}
        background={'#f4faff'}
        flexWrap={'wrap'}
      >
        {selectedUsers.map(({ username }) => {
          return (
            <Tooltip label={username}>
              <Avatar
                size="sm"
                name={username}
                src={`https://avatars.dicebear.com/api/initials/${username}.svg`}
                alignSelf={'center'}
                cursor={'pointer'}
                onClick={() =>
                  setSelectedUsers((prev) =>
                    prev.filter((x) => x.username !== username)
                  )
                }
              />
            </Tooltip>
          );
        })}
      </Flex>
      <Center>Selected {selectedUsers.length}</Center>
      <Flex
        direction={'column'}
        paddingTop={'3'}
        h={'400px'}
        overflowY={'scroll'}
        gap={'2'}
        paddingX={'3px'}
      >
        {usersFiltered.map((user) => {
          return (
            <UserItem
              key={user.id}
              {...user}
              selected={selectedUsers.includes(user)}
              onClick={() => {
                if (selectedUsers.includes(user)) {
                  setSelectedUsers(selectedUsers.filter((x) => x !== user));
                } else {
                  setSelectedUsers([...selectedUsers, user]);
                }
              }}
            />
          );
        })}
        {inputRef?.current?.value !== '' && usersFiltered?.length === 0 && (
          <Center>🙊 No friends found 🙊</Center>
        )}
      </Flex>
    </Flex>
  );
};

export default UserSelector;
