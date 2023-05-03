import { ActionIcon, Input, Tabs, Tooltip } from '@mantine/core';
import { IconCirclePlus, IconSearch, IconUser, IconUsers } from '@tabler/icons';
import { useCreateGroupChatModal } from 'components/Modals/CreateGroupChatModal';
import { useFriendSelectorModal } from 'components/Modals/FriendSelectorModal';
import { useCreateChat } from 'hooks';
import { useCallback, useState } from 'react';
import { useDrawer } from 'store';
import ChatList from './ChatList';
import DirectMessageChatItem from './DirectMessageChatItem';
import GroupChatItem from './GroupChatItem';
import { useLiveChats } from './hooks';

type Props = {
  iconSize?: number;
};

const ChatDisplay = ({ iconSize = 14 }: Props) => {
  const { group, direct, setFilter, loading } = useLiveChats();
  const [activeTab, setActiveTab] = useState<string | null>('group');
  const openCreateGroupChat = useCreateGroupChatModal();
  const openFriendSelector = useFriendSelectorModal();
  const {
    createDirectMessageChat: [createDirectMessageChat],
  } = useCreateChat();
  const drawer = useDrawer();

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
        <Tabs.Tab value="group" icon={<IconUsers size={iconSize} />}>
          Groups
        </Tabs.Tab>
        <Tabs.Tab value="direct" icon={<IconUser size={iconSize} />}>
          Direct Messages
        </Tabs.Tab>
      </Tabs.List>
      <Input
        disabled={loading}
        mt={10}
        radius={'sm'}
        placeholder={
          activeTab === 'group' ? 'Search Groups' : 'Search Direct Messages'
        }
        maxLength={15}
        icon={<IconSearch />}
        onChange={(element) => {
          setFilter(element.target.value.toLowerCase());
        }}
        rightSection={
          <Tooltip
            label={
              activeTab === 'group'
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
      <Tabs.Panel value="group" pt="xs">
        <ChatList loading={loading}>
          {group.map((chat) => (
            <GroupChatItem key={chat.id} chat={chat} />
          ))}
        </ChatList>
      </Tabs.Panel>
      <Tabs.Panel value="direct" pt="xs">
        <ChatList loading={loading}>
          {direct.map((chat) => (
            <DirectMessageChatItem key={chat.id} chat={chat} />
          ))}
        </ChatList>
      </Tabs.Panel>
    </Tabs>
  );
};

export default ChatDisplay;
