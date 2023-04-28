import { Center, Loader, ScrollArea, Stack } from '@mantine/core';
import { useDrawer } from 'store';

type Props = {
  loading?: boolean;
  children: React.ReactNode[];
};

const ChatList = ({ children, loading = false }: Props) => {
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
          children
        )}
      </Stack>
    </ScrollArea>
  );
};

export default ChatList;
