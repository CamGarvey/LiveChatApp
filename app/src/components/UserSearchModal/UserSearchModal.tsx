import _ from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import {
  useGetFriendIdsQuery,
  useGetFriendRequestIdsQuery,
  useGetUsersLazyQuery,
} from '../../graphql/generated/graphql';
import UserItem from './UserItem';
import FriendStatus from '../../models/friend-status';
import {
  Button,
  Center,
  Container,
  Input,
  InputWrapper,
  Loader,
  Modal,
  Stack,
  Text,
} from '@mantine/core';
import { Search } from 'tabler-icons-react';

const USER_PAGINATION_COUNT = 5;

type Props = {
  onClose?: () => void;
  isOpen: boolean;
};

const UserSearchModal = ({ onClose, isOpen }: Props) => {
  const btnRef = useRef<HTMLDivElement>();
  const inputRef = useRef<HTMLInputElement>();
  const [users, setUsers] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);

  const { loading: loadingFriends, data: friendData } = useGetFriendIdsQuery();

  const { data: requests, loading: loadingRequets } =
    useGetFriendRequestIdsQuery();

  const [getUsers, { data, loading: loadingUsers }] = useGetUsersLazyQuery();

  const friendIds = friendData?.friends?.map((f) => f.id) ?? [];

  // Wrap the getUsers call in a debounce to prevent over requesting api
  const debouncer = useCallback(_.debounce(getUsers, 1000), []);

  const getFriendStatus = (userId: number): FriendStatus => {
    if (friendIds.includes(userId)) {
      return FriendStatus.Friends;
    }
    if (requests.me.sentFriendRequests.length > 0) {
      return FriendStatus.RequestSent;
    }
    if (requests.me.receivedFriendRequests.length > 0) {
      return FriendStatus.RequestReceived;
    }
    return FriendStatus.NotFriends;
  };

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
      const users = data.users.edges
        .filter((x) => x != null)
        .map((x) => x.node);
      setUsers((prev) => [...prev, ...users]);
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
      // finalFocusRef={btnRef!}
      // isOpen={isOpen}
      // scrollBehavior={'inside'}
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
        {users.map((u) => {
          return (
            <UserItem
              key={u.id}
              user={u}
              friendStatus={getFriendStatus(u.id)}
            />
          );
        })}
        <Center>
          {(loadingUsers || loadingFriends || loadingRequets) && (
            <Loader variant="dots" />
          )}
          {inputRef?.current?.value !== '' &&
            !loadingUsers &&
            users?.length === 0 && <Text>🙊 No users found 🙊</Text>}
        </Center>
      </Stack>
      {data?.users?.pageInfo.hasNextPage && (
        <Button
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
