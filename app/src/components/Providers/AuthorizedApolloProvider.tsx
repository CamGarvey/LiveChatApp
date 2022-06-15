import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useAuth0 } from '@auth0/auth0-react';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { relayStylePagination } from '@apollo/client/utilities';

type Props = {
  children: any;
};

const AuthorizedApolloProvider = ({ children }: Props) => {
  const { getAccessTokenSilently } = useAuth0();

  const httpLink = createHttpLink({
    uri: `${process.env.REACT_APP_GRAPHQL_API_URL}/graphql`,
  });

  const wsLink = new GraphQLWsLink(
    createClient({
      url: `${process.env.REACT_APP_GRAPHQL_SUBSCRIPTION_URL}/graphql`,
      lazy: true,
      connectionParams: async () => {
        const token = await getAccessTokenSilently();
        return {
          Authorization: token ? `Bearer ${token}` : '',
        };
      },
    })
  );

  const authLink = setContext(async () => {
    try {
      const token = await getAccessTokenSilently();
      return {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    } catch (e) {
      return {
        headers: {
          Authorization: `Bearer `,
        },
      };
    }
  });

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    authLink.concat(httpLink)
  );

  const apolloClient = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            users: relayStylePagination(['usernameFilter']),
            channelMessages: relayStylePagination(['channelId']),
          },
        },
      },
    }),
    connectToDevTools: true,
  });

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export default AuthorizedApolloProvider;
