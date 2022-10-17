import { AppShell } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { UserSearchModal } from 'components/Modals/UserSearchModal';
import { CreateGroupChatModal } from 'components/Modals/CreateGroupChatModal';
import { UpdateGroupChatModal } from 'components/Modals/UpdateGroupChatModal';
import ChatDrawer from 'components/Layout/ChatDrawer';
import ChatNav from 'components/Layout/Nav';
import Header from 'components/Layout/Header/Header';
import ChatInfoAside from 'components/Chat/ChatInfoAside/ChatInfoAside';
import UserProvider from './UserProvider';
import LiveNotificationsProvider from './LiveNotificationsProvider';
import { FriendSelectorModal } from 'components/Modals/FriendSelectorModal';

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
            friendSelector: FriendSelectorModal,
          }}
        >
          <AppShell
            navbarOffsetBreakpoint="sm"
            header={<Header />}
            navbar={<ChatNav />}
            aside={<ChatInfoAside />}
            padding={0}
            fixed
          >
            <ChatDrawer />
            {children}
          </AppShell>
        </ModalsProvider>
      </LiveNotificationsProvider>
    </UserProvider>
  );
};

export default LoggedInProvider;
