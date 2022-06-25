import { Button, Input, MediaQuery, Navbar, ScrollArea } from '@mantine/core';
import { useGetChannelsForDisplayQuery } from '../../graphql/generated/graphql';
import ChannelItem from '../shared/ChannelItem';
import { useCreateChannelModal } from '../Modals/CreateChannelModal/CreateChannelModal';
import { Search } from 'tabler-icons-react';
import ChannelDisplay from '../shared/ChannelDisplay';

const ChannelNav = () => {
  const openChannelModal = useCreateChannelModal();

  return (
    <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
      <Navbar p="xs" width={{ base: 300 }}>
        <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
          <ChannelDisplay />
        </Navbar.Section>
        <Navbar.Section>
          <Button fullWidth onClick={openChannelModal}>
            Create Channel
          </Button>
        </Navbar.Section>
      </Navbar>
    </MediaQuery>
  );
};

export default ChannelNav;
