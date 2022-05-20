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
  /** Date custom scalar type */
  Date: any;
};

export type Channel = {
  __typename?: 'Channel';
  createBy: User;
  createdAt: Scalars['Date'];
  id: Scalars['Int'];
  isDM: Scalars['Boolean'];
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
  channelMessages: MessageConnection;
  channels: Array<Channel>;
  friends: Array<User>;
  me?: Maybe<User>;
  user?: Maybe<User>;
  /** Find users */
  users: UserConnection;
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
  Desc = 'desc',
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
  name: Scalars['String'];
  receivedFriendRequests: Array<User>;
  sentFriendRequests: Array<User>;
  updatedAt: Scalars['Date'];
  username?: Maybe<Scalars['String']>;
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

export type GetChannelsForSidebarQueryVariables = Exact<{
  [key: string]: never;
}>;

export type GetChannelsForSidebarQuery = {
  __typename?: 'Query';
  channels: Array<{
    __typename?: 'Channel';
    id: number;
    name: string;
    createdAt: any;
    updatedAt: any;
    isDM: boolean;
  }>;
};

export type GetFriendIdsQueryVariables = Exact<{ [key: string]: never }>;

export type GetFriendIdsQuery = {
  __typename?: 'Query';
  friends: Array<{ __typename?: 'User'; id: number }>;
};

export type GetFriendRequestIdsQueryVariables = Exact<{ [key: string]: never }>;

export type GetFriendRequestIdsQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    sentFriendRequests: Array<{ __typename?: 'User'; id: number }>;
    receivedFriendRequests: Array<{ __typename?: 'User'; id: number }>;
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
      node?: { __typename?: 'User'; id: number; name: string } | null;
    } | null> | null;
  };
};

export const GetChannelsForSidebarDocument = gql`
  query GetChannelsForSidebar {
    channels {
      id
      name
      createdAt
      updatedAt
      isDM
    }
  }
`;

/**
 * __useGetChannelsForSidebarQuery__
 *
 * To run a query within a React component, call `useGetChannelsForSidebarQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChannelsForSidebarQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChannelsForSidebarQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetChannelsForSidebarQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetChannelsForSidebarQuery,
    GetChannelsForSidebarQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetChannelsForSidebarQuery,
    GetChannelsForSidebarQueryVariables
  >(GetChannelsForSidebarDocument, options);
}
export function useGetChannelsForSidebarLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetChannelsForSidebarQuery,
    GetChannelsForSidebarQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetChannelsForSidebarQuery,
    GetChannelsForSidebarQueryVariables
  >(GetChannelsForSidebarDocument, options);
}
export type GetChannelsForSidebarQueryHookResult = ReturnType<
  typeof useGetChannelsForSidebarQuery
>;
export type GetChannelsForSidebarLazyQueryHookResult = ReturnType<
  typeof useGetChannelsForSidebarLazyQuery
>;
export type GetChannelsForSidebarQueryResult = Apollo.QueryResult<
  GetChannelsForSidebarQuery,
  GetChannelsForSidebarQueryVariables
>;
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
export function useGetFriendIdsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetFriendIdsQuery,
    GetFriendIdsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetFriendIdsQuery, GetFriendIdsQueryVariables>(
    GetFriendIdsDocument,
    options
  );
}
export function useGetFriendIdsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetFriendIdsQuery,
    GetFriendIdsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetFriendIdsQuery, GetFriendIdsQueryVariables>(
    GetFriendIdsDocument,
    options
  );
}
export type GetFriendIdsQueryHookResult = ReturnType<
  typeof useGetFriendIdsQuery
>;
export type GetFriendIdsLazyQueryHookResult = ReturnType<
  typeof useGetFriendIdsLazyQuery
>;
export type GetFriendIdsQueryResult = Apollo.QueryResult<
  GetFriendIdsQuery,
  GetFriendIdsQueryVariables
>;
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
export function useGetFriendRequestIdsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetFriendRequestIdsQuery,
    GetFriendRequestIdsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetFriendRequestIdsQuery,
    GetFriendRequestIdsQueryVariables
  >(GetFriendRequestIdsDocument, options);
}
export function useGetFriendRequestIdsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetFriendRequestIdsQuery,
    GetFriendRequestIdsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetFriendRequestIdsQuery,
    GetFriendRequestIdsQueryVariables
  >(GetFriendRequestIdsDocument, options);
}
export type GetFriendRequestIdsQueryHookResult = ReturnType<
  typeof useGetFriendRequestIdsQuery
>;
export type GetFriendRequestIdsLazyQueryHookResult = ReturnType<
  typeof useGetFriendRequestIdsLazyQuery
>;
export type GetFriendRequestIdsQueryResult = Apollo.QueryResult<
  GetFriendRequestIdsQuery,
  GetFriendRequestIdsQueryVariables
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
