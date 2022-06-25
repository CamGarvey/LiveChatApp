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
import { ChannelInfo } from '../../models';
import { UserItem } from '../shared/UserItem';

type Props = {
  isLoading: boolean;
  channel: ChannelInfo;
};

const ChannelInfoAside = ({ channel, isLoading }: Props) => {
  return (
    <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
      <Aside p="md" hiddenBreakpoint="md" width={{ md: 300, lg: 300 }}>
        <LoadingOverlay visible={isLoading} />
        {channel && (
          <>
            <Aside.Section>
              <Title order={4}>{channel.name}</Title>
              <Group>
                <Text>Members ({channel.members.length})</Text>
                <ActionIcon ml={'auto'} variant="light">
                  <UserPlus size={16} />
                </ActionIcon>
              </Group>
            </Aside.Section>
            <Aside.Section grow component={ScrollArea} mx="-xs" px="xs">
              {channel.members.map((member) => {
                return <UserItem key={member.id} user={{ ...member }} />;
              })}
            </Aside.Section>
          </>
        )}
      </Aside>
    </MediaQuery>
  );
};

export default ChannelInfoAside;
