import { gql } from '@apollo/client';
import {
  MediaQuery,
  Aside,
  Text,
  LoadingOverlay,
  ScrollArea,
  Title,
  ActionIcon,
  Group,
  Menu,
} from '@mantine/core';
import { useUpdateGroupChatModal } from 'components/Modals/UpdateGroupChatModal';
import ChatUpdateAction from 'components/shared/ChatUpdateAction';
import UserItem from 'components/shared/UserItem';
import { useChat } from 'context/ChatContext';
import { useGetChatForChatInfoAsideQuery } from 'graphql/generated/graphql';
import { Settings, UserPlus } from 'tabler-icons-react';

gql`
  query GetChatForChatInfoAside($chatId: HashId!) {
    chat(chatId: $chatId) {
      __typename
      ... on DirectMessageChat {
        friend {
          username
        }
      }
      ... on GroupChat {
        name
        members {
          id
          ...UserItem
        }
      }
    }
  }
  ${UserItem.fragments.user}
`;

const ChatInfoAside = () => {
  const { chatId } = useChat();
  const { data, loading } = useGetChatForChatInfoAsideQuery({
    variables: {
      chatId,
    },
  });

  const chat = data?.chat;

  let displayName;
  switch (chat?.__typename) {
    case 'GroupChat':
      displayName = chat.name;
      break;
    case 'DirectMessageChat':
      displayName = chat.friend.username;
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
        <LoadingOverlay visible={loading} />
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
                      menu={
                        <Menu>
                          <Menu.Item>yo</Menu.Item>
                        </Menu>
                      }
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
