import { Button, MediaQuery, Navbar, ScrollArea } from '@mantine/core';
import { useGetChannelsForNavQuery } from '../../graphql/generated/graphql';
import { useOpenModal } from '../store';
import ChannelItem from '../shared/ChannelItem';
import { ModalType } from '../../models';

const ChannelNav = () => {
  const openChannelModal = useOpenModal(ModalType.CreateChannel);
  const { loading, data } = useGetChannelsForNavQuery();

  return (
    <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
      <Navbar p="xs" width={{ base: 300 }}>
        <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
          {!loading &&
            data &&
            data.channels.map((channel) => {
              return <ChannelItem key={channel.id} {...channel} />;
            })}
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
