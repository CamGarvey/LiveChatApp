import {
  ActionIcon,
  Button,
  Center,
  Grid,
  Group,
  Input,
  Tabs,
  Tooltip,
} from '@mantine/core';
import { useMemo, useState } from 'react';
import { IconSearch, IconUser, IconUsers, IconCirclePlus } from '@tabler/icons';
import useLiveChats from './useLiveChats';
import ChatList from './ChatList';

const ChatDisplay = () => {
  const { loading, chats } = useLiveChats();
  const [filter, setFilter] = useState('');

  const filteredChats = useMemo(
    () =>
      chats.filter((c) => {
        if (c.__typename === 'GroupChat') {
          return c.name.toLowerCase().includes(filter);
        }
        if (c.__typename === 'DirectMessageChat') {
          return c.createdBy.username.toLowerCase().includes(filter);
        }
        return false;
      }),
    [chats, filter]
  );

  return (
    <Tabs defaultValue="groups">
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
        placeholder="Search Groups"
        maxLength={15}
        icon={<IconSearch />}
        onChange={(e: any) => {
          setFilter(e.target.value.toLowerCase());
        }}
        rightSection={
          <Tooltip label={'Create New Group'} position={'bottom'}>
            <ActionIcon>
              <IconCirclePlus />
            </ActionIcon>
          </Tooltip>
        }
      />
      <Tabs.Panel value="groups" pt="xs">
        <ChatList chats={filteredChats} loading={loading} />
      </Tabs.Panel>
      <Tabs.Panel value="friends" pt="xs">
        <ChatList chats={filteredChats} loading={loading} />
      </Tabs.Panel>
    </Tabs>
  );
};

export default ChatDisplay;
