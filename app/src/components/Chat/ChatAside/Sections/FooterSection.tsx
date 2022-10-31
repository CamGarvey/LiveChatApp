import { gql } from '@apollo/client';
import { ActionIcon, Aside, Avatar, Button, Center } from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';
import { IconRun } from '@tabler/icons';
import { motion } from 'framer-motion';
import { FooterSectionChatFragment } from 'graphql/generated/graphql';
import { useLeaveChat } from 'hooks';

const MotionButton = motion(Button);

type Props = {
  chat?: FooterSectionChatFragment | null | undefined;
  loading: boolean;
};

export const FooterSection = ({ loading, chat }: Props) => {
  const leave = useLeaveChat();

  if (
    loading ||
    chat?.__typename === 'DeletedChat' ||
    chat?.__typename === 'DirectMessageChat'
  ) {
    return <></>;
  }

  const openConfirm = () =>
    openConfirmModal({
      title: `Are you sure you want to leave, ${
        chat?.__typename === 'GroupChat' ? chat.name : ''
      }`,
      labels: { confirm: 'Leave', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => {
        if (chat) leave(chat.id);
        else console.error('No chat');
      },
    });

  return (
    <Aside.Section>
      <MotionButton
        layout
        sx={{
          marginLeft: 'auto',
          height: '38px',
          borderRadius: '50px 50px 50px 50px',
        }}
        variants={{
          opened: {
            width: '100%',
          },
          closed: {
            width: '38px',
          },
        }}
        color={'red'}
        rightIcon={<IconRun />}
        disabled={chat?.isCreator ?? true}
        onClick={openConfirm}
        compact
      >
        Leave Chat
      </MotionButton>
    </Aside.Section>
  );
};

FooterSection.fragments = {
  chat: gql`
    fragment FooterSectionChat on Chat {
      isCreator
      id
      ... on GroupChat {
        name
      }
    }
  `,
};
