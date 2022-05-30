import {
  Avatar,
  Center,
  Group,
  Input,
  ScrollArea,
  Stack,
  Tooltip,
} from '@mantine/core';
import { useEffect, useRef, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { Search } from 'tabler-icons-react';
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
    <Stack>
      <Input
        icon={<Search />}
        onChange={(e: any) => {
          setFilter(e.target.value.toLowerCase());
        }}
        placeholder="Search your friends!"
      />

      <Group>
        {selectedUsers.map(({ username }) => {
          return (
            <Tooltip label={username}>
              <Avatar
                size="sm"
                src={`https://avatars.dicebear.com/api/initials/${username}.svg`}
                onClick={() =>
                  setSelectedUsers((prev) =>
                    prev.filter((x) => x.username !== username)
                  )
                }
              />
            </Tooltip>
          );
        })}
      </Group>
      <Center>Selected {selectedUsers.length}</Center>
      <ScrollArea style={{ maxHeight: 400 }}>
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
      </ScrollArea>
      {inputRef?.current?.value !== '' && usersFiltered?.length === 0 && (
        <Center>🙊 No friends found 🙊</Center>
      )}
    </Stack>
  );
};

export default UserSelector;
