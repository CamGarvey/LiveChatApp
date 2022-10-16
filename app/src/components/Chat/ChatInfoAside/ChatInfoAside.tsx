import { gql } from '@apollo/client';
import {
  MediaQuery,
  Aside,
  Text,
  LoadingOverlay,
  ScrollArea,
  Group,
} from '@mantine/core';
import { useGetChatForChatInfoAsideLazyQuery } from 'graphql/generated/graphql';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ChatMemberItem from './ChatMemberItem';
import GroupChatSettingsButton from './GroupChatSettingsButton';

gql`
  query GetChatForChatInfoAside($chatId: HashId!) {
    chat(chatId: $chatId) {
      ... on DirectMessageChat {
        friend {
          id
          ...ChatMemberItemUser
        }
      }
      ...ChatMemberItemChat
      ... on GroupChat {
        ...GroupChatSettingsButtonChat
        members {
          ...ChatMemberItemUser
        }
      }
    }
  }
  ${GroupChatSettingsButton.fragments.chat}
  ${ChatMemberItem.fragments.user}
  ${ChatMemberItem.fragments.chat}
`;

const ChatInfoAside = () => {
  const { chatId } = useParams();
  const [getChat, { data, loading }] = useGetChatForChatInfoAsideLazyQuery();

  useEffect(() => {
    if (chatId)
      getChat({
        variables: {
          chatId,
        },
      });
  }, [chatId, getChat]);

  const chat = data?.chat;

  return (
    <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
      <Aside p="md" hiddenBreakpoint="md" width={{ md: 300, lg: 300 }}>
        <LoadingOverlay visible={loading} />
        {chatId && chat && chat.__typename !== 'DeletedChat' && (
          <>
            <Aside.Section>
              {chat.__typename === 'GroupChat' && (
                <GroupChatSettingsButton chat={chat} />
              )}
              {chat.__typename === 'DirectMessageChat' && (
                <ChatMemberItem chat={chat} user={chat.friend} />
              )}
            </Aside.Section>
            {chat.__typename === 'GroupChat' && (
              <Aside.Section>
                <Group>
                  <Text>Members ({chat.members.length})</Text>
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
                chat.members.map((member) => (
                  <ChatMemberItem chat={chat} user={member} />
                ))}
            </Aside.Section>
          </>
        )}
      </Aside>
    </MediaQuery>
  );
};

export default ChatInfoAside;
