import { Modal } from '@mantine/core';
import { useRef } from 'react';
import { ChannelInfo, ModalType } from '../../../models';
import { useCloseModal, useIsModalOpen } from '../../store';

type Props = {
  isLoading: boolean;
  channel: ChannelInfo;
};

const ChannelInfoModal = ({ isLoading, channel }: Props) => {
  const close = useCloseModal(ModalType.ChannelInfo);
  const isModalOpen = useIsModalOpen(ModalType.ChannelInfo);

  return <Modal opened={isModalOpen} onClose={close} title={'Channel'}></Modal>;
};

export default ChannelInfoModal;
