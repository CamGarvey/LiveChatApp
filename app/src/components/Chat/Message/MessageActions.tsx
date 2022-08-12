import { ActionIcon, Group, Menu, Text } from '@mantine/core';
import { DotsVertical, Trash } from 'tabler-icons-react';
import { openConfirmModal } from '@mantine/modals';

type Props = {
  onDelete: () => void;
};

const MessageActions = ({ onDelete }: Props) => {
  const openModal = () =>
    openConfirmModal({
      title: 'Delete Message',
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete this message?
          <br />
          This can not be undone
        </Text>
      ),
      withCloseButton: false,
      labels: { confirm: 'Delete message', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: onDelete,
    });
  return (
    <Group>
      <ActionIcon type="button" size={18}>
        <Trash onClick={openModal} />
      </ActionIcon>
    </Group>
  );
};

export default MessageActions;
