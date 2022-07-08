import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type Chat = {
  __typename?: 'Chat';
  createdAt: Scalars['Date'];
  createdBy: User;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isDM: Scalars['Boolean'];
  memberCount: Scalars['Int'];
  members: Array<User>;
  messages: MessageConnection;
  name: Scalars['String'];
  updatedAt: Scalars['Date'];
  updates: Array<ChatUpdate>;
};

export type ChatMessagesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type ChatUpdate = {
  __typename?: 'ChatUpdate';
  chat: Chat;
  chatId: Scalars['ID'];
  createdAt: Scalars['Date'];
  createdBy?: Maybe<User>;
  createdById: Scalars['ID'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  memberIdsAdded?: Maybe<Array<Scalars['ID']>>;
  memberIdsRemoved?: Maybe<Array<Scalars['ID']>>;
  membersAdded?: Maybe<Array<User>>;
  membersRemoved?: Maybe<Array<User>>;
  name?: Maybe<Scalars['String']>;
};

export enum FriendStatus {
  Friend = 'FRIEND',
  NotFriend = 'NOT_FRIEND',
  RequestReceived = 'REQUEST_RECEIVED',
  RequestSent = 'REQUEST_SENT',
}

export type Message = {
  __typename?: 'Message';
  chat: Chat;
  chatId: Scalars['ID'];
  content: Scalars['String'];
  createdAt: Scalars['Date'];
  createdBy: User;
  createdById: Scalars['String'];
  id: Scalars['ID'];
  likedBy: Array<User>;
  updatedAt: Scalars['Date'];
};

export type MessageConnection = {
  __typename?: 'MessageConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges?: Maybe<Array<Maybe<MessageEdge>>>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
};

export type MessageEdge = {
  __typename?: 'MessageEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node?: Maybe<Message>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Accept a Users friend request */
  acceptFriendRequest?: Maybe<User>;
  /** Add Members into Chat */
  addMembersToChat?: Maybe<Chat>;
  /** Cancel/Delete a sent Friend Request */
  cancelFriendRequest?: Maybe<User>;
  /** Create a Chat */
  createChat?: Maybe<Chat>;
  /** Create a Message in a Chat */
  createMessage?: Maybe<Message>;
  /** Delete/Decline a received Friend Request */
  declineFriendRequest?: Maybe<User>;
  /** Delete a Chat */
  deleteChat?: Maybe<Scalars['Boolean']>;
  /** Delete a Friend */
  deleteFriend?: Maybe<User>;
  /** Delete a Message */
  deleteMessage?: Maybe<Message>;
  /** Edit a Message */
  editMessage?: Maybe<Message>;
  /** Remove Members from Chat */
  removeMembersFromChat?: Maybe<Chat>;
  /** Send a Friend Request to a User */
  sendFriendRequest?: Maybe<User>;
  /** Update a Chat */
  updateChat?: Maybe<Chat>;
  /** Update current User */
  updateUser?: Maybe<User>;
};

export type MutationAcceptFriendRequestArgs = {
  friendId: Scalars['String'];
};

export type MutationAddMembersToChatArgs = {
  chatId: Scalars['String'];
  memberIds: Array<Scalars['String']>;
};

export type MutationCancelFriendRequestArgs = {
  friendId: Scalars['String'];
};

export type MutationCreateChatArgs = {
  description?: InputMaybe<Scalars['String']>;
  isPrivate?: InputMaybe<Scalars['Boolean']>;
  memberIds?: InputMaybe<Array<Scalars['String']>>;
  name: Scalars['String'];
};

export type MutationCreateMessageArgs = {
  chatId: Scalars['String'];
  content: Scalars['String'];
};

export type MutationDeclineFriendRequestArgs = {
  friendId: Scalars['String'];
};

export type MutationDeleteChatArgs = {
  chatId: Scalars['String'];
};

export type MutationDeleteFriendArgs = {
  friendId: Scalars['String'];
};

export type MutationDeleteMessageArgs = {
  messageId: Scalars['String'];
};

export type MutationEditMessageArgs = {
  content: Scalars['String'];
  messageId: Scalars['String'];
};

export type MutationRemoveMembersFromChatArgs = {
  chatId: Scalars['String'];
  membersIds: Array<Scalars['String']>;
};

export type MutationSendFriendRequestArgs = {
  friendId: Scalars['String'];
};

export type MutationUpdateChatArgs = {
  addMembersId?: InputMaybe<Array<Scalars['String']>>;
  chatId: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  isPrivate?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  removeMembersId?: InputMaybe<Array<Scalars['String']>>;
};

export type MutationUpdateUserArgs = {
  email: Scalars['String'];
  username: Scalars['String'];
};

/** PageInfo cursor, as defined in https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** The cursor corresponding to the last nodes in edges. Null if the connection is empty. */
  endCursor?: Maybe<Scalars['String']>;
  /** Used to indicate whether more edges exist following the set defined by the clients arguments. */
  hasNextPage: Scalars['Boolean'];
  /** Used to indicate whether more edges exist prior to the set defined by the clients arguments. */
  hasPreviousPage: Scalars['Boolean'];
  /** The cursor corresponding to the first nodes in edges. Null if the connection is empty. */
  startCursor?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  chat?: Maybe<Chat>;
  chatMessages: MessageConnection;
  chats: Array<Chat>;
  friends: Array<User>;
  me?: Maybe<User>;
  user?: Maybe<User>;
  /** Find users */
  users: UserConnection;
};

export type QueryChatArgs = {
  chatId: Scalars['String'];
};

export type QueryChatMessagesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  chatId: Scalars['String'];
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type QueryUserArgs = {
  id: Scalars['String'];
};

export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserOrderBy>;
  usernameFilter?: InputMaybe<Scalars['String']>;
};

export enum Sort {
  Asc = 'asc',
  Desc = 'desc',
}

export type Subscription = {
  __typename?: 'Subscription';
  chatUpdated?: Maybe<ChatUpdate>;
  friendCreated?: Maybe<User>;
  friendRequestCreated?: Maybe<User>;
  friendRequestDeleted?: Maybe<User>;
  meChanged?: Maybe<User>;
  messageCreated?: Maybe<Message>;
};

export type SubscriptionChatUpdatedArgs = {
  chatId: Scalars['String'];
};

export type SubscriptionFriendCreatedArgs = {
  userId: Scalars['String'];
};

export type SubscriptionMessageCreatedArgs = {
  chatId: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  chats: Array<Chat>;
  createdAt: Scalars['Date'];
  email: Scalars['String'];
  friendStatus: FriendStatus;
  friends: UserConnection;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  receivedFriendRequests: Array<User>;
  sentFriendRequests: Array<User>;
  updatedAt: Scalars['Date'];
  username: Scalars['String'];
};

export type UserFriendsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type UserConnection = {
  __typename?: 'UserConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges?: Maybe<Array<Maybe<UserEdge>>>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
};

export type UserEdge = {
  __typename?: 'UserEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node?: Maybe<User>;
};

export type UserOrderBy = {
  createdAt?: InputMaybe<Sort>;
  email?: InputMaybe<Sort>;
  id?: InputMaybe<Sort>;
  name?: InputMaybe<Sort>;
  updatedAt?: InputMaybe<Sort>;
  username?: InputMaybe<Sort>;
};

export type ReceivedFriendRequestFragment = {
  __typename?: 'User';
  id: string;
  friendStatus: FriendStatus;
  name?: string | null;
  username: string;
};

export type ReceivedFriendRequestsFragment = {
  __typename?: 'User';
  receivedFriendRequests: Array<{
    __typename?: 'User';
    id: string;
    friendStatus: FriendStatus;
    name?: string | null;
    username: string;
  }>;
};

export type NamePartsFragment = {
  __typename?: 'User';
  name?: string | null;
  username: string;
};

export type AcceptFriendRequestMutationVariables = Exact<{
  friendId: Scalars['String'];
}>;

export type AcceptFriendRequestMutation = {
  __typename?: 'Mutation';
  acceptFriendRequest?: {
    __typename?: 'User';
    id: string;
    friendStatus: FriendStatus;
  } | null;
};

export type CancelFriendRequestMutationVariables = Exact<{
  friendId: Scalars['String'];
}>;

export type CancelFriendRequestMutation = {
  __typename?: 'Mutation';
  cancelFriendRequest?: {
    __typename?: 'User';
    id: string;
    friendStatus: FriendStatus;
  } | null;
};

export type CreateChatMutationVariables = Exact<{
  name: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  isPrivate?: InputMaybe<Scalars['Boolean']>;
  memberIds?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
}>;

export type CreateChatMutation = {
  __typename?: 'Mutation';
  createChat?: {
    __typename?: 'Chat';
    id: string;
    name: string;
    description?: string | null;
    members: Array<{ __typename?: 'User'; username: string; id: string }>;
  } | null;
};

export type CreateMessageMutationVariables = Exact<{
  chatId: Scalars['String'];
  content: Scalars['String'];
}>;

export type CreateMessageMutation = {
  __typename?: 'Mutation';
  createMessage?: {
    __typename?: 'Message';
    id: string;
    content: string;
    createdAt: any;
    createdBy: {
      __typename?: 'User';
      id: string;
      name?: string | null;
      username: string;
    };
  } | null;
};

export type DeclineFriendRequestMutationVariables = Exact<{
  friendId: Scalars['String'];
}>;

export type DeclineFriendRequestMutation = {
  __typename?: 'Mutation';
  declineFriendRequest?: {
    __typename?: 'User';
    id: string;
    friendStatus: FriendStatus;
  } | null;
};

export type DeleteFriendMutationVariables = Exact<{
  friendId: Scalars['String'];
}>;

export type DeleteFriendMutation = {
  __typename?: 'Mutation';
  deleteFriend?: {
    __typename?: 'User';
    id: string;
    friendStatus: FriendStatus;
  } | null;
};

export type RemoveMembersFromChatMutationVariables = Exact<{
  chatId: Scalars['String'];
  membersIds: Array<Scalars['String']> | Scalars['String'];
}>;

export type RemoveMembersFromChatMutation = {
  __typename?: 'Mutation';
  removeMembersFromChat?: {
    __typename?: 'Chat';
    id: string;
    members: Array<{ __typename?: 'User'; id: string }>;
  } | null;
};

export type SendFriendRequestMutationVariables = Exact<{
  friendId: Scalars['String'];
}>;

export type SendFriendRequestMutation = {
  __typename?: 'Mutation';
  sendFriendRequest?: {
    __typename?: 'User';
    id: string;
    friendStatus: FriendStatus;
  } | null;
};

export type UpdateChatMutationVariables = Exact<{
  chatId: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  isPrivate?: InputMaybe<Scalars['Boolean']>;
  addMembersId?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  removeMembersId?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
}>;

export type UpdateChatMutation = {
  __typename?: 'Mutation';
  updateChat?: {
    __typename?: 'Chat';
    id: string;
    name: string;
    description?: string | null;
    updatedAt: any;
    members: Array<{ __typename?: 'User'; id: string }>;
  } | null;
};

export type GetChatQueryVariables = Exact<{
  chatId: Scalars['String'];
}>;

export type GetChatQuery = {
  __typename?: 'Query';
  chat?: {
    __typename?: 'Chat';
    id: string;
    name: string;
    createdAt: any;
    description?: string | null;
    createdBy: {
      __typename?: 'User';
      id: string;
      name?: string | null;
      username: string;
    };
    members: Array<{
      __typename?: 'User';
      id: string;
      friendStatus: FriendStatus;
      name?: string | null;
      username: string;
    }>;
  } | null;
};

export type GetChatMessagesQueryVariables = Exact<{
  chatId: Scalars['String'];
  last?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  before?: InputMaybe<Scalars['String']>;
}>;

export type GetChatMessagesQuery = {
  __typename?: 'Query';
  chatMessages: {
    __typename?: 'MessageConnection';
    pageInfo: {
      __typename?: 'PageInfo';
      startCursor?: string | null;
      endCursor?: string | null;
      hasPreviousPage: boolean;
      hasNextPage: boolean;
    };
    edges?: Array<{
      __typename?: 'MessageEdge';
      node?: {
        __typename?: 'Message';
        id: string;
        content: string;
        createdAt: any;
        createdBy: {
          __typename?: 'User';
          id: string;
          name?: string | null;
          username: string;
        };
      } | null;
    } | null> | null;
  };
};

export type GetChatsQueryVariables = Exact<{ [key: string]: never }>;

export type GetChatsQuery = {
  __typename?: 'Query';
  chats: Array<{
    __typename?: 'Chat';
    id: string;
    name: string;
    description?: string | null;
    members: Array<{
      __typename?: 'User';
      id: string;
      name?: string | null;
      username: string;
    }>;
  }>;
};

export type GetFriendsQueryVariables = Exact<{ [key: string]: never }>;

export type GetFriendsQuery = {
  __typename?: 'Query';
  friends: Array<{
    __typename?: 'User';
    id: string;
    name?: string | null;
    username: string;
  }>;
};

export type GetMeQueryVariables = Exact<{ [key: string]: never }>;

export type GetMeQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    id: string;
    name?: string | null;
    username: string;
    receivedFriendRequests: Array<{
      __typename?: 'User';
      id: string;
      friendStatus: FriendStatus;
      name?: string | null;
      username: string;
    }>;
  } | null;
};

export type GetUsersQueryVariables = Exact<{
  usernameFilter?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
}>;

export type GetUsersQuery = {
  __typename?: 'Query';
  users: {
    __typename?: 'UserConnection';
    pageInfo: {
      __typename?: 'PageInfo';
      hasNextPage: boolean;
      endCursor?: string | null;
    };
    edges?: Array<{
      __typename?: 'UserEdge';
      cursor: string;
      node?: {
        __typename?: 'User';
        id: string;
        friendStatus: FriendStatus;
        name?: string | null;
        username: string;
      } | null;
    } | null> | null;
  };
};

export type ChatUpdatedSubscriptionVariables = Exact<{
  chatId: Scalars['String'];
}>;

export type ChatUpdatedSubscription = {
  __typename?: 'Subscription';
  chatUpdated?: {
    __typename?: 'ChatUpdate';
    name?: string | null;
    description?: string | null;
    memberIdsAdded?: Array<string> | null;
    memberIdsRemoved?: Array<string> | null;
    chat: {
      __typename?: 'Chat';
      id: string;
      name: string;
      description?: string | null;
      members: Array<{ __typename?: 'User'; id: string }>;
    };
  } | null;
};

export type FriendRequestCreatedSubscriptionVariables = Exact<{
  [key: string]: never;
}>;

export type FriendRequestCreatedSubscription = {
  __typename?: 'Subscription';
  friendRequestCreated?: {
    __typename?: 'User';
    id: string;
    name?: string | null;
    username: string;
  } | null;
};

export type MeChangedSubscriptionVariables = Exact<{ [key: string]: never }>;

export type MeChangedSubscription = {
  __typename?: 'Subscription';
  meChanged?: {
    __typename?: 'User';
    id: string;
    name?: string | null;
    username: string;
    receivedFriendRequests: Array<{
      __typename?: 'User';
      id: string;
      friendStatus: FriendStatus;
      name?: string | null;
      username: string;
    }>;
  } | null;
};

export type MessageCreatedSubscriptionVariables = Exact<{
  chatId: Scalars['String'];
}>;

export type MessageCreatedSubscription = {
  __typename?: 'Subscription';
  messageCreated?: {
    __typename?: 'Message';
    id: string;
    content: string;
    createdAt: any;
    createdBy: {
      __typename?: 'User';
      id: string;
      name?: string | null;
      username: string;
    };
  } | null;
};

export const NamePartsFragmentDoc = gql`
  fragment NameParts on User {
    name
    username
  }
`;
export const ReceivedFriendRequestFragmentDoc = gql`
  fragment ReceivedFriendRequest on User {
    id
    ...NameParts
    friendStatus
  }
  ${NamePartsFragmentDoc}
`;
export const ReceivedFriendRequestsFragmentDoc = gql`
  fragment ReceivedFriendRequests on User {
    receivedFriendRequests {
      id
      ...NameParts
      friendStatus
    }
  }
  ${NamePartsFragmentDoc}
`;
export const AcceptFriendRequestDocument = gql`
  mutation AcceptFriendRequest($friendId: String!) {
    acceptFriendRequest(friendId: $friendId) {
      id
      friendStatus
    }
  }
`;
export type AcceptFriendRequestMutationFn = Apollo.MutationFunction<
  AcceptFriendRequestMutation,
  AcceptFriendRequestMutationVariables
>;

/**
 * __useAcceptFriendRequestMutation__
 *
 * To run a mutation, you first call `useAcceptFriendRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptFriendRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptFriendRequestMutation, { data, loading, error }] = useAcceptFriendRequestMutation({
 *   variables: {
 *      friendId: // value for 'friendId'
 *   },
 * });
 */
export function useAcceptFriendRequestMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AcceptFriendRequestMutation,
    AcceptFriendRequestMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AcceptFriendRequestMutation,
    AcceptFriendRequestMutationVariables
  >(AcceptFriendRequestDocument, options);
}
export type AcceptFriendRequestMutationHookResult = ReturnType<
  typeof useAcceptFriendRequestMutation
>;
export type AcceptFriendRequestMutationResult =
  Apollo.MutationResult<AcceptFriendRequestMutation>;
export type AcceptFriendRequestMutationOptions = Apollo.BaseMutationOptions<
  AcceptFriendRequestMutation,
  AcceptFriendRequestMutationVariables
>;
export const CancelFriendRequestDocument = gql`
  mutation CancelFriendRequest($friendId: String!) {
    cancelFriendRequest(friendId: $friendId) {
      id
      friendStatus
    }
  }
`;
export type CancelFriendRequestMutationFn = Apollo.MutationFunction<
  CancelFriendRequestMutation,
  CancelFriendRequestMutationVariables
>;

/**
 * __useCancelFriendRequestMutation__
 *
 * To run a mutation, you first call `useCancelFriendRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelFriendRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelFriendRequestMutation, { data, loading, error }] = useCancelFriendRequestMutation({
 *   variables: {
 *      friendId: // value for 'friendId'
 *   },
 * });
 */
export function useCancelFriendRequestMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CancelFriendRequestMutation,
    CancelFriendRequestMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CancelFriendRequestMutation,
    CancelFriendRequestMutationVariables
  >(CancelFriendRequestDocument, options);
}
export type CancelFriendRequestMutationHookResult = ReturnType<
  typeof useCancelFriendRequestMutation
>;
export type CancelFriendRequestMutationResult =
  Apollo.MutationResult<CancelFriendRequestMutation>;
export type CancelFriendRequestMutationOptions = Apollo.BaseMutationOptions<
  CancelFriendRequestMutation,
  CancelFriendRequestMutationVariables
>;
export const CreateChatDocument = gql`
  mutation CreateChat(
    $name: String!
    $description: String
    $isPrivate: Boolean
    $memberIds: [String!]
  ) {
    createChat(
      name: $name
      description: $description
      isPrivate: $isPrivate
      memberIds: $memberIds
    ) {
      id
      name
      description
      members {
        username
        id
      }
    }
  }
`;
export type CreateChatMutationFn = Apollo.MutationFunction<
  CreateChatMutation,
  CreateChatMutationVariables
>;

/**
 * __useCreateChatMutation__
 *
 * To run a mutation, you first call `useCreateChatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChatMutation, { data, loading, error }] = useCreateChatMutation({
 *   variables: {
 *      name: // value for 'name'
 *      description: // value for 'description'
 *      isPrivate: // value for 'isPrivate'
 *      memberIds: // value for 'memberIds'
 *   },
 * });
 */
export function useCreateChatMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateChatMutation,
    CreateChatMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateChatMutation, CreateChatMutationVariables>(
    CreateChatDocument,
    options
  );
}
export type CreateChatMutationHookResult = ReturnType<
  typeof useCreateChatMutation
>;
export type CreateChatMutationResult =
  Apollo.MutationResult<CreateChatMutation>;
export type CreateChatMutationOptions = Apollo.BaseMutationOptions<
  CreateChatMutation,
  CreateChatMutationVariables
>;
export const CreateMessageDocument = gql`
  mutation CreateMessage($chatId: String!, $content: String!) {
    createMessage(chatId: $chatId, content: $content) {
      id
      content
      createdAt
      createdBy {
        id
        name
        username
      }
    }
  }
`;
export type CreateMessageMutationFn = Apollo.MutationFunction<
  CreateMessageMutation,
  CreateMessageMutationVariables
>;

/**
 * __useCreateMessageMutation__
 *
 * To run a mutation, you first call `useCreateMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMessageMutation, { data, loading, error }] = useCreateMessageMutation({
 *   variables: {
 *      chatId: // value for 'chatId'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useCreateMessageMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateMessageMutation,
    CreateMessageMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateMessageMutation,
    CreateMessageMutationVariables
  >(CreateMessageDocument, options);
}
export type CreateMessageMutationHookResult = ReturnType<
  typeof useCreateMessageMutation
>;
export type CreateMessageMutationResult =
  Apollo.MutationResult<CreateMessageMutation>;
export type CreateMessageMutationOptions = Apollo.BaseMutationOptions<
  CreateMessageMutation,
  CreateMessageMutationVariables
>;
export const DeclineFriendRequestDocument = gql`
  mutation DeclineFriendRequest($friendId: String!) {
    declineFriendRequest(friendId: $friendId) {
      id
      friendStatus
    }
  }
`;
export type DeclineFriendRequestMutationFn = Apollo.MutationFunction<
  DeclineFriendRequestMutation,
  DeclineFriendRequestMutationVariables
>;

/**
 * __useDeclineFriendRequestMutation__
 *
 * To run a mutation, you first call `useDeclineFriendRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeclineFriendRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [declineFriendRequestMutation, { data, loading, error }] = useDeclineFriendRequestMutation({
 *   variables: {
 *      friendId: // value for 'friendId'
 *   },
 * });
 */
export function useDeclineFriendRequestMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeclineFriendRequestMutation,
    DeclineFriendRequestMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeclineFriendRequestMutation,
    DeclineFriendRequestMutationVariables
  >(DeclineFriendRequestDocument, options);
}
export type DeclineFriendRequestMutationHookResult = ReturnType<
  typeof useDeclineFriendRequestMutation
>;
export type DeclineFriendRequestMutationResult =
  Apollo.MutationResult<DeclineFriendRequestMutation>;
export type DeclineFriendRequestMutationOptions = Apollo.BaseMutationOptions<
  DeclineFriendRequestMutation,
  DeclineFriendRequestMutationVariables
>;
export const DeleteFriendDocument = gql`
  mutation DeleteFriend($friendId: String!) {
    deleteFriend(friendId: $friendId) {
      id
      friendStatus
    }
  }
`;
export type DeleteFriendMutationFn = Apollo.MutationFunction<
  DeleteFriendMutation,
  DeleteFriendMutationVariables
>;

/**
 * __useDeleteFriendMutation__
 *
 * To run a mutation, you first call `useDeleteFriendMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFriendMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFriendMutation, { data, loading, error }] = useDeleteFriendMutation({
 *   variables: {
 *      friendId: // value for 'friendId'
 *   },
 * });
 */
export function useDeleteFriendMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteFriendMutation,
    DeleteFriendMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteFriendMutation,
    DeleteFriendMutationVariables
  >(DeleteFriendDocument, options);
}
export type DeleteFriendMutationHookResult = ReturnType<
  typeof useDeleteFriendMutation
>;
export type DeleteFriendMutationResult =
  Apollo.MutationResult<DeleteFriendMutation>;
export type DeleteFriendMutationOptions = Apollo.BaseMutationOptions<
  DeleteFriendMutation,
  DeleteFriendMutationVariables
>;
export const RemoveMembersFromChatDocument = gql`
  mutation RemoveMembersFromChat($chatId: String!, $membersIds: [String!]!) {
    removeMembersFromChat(chatId: $chatId, membersIds: $membersIds) {
      id
      members {
        id
      }
    }
  }
`;
export type RemoveMembersFromChatMutationFn = Apollo.MutationFunction<
  RemoveMembersFromChatMutation,
  RemoveMembersFromChatMutationVariables
>;

/**
 * __useRemoveMembersFromChatMutation__
 *
 * To run a mutation, you first call `useRemoveMembersFromChatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveMembersFromChatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeMembersFromChatMutation, { data, loading, error }] = useRemoveMembersFromChatMutation({
 *   variables: {
 *      chatId: // value for 'chatId'
 *      membersIds: // value for 'membersIds'
 *   },
 * });
 */
export function useRemoveMembersFromChatMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveMembersFromChatMutation,
    RemoveMembersFromChatMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RemoveMembersFromChatMutation,
    RemoveMembersFromChatMutationVariables
  >(RemoveMembersFromChatDocument, options);
}
export type RemoveMembersFromChatMutationHookResult = ReturnType<
  typeof useRemoveMembersFromChatMutation
>;
export type RemoveMembersFromChatMutationResult =
  Apollo.MutationResult<RemoveMembersFromChatMutation>;
export type RemoveMembersFromChatMutationOptions = Apollo.BaseMutationOptions<
  RemoveMembersFromChatMutation,
  RemoveMembersFromChatMutationVariables
>;
export const SendFriendRequestDocument = gql`
  mutation SendFriendRequest($friendId: String!) {
    sendFriendRequest(friendId: $friendId) {
      id
      friendStatus
    }
  }
`;
export type SendFriendRequestMutationFn = Apollo.MutationFunction<
  SendFriendRequestMutation,
  SendFriendRequestMutationVariables
>;

/**
 * __useSendFriendRequestMutation__
 *
 * To run a mutation, you first call `useSendFriendRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendFriendRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendFriendRequestMutation, { data, loading, error }] = useSendFriendRequestMutation({
 *   variables: {
 *      friendId: // value for 'friendId'
 *   },
 * });
 */
export function useSendFriendRequestMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SendFriendRequestMutation,
    SendFriendRequestMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SendFriendRequestMutation,
    SendFriendRequestMutationVariables
  >(SendFriendRequestDocument, options);
}
export type SendFriendRequestMutationHookResult = ReturnType<
  typeof useSendFriendRequestMutation
>;
export type SendFriendRequestMutationResult =
  Apollo.MutationResult<SendFriendRequestMutation>;
export type SendFriendRequestMutationOptions = Apollo.BaseMutationOptions<
  SendFriendRequestMutation,
  SendFriendRequestMutationVariables
>;
export const UpdateChatDocument = gql`
  mutation UpdateChat(
    $chatId: String!
    $name: String
    $description: String
    $isPrivate: Boolean
    $addMembersId: [String!]
    $removeMembersId: [String!]
  ) {
    updateChat(
      chatId: $chatId
      name: $name
      description: $description
      isPrivate: $isPrivate
      addMembersId: $addMembersId
      removeMembersId: $removeMembersId
    ) {
      id
      name
      description
      members {
        id
      }
      updatedAt
    }
  }
`;
export type UpdateChatMutationFn = Apollo.MutationFunction<
  UpdateChatMutation,
  UpdateChatMutationVariables
>;

/**
 * __useUpdateChatMutation__
 *
 * To run a mutation, you first call `useUpdateChatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateChatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateChatMutation, { data, loading, error }] = useUpdateChatMutation({
 *   variables: {
 *      chatId: // value for 'chatId'
 *      name: // value for 'name'
 *      description: // value for 'description'
 *      isPrivate: // value for 'isPrivate'
 *      addMembersId: // value for 'addMembersId'
 *      removeMembersId: // value for 'removeMembersId'
 *   },
 * });
 */
export function useUpdateChatMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateChatMutation,
    UpdateChatMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateChatMutation, UpdateChatMutationVariables>(
    UpdateChatDocument,
    options
  );
}
export type UpdateChatMutationHookResult = ReturnType<
  typeof useUpdateChatMutation
>;
export type UpdateChatMutationResult =
  Apollo.MutationResult<UpdateChatMutation>;
export type UpdateChatMutationOptions = Apollo.BaseMutationOptions<
  UpdateChatMutation,
  UpdateChatMutationVariables
>;
export const GetChatDocument = gql`
  query GetChat($chatId: String!) {
    chat(chatId: $chatId) {
      id
      name
      createdAt
      description
      createdBy {
        id
        ...NameParts
      }
      members {
        id
        ...NameParts
        friendStatus
      }
    }
  }
  ${NamePartsFragmentDoc}
`;

/**
 * __useGetChatQuery__
 *
 * To run a query within a React component, call `useGetChatQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChatQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChatQuery({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useGetChatQuery(
  baseOptions: Apollo.QueryHookOptions<GetChatQuery, GetChatQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetChatQuery, GetChatQueryVariables>(
    GetChatDocument,
    options
  );
}
export function useGetChatLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetChatQuery, GetChatQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetChatQuery, GetChatQueryVariables>(
    GetChatDocument,
    options
  );
}
export type GetChatQueryHookResult = ReturnType<typeof useGetChatQuery>;
export type GetChatLazyQueryHookResult = ReturnType<typeof useGetChatLazyQuery>;
export type GetChatQueryResult = Apollo.QueryResult<
  GetChatQuery,
  GetChatQueryVariables
>;
export const GetChatMessagesDocument = gql`
  query GetChatMessages(
    $chatId: String!
    $last: Int
    $after: String
    $first: Int
    $before: String
  ) {
    chatMessages(
      chatId: $chatId
      last: $last
      after: $after
      first: $first
      before: $before
    ) {
      pageInfo {
        startCursor
        endCursor
        hasPreviousPage
        hasNextPage
      }
      edges {
        node {
          id
          content
          createdAt
          createdBy {
            id
            ...NameParts
          }
        }
      }
    }
  }
  ${NamePartsFragmentDoc}
`;

/**
 * __useGetChatMessagesQuery__
 *
 * To run a query within a React component, call `useGetChatMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChatMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChatMessagesQuery({
 *   variables: {
 *      chatId: // value for 'chatId'
 *      last: // value for 'last'
 *      after: // value for 'after'
 *      first: // value for 'first'
 *      before: // value for 'before'
 *   },
 * });
 */
export function useGetChatMessagesQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetChatMessagesQuery,
    GetChatMessagesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetChatMessagesQuery, GetChatMessagesQueryVariables>(
    GetChatMessagesDocument,
    options
  );
}
export function useGetChatMessagesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetChatMessagesQuery,
    GetChatMessagesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetChatMessagesQuery,
    GetChatMessagesQueryVariables
  >(GetChatMessagesDocument, options);
}
export type GetChatMessagesQueryHookResult = ReturnType<
  typeof useGetChatMessagesQuery
>;
export type GetChatMessagesLazyQueryHookResult = ReturnType<
  typeof useGetChatMessagesLazyQuery
>;
export type GetChatMessagesQueryResult = Apollo.QueryResult<
  GetChatMessagesQuery,
  GetChatMessagesQueryVariables
>;
export const GetChatsDocument = gql`
  query GetChats {
    chats {
      id
      name
      description
      members {
        id
        ...NameParts
      }
    }
  }
  ${NamePartsFragmentDoc}
`;

/**
 * __useGetChatsQuery__
 *
 * To run a query within a React component, call `useGetChatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetChatsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetChatsQuery, GetChatsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetChatsQuery, GetChatsQueryVariables>(
    GetChatsDocument,
    options
  );
}
export function useGetChatsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetChatsQuery,
    GetChatsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetChatsQuery, GetChatsQueryVariables>(
    GetChatsDocument,
    options
  );
}
export type GetChatsQueryHookResult = ReturnType<typeof useGetChatsQuery>;
export type GetChatsLazyQueryHookResult = ReturnType<
  typeof useGetChatsLazyQuery
>;
export type GetChatsQueryResult = Apollo.QueryResult<
  GetChatsQuery,
  GetChatsQueryVariables
>;
export const GetFriendsDocument = gql`
  query GetFriends {
    friends {
      id
      ...NameParts
    }
  }
  ${NamePartsFragmentDoc}
`;

/**
 * __useGetFriendsQuery__
 *
 * To run a query within a React component, call `useGetFriendsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFriendsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFriendsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetFriendsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetFriendsQuery,
    GetFriendsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetFriendsQuery, GetFriendsQueryVariables>(
    GetFriendsDocument,
    options
  );
}
export function useGetFriendsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetFriendsQuery,
    GetFriendsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetFriendsQuery, GetFriendsQueryVariables>(
    GetFriendsDocument,
    options
  );
}
export type GetFriendsQueryHookResult = ReturnType<typeof useGetFriendsQuery>;
export type GetFriendsLazyQueryHookResult = ReturnType<
  typeof useGetFriendsLazyQuery
>;
export type GetFriendsQueryResult = Apollo.QueryResult<
  GetFriendsQuery,
  GetFriendsQueryVariables
>;
export const GetMeDocument = gql`
  query GetMe {
    me {
      id
      ...NameParts
      ...ReceivedFriendRequests
    }
  }
  ${NamePartsFragmentDoc}
  ${ReceivedFriendRequestsFragmentDoc}
`;

/**
 * __useGetMeQuery__
 *
 * To run a query within a React component, call `useGetMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMeQuery(
  baseOptions?: Apollo.QueryHookOptions<GetMeQuery, GetMeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetMeQuery, GetMeQueryVariables>(
    GetMeDocument,
    options
  );
}
export function useGetMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetMeQuery, GetMeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetMeQuery, GetMeQueryVariables>(
    GetMeDocument,
    options
  );
}
export type GetMeQueryHookResult = ReturnType<typeof useGetMeQuery>;
export type GetMeLazyQueryHookResult = ReturnType<typeof useGetMeLazyQuery>;
export type GetMeQueryResult = Apollo.QueryResult<
  GetMeQuery,
  GetMeQueryVariables
>;
export const GetUsersDocument = gql`
  query GetUsers($usernameFilter: String, $first: Int, $after: String) {
    users(usernameFilter: $usernameFilter, first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        cursor
        node {
          id
          ...NameParts
          friendStatus
        }
      }
    }
  }
  ${NamePartsFragmentDoc}
`;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *      usernameFilter: // value for 'usernameFilter'
 *      first: // value for 'first'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useGetUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(
    GetUsersDocument,
    options
  );
}
export function useGetUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUsersQuery,
    GetUsersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(
    GetUsersDocument,
    options
  );
}
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<
  typeof useGetUsersLazyQuery
>;
export type GetUsersQueryResult = Apollo.QueryResult<
  GetUsersQuery,
  GetUsersQueryVariables
>;
export const ChatUpdatedDocument = gql`
  subscription ChatUpdated($chatId: String!) {
    chatUpdated(chatId: $chatId) {
      chat {
        id
        name
        description
        members {
          id
        }
      }
      name
      description
      memberIdsAdded
      memberIdsRemoved
    }
  }
`;

/**
 * __useChatUpdatedSubscription__
 *
 * To run a query within a React component, call `useChatUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useChatUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatUpdatedSubscription({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useChatUpdatedSubscription(
  baseOptions: Apollo.SubscriptionHookOptions<
    ChatUpdatedSubscription,
    ChatUpdatedSubscriptionVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<
    ChatUpdatedSubscription,
    ChatUpdatedSubscriptionVariables
  >(ChatUpdatedDocument, options);
}
export type ChatUpdatedSubscriptionHookResult = ReturnType<
  typeof useChatUpdatedSubscription
>;
export type ChatUpdatedSubscriptionResult =
  Apollo.SubscriptionResult<ChatUpdatedSubscription>;
export const FriendRequestCreatedDocument = gql`
  subscription FriendRequestCreated {
    friendRequestCreated {
      id
      ...NameParts
    }
  }
  ${NamePartsFragmentDoc}
`;

/**
 * __useFriendRequestCreatedSubscription__
 *
 * To run a query within a React component, call `useFriendRequestCreatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useFriendRequestCreatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFriendRequestCreatedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useFriendRequestCreatedSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<
    FriendRequestCreatedSubscription,
    FriendRequestCreatedSubscriptionVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<
    FriendRequestCreatedSubscription,
    FriendRequestCreatedSubscriptionVariables
  >(FriendRequestCreatedDocument, options);
}
export type FriendRequestCreatedSubscriptionHookResult = ReturnType<
  typeof useFriendRequestCreatedSubscription
>;
export type FriendRequestCreatedSubscriptionResult =
  Apollo.SubscriptionResult<FriendRequestCreatedSubscription>;
export const MeChangedDocument = gql`
  subscription MeChanged {
    meChanged {
      id
      ...NameParts
      ...ReceivedFriendRequests
    }
  }
  ${NamePartsFragmentDoc}
  ${ReceivedFriendRequestsFragmentDoc}
`;

/**
 * __useMeChangedSubscription__
 *
 * To run a query within a React component, call `useMeChangedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMeChangedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeChangedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useMeChangedSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<
    MeChangedSubscription,
    MeChangedSubscriptionVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<
    MeChangedSubscription,
    MeChangedSubscriptionVariables
  >(MeChangedDocument, options);
}
export type MeChangedSubscriptionHookResult = ReturnType<
  typeof useMeChangedSubscription
>;
export type MeChangedSubscriptionResult =
  Apollo.SubscriptionResult<MeChangedSubscription>;
export const MessageCreatedDocument = gql`
  subscription MessageCreated($chatId: String!) {
    messageCreated(chatId: $chatId) {
      id
      content
      createdAt
      createdBy {
        id
        ...NameParts
      }
    }
  }
  ${NamePartsFragmentDoc}
`;

/**
 * __useMessageCreatedSubscription__
 *
 * To run a query within a React component, call `useMessageCreatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMessageCreatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessageCreatedSubscription({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useMessageCreatedSubscription(
  baseOptions: Apollo.SubscriptionHookOptions<
    MessageCreatedSubscription,
    MessageCreatedSubscriptionVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<
    MessageCreatedSubscription,
    MessageCreatedSubscriptionVariables
  >(MessageCreatedDocument, options);
}
export type MessageCreatedSubscriptionHookResult = ReturnType<
  typeof useMessageCreatedSubscription
>;
export type MessageCreatedSubscriptionResult =
  Apollo.SubscriptionResult<MessageCreatedSubscription>;
