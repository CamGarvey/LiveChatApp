import { gql } from '@apollo/client';
import {
  ActionIcon,
  ActionIconProps,
  MantineNumberSize,
  Tooltip,
  TooltipProps,
} from '@mantine/core';
import { useUpdateGroupChatModal } from 'components/Modals/UpdateGroupChatModal';
import { IconSettings } from '@tabler/icons-react';
import { ChatUpdateActionGroupChatFragment } from 'graphql/generated/graphql';

type Props = {
  chat: ChatUpdateActionGroupChatFragment;
  size?: MantineNumberSize;
  tooltipProps?: TooltipProps;
} & ActionIconProps;

const ChatUpdateAction = ({ chat, tooltipProps, ...other }: Props) => {
  const openGroupChatUpdate = useUpdateGroupChatModal();

  const disabled = chat.role === 'BASIC';

  return (
    <Tooltip
      label={disabled ? 'Unauthorized' : 'Update'}
      position={'bottom'}
      openDelay={1000}
      {...tooltipProps}
    >
      <ActionIcon
        size={'xs'}
        radius={'xl'}
        color={'default'}
        disabled={disabled}
        onClick={() => {
          openGroupChatUpdate({ chat });
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
      ...UseUpdateGroupChatModelChat
    }
    ${useUpdateGroupChatModal.fragments.chat}
  `,
};

export default ChatUpdateAction;
