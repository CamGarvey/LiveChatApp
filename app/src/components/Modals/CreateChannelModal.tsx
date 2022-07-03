import { useFormik } from 'formik';
import { useEffect, useRef } from 'react';
import UserSelector from '../UserSelector/UserSelector';
import {
  GetChannelsDocument,
  GetChannelsQuery,
  useCreateChannelMutation,
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
import { channelSchema } from '../../models/validation-schemas';
import { showNotification } from '@mantine/notifications';

export const CreateChannelModal = ({
  context,
  id,
  innerProps,
}: ContextModalProps<{}>) => {
  const inputRef = useRef<HTMLInputElement>();
  const {
    loading: loadingFriends,
    data: friendData,
    error: friendError,
  } = useGetFriendsQuery();

  const [createChannelMutation, { loading: loadingCreateChannel }] =
    useCreateChannelMutation({
      update: (cache, { data: { createChannel } }) => {
        const { channels } = cache.readQuery<GetChannelsQuery>({
          query: GetChannelsDocument,
        });

        const updatedChannels = [...channels, createChannel];

        cache.writeQuery({
          query: GetChannelsDocument,
          data: {
            channels: updatedChannels,
          },
        });
      },
      onCompleted: (data) =>
        showNotification({
          title: 'Created New Channel',
          message: data.createChannel.name,
        }),
    });

  useEffect(() => {
    inputRef?.current?.focus();
  }, [inputRef?.current?.id]);

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      isPrivate: true,
      memberIds: [],
    },
    validationSchema: channelSchema,
    onSubmit: (values) => {
      createChannelMutation({
        variables: values,
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
        <Button type="submit" loading={loadingCreateChannel}>
          Create
        </Button>
      </Stack>
    </form>
  );
};

export const useCreateChannelModal = () => {
  const modals = useModals();
  return () =>
    modals.openContextModal('createChannel', {
      title: 'Create Channel',
      innerProps: {},
    });
};
