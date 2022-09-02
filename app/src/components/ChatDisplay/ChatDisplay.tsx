import {
  ActionIcon,
  Button,
  Center,
  Input,
  Tabs,
  Tooltip,
} from '@mantine/core';
import { useCallback, useMemo, useState } from 'react';
import {
  IconSearch,
  IconUser,
  IconUsers,
  IconCirclePlus,
  IconMessageDots,
} from '@tabler/icons';
import useLiveChats from './useLiveChats';
import ChatList from './ChatList';
import { useCreateGroupChatModal } from 'components/Modals/CreateGroupChatModal';
import { useDrawer } from 'store';
import { useFriendSelectorModal } from 'components/Modals/FriendSelectorModal';
import { useCreateDmChat } from 'hooks';

const ChatDisplay = () => {
  const [activeTab, setActiveTab] = useState<string | null>('groups');
  const { loading, chats } = useLiveChats();
  const [filter, setFilter] = useState('');
  const openCreateGroupChat = useCreateGroupChatModal();
  const openFriendSelector = useFriendSelectorModal();
  const [createDm] = useCreateDmChat();
  const drawer = useDrawer();
  const filteredChats = useMemo(
    () =>
      chats.filter((c) => {
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
      }),
    [chats, filter]
  );

  const filteredGroupChats = useMemo(
    () => filteredChats.filter((c) => c.__typename === 'GroupChat'),
    [filteredChats]
  );

  const filteredDmChats = useMemo(
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
          createDm({
            variables: {
              friendId: user.id,
            },
          });
        },
      });
    }
  }, [drawer, activeTab, openCreateGroupChat, openFriendSelector, createDm]);

  return (
    <Tabs value={activeTab} onTabChange={setActiveTab}>
      <Tabs.List grow>
        <Tabs.Tab value="groups" icon={<IconUsers size={14} />}>
          Groups
        </Tabs.Tab>
        <Tabs.Tab value="friends" icon={<IconUser size={14} />}>
          Friends
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
                ? 'Create New Group'
                : 'Create New Direct Message'
            }
            position={'bottom'}
          >
            <ActionIcon onClick={handleOpenCreate}>
              <IconCirclePlus />
            </ActionIcon>
          </Tooltip>
        }
      />
      <Tabs.Panel value="groups" pt="xs">
        <ChatList chats={filteredGroupChats} loading={loading} />
        <Center>
          <Button
            onClick={handleOpenCreate}
            variant={'light'}
            leftIcon={<IconMessageDots />}
            compact
          >
            New Group Chat
          </Button>
        </Center>
      </Tabs.Panel>
      <Tabs.Panel value="friends" pt="xs">
        <ChatList chats={filteredDmChats} loading={loading} />
        <Center>
          <Button
            onClick={handleOpenCreate}
            variant={'light'}
            leftIcon={<IconMessageDots />}
            compact
          >
            New Direct Message
          </Button>
        </Center>
      </Tabs.Panel>
    </Tabs>
  );
};

export default ChatDisplay;
