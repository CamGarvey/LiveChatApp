import { gql } from '@apollo/client';
import { ActionIcon, MantineNumberSize, Tooltip } from '@mantine/core';
import { useUpdateGroupChatModal } from 'components/Modals/UpdateGroupChatModal';
import { useGetChatForChatUpdateActionLazyQuery } from 'graphql/generated/graphql';
import { IconSettings } from '@tabler/icons';
import { useParams } from 'react-router-dom';
import { FloatingPosition } from '@mantine/core/lib/Floating';
import { useEffect, useMemo } from 'react';

gql`
  query GetChatForChatUpdateAction($chatId: HashId!) {
    chat(chatId: $chatId) {
      ... on GroupChat {
        role
      }
    }
  }
`;

type Props = {
  size?: MantineNumberSize;
  tooltip?: {
    position?: FloatingPosition;
  };
};

const ChatUpdateAction = (props: Props) => {
  const { chatId } = useParams();
  const [getChat, { loading, data }] = useGetChatForChatUpdateActionLazyQuery();

  useEffect(() => {
    if (chatId) {
      getChat({
        variables: {
          chatId,
        },
      });
    }
  }, [chatId, getChat]);

  const openGroupChatUpdate = useUpdateGroupChatModal();

  const chat = data?.chat;

  const disabled = useMemo(() => {
    if (chat?.__typename === 'GroupChat' && !loading) {
      if (chat.role === 'ADMIN') {
        return false;
      }
    }
    return true;
  }, [chat, loading]);

  return (
    <Tooltip
      label={disabled ? 'Unauthorized' : 'Update'}
      position={props?.tooltip?.position ?? 'bottom'}
      openDelay={1000}
    >
      <ActionIcon
        size={props.size ?? 'xs'}
        color={'default'}
        loading={loading}
        disabled={disabled}
        onClick={() => {
          if (chatId && chat?.__typename === 'GroupChat') {
            openGroupChatUpdate({ chatId });
          }
        }}
      >
        <IconSettings />
      </ActionIcon>
    </Tooltip>
  );
};

export default ChatUpdateAction;
