import { gql } from '@apollo/client';
import { Button, Center, Input, Loader, Stack } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { ContextModalProps, useModals } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import UserMultiSelect from 'components/shared/UserSelector/UserMultiSelect';
import { Formik } from 'formik';
import {
  CreateGroupChatModalFriendFragment,
  useGetFriendsForCreateGroupChatQuery,
} from 'graphql/generated/graphql';
import { useCreateChat } from 'hooks';
import { groupChatSchema } from 'models/validation-schemas';
import { useEffect, useRef, useState } from 'react';

gql`
  query GetFriendsForCreateGroupChat($first: Int!, $filter: String) {
    friends(first: $first, filter: $filter) {
      edges {
        node {
          ...CreateGroupChatModalFriend
        }
      }
    }
  }
  ${(UserMultiSelect as any).fragments.user}

  fragment CreateGroupChatModalFriend on Friend {
    id
    name
    username
    ...UserMultiSelect
  }
`;

const DEBOUNCED_SEARCH_TIMEOUT = 1000;
const FRIEND_LIMIT = 10;

export const CreateGroupChatModal = ({ context, id }: ContextModalProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebouncedValue(search, DEBOUNCED_SEARCH_TIMEOUT);
  const [friends, setFriends] = useState<CreateGroupChatModalFriendFragment[]>([]);
  const { loading, error, refetch, observable } = useGetFriendsForCreateGroupChatQuery({
    variables: {
      first: FRIEND_LIMIT,
    },
    onCompleted: (data) => {
      const next = data.friends?.edges?.map((friend) => friend.node) ?? [];
      setFriends((prev) => {
        const prevIds = prev.map((friend) => friend.id);
        return [...prev, ...next.filter((friend) => !prevIds.includes(friend.id))];
      });
    },
  });

  const {
    createGroupChat: [createGroupChatMutation, { loading: loadingCreateChat }],
  } = useCreateChat();

  useEffect(() => {
    refetch({
      first: FRIEND_LIMIT,
      filter: debouncedSearch,
    });
  }, [debouncedSearch, refetch]);

  return (
    <Formik
      initialValues={{
        name: '',
        description: '',
        userIds: [] as string[],
      }}
      validationSchema={groupChatSchema}
      onSubmit={async (values) => {
        setIsSubmitDisabled(true);
        await createGroupChatMutation({
          variables: {
            data: values,
          },
        });
        context.closeModal(id);
        showNotification({
          message: 'Created new group chat',
          loading: loadingCreateChat,
        });
      }}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <Stack>
            <Input.Wrapper required error={props.touched.name && props.errors.name} label="Name">
              <Input
                id="name"
                type="text"
                ref={inputRef}
                onChange={props.handleChange}
                value={props.values.name}
              />
            </Input.Wrapper>
            <Input.Wrapper error={props.errors.description} label="Description">
              <Input
                id="description"
                type="text"
                onChange={props.handleChange}
                value={props.values.description}
              />
            </Input.Wrapper>
            <Input.Wrapper>
              {loading ? (
                <Center>
                  <Loader />
                </Center>
              ) : error ? (
                <Center>Failed to load your friends 💥</Center>
              ) : (
                <UserMultiSelect
                  searchable
                  label={'Friends'}
                  nothingFound={'No friends found'}
                  users={friends}
                  onChange={(users) => {
                    props.values.userIds = users.map((x) => x);
                    props.handleChange('');
                  }}
                  onSearchChange={setSearch}
                  dropdownPosition={'bottom'}
                  // rightSection={<Loader variant={'oval'} size={'sm'} />}
                  withinPortal
                />
              )}
            </Input.Wrapper>
            <Button type="submit" loading={loadingCreateChat} disabled={isSubmitDisabled}>
              Create
            </Button>
          </Stack>
        </form>
      )}
    </Formik>
  );
};

export const useCreateGroupChatModal = () => {
  const modals = useModals();
  return () =>
    modals.openContextModal('createGroupChat', {
      title: 'Create Group Chat',
      innerProps: {},
    });
};
