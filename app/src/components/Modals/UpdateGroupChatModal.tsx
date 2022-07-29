import { useFormik } from 'formik';
import { useCallback, useMemo, useRef } from 'react';
import UserSelector from '../UserSelector/UserSelector';
import {
  useGetFriendsQuery,
  useUpdateGroupChatMutation,
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
import _ from 'lodash';

type Props = {
  chat: {
    id: string;
    name: string;
    description?: string;
    members: {
      id: string;
      username: string;
    }[];
  };
};

export const UpdateGroupChatModal = ({
  context,
  id,
  innerProps: { chat },
}: ContextModalProps<Props>) => {
  const inputRef = useRef<HTMLInputElement>();
  const [updateChat, { loading: loadingUpdate }] = useUpdateGroupChatMutation();
  const {
    loading: loadingFriends,
    data: friendData,
    error: friendError,
  } = useGetFriendsQuery();

  const memberIds = useMemo(() => chat.members.map((x) => x.id), [chat]);

  // Since other friends can add either friends
  // We need to make sure that we get all of the users in the chat
  // So that if the user takes a non friend out of the UserSelector
  // they can add them back in if it was a mistake
  const totalUsers = useMemo(() => {
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

  const formik = useFormik({
    initialValues: {
      name: chat.name,
      description: chat.description ?? '',
      isPrivate: true,
      memberIds,
    },
    validationSchema: chatSchema,
    onSubmit: (values) => {
      const membersRemoved = memberIds.filter(
        (x) => !values.memberIds.includes(x)
      );
      const membersAdded = values.memberIds.filter(
        (x) => !memberIds.includes(x)
      );
      updateChat({
        variables: {
          data: {
            chatId: chat.id,
            name: values.name,
            description: values.description,
            addMemberIds: membersAdded,
            removeMemberIds: membersRemoved,
          },
        },
      }).then(() => context.closeModal(id));
    },
  });

  const handleChangeValue = useCallback(
    (value) => {
      formik.setFieldValue('memberIds', value);
    },
    [formik]
  );

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
              users={totalUsers}
              defaultValue={chat.members}
              onChange={handleChangeValue}
            />
          )}
        </InputWrapper>
        <Button
          type="submit"
          loading={loadingUpdate}
          disabled={loadingFriends || !formik.dirty}
        >
          Update
        </Button>
      </Stack>
    </form>
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
