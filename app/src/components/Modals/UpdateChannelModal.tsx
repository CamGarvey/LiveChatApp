import { useFormik } from 'formik';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import UserSelector from '../UserSelector/UserSelector';
import {
  FriendStatus,
  useGetFriendsQuery,
  useUpdateChannelMutation,
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
import { ChannelInfo } from '../../models';
import _ from 'lodash';

type Props = {
  channel: ChannelInfo;
};

export const UpdateChannelModal = ({
  context,
  id,
  innerProps: { channel },
}: ContextModalProps<Props>) => {
  const inputRef = useRef<HTMLInputElement>();
  const [updateChannel, { loading: loadingUpdate }] =
    useUpdateChannelMutation();
  const {
    loading: loadingFriends,
    data: friendData,
    error: friendError,
  } = useGetFriendsQuery();

  const memberIds = useMemo(() => channel.members.map((x) => x.id), [channel]);

  // Since other friends can add either friends
  // We need to make sure that we get all of the users in the chat
  // So that if the user takes a non friend out of the UserSelector
  // they can add them back in if it was a mistake
  const totalUsers = useMemo(() => {
    if (friendData)
      return _.unionBy(
        channel.members,
        friendData.friends.map((x) => ({
          ...x,
          friendStatus: FriendStatus.Friend,
        })),
        'id'
      );
    return channel.members;
  }, [channel, friendData]);

  const formik = useFormik({
    initialValues: {
      name: channel.name,
      description: channel.description ?? '',
      isPrivate: true,
      memberIds,
    },
    validationSchema: channelSchema,
    onSubmit: (values) => {
      const membersRemoved = memberIds.filter(
        (x) => !values.memberIds.includes(x)
      );
      const membersAdded = values.memberIds.filter(
        (x) => !memberIds.includes(x)
      );
      console.log({
        membersAdded: totalUsers.filter((x) => membersAdded.includes(x.id)),
        membersRemoved: channel.members.filter((x) =>
          membersRemoved.includes(x.id)
        ),
      });
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
              defaultValue={channel.members}
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

export const useUpdateChannelModal = () => {
  const modals = useModals();
  return (props: Props) =>
    modals.openContextModal('updateChannel', {
      title: 'Update Channel',
      innerProps: props,
    });
};
