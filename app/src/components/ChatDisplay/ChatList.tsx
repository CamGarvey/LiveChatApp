import { Center, Loader, ScrollArea, Stack } from '@mantine/core';
import { ChatItemFragment } from 'graphql/generated/graphql';
import { useDrawer } from 'store';
import ChatItem from './ChatItem';

type Props = {
  chats: ChatItemFragment[];
  loading?: boolean;
};

const ChatList = ({ chats, loading = false }: Props) => {
  const drawer = useDrawer();
  return (
    <ScrollArea
      p={2}
      sx={{
        height: drawer.isOpen ? 'calc(100vh - 245px)' : 'calc(100vh - 190px)',
      }}
    >
      <Stack spacing={4} p={4}>
        {loading ? (
          <Center>
            <Loader />
          </Center>
        ) : (
          chats.map(
            (chat) =>
              chat.__typename !== 'DeletedChat' && (
                <ChatItem key={chat.id} chat={chat} />
              )
          )
        )}
      </Stack>
    </ScrollArea>
  );
};

export default ChatList;
