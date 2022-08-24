import { Center, Input, ScrollArea, Stack, Text } from '@mantine/core';
import { useState } from 'react';
import { Search } from 'tabler-icons-react';
import ChatItem from './ChatItem';
import { gql } from '@apollo/client';
import { useGetChatsForDisplayQuery } from 'graphql/generated/graphql';

gql`
  query GetChatsForDisplay {
    chats {
      ...ChatItem
      createdBy {
        username
      }
    }
  }
  ${ChatItem.fragments.chat}
`;

type Props = {
  onChatClick?: (chat: any) => void;
};

const ChatDisplay = ({ onChatClick }: Props) => {
  const { loading, data } = useGetChatsForDisplayQuery();
  const [filter, setFilter] = useState('');

  const filteredChats = data?.chats.filter((c) => {
    if (c.__typename === 'GroupChat') {
      return c.name.toLowerCase().includes(filter);
    }
    if (c.__typename === 'DirectMessageChat') {
      return c.createdBy.username.toLowerCase().includes(filter);
    }
    return false;
  });

  return (
    <Stack spacing={'md'}>
      <Input
        disabled={loading}
        radius={'sm'}
        placeholder="Search Groups"
        maxLength={15}
        icon={<Search />}
        onChange={(e: any) => {
          setFilter(e.target.value.toLowerCase());
        }}
      />
      <ScrollArea p={2}>
        <Stack spacing={4}>
          {!loading && data && filteredChats.length > 0 ? (
            filteredChats.map(
              (chat) =>
                chat.__typename !== 'DeletedChat' && (
                  <ChatItem
                    key={chat.id}
                    chat={chat}
                    onClick={() => onChatClick?.(chat)}
                  />
                )
            )
          ) : (
            <Center>
              <Text color={'dimmed'}>Nothing to show</Text>
            </Center>
          )}
        </Stack>
      </ScrollArea>
    </Stack>
  );
};

export default ChatDisplay;
