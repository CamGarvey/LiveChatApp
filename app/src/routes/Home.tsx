import { useAuth0 } from '@auth0/auth0-react';
import { Button, Center } from '@mantine/core';
import { Navigate } from 'react-router-dom';

const Home = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    <Center>
      <Center>Welcome to GraphChat</Center>
      <Button onClick={() => loginWithRedirect()}>Login</Button>
      {isAuthenticated && <Navigate to="/chats" replace={true} />}
    </Center>
  );
};

export default Home;
