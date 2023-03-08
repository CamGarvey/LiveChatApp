import { gql } from '@apollo/client';
import {
  Role,
  useAddMembersMutation,
  useChangeRoleMutation,
  useRemoveMembersMutation,
} from 'graphql/generated/graphql';
import useCache from './useCache';

gql`
  mutation AddMembers($chatId: HashId!, $members: [HashId!]!) {
    addMembers(chatId: $chatId, members: $members) {
      ...GroupChatUpdate
      ...UserAlerationGroupChatUpdate
      chat {
        id
      }
    }
  }
  mutation RemoveMembers($chatId: HashId!, $members: [HashId!]!) {
    removeMembers(chatId: $chatId, members: $members) {
      ...GroupChatUpdate
      ...UserAlerationGroupChatUpdate
      chat {
        id
      }
    }
  }
  mutation ChangeRole($chatId: HashId!, $members: [HashId!]!, $role: Role!) {
    changeRole(chatId: $chatId, members: $members, role: $role) {
      ...GroupChatUpdate
      ...UserAlerationGroupChatUpdate
      chat {
        id
      }
    }
  }

  fragment GroupChatUpdate on ChatUpdateEvent {
    id
    createdBy {
      id
    }
  }
  fragment UserAlerationGroupChatUpdate on MemberAlterationEvent {
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
