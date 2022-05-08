import { ChakraProvider, theme } from '@chakra-ui/react';
import Layout from './components/Layout';
import Chat from './pages/Chat';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Layout>
      <Chat />
    </Layout>
  </ChakraProvider>
);
