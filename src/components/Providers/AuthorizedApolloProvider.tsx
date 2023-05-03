import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities';
import result from 'graphql/generated/possible-types';
import { useApolloLink } from './hooks';

type Props = {
  children: any;
};

const AuthorizedApolloProvider = ({ children }: Props) => {
  const { link } = useApolloLink();

  const apolloClient = new ApolloClient({
    link,
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            users: relayStylePagination(['filter']),
            friends: relayStylePagination(['filter']),
            events: relayStylePagination(['chatId']),
            members: relayStylePagination(['chatId']),
          },
        },
        CreatedEvent: {
          keyFields: (object) => `Event:${object.id}`,
        },
        DeletedEvent: {
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
