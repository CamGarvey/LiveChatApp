import { useAuth0 } from '@auth0/auth0-react';
import { Button, Center, Text } from '@mantine/core';
import { Navigate } from 'react-router-dom';

const Home = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    <Center h={'100vh'}>
      <Text>Welcome to GraphChat</Text>
      <Button onClick={() => loginWithRedirect()}>Login</Button>
      {isAuthenticated && <Navigate to="/chats" replace={true} />}
    </Center>
  );
};

export default Home;
