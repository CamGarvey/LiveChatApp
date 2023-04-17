import { gql } from '@apollo/client';
import {
  ActionIcon,
  ActionIconProps,
  MantineNumberSize,
  Tooltip,
  TooltipProps,
} from '@mantine/core';
import { useUpdateGroupChatModal } from 'components/Modals/UpdateGroupChatModal';
import { IconSettings } from '@tabler/icons';
import { useMemo } from 'react';
import { ChatUpdateActionGroupChatFragment } from 'graphql/generated/graphql';

type Props = {
  chat: ChatUpdateActionGroupChatFragment;
  size?: MantineNumberSize;
  tooltipProps?: TooltipProps;
} & ActionIconProps;

const ChatUpdateAction = ({ chat, tooltipProps, ...other }: Props) => {
  const openGroupChatUpdate = useUpdateGroupChatModal();

  const disabled = useMemo(() => {
    if (chat?.__typename === 'GroupChat') {
      if (chat.role === 'ADMIN' || chat.role === 'OWNER') {
        return false;
      }
    }
    return true;
  }, [chat]);

  return (
    <Tooltip
      label={disabled ? 'Unauthorized' : 'Update'}
      position={'bottom'}
      openDelay={1000}
      {...tooltipProps}
    >
      <ActionIcon
        size={'xs'}
        color={'default'}
        disabled={disabled}
        onClick={() => {
          openGroupChatUpdate({ chatId: chat.id });
        }}
        {...other}
      >
        <IconSettings />
      </ActionIcon>
    </Tooltip>
  );
};

ChatUpdateAction.fragments = {
  chat: gql`
    fragment ChatUpdateActionGroupChat on GroupChat {
      id
      role
    }
  `,
};

export default ChatUpdateAction;
