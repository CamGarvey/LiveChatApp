import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  UseDisclosureProps,
} from '@chakra-ui/react';
import React from 'react';

type Props = {};

const CreateChannelModal = ({
  isOpen,
  onOpen,
  onClose,
}: UseDisclosureProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Channel</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Create</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CreateChannelModal;
