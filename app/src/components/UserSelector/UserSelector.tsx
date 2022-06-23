import { MultiSelect, MultiSelectProps, Stack } from '@mantine/core';
import { forwardRef, useEffect, useMemo, useState } from 'react';
import UserItem from './UserItem';
import UserValue from './UserValue';

type User = { id: string; name?: string; username: string };

type Props = {
  label: string;
  placeholder?: string;
  nothingFound?: string;
  users: User[];
  onChange: (users: User[]) => void;
};

const UserSelector = forwardRef<HTMLInputElement, Props>(
  (
    { users, onChange, nothingFound = 'Nobody Here', ...others }: Props,
    ref
  ) => {
    const [selectedUsers, setSelectedUsers] = useState([]);

    useEffect(() => {
      onChange(selectedUsers);
    }, [selectedUsers, onChange]);

    let usersConverted = useMemo(() => {
      return users.map((u) => ({
        ...u,
        value: u.username,
        label: u.username,
        image: `https://avatars.dicebear.com/api/pixel-art/${u.username}.svg`,
      }));
    }, [users]);

    return (
      <Stack>
        <MultiSelect
          ref={ref}
          {...others}
          itemComponent={UserItem}
          valueComponent={UserValue}
          data={usersConverted}
          searchable
          nothingFound={nothingFound}
          maxDropdownHeight={400}
          filter={(value, selected, item) => {
            return (
              !selected &&
              ((item.username
                .toLowerCase()
                .includes(value.toLowerCase().trim()) ||
                item.name
                  ?.toLowerCase()
                  .includes(value.toLowerCase().trim())) ??
                false)
            );
          }}
        />
      </Stack>
    );
  }
);

export default UserSelector;
