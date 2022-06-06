import { Button, Navbar, ScrollArea } from '@mantine/core';
import React, { useState } from 'react';
import { useGetChannelsForNavQuery } from '../../graphql/generated/graphql';
import CreateChannelModal from '../CreateChannelModal/CreateChannelModal';
import ChannelItem from './ChannelItem';

type Props = {
  onChannelSelected: (channelId: string) => void;
};

const ChannelNav = () => {
  const [channelSelected, setChannelSelected] = useState(null);
  const [createChannelOpen, setCreateChannelOpen] = useState(false);
  const { loading, data } = useGetChannelsForNavQuery();

  return (
    <Navbar p="xs" width={{ base: 300 }}>
      <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
        {!loading &&
          data &&
          data.channels.map((channel) => {
            return (
              <ChannelItem
                key={channel.id}
                {...channel}
                // isSelected={channelSelected === channel}
                // onClick={() => {
                //   setChannelSelected(channel);
                //   navigate(`/chat/${channel.id}`);
                // }}
              />
            );
          })}
      </Navbar.Section>
      <Navbar.Section>
        <Button
          fullWidth
          onClick={() => {
            setCreateChannelOpen(true);
          }}
        >
          Create Channel
        </Button>
      </Navbar.Section>
      <CreateChannelModal
        isOpen={createChannelOpen}
        onClose={() => {
          setCreateChannelOpen(false);
        }}
      />
    </Navbar>
  );
};

export default ChannelNav;
