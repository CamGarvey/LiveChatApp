import { AppShell, Button, Center, Group, Text } from '@mantine/core';
import { useParams } from 'react-router-dom';
import ChatPanel from '../components/Chat/ChatPanel';
import ChannelInfoAside from '../components/Chat/ChannelInfoAside';
import ChannelNav from '../components/Layout/ChannelNav';
import Header from '../components/Layout/Header/Header';
import Drawer from '../components/Layout/Drawer';
import { useEffect } from 'react';
import { useSetChannel } from '../components/store';
import { useCreateChannelModal } from '../components/Modals/CreateChannelModal';
import { useGetChannelLazyQuery } from '../graphql/generated/graphql';

const Chat = () => {
  const { channelId } = useParams();
  const openCreateChannelModal = useCreateChannelModal();
  const [getChannel, { data, loading }] = useGetChannelLazyQuery();
  const setChannel = useSetChannel();

  useEffect(() => {
    if (channelId) {
      getChannel({
        variables: {
          channelId,
        },
      });
    }
  }, [channelId, getChannel]);

  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="md"
      header={<Header channel={data?.channel} />}
      navbar={<ChannelNav />}
      aside={
        channelId && (
          <ChannelInfoAside isLoading={loading} channel={data?.channel} />
        )
      }
      fixed
    >
      <Drawer />
      {channelId ? (
        <ChatPanel channelId={channelId} />
      ) : (
        <Center
          style={{
            height: '100%',
          }}
        >
          <Group spacing={'xs'}>
            <Text>Select or</Text>
            <Button onClick={openCreateChannelModal} variant={'light'} compact>
              Create a Channel
            </Button>
          </Group>
        </Center>
      )}
    </AppShell>
  );
};

export default Chat;
