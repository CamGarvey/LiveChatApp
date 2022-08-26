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
  const { data: userData, loading: isLoadingUser } =
    useGetMeForUserProviderQuery();

  return (
    <UserContext.Provider
      value={{
        user: userData?.me,
        isLoading: isLoadingUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
