import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import UserMultiSelect from 'components/shared/UserSelector/UserMultiSelect';
import { Button, Center, Input, Loader, Stack } from '@mantine/core';
import { ContextModalProps, useModals } from '@mantine/modals';
import { chatSchema } from 'models/validation-schemas';
import { useCreateChat } from 'hooks';
import { gql } from '@apollo/client';
import { useGetFriendsForCreateGroupChatQuery } from 'graphql/generated/graphql';
import { showNotification } from '@mantine/notifications';

gql`
  query GetFriendsForCreateGroupChat {
    friends {
      id
      name
      username
    }
  }
`;

type FormikValues = {
  name: string;
  description: string;
  memberIds: string[];
};

export const CreateGroupChatModal = ({
  context,
  id,
}: ContextModalProps<{}>) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const {
    loading: loadingFriends,
    data: friendData,
    error: friendError,
  } = useGetFriendsForCreateGroupChatQuery({ fetchPolicy: 'network-only' });

  const {
    createGroupChat: [createGroupChatMutation, { loading: loadingCreateChat }],
  } = useCreateChat();

  useEffect(() => {
    inputRef?.current?.focus();
  }, [inputRef?.current?.id]);

  const formik = useFormik<FormikValues>({
    initialValues: {
      name: '',
      description: '',
      memberIds: [],
    },
    validationSchema: chatSchema,
    onSubmit: (values) => {
      setIsButtonDisabled(true);
      createGroupChatMutation({
        variables: {
          data: values,
        },
      }).then(() => {
        context.closeModal(id);
      });
      showNotification({
        message: 'Created new group chat',
        loading: loadingCreateChat,
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack>
        <Input.Wrapper
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
        </Input.Wrapper>
        <Input.Wrapper error={formik.errors.description} label="Description">
          <Input
            id="description"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.description}
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
            <UserMultiSelect
              label={'Friends'}
              users={friendData?.friends ?? []}
              onChange={(users) => {
                formik.values.memberIds = users.map((x) => x);
                formik.handleChange('');
              }}
            />
          )}
        </Input.Wrapper>
        <Button
          type="submit"
          loading={loadingCreateChat}
          disabled={isButtonDisabled}
        >
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
