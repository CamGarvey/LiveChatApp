import { gql } from '@apollo/client';
import { ActionIcon, Input, Tabs, Tooltip } from '@mantine/core';
import { IconCirclePlus, IconSearch, IconUser, IconUsers } from '@tabler/icons';
import { useCreateGroupChatModal } from 'components/Modals/CreateGroupChatModal';
import { useFriendSelectorModal } from 'components/Modals/FriendSelectorModal';
import {
  ChatsForChatDisplayDocument,
  ChatsForChatDisplaySubscription,
  DirectMessageChatItemFragment,
  GetChatsForChatDisplayQuery,
  GroupChatItemFragment,
  useGetChatsForChatDisplayQuery,
} from 'graphql/generated/graphql';
import { useCreateChat } from 'hooks';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDrawer } from 'store';
import ChatList from './ChatList';
import GroupChatItem from './GroupChatItem';
import DirectMessageChatItem from './DirectMessageChatItem';

gql`
  query GetChatsForChatDisplay($firstMembers: Int = 2, $afterMember: String) {
    chats {
      ...ChatDisplayChat
    }
  }
  subscription ChatsForChatDisplay($firstMembers: Int = 2, $afterMember: String) {
    chats {
      ...ChatDisplayChat
    }
  }

  fragment ChatDisplayChat on Chat {
    id
    createdBy {
      id
      username
    }
    ... on GroupChat {
      ...GroupChatItem
    }
    ... on DirectMessageChat {
      ...DirectMessageChatItem
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
  ${DirectMessageChatItem.fragments.chat}
  ${GroupChatItem.fragments.chat}
`;

const ChatDisplay = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string | null>('group');
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

  const groupChats = useMemo(
    () => filteredChats.filter((c) => c.__typename === 'GroupChat') as GroupChatItemFragment[],
    [filteredChats]
  );

  const directMessageChats = useMemo<DirectMessageChatItemFragment[]>(
    () =>
      filteredChats.filter(
        (c) => c.__typename === 'DirectMessageChat'
      ) as DirectMessageChatItemFragment[],
    [filteredChats]
  );

  const handleOpenCreate = useCallback(() => {
    drawer.close();
    if (activeTab === 'group') {
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
  }, [drawer, activeTab, openCreateGroupChat, openFriendSelector, createDirectMessageChat]);

  return (
    <Tabs value={activeTab} onTabChange={setActiveTab}>
      <Tabs.List grow>
        <Tabs.Tab value="group" icon={<IconUsers size={14} />}>
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
        placeholder={activeTab === 'group' ? 'Search Groups' : 'Search Direct Messages'}
        maxLength={15}
        icon={<IconSearch />}
        onChange={(element) => {
          setFilter(element.target.value.toLowerCase());
        }}
        rightSection={
          <Tooltip
            label={activeTab === 'group' ? 'Create a new group' : 'Create a new direct message'}
            position={'bottom'}
          >
            <ActionIcon onClick={handleOpenCreate} color={'default'}>
              <IconCirclePlus />
            </ActionIcon>
          </Tooltip>
        }
      />
      <Tabs.Panel value="group" pt="xs">
        <ChatList loading={loading}>
          {groupChats.map((c) => (
            <GroupChatItem key={c.id} chat={c} />
          ))}
        </ChatList>
      </Tabs.Panel>
      <Tabs.Panel value="direct" pt="xs">
        <ChatList loading={loading}>
          {directMessageChats.map((c) => (
            <DirectMessageChatItem key={c.id} chat={c} />
          ))}
        </ChatList>
      </Tabs.Panel>
    </Tabs>
  );
};

export default ChatDisplay;
