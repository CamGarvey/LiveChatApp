import { ActionIcon, Text } from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';
import { IconTrash } from '@tabler/icons-react';

type Props = {
  onDelete: () => void;
};

const DeleteEventAction = ({ onDelete }: Props) => {
  const openModal = () =>
    openConfirmModal({
      title: 'Are you sure?',
      centered: true,
      children: <Text size="sm">This can not be undone</Text>,
      withCloseButton: false,
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: onDelete,
    });

  return (
    <ActionIcon type="button" size={18}>
      <IconTrash onClick={openModal} />
    </ActionIcon>
  );
};

export default DeleteEventAction;
