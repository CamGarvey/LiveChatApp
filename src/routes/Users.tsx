import LoggedInProvider from 'components/Providers/LoggedInProvider';

type Props = {};

const Users = (props: Props) => {
  return (
    <LoggedInProvider>
      <p>hello</p>
    </LoggedInProvider>
  );
};

export default Users;
