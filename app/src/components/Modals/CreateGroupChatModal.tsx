import { useFormik } from 'formik';
import { useEffect, useRef } from 'react';
import UserSelector from '../UserSelector/UserSelector';
import {
  GetChatsDocument,
  GetChatsQuery,
  useCreateGroupChatMutation,
  useGetFriendsQuery,
} from '../../graphql/generated/graphql';
import {
  Button,
  Center,
  Input,
  InputWrapper,
  Loader,
  Stack,
} from '@mantine/core';
import { ContextModalProps, useModals } from '@mantine/modals';
import { chatSchema } from '../../models/validation-schemas';
import { showNotification } from '@mantine/notifications';

export const CreateGroupChatModal = ({
  context,
  id,
  innerProps,
}: ContextModalProps<{}>) => {
  const inputRef = useRef<HTMLInputElement>();
  const {
    loading: loadingFriends,
    data: friendData,
    error: friendError,
  } = useGetFriendsQuery({ fetchPolicy: 'network-only' });

  const [createGroupChatMutation, { loading: loadingCreateChat }] =
    useCreateGroupChatMutation({
      update: (cache, { data: { createGroupChat } }) => {
        const { chats } = cache.readQuery<GetChatsQuery>({
          query: GetChatsDocument,
        });

        const updatedChats = [...chats, createGroupChat];

        cache.writeQuery({
          query: GetChatsDocument,
          data: {
            chats: updatedChats,
          },
        });
      },
      onCompleted: (data) =>
        showNotification({
          title: 'Created New Chat',
          message: data.createGroupChat.name,
        }),
    });

  useEffect(() => {
    inputRef?.current?.focus();
  }, [inputRef?.current?.id]);

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      memberIds: [],
    },
    validationSchema: chatSchema,
    onSubmit: (values) => {
      createGroupChatMutation({
        variables: {
          data: values,
        },
      }).then((c) => {
        context.closeModal(id);
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack>
        <InputWrapper
          required
          error={formik.touched.name && formik.errors.name}
          label="Name"
        >
          <Input
            id="name"
            type="text"
            ref={inputRef}
            onChange={formik.handleChange}
            value={formik.values.name}
          />
        </InputWrapper>
        <InputWrapper error={formik.errors.description} label="Description">
          <Input
            id="description"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.description}
          />
        </InputWrapper>
        <InputWrapper>
          {loadingFriends ? (
            <Center>
              <Loader variant="bars" />
            </Center>
          ) : friendError ? (
            <Center>Failed to load your friends 😥</Center>
          ) : (
            <UserSelector
              label={'Friends'}
              users={friendData.friends}
              onChange={(users) => {
                formik.values.memberIds = users.map((x) => x);
                formik.handleChange('');
              }}
            />
          )}
        </InputWrapper>
        <Button type="submit" loading={loadingCreateChat}>
          Create
        </Button>
      </Stack>
    </form>
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
