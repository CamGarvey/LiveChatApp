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
  id: Scalars['Int'];
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

export type Message = {
  __typename?: 'Message';
  channel: Channel;
  content: Scalars['String'];
  createdAt: Scalars['Date'];
  createdBy: User;
  createdById: Scalars['Int'];
  id: Scalars['Int'];
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
  acceptFriendRequest?: Maybe<Scalars['Boolean']>;
  /** Add Members into Channel */
  addMembersToChannel?: Maybe<Channel>;
  /** Create a Channel */
  createChannel?: Maybe<Channel>;
  /** Create Direct Message Channel */
  createDM?: Maybe<Channel>;
  /** Create a Message in a Channel */
  createMessage?: Maybe<Message>;
  /** Delete a Channel */
  deleteChannel?: Maybe<Scalars['Boolean']>;
  /** Delete a Friend */
  deleteFriend?: Maybe<Scalars['Boolean']>;
  /** Delete a received Friend Request */
  deleteFriendRequest?: Maybe<Scalars['Boolean']>;
  /** Delete a Message */
  deleteMessage?: Maybe<Message>;
  /** Edit a Message */
  editMessage?: Maybe<Message>;
  /** Remove Members from Channel */
  removeMembersFromChannel?: Maybe<Channel>;
  /** Send a Friend Request to a User */
  sendFriendRequest?: Maybe<Scalars['Boolean']>;
  /** Update a Channel */
  updateChannel?: Maybe<Channel>;
  /** Update current User */
  updateUser?: Maybe<User>;
};


export type MutationAcceptFriendRequestArgs = {
  friendId: Scalars['Int'];
};


export type MutationAddMembersToChannelArgs = {
  channelId: Scalars['Int'];
  memberIds: Array<Scalars['Int']>;
};


export type MutationCreateChannelArgs = {
  description?: InputMaybe<Scalars['String']>;
  isPrivate?: InputMaybe<Scalars['Boolean']>;
  memberIds?: InputMaybe<Array<Scalars['Int']>>;
  name: Scalars['String'];
};


export type MutationCreateMessageArgs = {
  channelId: Scalars['Int'];
  content: Scalars['String'];
};


export type MutationDeleteChannelArgs = {
  channelId: Scalars['Int'];
};


export type MutationDeleteFriendArgs = {
  friendId: Scalars['Int'];
};


export type MutationDeleteFriendRequestArgs = {
  friendId: Scalars['Int'];
};


export type MutationDeleteMessageArgs = {
  messageId: Scalars['Int'];
};


export type MutationEditMessageArgs = {
  content: Scalars['String'];
  messageId: Scalars['Int'];
};


export type MutationRemoveMembersFromChannelArgs = {
  channelId: Scalars['Int'];
  membersIds: Array<Scalars['Int']>;
};


export type MutationSendFriendRequestArgs = {
  friendId: Scalars['Int'];
};


export type MutationUpdateChannelArgs = {
  channelId: Scalars['Int'];
  isPrivate?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateUserArgs = {
  email: Scalars['String'];
  username: Scalars['String'];
};

export type NewMessagePayload = {
  __typename?: 'NewMessagePayload';
  channelId: Scalars['Int'];
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
  channelId: Scalars['Int'];
};


export type QueryChannelMessagesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  channelId: Scalars['Int'];
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryUserArgs = {
  id: Scalars['Int'];
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
  userId: Scalars['Int'];
};


export type SubscriptionNewMessageArgs = {
  channelId: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  channels: Array<Channel>;
  createdAt: Scalars['Date'];
  email: Scalars['String'];
  friends: UserConnection;
  id: Scalars['Int'];
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

export type CreateChannelMutationVariables = Exact<{
  name: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  isPrivate?: InputMaybe<Scalars['Boolean']>;
  memberIds?: InputMaybe<Array<Scalars['Int']> | Scalars['Int']>;
}>;


export type CreateChannelMutation = { __typename?: 'Mutation', createChannel?: { __typename?: 'Channel', id: number } | null };

export type CreateMessageMutationVariables = Exact<{
  channelId: Scalars['Int'];
  content: Scalars['String'];
}>;


export type CreateMessageMutation = { __typename?: 'Mutation', createMessage?: { __typename?: 'Message', id: number, content: string, createdAt: any, createdBy: { __typename?: 'User', id: number, name?: string | null, username: string } } | null };

export type GetChannelInfoForSidebarQueryVariables = Exact<{
  channelId: Scalars['Int'];
}>;


export type GetChannelInfoForSidebarQuery = { __typename?: 'Query', channel?: { __typename?: 'Channel', id: number, name: string, createdAt: any, createdBy: { __typename?: 'User', id: number, name?: string | null, username: string }, members: Array<{ __typename?: 'User', id: number, name?: string | null, username: string }> } | null };

export type GetChannelMessagesQueryVariables = Exact<{
  channelId: Scalars['Int'];
  last?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  before?: InputMaybe<Scalars['String']>;
}>;


export type GetChannelMessagesQuery = { __typename?: 'Query', channelMessages: { __typename?: 'MessageConnection', pageInfo: { __typename?: 'PageInfo', startCursor?: string | null, endCursor?: string | null, hasPreviousPage: boolean, hasNextPage: boolean }, edges?: Array<{ __typename?: 'MessageEdge', cursor: string, node?: { __typename?: 'Message', id: number, content: string, createdAt: any, createdBy: { __typename?: 'User', id: number, name?: string | null, username: string } } | null } | null> | null } };

export type GetChannelsForNavQueryVariables = Exact<{ [key: string]: never; }>;


export type GetChannelsForNavQuery = { __typename?: 'Query', channels: Array<{ __typename?: 'Channel', id: number, name: string, createdAt: any, updatedAt: any, isDM: boolean, memberCount: number }> };

export type GetFriendIdsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFriendIdsQuery = { __typename?: 'Query', friends: Array<{ __typename?: 'User', id: number }> };

export type GetFriendRequestIdsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFriendRequestIdsQuery = { __typename?: 'Query', me?: { __typename?: 'User', sentFriendRequests: Array<{ __typename?: 'User', id: number }>, receivedFriendRequests: Array<{ __typename?: 'User', id: number }> } | null };

export type GetFriendsForSearchQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFriendsForSearchQuery = { __typename?: 'Query', friends: Array<{ __typename?: 'User', id: number, name?: string | null, email: string, username: string }> };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, name?: string | null, email: string, username: string } | null };

export type GetUsersQueryVariables = Exact<{
  usernameFilter?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
}>;


export type GetUsersQuery = { __typename?: 'Query', users: { __typename?: 'UserConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null }, edges?: Array<{ __typename?: 'UserEdge', cursor: string, node?: { __typename?: 'User', id: number, name?: string | null } | null } | null> | null } };

export type GetNewMessagesSubscriptionVariables = Exact<{
  channelId: Scalars['Int'];
}>;


export type GetNewMessagesSubscription = { __typename?: 'Subscription', newMessage?: { __typename?: 'NewMessagePayload', message: { __typename?: 'Message', id: number, content: string, createdAt: any, createdBy: { __typename?: 'User', id: number, name?: string | null, username: string } } } | null };


export const CreateChannelDocument = gql`
    mutation CreateChannel($name: String!, $description: String, $isPrivate: Boolean, $memberIds: [Int!]) {
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
    mutation CreateMessage($channelId: Int!, $content: String!) {
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
export const GetChannelInfoForSidebarDocument = gql`
    query GetChannelInfoForSidebar($channelId: Int!) {
  channel(channelId: $channelId) {
    id
    name
    createdBy {
      id
      name
      username
    }
    createdAt
    members {
      id
      name
      username
    }
  }
}
    `;

/**
 * __useGetChannelInfoForSidebarQuery__
 *
 * To run a query within a React component, call `useGetChannelInfoForSidebarQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChannelInfoForSidebarQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChannelInfoForSidebarQuery({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useGetChannelInfoForSidebarQuery(baseOptions: Apollo.QueryHookOptions<GetChannelInfoForSidebarQuery, GetChannelInfoForSidebarQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetChannelInfoForSidebarQuery, GetChannelInfoForSidebarQueryVariables>(GetChannelInfoForSidebarDocument, options);
      }
export function useGetChannelInfoForSidebarLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChannelInfoForSidebarQuery, GetChannelInfoForSidebarQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetChannelInfoForSidebarQuery, GetChannelInfoForSidebarQueryVariables>(GetChannelInfoForSidebarDocument, options);
        }
export type GetChannelInfoForSidebarQueryHookResult = ReturnType<typeof useGetChannelInfoForSidebarQuery>;
export type GetChannelInfoForSidebarLazyQueryHookResult = ReturnType<typeof useGetChannelInfoForSidebarLazyQuery>;
export type GetChannelInfoForSidebarQueryResult = Apollo.QueryResult<GetChannelInfoForSidebarQuery, GetChannelInfoForSidebarQueryVariables>;
export const GetChannelMessagesDocument = gql`
    query GetChannelMessages($channelId: Int!, $last: Int, $after: String, $first: Int, $before: String) {
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
      cursor
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
export const GetChannelsForNavDocument = gql`
    query GetChannelsForNav {
  channels {
    id
    name
    createdAt
    updatedAt
    isDM
    memberCount
  }
}
    `;

/**
 * __useGetChannelsForNavQuery__
 *
 * To run a query within a React component, call `useGetChannelsForNavQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChannelsForNavQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChannelsForNavQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetChannelsForNavQuery(baseOptions?: Apollo.QueryHookOptions<GetChannelsForNavQuery, GetChannelsForNavQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetChannelsForNavQuery, GetChannelsForNavQueryVariables>(GetChannelsForNavDocument, options);
      }
export function useGetChannelsForNavLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChannelsForNavQuery, GetChannelsForNavQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetChannelsForNavQuery, GetChannelsForNavQueryVariables>(GetChannelsForNavDocument, options);
        }
export type GetChannelsForNavQueryHookResult = ReturnType<typeof useGetChannelsForNavQuery>;
export type GetChannelsForNavLazyQueryHookResult = ReturnType<typeof useGetChannelsForNavLazyQuery>;
export type GetChannelsForNavQueryResult = Apollo.QueryResult<GetChannelsForNavQuery, GetChannelsForNavQueryVariables>;
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
export const GetFriendsForSearchDocument = gql`
    query GetFriendsForSearch {
  friends {
    id
    name
    email
    username
  }
}
    `;

/**
 * __useGetFriendsForSearchQuery__
 *
 * To run a query within a React component, call `useGetFriendsForSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFriendsForSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFriendsForSearchQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetFriendsForSearchQuery(baseOptions?: Apollo.QueryHookOptions<GetFriendsForSearchQuery, GetFriendsForSearchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFriendsForSearchQuery, GetFriendsForSearchQueryVariables>(GetFriendsForSearchDocument, options);
      }
export function useGetFriendsForSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFriendsForSearchQuery, GetFriendsForSearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFriendsForSearchQuery, GetFriendsForSearchQueryVariables>(GetFriendsForSearchDocument, options);
        }
export type GetFriendsForSearchQueryHookResult = ReturnType<typeof useGetFriendsForSearchQuery>;
export type GetFriendsForSearchLazyQueryHookResult = ReturnType<typeof useGetFriendsForSearchLazyQuery>;
export type GetFriendsForSearchQueryResult = Apollo.QueryResult<GetFriendsForSearchQuery, GetFriendsForSearchQueryVariables>;
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
        name
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
export const GetNewMessagesDocument = gql`
    subscription GetNewMessages($channelId: Int!) {
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