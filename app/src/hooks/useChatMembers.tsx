import { gql } from '@apollo/client';
import {
  Role,
  useAddMembersMutation,
  useChangeMemberRolesMutation,
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

  mutation changeMemberRoles(
    $chatId: HashId!
    $userIds: [HashId!]!
    $role: Role!
  ) {
    changeMemberRoles(chatId: $chatId, userIds: $userIds, role: $role) {
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
  const [changeMemberRolesMutation, { loading: chagingMemberRoles }] =
    useChangeMemberRolesMutation();

  const removeMembers = (chatId: string, userIds: string[]) =>
    removeMutation({
      variables: {
        chatId,
        userIds,
      },
      update: addEvent(chatId),
    });

  const addMembers = (chatId: string, userIds: string[]) =>
    addMutation({
      variables: {
        chatId,
        userIds,
      },
      update: addEvent(chatId),
    });

  const changeRole = (chatId: string, userIds: string[], role: Role) =>
    changeMemberRolesMutation({
      variables: {
        chatId,
        userIds,
        role,
      },
    });

  return {
    addMembers,
    removeMembers,
    changeRole,
    updating: addingMembers || removingMembers || chagingMemberRoles,
  };
};
