import { MultiSelect, Stack } from '@mantine/core';
import { forwardRef, useMemo } from 'react';
import { getUserAvatar } from 'utils/avatar';
import UserSelectItem from './UserSelectItem';
import UserValue from './UserValue';

type Props = {
  label: string;
  placeholder?: string;
  nothingFound?: string;
  disabled?: boolean;
  readOnly?: boolean;
  users: {
    id: string;
    username: string;
  }[];
  defaultValue?: {
    id: string;
    username: string;
  }[];
  onChange: (ids: string[]) => void;
};

const UserSelector = forwardRef<HTMLInputElement, Props>(
  (
    {
      users,
      onChange,
      nothingFound = 'Nobody Here',
      defaultValue = [],
      ...others
    }: Props,
    ref
  ) => {
    const defaultMapped = useMemo(
      () => defaultValue.map((x) => x.id),
      [defaultValue]
    );

    let usersConverted = useMemo(
      () =>
        users.map((u) => ({
          ...u,
          value: u.id,
          label: u.username,
          image: getUserAvatar(u.username),
        })),
      [users]
    );

    return (
      <Stack>
        <MultiSelect
          ref={ref}
          {...others}
          itemComponent={UserSelectItem}
          valueComponent={UserValue}
          data={usersConverted}
          defaultValue={defaultMapped}
          onChange={onChange}
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
