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
} from '@chakra-ui/react';
import _ from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { useGetUsersLazyQuery } from '../../graphql/generated/graphql';
import UserItem from './UserItem';

const FriendSearchModal = (props: UseDisclosureProps) => {
  const btnRef = useRef<HTMLDivElement>();
  const inputRef = useRef<HTMLInputElement>();
  const [users, setUsers] = useState([]);
  const { isOpen, onClose } = useDisclosure(props);
  const [getUsers, { data, loading }] = useGetUsersLazyQuery();

  // Wrap the getUsers call in a debounce to prevent over requesting api
  const debouncer = useCallback(_.debounce(getUsers, 1000), []);

  // Focus on input
  useEffect(() => {
    inputRef?.current?.focus();
  }, [inputRef?.current?.id]);

  useEffect(() => {
    if (data?.Users?.edges) {
      const users = data.Users.edges
        .filter((x) => x != null)
        .map((x) => x.node);
      setUsers((prev) => [...prev, ...users]);
    }
  }, [data?.Users?.edges]);

  return (
    <Modal
      onClose={() => {
        setUsers([]);
        onClose();
      }}
      finalFocusRef={btnRef}
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
                setUsers([]);
                const value = e.target.value;
                if (value === '') return;
                debouncer({
                  variables: {
                    first: 5,
                    nameFilter: e.target.value,
                  },
                });
              }}
            />
          </InputGroup>
          <Box paddingTop={'3'}>
            {loading && (
              <Box textAlign={'center'}>
                <Spinner></Spinner>
              </Box>
            )}
            {users.map((user) => {
              return <UserItem key={user.id} name={user.name} />;
            })}
          </Box>
          {data?.Users?.pageInfo.hasNextPage && (
            <Button
              w={'100%'}
              onClick={() => {
                getUsers({
                  variables: { first: 5, after: data.Users.pageInfo.endCursor },
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
