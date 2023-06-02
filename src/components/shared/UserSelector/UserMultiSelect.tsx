import { gql } from '@apollo/client';
import { MultiSelect, MultiSelectProps } from '@mantine/core';
import { UserSelectFragment } from 'graphql/generated/graphql';
import { forwardRef, useMemo } from 'react';
import { getUserAvatar } from 'utils/avatar';
import UserSelectItem from './UserSelectItem';
import UserValue from './UserValue';

type Props = {
  users: UserSelectFragment[];
} & Partial<MultiSelectProps>;

const UserMultiSelect = forwardRef<HTMLInputElement, Props>(({ users, ...others }: Props, ref) => {
  const usersConverted = useMemo(
    () =>
      users.map((u) => ({
        key: u.id,
        canRemove: true,
        value: u.id,
        label: u.username,
        image: getUserAvatar(u.username),
        ...u,
      })),
    [users]
  );

  return (
    <MultiSelect
      ref={ref}
      itemComponent={UserSelectItem}
      valueComponent={UserValue}
      data={usersConverted}
      {...others}
    />
  );
});

(UserMultiSelect as any).fragments = {
  user: gql`
    fragment UserMultiSelect on User {
      id
      username
    }
  `,
};

export default UserMultiSelect;
