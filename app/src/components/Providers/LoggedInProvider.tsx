import {
  AppShell,
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from 'routes/Home';
import ProtectedRoute from 'components/ProtectedRoute';
import { ModalsProvider } from '@mantine/modals';
import { UserSearchModal } from 'components/Modals/UserSearchModal';
import { CreateGroupChatModal } from 'components/Modals/CreateGroupChatModel/CreateGroupChatModal';
import { UpdateGroupChatModal } from 'components/Modals/UpdateGroupChatModal';
import { NotificationsProvider } from '@mantine/notifications';
import Chats from 'routes/Chats';
import { UserContext } from 'context/UserContext';
import { useLiveNotifications } from 'hooks';
import { ChatContext } from 'context/ChatContext';
import Drawer from 'components/Layout/Drawer';
import ChatNav from 'components/Layout/ChatNav';
import Header from 'components/Layout/Header/Header';
import ChatInfoAside from 'components/Chat/ChatInfoAside';
import { NotificationContext } from 'context/NotificationContext';
import { useAuth0 } from '@auth0/auth0-react';
import { useGetMeQuery } from 'graphql/generated/graphql';

type Props = {
  children: any;
};

const LoggedInProvider = ({ children }: Props) => {
  const { notifications, loading: isLoadingNotifications } =
    useLiveNotifications();
  const { data: userData, loading: isLoadingUser } = useGetMeQuery();

  return (
    <UserContext.Provider
      value={{
        user: userData?.me,
        isLoading: isLoadingUser,
      }}
    >
      <NotificationContext.Provider
        value={{
          notifications,
          isLoading: isLoadingNotifications,
        }}
      >
        <ModalsProvider
          modals={{
            userSearch: UserSearchModal,
            createGroupChat: CreateGroupChatModal,
            updateGroupChat: UpdateGroupChatModal,
          }}
        >
          <AppShell
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="md"
            header={<Header />}
            navbar={<ChatNav />}
            aside={<ChatInfoAside />}
            fixed
          >
            <Drawer />
            {children}
          </AppShell>
        </ModalsProvider>
      </NotificationContext.Provider>
    </UserContext.Provider>
  );
};

export default LoggedInProvider;
