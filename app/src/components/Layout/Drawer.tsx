import { Drawer as MantineDrawer, ScrollArea } from '@mantine/core';
import { useGetChannelsForNavQuery } from '../../graphql/generated/graphql';
import ChannelItem from './ChannelItem';

type Props = {
  isOpened: boolean;
  onClose: () => void;
};

const Drawer = ({ isOpened, onClose }: Props) => {
  const { loading, data } = useGetChannelsForNavQuery();

  return (
    <MantineDrawer
      opened={isOpened}
      onClose={onClose}
      title="Channels"
      padding="xl"
      size="lg"
    >
      <ScrollArea>
        {!loading &&
          data &&
          data.channels.map((channel) => {
            return <ChannelItem key={channel.id} {...channel} />;
          })}
      </ScrollArea>
    </MantineDrawer>
  );
};

export default Drawer;
