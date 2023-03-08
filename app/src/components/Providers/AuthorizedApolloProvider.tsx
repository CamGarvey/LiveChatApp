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
import result from 'graphql/generated/possible-types';

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
          Authorization: `Bearer INVALID_TOKEN`,
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
            events: relayStylePagination(['chatId']),
            members: relayStylePagination(['chatId']),
          },
        },
        MessageEvent: {
          keyFields: (object) => `Event:${object.id}`,
        },
        DeletedEvent: {
          keyFields: (object) => `Event:${object.id}`,
        },
        ChatUpdateEvent: {
          keyFields: (object) => `Event:${object.id}`,
        },
        NameUpdatedEvent: {
          keyFields: (object) => `Event:${object.id}`,
        },
        DescriptionUpdatedEvent: {
          keyFields: (object) => `Event:${object.id}`,
        },
        MembersAddedEvent: {
          keyFields: (object) => `Event:${object.id}`,
        },
        MembersRemovedEvent: {
          keyFields: (object) => `Event:${object.id}`,
        },
        RoleChangedEvent: {
          keyFields: (object) => `Event:${object.id}`,
        },
        Friend: {
          keyFields: (object) => `User:${object.id}`,
        },
        Stranger: {
          keyFields: (object) => `User:${object.id}`,
        },
      },
      possibleTypes: result.possibleTypes,
    }),
    connectToDevTools: true,
  });

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export default AuthorizedApolloProvider;
