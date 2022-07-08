import {
  MediaQuery,
  Aside,
  Text,
  LoadingOverlay,
  ScrollArea,
  Title,
  ActionIcon,
  Group,
} from '@mantine/core';
import { UserPlus } from 'tabler-icons-react';
import { ChatInfo } from '../../models';
import { ChatMenu, UserItem } from '../shared/UserItem';

type Props = {
  isLoading: boolean;
  chat: ChatInfo;
};

const ChatInfoAside = ({ chat, isLoading }: Props) => {
  return (
    <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
      <Aside p="md" hiddenBreakpoint="md" width={{ md: 300, lg: 300 }}>
        <LoadingOverlay visible={isLoading} />
        {chat && (
          <>
            <Aside.Section>
              <Title order={4}>{chat.name}</Title>
              <Group>
                <Text>Members ({chat.members.length})</Text>
                <ActionIcon ml={'auto'} variant="light">
                  <UserPlus size={16} />
                </ActionIcon>
              </Group>
            </Aside.Section>
            <Aside.Section
              grow
              component={ScrollArea}
              mx="-xs"
              px="xs"
              styles={{
                viewport: {
                  paddingLeft: '5px',
                },
              }}
              offsetScrollbars={true}
            >
              {chat.members.map((member) => {
                return (
                  <UserItem
                    key={member.id}
                    user={{ ...member }}
                    menu={<ChatMenu user={member} chat={chat} />}
                  />
                );
              })}
            </Aside.Section>
          </>
        )}
      </Aside>
    </MediaQuery>
  );
};

export default ChatInfoAside;
