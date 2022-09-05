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
import ChatUpdateAction from 'components/shared/ChatUpdateAction';
import UserItem from 'components/shared/UserItem';
import UserMenu from 'components/shared/UserItem/UserMenu';
import { useGetChatForChatInfoAsideLazyQuery } from 'graphql/generated/graphql';
import { useEffect } from 'react';
import { IconUserPlus, IconDotsVertical, IconKarate } from '@tabler/icons';
import { useParams } from 'react-router-dom';
import { useUpdateGroupChat } from 'hooks';

gql`
  query GetChatForChatInfoAside($chatId: HashId!) {
    chat(chatId: $chatId) {
      ... on DirectMessageChat {
        friend {
          id
          ...UserItem
          ...UserMenu
        }
      }
      ... on GroupChat {
        name
        isAdmin
        createdById
        members {
          id
          ...UserItem
          ...UserMenu
        }
      }
    }
  }
  ${UserItem.fragments.user}
  ${UserMenu.fragments.user}
`;

const ChatInfoAside = () => {
  const { chatId } = useParams();
  const [getChat, { data, loading }] = useGetChatForChatInfoAsideLazyQuery();
  const { removeMember, loading: loadingRemove } = useUpdateGroupChat();

  useEffect(() => {
    if (chatId)
      getChat({
        variables: {
          chatId,
        },
      });
  }, [getChat, chatId]);

  const chat = data?.chat;

  return (
    <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
      <Aside p="md" hiddenBreakpoint="md" width={{ md: 300, lg: 300 }}>
        <LoadingOverlay visible={loading} />
        {chat && chat.__typename !== 'DeletedChat' && (
          <>
            <Aside.Section>
              <Title order={2}>
                {chat.__typename === 'GroupChat'
                  ? 'Group Chat'
                  : 'Direct Message'}
              </Title>
            </Aside.Section>
            <Aside.Section>
              {chat.__typename === 'GroupChat' ? (
                <Group>
                  <ChatUpdateAction />
                  <Title order={4}>{chat.name}</Title>
                </Group>
              ) : (
                <UserItem
                  user={chat.friend}
                  menu={<UserMenu user={chat.friend} />}
                />
              )}
            </Aside.Section>
            {chat.__typename === 'GroupChat' && (
              <Aside.Section>
                <Group>
                  <>
                    <Text>Members ({chat.members.length})</Text>
                    <ActionIcon ml={'auto'} variant="light">
                      <IconUserPlus size={16} />
                    </ActionIcon>
                  </>
                </Group>
              </Aside.Section>
            )}
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
                        <UserMenu
                          loading={loadingRemove}
                          target={{
                            icon: <IconDotsVertical />,
                          }}
                          items={
                            chat.isAdmin && (
                              <Menu.Item
                                onClick={() => {
                                  removeMember({
                                    userId: member.id,
                                    chatId,
                                  });
                                }}
                                icon={<IconKarate size={14} />}
                              >
                                Remove from group
                              </Menu.Item>
                            )
                          }
                          user={member}
                        />
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
