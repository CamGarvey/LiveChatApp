import { useAuth0 } from '@auth0/auth0-react';
import {
  AppShell,
  Aside,
  Center,
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  MediaQuery,
  Text,
} from '@mantine/core';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import { useState } from 'react';
import Chat from './components/Chat/Chat';
import Header from './components/Layout/Header';
import ChannelNav from './components/Layout/ChannelNav';
import ChannelInfoSidebar from './components/Layout/ChannelInfoSidebar';

export const App = () => {
  const { isAuthenticated, user } = useAuth0();
  const [channel, setChannel] = useState<number>(null);
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  useEffect(() => {});

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
          navbar={
            isAuthenticated && <ChannelNav onChannelSelected={setChannel} />
          }
          aside={isAuthenticated && <ChannelInfoSidebar channelId={channel} />}
        >
          {channel ? (
            <Chat channelId={channel} />
          ) : isAuthenticated ? (
            <Center>Pick a channel</Center>
          ) : (
            <Center>Welcome to GraphChat</Center>
          )}
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};
