import { AppShell } from '@mantine/core';
import { useParams } from 'react-router-dom';
import ChatPanel from '../components/Chat/ChatPanel';
import ChatInfoAside from '../components/Chat/ChatInfoAside';
import ChatNav from '../components/Layout/ChatNav';
import Header from '../components/Layout/Header/Header';
import Drawer from '../components/Layout/Drawer';
import { useEffect } from 'react';
import {
  GetNotificationsQuery,
  NotificationsDocument,
  NotificationsSubscription,
  useGetChatsQuery,
  useGetMeQuery,
  useGetNotificationsQuery,
} from '../graphql/generated/graphql';
import { UserContext } from '../context/UserContext';
import PickChat from './PickChat';
import { NotificationContext } from '../context/NotificationContext';
import { ChatContext } from '../context/ChatContext';

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
        console.log({ prev, subscriptionData });
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
      <NotificationContext.Provider
        value={{
          notifications: notificationData?.notifications,
          isLoading: isLoadingNotifications,
        }}
      >
        <ChatContext.Provider
          value={{
            chat: chatData?.chats.find((x) => x.id === chatId),
            isLoading: isLoadingChats,
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
        </ChatContext.Provider>
      </NotificationContext.Provider>
    </UserContext.Provider>
  );
};

export default Chats;
