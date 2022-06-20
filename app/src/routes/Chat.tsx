import {
  AppShell,
  Button,
  Center,
  Container,
  Group,
  LoadingOverlay,
  Text,
} from '@mantine/core';
import { useParams } from 'react-router-dom';
import ChatPanel from '../components/Chat/ChatPanel';
import ChannelInfoAside from '../components/Chat/ChannelInfoAside';
import ChannelNav from '../components/Layout/ChannelNav';
import Header from '../components/Layout/Header';
import Drawer from '../components/Layout/Drawer';
import CreateChannelModal from '../components/Modals/CreateChannelModal/CreateChannelModal';
import UserSearchModal from '../components/Modals/UserSearchModal/UserSearchModal';
import { useOpenModal } from '../components/store';
import { ModalType } from '../models';
import { useEffect } from 'react';
import { useGetChannelInfoLazyQuery } from '../graphql/generated/graphql';

const Chat = () => {
  const { channelId } = useParams();
  const openCreateChannelModal = useOpenModal(ModalType.CreateChannel);
  const [getChannelInfo, { data, loading }] = useGetChannelInfoLazyQuery();

  useEffect(() => {
    if (channelId) {
      getChannelInfo({
        variables: {
          channelId,
        },
      });
    }
  }, [channelId, getChannelInfo]);

  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="md"
      header={<Header channel={data?.channel} />}
      navbar={<ChannelNav />}
      aside={
        channelId && (
          <ChannelInfoAside channel={data?.channel} isLoading={loading} />
        )
      }
      fixed
    >
      <CreateChannelModal />
      <UserSearchModal />
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
