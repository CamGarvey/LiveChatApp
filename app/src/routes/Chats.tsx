import { AppShell } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import ChatInfoAside from 'components/Chat/ChatInfoAside';
import ChatPanel from 'components/Chat/ChatPanel/ChatPanel';
import ChatNav from 'components/Layout/ChatNav';
import Drawer from 'components/Layout/Drawer';
import Header from 'components/Layout/Header/Header';
import { CreateGroupChatModal } from 'components/Modals/CreateGroupChatModel/CreateGroupChatModal';
import { UpdateGroupChatModal } from 'components/Modals/UpdateGroupChatModal';
import { UserSearchModal } from 'components/Modals/UserSearchModal';
import { ChatContext } from 'context/ChatContext';
import { NotificationContext } from 'context/NotificationContext';
import { UserContext } from 'context/UserContext';
import { useGetMeQuery } from 'graphql/generated/graphql';
import { useLiveChats, useLiveNotifications } from 'hooks';
import { useParams } from 'react-router-dom';
import PickChat from './PickChat';

const Chats = () => {
  const { notifications, loading: isLoadingNotifications } =
    useLiveNotifications();

  const { chats, loading: isLoadingChats } = useLiveChats();
  const { data: userData, loading: isLoadingUser } = useGetMeQuery();
  const { chatId } = useParams();

  return (
    <UserContext.Provider
      value={{
        user: userData?.me,
        isLoading: isLoadingUser,
      }}
    >
      <ChatContext.Provider
        value={{
          chat: chats.find((x) => x.id === chatId),
          isLoading: isLoadingChats,
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
              aside={chatId && <ChatInfoAside />}
              fixed
            >
              <Drawer />
              {chatId ? <ChatPanel chatId={chatId} /> : <PickChat />}
            </AppShell>
          </ModalsProvider>
        </NotificationContext.Provider>
      </ChatContext.Provider>
    </UserContext.Provider>
  );
};

export default Chats;
