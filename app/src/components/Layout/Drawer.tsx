import {
  Center,
  Drawer as MantineDrawer,
  MediaQuery,
  Text,
} from '@mantine/core';
import React from 'react';
import { useGetChannelsForNavQuery } from '../../graphql/generated/graphql';
import { useToggleDrawer, useIsDrawerOpen } from '../store';
import ChannelItem from './ChannelItem';

const Drawer = () => {
  const { loading, data } = useGetChannelsForNavQuery();
  const isDrawerOpen = useIsDrawerOpen();
  const toggleDrawer = useToggleDrawer();

  return (
    <MediaQuery largerThan={'sm'} styles={{ display: 'none' }}>
      <MantineDrawer
        opened={isDrawerOpen}
        onClose={toggleDrawer}
        zIndex={9999}
        withinPortal={false}
        size={'xl'}
        styles={{
          drawer: {
            marginTop: '70px',
          },
          root: {
            marginTop: '70px',
          },
        }}
        overlayOpacity={0}
        closeOnClickOutside={false}
        withCloseButton={false}
      >
        <Center>
          <Text>Channels</Text>
        </Center>
        {!loading &&
          data &&
          data.channels.map((channel) => {
            return <ChannelItem key={channel.id} {...channel} />;
          })}
      </MantineDrawer>
    </MediaQuery>
  );
};

export default Drawer;
