import _ from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  AcceptFriendRequestMutation,
  CancelFriendRequestMutation,
  DeclineFriendRequestMutation,
  DeleteFriendMutation,
  FriendStatus,
  GetUsersDocument,
  SendFriendRequestMutation,
  useAcceptFriendRequestMutation,
  useCancelFriendRequestMutation,
  useDeclineFriendRequestMutation,
  useDeleteFriendMutation,
  useGetUsersLazyQuery,
  useSendFriendRequestMutation,
} from '../../graphql/generated/graphql';
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
import { ApolloCache, FetchResult } from '@apollo/client';

const USER_PAGINATION_COUNT = 5;

type Props = {
  onClose?: () => void;
  isOpen: boolean;
};

const UserSearchModal = ({ onClose, isOpen }: Props) => {
  const btnRef = useRef<HTMLDivElement>();
  const inputRef = useRef<HTMLInputElement>();
  const [users, setUsers] = useState<User[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);

  const [getUsers, { data, loading: loadingUsers }] = useGetUsersLazyQuery();

  // Wrap the getUsers call in a debounce to prevent over requesting api
  const debouncer = useCallback(_.debounce(getUsers, 1000), []);
  // Focus on input
  useEffect(() => {
    inputRef?.current?.focus();
  }, [inputRef?.current?.id]);

  useEffect(() => {
    if (!loadingMore) {
      // Clear out users
      setUsers([]);
    }
    if (data?.users.edges && inputRef?.current?.value !== '') {
      const newUsers = data.users.edges
        .filter((x) => x != null)
        .map((x) => x.node);

      if (newUsers) setUsers((prev) => [...prev, ...newUsers]);
    }
  }, [data?.users.edges, loadingMore]);

  return (
    <Modal
      onClose={() => {
        setUsers([]);
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
            if (value === '') {
              setUsers([]);
              return;
            }
            setLoadingMore(false);
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
          {users.map((user) => {
            return <UserItem key={user.id} user={user} />;
          })}
          <Center>
            {loadingUsers && <Loader variant="dots" />}
            {inputRef?.current?.value !== '' &&
              !loadingUsers &&
              users?.length === 0 && <Text>🙊 No users found 🙊</Text>}
          </Center>
        </ScrollArea>
      </Stack>
      {data?.users?.pageInfo.hasNextPage && (
        <Button
          fullWidth
          onClick={() => {
            setLoadingMore(true);
            getUsers({
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
