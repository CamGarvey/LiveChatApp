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
import React, { useState } from 'react';
import { UserPlus } from 'tabler-icons-react';
import { useGetChannelInfoForSidebarQuery } from '../../graphql/generated/graphql';
import UserItem from '../shared/UserItem';

type Props = {
  channelId?: string;
};

const ChannelInfoSidebar = ({ channelId }: Props) => {
  const [isAddMembersModelOpen, setIsAddMembersModelOpen] = useState(false);
  const { loading, data, error } = useGetChannelInfoForSidebarQuery({
    variables: {
      channelId,
    },
  });
  if (error) return <>Error!</>;

  return (
    <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
      <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
        <LoadingOverlay visible={loading} loaderProps={{ variant: 'bars' }} />
        {data?.channel && (
          <>
            <Title order={4}>{data.channel.name}</Title>
            <Group>
              <Text>Members ({data.channel.members.length})</Text>
              <ActionIcon
                ml={'auto'}
                variant="light"
                onClick={() => {
                  console.log('Hello');
                }}
              >
                <UserPlus size={16} />
              </ActionIcon>
            </Group>
            <ScrollArea
              style={{
                height: '500px',
              }}
              pr={'10px'}
            >
              {data.channel.members.map((member) => {
                return <UserItem key={member.id} user={{ ...member }} />;
              })}
            </ScrollArea>
          </>
        )}
      </Aside>
    </MediaQuery>
  );
};

export default ChannelInfoSidebar;