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
  FriendRequestCreatedDocument,
  FriendRequestCreatedSubscription,
  GetMeQuery,
  useGetMeLazyQuery,
} from './graphql/generated/graphql';
import { useEffect } from 'react';
import { NotificationsProvider } from '@mantine/notifications';

export const App = () => {
  const { user, isAuthenticated, isLoading: isLoadingAuth } = useAuth0();

  const [getData, { data: userData, loading: isLoadingUser, subscribeToMore }] =
    useGetMeLazyQuery({
      nextFetchPolicy: 'cache-first',
    });
  const authUser = userData?.me;

  useEffect(() => {
    if (isAuthenticated) {
      getData();
    }
  }, [isAuthenticated, user, getData]);

  useEffect(() => {
    if (userData) {
      const unsubscribe = subscribeToMore<FriendRequestCreatedSubscription>({
        document: FriendRequestCreatedDocument,

        updateQuery: (prev, { subscriptionData }) => {
          console.log({ prev, userData });
          if (!subscriptionData.data || !prev) return prev;
          const request = subscriptionData.data.friendRequestCreated;
          console.log(request);

          const newCache = Object.assign({}, prev, {
            me: {
              receivedFriendRequests: [
                ...prev.me.receivedFriendRequests,
                request,
              ],
            },
          } as GetMeQuery);
          return newCache;
        },
      });
      return () => unsubscribe();
    }
  }, [subscribeToMore, user, isAuthenticated, userData]);

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
            <UserContext.Provider
              value={{
                user: isAuthenticated ? authUser : null,
                isLoading: isLoadingAuth || isLoadingUser,
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
            </UserContext.Provider>
          </ModalsProvider>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};
