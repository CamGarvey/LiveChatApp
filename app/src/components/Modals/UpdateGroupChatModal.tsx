import { Formik } from 'formik';
import { useMemo, useRef } from 'react';
import UserMultiSelect from '../shared/UserSelector/UserMultiSelect';
import {
  useGetChatForUpdateQuery,
  useGetFriendsForUpdateGroupChatQuery,
} from 'graphql/generated/graphql';
import { Button, Center, Input, Loader, Stack, Text } from '@mantine/core';
import { ContextModalProps, useModals } from '@mantine/modals';
import { chatSchema } from 'models/validation-schemas';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import { useDeleteChat } from 'hooks';
import { AdminSelector } from 'components/shared/AdminSelector';
import { gql } from '@apollo/client';
import { useUpdateGroupChat } from 'hooks/useUpdateGroupChat';

gql`
  query GetChatForUpdate($chatId: HashId!) {
    chat(chatId: $chatId) {
      id
      isCreator
      ... on GroupChat {
        name
        description
        members {
          ...UpdateGroupUser
        }
        admins {
          ...UpdateGroupUser
        }
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
  const inputRef = useRef<HTMLInputElement>();
  const navigate = useNavigate();
  const { deleteChat, loading: loadingDelete } = useDeleteChat();
  const { updateChat, loading: loadingUpdate } = useUpdateGroupChat();

  const {
    loading: loadingFriends,
    data: friendData,
    error: friendError,
  } = useGetFriendsForUpdateGroupChatQuery();

  const memberIds = useMemo(
    () =>
      chat?.__typename === 'GroupChat' ? chat.members.map((x) => x.id) : [],
    [chat]
  );
  const adminIds = useMemo(
    () =>
      chat?.__typename === 'GroupChat' ? chat.admins.map((x) => x.id) : [],
    [chat]
  );

  // Since other friends can add either friends
  // We need to make sure that we get all of the users in the chat
  // So that if the user takes a non friend out of the UserSelector
  // they can add them back in if it was a mistake
  const totalUsers = useMemo(() => {
    if (chat?.__typename !== 'GroupChat') return [];
    if (friendData)
      return _.unionBy(
        chat.members,
        friendData.friends.map((x) => ({
          ...x,
        })),
        'id'
      );
    return chat.members;
  }, [chat, friendData]);

  if (loadingChat)
    return (
      <Center>
        <Loader variant="bars" />
      </Center>
    );

  if (chat?.__typename === 'DeletedChat')
    return (
      <Center>
        <Text>Chat is deleted</Text>
      </Center>
    );

  if (chat?.__typename === 'DirectMessageChat')
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
          adminIds,
        }}
        validationSchema={chatSchema}
        onSubmit={(values) => {
          const membersRemoved = memberIds.filter(
            (x) => !values.memberIds.includes(x)
          );
          const membersAdded = values.memberIds.filter(
            (x) => !memberIds.includes(x)
          );
          const adminsRemoved = adminIds.filter(
            (x) => !values.adminIds.includes(x)
          );
          const adminsAdded = values.adminIds.filter(
            (x) => !adminIds.includes(x)
          );
          updateChat({
            chatId: chat.id,
            name: values.name,
            description: values.description,
            addMemberIds: membersAdded,
            removeMemberIds: membersRemoved,
            addAdminIds: adminsAdded,
            removeAdminIds: adminsRemoved,
          }).then(() => context.closeModal(id));
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
                  value={props.values.description}
                />
              </Input.Wrapper>
              <Input.Wrapper>
                {loadingFriends ? (
                  <Center>
                    <Loader variant="bars" />
                  </Center>
                ) : friendError ? (
                  <Center>Failed to load your friends 😥</Center>
                ) : (
                  <>
                    <UserMultiSelect
                      label={'Members'}
                      users={totalUsers}
                      defaultValue={chat.members}
                      onChange={(value: any) => {
                        props.setFieldValue('memberIds', value);
                      }}
                    />
                    <AdminSelector
                      chatId={chat.id}
                      onChange={(value: any) => {
                        props.setFieldValue('adminIds', value);
                      }}
                    />
                  </>
                )}
              </Input.Wrapper>
              <Button
                type="submit"
                loading={loadingUpdate}
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
