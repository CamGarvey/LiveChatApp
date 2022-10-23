import { gql } from '@apollo/client';
import {
  GetChatsForChatDisplayDocument,
  GetChatsForChatDisplayQuery,
  useLeaveChatMutation,
} from 'graphql/generated/graphql';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

gql`
  mutation LeaveChat($chatId: HashId!) {
    leaveGroupChat(chatId: $chatId) {
      id
    }
  }
`;

export const useLeaveChat = () => {
  const navigate = useNavigate();
  const [leaveMutation] = useLeaveChatMutation();

  const leave = useCallback(
    (chatId: string) => {
      leaveMutation({
        variables: {
          chatId,
        },
        update: (cache, { data }) => {
          cache.updateQuery<GetChatsForChatDisplayQuery>(
            {
              query: GetChatsForChatDisplayDocument,
            },
            (data) => {
              if (data) {
                return {
                  chats: data.chats.filter((x) => x.id !== chatId),
                };
              }
            }
          );
        },
        onCompleted: () => {
          navigate('/chats', { replace: true });
        },
      });
    },
    [leaveMutation, navigate]
  );

  return leave;
};
