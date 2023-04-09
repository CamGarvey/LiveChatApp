import { gql } from '@apollo/client';
import {
  Role,
  useAddMembersMutation,
  useChangeRoleMutation,
  useRemoveMembersMutation,
} from 'graphql/generated/graphql';
import useCache from './useCache';

gql`
  mutation AddMembers($chatId: HashId!, $userIds: [HashId!]!) {
    addMembers(chatId: $chatId, userIds: $userIds) {
      ...GroupChatUpdate
      ...UserAlerationGroupChatUpdate
      event {
        chat {
          id
        }
      }
    }
  }
  mutation RemoveMembers($chatId: HashId!, $userIds: [HashId!]!) {
    removeMembers(chatId: $chatId, userIds: $userIds) {
      ...GroupChatUpdate
      ...UserAlerationGroupChatUpdate
      event {
        chat {
          id
        }
      }
    }
  }

  fragment UserAlerationGroupChatUpdate on ChatMemberAlteration {
    members {
      role
      user {
        id
        username
      }
    }
  }
`;

export const useChatMembers = () => {
  const { addEvent } = useCache();
  const [addMutation, { loading: addingMembers }] = useAddMembersMutation();
  const [removeMutation, { loading: removingMembers }] =
    useRemoveMembersMutation();
  const [changeRoleMutation, { loading: chagingName }] =
    useChangeRoleMutation();

  const removeMembers = (chatId: string, members: string[]) =>
    removeMutation({
      variables: {
        chatId,
        members,
      },
      update: addEvent(chatId),
    });

  const addMembers = (chatId: string, members: string[]) =>
    addMutation({
      variables: {
        chatId,
        members,
      },
      update: addEvent(chatId),
    });

  const changeRole = (chatId: string, members: string[], role: Role) =>
    changeRoleMutation({
      variables: {
        chatId,
        members,
        role,
      },
    });

  return {
    addMembers,
    removeMembers,
    changeRole,
    updating: addingMembers || removingMembers || chagingName,
  };
};
