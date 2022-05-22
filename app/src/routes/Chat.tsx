import { Box, Grid } from '@chakra-ui/react';
import { useState } from 'react';
import CreateChannelModal from '../components/CreateChannelModal/CreateChannelModal';
import Sidebar from '../components/Sidebar/Sidebar';

type Props = {};

const Chat = (props: Props) => {
  const [createChannelIsOpen, setCreateChannelIsOpen] = useState(false);
  return (
    <Grid gridTemplateColumns={'auto 1fr'} boxSize={'100%'}>
      <Sidebar onCreateChannel={() => setCreateChannelIsOpen(true)} />
      <Box w={'100%'}>Chat</Box>
      {createChannelIsOpen && (
        <CreateChannelModal
          isOpen={createChannelIsOpen}
          onClose={() => setCreateChannelIsOpen(false)}
        ></CreateChannelModal>
      )}
    </Grid>
  );
};

export default Chat;
