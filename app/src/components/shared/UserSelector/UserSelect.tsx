import { gql } from '@apollo/client';
import { Select, Stack } from '@mantine/core';
import { UserSelectorFragment } from 'graphql/generated/graphql';
import { forwardRef, useMemo } from 'react';
import { getUserAvatar } from 'utils/avatar';
import UserSelectItem from './UserSelectItem';

type Props = {
  label: string;
  placeholder?: string;
  nothingFound?: string;
  disabled?: boolean;
  readOnly?: boolean;
  users: UserSelectorFragment[];
  defaultValue?: UserSelectorFragment[];
  onChange: (ids: string[]) => void;
};

const UserSelect = forwardRef<HTMLInputElement, Props>(
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
        <Select
          ref={ref}
          {...others}
          itemComponent={UserSelectItem}
          data={usersConverted}
          searchable
          nothingFound={nothingFound}
          maxDropdownHeight={400}
          filter={(value, item) => {
            return (
              (item.username
                .toLowerCase()
                .includes(value.toLowerCase().trim()) ||
                item.name
                  ?.toLowerCase()
                  .includes(value.toLowerCase().trim())) ??
              false
            );
          }}
        />
      </Stack>
    );
  }
);

(UserSelect as any).fragments = {
  user: gql`
    fragment UserSelect on User {
      id
      username
    }
  `,
};

export default UserSelect;
