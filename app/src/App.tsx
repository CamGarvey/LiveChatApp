import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import Chat from './routes/Chat';
import ProtectedRoute from './components/ProtectedRoute';
import { ModalsProvider } from '@mantine/modals';
import { ChannelInfoModal } from './components/Modals/ChannelInfoModal/ChannelInfoModal';
import { UserSearchModal } from './components/Modals/UserSearchModal/UserSearchModal';
import CreateChannelModal from './components/Modals/CreateChannelModal/CreateChannelModal';

export const App = () => {
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
        <ModalsProvider
          modals={{
            channelInfo: ChannelInfoModal,
            userSearch: UserSearchModal,
            createChannel: CreateChannelModal,
          }}
        >
          <BrowserRouter>
            <Routes>
              <Route index element={<Home />} />
              <Route path="/chat" element={<ProtectedRoute component={Chat} />}>
                <Route
                  path=":channelId"
                  element={<ProtectedRoute component={Chat} />}
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </ModalsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};
