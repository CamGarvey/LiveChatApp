import { withAuthenticationRequired } from '@auth0/auth0-react';
import { LoadingOverlay } from '@mantine/core';
import React from 'react';
import LoggedInProvider from './Providers/LoggedInProvider';

type Props = {
  component: any;
};

const ProtectedRoute = ({ component }: Props) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <LoadingOverlay visible={true} loaderProps={{ variant: 'bars' }} />
    ),
  });
  return (
    <LoggedInProvider>
      <Component />
    </LoggedInProvider>
  );
};

export default ProtectedRoute;
