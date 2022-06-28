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
import { UserSearchModal } from './components/Modals/UserSearchModal';
import { CreateChannelModal } from './components/Modals/CreateChannelModal';
import { UpdateChannelModal } from './components/Modals/UpdateChannelModal';

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
            userSearch: UserSearchModal,
            createChannel: CreateChannelModal,
            updateChannel: UpdateChannelModal,
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
