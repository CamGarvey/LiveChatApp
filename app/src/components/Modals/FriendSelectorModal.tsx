import { gql } from '@apollo/client';
import { useDebouncedValue } from '@mantine/hooks';
import { ContextModalProps, useModals } from '@mantine/modals';
import UserList from 'components/shared/UserList';
import {
  FriendSelectorModalFriendFragment,
  useGetFriendsForSelectSearchModalLazyQuery,
  useGetFriendsForSelectSearchModalQuery,
  UserListFragment,
} from 'graphql/generated/graphql';
import { useEffect, useMemo, useRef, useState } from 'react';

gql`
  query GetFriendsForSelectSearchModal($filter: String, $first: Int, $after: String) {
    friends(filter: $filter, first: $first, after: $after) {
      edges {
        cursor
        node {
          ...UserSearchModelUser
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
  fragment FriendSelectorModalFriend on Friend {
    id
    ...UserList
  }
  ${UserList.fragments.user}
`;

type Props = {
  onSelect: (user: UserListFragment) => void;
};

const PAGINATION_COUNT = 7;
const DEBOUNCED_SEARCH_TIMEOUT = 1000;

export const FriendSelectorModal = ({
  context,
  id,
  innerProps: { onSelect },
}: ContextModalProps<Props>) => {
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebouncedValue(search, DEBOUNCED_SEARCH_TIMEOUT);
  const { data, loading, fetchMore, refetch } = useGetFriendsForSelectSearchModalQuery({
    variables: {
      first: PAGINATION_COUNT,
    },
  });

  useEffect(() => {
    refetch({
      first: PAGINATION_COUNT,
      filter: debouncedSearch,
      after: null,
    });
  }, [debouncedSearch, refetch]);

  const friends = useMemo(() => data?.friends.edges?.map((edge) => edge.node) ?? [], [data]);

  const pageInfo = useMemo(() => data?.friends.pageInfo, [data]);

  return (
    <UserList
      users={friends}
      input={{
        placeholder: 'Start typing to find your friend',
      }}
      loading={loading}
      onUserClick={(user) => {
        onSelect(user);
        context.closeModal(id);
      }}
      showUserMenu={false}
      onInputChange={setSearch}
      hasNextPage={pageInfo?.hasNextPage}
      onNextPageClick={() =>
        fetchMore({
          variables: {
            first: PAGINATION_COUNT,
            after: pageInfo?.endCursor,
          },
        })
      }
    />
  );
};

export const useFriendSelectorModal = () => {
  const modals = useModals();
  return (props: Props) =>
    modals.openContextModal('friendSelector', {
      withCloseButton: false,
      innerProps: props,
      padding: 'xs',
    });
};
