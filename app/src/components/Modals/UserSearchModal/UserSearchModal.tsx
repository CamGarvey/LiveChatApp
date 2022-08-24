import { useEffect, useRef, useState } from 'react';
import { useGetUserSearchLazyQuery } from 'graphql/generated/graphql';
import {
  Button,
  Center,
  Input,
  Loader,
  ScrollArea,
  Stack,
  Text,
} from '@mantine/core';
import { Search } from 'tabler-icons-react';
import { useDebouncedValue } from '@mantine/hooks';
import { useModals } from '@mantine/modals';
import UserItem from 'components/shared/UserItem';
import UserMenu from 'components/shared/UserItem/UserMenu';
import { gql } from '@apollo/client';

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

  const [hasInput, setHasInput] = useState(false);

  const [getUsers, { data, loading: loadingUsers, fetchMore }] =
    useGetUserSearchLazyQuery();

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
    <>
      <Input.Wrapper>
        <Input
          icon={<Search />}
          placeholder="Find your friends!"
          ref={inputRef}
          mb={'10px'}
          onChange={(e: any) => {
            const value = e.target.value;
            setHasInput(!!value);
            if (value === '') {
              return;
            }
            setSearch(value);
          }}
        />
      </Input.Wrapper>
      {hasInput && (
        <>
          <Stack
            py={'10px'}
            style={{
              maxHeight: '490px',
            }}
          >
            <ScrollArea
              style={{
                height: '500px',
              }}
              offsetScrollbars
            >
              <>
                {users.map((user) => {
                  return (
                    <UserItem
                      key={user.id}
                      user={user}
                      menu={<UserMenu user={user} />}
                    />
                  );
                })}
                <Center>
                  {loadingUsers && <Loader variant="dots" />}
                  {!loadingUsers && users.length === 0 && (
                    <Text>🙊 No users found 🙊</Text>
                  )}
                </Center>
              </>
            </ScrollArea>
          </Stack>
          {data?.users?.pageInfo.hasNextPage && (
            <Button
              fullWidth
              onClick={() => {
                fetchMore({
                  variables: {
                    first: USER_PAGINATION_COUNT,
                    after: data.users.pageInfo.endCursor,
                  },
                });
              }}
            >
              Load More
            </Button>
          )}
        </>
      )}
    </>
  );
};

export const useUserSearchModal = () => {
  const modals = useModals();
  return () =>
    modals.openContextModal('userSearch', {
      withCloseButton: false,
      innerProps: {},
    });
};
