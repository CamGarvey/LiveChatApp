import { ActionIcon, Input, Tabs, Tooltip } from '@mantine/core';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { IconSearch, IconUser, IconUsers, IconCirclePlus } from '@tabler/icons';
import ChatList from './ChatList';
import { useCreateGroupChatModal } from 'components/Modals/CreateGroupChatModal';
import { useDrawer } from 'store';
import { useFriendSelectorModal } from 'components/Modals/FriendSelectorModal';
import { useCreateChat } from 'hooks';
import { gql } from '@apollo/client';
import ChatItem from './ChatItem';
import {
  GetChatsForChatDisplayChangesDocument,
  GetChatsForChatDisplayChangesSubscription,
  GetChatsForChatDisplayQuery,
  useGetChatsForChatDisplayQuery,
} from 'graphql/generated/graphql';
import { useNavigate } from 'react-router-dom';

gql`
  query GetChatsForChatDisplay {
    chats {
      ...ChatForChatDisplay
    }
  }
  subscription GetChatsForChatDisplayChanges {
    chatAccessAlerts {
      chat {
        ...ChatForChatDisplay
      }
    }
  }
  fragment ChatForChatDisplay on Chat {
    id
    ...ChatItem
    createdBy {
      id
      username
    }
    ... on GroupChat {
      members {
        id
        username
        name
      }
    }
    ... on DirectMessageChat {
      friend {
        id
        username
        name
      }
    }
  }
  ${ChatItem.fragments.chat}
`;

const ChatDisplay = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string | null>('groups');
  const { loading, data, subscribeToMore } = useGetChatsForChatDisplayQuery();
  const [filter, setFilter] = useState('');
  const openCreateGroupChat = useCreateGroupChatModal();
  const openFriendSelector = useFriendSelectorModal();
  const {
    createDirectMessageChat: [createDirectMessageChat],
  } = useCreateChat();
  const drawer = useDrawer();

  useEffect(() => {
    const unsubscribe =
      subscribeToMore<GetChatsForChatDisplayChangesSubscription>({
        document: GetChatsForChatDisplayChangesDocument,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const accessAlert = subscriptionData.data.chatAccessAlerts;

          if (!accessAlert) {
            throw new Error('No access alert found');
          }

          switch (accessAlert.__typename) {
            case 'ChatMemberAccessGrantedAlert':
              return Object.assign({}, prev, {
                chats: [
                  ...prev.chats.filter((x) => x.id !== accessAlert.chat.id),
                  accessAlert.chat,
                ],
              } as GetChatsForChatDisplayQuery);
            case 'ChatMemberAccessRevokedAlert':
              navigate('/chats', { replace: true });
              return Object.assign({}, prev, {
                chats: prev.chats.filter((x) => x.id !== accessAlert.chat.id),
              } as GetChatsForChatDisplayQuery);
            default:
              return prev;
          }
        },
      });
    return () => unsubscribe();
  }, [subscribeToMore, navigate]);

  const filteredChats = useMemo(
    () =>
      data?.chats?.filter((c) => {
        if (c.__typename === 'GroupChat') {
          return c.name.toLowerCase().includes(filter);
        }
        if (c.__typename === 'DirectMessageChat') {
          return (
            c.friend.username.toLowerCase().includes(filter) ||
            c.friend.name?.toLowerCase().includes(filter)
          );
        }
        return false;
      }) ?? [],
    [data?.chats, filter]
  );

  const filteredGroupChats = useMemo(
    () => filteredChats.filter((c) => c.__typename === 'GroupChat'),
    [filteredChats]
  );

  const filteredDirectMessageChats = useMemo(
    () => filteredChats.filter((c) => c.__typename === 'DirectMessageChat'),
    [filteredChats]
  );

  const handleOpenCreate = useCallback(() => {
    drawer.close();
    if (activeTab === 'groups') {
      openCreateGroupChat();
    } else {
      openFriendSelector({
        onSelect: (user) => {
          createDirectMessageChat({
            variables: {
              friendId: user.id,
            },
          });
        },
      });
    }
  }, [
    drawer,
    activeTab,
    openCreateGroupChat,
    openFriendSelector,
    createDirectMessageChat,
  ]);

  return (
    <Tabs value={activeTab} onTabChange={setActiveTab}>
      <Tabs.List grow>
        <Tabs.Tab value="groups" icon={<IconUsers size={14} />}>
          Groups
        </Tabs.Tab>
        <Tabs.Tab value="direct" icon={<IconUser size={14} />}>
          Direct Messages
        </Tabs.Tab>
      </Tabs.List>
      <Input
        disabled={loading}
        mt={10}
        radius={'sm'}
        placeholder={
          activeTab === 'groups' ? 'Search Groups' : 'Search Direct Messages'
        }
        maxLength={15}
        icon={<IconSearch />}
        onChange={(e: any) => {
          setFilter(e.target.value.toLowerCase());
        }}
        rightSection={
          <Tooltip
            label={
              activeTab === 'groups'
                ? 'Create a new group'
                : 'Create a new direct message'
            }
            position={'bottom'}
          >
            <ActionIcon onClick={handleOpenCreate} color={'default'}>
              <IconCirclePlus />
            </ActionIcon>
          </Tooltip>
        }
      />
      <Tabs.Panel value="groups" pt="xs">
        <ChatList chats={filteredGroupChats} loading={loading} />
      </Tabs.Panel>
      <Tabs.Panel value="direct" pt="xs">
        <ChatList chats={filteredDirectMessageChats} loading={loading} />
      </Tabs.Panel>
    </Tabs>
  );
};

export default ChatDisplay;
