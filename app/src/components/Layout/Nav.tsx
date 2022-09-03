import { MediaQuery, Navbar } from '@mantine/core';
import ChatDisplay from 'components/ChatDisplay/ChatDisplay';

const Nav = () => {
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
          <ChatDisplay />
        </Navbar.Section>
      </Navbar>
    </MediaQuery>
  );
};

export default Nav;
