import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date custom scalar type */
  Date: any;
};

export type Channel = {
  __typename?: 'Channel';
  createdAt: Scalars['Date'];
  createdBy: User;
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  isDM: Scalars['Boolean'];
  memberCount: Scalars['Int'];
  members: Array<User>;
  messages: MessageConnection;
  name: Scalars['String'];
  updatedAt: Scalars['Date'];
};


export type ChannelMessagesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export enum FriendStatus {
  Friend = 'FRIEND',
  NotFriend = 'NOT_FRIEND',
  RequestReceived = 'REQUEST_RECEIVED',
  RequestSent = 'REQUEST_SENT'
}

export type Message = {
  __typename?: 'Message';
  channel: Channel;
  content: Scalars['String'];
  createdAt: Scalars['Date'];
  createdBy: User;
  createdById: Scalars['String'];
  id: Scalars['String'];
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
  /** Add Members into Channel */
  addMembersToChannel?: Maybe<Channel>;
  /** Cancel/Delete a sent Friend Request */
  cancelFriendRequest?: Maybe<User>;
  /** Create a Channel */
  createChannel?: Maybe<Channel>;
  /** Create Direct Message Channel */
  createDM?: Maybe<Channel>;
  /** Create a Message in a Channel */
  createMessage?: Maybe<Message>;
  /** Delete/Decline a received Friend Request */
  declineFriendRequest?: Maybe<User>;
  /** Delete a Channel */
  deleteChannel?: Maybe<Scalars['Boolean']>;
  /** Delete a Friend */
  deleteFriend?: Maybe<User>;
  /** Delete a Message */
  deleteMessage?: Maybe<Message>;
  /** Edit a Message */
  editMessage?: Maybe<Message>;
  /** Remove Members from Channel */
  removeMembersFromChannel?: Maybe<Channel>;
  /** Send a Friend Request to a User */
  sendFriendRequest?: Maybe<User>;
  /** Update a Channel */
  updateChannel?: Maybe<Channel>;
  /** Update current User */
  updateUser?: Maybe<User>;
};


export type MutationAcceptFriendRequestArgs = {
  friendId: Scalars['String'];
};


export type MutationAddMembersToChannelArgs = {
  channelId: Scalars['String'];
  memberIds: Array<Scalars['String']>;
};


export type MutationCancelFriendRequestArgs = {
  friendId: Scalars['String'];
};


export type MutationCreateChannelArgs = {
  description?: InputMaybe<Scalars['String']>;
  isPrivate?: InputMaybe<Scalars['Boolean']>;
  memberIds?: InputMaybe<Array<Scalars['String']>>;
  name: Scalars['String'];
};


export type MutationCreateMessageArgs = {
  channelId: Scalars['String'];
  content: Scalars['String'];
};


export type MutationDeclineFriendRequestArgs = {
  friendId: Scalars['String'];
};


export type MutationDeleteChannelArgs = {
  channelId: Scalars['String'];
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


export type MutationRemoveMembersFromChannelArgs = {
  channelId: Scalars['String'];
  membersIds: Array<Scalars['String']>;
};


export type MutationSendFriendRequestArgs = {
  friendId: Scalars['String'];
};


export type MutationUpdateChannelArgs = {
  addMembersId?: InputMaybe<Array<Scalars['String']>>;
  channelId: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  isPrivate?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  removeMembersId?: InputMaybe<Array<Scalars['String']>>;
};


export type MutationUpdateUserArgs = {
  email: Scalars['String'];
  username: Scalars['String'];
};

export type NewMessagePayload = {
  __typename?: 'NewMessagePayload';
  channelId: Scalars['String'];
  message: Message;
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
  channel?: Maybe<Channel>;
  channelMessages: MessageConnection;
  channels: Array<Channel>;
  friends: Array<User>;
  me?: Maybe<User>;
  user?: Maybe<User>;
  /** Find users */
  users: UserConnection;
};


export type QueryChannelArgs = {
  channelId: Scalars['String'];
};


export type QueryChannelMessagesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  channelId: Scalars['String'];
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
  Desc = 'desc'
}

export type Subscription = {
  __typename?: 'Subscription';
  newFriend?: Maybe<User>;
  newFriendRequest?: Maybe<User>;
  newMessage?: Maybe<NewMessagePayload>;
};


export type SubscriptionNewFriendArgs = {
  userId: Scalars['String'];
};


export type SubscriptionNewMessageArgs = {
  channelId: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  channels: Array<Channel>;
  createdAt: Scalars['Date'];
  email: Scalars['String'];
  friendStatus: FriendStatus;
  friends: UserConnection;
  id: Scalars['String'];
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

export type AcceptFriendRequestMutationVariables = Exact<{
  friendId: Scalars['String'];
}>;


export type AcceptFriendRequestMutation = { __typename?: 'Mutation', acceptFriendRequest?: { __typename?: 'User', id: string, friendStatus: FriendStatus } | null };

export type CancelFriendRequestMutationVariables = Exact<{
  friendId: Scalars['String'];
}>;


export type CancelFriendRequestMutation = { __typename?: 'Mutation', cancelFriendRequest?: { __typename?: 'User', id: string, friendStatus: FriendStatus } | null };

export type CreateChannelMutationVariables = Exact<{
  name: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  isPrivate?: InputMaybe<Scalars['Boolean']>;
  memberIds?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
}>;


export type CreateChannelMutation = { __typename?: 'Mutation', createChannel?: { __typename?: 'Channel', id: string } | null };

export type CreateMessageMutationVariables = Exact<{
  channelId: Scalars['String'];
  content: Scalars['String'];
}>;


export type CreateMessageMutation = { __typename?: 'Mutation', createMessage?: { __typename?: 'Message', id: string, content: string, createdAt: any, createdBy: { __typename?: 'User', id: string, name?: string | null, username: string } } | null };

export type DeclineFriendRequestMutationVariables = Exact<{
  friendId: Scalars['String'];
}>;


export type DeclineFriendRequestMutation = { __typename?: 'Mutation', declineFriendRequest?: { __typename?: 'User', id: string, friendStatus: FriendStatus } | null };

export type DeleteFriendMutationVariables = Exact<{
  friendId: Scalars['String'];
}>;


export type DeleteFriendMutation = { __typename?: 'Mutation', deleteFriend?: { __typename?: 'User', id: string, friendStatus: FriendStatus } | null };

export type SendFriendRequestMutationVariables = Exact<{
  friendId: Scalars['String'];
}>;


export type SendFriendRequestMutation = { __typename?: 'Mutation', sendFriendRequest?: { __typename?: 'User', id: string, friendStatus: FriendStatus } | null };

export type GetChannelInfoQueryVariables = Exact<{
  channelId: Scalars['String'];
}>;


export type GetChannelInfoQuery = { __typename?: 'Query', channel?: { __typename?: 'Channel', id: string, name: string, createdAt: any, description?: string | null, createdBy: { __typename?: 'User', id: string, name?: string | null, username: string }, members: Array<{ __typename?: 'User', id: string, name?: string | null, username: string, friendStatus: FriendStatus }> } | null };

export type GetChannelMessagesQueryVariables = Exact<{
  channelId: Scalars['String'];
  last?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  before?: InputMaybe<Scalars['String']>;
}>;


export type GetChannelMessagesQuery = { __typename?: 'Query', channelMessages: { __typename?: 'MessageConnection', pageInfo: { __typename?: 'PageInfo', startCursor?: string | null, endCursor?: string | null, hasPreviousPage: boolean, hasNextPage: boolean }, edges?: Array<{ __typename?: 'MessageEdge', node?: { __typename?: 'Message', id: string, content: string, createdAt: any, createdBy: { __typename?: 'User', id: string, name?: string | null, username: string } } | null } | null> | null } };

export type GetChannelsForDisplayQueryVariables = Exact<{ [key: string]: never; }>;


export type GetChannelsForDisplayQuery = { __typename?: 'Query', channels: Array<{ __typename?: 'Channel', id: string, name: string, createdAt: any, updatedAt: any, isDM: boolean, members: Array<{ __typename?: 'User', username: string }> }> };

export type GetDataForHeaderQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDataForHeaderQuery = { __typename?: 'Query', me?: { __typename?: 'User', name?: string | null, username: string, receivedFriendRequests: Array<{ __typename?: 'User', id: string, name?: string | null, username: string, friendStatus: FriendStatus }> } | null };

export type GetFriendIdsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFriendIdsQuery = { __typename?: 'Query', friends: Array<{ __typename?: 'User', id: string }> };

export type GetFriendRequestIdsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFriendRequestIdsQuery = { __typename?: 'Query', me?: { __typename?: 'User', sentFriendRequests: Array<{ __typename?: 'User', id: string }>, receivedFriendRequests: Array<{ __typename?: 'User', id: string }> } | null };

export type GetFriendsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFriendsQuery = { __typename?: 'Query', friends: Array<{ __typename?: 'User', id: string, name?: string | null, username: string }> };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, name?: string | null, email: string, username: string } | null };

export type GetUsersQueryVariables = Exact<{
  usernameFilter?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
}>;


export type GetUsersQuery = { __typename?: 'Query', users: { __typename?: 'UserConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null }, edges?: Array<{ __typename?: 'UserEdge', cursor: string, node?: { __typename?: 'User', id: string, username: string, name?: string | null, friendStatus: FriendStatus } | null } | null> | null } };

export type RemoveMembersFromChannelMutationVariables = Exact<{
  channelId: Scalars['String'];
  membersIds: Array<Scalars['String']> | Scalars['String'];
}>;


export type RemoveMembersFromChannelMutation = { __typename?: 'Mutation', removeMembersFromChannel?: { __typename?: 'Channel', id: string, members: Array<{ __typename?: 'User', id: string }> } | null };

export type UpdateChannelMutationVariables = Exact<{
  channelId: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  isPrivate?: InputMaybe<Scalars['Boolean']>;
  addMembersId?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  removeMembersId?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
}>;


export type UpdateChannelMutation = { __typename?: 'Mutation', updateChannel?: { __typename?: 'Channel', id: string, name: string, description?: string | null, updatedAt: any, members: Array<{ __typename?: 'User', id: string }> } | null };

export type NewFriendRequestSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewFriendRequestSubscription = { __typename?: 'Subscription', newFriendRequest?: { __typename?: 'User', id: string, name?: string | null, email: string, username: string } | null };

export type GetNewMessagesSubscriptionVariables = Exact<{
  channelId: Scalars['String'];
}>;


export type GetNewMessagesSubscription = { __typename?: 'Subscription', newMessage?: { __typename?: 'NewMessagePayload', message: { __typename?: 'Message', id: string, content: string, createdAt: any, createdBy: { __typename?: 'User', id: string, name?: string | null, username: string } } } | null };


export const AcceptFriendRequestDocument = gql`
    mutation AcceptFriendRequest($friendId: String!) {
  acceptFriendRequest(friendId: $friendId) {
    id
    friendStatus
  }
}
    `;
export type AcceptFriendRequestMutationFn = Apollo.MutationFunction<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>;

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
export function useAcceptFriendRequestMutation(baseOptions?: Apollo.MutationHookOptions<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>(AcceptFriendRequestDocument, options);
      }
export type AcceptFriendRequestMutationHookResult = ReturnType<typeof useAcceptFriendRequestMutation>;
export type AcceptFriendRequestMutationResult = Apollo.MutationResult<AcceptFriendRequestMutation>;
export type AcceptFriendRequestMutationOptions = Apollo.BaseMutationOptions<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>;
export const CancelFriendRequestDocument = gql`
    mutation CancelFriendRequest($friendId: String!) {
  cancelFriendRequest(friendId: $friendId) {
    id
    friendStatus
  }
}
    `;
export type CancelFriendRequestMutationFn = Apollo.MutationFunction<CancelFriendRequestMutation, CancelFriendRequestMutationVariables>;

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
export function useCancelFriendRequestMutation(baseOptions?: Apollo.MutationHookOptions<CancelFriendRequestMutation, CancelFriendRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelFriendRequestMutation, CancelFriendRequestMutationVariables>(CancelFriendRequestDocument, options);
      }
export type CancelFriendRequestMutationHookResult = ReturnType<typeof useCancelFriendRequestMutation>;
export type CancelFriendRequestMutationResult = Apollo.MutationResult<CancelFriendRequestMutation>;
export type CancelFriendRequestMutationOptions = Apollo.BaseMutationOptions<CancelFriendRequestMutation, CancelFriendRequestMutationVariables>;
export const CreateChannelDocument = gql`
    mutation CreateChannel($name: String!, $description: String, $isPrivate: Boolean, $memberIds: [String!]) {
  createChannel(
    name: $name
    description: $description
    isPrivate: $isPrivate
    memberIds: $memberIds
  ) {
    id
  }
}
    `;
export type CreateChannelMutationFn = Apollo.MutationFunction<CreateChannelMutation, CreateChannelMutationVariables>;

/**
 * __useCreateChannelMutation__
 *
 * To run a mutation, you first call `useCreateChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChannelMutation, { data, loading, error }] = useCreateChannelMutation({
 *   variables: {
 *      name: // value for 'name'
 *      description: // value for 'description'
 *      isPrivate: // value for 'isPrivate'
 *      memberIds: // value for 'memberIds'
 *   },
 * });
 */
export function useCreateChannelMutation(baseOptions?: Apollo.MutationHookOptions<CreateChannelMutation, CreateChannelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateChannelMutation, CreateChannelMutationVariables>(CreateChannelDocument, options);
      }
export type CreateChannelMutationHookResult = ReturnType<typeof useCreateChannelMutation>;
export type CreateChannelMutationResult = Apollo.MutationResult<CreateChannelMutation>;
export type CreateChannelMutationOptions = Apollo.BaseMutationOptions<CreateChannelMutation, CreateChannelMutationVariables>;
export const CreateMessageDocument = gql`
    mutation CreateMessage($channelId: String!, $content: String!) {
  createMessage(channelId: $channelId, content: $content) {
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
export type CreateMessageMutationFn = Apollo.MutationFunction<CreateMessageMutation, CreateMessageMutationVariables>;

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
 *      channelId: // value for 'channelId'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useCreateMessageMutation(baseOptions?: Apollo.MutationHookOptions<CreateMessageMutation, CreateMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMessageMutation, CreateMessageMutationVariables>(CreateMessageDocument, options);
      }
export type CreateMessageMutationHookResult = ReturnType<typeof useCreateMessageMutation>;
export type CreateMessageMutationResult = Apollo.MutationResult<CreateMessageMutation>;
export type CreateMessageMutationOptions = Apollo.BaseMutationOptions<CreateMessageMutation, CreateMessageMutationVariables>;
export const DeclineFriendRequestDocument = gql`
    mutation DeclineFriendRequest($friendId: String!) {
  declineFriendRequest(friendId: $friendId) {
    id
    friendStatus
  }
}
    `;
export type DeclineFriendRequestMutationFn = Apollo.MutationFunction<DeclineFriendRequestMutation, DeclineFriendRequestMutationVariables>;

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
export function useDeclineFriendRequestMutation(baseOptions?: Apollo.MutationHookOptions<DeclineFriendRequestMutation, DeclineFriendRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeclineFriendRequestMutation, DeclineFriendRequestMutationVariables>(DeclineFriendRequestDocument, options);
      }
export type DeclineFriendRequestMutationHookResult = ReturnType<typeof useDeclineFriendRequestMutation>;
export type DeclineFriendRequestMutationResult = Apollo.MutationResult<DeclineFriendRequestMutation>;
export type DeclineFriendRequestMutationOptions = Apollo.BaseMutationOptions<DeclineFriendRequestMutation, DeclineFriendRequestMutationVariables>;
export const DeleteFriendDocument = gql`
    mutation DeleteFriend($friendId: String!) {
  deleteFriend(friendId: $friendId) {
    id
    friendStatus
  }
}
    `;
export type DeleteFriendMutationFn = Apollo.MutationFunction<DeleteFriendMutation, DeleteFriendMutationVariables>;

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
export function useDeleteFriendMutation(baseOptions?: Apollo.MutationHookOptions<DeleteFriendMutation, DeleteFriendMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteFriendMutation, DeleteFriendMutationVariables>(DeleteFriendDocument, options);
      }
export type DeleteFriendMutationHookResult = ReturnType<typeof useDeleteFriendMutation>;
export type DeleteFriendMutationResult = Apollo.MutationResult<DeleteFriendMutation>;
export type DeleteFriendMutationOptions = Apollo.BaseMutationOptions<DeleteFriendMutation, DeleteFriendMutationVariables>;
export const SendFriendRequestDocument = gql`
    mutation SendFriendRequest($friendId: String!) {
  sendFriendRequest(friendId: $friendId) {
    id
    friendStatus
  }
}
    `;
export type SendFriendRequestMutationFn = Apollo.MutationFunction<SendFriendRequestMutation, SendFriendRequestMutationVariables>;

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
export function useSendFriendRequestMutation(baseOptions?: Apollo.MutationHookOptions<SendFriendRequestMutation, SendFriendRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendFriendRequestMutation, SendFriendRequestMutationVariables>(SendFriendRequestDocument, options);
      }
export type SendFriendRequestMutationHookResult = ReturnType<typeof useSendFriendRequestMutation>;
export type SendFriendRequestMutationResult = Apollo.MutationResult<SendFriendRequestMutation>;
export type SendFriendRequestMutationOptions = Apollo.BaseMutationOptions<SendFriendRequestMutation, SendFriendRequestMutationVariables>;
export const GetChannelInfoDocument = gql`
    query GetChannelInfo($channelId: String!) {
  channel(channelId: $channelId) {
    id
    name
    createdAt
    description
    createdBy {
      id
      name
      username
    }
    members {
      id
      name
      username
      friendStatus
    }
  }
}
    `;

/**
 * __useGetChannelInfoQuery__
 *
 * To run a query within a React component, call `useGetChannelInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChannelInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChannelInfoQuery({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useGetChannelInfoQuery(baseOptions: Apollo.QueryHookOptions<GetChannelInfoQuery, GetChannelInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetChannelInfoQuery, GetChannelInfoQueryVariables>(GetChannelInfoDocument, options);
      }
export function useGetChannelInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChannelInfoQuery, GetChannelInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetChannelInfoQuery, GetChannelInfoQueryVariables>(GetChannelInfoDocument, options);
        }
export type GetChannelInfoQueryHookResult = ReturnType<typeof useGetChannelInfoQuery>;
export type GetChannelInfoLazyQueryHookResult = ReturnType<typeof useGetChannelInfoLazyQuery>;
export type GetChannelInfoQueryResult = Apollo.QueryResult<GetChannelInfoQuery, GetChannelInfoQueryVariables>;
export const GetChannelMessagesDocument = gql`
    query GetChannelMessages($channelId: String!, $last: Int, $after: String, $first: Int, $before: String) {
  channelMessages(
    channelId: $channelId
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
          name
          username
        }
      }
    }
  }
}
    `;

/**
 * __useGetChannelMessagesQuery__
 *
 * To run a query within a React component, call `useGetChannelMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChannelMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChannelMessagesQuery({
 *   variables: {
 *      channelId: // value for 'channelId'
 *      last: // value for 'last'
 *      after: // value for 'after'
 *      first: // value for 'first'
 *      before: // value for 'before'
 *   },
 * });
 */
export function useGetChannelMessagesQuery(baseOptions: Apollo.QueryHookOptions<GetChannelMessagesQuery, GetChannelMessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetChannelMessagesQuery, GetChannelMessagesQueryVariables>(GetChannelMessagesDocument, options);
      }
export function useGetChannelMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChannelMessagesQuery, GetChannelMessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetChannelMessagesQuery, GetChannelMessagesQueryVariables>(GetChannelMessagesDocument, options);
        }
export type GetChannelMessagesQueryHookResult = ReturnType<typeof useGetChannelMessagesQuery>;
export type GetChannelMessagesLazyQueryHookResult = ReturnType<typeof useGetChannelMessagesLazyQuery>;
export type GetChannelMessagesQueryResult = Apollo.QueryResult<GetChannelMessagesQuery, GetChannelMessagesQueryVariables>;
export const GetChannelsForDisplayDocument = gql`
    query GetChannelsForDisplay {
  channels {
    id
    name
    createdAt
    updatedAt
    isDM
    members {
      username
    }
  }
}
    `;

/**
 * __useGetChannelsForDisplayQuery__
 *
 * To run a query within a React component, call `useGetChannelsForDisplayQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChannelsForDisplayQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChannelsForDisplayQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetChannelsForDisplayQuery(baseOptions?: Apollo.QueryHookOptions<GetChannelsForDisplayQuery, GetChannelsForDisplayQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetChannelsForDisplayQuery, GetChannelsForDisplayQueryVariables>(GetChannelsForDisplayDocument, options);
      }
export function useGetChannelsForDisplayLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChannelsForDisplayQuery, GetChannelsForDisplayQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetChannelsForDisplayQuery, GetChannelsForDisplayQueryVariables>(GetChannelsForDisplayDocument, options);
        }
export type GetChannelsForDisplayQueryHookResult = ReturnType<typeof useGetChannelsForDisplayQuery>;
export type GetChannelsForDisplayLazyQueryHookResult = ReturnType<typeof useGetChannelsForDisplayLazyQuery>;
export type GetChannelsForDisplayQueryResult = Apollo.QueryResult<GetChannelsForDisplayQuery, GetChannelsForDisplayQueryVariables>;
export const GetDataForHeaderDocument = gql`
    query GetDataForHeader {
  me {
    name
    username
    receivedFriendRequests {
      id
      name
      username
      friendStatus
    }
  }
}
    `;

/**
 * __useGetDataForHeaderQuery__
 *
 * To run a query within a React component, call `useGetDataForHeaderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDataForHeaderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDataForHeaderQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDataForHeaderQuery(baseOptions?: Apollo.QueryHookOptions<GetDataForHeaderQuery, GetDataForHeaderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDataForHeaderQuery, GetDataForHeaderQueryVariables>(GetDataForHeaderDocument, options);
      }
export function useGetDataForHeaderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDataForHeaderQuery, GetDataForHeaderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDataForHeaderQuery, GetDataForHeaderQueryVariables>(GetDataForHeaderDocument, options);
        }
export type GetDataForHeaderQueryHookResult = ReturnType<typeof useGetDataForHeaderQuery>;
export type GetDataForHeaderLazyQueryHookResult = ReturnType<typeof useGetDataForHeaderLazyQuery>;
export type GetDataForHeaderQueryResult = Apollo.QueryResult<GetDataForHeaderQuery, GetDataForHeaderQueryVariables>;
export const GetFriendIdsDocument = gql`
    query GetFriendIds {
  friends {
    id
  }
}
    `;

/**
 * __useGetFriendIdsQuery__
 *
 * To run a query within a React component, call `useGetFriendIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFriendIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFriendIdsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetFriendIdsQuery(baseOptions?: Apollo.QueryHookOptions<GetFriendIdsQuery, GetFriendIdsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFriendIdsQuery, GetFriendIdsQueryVariables>(GetFriendIdsDocument, options);
      }
export function useGetFriendIdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFriendIdsQuery, GetFriendIdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFriendIdsQuery, GetFriendIdsQueryVariables>(GetFriendIdsDocument, options);
        }
export type GetFriendIdsQueryHookResult = ReturnType<typeof useGetFriendIdsQuery>;
export type GetFriendIdsLazyQueryHookResult = ReturnType<typeof useGetFriendIdsLazyQuery>;
export type GetFriendIdsQueryResult = Apollo.QueryResult<GetFriendIdsQuery, GetFriendIdsQueryVariables>;
export const GetFriendRequestIdsDocument = gql`
    query GetFriendRequestIds {
  me {
    sentFriendRequests {
      id
    }
    receivedFriendRequests {
      id
    }
  }
}
    `;

/**
 * __useGetFriendRequestIdsQuery__
 *
 * To run a query within a React component, call `useGetFriendRequestIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFriendRequestIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFriendRequestIdsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetFriendRequestIdsQuery(baseOptions?: Apollo.QueryHookOptions<GetFriendRequestIdsQuery, GetFriendRequestIdsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFriendRequestIdsQuery, GetFriendRequestIdsQueryVariables>(GetFriendRequestIdsDocument, options);
      }
export function useGetFriendRequestIdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFriendRequestIdsQuery, GetFriendRequestIdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFriendRequestIdsQuery, GetFriendRequestIdsQueryVariables>(GetFriendRequestIdsDocument, options);
        }
export type GetFriendRequestIdsQueryHookResult = ReturnType<typeof useGetFriendRequestIdsQuery>;
export type GetFriendRequestIdsLazyQueryHookResult = ReturnType<typeof useGetFriendRequestIdsLazyQuery>;
export type GetFriendRequestIdsQueryResult = Apollo.QueryResult<GetFriendRequestIdsQuery, GetFriendRequestIdsQueryVariables>;
export const GetFriendsDocument = gql`
    query GetFriends {
  friends {
    id
    name
    username
  }
}
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
export function useGetFriendsQuery(baseOptions?: Apollo.QueryHookOptions<GetFriendsQuery, GetFriendsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFriendsQuery, GetFriendsQueryVariables>(GetFriendsDocument, options);
      }
export function useGetFriendsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFriendsQuery, GetFriendsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFriendsQuery, GetFriendsQueryVariables>(GetFriendsDocument, options);
        }
export type GetFriendsQueryHookResult = ReturnType<typeof useGetFriendsQuery>;
export type GetFriendsLazyQueryHookResult = ReturnType<typeof useGetFriendsLazyQuery>;
export type GetFriendsQueryResult = Apollo.QueryResult<GetFriendsQuery, GetFriendsQueryVariables>;
export const GetMeDocument = gql`
    query GetMe {
  me {
    id
    name
    email
    username
  }
}
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
export function useGetMeQuery(baseOptions?: Apollo.QueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
      }
export function useGetMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
        }
export type GetMeQueryHookResult = ReturnType<typeof useGetMeQuery>;
export type GetMeLazyQueryHookResult = ReturnType<typeof useGetMeLazyQuery>;
export type GetMeQueryResult = Apollo.QueryResult<GetMeQuery, GetMeQueryVariables>;
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
        username
        name
        friendStatus
      }
    }
  }
}
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
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export const RemoveMembersFromChannelDocument = gql`
    mutation RemoveMembersFromChannel($channelId: String!, $membersIds: [String!]!) {
  removeMembersFromChannel(channelId: $channelId, membersIds: $membersIds) {
    id
    members {
      id
    }
  }
}
    `;
export type RemoveMembersFromChannelMutationFn = Apollo.MutationFunction<RemoveMembersFromChannelMutation, RemoveMembersFromChannelMutationVariables>;

/**
 * __useRemoveMembersFromChannelMutation__
 *
 * To run a mutation, you first call `useRemoveMembersFromChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveMembersFromChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeMembersFromChannelMutation, { data, loading, error }] = useRemoveMembersFromChannelMutation({
 *   variables: {
 *      channelId: // value for 'channelId'
 *      membersIds: // value for 'membersIds'
 *   },
 * });
 */
export function useRemoveMembersFromChannelMutation(baseOptions?: Apollo.MutationHookOptions<RemoveMembersFromChannelMutation, RemoveMembersFromChannelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveMembersFromChannelMutation, RemoveMembersFromChannelMutationVariables>(RemoveMembersFromChannelDocument, options);
      }
export type RemoveMembersFromChannelMutationHookResult = ReturnType<typeof useRemoveMembersFromChannelMutation>;
export type RemoveMembersFromChannelMutationResult = Apollo.MutationResult<RemoveMembersFromChannelMutation>;
export type RemoveMembersFromChannelMutationOptions = Apollo.BaseMutationOptions<RemoveMembersFromChannelMutation, RemoveMembersFromChannelMutationVariables>;
export const UpdateChannelDocument = gql`
    mutation UpdateChannel($channelId: String!, $name: String, $description: String, $isPrivate: Boolean, $addMembersId: [String!], $removeMembersId: [String!]) {
  updateChannel(
    channelId: $channelId
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
export type UpdateChannelMutationFn = Apollo.MutationFunction<UpdateChannelMutation, UpdateChannelMutationVariables>;

/**
 * __useUpdateChannelMutation__
 *
 * To run a mutation, you first call `useUpdateChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateChannelMutation, { data, loading, error }] = useUpdateChannelMutation({
 *   variables: {
 *      channelId: // value for 'channelId'
 *      name: // value for 'name'
 *      description: // value for 'description'
 *      isPrivate: // value for 'isPrivate'
 *      addMembersId: // value for 'addMembersId'
 *      removeMembersId: // value for 'removeMembersId'
 *   },
 * });
 */
export function useUpdateChannelMutation(baseOptions?: Apollo.MutationHookOptions<UpdateChannelMutation, UpdateChannelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateChannelMutation, UpdateChannelMutationVariables>(UpdateChannelDocument, options);
      }
export type UpdateChannelMutationHookResult = ReturnType<typeof useUpdateChannelMutation>;
export type UpdateChannelMutationResult = Apollo.MutationResult<UpdateChannelMutation>;
export type UpdateChannelMutationOptions = Apollo.BaseMutationOptions<UpdateChannelMutation, UpdateChannelMutationVariables>;
export const NewFriendRequestDocument = gql`
    subscription NewFriendRequest {
  newFriendRequest {
    id
    name
    email
    username
  }
}
    `;

/**
 * __useNewFriendRequestSubscription__
 *
 * To run a query within a React component, call `useNewFriendRequestSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewFriendRequestSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewFriendRequestSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNewFriendRequestSubscription(baseOptions?: Apollo.SubscriptionHookOptions<NewFriendRequestSubscription, NewFriendRequestSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NewFriendRequestSubscription, NewFriendRequestSubscriptionVariables>(NewFriendRequestDocument, options);
      }
export type NewFriendRequestSubscriptionHookResult = ReturnType<typeof useNewFriendRequestSubscription>;
export type NewFriendRequestSubscriptionResult = Apollo.SubscriptionResult<NewFriendRequestSubscription>;
export const GetNewMessagesDocument = gql`
    subscription GetNewMessages($channelId: String!) {
  newMessage(channelId: $channelId) {
    message {
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
}
    `;

/**
 * __useGetNewMessagesSubscription__
 *
 * To run a query within a React component, call `useGetNewMessagesSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGetNewMessagesSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNewMessagesSubscription({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useGetNewMessagesSubscription(baseOptions: Apollo.SubscriptionHookOptions<GetNewMessagesSubscription, GetNewMessagesSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<GetNewMessagesSubscription, GetNewMessagesSubscriptionVariables>(GetNewMessagesDocument, options);
      }
export type GetNewMessagesSubscriptionHookResult = ReturnType<typeof useGetNewMessagesSubscription>;
export type GetNewMessagesSubscriptionResult = Apollo.SubscriptionResult<GetNewMessagesSubscription>;