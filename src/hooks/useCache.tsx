import { ApolloCache, FetchResult } from '@apollo/client';
import {
  AddMembersMutation,
  GetEventsDocument,
  GetEventsQuery,
  RemoveMembersMutation,
  UpdateGroupChatDescriptionMutation,
  UpdateGroupChatNameMutation,
} from 'graphql/generated/graphql';

const useCache = () => {
  const addEvent = (chatId: string) => {
    return (
      cache: ApolloCache<any>,
      {
        data,
      }: Omit<
        FetchResult<
          | UpdateGroupChatNameMutation
          | UpdateGroupChatDescriptionMutation
          | AddMembersMutation
          | RemoveMembersMutation,
          Record<string, any>,
          Record<string, any>
        >,
        'context'
      >
    ) => {
      const query = cache.readQuery<GetEventsQuery>({
        query: GetEventsDocument,
        variables: {
          chatId,
        },
      });

      if (!data) {
        throw new Error('No result from update');
      }
      if (!query) {
        throw new Error('Could not find query');
      }

      let node: any = null;

      if ('updateGroupChatName' in data) {
        node = data['updateGroupChatName'];
      } else if ('updateGroupChatDescription' in data) {
        node = data['updateGroupChatDescription'];
      } else if ('updateGroupChatName' in data) {
        node = data['updateGroupChatName'];
      } else if ('updateGroupChatDescription' in data) {
        node = data['updateGroupChatDescription'];
      }

      if (!node) {
        throw new Error('No node');
      }

      const edges = (query.events.edges as any[]) ?? [];

      cache.writeQuery<GetEventsQuery>({
        query: GetEventsDocument,
        variables: {
          chatId,
        },
        data: {
          events: {
            pageInfo: query.events.pageInfo,
            edges: [
              ...edges,
              {
                __typename: 'EventEdge',
                node,
              },
            ],
          },
        },
      });
    };
  };

  return {
    addEvent,
  };
};

export default useCache;
