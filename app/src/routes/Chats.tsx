import { AppShell } from '@mantine/core';
import { useParams } from 'react-router-dom';
import ChatPanel from '../components/Chat/ChatPanel';
import ChatInfoAside from '../components/Chat/ChatInfoAside';
import ChatNav from '../components/Layout/ChatNav';
import Header from '../components/Layout/Header/Header';
import Drawer from '../components/Layout/Drawer';
import { useEffect } from 'react';
import {
  ChatUpdatedDocument,
  ChatUpdatedSubscription,
  GetChatQuery,
  GetMeQuery,
  MeChangedDocument,
  MeChangedSubscription,
  useGetChatLazyQuery,
  useGetMeQuery,
} from '../graphql/generated/graphql';
import { UserContext } from '../context/UserContext';
import PickChat from './PickChat';

const Chats = () => {
  const { chatId } = useParams();
  const [
    getChat,
    {
      called,
      data: channelData,
      loading,
      subscribeToMore: subscribeToMoreChannel,
    },
  ] = useGetChatLazyQuery();
  const {
    data: userData,
    loading: isLoadingUser,
    subscribeToMore: subscribeToMoreUser,
  } = useGetMeQuery();

  useEffect(() => {
    const unsubscribe = subscribeToMoreUser<MeChangedSubscription>({
      document: MeChangedDocument,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        console.log(prev);

        const me = subscriptionData.data;
        const newCache = Object.assign({}, prev, {
          me: {
            ...prev.me,
            receivedFriendRequests: [...me.meChanged.receivedFriendRequests],
          },
        } as GetMeQuery);
        return newCache;
      },
    });
    return () => unsubscribe();
  }, [userData?.me, subscribeToMoreUser]);

  useEffect(() => {
    if (chatId) {
      getChat({
        variables: {
          chatId,
        },
      });
    }
  }, [chatId, getChat]);

  useEffect(() => {
    if (called) {
      const unsubscribe = subscribeToMoreChannel<ChatUpdatedSubscription>({
        document: ChatUpdatedDocument,
        variables: {
          chatId,
        },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          console.log(prev);

          const data = subscriptionData.data.chatUpdated;

          const newCache = Object.assign({}, prev, {
            chat: {
              ...data.chat,
            },
          } as GetChatQuery);
          return newCache;
        },
      });
      return () => {
        unsubscribe();
      };
    }
  }, [subscribeToMoreChannel, channelData, called, chatId]);

  return (
    <UserContext.Provider
      value={{
        user: userData?.me,
        isLoading: isLoadingUser,
      }}
    >
      <AppShell
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="md"
        header={<Header chat={channelData?.chat} />}
        navbar={<ChatNav />}
        aside={
          chatId && (
            <ChatInfoAside isLoading={loading} chat={channelData?.chat} />
          )
        }
        fixed
      >
        <Drawer />
        {chatId ? <ChatPanel chatId={chatId} /> : <PickChat />}
      </AppShell>
    </UserContext.Provider>
  );
};

export default Chats;
