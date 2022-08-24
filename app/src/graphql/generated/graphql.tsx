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
  isCreator: Scalars['Boolean'];
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

export type DeletedMessage = Event & {
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
  messages: MessageResultConnection;
  updatedAt?: Maybe<Scalars['Date']>;
};


/** A Direct Message Chat is a conversation between 2 members */
export type DirectMessageChatMessagesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type Event = {
  chat: Chat;
  chatId: Scalars['HashId'];
  createdAt: Scalars['Date'];
  createdBy: User;
  createdById: Scalars['HashId'];
  id: Scalars['HashId'];
  isCreator: Scalars['Boolean'];
  updatedAt: Scalars['Date'];
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
  isCreator: Scalars['Boolean'];
  recipient?: Maybe<User>;
  recipientId: Scalars['HashId'];
  status: RequestStatus;
};

/** A Group Chat is a chat that contains more than 2 members */
export type GroupChat = Chat & {
  __typename?: 'GroupChat';
  adminIds: Array<Scalars['HashId']>;
  admins: Array<User>;
  createdAt?: Maybe<Scalars['Date']>;
  createdBy: User;
  createdById: Scalars['HashId'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['HashId'];
  isAdmin: Scalars['Boolean'];
  isCreator: Scalars['Boolean'];
  memberCount: Scalars['Int'];
  members: Array<User>;
  messages: MessageResultConnection;
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

export type Message = Event & {
  __typename?: 'Message';
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

export type MessageResult = DeletedMessage | Message;

export type MessageResultConnection = {
  __typename?: 'MessageResultConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges?: Maybe<Array<Maybe<MessageResultEdge>>>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
};

export type MessageResultEdge = {
  __typename?: 'MessageResultEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node?: Maybe<MessageResult>;
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
  createMessage?: Maybe<Message>;
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
  updateMessage?: Maybe<Message>;
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
  data: CreateGroupChatInput;
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
  data: UpdateGroupChatInput;
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
  isCreator: Scalars['Boolean'];
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
  message?: Maybe<MessageResult>;
  messages: MessageResultConnection;
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
  isCreator: Scalars['Boolean'];
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
  friendRequest?: Maybe<FriendRequest>;
  id: Scalars['HashId'];
  mutualFriends: FriendConnection;
  name?: Maybe<Scalars['String']>;
  status: StrangerStatus;
  updatedAt: Scalars['Date'];
  username: Scalars['String'];
};


export type StrangerMutualFriendsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export enum StrangerStatus {
  NoRequest = 'NO_REQUEST',
  RequestReceived = 'REQUEST_RECEIVED',
  RequestSent = 'REQUEST_SENT'
}

export type Subscription = {
  __typename?: 'Subscription';
  chatCreated?: Maybe<Chat>;
  chatDeleted?: Maybe<DeletedChat>;
  chatUpdated?: Maybe<Chat>;
  chats?: Maybe<Chat>;
  /** Subscribe to friend requests */
  friendRequests?: Maybe<FriendRequest>;
  friends?: Maybe<User>;
  /** SUbscribe to created messages in chat */
  messageCreated?: Maybe<Message>;
  /** Subscribe to deleted messages in chat */
  messageDeleted?: Maybe<DeletedMessage>;
  /** Subscribe to updated messages in chat */
  messageUpdated?: Maybe<MessageResult>;
  /** Subscribe to any created/updated/deleted messages */
  messages?: Maybe<MessageResult>;
  notifications?: Maybe<Notification>;
};


export type SubscriptionMessageCreatedArgs = {
  chatId?: InputMaybe<Scalars['HashId']>;
};


export type SubscriptionMessageDeletedArgs = {
  chatId?: InputMaybe<Scalars['HashId']>;
};


export type SubscriptionMessageUpdatedArgs = {
  chatId?: InputMaybe<Scalars['HashId']>;
};


export type SubscriptionMessagesArgs = {
  chatId?: InputMaybe<Scalars['HashId']>;
};

export type UpdateGroupChatInput = {
  /** Ids of admins to be add into the chat */
  addAdminIds?: InputMaybe<Array<Scalars['HashId']>>;
  /** Ids of members to be added into the chat */
  addMemberIds?: InputMaybe<Array<Scalars['HashId']>>;
  /** Id of chat to update */
  chatId: Scalars['HashId'];
  /** New description for chat */
  description?: InputMaybe<Scalars['String']>;
  /** New name for chat */
  name?: InputMaybe<Scalars['String']>;
  /** Ids of admins to be removed from chat */
  removeAdminIds?: InputMaybe<Array<Scalars['HashId']>>;
  /** Ids of members to be removed from chat */
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

export type GetChatForChatInfoAsideQueryVariables = Exact<{
  chatId: Scalars['HashId'];
}>;


export type GetChatForChatInfoAsideQuery = { __typename?: 'Query', chat?: { __typename: 'DeletedChat' } | { __typename: 'DirectMessageChat', friend: { __typename?: 'Friend', username: string } } | { __typename: 'GroupChat', name: string, members: Array<{ __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null }> } | null };

type ChatPanelMessage_DeletedMessage_Fragment = { __typename: 'DeletedMessage', createdAt: any, isCreator: boolean, id: any, deletedAt?: any | null, createdBy: { __typename?: 'Friend', username: string } | { __typename?: 'Me', username: string } | { __typename?: 'Stranger', username: string } };

type ChatPanelMessage_Message_Fragment = { __typename: 'Message', createdAt: any, isCreator: boolean, id: any, content: string, createdBy: { __typename?: 'Friend', username: string } | { __typename?: 'Me', username: string } | { __typename?: 'Stranger', username: string } };

export type ChatPanelMessageFragment = ChatPanelMessage_DeletedMessage_Fragment | ChatPanelMessage_Message_Fragment;

export type GetMessagesQueryVariables = Exact<{
  chatId: Scalars['HashId'];
  last?: InputMaybe<Scalars['Int']>;
  before?: InputMaybe<Scalars['String']>;
}>;


export type GetMessagesQuery = { __typename?: 'Query', messages: { __typename?: 'MessageResultConnection', pageInfo: { __typename?: 'PageInfo', hasPreviousPage: boolean, startCursor?: string | null }, edges?: Array<{ __typename?: 'MessageResultEdge', node?: { __typename: 'DeletedMessage', createdAt: any, isCreator: boolean, id: any, deletedAt?: any | null, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename: 'Message', createdAt: any, isCreator: boolean, id: any, content: string, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | null } | null> | null } };

export type MessagesSubscriptionVariables = Exact<{
  chatId?: InputMaybe<Scalars['HashId']>;
}>;


export type MessagesSubscription = { __typename?: 'Subscription', messages?: { __typename: 'DeletedMessage', createdAt: any, isCreator: boolean, id: any, deletedAt?: any | null, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename: 'Message', createdAt: any, isCreator: boolean, id: any, content: string, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | null };

type UseMessageEvent_DeletedMessage_Fragment = { __typename?: 'DeletedMessage', createdAt: any, createdBy: { __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', id: any } };

type UseMessageEvent_Message_Fragment = { __typename?: 'Message', createdAt: any, createdBy: { __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', id: any } };

export type UseMessageEventFragment = UseMessageEvent_DeletedMessage_Fragment | UseMessageEvent_Message_Fragment;

type UseMessage_DeletedMessage_Fragment = { __typename?: 'DeletedMessage', createdAt: any, createdBy: { __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', id: any } };

type UseMessage_Message_Fragment = { __typename?: 'Message', createdAt: any, createdBy: { __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', id: any } };

export type UseMessageFragment = UseMessage_DeletedMessage_Fragment | UseMessage_Message_Fragment;

type EventAvatar_DeletedMessage_Fragment = { __typename?: 'DeletedMessage', createdBy: { __typename?: 'Friend', username: string } | { __typename?: 'Me', username: string } | { __typename?: 'Stranger', username: string } };

type EventAvatar_Message_Fragment = { __typename?: 'Message', createdBy: { __typename?: 'Friend', username: string } | { __typename?: 'Me', username: string } | { __typename?: 'Stranger', username: string } };

export type EventAvatarFragment = EventAvatar_DeletedMessage_Fragment | EventAvatar_Message_Fragment;

type EventContainer_DeletedMessage_Fragment = { __typename: 'DeletedMessage', createdAt: any, isCreator: boolean };

type EventContainer_Message_Fragment = { __typename: 'Message', createdAt: any, isCreator: boolean };

export type EventContainerFragment = EventContainer_DeletedMessage_Fragment | EventContainer_Message_Fragment;

type EventInfo_DeletedMessage_Fragment = { __typename?: 'DeletedMessage', createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', username: string } | { __typename?: 'Me', username: string } | { __typename?: 'Stranger', username: string } };

type EventInfo_Message_Fragment = { __typename?: 'Message', createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', username: string } | { __typename?: 'Me', username: string } | { __typename?: 'Stranger', username: string } };

export type EventInfoFragment = EventInfo_DeletedMessage_Fragment | EventInfo_Message_Fragment;

type IncomingEvent_DeletedMessage_Fragment = { __typename?: 'DeletedMessage', createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', username: string } | { __typename?: 'Me', username: string } | { __typename?: 'Stranger', username: string } };

type IncomingEvent_Message_Fragment = { __typename?: 'Message', createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', username: string } | { __typename?: 'Me', username: string } | { __typename?: 'Stranger', username: string } };

export type IncomingEventFragment = IncomingEvent_DeletedMessage_Fragment | IncomingEvent_Message_Fragment;

type MessageEvent_DeletedMessage_Fragment = { __typename: 'DeletedMessage', id: any, isCreator: boolean, deletedAt?: any | null, createdAt: any, createdBy: { __typename?: 'Friend', username: string } | { __typename?: 'Me', username: string } | { __typename?: 'Stranger', username: string } };

type MessageEvent_Message_Fragment = { __typename: 'Message', id: any, isCreator: boolean, content: string, createdAt: any, createdBy: { __typename?: 'Friend', username: string } | { __typename?: 'Me', username: string } | { __typename?: 'Stranger', username: string } };

export type MessageEventFragment = MessageEvent_DeletedMessage_Fragment | MessageEvent_Message_Fragment;

type MessageActions_DeletedMessage_Fragment = { __typename?: 'DeletedMessage', isCreator: boolean };

type MessageActions_Message_Fragment = { __typename?: 'Message', isCreator: boolean };

export type MessageActionsFragment = MessageActions_DeletedMessage_Fragment | MessageActions_Message_Fragment;

export type MessageBubbleFragment = { __typename?: 'Message', content: string };

type OutgoingEvent_DeletedMessage_Fragment = { __typename?: 'DeletedMessage', createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', username: string } | { __typename?: 'Me', username: string } | { __typename?: 'Stranger', username: string } };

type OutgoingEvent_Message_Fragment = { __typename?: 'Message', createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', username: string } | { __typename?: 'Me', username: string } | { __typename?: 'Stranger', username: string } };

export type OutgoingEventFragment = OutgoingEvent_DeletedMessage_Fragment | OutgoingEvent_Message_Fragment;

export type FriendRequestNotificationFragment = { __typename?: 'FriendRequest', id: any, createdAt: any, createdBy: { __typename?: 'Friend', username: string } | { __typename?: 'Me', username: string } | { __typename?: 'Stranger', username: string } };

export type GetUserSearchQueryVariables = Exact<{
  usernameFilter?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
}>;


export type GetUserSearchQuery = { __typename?: 'Query', users: { __typename?: 'UserConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null }, edges?: Array<{ __typename?: 'UserEdge', cursor: string, node?: { __typename: 'Friend', id: any, username: string, name?: string | null } | { __typename: 'Me', id: any, username: string, name?: string | null } | { __typename: 'Stranger', id: any, username: string, name?: string | null, status: StrangerStatus } | null } | null> | null } };

type ChatAvatar_DeletedChat_Fragment = { __typename: 'DeletedChat' };

type ChatAvatar_DirectMessageChat_Fragment = { __typename: 'DirectMessageChat', friend: { __typename?: 'Friend', username: string } };

type ChatAvatar_GroupChat_Fragment = { __typename: 'GroupChat', name: string };

export type ChatAvatarFragment = ChatAvatar_DeletedChat_Fragment | ChatAvatar_DirectMessageChat_Fragment | ChatAvatar_GroupChat_Fragment;

export type GetChatsForDisplayQueryVariables = Exact<{ [key: string]: never; }>;


export type GetChatsForDisplayQuery = { __typename?: 'Query', chats: Array<{ __typename: 'DeletedChat', id: any, createdBy: { __typename?: 'Friend', username: string } | { __typename?: 'Me', username: string } | { __typename?: 'Stranger', username: string } } | { __typename: 'DirectMessageChat', id: any, createdBy: { __typename?: 'Friend', username: string } | { __typename?: 'Me', username: string } | { __typename?: 'Stranger', username: string }, friend: { __typename?: 'Friend', username: string } } | { __typename: 'GroupChat', name: string, id: any, createdBy: { __typename?: 'Friend', username: string } | { __typename?: 'Me', username: string } | { __typename?: 'Stranger', username: string }, members: Array<{ __typename?: 'Friend', username: string } | { __typename?: 'Me', username: string } | { __typename?: 'Stranger', username: string }> }> };

type ChatItem_DeletedChat_Fragment = { __typename: 'DeletedChat', id: any };

type ChatItem_DirectMessageChat_Fragment = { __typename: 'DirectMessageChat', id: any, friend: { __typename?: 'Friend', username: string } };

type ChatItem_GroupChat_Fragment = { __typename: 'GroupChat', name: string, id: any, members: Array<{ __typename?: 'Friend', username: string } | { __typename?: 'Me', username: string } | { __typename?: 'Stranger', username: string }> };

export type ChatItemFragment = ChatItem_DeletedChat_Fragment | ChatItem_DirectMessageChat_Fragment | ChatItem_GroupChat_Fragment;

type UserAvatar_Friend_Fragment = { __typename?: 'Friend', username: string };

type UserAvatar_Me_Fragment = { __typename?: 'Me', username: string };

type UserAvatar_Stranger_Fragment = { __typename?: 'Stranger', username: string };

export type UserAvatarFragment = UserAvatar_Friend_Fragment | UserAvatar_Me_Fragment | UserAvatar_Stranger_Fragment;

type UserItem_Friend_Fragment = { __typename?: 'Friend', username: string, name?: string | null };

type UserItem_Me_Fragment = { __typename?: 'Me', username: string, name?: string | null };

type UserItem_Stranger_Fragment = { __typename?: 'Stranger', username: string, name?: string | null };

export type UserItemFragment = UserItem_Friend_Fragment | UserItem_Me_Fragment | UserItem_Stranger_Fragment;

type UserMenu_Friend_Fragment = { __typename: 'Friend' };

type UserMenu_Me_Fragment = { __typename: 'Me' };

type UserMenu_Stranger_Fragment = { __typename: 'Stranger', status: StrangerStatus };

export type UserMenuFragment = UserMenu_Friend_Fragment | UserMenu_Me_Fragment | UserMenu_Stranger_Fragment;

export const EventContainerFragmentDoc = gql`
    fragment EventContainer on Event {
  __typename
  createdAt
  isCreator
}
    `;
export const EventInfoFragmentDoc = gql`
    fragment EventInfo on Event {
  createdAt
  createdBy {
    username
  }
  isCreator
}
    `;
export const OutgoingEventFragmentDoc = gql`
    fragment OutgoingEvent on Event {
  ...EventInfo
}
    ${EventInfoFragmentDoc}`;
export const UserAvatarFragmentDoc = gql`
    fragment UserAvatar on User {
  username
}
    `;
export const IncomingEventFragmentDoc = gql`
    fragment IncomingEvent on Event {
  ...EventInfo
  createdBy {
    ...UserAvatar
  }
}
    ${EventInfoFragmentDoc}
${UserAvatarFragmentDoc}`;
export const MessageActionsFragmentDoc = gql`
    fragment MessageActions on MessageResult {
  ... on DeletedMessage {
    isCreator
  }
  ... on Message {
    isCreator
  }
}
    `;
export const MessageEventFragmentDoc = gql`
    fragment MessageEvent on MessageResult {
  __typename
  ... on Message {
    id
    isCreator
    content
    ...OutgoingEvent
    ...IncomingEvent
    ...MessageActions
  }
  ... on DeletedMessage {
    id
    ...OutgoingEvent
    ...IncomingEvent
    isCreator
    deletedAt
  }
}
    ${OutgoingEventFragmentDoc}
${IncomingEventFragmentDoc}
${MessageActionsFragmentDoc}`;
export const ChatPanelMessageFragmentDoc = gql`
    fragment ChatPanelMessage on Event {
  ...EventContainer
  ...MessageEvent
  createdAt
}
    ${EventContainerFragmentDoc}
${MessageEventFragmentDoc}`;
export const UseMessageEventFragmentDoc = gql`
    fragment UseMessageEvent on Event {
  createdAt
  createdBy {
    id
  }
}
    `;
export const UseMessageFragmentDoc = gql`
    fragment UseMessage on MessageResult {
  ... on Message {
    ...UseMessageEvent
  }
  ... on DeletedMessage {
    ...UseMessageEvent
  }
}
    ${UseMessageEventFragmentDoc}`;
export const EventAvatarFragmentDoc = gql`
    fragment EventAvatar on Event {
  createdBy {
    username
  }
}
    `;
export const MessageBubbleFragmentDoc = gql`
    fragment MessageBubble on Message {
  content
}
    `;
export const FriendRequestNotificationFragmentDoc = gql`
    fragment FriendRequestNotification on FriendRequest {
  id
  createdAt
  createdBy {
    ...UserAvatar
  }
}
    ${UserAvatarFragmentDoc}`;
export const ChatAvatarFragmentDoc = gql`
    fragment ChatAvatar on Chat {
  __typename
  ... on GroupChat {
    name
  }
  ... on DirectMessageChat {
    friend {
      username
    }
  }
}
    `;
export const ChatItemFragmentDoc = gql`
    fragment ChatItem on Chat {
  __typename
  id
  ...ChatAvatar
  ... on DirectMessageChat {
    friend {
      username
    }
  }
  ... on GroupChat {
    name
    members {
      username
    }
  }
}
    ${ChatAvatarFragmentDoc}`;
export const UserItemFragmentDoc = gql`
    fragment UserItem on User {
  username
  name
}
    `;
export const UserMenuFragmentDoc = gql`
    fragment UserMenu on User {
  __typename
  ... on Stranger {
    status
  }
}
    `;
export const GetChatForChatInfoAsideDocument = gql`
    query GetChatForChatInfoAside($chatId: HashId!) {
  chat(chatId: $chatId) {
    __typename
    ... on DirectMessageChat {
      friend {
        username
      }
    }
    ... on GroupChat {
      name
      members {
        id
        ...UserItem
      }
    }
  }
}
    ${UserItemFragmentDoc}`;

/**
 * __useGetChatForChatInfoAsideQuery__
 *
 * To run a query within a React component, call `useGetChatForChatInfoAsideQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChatForChatInfoAsideQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChatForChatInfoAsideQuery({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useGetChatForChatInfoAsideQuery(baseOptions: Apollo.QueryHookOptions<GetChatForChatInfoAsideQuery, GetChatForChatInfoAsideQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetChatForChatInfoAsideQuery, GetChatForChatInfoAsideQueryVariables>(GetChatForChatInfoAsideDocument, options);
      }
export function useGetChatForChatInfoAsideLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChatForChatInfoAsideQuery, GetChatForChatInfoAsideQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetChatForChatInfoAsideQuery, GetChatForChatInfoAsideQueryVariables>(GetChatForChatInfoAsideDocument, options);
        }
export type GetChatForChatInfoAsideQueryHookResult = ReturnType<typeof useGetChatForChatInfoAsideQuery>;
export type GetChatForChatInfoAsideLazyQueryHookResult = ReturnType<typeof useGetChatForChatInfoAsideLazyQuery>;
export type GetChatForChatInfoAsideQueryResult = Apollo.QueryResult<GetChatForChatInfoAsideQuery, GetChatForChatInfoAsideQueryVariables>;
export const GetMessagesDocument = gql`
    query GetMessages($chatId: HashId!, $last: Int, $before: String) {
  messages(chatId: $chatId, last: $last, before: $before) {
    pageInfo {
      hasPreviousPage
      startCursor
    }
    edges {
      node {
        ...ChatPanelMessage
        ...UseMessage
      }
    }
  }
}
    ${ChatPanelMessageFragmentDoc}
${UseMessageFragmentDoc}`;

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
 *      last: // value for 'last'
 *      before: // value for 'before'
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
export const MessagesDocument = gql`
    subscription Messages($chatId: HashId) {
  messages(chatId: $chatId) {
    ...ChatPanelMessage
    ...UseMessage
  }
}
    ${ChatPanelMessageFragmentDoc}
${UseMessageFragmentDoc}`;

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
export function useMessagesSubscription(baseOptions?: Apollo.SubscriptionHookOptions<MessagesSubscription, MessagesSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<MessagesSubscription, MessagesSubscriptionVariables>(MessagesDocument, options);
      }
export type MessagesSubscriptionHookResult = ReturnType<typeof useMessagesSubscription>;
export type MessagesSubscriptionResult = Apollo.SubscriptionResult<MessagesSubscription>;
export const GetUserSearchDocument = gql`
    query GetUserSearch($usernameFilter: String, $first: Int, $after: String) {
  users(usernameFilter: $usernameFilter, first: $first, after: $after) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      cursor
      node {
        id
        ...UserItem
        ...UserMenu
      }
    }
  }
}
    ${UserItemFragmentDoc}
${UserMenuFragmentDoc}`;

/**
 * __useGetUserSearchQuery__
 *
 * To run a query within a React component, call `useGetUserSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserSearchQuery({
 *   variables: {
 *      usernameFilter: // value for 'usernameFilter'
 *      first: // value for 'first'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useGetUserSearchQuery(baseOptions?: Apollo.QueryHookOptions<GetUserSearchQuery, GetUserSearchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserSearchQuery, GetUserSearchQueryVariables>(GetUserSearchDocument, options);
      }
export function useGetUserSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserSearchQuery, GetUserSearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserSearchQuery, GetUserSearchQueryVariables>(GetUserSearchDocument, options);
        }
export type GetUserSearchQueryHookResult = ReturnType<typeof useGetUserSearchQuery>;
export type GetUserSearchLazyQueryHookResult = ReturnType<typeof useGetUserSearchLazyQuery>;
export type GetUserSearchQueryResult = Apollo.QueryResult<GetUserSearchQuery, GetUserSearchQueryVariables>;
export const GetChatsForDisplayDocument = gql`
    query GetChatsForDisplay {
  chats {
    ...ChatItem
    createdBy {
      username
    }
  }
}
    ${ChatItemFragmentDoc}`;

/**
 * __useGetChatsForDisplayQuery__
 *
 * To run a query within a React component, call `useGetChatsForDisplayQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChatsForDisplayQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChatsForDisplayQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetChatsForDisplayQuery(baseOptions?: Apollo.QueryHookOptions<GetChatsForDisplayQuery, GetChatsForDisplayQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetChatsForDisplayQuery, GetChatsForDisplayQueryVariables>(GetChatsForDisplayDocument, options);
      }
export function useGetChatsForDisplayLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChatsForDisplayQuery, GetChatsForDisplayQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetChatsForDisplayQuery, GetChatsForDisplayQueryVariables>(GetChatsForDisplayDocument, options);
        }
export type GetChatsForDisplayQueryHookResult = ReturnType<typeof useGetChatsForDisplayQuery>;
export type GetChatsForDisplayLazyQueryHookResult = ReturnType<typeof useGetChatsForDisplayLazyQuery>;
export type GetChatsForDisplayQueryResult = Apollo.QueryResult<GetChatsForDisplayQuery, GetChatsForDisplayQueryVariables>;