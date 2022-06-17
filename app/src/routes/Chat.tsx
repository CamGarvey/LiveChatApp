import { AppShell, Center } from '@mantine/core';
import { useParams } from 'react-router-dom';
import ChatPanel from '../components/Chat/ChatPanel';
import ChannelInfoSidebar from '../components/Chat/ChannelInfoSidebar';
import ChannelNav from '../components/Layout/ChannelNav';
import Header from '../components/Layout/Header';
import Drawer from '../components/Layout/Drawer';
import CreateChannelModal from '../components/CreateChannelModal/CreateChannelModal';

type Props = {};

const Chat = (props: Props) => {
  const { channelId } = useParams();

  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="md"
      fixed
      header={<Header />}
      navbar={<ChannelNav />}
      aside={channelId && <ChannelInfoSidebar channelId={channelId} />}
    >
      <CreateChannelModal />
      <Drawer />
      {channelId ? (
        <ChatPanel channelId={channelId} />
      ) : (
        <Center
          style={{
            height: '100%',
          }}
        >
          Select or Create a Channel
        </Center>
      )}
    </AppShell>
  );
};

export default Chat;
