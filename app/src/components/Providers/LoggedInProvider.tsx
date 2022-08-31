import { AppShell } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { UserSearchModal } from 'components/Modals/UserSearchModal/UserSearchModal';
import { CreateGroupChatModal } from 'components/Modals/CreateGroupChatModel/CreateGroupChatModal';
import { UpdateGroupChatModal } from 'components/Modals/UpdateGroupChatModal';
import { UserContext } from 'context/UserContext';
import Drawer from 'components/Layout/Drawer';
import ChatNav from 'components/Layout/Nav';
import Header from 'components/Layout/Header/Header';
import ChatInfoAside from 'components/Chat/ChatInfoAside';
import UserProvider from './UserProvider';
import LiveNotificationsProvider from './LiveNotificationsProvider';

type Props = {
  children: any;
};

const LoggedInProvider = ({ children }: Props) => {
  return (
    <UserProvider>
      <LiveNotificationsProvider>
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
      </LiveNotificationsProvider>
    </UserProvider>
  );
};

export default LoggedInProvider;
