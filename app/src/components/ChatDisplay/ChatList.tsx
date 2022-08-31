import { Center, Loader, ScrollArea, Stack, Text } from '@mantine/core';
import { ChatItemFragment } from 'graphql/generated/graphql';
import ChatItem from './ChatItem';

type Props = {
  chats: ChatItemFragment[];
  loading?: boolean;
};

const ChatList = ({ chats, loading = false }: Props) => {
  return (
    <ScrollArea p={2}>
      <Stack spacing={4} p={4}>
        {loading ? (
          <Center>
            <Loader variant="bars" />
          </Center>
        ) : chats.length > 0 ? (
          chats.map(
            (chat) =>
              chat.__typename !== 'DeletedChat' && (
                <ChatItem key={chat.id} chat={chat} />
              )
          )
        ) : (
          <Center>
            <Text color={'dimmed'}>Nothing to show</Text>
          </Center>
        )}
      </Stack>
    </ScrollArea>
  );
};

export default ChatList;
