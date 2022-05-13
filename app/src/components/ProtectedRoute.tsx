import { withAuthenticationRequired } from '@auth0/auth0-react';
import React from 'react';

type Props = {
  component: any;
};

const ProtectedRoute = ({ component }: Props) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => <div>poo</div>,
  });
  return <Component />;
};

export default ProtectedRoute;
