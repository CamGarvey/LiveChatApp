import { Center, Input, Stack, Text } from '@mantine/core';
import { useState } from 'react';
import { Search } from 'tabler-icons-react';
import { useGetChatsQuery } from '../../graphql/generated/graphql';
import ChatItem from './ChatItem';

type Props = {
  onChatClick?: (chat: {
    id: string;
    name: string;
    description?: string;
    members: {
      id: string;
      username: string;
    }[];
  }) => void;
};

const ChatDisplay = ({ onChatClick }: Props) => {
  const { loading, data } = useGetChatsQuery();
  const [filter, setFilter] = useState('');

  const filteredChats =
    data?.chats.filter((c) => c.name.toLowerCase().includes(filter)) ?? [];

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
      <Stack spacing={4}>
        {!loading && data && filteredChats.length > 0 ? (
          filteredChats.map((chat) => (
            <ChatItem
              key={chat.id}
              {...chat}
              onClick={() => onChatClick?.(chat)}
            />
          ))
        ) : (
          <Center>
            <Text color={'dimmed'}>Nothing to show</Text>
          </Center>
        )}
      </Stack>
    </Stack>
  );
};

export default ChatDisplay;
