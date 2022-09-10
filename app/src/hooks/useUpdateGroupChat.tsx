import { gql } from '@apollo/client';
import { useUser } from 'context/UserContext';
import {
  ChatUpdateEventFragment,
  GetEventsDocument,
  GetEventsQuery,
  UpdateGroupChatInput,
  useUpdateGroupChatMutation,
} from 'graphql/generated/graphql';

gql`
  mutation UpdateGroupChat(
    $chatId: HashId!
    $data: UpdateGroupChatInput!
    $addAdmins: [HashId!]!
    $removeAdmins: [HashId!]!
    $addMembers: [HashId!]!
    $removeMembers: [HashId!]!
  ) {
    updateGroupChat(chatId: $chatId, data: $data) {
      id
      name
      description
    }
    addAdminsToGroupChat(chatId: $chatId, members: $addAdmins) {
      id
      admins {
        id
        username
      }
    }
    removeAdminsFromGroupChat(chatId: $chatId, members: $removeAdmins) {
      id
      admins {
        id
        username
      }
    }
    addMembersToGroupChat(chatId: $chatId, members: $addMembers) {
      id
      members {
        id
        username
      }
    }
    removeMembersFromGroupChat(chatId: $chatId, members: $removeMembers) {
      id
      members {
        id
        username
      }
    }
  }

  fragment UpdateChat on GroupChat {
    id
    name
    description
    admins {
      id
      username
    }
    members {
      id
      username
    }
  }
`;

type MutateUserProps = {
  chatId: string;
  userIds: string[];
};

type UpdateChatData = UpdateGroupChatInput & {
  addMembers?: string[];
  removeMembers?: string[];
  addAdmins?: string[];
  removeAdmins?: string[];
};

type UpdateChatProps = {
  chatId: string;
  data: UpdateChatData;
};

export const useUpdateGroupChat = () => {
  const { user } = useUser();
  const [update, { loading }] = useUpdateGroupChatMutation();

  const updateChat = ({
    chatId,
    data: {
      name,
      description,
      addAdmins = [],
      removeAdmins = [],
      addMembers = [],
      removeMembers = [],
    },
  }: UpdateChatProps) => {
    return update({
      variables: {
        chatId,
        data: {
          name: name,
          description: description,
        },
        addAdmins,
        removeAdmins,
        addMembers,
        removeMembers,
      },
      update: (cache, { data }) => {
        const result = cache.readQuery<GetEventsQuery>({
          query: GetEventsDocument,
          variables: {
            chatId,
          },
        });

        const newEvents: ChatUpdateEventFragment[] = [];

        if (name || description) {
          newEvents.push({
            id: data.updateGroupChat.id,
            name,
            description,
            adminsAdded: [],
            adminsRemoved: [],
            membersAdded: [],
            membersRemoved: [],
            createdBy: {
              __typename: 'Me',
              ...user,
            },
          });
        }

        if (addAdmins.length !== 0 && data.addAdminsToGroupChat) {
          newEvents.push({
            id: data.addAdminsToGroupChat.id,
            name: '',
            description: '',
            adminsAdded: data.addAdminsToGroupChat!.admins,
            adminsRemoved: [],
            membersAdded: [],
            membersRemoved: [],
            createdBy: {
              __typename: 'Me',
              ...user,
            },
          });
        }

        if (removeAdmins.length !== 0 && data.removeAdminsFromGroupChat) {
          newEvents.push({
            id: data.removeAdminsFromGroupChat.id,
            name: '',
            description: '',
            adminsAdded: [],
            adminsRemoved: data.removeAdminsFromGroupChat!.admins,
            membersAdded: [],
            membersRemoved: [],
            createdBy: {
              __typename: 'Me',
              ...user,
            },
          });
        }

        if (addMembers.length !== 0 && data.addMembersToGroupChat) {
          newEvents.push({
            id: data.addMembersToGroupChat.id,
            name: '',
            description: '',
            adminsAdded: [],
            adminsRemoved: [],
            membersAdded: data.addMembersToGroupChat!.members,
            membersRemoved: [],
            createdBy: {
              __typename: 'Me',
              ...user,
            },
          });
        }

        if (removeMembers.length !== 0 && data.removeMembersFromGroupChat) {
          newEvents.push({
            id: data.removeMembersFromGroupChat.id,
            name: '',
            description: '',
            adminsAdded: [],
            adminsRemoved: [],
            membersAdded: [],
            membersRemoved: data.removeMembersFromGroupChat!.members,
            createdBy: {
              __typename: 'Me',
              ...user,
            },
          });
        }

        cache.writeQuery<GetEventsQuery>({
          query: GetEventsDocument,
          variables: {
            chatId,
          },
          data: {
            events: {
              pageInfo: result.events.pageInfo,
              edges: {
                ...result.events.edges,
                ...newEvents.map((x) => ({
                  __typename: 'EventEdge',
                  node: {
                    __typename: 'ChatUpdate',
                    createdAt: 32,
                    isCreator: true,
                    ...x,
                    createdBy: {
                      __typename: 'Me',
                      ...user,
                    },
                  },
                })),
              },
            },
          },
        });
      },
    });
  };

  const updateName = ({ chatId, name }: { chatId: string; name: string }) => {
    return updateChat({
      chatId,
      data: {
        name,
      },
    });
  };

  const updateDescription = ({
    chatId,
    description,
  }: {
    chatId: string;
    description: string;
  }) => {
    return updateChat({
      chatId,
      data: {
        description,
      },
    });
  };

  const removeMembers = ({ chatId, userIds }: MutateUserProps) => {
    return updateChat({
      chatId,
      data: {
        removeMembers: userIds,
      },
    });
  };

  const addMembers = ({ chatId, userIds }: MutateUserProps) => {
    return updateChat({
      chatId,
      data: {
        addMembers: userIds,
      },
    });
  };

  const removeAdmins = ({ chatId, userIds }: MutateUserProps) => {
    return updateChat({
      chatId,
      data: {
        removeAdmins: userIds,
      },
    });
  };

  const addAdmins = ({ chatId, userIds }: MutateUserProps) => {
    return updateChat({
      chatId,
      data: {
        addAdmins: userIds,
      },
    });
  };

  return {
    updateChat,
    updateName,
    updateDescription,
    removeMembers,
    addMembers,
    removeAdmins,
    addAdmins,
    loading,
  };
};
