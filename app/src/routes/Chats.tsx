import { AppShell } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import ChatInfoAside from 'components/Chat/ChatInfoAside';
import ChatPanel from 'components/Chat/ChatPanel/ChatPanel';
import ChatNav from 'components/Layout/ChatNav';
import Drawer from 'components/Layout/Drawer';
import Header from 'components/Layout/Header/Header';
import { CreateGroupChatModal } from 'components/Modals/CreateGroupChatModal';
import { UpdateGroupChatModal } from 'components/Modals/UpdateGroupChatModal';
import { UserSearchModal } from 'components/Modals/UserSearchModal';
import { ChatContext } from 'context/ChatContext';
import { NotificationContext } from 'context/NotificationContext';
import { UserContext } from 'context/UserContext';
import {
  useGetChatsQuery,
  useGetNotificationsQuery,
  useGetMeQuery,
  NotificationsSubscription,
  NotificationsDocument,
  GetNotificationsQuery,
} from 'graphql/generated/graphql';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PickChat from './PickChat';

const Chats = () => {
  const { chatId } = useParams();
  const { data: chatData, loading: isLoadingChats } = useGetChatsQuery();
  const {
    data: notificationData,
    loading: isLoadingNotifications,
    subscribeToMore,
  } = useGetNotificationsQuery();
  const { data: userData, loading: isLoadingUser } = useGetMeQuery();

  useEffect(() => {
    const unsubscribe = subscribeToMore<NotificationsSubscription>({
      document: NotificationsDocument,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const notification = subscriptionData.data;
        const newCache = Object.assign({}, prev, {
          notifications: [...prev.notifications, notification],
        } as GetNotificationsQuery);
        return newCache;
      },
    });
    return () => unsubscribe();
  }, [notificationData?.notifications, subscribeToMore]);

  return (
    <UserContext.Provider
      value={{
        user: userData?.me,
        isLoading: isLoadingUser,
      }}
    >
      <ChatContext.Provider
        value={{
          chat: chatData?.chats.find((x) => x.id === chatId),
          isLoading: isLoadingChats,
        }}
      >
        <NotificationContext.Provider
          value={{
            notifications: notificationData?.notifications
              ?.filter((x) => ['SENT', 'SEEN'].includes(x.status))
              .filter((x) => !x.isCreator),
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
