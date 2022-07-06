import { AppShell, Button, Center, Group, Text } from '@mantine/core';
import { useParams } from 'react-router-dom';
import ChatPanel from '../components/Chat/ChatPanel';
import ChannelInfoAside from '../components/Chat/ChannelInfoAside';
import ChannelNav from '../components/Layout/ChannelNav';
import Header from '../components/Layout/Header/Header';
import Drawer from '../components/Layout/Drawer';
import { useEffect } from 'react';
import { useSetChannel } from '../components/store';
import { useCreateChannelModal } from '../components/Modals/CreateChannelModal';
import {
  GetMeQuery,
  MeChangedDocument,
  MeChangedSubscription,
  useFriendRequestCreatedSubscription,
  useGetChannelLazyQuery,
  useGetMeLazyQuery,
  useGetMeQuery,
} from '../graphql/generated/graphql';
import { useAuth0 } from '@auth0/auth0-react';
import { UserContext } from '../context/UserContext';

const Chat = () => {
  const { channelId } = useParams();
  const openCreateChannelModal = useCreateChannelModal();
  const [getChannel, { data, loading }] = useGetChannelLazyQuery();
  const setChannel = useSetChannel();
  const { data: friendRequests } = useFriendRequestCreatedSubscription();
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
    if (channelId) {
      getChannel({
        variables: {
          channelId,
        },
      });
    }
  }, [channelId, getChannel]);

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
        header={<Header channel={data?.channel} />}
        navbar={<ChannelNav />}
        aside={
          channelId && (
            <ChannelInfoAside isLoading={loading} channel={data?.channel} />
          )
        }
        fixed
      >
        <Drawer />
        {channelId ? (
          <ChatPanel channelId={channelId} />
        ) : (
          <Center
            style={{
              height: '100%',
            }}
          >
            <Group spacing={'xs'}>
              <Text>Select or</Text>
              <Button
                onClick={openCreateChannelModal}
                variant={'light'}
                compact
              >
                Create a Channel
              </Button>
            </Group>
          </Center>
        )}
      </AppShell>
    </UserContext.Provider>
  );
};

export default Chat;
