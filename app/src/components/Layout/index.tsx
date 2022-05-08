import { Box, Grid, useBreakpointValue } from '@chakra-ui/react';
import React from 'react';
import Header from './Header';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const maxW = useBreakpointValue({ base: '100%', md: '80%' });

  return (
    <Grid h={'100vh'} justifyItems={'center'}>
      <Grid gridTemplateRows={'auto 1fr'} h={'100%'} maxW={maxW} w={'100%'}>
        <Header />
        <Box alignSelf={'center'} justifySelf={'center'} w={'100%'} h={'100%'}>
          {children}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Layout;
