import { AppShell, Button, Center, Group, Text } from '@mantine/core';
import { useParams } from 'react-router-dom';
import ChatPanel from '../components/Chat/ChatPanel';
import ChatInfoAside from '../components/Chat/ChatInfoAside';
import ChatNav from '../components/Layout/ChatNav';
import Header from '../components/Layout/Header/Header';
import Drawer from '../components/Layout/Drawer';
import { useEffect } from 'react';
import { useSetChat } from '../components/store';
import { useCreateChatModal } from '../components/Modals/CreateChatModal';
import {
  GetMeQuery,
  MeChangedDocument,
  MeChangedSubscription,
  useFriendRequestCreatedSubscription,
  useGetChatLazyQuery,
  useGetMeLazyQuery,
  useGetMeQuery,
} from '../graphql/generated/graphql';
import { useAuth0 } from '@auth0/auth0-react';
import { UserContext } from '../context/UserContext';
import PickChat from './PickChat';

const Chat = () => {
  const { chatId } = useParams();
  const openCreateChatModal = useCreateChatModal();
  const [getChat, { data, loading }] = useGetChatLazyQuery();
  const setChat = useSetChat();
  const {
    data: userData,
    loading: isLoadingUser,
    subscribeToMore,
  } = useGetMeQuery();

  useEffect(() => {
    const unsubscribe = subscribeToMore<MeChangedSubscription>({
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
  }, [userData?.me, subscribeToMore]);

  useEffect(() => {
    if (chatId) {
      getChat({
        variables: {
          chatId,
        },
      });
    }
  }, [chatId, getChat]);

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
        header={<Header chat={data?.chat} />}
        navbar={<ChatNav />}
        aside={
          chatId && <ChatInfoAside isLoading={loading} chat={data?.chat} />
        }
        fixed
      >
        <Drawer />
        {chatId ? <ChatPanel chatId={chatId} /> : <PickChat />}
      </AppShell>
    </UserContext.Provider>
  );
};

export default Chat;
