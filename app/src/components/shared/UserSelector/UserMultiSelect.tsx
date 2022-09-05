import { gql } from '@apollo/client';
import { MultiSelect, Stack } from '@mantine/core';
import { UserSelectFragment } from 'graphql/generated/graphql';
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
  users: ({ canRemove?: boolean } & UserSelectFragment)[];
  defaultValue?: UserSelectFragment[];
  onChange: (ids: string[]) => void;
};

const UserMultiSelect = forwardRef<HTMLInputElement, Props>(
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
    const defaultMappedIds: string[] = useMemo(
      () => defaultValue.map((x) => x.id),
      [defaultValue]
    );

    let usersConverted = useMemo(
      () =>
        users.map((u) => ({
          ...u,
          canRemove: u.canRemove ?? true,
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
          defaultValue={defaultMappedIds}
          onChange={onChange}
          searchable
          nothingFound={nothingFound}
          maxDropdownHeight={400}
          styles={{}}
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

(UserMultiSelect as any).fragments = {
  user: gql`
    fragment UserMultiSelect on User {
      id
      username
    }
  `,
};

export default UserMultiSelect;