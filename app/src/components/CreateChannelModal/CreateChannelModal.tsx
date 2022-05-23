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
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useEffect, useRef } from 'react';
import UserSelector from '../UserSelector/UserSelector';

const CreateChannelModal = ({
  isOpen,
  onOpen,
  onClose,
}: UseDisclosureProps) => {
  const inputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    inputRef?.current?.focus();
  }, [inputRef?.current?.id]);

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      members: [],
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
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
            <Flex direction={'column'} gap={'5px'}>
              <FormControl>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  id="name"
                  type="text"
                  ref={inputRef}
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
                <FormLabel htmlFor="description">Description</FormLabel>
                <Input
                  id="description"
                  type="text"
                  placeholder="Random Jokes"
                  ref={inputRef}
                  onChange={formik.handleChange}
                  value={formik.values.description}
                />
                <FormLabel htmlFor="friends">Friends</FormLabel>
                <UserSelector />
              </FormControl>
              <Button type="submit" colorScheme="purple" width="full">
                Create
              </Button>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CreateChannelModal;
