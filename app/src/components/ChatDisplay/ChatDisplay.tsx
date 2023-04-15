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
import { useNavigate } from 'react-router-dom';
import {
  ChatsForChatDisplayDocument,
  ChatsForChatDisplaySubscription,
  GetChatsForChatDisplayQuery,
  useGetChatsForChatDisplayQuery,
} from 'graphql/generated/graphql';

gql`
  query GetChatsForChatDisplay($firstMembers: Int = 2, $afterMember: String) {
    chats {
      ...ChatDisplayChat
    }
  }
  subscription ChatsForChatDisplay(
    $firstMembers: Int = 2
    $afterMember: String
  ) {
    chats {
      ...ChatDisplayChat
    }
  }

  fragment ChatDisplayChat on Chat {
    id
    ...ChatItem
    createdBy {
      id
      username
    }
    ... on GroupChat {
      members(first: $firstMembers, after: $afterMember) {
        totalCount
        edges {
          node {
            id
            user {
              id
              username
              name
            }
          }
        }
      }
    }
    ... on DirectMessageChat {
      receipent {
        id
        user {
          id
          username
          name
        }
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
    const unsubscribe = subscribeToMore<ChatsForChatDisplaySubscription>({
      document: ChatsForChatDisplayDocument,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const chat = subscriptionData.data.chats;

        if (!chat) {
          throw new Error('Update query failed, no chat found');
        }

        switch (chat.__typename) {
          case 'ForbiddenChat':
          case 'DeletedChat':
            navigate('/chats', { replace: true });
            return Object.assign({}, prev, {
              chats: prev.chats.filter((x) => x.id !== chat.id),
            } as GetChatsForChatDisplayQuery);
          case 'DirectMessageChat':
          case 'GroupChat':
            return Object.assign({}, prev, {
              chats: [prev.chats.filter((x) => x.id !== chat.id), chat],
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
      data?.chats?.filter((chat) => {
        if (chat.__typename === 'GroupChat') {
          return chat.name.toLowerCase().includes(filter);
        }
        if (chat.__typename === 'DirectMessageChat') {
          return (
            chat.receipent.user.username.toLowerCase().includes(filter) ||
            chat.receipent.user.name?.toLowerCase().includes(filter)
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
              receipentUserId: user.id,
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
