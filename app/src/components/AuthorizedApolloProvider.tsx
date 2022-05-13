import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

type Props = {
  children: any;
};

const AuthorizedApolloProvider = ({ children }: Props) => {
  const { getAccessTokenSilently } = useAuth0();

  const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql',
  });

  const authLink = setContext(async () => {
    try {
      let token = localStorage.getItem('token');

      token = await getAccessTokenSilently();
      // if (!token) {
      //   localStorage.setItem('token', token);
      // }

      return {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    } catch (e) {
      console.log(e);

      return {
        headers: {
          Authorization: `Bearer `,
        },
      };
    }
  });

  const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    connectToDevTools: true,
  });

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export default AuthorizedApolloProvider;
