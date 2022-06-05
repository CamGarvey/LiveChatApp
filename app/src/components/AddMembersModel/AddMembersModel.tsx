import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect, useRef } from 'react';
import UserSelector from '../UserSelector/UserSelector';
import {
  useCreateChannelMutation,
  useGetFriendsForSearchQuery,
} from '../../graphql/generated/graphql';
import {
  Button,
  Center,
  Input,
  InputWrapper,
  Loader,
  Modal,
  Stack,
} from '@mantine/core';

type Props = {
  isOpen?: boolean;
  onOpen?: boolean;
  onClose?: (channelId?: string) => void;
};

const AddMembersModel = ({ isOpen, onClose }: Props) => {
  const inputRef = useRef<HTMLInputElement>();
  const {
    loading: loadingFriends,
    data: friendData,
    error: friendError,
  } = useGetFriendsForSearchQuery();

  const [
    createChannelMutation,
    {
      data: createChannelData,
      loading: loadingCreateChannel,
      error: createChannelError,
    },
  ] = useCreateChannelMutation();

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
    validationSchema: createChannelSchema,
    onSubmit: (values) => {
      createChannelMutation({
        variables: values,
      }).then((c) => {
        onClose(c.data.createChannel.id);
      });
    },
  });

  return (
    <Modal opened={isOpen} onClose={onClose} title={'Create Channel'}>
      <form onSubmit={formik.handleSubmit}>
        <Stack>
          <InputWrapper id="input-demo" required label="Name">
            <Input
              id="name"
              type="text"
              ref={inputRef}
              onChange={formik.handleChange}
              value={formik.values.name}
            />
          </InputWrapper>
          <InputWrapper id="input-demo" label="Description">
            <Input
              id="description"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.description}
            />
          </InputWrapper>
          <InputWrapper label="Friends">
            {loadingFriends ? (
              <Loader />
            ) : friendError ? (
              <Center>Failed to load your friends 😥</Center>
            ) : (
              <UserSelector
                users={friendData.friends}
                onChange={(users) => {
                  formik.values.memberIds = users.map((x) => x.id);
                  formik.handleChange('');
                }}
              />
            )}
          </InputWrapper>
          {/* {createChannelError && (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle>Failed to create channel</AlertTitle>
              <AlertDescription>Try Again Later</AlertDescription>
            </Alert>
          )}
          {createChannelData?.createChannel && (
            <Alert status="success">
              <AlertIcon />
              <AlertTitle>Successfully Created Channel</AlertTitle>
            </Alert>
          )} */}
          <Button type="submit" loading={loadingCreateChannel}>
            Create
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

const createChannelSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Name too short!')
    .max(30, 'Name too long!')
    .required('Name is required'),
  description: Yup.string().max(40, 'Description is too long'),
});

export default AddMembersModel;
