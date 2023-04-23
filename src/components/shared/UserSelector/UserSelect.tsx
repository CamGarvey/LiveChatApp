import { gql } from '@apollo/client';
import { Select } from '@mantine/core';
import { UserSelectFragment } from 'graphql/generated/graphql';
import { forwardRef, useMemo } from 'react';
import { getUserAvatar } from 'utils/avatar';
import UserSelectItem from './UserSelectItem';

type Props = {
  label: string;
  placeholder?: string;
  nothingFound?: string;
  disabled?: boolean;
  readOnly?: boolean;
  users: UserSelectFragment[];
  defaultValue?: UserSelectFragment[];
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
            (item.username.toLowerCase().includes(value.toLowerCase().trim()) ||
              item.name?.toLowerCase().includes(value.toLowerCase().trim())) ??
            false
          );
        }}
      />
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
