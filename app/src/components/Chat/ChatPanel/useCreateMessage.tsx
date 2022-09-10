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
      id
      createdAt
      content
      isCreator
      createdBy {
        id
        username
        name
      }
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

        return {
          createMessage: {
            __typename: 'Message',
            id,
            createdAt,
            content,
            isCreator: true,
            createdBy: user,
          },
        };
      },

      update: (cache, { data }) => {
        const result = cache.readQuery<GetEventsQuery>({
          query: GetEventsDocument,
          variables: {
            chatId,
          },
        });

        cache.writeQuery<GetEventsQuery>({
          query: GetEventsDocument,
          variables: {
            chatId,
          },
          data: {
            events: {
              pageInfo: result.events.pageInfo,
              edges: [
                ...result.events.edges,
                {
                  node: {
                    __typename: 'Message',
                    createdBy: {
                      __typename: 'Me',
                      ...user,
                    },
                    content,
                    ...data.createMessage,
                    createdAt,
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
