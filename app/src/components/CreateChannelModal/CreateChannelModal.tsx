import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  UseDisclosureProps,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Button,
  Spinner,
  Center,
  FormErrorMessage,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect, useRef } from 'react';
import UserSelector from '../UserSelector/UserSelector';
import {
  useCreateChannelMutation,
  useGetFriendsForSearchQuery,
} from '../../graphql/generated/graphql';

type Props = {
  isOpen?: boolean;
  onOpen?: boolean;
  onClose?: (channelId?: number) => void;
};

const CreateChannelModal = ({ isOpen, onClose }: Props) => {
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
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Channel</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={formik.handleSubmit}>
            <Flex direction={'column'} gap={'10px'}>
              <FormControl
                isInvalid={formik.errors.name && formik.touched.name}
              >
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  id="name"
                  type="text"
                  ref={inputRef}
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
                <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={
                  formik.errors.description && formik.touched.description
                }
              >
                <FormLabel htmlFor="description">
                  Description (Optional)
                </FormLabel>
                <Input
                  id="description"
                  type="text"
                  ref={inputRef}
                  onChange={formik.handleChange}
                  value={formik.values.description}
                />
                <FormErrorMessage>{formik.errors.description}</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="friends">Friends</FormLabel>
                {loadingFriends ? (
                  <Spinner />
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
              </FormControl>
              {createChannelError && (
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
              )}
              <Button
                type="submit"
                colorScheme="purple"
                width="full"
                isLoading={loadingCreateChannel}
              >
                Create
              </Button>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
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

export default CreateChannelModal;
