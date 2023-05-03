import { createHttpLink, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { useAuth0 } from '@auth0/auth0-react';
import { createClient } from 'graphql-ws';

export const useApolloLink = () => {
  const { getAccessTokenSilently } = useAuth0();

  const httpLink = createHttpLink({
    uri: `${import.meta.env.VITE_GRAPHQL_API_URL}/graphql`,
  });

  const wsLink = new GraphQLWsLink(
    createClient({
      url: `${import.meta.env.VITE_SUBSCRIPTION_URL}/graphql`,
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
        headers: {},
      };
    }
  });

  const link = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    },
    wsLink,
    authLink.concat(httpLink)
  );

  return {
    link,
  };
};
