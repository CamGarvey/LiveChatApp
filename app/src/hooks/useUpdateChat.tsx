import { ApolloCache, FetchResult, gql } from '@apollo/client';
import {
  AddMembersToGroupChatMutation,
  GetEventsDocument,
  GetEventsQuery,
  RemoveMembersFromGroupChatMutation,
  UpdateGroupChatDescriptionMutation,
  UpdateGroupChatNameMutation,
  useAddMembersToGroupChatMutation,
  useRemoveMembersFromGroupChatMutation,
  useUpdateGroupChatDescriptionMutation,
  useUpdateGroupChatNameMutation,
} from 'graphql/generated/graphql';

gql`
  mutation UpdateGroupChatName($chatId: HashId!, $name: String!) {
    updateGroupChatName(chatId: $chatId, name: $name) {
      ...GroupChatUpdate
      nameBefore
      nameAfter
      chat {
        id
        ... on GroupChat {
          name
        }
      }
    }
  }
  mutation UpdateGroupChatDescription($chatId: HashId!, $description: String!) {
    updateGroupChatDescription(chatId: $chatId, description: $description) {
      ...GroupChatUpdate
      descriptionBefore
      descriptionAfter
      chat {
        id
        ... on GroupChat {
          description
        }
      }
    }
  }
  mutation AddMembersToGroupChat($chatId: HashId!, $members: [HashId!]!) {
    addMembersToGroupChat(chatId: $chatId, members: $members) {
      ...GroupChatUpdate
      ...UserAlerationGroupChatUpdate
      chat {
        id
      }
    }
  }
  mutation RemoveMembersFromGroupChat($chatId: HashId!, $members: [HashId!]!) {
    removeMembersFromGroupChat(chatId: $chatId, members: $members) {
      ...GroupChatUpdate
      ...UserAlerationGroupChatUpdate
      chat {
        id
      }
    }
  }
  mutation ChangeMemberRoles(
    $chatId: HashId!
    $members: [HashId!]!
    $role: Role!
  ) {
    changeMemberRoles(chatId: $chatId, members: $members, role: $role) {
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

type UpdateProps = {
  name?: string | null;
  description?: string | null;
  addMembers?: string[] | null;
  removeMembers?: string[] | null;
};

export const useUpdateChat = () => {
  const [updateNameMutation, { loading: loadingName }] =
    useUpdateGroupChatNameMutation();
  const [updateDescriptionMutation, { loading: loadingDesc }] =
    useUpdateGroupChatDescriptionMutation();
  const [addMembersMutation, { loading: loadingAddMembers }] =
    useAddMembersToGroupChatMutation();
  const [removeMembersMutation, { loading: loadingRemoveMembers }] =
    useRemoveMembersFromGroupChatMutation();

  const loading =
    loadingName || loadingDesc || loadingAddMembers || loadingRemoveMembers;

  const update = (
    chatId: string,
    { name, description, addMembers, removeMembers }: UpdateProps
  ) => {
    if (name && name.length > 2) {
      updateNameMutation({
        variables: {
          chatId,
          name,
        },
        update: addEvent(chatId),
      });
    }
    if (description && description.length > 2) {
      updateDescriptionMutation({
        variables: {
          chatId,
          description,
        },
        update: addEvent(chatId),
      });
    }

    if (addMembers?.length) {
      addMembersMutation({
        variables: {
          chatId,
          members: addMembers,
        },
        update: addEvent(chatId),
      });
    }

    if (removeMembers?.length) {
      removeMembersMutation({
        variables: {
          chatId,
          members: removeMembers,
        },
        update: addEvent(chatId),
      });
    }
  };

  return {
    update,
    loading,
  };
};

const addEvent = (chatId: string) => {
  return (
    cache: ApolloCache<any>,
    {
      data,
    }: Omit<
      FetchResult<
        | UpdateGroupChatNameMutation
        | UpdateGroupChatDescriptionMutation
        | AddMembersToGroupChatMutation
        | RemoveMembersFromGroupChatMutation,
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
    } else if ('addMembersToGroupChat' in data) {
      node = data['addMembersToGroupChat'];
    } else if ('removeMembersFromGroupChat' in data) {
      node = data['removeMembersFromGroupChat'];
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
