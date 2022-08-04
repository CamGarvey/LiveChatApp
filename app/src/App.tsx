import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import ProtectedRoute from './components/ProtectedRoute';
import { ModalsProvider } from '@mantine/modals';
import { UserSearchModal } from './components/Modals/UserSearchModal';
import { CreateGroupChatModal } from './components/Modals/CreateGroupChatModal';
import { UpdateGroupChatModal } from './components/Modals/UpdateGroupChatModal';
import { NotificationsProvider } from '@mantine/notifications';
import Chats from './routes/Chats';

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
        <NotificationsProvider>
          <BrowserRouter>
            <Routes>
              <Route index element={<Home />} />
              <Route
                path="/chats"
                element={<ProtectedRoute component={Chats} />}
              >
                <Route
                  path=":chatId"
                  element={<ProtectedRoute component={Chats} />}
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};
