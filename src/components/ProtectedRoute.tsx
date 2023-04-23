import { withAuthenticationRequired } from '@auth0/auth0-react';
import { LoadingOverlay } from '@mantine/core';
import LoggedInProvider from './Providers/LoggedInProvider';

type Props = {
  component: any;
};

const ProtectedRoute = ({ component }: Props) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => <LoadingOverlay visible={true} />,
  });
  return (
    <LoggedInProvider>
      <Component />
    </LoggedInProvider>
  );
};

export default ProtectedRoute;
