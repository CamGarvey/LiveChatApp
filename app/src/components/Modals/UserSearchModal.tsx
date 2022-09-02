import { useEffect, useRef, useState } from 'react';
import { useGetUserSearchLazyQuery } from 'graphql/generated/graphql';
import { useDebouncedValue } from '@mantine/hooks';
import { useModals } from '@mantine/modals';
import UserItem from 'components/shared/UserItem';
import UserMenu from 'components/shared/UserItem/UserMenu';
import { gql } from '@apollo/client';
import UserList from 'components/shared/UserList';

gql`
  query GetUserSearch($usernameFilter: String, $first: Int, $after: String) {
    users(usernameFilter: $usernameFilter, first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        cursor
        node {
          id
          ...UserItem
          ...UserMenu
        }
      }
    }
  }
  ${UserItem.fragments.user}
  ${UserMenu.fragments.user}
`;

const USER_PAGINATION_COUNT = 7;

export const UserSearchModal = () => {
  const inputRef = useRef<HTMLInputElement>();
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebouncedValue(search, 1000);
  const [getUsers, { data, loading, fetchMore }] = useGetUserSearchLazyQuery();

  // Wrap the getUsers call in a debounce to prevent over requesting api

  useEffect(() => {
    getUsers({
      variables: {
        first: USER_PAGINATION_COUNT,
        usernameFilter: debouncedSearch,
        after: null,
      },
    });
  }, [debouncedSearch, getUsers]);

  // Focus on input
  useEffect(() => {
    inputRef?.current?.focus();
  }, [inputRef?.current?.id]);

  const users = data?.users.edges?.map((edge) => edge.node) ?? [];

  return (
    <UserList
      users={users}
      input={{
        placeholder: 'Find your friends!',
      }}
      loading={loading}
      onInputChange={setSearch}
      hasNextPage={data?.users.pageInfo.hasNextPage}
      onNextPageClick={() =>
        fetchMore({
          variables: {
            first: USER_PAGINATION_COUNT,
            after: data.users.pageInfo.endCursor,
          },
        })
      }
    />
  );
};

export const useUserSearchModal = () => {
  const modals = useModals();
  return () =>
    modals.openContextModal('userSearch', {
      withCloseButton: false,
      innerProps: {},
      padding: 'xs',
    });
};
