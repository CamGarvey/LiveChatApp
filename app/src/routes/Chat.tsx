import { Box, Grid } from '@chakra-ui/react';
import Sidebar from '../components/Sidebar/Sidebar';

type Props = {};

const Chat = (props: Props) => {
  return (
    <Grid gridTemplateColumns={'auto 1fr'} boxSize={'100%'}>
      <Sidebar />
      <Box w={'100%'}>Chat</Box>
    </Grid>
  );
};

export default Chat;
