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
import { UserContext } from './context/UserContext';
import { useAuth0 } from '@auth0/auth0-react';
import {
  GetMeDocument,
  GetMeQuery,
  MeChangedDocument,
  MeChangedSubscription,
  useGetMeLazyQuery,
  useGetMeQuery,
} from './graphql/generated/graphql';
import { useEffect } from 'react';
import { NotificationsProvider } from '@mantine/notifications';
import { useLazyQuery } from '@apollo/client';

export const App = () => {
  // const { user, isAuthenticated, isLoading } = useAuth0();

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
                <Route
                  path="/chat"
                  element={<ProtectedRoute component={Chat} />}
                >
                  <Route
                    path=":channelId"
                    element={<ProtectedRoute component={Chat} />}
                  />
                </Route>
              </Routes>
            </BrowserRouter>
          </ModalsProvider>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};
