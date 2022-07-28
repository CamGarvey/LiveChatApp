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
  Date: any;
  HashId: any;
};

export type Chat = {
  createdAt?: Maybe<Scalars['Date']>;
  createdBy: User;
  createdById: Scalars['HashId'];
  id: Scalars['HashId'];
  isCreator: Scalars['Boolean'];
  updatedAt?: Maybe<Scalars['Date']>;
};

export type ChatInvite = Notification & Request & {
  __typename?: 'ChatInvite';
  chat?: Maybe<Chat>;
  chatId: Scalars['HashId'];
  createdAt: Scalars['Date'];
  createdBy: User;
  createdById: Scalars['HashId'];
  id: Scalars['HashId'];
  recipient?: Maybe<User>;
  recipientId: Scalars['HashId'];
  status: RequestStatus;
};

export type CreateGroupChatInput = {
  /** Short description of the group chat */
  description?: InputMaybe<Scalars['String']>;
  /** Ids of the users to be added to group chat */
  memberIds?: InputMaybe<Array<Scalars['HashId']>>;
  /** Name of the chat */
  name: Scalars['String'];
};

export type DeletedChat = Chat & {
  __typename?: 'DeletedChat';
  createdAt?: Maybe<Scalars['Date']>;
  createdBy: User;
  createdById: Scalars['HashId'];
  deletedAt: Scalars['Date'];
  id: Scalars['HashId'];
  isCreator: Scalars['Boolean'];
  updatedAt?: Maybe<Scalars['Date']>;
};

export type DeletedMessage = Message & {
  __typename?: 'DeletedMessage';
  chat: Chat;
  chatId: Scalars['HashId'];
  createdAt: Scalars['Date'];
  createdBy: User;
  createdById: Scalars['HashId'];
  deletedAt?: Maybe<Scalars['Date']>;
  id: Scalars['HashId'];
  isCreator: Scalars['Boolean'];
  updatedAt: Scalars['Date'];
};

/** A Direct Message Chat is a conversation between 2 members */
export type DirectMessageChat = Chat & {
  __typename?: 'DirectMessageChat';
  createdAt?: Maybe<Scalars['Date']>;
  createdBy: User;
  createdById: Scalars['HashId'];
  friend: Friend;
  id: Scalars['HashId'];
  isCreator: Scalars['Boolean'];
  messages: MessageConnection;
  updatedAt?: Maybe<Scalars['Date']>;
};


/** A Direct Message Chat is a conversation between 2 members */
export type DirectMessageChatMessagesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type Friend = KnownUser & User & {
  __typename?: 'Friend';
  chats: Array<Chat>;
  createdAt: Scalars['Date'];
  friends: FriendConnection;
  id: Scalars['HashId'];
  name?: Maybe<Scalars['String']>;
  updatedAt: Scalars['Date'];
  username: Scalars['String'];
};


export type FriendFriendsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type FriendConnection = {
  __typename?: 'FriendConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges?: Maybe<Array<Maybe<FriendEdge>>>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
};

export type FriendEdge = {
  __typename?: 'FriendEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node?: Maybe<Friend>;
};

export type FriendRequest = Notification & Request & {
  __typename?: 'FriendRequest';
  createdAt: Scalars['Date'];
  createdBy: User;
  createdById: Scalars['HashId'];
  id: Scalars['HashId'];
  recipient?: Maybe<User>;
  recipientId: Scalars['HashId'];
  status: RequestStatus;
};

export enum FriendStatus {
  Friend = 'FRIEND',
  NotFriend = 'NOT_FRIEND',
  RequestReceived = 'REQUEST_RECEIVED',
  RequestSent = 'REQUEST_SENT'
}

/** A Group Chat is a chat that contains more than 2 members */
export type GroupChat = Chat & {
  __typename?: 'GroupChat';
  createdAt?: Maybe<Scalars['Date']>;
  createdBy: User;
  createdById: Scalars['HashId'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['HashId'];
  isCreator: Scalars['Boolean'];
  memberCount: Scalars['Int'];
  members: Array<User>;
  messages: MessageConnection;
  name: Scalars['String'];
  updatedAt?: Maybe<Scalars['Date']>;
};


/** A Group Chat is a chat that contains more than 2 members */
export type GroupChatMessagesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type InstantMessage = Message & {
  __typename?: 'InstantMessage';
  chat: Chat;
  chatId: Scalars['HashId'];
  content: Scalars['String'];
  createdAt: Scalars['Date'];
  createdBy: User;
  createdById: Scalars['HashId'];
  id: Scalars['HashId'];
  isCreator: Scalars['Boolean'];
  likedBy: Array<User>;
  updatedAt: Scalars['Date'];
};

export type KnownUser = {
  chats: Array<Chat>;
  friends: FriendConnection;
};


export type KnownUserFriendsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type Me = KnownUser & User & {
  __typename?: 'Me';
  chats: Array<Chat>;
  createdAt: Scalars['Date'];
  friendRequests: Array<FriendRequest>;
  friends: FriendConnection;
  id: Scalars['HashId'];
  name?: Maybe<Scalars['String']>;
  updatedAt: Scalars['Date'];
  username: Scalars['String'];
};


export type MeFriendRequestsArgs = {
  status?: InputMaybe<RequestStatus>;
};


export type MeFriendsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type Message = {
  chat: Chat;
  chatId: Scalars['HashId'];
  createdAt: Scalars['Date'];
  createdBy: User;
  createdById: Scalars['HashId'];
  id: Scalars['HashId'];
  isCreator: Scalars['Boolean'];
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
  /** Accept a friend request */
  acceptFriendRequest?: Maybe<FriendRequest>;
  /** Cancel/Delete a sent Friend Request */
  cancelFriendRequest?: Maybe<FriendRequest>;
  /** Create a Chat */
  createDirectMessageChat?: Maybe<DirectMessageChat>;
  /** Create a Chat */
  createGroupChat?: Maybe<GroupChat>;
  /** Create a Message in a Chat */
  createMessage?: Maybe<InstantMessage>;
  /** Decline a received Friend Request */
  declineFriendRequest?: Maybe<FriendRequest>;
  /** Delete a Chat */
  deleteChat?: Maybe<DeletedChat>;
  /** Delete a Friend */
  deleteFriend?: Maybe<Stranger>;
  /** Delete a Message */
  deleteMessage?: Maybe<DeletedMessage>;
  /** Send a friend request to a user */
  sendFriendRequest?: Maybe<FriendRequest>;
  /** Update a Chat */
  updateGroupChat?: Maybe<GroupChat>;
  /** Update a Message */
  updateMessage?: Maybe<InstantMessage>;
  /** Update current user */
  updateUser?: Maybe<Me>;
};


export type MutationAcceptFriendRequestArgs = {
  friendRequestId: Scalars['HashId'];
};


export type MutationCancelFriendRequestArgs = {
  friendRequestId: Scalars['HashId'];
};


export type MutationCreateDirectMessageChatArgs = {
  friendId: Scalars['HashId'];
};


export type MutationCreateGroupChatArgs = {
  data?: InputMaybe<CreateGroupChatInput>;
};


export type MutationCreateMessageArgs = {
  chatId: Scalars['HashId'];
  content: Scalars['String'];
};


export type MutationDeclineFriendRequestArgs = {
  friendRequestId: Scalars['HashId'];
};


export type MutationDeleteChatArgs = {
  chatId: Scalars['HashId'];
};


export type MutationDeleteFriendArgs = {
  friendId: Scalars['HashId'];
};


export type MutationDeleteMessageArgs = {
  messageId: Scalars['HashId'];
};


export type MutationSendFriendRequestArgs = {
  friendId: Scalars['HashId'];
};


export type MutationUpdateGroupChatArgs = {
  data?: InputMaybe<UpdateGroupChatInput>;
};


export type MutationUpdateMessageArgs = {
  content: Scalars['String'];
  messageId: Scalars['HashId'];
};


export type MutationUpdateUserArgs = {
  name: Scalars['String'];
};

export type Notification = {
  createdAt: Scalars['Date'];
  createdBy: User;
  createdById: Scalars['HashId'];
  id: Scalars['HashId'];
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
  chatInvites: Array<ChatInvite>;
  chats: Array<Chat>;
  friendRequests: Array<FriendRequest>;
  friends: Array<Friend>;
  me?: Maybe<Me>;
  /** Get a message by id */
  message?: Maybe<InstantMessage>;
  messages: MessageConnection;
  notifications: Array<Notification>;
  user?: Maybe<User>;
  /** Find users */
  users: UserConnection;
};


export type QueryChatArgs = {
  chatId: Scalars['HashId'];
};


export type QueryChatInvitesArgs = {
  status?: InputMaybe<RequestStatus>;
};


export type QueryFriendRequestsArgs = {
  status?: InputMaybe<RequestStatus>;
};


export type QueryMessageArgs = {
  messageId: Scalars['HashId'];
};


export type QueryMessagesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  chatId: Scalars['HashId'];
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryUserArgs = {
  userId: Scalars['HashId'];
};


export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserOrderBy>;
  usernameFilter?: InputMaybe<Scalars['String']>;
};

export type Request = {
  createdAt: Scalars['Date'];
  createdBy: User;
  createdById: Scalars['HashId'];
  id: Scalars['HashId'];
  recipient?: Maybe<User>;
  recipientId: Scalars['HashId'];
  status: RequestStatus;
};

export enum RequestStatus {
  Accepted = 'ACCEPTED',
  Cancelled = 'CANCELLED',
  Declined = 'DECLINED',
  Seen = 'SEEN',
  Sent = 'SENT'
}

export enum Sort {
  Asc = 'asc',
  Desc = 'desc'
}

export type Stranger = User & {
  __typename?: 'Stranger';
  createdAt: Scalars['Date'];
  friendStatus: FriendStatus;
  id: Scalars['HashId'];
  mutualFriends: FriendConnection;
  name?: Maybe<Scalars['String']>;
  updatedAt: Scalars['Date'];
  username: Scalars['String'];
};


export type StrangerMutualFriendsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  chatCreated?: Maybe<Chat>;
  chatDeleted?: Maybe<DeletedChat>;
  chatUpdated?: Maybe<Chat>;
  chats?: Maybe<Chat>;
  /** Subscribe to friend requests */
  friendRequests?: Maybe<Message>;
  /** SUbscribe to created messages in chat */
  messageCreated?: Maybe<InstantMessage>;
  /** Subscribe to deleted messages in chat */
  messageDeleted?: Maybe<DeletedMessage>;
  /** Subscribe to updated messages in chat */
  messageUpdated?: Maybe<Message>;
  /** Subscribe to any created/updated/deleted messages */
  messages?: Maybe<Message>;
  notifications?: Maybe<Notification>;
};


export type SubscriptionMessageCreatedArgs = {
  chatId: Scalars['HashId'];
};


export type SubscriptionMessageDeletedArgs = {
  chatId: Scalars['HashId'];
};


export type SubscriptionMessageUpdatedArgs = {
  chatId: Scalars['HashId'];
};


export type SubscriptionMessagesArgs = {
  chatId: Scalars['HashId'];
};

export type UpdateGroupChatInput = {
  /** Ids of users to be add into the chat */
  addMemberIds?: InputMaybe<Array<Scalars['HashId']>>;
  /** Id of chat to update */
  chatId: Scalars['HashId'];
  /** New description for chat */
  description?: InputMaybe<Scalars['String']>;
  /** New name for chat */
  name?: InputMaybe<Scalars['String']>;
  /** Ids of users to be removed from chat */
  removeMemberIds?: InputMaybe<Array<Scalars['HashId']>>;
};

export type User = {
  createdAt: Scalars['Date'];
  id: Scalars['HashId'];
  name?: Maybe<Scalars['String']>;
  updatedAt: Scalars['Date'];
  username: Scalars['String'];
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

type NameParts_Friend_Fragment = { __typename?: 'Friend', name?: string | null, username: string };

type NameParts_Me_Fragment = { __typename?: 'Me', name?: string | null, username: string };

type NameParts_Stranger_Fragment = { __typename?: 'Stranger', name?: string | null, username: string };

export type NamePartsFragment = NameParts_Friend_Fragment | NameParts_Me_Fragment | NameParts_Stranger_Fragment;

export type AcceptFriendRequestMutationVariables = Exact<{
  friendRequestId: Scalars['HashId'];
}>;


export type AcceptFriendRequestMutation = { __typename?: 'Mutation', acceptFriendRequest?: { __typename?: 'FriendRequest', id: any, status: RequestStatus } | null };

export type CancelFriendRequestMutationVariables = Exact<{
  friendRequestId: Scalars['HashId'];
}>;


export type CancelFriendRequestMutation = { __typename?: 'Mutation', cancelFriendRequest?: { __typename?: 'FriendRequest', id: any, status: RequestStatus } | null };

export type CreateDirectMessageChatMutationVariables = Exact<{
  friendId: Scalars['HashId'];
}>;


export type CreateDirectMessageChatMutation = { __typename?: 'Mutation', createDirectMessageChat?: { __typename?: 'DirectMessageChat', id: any, friend: { __typename?: 'Friend', id: any } } | null };

export type CreateGroupChatMutationVariables = Exact<{
  data?: InputMaybe<CreateGroupChatInput>;
}>;


export type CreateGroupChatMutation = { __typename?: 'Mutation', createGroupChat?: { __typename?: 'GroupChat', id: any, name: string, description?: string | null, members: Array<{ __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', id: any }> } | null };

export type CreateMessageMutationVariables = Exact<{
  chatId: Scalars['HashId'];
  content: Scalars['String'];
}>;


export type CreateMessageMutation = { __typename?: 'Mutation', createMessage?: { __typename?: 'InstantMessage', id: any, content: string, isCreator: boolean } | null };

export type DeclineFriendRequestMutationVariables = Exact<{
  friendRequestId: Scalars['HashId'];
}>;


export type DeclineFriendRequestMutation = { __typename?: 'Mutation', declineFriendRequest?: { __typename?: 'FriendRequest', id: any, status: RequestStatus } | null };

export type DeleteChatMutationVariables = Exact<{
  chatId: Scalars['HashId'];
}>;


export type DeleteChatMutation = { __typename?: 'Mutation', deleteChat?: { __typename?: 'DeletedChat', id: any, deletedAt: any } | null };

export type DeleteFriendMutationVariables = Exact<{
  friendId: Scalars['HashId'];
}>;


export type DeleteFriendMutation = { __typename?: 'Mutation', deleteFriend?: { __typename?: 'Stranger', id: any, friendStatus: FriendStatus } | null };

export type DeleteMessageMutationVariables = Exact<{
  messageId: Scalars['HashId'];
}>;


export type DeleteMessageMutation = { __typename?: 'Mutation', deleteMessage?: { __typename?: 'DeletedMessage', id: any, deletedAt?: any | null } | null };

export type SendFriendRequestMutationVariables = Exact<{
  friendId: Scalars['HashId'];
}>;


export type SendFriendRequestMutation = { __typename?: 'Mutation', sendFriendRequest?: { __typename?: 'FriendRequest', id: any, status: RequestStatus } | null };

export type UpdateGroupChatMutationVariables = Exact<{
  data?: InputMaybe<UpdateGroupChatInput>;
}>;


export type UpdateGroupChatMutation = { __typename?: 'Mutation', updateGroupChat?: { __typename?: 'GroupChat', id: any, name: string, description?: string | null, members: Array<{ __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', id: any }> } | null };

export type UpdateMessageMutationVariables = Exact<{
  messageId: Scalars['HashId'];
  content: Scalars['String'];
}>;


export type UpdateMessageMutation = { __typename?: 'Mutation', updateMessage?: { __typename?: 'InstantMessage', id: any, content: string } | null };

export type UpdateUserMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser?: { __typename?: 'Me', id: any, name?: string | null, username: string } | null };

export type GetChatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetChatsQuery = { __typename?: 'Query', chats: Array<{ __typename: 'DeletedChat', deletedAt: any, id: any, createdBy: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', id: any, name?: string | null, username: string } } | { __typename: 'DirectMessageChat', id: any, createdBy: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', id: any, name?: string | null, username: string } } | { __typename: 'GroupChat', name: string, memberCount: number, id: any, createdBy: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', id: any, name?: string | null, username: string } }> };

export type GetFriendsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFriendsQuery = { __typename?: 'Query', friends: Array<{ __typename?: 'Friend', id: any, name?: string | null, username: string }> };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', me?: { __typename?: 'Me', id: any, name?: string | null, username: string } | null };

export type GetMessagesQueryVariables = Exact<{
  chatId: Scalars['HashId'];
  first?: InputMaybe<Scalars['Int']>;
}>;


export type GetMessagesQuery = { __typename?: 'Query', messages: { __typename?: 'MessageConnection', pageInfo: { __typename?: 'PageInfo', hasPreviousPage: boolean, startCursor?: string | null }, edges?: Array<{ __typename?: 'MessageEdge', cursor: string, node?: { __typename: 'DeletedMessage', deletedAt?: any | null, id: any, isCreator: boolean, createdAt: any, createdBy: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', id: any, name?: string | null, username: string } } | { __typename: 'InstantMessage', content: string, id: any, isCreator: boolean, createdAt: any, createdBy: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', id: any, name?: string | null, username: string } } | null } | null> | null } };

export type GetNotificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNotificationsQuery = { __typename?: 'Query', notifications: Array<{ __typename?: 'ChatInvite', status: RequestStatus, id: any, createdAt: any, chat?: { __typename: 'DeletedChat' } | { __typename: 'DirectMessageChat' } | { __typename: 'GroupChat', name: string, memberCount: number } | null, createdBy: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', id: any, name?: string | null, username: string } } | { __typename?: 'FriendRequest', status: RequestStatus, id: any, createdAt: any, createdBy: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', id: any, name?: string | null, username: string } }> };

export type GetUserQueryVariables = Exact<{
  userId: Scalars['HashId'];
}>;


export type GetUserQuery = { __typename?: 'Query', user?: { __typename: 'Friend', id: any, name?: string | null, username: string } | { __typename: 'Me', id: any, name?: string | null, username: string } | { __typename: 'Stranger', friendStatus: FriendStatus, id: any, name?: string | null, username: string } | null };

export type GetUsersQueryVariables = Exact<{
  usernameFilter?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
}>;


export type GetUsersQuery = { __typename?: 'Query', users: { __typename?: 'UserConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null }, edges?: Array<{ __typename?: 'UserEdge', cursor: string, node?: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', friendStatus: FriendStatus, id: any, name?: string | null, username: string } | null } | null> | null } };

export type ChatsSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type ChatsSubscription = { __typename?: 'Subscription', chats?: { __typename: 'DeletedChat', deletedAt: any, id: any, createdBy: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', id: any, name?: string | null, username: string } } | { __typename: 'DirectMessageChat', id: any, createdBy: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', id: any, name?: string | null, username: string } } | { __typename: 'GroupChat', name: string, memberCount: number, id: any, createdBy: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', id: any, name?: string | null, username: string } } | null };

export type MessagesSubscriptionVariables = Exact<{
  chatId: Scalars['HashId'];
}>;


export type MessagesSubscription = { __typename?: 'Subscription', messages?: { __typename: 'DeletedMessage', deletedAt?: any | null, id: any, isCreator: boolean, createdAt: any, createdBy: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', id: any, name?: string | null, username: string } } | { __typename: 'InstantMessage', content: string, id: any, isCreator: boolean, createdAt: any, createdBy: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', id: any, name?: string | null, username: string } } | null };

export type NotificationsSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NotificationsSubscription = { __typename?: 'Subscription', notifications?: { __typename?: 'ChatInvite', status: RequestStatus, id: any, createdAt: any, chat?: { __typename: 'DeletedChat' } | { __typename: 'DirectMessageChat' } | { __typename: 'GroupChat', name: string, memberCount: number } | null, createdBy: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', id: any, name?: string | null, username: string } } | { __typename?: 'FriendRequest', status: RequestStatus, id: any, createdAt: any, createdBy: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', id: any, name?: string | null, username: string } } | null };

export const NamePartsFragmentDoc = gql`
    fragment NameParts on User {
  name
  username
}
    `;
export const AcceptFriendRequestDocument = gql`
    mutation AcceptFriendRequest($friendRequestId: HashId!) {
  acceptFriendRequest(friendRequestId: $friendRequestId) {
    id
    status
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
 *      friendRequestId: // value for 'friendRequestId'
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
    mutation CancelFriendRequest($friendRequestId: HashId!) {
  cancelFriendRequest(friendRequestId: $friendRequestId) {
    id
    status
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
 *      friendRequestId: // value for 'friendRequestId'
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
export const CreateDirectMessageChatDocument = gql`
    mutation CreateDirectMessageChat($friendId: HashId!) {
  createDirectMessageChat(friendId: $friendId) {
    id
    friend {
      id
    }
  }
}
    `;
export type CreateDirectMessageChatMutationFn = Apollo.MutationFunction<CreateDirectMessageChatMutation, CreateDirectMessageChatMutationVariables>;

/**
 * __useCreateDirectMessageChatMutation__
 *
 * To run a mutation, you first call `useCreateDirectMessageChatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDirectMessageChatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDirectMessageChatMutation, { data, loading, error }] = useCreateDirectMessageChatMutation({
 *   variables: {
 *      friendId: // value for 'friendId'
 *   },
 * });
 */
export function useCreateDirectMessageChatMutation(baseOptions?: Apollo.MutationHookOptions<CreateDirectMessageChatMutation, CreateDirectMessageChatMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDirectMessageChatMutation, CreateDirectMessageChatMutationVariables>(CreateDirectMessageChatDocument, options);
      }
export type CreateDirectMessageChatMutationHookResult = ReturnType<typeof useCreateDirectMessageChatMutation>;
export type CreateDirectMessageChatMutationResult = Apollo.MutationResult<CreateDirectMessageChatMutation>;
export type CreateDirectMessageChatMutationOptions = Apollo.BaseMutationOptions<CreateDirectMessageChatMutation, CreateDirectMessageChatMutationVariables>;
export const CreateGroupChatDocument = gql`
    mutation CreateGroupChat($data: CreateGroupChatInput) {
  createGroupChat(data: $data) {
    id
    name
    description
    members {
      id
    }
  }
}
    `;
export type CreateGroupChatMutationFn = Apollo.MutationFunction<CreateGroupChatMutation, CreateGroupChatMutationVariables>;

/**
 * __useCreateGroupChatMutation__
 *
 * To run a mutation, you first call `useCreateGroupChatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGroupChatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGroupChatMutation, { data, loading, error }] = useCreateGroupChatMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateGroupChatMutation(baseOptions?: Apollo.MutationHookOptions<CreateGroupChatMutation, CreateGroupChatMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateGroupChatMutation, CreateGroupChatMutationVariables>(CreateGroupChatDocument, options);
      }
export type CreateGroupChatMutationHookResult = ReturnType<typeof useCreateGroupChatMutation>;
export type CreateGroupChatMutationResult = Apollo.MutationResult<CreateGroupChatMutation>;
export type CreateGroupChatMutationOptions = Apollo.BaseMutationOptions<CreateGroupChatMutation, CreateGroupChatMutationVariables>;
export const CreateMessageDocument = gql`
    mutation CreateMessage($chatId: HashId!, $content: String!) {
  createMessage(chatId: $chatId, content: $content) {
    id
    content
    isCreator
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
 *      chatId: // value for 'chatId'
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
    mutation DeclineFriendRequest($friendRequestId: HashId!) {
  declineFriendRequest(friendRequestId: $friendRequestId) {
    id
    status
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
 *      friendRequestId: // value for 'friendRequestId'
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
export const DeleteChatDocument = gql`
    mutation DeleteChat($chatId: HashId!) {
  deleteChat(chatId: $chatId) {
    id
    deletedAt
  }
}
    `;
export type DeleteChatMutationFn = Apollo.MutationFunction<DeleteChatMutation, DeleteChatMutationVariables>;

/**
 * __useDeleteChatMutation__
 *
 * To run a mutation, you first call `useDeleteChatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteChatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteChatMutation, { data, loading, error }] = useDeleteChatMutation({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useDeleteChatMutation(baseOptions?: Apollo.MutationHookOptions<DeleteChatMutation, DeleteChatMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteChatMutation, DeleteChatMutationVariables>(DeleteChatDocument, options);
      }
export type DeleteChatMutationHookResult = ReturnType<typeof useDeleteChatMutation>;
export type DeleteChatMutationResult = Apollo.MutationResult<DeleteChatMutation>;
export type DeleteChatMutationOptions = Apollo.BaseMutationOptions<DeleteChatMutation, DeleteChatMutationVariables>;
export const DeleteFriendDocument = gql`
    mutation DeleteFriend($friendId: HashId!) {
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
export const DeleteMessageDocument = gql`
    mutation DeleteMessage($messageId: HashId!) {
  deleteMessage(messageId: $messageId) {
    id
    deletedAt
  }
}
    `;
export type DeleteMessageMutationFn = Apollo.MutationFunction<DeleteMessageMutation, DeleteMessageMutationVariables>;

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
 *      messageId: // value for 'messageId'
 *   },
 * });
 */
export function useDeleteMessageMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMessageMutation, DeleteMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMessageMutation, DeleteMessageMutationVariables>(DeleteMessageDocument, options);
      }
export type DeleteMessageMutationHookResult = ReturnType<typeof useDeleteMessageMutation>;
export type DeleteMessageMutationResult = Apollo.MutationResult<DeleteMessageMutation>;
export type DeleteMessageMutationOptions = Apollo.BaseMutationOptions<DeleteMessageMutation, DeleteMessageMutationVariables>;
export const SendFriendRequestDocument = gql`
    mutation SendFriendRequest($friendId: HashId!) {
  sendFriendRequest(friendId: $friendId) {
    id
    status
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
export const UpdateGroupChatDocument = gql`
    mutation UpdateGroupChat($data: UpdateGroupChatInput) {
  updateGroupChat(data: $data) {
    id
    name
    description
    members {
      id
    }
  }
}
    `;
export type UpdateGroupChatMutationFn = Apollo.MutationFunction<UpdateGroupChatMutation, UpdateGroupChatMutationVariables>;

/**
 * __useUpdateGroupChatMutation__
 *
 * To run a mutation, you first call `useUpdateGroupChatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateGroupChatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateGroupChatMutation, { data, loading, error }] = useUpdateGroupChatMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateGroupChatMutation(baseOptions?: Apollo.MutationHookOptions<UpdateGroupChatMutation, UpdateGroupChatMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateGroupChatMutation, UpdateGroupChatMutationVariables>(UpdateGroupChatDocument, options);
      }
export type UpdateGroupChatMutationHookResult = ReturnType<typeof useUpdateGroupChatMutation>;
export type UpdateGroupChatMutationResult = Apollo.MutationResult<UpdateGroupChatMutation>;
export type UpdateGroupChatMutationOptions = Apollo.BaseMutationOptions<UpdateGroupChatMutation, UpdateGroupChatMutationVariables>;
export const UpdateMessageDocument = gql`
    mutation UpdateMessage($messageId: HashId!, $content: String!) {
  updateMessage(messageId: $messageId, content: $content) {
    id
    content
  }
}
    `;
export type UpdateMessageMutationFn = Apollo.MutationFunction<UpdateMessageMutation, UpdateMessageMutationVariables>;

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
 *      messageId: // value for 'messageId'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useUpdateMessageMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMessageMutation, UpdateMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMessageMutation, UpdateMessageMutationVariables>(UpdateMessageDocument, options);
      }
export type UpdateMessageMutationHookResult = ReturnType<typeof useUpdateMessageMutation>;
export type UpdateMessageMutationResult = Apollo.MutationResult<UpdateMessageMutation>;
export type UpdateMessageMutationOptions = Apollo.BaseMutationOptions<UpdateMessageMutation, UpdateMessageMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($name: String!) {
  updateUser(name: $name) {
    id
    ...NameParts
  }
}
    ${NamePartsFragmentDoc}`;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

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
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const GetChatsDocument = gql`
    query GetChats {
  chats {
    __typename
    id
    createdBy {
      id
      ...NameParts
    }
    ... on GroupChat {
      name
      memberCount
    }
    ... on DeletedChat {
      deletedAt
    }
  }
}
    ${NamePartsFragmentDoc}`;

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
export function useGetChatsQuery(baseOptions?: Apollo.QueryHookOptions<GetChatsQuery, GetChatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetChatsQuery, GetChatsQueryVariables>(GetChatsDocument, options);
      }
export function useGetChatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChatsQuery, GetChatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetChatsQuery, GetChatsQueryVariables>(GetChatsDocument, options);
        }
export type GetChatsQueryHookResult = ReturnType<typeof useGetChatsQuery>;
export type GetChatsLazyQueryHookResult = ReturnType<typeof useGetChatsLazyQuery>;
export type GetChatsQueryResult = Apollo.QueryResult<GetChatsQuery, GetChatsQueryVariables>;
export const GetFriendsDocument = gql`
    query GetFriends {
  friends {
    id
    ...NameParts
  }
}
    ${NamePartsFragmentDoc}`;

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
    ...NameParts
  }
}
    ${NamePartsFragmentDoc}`;

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
export const GetMessagesDocument = gql`
    query GetMessages($chatId: HashId!, $first: Int) {
  messages(chatId: $chatId, first: $first) {
    pageInfo {
      hasPreviousPage
      startCursor
    }
    edges {
      cursor
      node {
        __typename
        id
        isCreator
        createdAt
        createdBy {
          id
          ...NameParts
        }
        ... on DeletedMessage {
          deletedAt
        }
        ... on InstantMessage {
          content
        }
      }
    }
  }
}
    ${NamePartsFragmentDoc}`;

/**
 * __useGetMessagesQuery__
 *
 * To run a query within a React component, call `useGetMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMessagesQuery({
 *   variables: {
 *      chatId: // value for 'chatId'
 *      first: // value for 'first'
 *   },
 * });
 */
export function useGetMessagesQuery(baseOptions: Apollo.QueryHookOptions<GetMessagesQuery, GetMessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMessagesQuery, GetMessagesQueryVariables>(GetMessagesDocument, options);
      }
export function useGetMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMessagesQuery, GetMessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMessagesQuery, GetMessagesQueryVariables>(GetMessagesDocument, options);
        }
export type GetMessagesQueryHookResult = ReturnType<typeof useGetMessagesQuery>;
export type GetMessagesLazyQueryHookResult = ReturnType<typeof useGetMessagesLazyQuery>;
export type GetMessagesQueryResult = Apollo.QueryResult<GetMessagesQuery, GetMessagesQueryVariables>;
export const GetNotificationsDocument = gql`
    query GetNotifications {
  notifications {
    id
    createdAt
    createdBy {
      id
      ...NameParts
    }
    ... on ChatInvite {
      status
      chat {
        __typename
        ... on GroupChat {
          name
          memberCount
        }
      }
    }
    ... on FriendRequest {
      status
    }
  }
}
    ${NamePartsFragmentDoc}`;

/**
 * __useGetNotificationsQuery__
 *
 * To run a query within a React component, call `useGetNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNotificationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetNotificationsQuery(baseOptions?: Apollo.QueryHookOptions<GetNotificationsQuery, GetNotificationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNotificationsQuery, GetNotificationsQueryVariables>(GetNotificationsDocument, options);
      }
export function useGetNotificationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNotificationsQuery, GetNotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNotificationsQuery, GetNotificationsQueryVariables>(GetNotificationsDocument, options);
        }
export type GetNotificationsQueryHookResult = ReturnType<typeof useGetNotificationsQuery>;
export type GetNotificationsLazyQueryHookResult = ReturnType<typeof useGetNotificationsLazyQuery>;
export type GetNotificationsQueryResult = Apollo.QueryResult<GetNotificationsQuery, GetNotificationsQueryVariables>;
export const GetUserDocument = gql`
    query GetUser($userId: HashId!) {
  user(userId: $userId) {
    __typename
    id
    ...NameParts
    ... on Stranger {
      friendStatus
    }
  }
}
    ${NamePartsFragmentDoc}`;

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
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
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
        ... on Stranger {
          friendStatus
        }
      }
    }
  }
}
    ${NamePartsFragmentDoc}`;

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
export const ChatsDocument = gql`
    subscription Chats {
  chats {
    __typename
    id
    createdBy {
      id
      ...NameParts
    }
    ... on GroupChat {
      name
      memberCount
    }
    ... on DeletedChat {
      deletedAt
    }
  }
}
    ${NamePartsFragmentDoc}`;

/**
 * __useChatsSubscription__
 *
 * To run a query within a React component, call `useChatsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useChatsSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatsSubscription({
 *   variables: {
 *   },
 * });
 */
export function useChatsSubscription(baseOptions?: Apollo.SubscriptionHookOptions<ChatsSubscription, ChatsSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<ChatsSubscription, ChatsSubscriptionVariables>(ChatsDocument, options);
      }
export type ChatsSubscriptionHookResult = ReturnType<typeof useChatsSubscription>;
export type ChatsSubscriptionResult = Apollo.SubscriptionResult<ChatsSubscription>;
export const MessagesDocument = gql`
    subscription Messages($chatId: HashId!) {
  messages(chatId: $chatId) {
    __typename
    id
    isCreator
    createdAt
    createdBy {
      id
      ...NameParts
    }
    ... on InstantMessage {
      content
    }
    ... on DeletedMessage {
      deletedAt
    }
  }
}
    ${NamePartsFragmentDoc}`;

/**
 * __useMessagesSubscription__
 *
 * To run a query within a React component, call `useMessagesSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMessagesSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessagesSubscription({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useMessagesSubscription(baseOptions: Apollo.SubscriptionHookOptions<MessagesSubscription, MessagesSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<MessagesSubscription, MessagesSubscriptionVariables>(MessagesDocument, options);
      }
export type MessagesSubscriptionHookResult = ReturnType<typeof useMessagesSubscription>;
export type MessagesSubscriptionResult = Apollo.SubscriptionResult<MessagesSubscription>;
export const NotificationsDocument = gql`
    subscription Notifications {
  notifications {
    id
    createdAt
    createdBy {
      id
      ...NameParts
    }
    ... on ChatInvite {
      status
      chat {
        __typename
        ... on GroupChat {
          name
          memberCount
        }
      }
    }
    ... on FriendRequest {
      status
    }
  }
}
    ${NamePartsFragmentDoc}`;

/**
 * __useNotificationsSubscription__
 *
 * To run a query within a React component, call `useNotificationsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNotificationsSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotificationsSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNotificationsSubscription(baseOptions?: Apollo.SubscriptionHookOptions<NotificationsSubscription, NotificationsSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NotificationsSubscription, NotificationsSubscriptionVariables>(NotificationsDocument, options);
      }
export type NotificationsSubscriptionHookResult = ReturnType<typeof useNotificationsSubscription>;
export type NotificationsSubscriptionResult = Apollo.SubscriptionResult<NotificationsSubscription>;