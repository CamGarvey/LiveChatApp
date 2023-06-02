import { useAuth0 } from '@auth0/auth0-react';
import { Button, MediaQuery, Navbar } from '@mantine/core';
import ChatDisplay from 'components/ChatDisplay/ChatDisplay';

export const ChatNavbar = () => {
  const s = useAuth0();
  return (
    <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
      <Navbar p="xs" width={{ base: 350 }}>
        <Navbar.Section
          grow
          styles={{
            viewport: {
              paddingLeft: '5px',
            },
          }}
        >
          <Button onClick={() => s.logout()}></Button>
          <ChatDisplay />
        </Navbar.Section>
      </Navbar>
    </MediaQuery>
  );
};
