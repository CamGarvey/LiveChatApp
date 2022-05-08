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
  /** Add Users into Channel */
  addUsersToChannel?: Maybe<Channel>;
  /** Create a Channel */
  createChannel?: Maybe<Channel>;
  /** Create a Message in a Channel */
  createMessage?: Maybe<Message>;
  /** Create a User */
  createUser?: Maybe<User>;
  /** Delete a Channel */
  deleteChannel?: Maybe<Scalars['Boolean']>;
  /** Delete a Friend */
  deleteFriend?: Maybe<Scalars['Boolean']>;
  /** Delete a received Friend Request */
  deleteFriendRequest?: Maybe<Scalars['Boolean']>;
  /** Delete a Message */
  deleteMessage?: Maybe<Message>;
  /** Delete a User */
  deleteUser?: Maybe<User>;
  /** Remove Users from Channel */
  removeUsersFromChannel?: Maybe<Channel>;
  /** Send a Friend Request to a User */
  sendFriendRequest?: Maybe<Scalars['Boolean']>;
  /** Update a Channel */
  updateChannel?: Maybe<Channel>;
  /** Update a Message */
  updateMessage?: Maybe<Message>;
  /** Update a User */
  updateUser?: Maybe<User>;
};

export type MutationAcceptFriendRequestArgs = {
  friendId: Scalars['Int'];
  userId: Scalars['Int'];
};

export type MutationAddUsersToChannelArgs = {
  id: Scalars['Int'];
  userIds: Array<Scalars['Int']>;
};

export type MutationCreateChannelArgs = {
  createdById: Scalars['Int'];
  isDM: Scalars['Boolean'];
  name: Scalars['String'];
};

export type MutationCreateMessageArgs = {
  channelId: Scalars['Int'];
  content: Scalars['String'];
  createdById: Scalars['Int'];
};

export type MutationCreateUserArgs = {
  email?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  username?: InputMaybe<Scalars['String']>;
};

export type MutationDeleteChannelArgs = {
  id: Scalars['Int'];
};

export type MutationDeleteFriendArgs = {
  friendId: Scalars['Int'];
  userId: Scalars['Int'];
};

export type MutationDeleteFriendRequestArgs = {
  friendId: Scalars['Int'];
  userId: Scalars['Int'];
};

export type MutationDeleteMessageArgs = {
  id: Scalars['Int'];
};

export type MutationDeleteUserArgs = {
  id: Scalars['Int'];
};

export type MutationRemoveUsersFromChannelArgs = {
  id: Scalars['Int'];
  userIds: Array<Scalars['Int']>;
};

export type MutationSendFriendRequestArgs = {
  friendId: Scalars['Int'];
  userId: Scalars['Int'];
};

export type MutationUpdateChannelArgs = {
  id: Scalars['Int'];
  isDM: Scalars['Boolean'];
  name: Scalars['String'];
};

export type MutationUpdateMessageArgs = {
  content: Scalars['String'];
  id: Scalars['Int'];
};

export type MutationUpdateUserArgs = {
  email: Scalars['String'];
  id: Scalars['Int'];
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
  Channel?: Maybe<Channel>;
  Channels?: Maybe<Array<Maybe<Channel>>>;
  Message: Message;
  User?: Maybe<User>;
  Users: UserConnection;
};

export type QueryChannelArgs = {
  id: Scalars['Int'];
};

export type QueryChannelsArgs = {
  userId: Scalars['Int'];
};

export type QueryMessageArgs = {
  id: Scalars['Int'];
};

export type QueryUserArgs = {
  id: Scalars['Int'];
};

export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  nameFilter?: InputMaybe<Scalars['String']>;
  orderBy?: InputMaybe<UserOrderBy>;
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

export type SubscriptionNewFriendRequestArgs = {
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

export type AcceptFriendRequestMutationVariables = Exact<{
  userId: Scalars['Int'];
  friendId: Scalars['Int'];
}>;

export type AcceptFriendRequestMutation = {
  __typename?: 'Mutation';
  acceptFriendRequest?: boolean | null;
};

export type AddUsersToChannelMutationVariables = Exact<{
  addUsersToChannelId: Scalars['Int'];
  userIds: Array<Scalars['Int']> | Scalars['Int'];
}>;

export type AddUsersToChannelMutation = {
  __typename?: 'Mutation';
  addUsersToChannel?: {
    __typename?: 'Channel';
    id: number;
    name: string;
    createdAt: any;
    updatedAt: any;
    members: Array<{
      __typename?: 'User';
      name: string;
      id: number;
      email: string;
      username?: string | null;
    }>;
  } | null;
};

export type CreateChannelMutationVariables = Exact<{
  channelId: Scalars['Int'];
  createdById: Scalars['Int'];
  content: Scalars['String'];
}>;

export type CreateChannelMutation = {
  __typename?: 'Mutation';
  createMessage?: {
    __typename?: 'Message';
    id: number;
    content: string;
    createdAt: any;
    channel: { __typename?: 'Channel'; id: number };
  } | null;
};

export type CreateMessageMutationVariables = Exact<{
  channelId: Scalars['Int'];
  createdById: Scalars['Int'];
  content: Scalars['String'];
}>;

export type CreateMessageMutation = {
  __typename?: 'Mutation';
  createMessage?: {
    __typename?: 'Message';
    id: number;
    content: string;
    createdAt: any;
  } | null;
};

export type CreateUserMutationVariables = Exact<{
  name: Scalars['String'];
  email?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
}>;

export type CreateUserMutation = {
  __typename?: 'Mutation';
  createUser?: {
    __typename?: 'User';
    id: number;
    name: string;
    email: string;
    username?: string | null;
    createdAt: any;
  } | null;
};

export type DeleteChannelMutationVariables = Exact<{
  deleteChannelId: Scalars['Int'];
}>;

export type DeleteChannelMutation = {
  __typename?: 'Mutation';
  deleteChannel?: boolean | null;
};

export type DeleteFriendMutationVariables = Exact<{
  userId: Scalars['Int'];
  friendId: Scalars['Int'];
}>;

export type DeleteFriendMutation = {
  __typename?: 'Mutation';
  deleteFriend?: boolean | null;
};

export type DeleteFriendRequestMutationVariables = Exact<{
  userId: Scalars['Int'];
  friendId: Scalars['Int'];
}>;

export type DeleteFriendRequestMutation = {
  __typename?: 'Mutation';
  deleteFriendRequest?: boolean | null;
};

export type DeleteMessageMutationVariables = Exact<{
  deleteMessageId: Scalars['Int'];
}>;

export type DeleteMessageMutation = {
  __typename?: 'Mutation';
  deleteMessage?: { __typename?: 'Message'; id: number } | null;
};

export type DeleteUserMutationVariables = Exact<{
  deleteUserId: Scalars['Int'];
}>;

export type DeleteUserMutation = {
  __typename?: 'Mutation';
  deleteUser?: { __typename?: 'User'; id: number; name: string } | null;
};

export type RemoveUsersFromChannelMutationVariables = Exact<{
  removeUsersFromChannelId: Scalars['Int'];
  userIds: Array<Scalars['Int']> | Scalars['Int'];
}>;

export type RemoveUsersFromChannelMutation = {
  __typename?: 'Mutation';
  removeUsersFromChannel?: {
    __typename?: 'Channel';
    id: number;
    name: string;
    members: Array<{
      __typename?: 'User';
      id: number;
      name: string;
      email: string;
      username?: string | null;
    }>;
  } | null;
};

export type SendFriendRequestMutationVariables = Exact<{
  userId: Scalars['Int'];
  friendId: Scalars['Int'];
}>;

export type SendFriendRequestMutation = {
  __typename?: 'Mutation';
  sendFriendRequest?: boolean | null;
};

export type UpdateChannelMutationVariables = Exact<{
  updateChannelId: Scalars['Int'];
  isDm: Scalars['Boolean'];
  name: Scalars['String'];
}>;

export type UpdateChannelMutation = {
  __typename?: 'Mutation';
  updateChannel?: {
    __typename?: 'Channel';
    id: number;
    name: string;
    createdAt: any;
    updatedAt: any;
    isDM: boolean;
  } | null;
};

export type UpdateMessageMutationVariables = Exact<{
  updateMessageId: Scalars['Int'];
  content: Scalars['String'];
}>;

export type UpdateMessageMutation = {
  __typename?: 'Mutation';
  updateMessage?: {
    __typename?: 'Message';
    id: number;
    content: string;
    createdAt: any;
    createdById: number;
    updatedAt: any;
  } | null;
};

export type UpdateUserMutationVariables = Exact<{
  updateUserId: Scalars['Int'];
  email: Scalars['String'];
  username: Scalars['String'];
}>;

export type UpdateUserMutation = {
  __typename?: 'Mutation';
  updateUser?: {
    __typename?: 'User';
    id: number;
    name: string;
    email: string;
    username?: string | null;
    createdAt: any;
    updatedAt: any;
  } | null;
};

export type GetChannelMembersQueryVariables = Exact<{
  channelId: Scalars['Int'];
}>;

export type GetChannelMembersQuery = {
  __typename?: 'Query';
  Channel?: {
    __typename?: 'Channel';
    id: number;
    name: string;
    members: Array<{
      __typename?: 'User';
      id: number;
      name: string;
      email: string;
      username?: string | null;
    }>;
  } | null;
};

export type GetChannelMessagesQueryVariables = Exact<{
  channelId: Scalars['Int'];
  first?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  last?: InputMaybe<Scalars['Int']>;
  before?: InputMaybe<Scalars['String']>;
}>;

export type GetChannelMessagesQuery = {
  __typename?: 'Query';
  Channel?: {
    __typename?: 'Channel';
    id: number;
    name: string;
    isDM: boolean;
    messages: {
      __typename?: 'MessageConnection';
      edges?: Array<{
        __typename?: 'MessageEdge';
        cursor: string;
        node?: {
          __typename?: 'Message';
          id: number;
          content: string;
          createdAt: any;
          createdById: number;
          updatedAt: any;
          createdBy: {
            __typename?: 'User';
            id: number;
            name: string;
            username?: string | null;
          };
          likedBy: Array<{
            __typename?: 'User';
            id: number;
            name: string;
            username?: string | null;
          }>;
        } | null;
      } | null> | null;
    };
  } | null;
};

export type GetUserQueryVariables = Exact<{
  userId: Scalars['Int'];
}>;

export type GetUserQuery = {
  __typename?: 'Query';
  User?: {
    __typename?: 'User';
    id: number;
    name: string;
    email: string;
    username?: string | null;
    createdAt: any;
    updatedAt: any;
    channels: Array<{ __typename?: 'Channel'; id: number }>;
  } | null;
};

export type GetUserChannelsQueryVariables = Exact<{
  userId: Scalars['Int'];
}>;

export type GetUserChannelsQuery = {
  __typename?: 'Query';
  User?: {
    __typename?: 'User';
    id: number;
    channels: Array<{
      __typename?: 'Channel';
      id: number;
      name: string;
      isDM: boolean;
    }>;
  } | null;
};

export type GetUserChannelsWithMembersQueryVariables = Exact<{
  userId: Scalars['Int'];
}>;

export type GetUserChannelsWithMembersQuery = {
  __typename?: 'Query';
  User?: {
    __typename?: 'User';
    id: number;
    channels: Array<{
      __typename?: 'Channel';
      id: number;
      name: string;
      isDM: boolean;
      members: Array<{
        __typename?: 'User';
        id: number;
        name: string;
        email: string;
        username?: string | null;
      }>;
    }>;
  } | null;
};

export type GetUserFriendsQueryVariables = Exact<{
  userId: Scalars['Int'];
  first?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  last?: InputMaybe<Scalars['Int']>;
  before?: InputMaybe<Scalars['String']>;
}>;

export type GetUserFriendsQuery = {
  __typename?: 'Query';
  User?: {
    __typename?: 'User';
    id: number;
    friends: {
      __typename?: 'UserConnection';
      edges?: Array<{
        __typename?: 'UserEdge';
        cursor: string;
        node?: {
          __typename?: 'User';
          id: number;
          name: string;
          email: string;
          username?: string | null;
          createdAt: any;
          updatedAt: any;
        } | null;
      } | null> | null;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
    };
  } | null;
};

export type GetUsersQueryVariables = Exact<{
  before?: InputMaybe<Scalars['String']>;
  last?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserOrderBy>;
  nameFilter?: InputMaybe<Scalars['String']>;
}>;

export type GetUsersQuery = {
  __typename?: 'Query';
  Users: {
    __typename?: 'UserConnection';
    edges?: Array<{
      __typename?: 'UserEdge';
      cursor: string;
      node?: {
        __typename?: 'User';
        id: number;
        name: string;
        email: string;
        username?: string | null;
        createdAt: any;
        updatedAt: any;
        channels: Array<{ __typename?: 'Channel'; id: number }>;
      } | null;
    } | null> | null;
    pageInfo: {
      __typename?: 'PageInfo';
      endCursor?: string | null;
      startCursor?: string | null;
      hasPreviousPage: boolean;
      hasNextPage: boolean;
    };
  };
};

export type NewFriendSubscriptionVariables = Exact<{
  userId: Scalars['Int'];
}>;

export type NewFriendSubscription = {
  __typename?: 'Subscription';
  newFriend?: {
    __typename?: 'User';
    id: number;
    name: string;
    email: string;
    username?: string | null;
  } | null;
};

export type NewFriendRequestSubscriptionVariables = Exact<{
  userId: Scalars['Int'];
}>;

export type NewFriendRequestSubscription = {
  __typename?: 'Subscription';
  newFriendRequest?: {
    __typename?: 'User';
    id: number;
    name: string;
    email: string;
    username?: string | null;
  } | null;
};

export type NewMessageSubscriptionVariables = Exact<{
  channelId: Scalars['Int'];
}>;

export type NewMessageSubscription = {
  __typename?: 'Subscription';
  newMessage?: {
    __typename?: 'NewMessagePayload';
    channelId: number;
    message: {
      __typename?: 'Message';
      id: number;
      content: string;
      createdAt: any;
      createdBy: {
        __typename?: 'User';
        id: number;
        name: string;
        email: string;
      };
    };
  } | null;
};

export const AcceptFriendRequestDocument = gql`
  mutation AcceptFriendRequest($userId: Int!, $friendId: Int!) {
    acceptFriendRequest(userId: $userId, friendId: $friendId)
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
 *      userId: // value for 'userId'
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
export const AddUsersToChannelDocument = gql`
  mutation AddUsersToChannel($addUsersToChannelId: Int!, $userIds: [Int!]!) {
    addUsersToChannel(id: $addUsersToChannelId, userIds: $userIds) {
      id
      name
      createdAt
      updatedAt
      members {
        name
        id
        email
        username
      }
    }
  }
`;
export type AddUsersToChannelMutationFn = Apollo.MutationFunction<
  AddUsersToChannelMutation,
  AddUsersToChannelMutationVariables
>;

/**
 * __useAddUsersToChannelMutation__
 *
 * To run a mutation, you first call `useAddUsersToChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUsersToChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUsersToChannelMutation, { data, loading, error }] = useAddUsersToChannelMutation({
 *   variables: {
 *      addUsersToChannelId: // value for 'addUsersToChannelId'
 *      userIds: // value for 'userIds'
 *   },
 * });
 */
export function useAddUsersToChannelMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddUsersToChannelMutation,
    AddUsersToChannelMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AddUsersToChannelMutation,
    AddUsersToChannelMutationVariables
  >(AddUsersToChannelDocument, options);
}
export type AddUsersToChannelMutationHookResult = ReturnType<
  typeof useAddUsersToChannelMutation
>;
export type AddUsersToChannelMutationResult =
  Apollo.MutationResult<AddUsersToChannelMutation>;
export type AddUsersToChannelMutationOptions = Apollo.BaseMutationOptions<
  AddUsersToChannelMutation,
  AddUsersToChannelMutationVariables
>;
export const CreateChannelDocument = gql`
  mutation CreateChannel(
    $channelId: Int!
    $createdById: Int!
    $content: String!
  ) {
    createMessage(
      channelId: $channelId
      createdById: $createdById
      content: $content
    ) {
      id
      content
      createdAt
      channel {
        id
      }
    }
  }
`;
export type CreateChannelMutationFn = Apollo.MutationFunction<
  CreateChannelMutation,
  CreateChannelMutationVariables
>;

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
 *      channelId: // value for 'channelId'
 *      createdById: // value for 'createdById'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useCreateChannelMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateChannelMutation,
    CreateChannelMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateChannelMutation,
    CreateChannelMutationVariables
  >(CreateChannelDocument, options);
}
export type CreateChannelMutationHookResult = ReturnType<
  typeof useCreateChannelMutation
>;
export type CreateChannelMutationResult =
  Apollo.MutationResult<CreateChannelMutation>;
export type CreateChannelMutationOptions = Apollo.BaseMutationOptions<
  CreateChannelMutation,
  CreateChannelMutationVariables
>;
export const CreateMessageDocument = gql`
  mutation CreateMessage(
    $channelId: Int!
    $createdById: Int!
    $content: String!
  ) {
    createMessage(
      channelId: $channelId
      createdById: $createdById
      content: $content
    ) {
      id
      content
      createdAt
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
 *      channelId: // value for 'channelId'
 *      createdById: // value for 'createdById'
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
export const CreateUserDocument = gql`
  mutation CreateUser($name: String!, $email: String, $username: String) {
    createUser(name: $name, email: $email, username: $username) {
      id
      name
      email
      username
      createdAt
    }
  }
`;
export type CreateUserMutationFn = Apollo.MutationFunction<
  CreateUserMutation,
  CreateUserMutationVariables
>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useCreateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateUserMutation,
    CreateUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(
    CreateUserDocument,
    options
  );
}
export type CreateUserMutationHookResult = ReturnType<
  typeof useCreateUserMutation
>;
export type CreateUserMutationResult =
  Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<
  CreateUserMutation,
  CreateUserMutationVariables
>;
export const DeleteChannelDocument = gql`
  mutation DeleteChannel($deleteChannelId: Int!) {
    deleteChannel(id: $deleteChannelId)
  }
`;
export type DeleteChannelMutationFn = Apollo.MutationFunction<
  DeleteChannelMutation,
  DeleteChannelMutationVariables
>;

/**
 * __useDeleteChannelMutation__
 *
 * To run a mutation, you first call `useDeleteChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteChannelMutation, { data, loading, error }] = useDeleteChannelMutation({
 *   variables: {
 *      deleteChannelId: // value for 'deleteChannelId'
 *   },
 * });
 */
export function useDeleteChannelMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteChannelMutation,
    DeleteChannelMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteChannelMutation,
    DeleteChannelMutationVariables
  >(DeleteChannelDocument, options);
}
export type DeleteChannelMutationHookResult = ReturnType<
  typeof useDeleteChannelMutation
>;
export type DeleteChannelMutationResult =
  Apollo.MutationResult<DeleteChannelMutation>;
export type DeleteChannelMutationOptions = Apollo.BaseMutationOptions<
  DeleteChannelMutation,
  DeleteChannelMutationVariables
>;
export const DeleteFriendDocument = gql`
  mutation DeleteFriend($userId: Int!, $friendId: Int!) {
    deleteFriend(userId: $userId, friendId: $friendId)
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
 *      userId: // value for 'userId'
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
export const DeleteFriendRequestDocument = gql`
  mutation DeleteFriendRequest($userId: Int!, $friendId: Int!) {
    deleteFriendRequest(userId: $userId, friendId: $friendId)
  }
`;
export type DeleteFriendRequestMutationFn = Apollo.MutationFunction<
  DeleteFriendRequestMutation,
  DeleteFriendRequestMutationVariables
>;

/**
 * __useDeleteFriendRequestMutation__
 *
 * To run a mutation, you first call `useDeleteFriendRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFriendRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFriendRequestMutation, { data, loading, error }] = useDeleteFriendRequestMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      friendId: // value for 'friendId'
 *   },
 * });
 */
export function useDeleteFriendRequestMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteFriendRequestMutation,
    DeleteFriendRequestMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteFriendRequestMutation,
    DeleteFriendRequestMutationVariables
  >(DeleteFriendRequestDocument, options);
}
export type DeleteFriendRequestMutationHookResult = ReturnType<
  typeof useDeleteFriendRequestMutation
>;
export type DeleteFriendRequestMutationResult =
  Apollo.MutationResult<DeleteFriendRequestMutation>;
export type DeleteFriendRequestMutationOptions = Apollo.BaseMutationOptions<
  DeleteFriendRequestMutation,
  DeleteFriendRequestMutationVariables
>;
export const DeleteMessageDocument = gql`
  mutation DeleteMessage($deleteMessageId: Int!) {
    deleteMessage(id: $deleteMessageId) {
      id
    }
  }
`;
export type DeleteMessageMutationFn = Apollo.MutationFunction<
  DeleteMessageMutation,
  DeleteMessageMutationVariables
>;

/**
 * __useDeleteMessageMutation__
 *
 * To run a mutation, you first call `useDeleteMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMessageMutation, { data, loading, error }] = useDeleteMessageMutation({
 *   variables: {
 *      deleteMessageId: // value for 'deleteMessageId'
 *   },
 * });
 */
export function useDeleteMessageMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteMessageMutation,
    DeleteMessageMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteMessageMutation,
    DeleteMessageMutationVariables
  >(DeleteMessageDocument, options);
}
export type DeleteMessageMutationHookResult = ReturnType<
  typeof useDeleteMessageMutation
>;
export type DeleteMessageMutationResult =
  Apollo.MutationResult<DeleteMessageMutation>;
export type DeleteMessageMutationOptions = Apollo.BaseMutationOptions<
  DeleteMessageMutation,
  DeleteMessageMutationVariables
>;
export const DeleteUserDocument = gql`
  mutation DeleteUser($deleteUserId: Int!) {
    deleteUser(id: $deleteUserId) {
      id
      name
    }
  }
`;
export type DeleteUserMutationFn = Apollo.MutationFunction<
  DeleteUserMutation,
  DeleteUserMutationVariables
>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      deleteUserId: // value for 'deleteUserId'
 *   },
 * });
 */
export function useDeleteUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteUserMutation,
    DeleteUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(
    DeleteUserDocument,
    options
  );
}
export type DeleteUserMutationHookResult = ReturnType<
  typeof useDeleteUserMutation
>;
export type DeleteUserMutationResult =
  Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<
  DeleteUserMutation,
  DeleteUserMutationVariables
>;
export const RemoveUsersFromChannelDocument = gql`
  mutation RemoveUsersFromChannel(
    $removeUsersFromChannelId: Int!
    $userIds: [Int!]!
  ) {
    removeUsersFromChannel(id: $removeUsersFromChannelId, userIds: $userIds) {
      id
      name
      members {
        id
        name
        email
        username
      }
    }
  }
`;
export type RemoveUsersFromChannelMutationFn = Apollo.MutationFunction<
  RemoveUsersFromChannelMutation,
  RemoveUsersFromChannelMutationVariables
>;

/**
 * __useRemoveUsersFromChannelMutation__
 *
 * To run a mutation, you first call `useRemoveUsersFromChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveUsersFromChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeUsersFromChannelMutation, { data, loading, error }] = useRemoveUsersFromChannelMutation({
 *   variables: {
 *      removeUsersFromChannelId: // value for 'removeUsersFromChannelId'
 *      userIds: // value for 'userIds'
 *   },
 * });
 */
export function useRemoveUsersFromChannelMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveUsersFromChannelMutation,
    RemoveUsersFromChannelMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RemoveUsersFromChannelMutation,
    RemoveUsersFromChannelMutationVariables
  >(RemoveUsersFromChannelDocument, options);
}
export type RemoveUsersFromChannelMutationHookResult = ReturnType<
  typeof useRemoveUsersFromChannelMutation
>;
export type RemoveUsersFromChannelMutationResult =
  Apollo.MutationResult<RemoveUsersFromChannelMutation>;
export type RemoveUsersFromChannelMutationOptions = Apollo.BaseMutationOptions<
  RemoveUsersFromChannelMutation,
  RemoveUsersFromChannelMutationVariables
>;
export const SendFriendRequestDocument = gql`
  mutation SendFriendRequest($userId: Int!, $friendId: Int!) {
    sendFriendRequest(userId: $userId, friendId: $friendId)
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
 *      userId: // value for 'userId'
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
export const UpdateChannelDocument = gql`
  mutation UpdateChannel(
    $updateChannelId: Int!
    $isDm: Boolean!
    $name: String!
  ) {
    updateChannel(id: $updateChannelId, isDM: $isDm, name: $name) {
      id
      name
      createdAt
      updatedAt
      isDM
    }
  }
`;
export type UpdateChannelMutationFn = Apollo.MutationFunction<
  UpdateChannelMutation,
  UpdateChannelMutationVariables
>;

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
 *      updateChannelId: // value for 'updateChannelId'
 *      isDm: // value for 'isDm'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUpdateChannelMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateChannelMutation,
    UpdateChannelMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateChannelMutation,
    UpdateChannelMutationVariables
  >(UpdateChannelDocument, options);
}
export type UpdateChannelMutationHookResult = ReturnType<
  typeof useUpdateChannelMutation
>;
export type UpdateChannelMutationResult =
  Apollo.MutationResult<UpdateChannelMutation>;
export type UpdateChannelMutationOptions = Apollo.BaseMutationOptions<
  UpdateChannelMutation,
  UpdateChannelMutationVariables
>;
export const UpdateMessageDocument = gql`
  mutation UpdateMessage($updateMessageId: Int!, $content: String!) {
    updateMessage(id: $updateMessageId, content: $content) {
      id
      content
      createdAt
      createdById
      updatedAt
    }
  }
`;
export type UpdateMessageMutationFn = Apollo.MutationFunction<
  UpdateMessageMutation,
  UpdateMessageMutationVariables
>;

/**
 * __useUpdateMessageMutation__
 *
 * To run a mutation, you first call `useUpdateMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMessageMutation, { data, loading, error }] = useUpdateMessageMutation({
 *   variables: {
 *      updateMessageId: // value for 'updateMessageId'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useUpdateMessageMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateMessageMutation,
    UpdateMessageMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateMessageMutation,
    UpdateMessageMutationVariables
  >(UpdateMessageDocument, options);
}
export type UpdateMessageMutationHookResult = ReturnType<
  typeof useUpdateMessageMutation
>;
export type UpdateMessageMutationResult =
  Apollo.MutationResult<UpdateMessageMutation>;
export type UpdateMessageMutationOptions = Apollo.BaseMutationOptions<
  UpdateMessageMutation,
  UpdateMessageMutationVariables
>;
export const UpdateUserDocument = gql`
  mutation UpdateUser(
    $updateUserId: Int!
    $email: String!
    $username: String!
  ) {
    updateUser(id: $updateUserId, email: $email, username: $username) {
      id
      name
      email
      username
      createdAt
      updatedAt
    }
  }
`;
export type UpdateUserMutationFn = Apollo.MutationFunction<
  UpdateUserMutation,
  UpdateUserMutationVariables
>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      updateUserId: // value for 'updateUserId'
 *      email: // value for 'email'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useUpdateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(
    UpdateUserDocument,
    options
  );
}
export type UpdateUserMutationHookResult = ReturnType<
  typeof useUpdateUserMutation
>;
export type UpdateUserMutationResult =
  Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<
  UpdateUserMutation,
  UpdateUserMutationVariables
>;
export const GetChannelMembersDocument = gql`
  query GetChannelMembers($channelId: Int!) {
    Channel(id: $channelId) {
      id
      name
      members {
        id
        name
        email
        username
      }
    }
  }
`;

/**
 * __useGetChannelMembersQuery__
 *
 * To run a query within a React component, call `useGetChannelMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChannelMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChannelMembersQuery({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useGetChannelMembersQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetChannelMembersQuery,
    GetChannelMembersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetChannelMembersQuery,
    GetChannelMembersQueryVariables
  >(GetChannelMembersDocument, options);
}
export function useGetChannelMembersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetChannelMembersQuery,
    GetChannelMembersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetChannelMembersQuery,
    GetChannelMembersQueryVariables
  >(GetChannelMembersDocument, options);
}
export type GetChannelMembersQueryHookResult = ReturnType<
  typeof useGetChannelMembersQuery
>;
export type GetChannelMembersLazyQueryHookResult = ReturnType<
  typeof useGetChannelMembersLazyQuery
>;
export type GetChannelMembersQueryResult = Apollo.QueryResult<
  GetChannelMembersQuery,
  GetChannelMembersQueryVariables
>;
export const GetChannelMessagesDocument = gql`
  query GetChannelMessages(
    $channelId: Int!
    $first: Int
    $after: String
    $last: Int
    $before: String
  ) {
    Channel(id: $channelId) {
      id
      name
      isDM
      messages(first: $first, after: $after, last: $last, before: $before) {
        edges {
          cursor
          node {
            id
            content
            createdAt
            createdById
            createdBy {
              id
              name
              username
            }
            likedBy {
              id
              name
              username
            }
            updatedAt
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
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      last: // value for 'last'
 *      before: // value for 'before'
 *   },
 * });
 */
export function useGetChannelMessagesQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetChannelMessagesQuery,
    GetChannelMessagesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetChannelMessagesQuery,
    GetChannelMessagesQueryVariables
  >(GetChannelMessagesDocument, options);
}
export function useGetChannelMessagesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetChannelMessagesQuery,
    GetChannelMessagesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetChannelMessagesQuery,
    GetChannelMessagesQueryVariables
  >(GetChannelMessagesDocument, options);
}
export type GetChannelMessagesQueryHookResult = ReturnType<
  typeof useGetChannelMessagesQuery
>;
export type GetChannelMessagesLazyQueryHookResult = ReturnType<
  typeof useGetChannelMessagesLazyQuery
>;
export type GetChannelMessagesQueryResult = Apollo.QueryResult<
  GetChannelMessagesQuery,
  GetChannelMessagesQueryVariables
>;
export const GetUserDocument = gql`
  query GetUser($userId: Int!) {
    User(id: $userId) {
      id
      name
      email
      username
      createdAt
      updatedAt
      channels {
        id
      }
    }
  }
`;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserQuery(
  baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(
    GetUserDocument,
    options
  );
}
export function useGetUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(
    GetUserDocument,
    options
  );
}
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<
  GetUserQuery,
  GetUserQueryVariables
>;
export const GetUserChannelsDocument = gql`
  query GetUserChannels($userId: Int!) {
    User(id: $userId) {
      id
      channels {
        id
        name
        isDM
      }
    }
  }
`;

/**
 * __useGetUserChannelsQuery__
 *
 * To run a query within a React component, call `useGetUserChannelsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserChannelsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserChannelsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserChannelsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetUserChannelsQuery,
    GetUserChannelsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetUserChannelsQuery, GetUserChannelsQueryVariables>(
    GetUserChannelsDocument,
    options
  );
}
export function useGetUserChannelsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUserChannelsQuery,
    GetUserChannelsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetUserChannelsQuery,
    GetUserChannelsQueryVariables
  >(GetUserChannelsDocument, options);
}
export type GetUserChannelsQueryHookResult = ReturnType<
  typeof useGetUserChannelsQuery
>;
export type GetUserChannelsLazyQueryHookResult = ReturnType<
  typeof useGetUserChannelsLazyQuery
>;
export type GetUserChannelsQueryResult = Apollo.QueryResult<
  GetUserChannelsQuery,
  GetUserChannelsQueryVariables
>;
export const GetUserChannelsWithMembersDocument = gql`
  query GetUserChannelsWithMembers($userId: Int!) {
    User(id: $userId) {
      id
      channels {
        id
        name
        isDM
        members {
          id
          name
          email
          username
        }
      }
    }
  }
`;

/**
 * __useGetUserChannelsWithMembersQuery__
 *
 * To run a query within a React component, call `useGetUserChannelsWithMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserChannelsWithMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserChannelsWithMembersQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserChannelsWithMembersQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetUserChannelsWithMembersQuery,
    GetUserChannelsWithMembersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetUserChannelsWithMembersQuery,
    GetUserChannelsWithMembersQueryVariables
  >(GetUserChannelsWithMembersDocument, options);
}
export function useGetUserChannelsWithMembersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUserChannelsWithMembersQuery,
    GetUserChannelsWithMembersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetUserChannelsWithMembersQuery,
    GetUserChannelsWithMembersQueryVariables
  >(GetUserChannelsWithMembersDocument, options);
}
export type GetUserChannelsWithMembersQueryHookResult = ReturnType<
  typeof useGetUserChannelsWithMembersQuery
>;
export type GetUserChannelsWithMembersLazyQueryHookResult = ReturnType<
  typeof useGetUserChannelsWithMembersLazyQuery
>;
export type GetUserChannelsWithMembersQueryResult = Apollo.QueryResult<
  GetUserChannelsWithMembersQuery,
  GetUserChannelsWithMembersQueryVariables
>;
export const GetUserFriendsDocument = gql`
  query GetUserFriends(
    $userId: Int!
    $first: Int
    $after: String
    $last: Int
    $before: String
  ) {
    User(id: $userId) {
      id
      friends(first: $first, after: $after, last: $last, before: $before) {
        edges {
          cursor
          node {
            id
            name
            email
            username
            createdAt
            updatedAt
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
      }
    }
  }
`;

/**
 * __useGetUserFriendsQuery__
 *
 * To run a query within a React component, call `useGetUserFriendsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserFriendsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserFriendsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      last: // value for 'last'
 *      before: // value for 'before'
 *   },
 * });
 */
export function useGetUserFriendsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetUserFriendsQuery,
    GetUserFriendsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetUserFriendsQuery, GetUserFriendsQueryVariables>(
    GetUserFriendsDocument,
    options
  );
}
export function useGetUserFriendsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUserFriendsQuery,
    GetUserFriendsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetUserFriendsQuery, GetUserFriendsQueryVariables>(
    GetUserFriendsDocument,
    options
  );
}
export type GetUserFriendsQueryHookResult = ReturnType<
  typeof useGetUserFriendsQuery
>;
export type GetUserFriendsLazyQueryHookResult = ReturnType<
  typeof useGetUserFriendsLazyQuery
>;
export type GetUserFriendsQueryResult = Apollo.QueryResult<
  GetUserFriendsQuery,
  GetUserFriendsQueryVariables
>;
export const GetUsersDocument = gql`
  query GetUsers(
    $before: String
    $last: Int
    $after: String
    $first: Int
    $orderBy: UserOrderBy
    $nameFilter: String
  ) {
    Users(
      before: $before
      last: $last
      after: $after
      first: $first
      orderBy: $orderBy
      nameFilter: $nameFilter
    ) {
      edges {
        cursor
        node {
          id
          name
          email
          username
          createdAt
          updatedAt
          channels {
            id
          }
        }
      }
      pageInfo {
        endCursor
        startCursor
        hasPreviousPage
        hasNextPage
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
 *      before: // value for 'before'
 *      last: // value for 'last'
 *      after: // value for 'after'
 *      first: // value for 'first'
 *      orderBy: // value for 'orderBy'
 *      nameFilter: // value for 'nameFilter'
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
export const NewFriendDocument = gql`
  subscription NewFriend($userId: Int!) {
    newFriend(userId: $userId) {
      id
      name
      email
      username
    }
  }
`;

/**
 * __useNewFriendSubscription__
 *
 * To run a query within a React component, call `useNewFriendSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewFriendSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewFriendSubscription({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useNewFriendSubscription(
  baseOptions: Apollo.SubscriptionHookOptions<
    NewFriendSubscription,
    NewFriendSubscriptionVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<
    NewFriendSubscription,
    NewFriendSubscriptionVariables
  >(NewFriendDocument, options);
}
export type NewFriendSubscriptionHookResult = ReturnType<
  typeof useNewFriendSubscription
>;
export type NewFriendSubscriptionResult =
  Apollo.SubscriptionResult<NewFriendSubscription>;
export const NewFriendRequestDocument = gql`
  subscription NewFriendRequest($userId: Int!) {
    newFriendRequest(userId: $userId) {
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
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useNewFriendRequestSubscription(
  baseOptions: Apollo.SubscriptionHookOptions<
    NewFriendRequestSubscription,
    NewFriendRequestSubscriptionVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<
    NewFriendRequestSubscription,
    NewFriendRequestSubscriptionVariables
  >(NewFriendRequestDocument, options);
}
export type NewFriendRequestSubscriptionHookResult = ReturnType<
  typeof useNewFriendRequestSubscription
>;
export type NewFriendRequestSubscriptionResult =
  Apollo.SubscriptionResult<NewFriendRequestSubscription>;
export const NewMessageDocument = gql`
  subscription NewMessage($channelId: Int!) {
    newMessage(channelId: $channelId) {
      channelId
      message {
        id
        content
        createdAt
        createdBy {
          id
          name
          email
        }
      }
    }
  }
`;

/**
 * __useNewMessageSubscription__
 *
 * To run a query within a React component, call `useNewMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewMessageSubscription({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useNewMessageSubscription(
  baseOptions: Apollo.SubscriptionHookOptions<
    NewMessageSubscription,
    NewMessageSubscriptionVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<
    NewMessageSubscription,
    NewMessageSubscriptionVariables
  >(NewMessageDocument, options);
}
export type NewMessageSubscriptionHookResult = ReturnType<
  typeof useNewMessageSubscription
>;
export type NewMessageSubscriptionResult =
  Apollo.SubscriptionResult<NewMessageSubscription>;
