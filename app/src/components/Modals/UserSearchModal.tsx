import { useEffect, useRef, useState } from 'react';
import { GetUsersQuery, useGetUsersLazyQuery } from 'graphql/generated/graphql';
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
import BasicMenu from 'components/shared/UserItem/Menus/BasicMenu';

const USER_PAGINATION_COUNT = 7;

export const UserSearchModal = () => {
  const inputRef = useRef<HTMLInputElement>();
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebouncedValue(search, 1000);

  const [hasInput, setHasInput] = useState(false);

  const [getUsers, { data, loading: loadingUsers, fetchMore }] =
    useGetUsersLazyQuery();

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

  let users: GetUsersQuery['users']['edges'][0]['node'][] = [];

  if (data && data.users.edges) {
    users = data?.users.edges?.map((edge) => edge.node) ?? [];
  }

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
              {hasInput && (
                <>
                  {users.map((user) => {
                    return (
                      <UserItem
                        key={user.id}
                        user={user}
                        menu={<BasicMenu user={user} />}
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
              )}
            </ScrollArea>
          </Stack>
          {data?.users?.pageInfo.hasNextPage && hasInput && (
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
