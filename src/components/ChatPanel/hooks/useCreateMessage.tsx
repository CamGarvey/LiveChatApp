import { gql } from '@apollo/client';
import { useUser } from 'context/UserContext';
import {
  GetEventsDocument,
  GetEventsQuery,
  useCreateMessageMutation,
} from 'graphql/generated/graphql';

gql`
  mutation CreateMessage($chatId: HashId!, $content: String!) {
    createMessage(chatId: $chatId, content: $content) {
      event {
        id
        createdAt
        isCreator
        createdBy {
          id
          username
          name
        }
      }
      content
    }
  }
`;

type Props = {
  chatId: string;
};

export const useCreateMessage = ({ chatId }: Props) => {
  const { user } = useUser();
  const [createMessageMutation] = useCreateMessageMutation();
  const createdAt = new Date().getTime();

  const createMessage = (content: string) =>
    createMessageMutation({
      variables: {
        chatId,
        content,
      },
      optimisticResponse: ({ content }) => {
        const id = `temp-id.${createdAt}`;
        if (!user) {
          throw new Error('No user');
        }
        return {
          createMessage: {
            __typename: 'Message',
            id,
            event: {
              id,
              __typename: 'CreatedEvent',
              createdAt,
              isCreator: true,
              createdBy: user,
            },
            content,
          },
        };
      },

      update: (cache, { data }) => {
        const query = cache.readQuery<GetEventsQuery>({
          query: GetEventsDocument,
          variables: {
            chatId,
          },
        });

        if (!data) {
          throw new Error('No result from message creation');
        }

        if (!query) {
          throw new Error('Could not find query');
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
                  node: {
                    __typename: 'CreatedEvent',
                    ...data.createMessage.event,
                    createdBy: {
                      ...data.createMessage.event.createdBy,
                    },
                    payload: {
                      ...data.createMessage,
                    },
                  },
                },
              ],
            },
          },
        });
      },
    });

  return { createMessage };
};
