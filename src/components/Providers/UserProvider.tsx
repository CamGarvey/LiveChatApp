import { gql } from '@apollo/client';
import { UserContext } from 'context/UserContext';
import { useGetMeForUserProviderQuery } from 'graphql/generated/graphql';

gql`
  query GetMeForUserProvider {
    me {
      id
      username
      name
    }
  }
`;

type Props = {
  children: React.ReactNode;
};

const UserProvider = ({ children }: Props) => {
  const { data, loading } = useGetMeForUserProviderQuery();

  return (
    <UserContext.Provider
      value={{
        user: data?.me,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
