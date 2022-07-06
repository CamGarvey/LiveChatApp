import { useAuth0 } from '@auth0/auth0-react';
import { AppShell, Button, Center } from '@mantine/core';
import React from 'react';
import { Navigate } from 'react-router-dom';
import Header from '../components/Layout/Header/Header';

const Home = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    <Center>
      <Center>Welcome to GraphChat</Center>
      <Button onClick={() => loginWithRedirect()}></Button>
      {isAuthenticated && <Navigate to="/chat" replace={true} />}
    </Center>
  );
};

export default Home;
