import { gql } from '@apollo/client';
import { ActionIcon, Tooltip } from '@mantine/core';
import { useUpdateGroupChatModal } from 'components/Modals/UpdateGroupChatModal';
import {
  useGetChatForChatUpdateActionLazyQuery,
  useGetChatForChatUpdateActionQuery,
} from 'graphql/generated/graphql';
import { IconSettings } from '@tabler/icons';
import { useParams } from 'react-router-dom';
import { FloatingPosition } from '@mantine/core/lib/Floating';
import { useEffect } from 'react';

gql`
  query GetChatForChatUpdateAction($chatId: HashId!) {
    chat(chatId: $chatId) {
      ... on GroupChat {
        isAdmin
      }
    }
  }
`;

type Props = {
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

  let disabled = true;

  if (chat?.__typename === 'GroupChat' && !loading) {
    if (chat.isAdmin) {
      disabled = false;
    }
  }

  return (
    <Tooltip
      label={disabled ? 'Unauthorized' : 'Update'}
      position={props?.tooltip?.position ?? 'bottom'}
    >
      <ActionIcon
        size={'xs'}
        color={'blue'}
        loading={loading}
        disabled={disabled}
        onClick={() => {
          if (chat?.__typename === 'GroupChat') {
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
