import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect, useRef } from 'react';
import UserSelector from '../../UserSelector/UserSelector';
import {
  useCreateChannelMutation,
  useGetFriendsForSearchQuery,
} from '../../../graphql/generated/graphql';
import {
  Button,
  Center,
  Input,
  InputWrapper,
  Loader,
  Stack,
} from '@mantine/core';
import { ContextModalProps, useModals } from '@mantine/modals';

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
  } = useGetFriendsForSearchQuery();

  const [createChannelMutation, { loading: loadingCreateChannel }] =
    useCreateChannelMutation();

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
            <Loader />
          ) : friendError ? (
            <Center>Failed to load your friends 😥</Center>
          ) : (
            <UserSelector
              label={'Friends'}
              users={friendData.friends}
              onChange={(users) => {
                formik.values.memberIds = users.map((x) => x.id);
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

const createChannelSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Name too short!')
    .max(30, 'Name too long!')
    .required('Name is required'),
  description: Yup.string().max(40, 'Description is too long'),
});

export default CreateChannelModal;
