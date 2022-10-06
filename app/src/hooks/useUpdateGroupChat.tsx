import { ApolloCache, FetchResult, gql } from '@apollo/client';
import {
  AddAdminsToGroupChatMutation,
  AddMembersToGroupChatMutation,
  GetEventsDocument,
  GetEventsQuery,
  RemoveAdminsFromGroupChatMutation,
  RemoveMembersFromGroupChatMutation,
  UpdateGroupChatDescriptionMutation,
  UpdateGroupChatNameMutation,
  useAddAdminsToGroupChatMutation,
  useAddMembersToGroupChatMutation,
  useRemoveAdminsFromGroupChatMutation,
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
      membersAdded {
        id
        username
      }
      chat {
        id
        ... on GroupChat {
          members {
            id
          }
        }
      }
    }
  }
  mutation RemoveMembersFromGroupChat($chatId: HashId!, $members: [HashId!]!) {
    removeMembersFromGroupChat(chatId: $chatId, members: $members) {
      ...GroupChatUpdate
      membersRemoved {
        id
        username
      }
      chat {
        id
        ... on GroupChat {
          members {
            id
          }
        }
      }
    }
  }
  mutation AddAdminsToGroupChat($chatId: HashId!, $members: [HashId!]!) {
    addAdminsToGroupChat(chatId: $chatId, members: $members) {
      ...GroupChatUpdate
      adminsAdded {
        id
        username
      }
      chat {
        id
        ... on GroupChat {
          admins {
            id
          }
        }
      }
    }
  }
  mutation RemoveAdminsFromGroupChat($chatId: HashId!, $members: [HashId!]!) {
    removeAdminsFromGroupChat(chatId: $chatId, members: $members) {
      ...GroupChatUpdate
      adminsRemoved {
        id
        username
      }
      chat {
        id
        ... on GroupChat {
          admins {
            id
          }
        }
      }
    }
  }

  fragment GroupChatUpdate on ChatUpdate {
    id
    createdBy {
      id
    }
  }
`;

type UpdateProps = {
  name?: string | null;
  description?: string | null;
  addMembers?: string[] | null;
  removeMembers?: string[] | null;
  addAdmins?: string[] | null;
  removeAdmins?: string[] | null;
};

export const useUpdateGroupChat = () => {
  const [updateNameMutation, { loading: loadingName }] =
    useUpdateGroupChatNameMutation();
  const [updateDescriptionMutation, { loading: loadingDesc }] =
    useUpdateGroupChatDescriptionMutation();
  const [addMembersMutation, { loading: loadingAddMembers }] =
    useAddMembersToGroupChatMutation();
  const [removeMembersMutation, { loading: loadingRemoveMembers }] =
    useRemoveMembersFromGroupChatMutation();
  const [addAdminsMutation, { loading: loadingAddAdmins }] =
    useAddAdminsToGroupChatMutation();
  const [removeAdminsMutation, { loading: loadingRemoveAdmins }] =
    useRemoveAdminsFromGroupChatMutation();

  const loading =
    loadingName ||
    loadingDesc ||
    loadingAddMembers ||
    loadingRemoveMembers ||
    loadingAddAdmins ||
    loadingRemoveAdmins;

  const update = (
    chatId: string,
    {
      name,
      description,
      addMembers,
      removeMembers,
      addAdmins,
      removeAdmins,
    }: UpdateProps
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

    if (addAdmins?.length) {
      addAdminsMutation({
        variables: {
          chatId,
          members: addAdmins,
        },
        update: addEvent(chatId),
      });
    }

    if (removeAdmins?.length) {
      removeAdminsMutation({
        variables: {
          chatId,
          members: removeAdmins,
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
        | RemoveMembersFromGroupChatMutation
        | AddAdminsToGroupChatMutation
        | RemoveAdminsFromGroupChatMutation,
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
    } else if ('addAdminsToGroupChat' in data) {
      node = data['addAdminsToGroupChat'];
    } else if ('removeAdminsFromGroupChat' in data) {
      node = data['removeAdminsFromGroupChat'];
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
