import { AppShell } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { UserSearchModal } from 'components/Modals/UserSearchModal';
import { CreateGroupChatModal } from 'components/Modals/CreateGroupChatModal';
import { UpdateGroupChatModal } from 'components/Modals/UpdateGroupChatModal';
import UserProvider from './UserProvider';
import LiveNotificationsProvider from './LiveNotificationsProvider';
import { FriendSelectorModal } from 'components/Modals/FriendSelectorModal';
import { ChatHeader, ChatNavbar, ChatAside, ChatDrawer } from 'components/Layout';

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
            header={<ChatHeader />}
            navbar={<ChatNavbar />}
            aside={<ChatAside />}
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
