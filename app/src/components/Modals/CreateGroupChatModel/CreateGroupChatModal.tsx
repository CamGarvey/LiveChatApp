import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import UserSelector from '../../shared/UserSelector/UserSelector';
import { useGetFriendsQuery } from 'graphql/generated/graphql';
import {
  Button,
  Center,
  Input,
  InputWrapper,
  Loader,
  Stack,
} from '@mantine/core';
import { ContextModalProps, useModals } from '@mantine/modals';
import { chatSchema } from 'models/validation-schemas';
import { useCreateChat } from 'hooks/useCreateChat';

export const CreateGroupChatModal = ({
  context,
  id,
}: ContextModalProps<{}>) => {
  const inputRef = useRef<HTMLInputElement>();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const {
    loading: loadingFriends,
    data: friendData,
    error: friendError,
  } = useGetFriendsQuery({ fetchPolicy: 'network-only' });

  const [createGroupChatMutation, { loading: loadingCreateChat }] =
    useCreateChat();

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
      setIsButtonDisabled(true);
      createGroupChatMutation({
        variables: {
          data: values,
        },
      }).then(() => {
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
