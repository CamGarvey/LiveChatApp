import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  UseDisclosureProps,
  Input,
  InputGroup,
  InputLeftElement,
  Box,
  ModalFooter,
  Button,
  Spinner,
  Center,
} from '@chakra-ui/react';
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

const USER_PAGINATION_COUNT = 5;

const FriendSearchModal = (props: UseDisclosureProps) => {
  const btnRef = useRef<HTMLDivElement>();
  const inputRef = useRef<HTMLInputElement>();
  const [users, setUsers] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const { isOpen, onClose } = useDisclosure(props);

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
  }, [data?.users.edges]);

  return (
    <Modal
      onClose={() => {
        setUsers([]);
        onClose();
      }}
      finalFocusRef={btnRef!}
      isOpen={isOpen}
      scrollBehavior={'inside'}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Search for Friends</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <BsSearch color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="Find your friends!"
              ref={inputRef}
              onChange={(e) => {
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
          </InputGroup>
          <Box paddingTop={'3'}>
            {users.map((u) => {
              return (
                <UserItem
                  key={u.id}
                  user={u}
                  friendStatus={getFriendStatus(u.id)}
                />
              );
            })}
            {(loadingUsers || loadingFriends || loadingRequets) && (
              <Box textAlign={'center'}>
                <Spinner></Spinner>
              </Box>
            )}
            {inputRef?.current?.value !== '' &&
              !loadingUsers &&
              users?.length === 0 && <Center>🙊 No users found 🙊</Center>}
          </Box>
          {data?.users?.pageInfo.hasNextPage && (
            <Button
              w={'100%'}
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
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FriendSearchModal;
