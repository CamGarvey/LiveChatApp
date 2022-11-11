import { Formik } from 'formik';
import { useCallback, useMemo, useRef } from 'react';
import UserMultiSelect from '../shared/UserSelector/UserMultiSelect';
import {
  UpdateGroupUserFragment,
  useGetChatForUpdateQuery,
  useGetFriendsForUpdateGroupChatQuery,
} from 'graphql/generated/graphql';
import { Button, Center, Input, Loader, Stack, Text } from '@mantine/core';
import { ContextModalProps, useModals } from '@mantine/modals';
import { chatSchema } from 'models/validation-schemas';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import {
  useChatDescription,
  useChatMembers,
  useChatName,
  useDeleteChat,
} from 'hooks';
import { gql } from '@apollo/client';

gql`
  query GetChatForUpdate($chatId: HashId!, $firstMembers: Int = 300) {
    chat(chatId: $chatId) {
      id
      isCreator
      createdById
      ... on GroupChat {
        name
        description
        members(first: $firstMembers) {
          edges {
            node {
              role
              user {
                ...UpdateGroupUser
              }
            }
          }
        }
        role
      }
    }
  }
  query GetFriendsForUpdateGroupChat {
    friends {
      ...UpdateGroupUser
    }
  }
  fragment UpdateGroupUser on User {
    id
    username
  }
`;

type Props = {
  chatId: string;
};

export const UpdateGroupChatModal = ({
  context,
  id,
  innerProps: { chatId },
}: ContextModalProps<Props>) => {
  const { loading: loadingChat, data } = useGetChatForUpdateQuery({
    variables: {
      chatId,
    },
  });
  const chat = data?.chat;
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { deleteChat, loading: loadingDelete } = useDeleteChat();
  const { update: updateName, updating: updatingName } = useChatName();
  const { update: updateDesc, updating: updatingDesc } = useChatDescription();
  const {
    addMembers,
    removeMembers,
    updating: updatingMembers,
  } = useChatMembers();

  const {
    loading: loadingFriends,
    data: friendData,
    error: friendError,
  } = useGetFriendsForUpdateGroupChatQuery();
  const members = useMemo<UpdateGroupUserFragment[]>(
    () =>
      chat?.__typename === 'GroupChat'
        ? chat.members.edges
            ?.filter((x) => !!x)
            .map((x) => x as UpdateGroupUserFragment) ?? []
        : [],
    [chat]
  );

  const memberIds = useMemo<string[]>(
    () => members.map((x) => x.id),
    [members]
  );

  const canRemoveUser = useCallback(
    (user: UpdateGroupUserFragment) => {
      if (!chat || chat.__typename !== 'GroupChat') {
        return false;
      }
      if (chat.isCreator && chat.createdById !== user.id) {
        return true;
      }
      return false;
    },
    [chat]
  );

  // Since other friends can add either friends
  // We need to make sure that we get all of the users in the chat
  // So that if the user takes a non friend out of the UserSelector
  // they can add them back in if it was a mistake
  const users = useMemo(() => {
    if (chat?.__typename !== 'GroupChat') return [];
    const users: (UpdateGroupUserFragment & { canRemove?: boolean })[] =
      _.unionBy(members, friendData?.friends ?? [], 'id');

    return users.map((user) => ({
      ...user,
      canRemove: canRemoveUser(user),
    }));
  }, [chat, members, friendData, canRemoveUser]);

  if (loadingChat)
    return (
      <Center>
        <Loader />
      </Center>
    );

  if (!chat || !chat.__typename)
    return (
      <Center>
        <Text>Could not find chat</Text>
      </Center>
    );

  if (chat.__typename === 'DeletedChat')
    return (
      <Center>
        <Text>Chat is deleted</Text>
      </Center>
    );

  if (chat.__typename !== 'GroupChat')
    return (
      <Center>
        <Text>Chat must be a group chat</Text>
      </Center>
    );

  return (
    <Stack>
      <Formik
        initialValues={{
          name: chat.name,
          description: chat.description,
          memberIds,
        }}
        validationSchema={chatSchema}
        onSubmit={(values) => {
          const membersToAdd = values.memberIds.filter(
            (x) => !memberIds.includes(x)
          );
          const membersToRemove = memberIds.filter(
            (x) => !values.memberIds.includes(x)
          );

          if (chat.name !== values.name && values.name.length > 2) {
            updateName(chat.id, values.name);
          }

          if (chat.description !== values.description) {
            updateDesc(chat.id, values.description ?? '');
          }

          if (membersToAdd.length > 0) {
            addMembers(chat.id, membersToAdd);
          }

          if (membersToRemove.length > 0) {
            removeMembers(chat.id, membersToRemove);
          }

          context.closeModal(id);
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <Stack>
              <Input.Wrapper
                required
                error={props.touched.name && props.errors.name}
                label="Name"
              >
                <Input
                  id="name"
                  type="text"
                  ref={inputRef}
                  onChange={props.handleChange}
                  value={props.values.name}
                />
              </Input.Wrapper>
              <Input.Wrapper
                error={props.errors.description}
                label="Description"
              >
                <Input
                  id="description"
                  type="text"
                  onChange={props.handleChange}
                  value={props.values.description ?? ''}
                />
              </Input.Wrapper>
              <Input.Wrapper>
                {loadingFriends ? (
                  <Center>
                    <Loader />
                  </Center>
                ) : friendError ? (
                  <Center>Failed to load your friends 😥</Center>
                ) : (
                  <>
                    <UserMultiSelect
                      label={'Members'}
                      users={users}
                      defaultValue={members}
                      onChange={(value: any) => {
                        props.setFieldValue('memberIds', value);
                      }}
                    />
                  </>
                )}
              </Input.Wrapper>
              <Button
                type="submit"
                loading={updatingName || updatingDesc || updatingMembers}
                disabled={loadingFriends || !props.dirty}
              >
                Update
              </Button>
            </Stack>
          </form>
        )}
      </Formik>
      {chat.isCreator && (
        <Button
          loading={loadingDelete}
          color={'red'}
          disabled={loadingFriends}
          onClick={() => {
            deleteChat(chat).then(() => {
              navigate('/chats', { replace: true });
              context.closeModal(id);
            });
          }}
        >
          Delete
        </Button>
      )}
    </Stack>
  );
};

export const useUpdateGroupChatModal = () => {
  const modals = useModals();
  return (props: Props) =>
    modals.openContextModal('updateGroupChat', {
      title: 'Update Group Chat',
      innerProps: props,
    });
};
