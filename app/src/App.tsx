import { useAuth0 } from '@auth0/auth0-react';
import {
  AppShell,
  Center,
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import { useState } from 'react';
import Chat from './components/Chat/Chat';
import Header from './components/Layout/Header';
import Nav from './components/Layout/Nav';

export const App = () => {
  const { isAuthenticated } = useAuth0();
  const [channel, setChannel] = useState<number>(null);
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <AppShell
          navbarOffsetBreakpoint="sm"
          asideOffsetBreakpoint="sm"
          fixed
          header={<Header />}
          navbar={isAuthenticated && <Nav onChannelSelected={setChannel} />}
        >
          {channel ? (
            <Chat channelId={channel} />
          ) : (
            <Center>Pick a channel</Center>
          )}
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};
