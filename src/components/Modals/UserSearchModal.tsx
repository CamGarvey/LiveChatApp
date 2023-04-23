import { gql } from '@apollo/client';
import { useDebouncedValue } from '@mantine/hooks';
import { useModals } from '@mantine/modals';
import UserList from 'components/shared/UserList';
import { useGetUserSearchLazyQuery } from 'graphql/generated/graphql';
import { useEffect, useMemo, useState } from 'react';

gql`
  query GetUserSearch($filter: String, $first: Int, $after: String) {
    users(filter: $filter, first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        cursor
        node {
          ...UserSearchModelUser
        }
      }
    }
  }
  fragment UserSearchModelUser on User {
    id
    ...UserList
  }
  ${UserList.fragments.user}
`;

const USER_PAGINATION_COUNT = 7;
const DEBOUNCED_SEARCH_TIMEOUT = 1000;

export const UserSearchModal = () => {
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebouncedValue(search, DEBOUNCED_SEARCH_TIMEOUT);
  const [getUsers, { data, loading, fetchMore }] = useGetUserSearchLazyQuery();

  useEffect(() => {
    getUsers({
      variables: {
        first: USER_PAGINATION_COUNT,
        filter: debouncedSearch,
        after: null,
      },
    });
  }, [debouncedSearch, getUsers]);

  const users = useMemo(() => data?.users.edges?.map((edge) => edge.node) ?? [], [data]);

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
            after: data?.users.pageInfo.endCursor,
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
