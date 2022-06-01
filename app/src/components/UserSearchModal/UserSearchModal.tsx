import _ from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useGetUsersLazyQuery } from '../../graphql/generated/graphql';
import UserItem from './UserItem';
import {
  Button,
  Center,
  Input,
  InputWrapper,
  Loader,
  Modal,
  ScrollArea,
  Stack,
  Text,
} from '@mantine/core';
import { Search } from 'tabler-icons-react';
import User from './User';

const USER_PAGINATION_COUNT = 5;

type Props = {
  onClose?: () => void;
  isOpen: boolean;
};

const UserSearchModal = ({ onClose, isOpen }: Props) => {
  const inputRef = useRef<HTMLInputElement>();

  const [hasInput, setHasInput] = useState(false);

  const [getUsers, { data, loading: loadingUsers, fetchMore }] =
    useGetUsersLazyQuery();

  // Wrap the getUsers call in a debounce to prevent over requesting api
  const debouncer = useCallback(_.debounce(getUsers, 1000), []);

  // Focus on input
  useEffect(() => {
    inputRef?.current?.focus();
  }, [inputRef?.current?.id]);

  let users: User[] = [];

  if (data && data.users.edges) {
    users = data?.users.edges?.map((edge) => edge.node) ?? [];
  }

  return (
    <Modal
      onClose={() => {
        onClose();
      }}
      opened={isOpen}
      withCloseButton={false}
    >
      <InputWrapper>
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
            debouncer({
              variables: {
                first: USER_PAGINATION_COUNT,
                usernameFilter: value,
                after: null,
              },
            });
          }}
        />
      </InputWrapper>
      <Stack py={'10px'}>
        <ScrollArea>
          {hasInput && (
            <>
              {users.map((user) => {
                return <UserItem key={user.id} user={user} />;
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
    </Modal>
  );
};

export default UserSearchModal;
