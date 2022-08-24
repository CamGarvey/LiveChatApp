import { useUser } from 'context/UserContext';
import {
  GetMessagesDocument,
  GetMessagesQuery,
  useCreateMessageMutation,
} from 'graphql/generated/graphql';

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
        const result = cache.readQuery<GetMessagesQuery>({
          query: GetMessagesDocument,
          variables: {
            chatId,
          },
        });

        cache.writeQuery<GetMessagesQuery>({
          query: GetMessagesDocument,
          variables: {
            chatId,
          },
          data: {
            messages: {
              pageInfo: result.messages.pageInfo,
              edges: [
                ...result.messages.edges,
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
