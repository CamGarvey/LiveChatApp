import { Button, MediaQuery, Navbar, ScrollArea } from '@mantine/core';
import ChatDisplay from '../shared/ChatDisplay';
import { useCreateGroupChatModal } from '../Modals/CreateGroupChatModal';

const ChatNav = () => {
  const openChatModal = useCreateGroupChatModal();

  return (
    <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
      <Navbar p="xs" width={{ base: 300 }}>
        <Navbar.Section
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
          <ChatDisplay />
        </Navbar.Section>
        <Navbar.Section>
          <Button fullWidth onClick={openChatModal}>
            Create Chat
          </Button>
        </Navbar.Section>
      </Navbar>
    </MediaQuery>
  );
};

export default ChatNav;
