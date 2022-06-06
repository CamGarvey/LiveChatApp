import { useAuth0 } from '@auth0/auth0-react';
import { AppShell, Center } from '@mantine/core';
import React from 'react';
import { Navigate } from 'react-router-dom';
import Header from '../components/Layout/Header';

const Home = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      header={<Header />}
    >
      <Center>Welcome to GraphChat</Center>
      {isAuthenticated && <Navigate to="/chat" replace={true} />}
    </AppShell>
  );
};

export default Home;
