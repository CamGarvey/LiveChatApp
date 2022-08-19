import {
  MediaQuery,
  Aside,
  Text,
  LoadingOverlay,
  ScrollArea,
  Title,
  ActionIcon,
  Group,
} from '@mantine/core';
import { useUpdateGroupChatModal } from 'components/Modals/UpdateGroupChatModal';
import ChatUpdateAction from 'components/shared/ChatUpdateAction';
import { ChatMenu, UserItem } from 'components/shared/UserItem';
import { useChat } from 'context/ChatContext';
import { Settings, UserPlus } from 'tabler-icons-react';

const ChatInfoAside = () => {
  const { chat, isLoading } = useChat();
  const openGroupChatUpdate = useUpdateGroupChatModal();

  let displayName;
  switch (chat?.__typename) {
    case 'GroupChat':
      displayName = chat.name;
      break;
    case 'DirectMessageChat':
      displayName = chat.createdBy.username;
      break;
    case 'DeletedChat':
      displayName = 'deleted';
      break;
    default:
      displayName = '';
  }

  return (
    <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
      <Aside p="md" hiddenBreakpoint="md" width={{ md: 300, lg: 300 }}>
        <LoadingOverlay visible={isLoading} />
        {chat && (
          <>
            <Aside.Section>
              <Group>
                <ChatUpdateAction />
                <Title order={4}>{displayName}</Title>
              </Group>
            </Aside.Section>
            <Aside.Section>
              <Group>
                {chat?.__typename === 'GroupChat' ? (
                  <>
                    <Text>Members ({chat.members.length})</Text>
                    <ActionIcon ml={'auto'} variant="light">
                      <UserPlus size={16} />
                    </ActionIcon>
                  </>
                ) : (
                  <>
                    <Text>Members (2)</Text>
                    <ActionIcon ml={'auto'} variant="light">
                      <UserPlus size={16} />
                    </ActionIcon>
                  </>
                )}
              </Group>
            </Aside.Section>
            <Aside.Section
              grow
              component={ScrollArea}
              mx="-xs"
              px="xs"
              styles={{
                viewport: {
                  paddingLeft: '5px',
                },
              }}
              offsetScrollbars={true}
            >
              {chat.__typename === 'GroupChat' &&
                chat.members.map((member) => {
                  return (
                    <UserItem
                      key={member.id}
                      user={{ ...member }}
                      menu={<ChatMenu user={member} chat={chat} />}
                    />
                  );
                })}
            </Aside.Section>
          </>
        )}
      </Aside>
    </MediaQuery>
  );
};

export default ChatInfoAside;
