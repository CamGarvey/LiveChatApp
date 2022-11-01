import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import { NotificationsProvider } from '@mantine/notifications';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from 'routes/Home';
import ProtectedRoute from 'components/ProtectedRoute';
import Chats from 'routes/Chats';
import Users from 'routes/Users';
import Chat from 'routes/Chat';

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
        theme={{
          colorScheme,
          primaryColor: 'teal',
          loader: 'bars',
        }}
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
              />
              <Route
                path="/chats/:chatId"
                element={<ProtectedRoute component={Chat} />}
              />
              <Route
                path="/users"
                element={<ProtectedRoute component={Users} />}
              />
            </Routes>
          </BrowserRouter>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};
