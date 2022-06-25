import { Center, Input, Stack, Text } from '@mantine/core';
import { useState } from 'react';
import { Search } from 'tabler-icons-react';
import { useGetChannelsForDisplayQuery } from '../../graphql/generated/graphql';
import ChannelItem from './ChannelItem';

type Props = {
  onChannelClick?: (channel: {
    id: string;
    name: string;
    createdAt: any;
    updatedAt: any;
    isDM: boolean;
    members: {
      username: string;
    }[];
  }) => void;
};

const ChannelDisplay = ({ onChannelClick }: Props) => {
  const { loading, data } = useGetChannelsForDisplayQuery();
  const [filter, setFilter] = useState('');

  const filteredChannels =
    data?.channels.filter((c) => c.name.toLowerCase().includes(filter)) ?? [];

  return (
    <Stack spacing={'md'}>
      <Input
        disabled={loading}
        radius={'sm'}
        placeholder="Search Groups"
        maxLength={15}
        icon={<Search />}
        onChange={(e: any) => {
          setFilter(e.target.value.toLowerCase());
        }}
      />
      <Stack spacing={0}>
        {!loading && data && filteredChannels.length > 0 ? (
          filteredChannels.map((channel) => (
            <ChannelItem
              key={channel.id}
              {...channel}
              onClick={() => onChannelClick(channel)}
            />
          ))
        ) : (
          <Center>
            <Text color={'dimmed'}>Nothing to show</Text>
          </Center>
        )}
      </Stack>
    </Stack>
  );
};

export default ChannelDisplay;
