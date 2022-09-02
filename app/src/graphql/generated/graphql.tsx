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


export type GetChatForChatInfoAsideQuery = { __typename?: 'Query', chat?: { __typename?: 'DeletedChat' } | { __typename?: 'DirectMessageChat', friend: { __typename?: 'Friend', username: string } } | { __typename?: 'GroupChat', name: string, members: Array<{ __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null, status: StrangerStatus, friendRequest?: { __typename?: 'FriendRequest', id: any, createdById: any, recipientId: any, isCreator: boolean } | null }> } | null };

export type GetMessagesQueryVariables = Exact<{
  chatId: Scalars['HashId'];
  last?: InputMaybe<Scalars['Int']>;
  before?: InputMaybe<Scalars['String']>;
}>;


export type GetMessagesQuery = { __typename?: 'Query', messages: { __typename?: 'MessageResultConnection', pageInfo: { __typename?: 'PageInfo', hasPreviousPage: boolean, startCursor?: string | null }, edges?: Array<{ __typename?: 'MessageResultEdge', node?: { __typename?: 'DeletedMessage', id: any, createdAt: any, isCreator: boolean, deletedAt?: any | null, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'Message', id: any, createdAt: any, isCreator: boolean, content: string, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | null } | null> | null } };

export type MessagesSubscriptionVariables = Exact<{
  chatId?: InputMaybe<Scalars['HashId']>;
}>;


export type MessagesSubscription = { __typename?: 'Subscription', messages?: { __typename?: 'DeletedMessage', id: any, createdAt: any, isCreator: boolean, deletedAt?: any | null, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'Message', id: any, createdAt: any, isCreator: boolean, content: string, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | null };

type UseMessageEvent_DeletedMessage_Fragment = { __typename?: 'DeletedMessage', id: any, createdAt: any, createdBy: { __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', id: any } };

type UseMessageEvent_Message_Fragment = { __typename?: 'Message', id: any, createdAt: any, createdBy: { __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', id: any } };

export type UseMessageEventFragment = UseMessageEvent_DeletedMessage_Fragment | UseMessageEvent_Message_Fragment;

type UseMessage_DeletedMessage_Fragment = { __typename?: 'DeletedMessage', id: any, createdAt: any, createdBy: { __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', id: any } };

type UseMessage_Message_Fragment = { __typename?: 'Message', id: any, createdAt: any, createdBy: { __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', id: any } };

export type UseMessageFragment = UseMessage_DeletedMessage_Fragment | UseMessage_Message_Fragment;

type ChatPanelMessage_DeletedMessage_Fragment = { __typename?: 'DeletedMessage', id: any, createdAt: any, isCreator: boolean, deletedAt?: any | null, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

type ChatPanelMessage_Message_Fragment = { __typename?: 'Message', id: any, createdAt: any, isCreator: boolean, content: string, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

export type ChatPanelMessageFragment = ChatPanelMessage_DeletedMessage_Fragment | ChatPanelMessage_Message_Fragment;

type EventAvatar_DeletedMessage_Fragment = { __typename?: 'DeletedMessage', id: any, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

type EventAvatar_Message_Fragment = { __typename?: 'Message', id: any, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

export type EventAvatarFragment = EventAvatar_DeletedMessage_Fragment | EventAvatar_Message_Fragment;

type EventContainer_DeletedMessage_Fragment = { __typename?: 'DeletedMessage', id: any, createdAt: any, isCreator: boolean };

type EventContainer_Message_Fragment = { __typename?: 'Message', id: any, createdAt: any, isCreator: boolean };

export type EventContainerFragment = EventContainer_DeletedMessage_Fragment | EventContainer_Message_Fragment;

type EventInfo_DeletedMessage_Fragment = { __typename?: 'DeletedMessage', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

type EventInfo_Message_Fragment = { __typename?: 'Message', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

export type EventInfoFragment = EventInfo_DeletedMessage_Fragment | EventInfo_Message_Fragment;

type IncomingEvent_DeletedMessage_Fragment = { __typename?: 'DeletedMessage', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

type IncomingEvent_Message_Fragment = { __typename?: 'Message', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

export type IncomingEventFragment = IncomingEvent_DeletedMessage_Fragment | IncomingEvent_Message_Fragment;

export type DeleteMessageMutationVariables = Exact<{
  messageId: Scalars['HashId'];
}>;


export type DeleteMessageMutation = { __typename?: 'Mutation', deleteMessage?: { __typename?: 'DeletedMessage', id: any } | null };

type MessageEvent_DeletedMessage_Fragment = { __typename?: 'DeletedMessage', id: any, isCreator: boolean, deletedAt?: any | null, createdAt: any, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

type MessageEvent_Message_Fragment = { __typename?: 'Message', id: any, isCreator: boolean, content: string, createdAt: any, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

export type MessageEventFragment = MessageEvent_DeletedMessage_Fragment | MessageEvent_Message_Fragment;

type MessageActions_DeletedMessage_Fragment = { __typename?: 'DeletedMessage', id: any, isCreator: boolean };

type MessageActions_Message_Fragment = { __typename?: 'Message', id: any, isCreator: boolean };

export type MessageActionsFragment = MessageActions_DeletedMessage_Fragment | MessageActions_Message_Fragment;

export type MessageBubbleFragment = { __typename?: 'Message', id: any, content: string };

type OutgoingEvent_DeletedMessage_Fragment = { __typename?: 'DeletedMessage', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

type OutgoingEvent_Message_Fragment = { __typename?: 'Message', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

export type OutgoingEventFragment = OutgoingEvent_DeletedMessage_Fragment | OutgoingEvent_Message_Fragment;

export type CreateMessageMutationVariables = Exact<{
  chatId: Scalars['HashId'];
  content: Scalars['String'];
}>;


export type CreateMessageMutation = { __typename?: 'Mutation', createMessage?: { __typename?: 'Message', id: any, createdAt: any, content: string, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } } | null };

type ChatItem_DeletedChat_Fragment = { __typename?: 'DeletedChat', id: any };

type ChatItem_DirectMessageChat_Fragment = { __typename?: 'DirectMessageChat', id: any, friend: { __typename?: 'Friend', id: any, username: string } };

type ChatItem_GroupChat_Fragment = { __typename?: 'GroupChat', name: string, id: any, members: Array<{ __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }> };

export type ChatItemFragment = ChatItem_DeletedChat_Fragment | ChatItem_DirectMessageChat_Fragment | ChatItem_GroupChat_Fragment;

export type GetChatsForDisplayQueryVariables = Exact<{ [key: string]: never; }>;


export type GetChatsForDisplayQuery = { __typename?: 'Query', chats: Array<{ __typename?: 'DeletedChat', id: any, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'DirectMessageChat', id: any, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }, friend: { __typename?: 'Friend', id: any, username: string } } | { __typename?: 'GroupChat', id: any, name: string, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }, members: Array<{ __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }> }> };

export type ChatsForDisplayChangedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type ChatsForDisplayChangedSubscription = { __typename?: 'Subscription', chats?: { __typename?: 'DeletedChat', id: any, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'DirectMessageChat', id: any, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }, friend: { __typename?: 'Friend', id: any, username: string } } | { __typename?: 'GroupChat', id: any, name: string, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }, members: Array<{ __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }> } | null };

type ChatsForDisplay_DeletedChat_Fragment = { __typename?: 'DeletedChat', id: any, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

type ChatsForDisplay_DirectMessageChat_Fragment = { __typename?: 'DirectMessageChat', id: any, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }, friend: { __typename?: 'Friend', id: any, username: string } };

type ChatsForDisplay_GroupChat_Fragment = { __typename?: 'GroupChat', id: any, name: string, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }, members: Array<{ __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }> };

export type ChatsForDisplayFragment = ChatsForDisplay_DeletedChat_Fragment | ChatsForDisplay_DirectMessageChat_Fragment | ChatsForDisplay_GroupChat_Fragment;

export type GetMeForAccountMenuQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeForAccountMenuQuery = { __typename?: 'Query', me?: { __typename?: 'Me', id: any, username: string } | null };

export type GetChatForAnimatedTitleQueryVariables = Exact<{
  chatId: Scalars['HashId'];
}>;


export type GetChatForAnimatedTitleQuery = { __typename?: 'Query', chat?: { __typename?: 'DeletedChat', id: any } | { __typename?: 'DirectMessageChat', id: any, friend: { __typename?: 'Friend', id: any, name?: string | null, username: string } } | { __typename?: 'GroupChat', name: string, description?: string | null, isAdmin: boolean, id: any } | null };

export type FriendRequestNotificationFragment = { __typename?: 'FriendRequest', id: any, createdAt: any, createdById: any, recipientId: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

export type GetFriendsForCreateGroupChatQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFriendsForCreateGroupChatQuery = { __typename?: 'Query', friends: Array<{ __typename?: 'Friend', id: any, name?: string | null, username: string }> };

export type GetFriendsForSelectSearchModalQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFriendsForSelectSearchModalQuery = { __typename?: 'Query', friends: Array<{ __typename?: 'Friend', id: any, username: string, name?: string | null }> };

export type GetChatForUpdateQueryVariables = Exact<{
  chatId: Scalars['HashId'];
}>;


export type GetChatForUpdateQuery = { __typename?: 'Query', chat?: { __typename?: 'DeletedChat', id: any, isCreator: boolean } | { __typename?: 'DirectMessageChat', id: any, isCreator: boolean } | { __typename?: 'GroupChat', name: string, description?: string | null, id: any, isCreator: boolean, members: Array<{ __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }>, admins: Array<{ __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }> } | null };

export type GetFriendsForUpdateGroupChatQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFriendsForUpdateGroupChatQuery = { __typename?: 'Query', friends: Array<{ __typename?: 'Friend', id: any, username: string }> };

type UpdateGroupUser_Friend_Fragment = { __typename?: 'Friend', id: any, username: string };

type UpdateGroupUser_Me_Fragment = { __typename?: 'Me', id: any, username: string };

type UpdateGroupUser_Stranger_Fragment = { __typename?: 'Stranger', id: any, username: string };

export type UpdateGroupUserFragment = UpdateGroupUser_Friend_Fragment | UpdateGroupUser_Me_Fragment | UpdateGroupUser_Stranger_Fragment;

export type GetUserSearchQueryVariables = Exact<{
  usernameFilter?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
}>;


export type GetUserSearchQuery = { __typename?: 'Query', users: { __typename?: 'UserConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null }, edges?: Array<{ __typename?: 'UserEdge', cursor: string, node?: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null, status: StrangerStatus, friendRequest?: { __typename?: 'FriendRequest', id: any, createdById: any, recipientId: any, isCreator: boolean } | null } | null } | null> | null } };

export type GetNotificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNotificationsQuery = { __typename?: 'Query', notifications: Array<{ __typename?: 'ChatInvite', createdById: any, recipientId: any, isCreator: boolean, status: RequestStatus, id: any, createdAt: any, createdBy: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', status: StrangerStatus, id: any, name?: string | null, username: string, friendRequest?: { __typename?: 'FriendRequest', id: any } | null }, recipient?: { __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', status: StrangerStatus, id: any } | null } | { __typename?: 'FriendRequest', createdById: any, recipientId: any, isCreator: boolean, status: RequestStatus, id: any, createdAt: any, createdBy: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', status: StrangerStatus, id: any, name?: string | null, username: string, friendRequest?: { __typename?: 'FriendRequest', id: any } | null }, recipient?: { __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', status: StrangerStatus, id: any } | null }> };

export type NotificationsSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NotificationsSubscription = { __typename?: 'Subscription', notifications?: { __typename?: 'ChatInvite', createdById: any, recipientId: any, isCreator: boolean, status: RequestStatus, id: any, createdAt: any, createdBy: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', status: StrangerStatus, id: any, name?: string | null, username: string, friendRequest?: { __typename?: 'FriendRequest', id: any } | null }, recipient?: { __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', status: StrangerStatus, id: any } | null } | { __typename?: 'FriendRequest', createdById: any, recipientId: any, isCreator: boolean, status: RequestStatus, id: any, createdAt: any, createdBy: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', status: StrangerStatus, id: any, name?: string | null, username: string, friendRequest?: { __typename?: 'FriendRequest', id: any } | null }, recipient?: { __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', status: StrangerStatus, id: any } | null } | null };

type LiveNotification_ChatInvite_Fragment = { __typename?: 'ChatInvite', createdById: any, recipientId: any, isCreator: boolean, status: RequestStatus, id: any, createdAt: any, createdBy: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', status: StrangerStatus, id: any, name?: string | null, username: string, friendRequest?: { __typename?: 'FriendRequest', id: any } | null }, recipient?: { __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', status: StrangerStatus, id: any } | null };

type LiveNotification_FriendRequest_Fragment = { __typename?: 'FriendRequest', createdById: any, recipientId: any, isCreator: boolean, status: RequestStatus, id: any, createdAt: any, createdBy: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', status: StrangerStatus, id: any, name?: string | null, username: string, friendRequest?: { __typename?: 'FriendRequest', id: any } | null }, recipient?: { __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', status: StrangerStatus, id: any } | null };

export type LiveNotificationFragment = LiveNotification_ChatInvite_Fragment | LiveNotification_FriendRequest_Fragment;

export type GetMeForUserProviderQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeForUserProviderQuery = { __typename?: 'Query', me?: { __typename?: 'Me', id: any, username: string, name?: string | null } | null };

export type GetChatAndFriendsForAdminSelectorQueryVariables = Exact<{
  chatId: Scalars['HashId'];
}>;


export type GetChatAndFriendsForAdminSelectorQuery = { __typename?: 'Query', chat?: { __typename?: 'DeletedChat', isCreator: boolean } | { __typename?: 'DirectMessageChat', isCreator: boolean } | { __typename?: 'GroupChat', isCreator: boolean, admins: Array<{ __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }>, members: Array<{ __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }> } | null, friends: Array<{ __typename?: 'Friend', id: any, username: string }> };

type ChatAvatar_DeletedChat_Fragment = { __typename?: 'DeletedChat', id: any };

type ChatAvatar_DirectMessageChat_Fragment = { __typename?: 'DirectMessageChat', id: any, friend: { __typename?: 'Friend', id: any, username: string } };

type ChatAvatar_GroupChat_Fragment = { __typename?: 'GroupChat', name: string, id: any };

export type ChatAvatarFragment = ChatAvatar_DeletedChat_Fragment | ChatAvatar_DirectMessageChat_Fragment | ChatAvatar_GroupChat_Fragment;

export type GetChatForChatUpdateActionQueryVariables = Exact<{
  chatId: Scalars['HashId'];
}>;


export type GetChatForChatUpdateActionQuery = { __typename?: 'Query', chat?: { __typename?: 'DeletedChat' } | { __typename?: 'DirectMessageChat' } | { __typename?: 'GroupChat', isAdmin: boolean } | null };

type UserAvatar_Friend_Fragment = { __typename?: 'Friend', id: any, username: string };

type UserAvatar_Me_Fragment = { __typename?: 'Me', id: any, username: string };

type UserAvatar_Stranger_Fragment = { __typename?: 'Stranger', id: any, username: string };

export type UserAvatarFragment = UserAvatar_Friend_Fragment | UserAvatar_Me_Fragment | UserAvatar_Stranger_Fragment;

type UserItem_Friend_Fragment = { __typename?: 'Friend', id: any, username: string, name?: string | null };

type UserItem_Me_Fragment = { __typename?: 'Me', id: any, username: string, name?: string | null };

type UserItem_Stranger_Fragment = { __typename?: 'Stranger', id: any, username: string, name?: string | null };

export type UserItemFragment = UserItem_Friend_Fragment | UserItem_Me_Fragment | UserItem_Stranger_Fragment;

type UserMenu_Friend_Fragment = { __typename?: 'Friend', id: any };

type UserMenu_Me_Fragment = { __typename?: 'Me', id: any };

type UserMenu_Stranger_Fragment = { __typename?: 'Stranger', status: StrangerStatus, id: any, friendRequest?: { __typename?: 'FriendRequest', id: any, createdById: any, recipientId: any, isCreator: boolean } | null };

export type UserMenuFragment = UserMenu_Friend_Fragment | UserMenu_Me_Fragment | UserMenu_Stranger_Fragment;

type UserList_Friend_Fragment = { __typename?: 'Friend', id: any, username: string, name?: string | null };

type UserList_Me_Fragment = { __typename?: 'Me', id: any, username: string, name?: string | null };

type UserList_Stranger_Fragment = { __typename?: 'Stranger', id: any, username: string, name?: string | null, status: StrangerStatus, friendRequest?: { __typename?: 'FriendRequest', id: any, createdById: any, recipientId: any, isCreator: boolean } | null };

export type UserListFragment = UserList_Friend_Fragment | UserList_Me_Fragment | UserList_Stranger_Fragment;

type UserMultiSelect_Friend_Fragment = { __typename?: 'Friend', id: any, username: string };

type UserMultiSelect_Me_Fragment = { __typename?: 'Me', id: any, username: string };

type UserMultiSelect_Stranger_Fragment = { __typename?: 'Stranger', id: any, username: string };

export type UserMultiSelectFragment = UserMultiSelect_Friend_Fragment | UserMultiSelect_Me_Fragment | UserMultiSelect_Stranger_Fragment;

type UserSelect_Friend_Fragment = { __typename?: 'Friend', id: any, username: string };

type UserSelect_Me_Fragment = { __typename?: 'Me', id: any, username: string };

type UserSelect_Stranger_Fragment = { __typename?: 'Stranger', id: any, username: string };

export type UserSelectFragment = UserSelect_Friend_Fragment | UserSelect_Me_Fragment | UserSelect_Stranger_Fragment;

export type CreateDirectMessageChatMutationVariables = Exact<{
  friendId: Scalars['HashId'];
}>;


export type CreateDirectMessageChatMutation = { __typename?: 'Mutation', createDirectMessageChat?: { __typename?: 'DirectMessageChat', id: any, isCreator: boolean, createdAt?: any | null, friend: { __typename?: 'Friend', id: any, name?: string | null, username: string } } | null };

export type CreateGroupChatMutationVariables = Exact<{
  data: CreateGroupChatInput;
}>;


export type CreateGroupChatMutation = { __typename?: 'Mutation', createGroupChat?: { __typename?: 'GroupChat', id: any, name: string, createdBy: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', id: any, name?: string | null, username: string } } | null };

export type DeleteChatMutationVariables = Exact<{
  chatId: Scalars['HashId'];
}>;


export type DeleteChatMutation = { __typename?: 'Mutation', deleteChat?: { __typename?: 'DeletedChat', id: any } | null };

type UseDeleteChat_DeletedChat_Fragment = { __typename?: 'DeletedChat', id: any };

type UseDeleteChat_DirectMessageChat_Fragment = { __typename?: 'DirectMessageChat', id: any };

type UseDeleteChat_GroupChat_Fragment = { __typename?: 'GroupChat', id: any };

export type UseDeleteChatFragment = UseDeleteChat_DeletedChat_Fragment | UseDeleteChat_DirectMessageChat_Fragment | UseDeleteChat_GroupChat_Fragment;

export type AcceptFriendRequestMutationVariables = Exact<{
  friendRequestId: Scalars['HashId'];
}>;


export type AcceptFriendRequestMutation = { __typename?: 'Mutation', acceptFriendRequest?: { __typename?: 'FriendRequest', id: any, isCreator: boolean, status: RequestStatus, createdById: any, recipientId: any } | null };

export type DeclineFriendRequestMutationVariables = Exact<{
  friendRequestId: Scalars['HashId'];
}>;


export type DeclineFriendRequestMutation = { __typename?: 'Mutation', declineFriendRequest?: { __typename?: 'FriendRequest', id: any, isCreator: boolean, status: RequestStatus, createdById: any, recipientId: any } | null };

export type CancelFriendRequestMutationVariables = Exact<{
  friendRequestId: Scalars['HashId'];
}>;


export type CancelFriendRequestMutation = { __typename?: 'Mutation', cancelFriendRequest?: { __typename?: 'FriendRequest', id: any, isCreator: boolean, status: RequestStatus, createdById: any, recipientId: any } | null };

export type SendFriendRequestMutationVariables = Exact<{
  friendId: Scalars['HashId'];
}>;


export type SendFriendRequestMutation = { __typename?: 'Mutation', sendFriendRequest?: { __typename?: 'FriendRequest', id: any, isCreator: boolean, status: RequestStatus, createdById: any, recipientId: any } | null };

export type DeleteFriendMutationVariables = Exact<{
  friendId: Scalars['HashId'];
}>;


export type DeleteFriendMutation = { __typename?: 'Mutation', deleteFriend?: { __typename?: 'Stranger', id: any, status: StrangerStatus } | null };

export type RequestInfoFragment = { __typename?: 'FriendRequest', id: any, isCreator: boolean, status: RequestStatus, createdById: any, recipientId: any };

type FriendRequestUser_Friend_Fragment = { __typename?: 'Friend', id: any };

type FriendRequestUser_Me_Fragment = { __typename?: 'Me', id: any };

type FriendRequestUser_Stranger_Fragment = { __typename?: 'Stranger', status: StrangerStatus, id: any, friendRequest?: { __typename?: 'FriendRequest', id: any } | null };

export type FriendRequestUserFragment = FriendRequestUser_Friend_Fragment | FriendRequestUser_Me_Fragment | FriendRequestUser_Stranger_Fragment;

export type UpdateGroupChatMutationVariables = Exact<{
  data: UpdateGroupChatInput;
}>;


export type UpdateGroupChatMutation = { __typename?: 'Mutation', updateGroupChat?: { __typename?: 'GroupChat', id: any, name: string, description?: string | null, admins: Array<{ __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', id: any }>, members: Array<{ __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', id: any }> } | null };

export const UseMessageEventFragmentDoc = gql`
    fragment UseMessageEvent on Event {
  id
  createdAt
  createdBy {
    id
  }
}
    `;
export const UseMessageFragmentDoc = gql`
    fragment UseMessage on MessageResult {
  ... on Message {
    id
    ...UseMessageEvent
  }
  ... on DeletedMessage {
    id
    ...UseMessageEvent
  }
}
    ${UseMessageEventFragmentDoc}`;
export const EventContainerFragmentDoc = gql`
    fragment EventContainer on Event {
  id
  createdAt
  isCreator
}
    `;
export const EventInfoFragmentDoc = gql`
    fragment EventInfo on Event {
  id
  createdAt
  createdBy {
    id
    username
  }
  isCreator
}
    `;
export const OutgoingEventFragmentDoc = gql`
    fragment OutgoingEvent on Event {
  id
  ...EventInfo
}
    ${EventInfoFragmentDoc}`;
export const UserAvatarFragmentDoc = gql`
    fragment UserAvatar on User {
  id
  username
}
    `;
export const IncomingEventFragmentDoc = gql`
    fragment IncomingEvent on Event {
  id
  ...EventInfo
  createdBy {
    id
    ...UserAvatar
  }
}
    ${EventInfoFragmentDoc}
${UserAvatarFragmentDoc}`;
export const MessageActionsFragmentDoc = gql`
    fragment MessageActions on MessageResult {
  ... on DeletedMessage {
    id
    isCreator
  }
  ... on Message {
    id
    isCreator
  }
}
    `;
export const MessageEventFragmentDoc = gql`
    fragment MessageEvent on MessageResult {
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
  id
  ...EventContainer
  ...MessageEvent
  createdAt
}
    ${EventContainerFragmentDoc}
${MessageEventFragmentDoc}`;
export const EventAvatarFragmentDoc = gql`
    fragment EventAvatar on Event {
  id
  createdBy {
    id
    username
  }
}
    `;
export const MessageBubbleFragmentDoc = gql`
    fragment MessageBubble on Message {
  id
  content
}
    `;
export const ChatAvatarFragmentDoc = gql`
    fragment ChatAvatar on Chat {
  id
  ... on GroupChat {
    name
  }
  ... on DirectMessageChat {
    friend {
      id
      username
    }
  }
}
    `;
export const ChatItemFragmentDoc = gql`
    fragment ChatItem on Chat {
  id
  ...ChatAvatar
  ... on DirectMessageChat {
    friend {
      id
      username
    }
  }
  ... on GroupChat {
    name
    members {
      id
      username
    }
  }
}
    ${ChatAvatarFragmentDoc}`;
export const ChatsForDisplayFragmentDoc = gql`
    fragment ChatsForDisplay on Chat {
  id
  ...ChatItem
  createdBy {
    id
    username
  }
}
    ${ChatItemFragmentDoc}`;
export const FriendRequestNotificationFragmentDoc = gql`
    fragment FriendRequestNotification on FriendRequest {
  id
  createdAt
  createdById
  recipientId
  isCreator
  createdBy {
    id
    ...UserAvatar
  }
}
    ${UserAvatarFragmentDoc}`;
export const UpdateGroupUserFragmentDoc = gql`
    fragment UpdateGroupUser on User {
  id
  username
}
    `;
export const LiveNotificationFragmentDoc = gql`
    fragment LiveNotification on Notification {
  id
  createdAt
  isCreator
  createdBy {
    id
    name
    username
    ... on Stranger {
      status
    }
  }
  ... on Request {
    createdById
    recipientId
    isCreator
    status
    createdBy {
      ... on Stranger {
        friendRequest {
          id
        }
      }
    }
    recipient {
      id
      ... on Stranger {
        status
      }
    }
  }
}
    `;
export const UserItemFragmentDoc = gql`
    fragment UserItem on User {
  id
  username
  name
}
    `;
export const UserMenuFragmentDoc = gql`
    fragment UserMenu on User {
  id
  ... on Stranger {
    status
    friendRequest {
      id
      createdById
      recipientId
      isCreator
    }
  }
}
    `;
export const UserListFragmentDoc = gql`
    fragment UserList on User {
  ...UserItem
  ...UserMenu
}
    ${UserItemFragmentDoc}
${UserMenuFragmentDoc}`;
export const UserMultiSelectFragmentDoc = gql`
    fragment UserMultiSelect on User {
  id
  username
}
    `;
export const UserSelectFragmentDoc = gql`
    fragment UserSelect on User {
  id
  username
}
    `;
export const UseDeleteChatFragmentDoc = gql`
    fragment UseDeleteChat on Chat {
  id
}
    `;
export const RequestInfoFragmentDoc = gql`
    fragment RequestInfo on FriendRequest {
  id
  isCreator
  status
  createdById
  recipientId
}
    `;
export const FriendRequestUserFragmentDoc = gql`
    fragment FriendRequestUser on User {
  id
  ... on Stranger {
    status
    friendRequest {
      id
    }
  }
}
    `;
export const GetChatForChatInfoAsideDocument = gql`
    query GetChatForChatInfoAside($chatId: HashId!) {
  chat(chatId: $chatId) {
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
        ...UserMenu
      }
    }
  }
}
    ${UserItemFragmentDoc}
${UserMenuFragmentDoc}`;

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
export const DeleteMessageDocument = gql`
    mutation DeleteMessage($messageId: HashId!) {
  deleteMessage(messageId: $messageId) {
    id
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
export const CreateMessageDocument = gql`
    mutation CreateMessage($chatId: HashId!, $content: String!) {
  createMessage(chatId: $chatId, content: $content) {
    id
    createdAt
    content
    isCreator
    createdBy {
      id
      username
      name
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
export const GetChatsForDisplayDocument = gql`
    query GetChatsForDisplay {
  chats {
    ...ChatsForDisplay
  }
}
    ${ChatsForDisplayFragmentDoc}`;

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
export const ChatsForDisplayChangedDocument = gql`
    subscription ChatsForDisplayChanged {
  chats {
    ...ChatsForDisplay
  }
}
    ${ChatsForDisplayFragmentDoc}`;

/**
 * __useChatsForDisplayChangedSubscription__
 *
 * To run a query within a React component, call `useChatsForDisplayChangedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useChatsForDisplayChangedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatsForDisplayChangedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useChatsForDisplayChangedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<ChatsForDisplayChangedSubscription, ChatsForDisplayChangedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<ChatsForDisplayChangedSubscription, ChatsForDisplayChangedSubscriptionVariables>(ChatsForDisplayChangedDocument, options);
      }
export type ChatsForDisplayChangedSubscriptionHookResult = ReturnType<typeof useChatsForDisplayChangedSubscription>;
export type ChatsForDisplayChangedSubscriptionResult = Apollo.SubscriptionResult<ChatsForDisplayChangedSubscription>;
export const GetMeForAccountMenuDocument = gql`
    query GetMeForAccountMenu {
  me {
    ...UserAvatar
  }
}
    ${UserAvatarFragmentDoc}`;

/**
 * __useGetMeForAccountMenuQuery__
 *
 * To run a query within a React component, call `useGetMeForAccountMenuQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeForAccountMenuQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeForAccountMenuQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMeForAccountMenuQuery(baseOptions?: Apollo.QueryHookOptions<GetMeForAccountMenuQuery, GetMeForAccountMenuQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMeForAccountMenuQuery, GetMeForAccountMenuQueryVariables>(GetMeForAccountMenuDocument, options);
      }
export function useGetMeForAccountMenuLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMeForAccountMenuQuery, GetMeForAccountMenuQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMeForAccountMenuQuery, GetMeForAccountMenuQueryVariables>(GetMeForAccountMenuDocument, options);
        }
export type GetMeForAccountMenuQueryHookResult = ReturnType<typeof useGetMeForAccountMenuQuery>;
export type GetMeForAccountMenuLazyQueryHookResult = ReturnType<typeof useGetMeForAccountMenuLazyQuery>;
export type GetMeForAccountMenuQueryResult = Apollo.QueryResult<GetMeForAccountMenuQuery, GetMeForAccountMenuQueryVariables>;
export const GetChatForAnimatedTitleDocument = gql`
    query GetChatForAnimatedTitle($chatId: HashId!) {
  chat(chatId: $chatId) {
    id
    ... on GroupChat {
      name
      description
      isAdmin
    }
    ... on DirectMessageChat {
      friend {
        id
        name
        username
      }
    }
  }
}
    `;

/**
 * __useGetChatForAnimatedTitleQuery__
 *
 * To run a query within a React component, call `useGetChatForAnimatedTitleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChatForAnimatedTitleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChatForAnimatedTitleQuery({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useGetChatForAnimatedTitleQuery(baseOptions: Apollo.QueryHookOptions<GetChatForAnimatedTitleQuery, GetChatForAnimatedTitleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetChatForAnimatedTitleQuery, GetChatForAnimatedTitleQueryVariables>(GetChatForAnimatedTitleDocument, options);
      }
export function useGetChatForAnimatedTitleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChatForAnimatedTitleQuery, GetChatForAnimatedTitleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetChatForAnimatedTitleQuery, GetChatForAnimatedTitleQueryVariables>(GetChatForAnimatedTitleDocument, options);
        }
export type GetChatForAnimatedTitleQueryHookResult = ReturnType<typeof useGetChatForAnimatedTitleQuery>;
export type GetChatForAnimatedTitleLazyQueryHookResult = ReturnType<typeof useGetChatForAnimatedTitleLazyQuery>;
export type GetChatForAnimatedTitleQueryResult = Apollo.QueryResult<GetChatForAnimatedTitleQuery, GetChatForAnimatedTitleQueryVariables>;
export const GetFriendsForCreateGroupChatDocument = gql`
    query GetFriendsForCreateGroupChat {
  friends {
    id
    name
    username
  }
}
    `;

/**
 * __useGetFriendsForCreateGroupChatQuery__
 *
 * To run a query within a React component, call `useGetFriendsForCreateGroupChatQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFriendsForCreateGroupChatQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFriendsForCreateGroupChatQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetFriendsForCreateGroupChatQuery(baseOptions?: Apollo.QueryHookOptions<GetFriendsForCreateGroupChatQuery, GetFriendsForCreateGroupChatQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFriendsForCreateGroupChatQuery, GetFriendsForCreateGroupChatQueryVariables>(GetFriendsForCreateGroupChatDocument, options);
      }
export function useGetFriendsForCreateGroupChatLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFriendsForCreateGroupChatQuery, GetFriendsForCreateGroupChatQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFriendsForCreateGroupChatQuery, GetFriendsForCreateGroupChatQueryVariables>(GetFriendsForCreateGroupChatDocument, options);
        }
export type GetFriendsForCreateGroupChatQueryHookResult = ReturnType<typeof useGetFriendsForCreateGroupChatQuery>;
export type GetFriendsForCreateGroupChatLazyQueryHookResult = ReturnType<typeof useGetFriendsForCreateGroupChatLazyQuery>;
export type GetFriendsForCreateGroupChatQueryResult = Apollo.QueryResult<GetFriendsForCreateGroupChatQuery, GetFriendsForCreateGroupChatQueryVariables>;
export const GetFriendsForSelectSearchModalDocument = gql`
    query GetFriendsForSelectSearchModal {
  friends {
    ...UserList
  }
}
    ${UserListFragmentDoc}`;

/**
 * __useGetFriendsForSelectSearchModalQuery__
 *
 * To run a query within a React component, call `useGetFriendsForSelectSearchModalQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFriendsForSelectSearchModalQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFriendsForSelectSearchModalQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetFriendsForSelectSearchModalQuery(baseOptions?: Apollo.QueryHookOptions<GetFriendsForSelectSearchModalQuery, GetFriendsForSelectSearchModalQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFriendsForSelectSearchModalQuery, GetFriendsForSelectSearchModalQueryVariables>(GetFriendsForSelectSearchModalDocument, options);
      }
export function useGetFriendsForSelectSearchModalLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFriendsForSelectSearchModalQuery, GetFriendsForSelectSearchModalQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFriendsForSelectSearchModalQuery, GetFriendsForSelectSearchModalQueryVariables>(GetFriendsForSelectSearchModalDocument, options);
        }
export type GetFriendsForSelectSearchModalQueryHookResult = ReturnType<typeof useGetFriendsForSelectSearchModalQuery>;
export type GetFriendsForSelectSearchModalLazyQueryHookResult = ReturnType<typeof useGetFriendsForSelectSearchModalLazyQuery>;
export type GetFriendsForSelectSearchModalQueryResult = Apollo.QueryResult<GetFriendsForSelectSearchModalQuery, GetFriendsForSelectSearchModalQueryVariables>;
export const GetChatForUpdateDocument = gql`
    query GetChatForUpdate($chatId: HashId!) {
  chat(chatId: $chatId) {
    id
    isCreator
    ... on GroupChat {
      name
      description
      members {
        ...UpdateGroupUser
      }
      admins {
        ...UpdateGroupUser
      }
    }
  }
}
    ${UpdateGroupUserFragmentDoc}`;

/**
 * __useGetChatForUpdateQuery__
 *
 * To run a query within a React component, call `useGetChatForUpdateQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChatForUpdateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChatForUpdateQuery({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useGetChatForUpdateQuery(baseOptions: Apollo.QueryHookOptions<GetChatForUpdateQuery, GetChatForUpdateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetChatForUpdateQuery, GetChatForUpdateQueryVariables>(GetChatForUpdateDocument, options);
      }
export function useGetChatForUpdateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChatForUpdateQuery, GetChatForUpdateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetChatForUpdateQuery, GetChatForUpdateQueryVariables>(GetChatForUpdateDocument, options);
        }
export type GetChatForUpdateQueryHookResult = ReturnType<typeof useGetChatForUpdateQuery>;
export type GetChatForUpdateLazyQueryHookResult = ReturnType<typeof useGetChatForUpdateLazyQuery>;
export type GetChatForUpdateQueryResult = Apollo.QueryResult<GetChatForUpdateQuery, GetChatForUpdateQueryVariables>;
export const GetFriendsForUpdateGroupChatDocument = gql`
    query GetFriendsForUpdateGroupChat {
  friends {
    ...UpdateGroupUser
  }
}
    ${UpdateGroupUserFragmentDoc}`;

/**
 * __useGetFriendsForUpdateGroupChatQuery__
 *
 * To run a query within a React component, call `useGetFriendsForUpdateGroupChatQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFriendsForUpdateGroupChatQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFriendsForUpdateGroupChatQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetFriendsForUpdateGroupChatQuery(baseOptions?: Apollo.QueryHookOptions<GetFriendsForUpdateGroupChatQuery, GetFriendsForUpdateGroupChatQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFriendsForUpdateGroupChatQuery, GetFriendsForUpdateGroupChatQueryVariables>(GetFriendsForUpdateGroupChatDocument, options);
      }
export function useGetFriendsForUpdateGroupChatLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFriendsForUpdateGroupChatQuery, GetFriendsForUpdateGroupChatQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFriendsForUpdateGroupChatQuery, GetFriendsForUpdateGroupChatQueryVariables>(GetFriendsForUpdateGroupChatDocument, options);
        }
export type GetFriendsForUpdateGroupChatQueryHookResult = ReturnType<typeof useGetFriendsForUpdateGroupChatQuery>;
export type GetFriendsForUpdateGroupChatLazyQueryHookResult = ReturnType<typeof useGetFriendsForUpdateGroupChatLazyQuery>;
export type GetFriendsForUpdateGroupChatQueryResult = Apollo.QueryResult<GetFriendsForUpdateGroupChatQuery, GetFriendsForUpdateGroupChatQueryVariables>;
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
        ...UserList
      }
    }
  }
}
    ${UserListFragmentDoc}`;

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
export const GetNotificationsDocument = gql`
    query GetNotifications {
  notifications {
    ...LiveNotification
  }
}
    ${LiveNotificationFragmentDoc}`;

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
export const NotificationsDocument = gql`
    subscription Notifications {
  notifications {
    ...LiveNotification
  }
}
    ${LiveNotificationFragmentDoc}`;

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
export const GetMeForUserProviderDocument = gql`
    query GetMeForUserProvider {
  me {
    id
    username
    name
  }
}
    `;

/**
 * __useGetMeForUserProviderQuery__
 *
 * To run a query within a React component, call `useGetMeForUserProviderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeForUserProviderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeForUserProviderQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMeForUserProviderQuery(baseOptions?: Apollo.QueryHookOptions<GetMeForUserProviderQuery, GetMeForUserProviderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMeForUserProviderQuery, GetMeForUserProviderQueryVariables>(GetMeForUserProviderDocument, options);
      }
export function useGetMeForUserProviderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMeForUserProviderQuery, GetMeForUserProviderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMeForUserProviderQuery, GetMeForUserProviderQueryVariables>(GetMeForUserProviderDocument, options);
        }
export type GetMeForUserProviderQueryHookResult = ReturnType<typeof useGetMeForUserProviderQuery>;
export type GetMeForUserProviderLazyQueryHookResult = ReturnType<typeof useGetMeForUserProviderLazyQuery>;
export type GetMeForUserProviderQueryResult = Apollo.QueryResult<GetMeForUserProviderQuery, GetMeForUserProviderQueryVariables>;
export const GetChatAndFriendsForAdminSelectorDocument = gql`
    query GetChatAndFriendsForAdminSelector($chatId: HashId!) {
  chat(chatId: $chatId) {
    isCreator
    ... on GroupChat {
      admins {
        ...UserMultiSelect
      }
      members {
        ...UserMultiSelect
      }
    }
  }
  friends {
    ...UserMultiSelect
  }
}
    ${UserMultiSelectFragmentDoc}`;

/**
 * __useGetChatAndFriendsForAdminSelectorQuery__
 *
 * To run a query within a React component, call `useGetChatAndFriendsForAdminSelectorQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChatAndFriendsForAdminSelectorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChatAndFriendsForAdminSelectorQuery({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useGetChatAndFriendsForAdminSelectorQuery(baseOptions: Apollo.QueryHookOptions<GetChatAndFriendsForAdminSelectorQuery, GetChatAndFriendsForAdminSelectorQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetChatAndFriendsForAdminSelectorQuery, GetChatAndFriendsForAdminSelectorQueryVariables>(GetChatAndFriendsForAdminSelectorDocument, options);
      }
export function useGetChatAndFriendsForAdminSelectorLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChatAndFriendsForAdminSelectorQuery, GetChatAndFriendsForAdminSelectorQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetChatAndFriendsForAdminSelectorQuery, GetChatAndFriendsForAdminSelectorQueryVariables>(GetChatAndFriendsForAdminSelectorDocument, options);
        }
export type GetChatAndFriendsForAdminSelectorQueryHookResult = ReturnType<typeof useGetChatAndFriendsForAdminSelectorQuery>;
export type GetChatAndFriendsForAdminSelectorLazyQueryHookResult = ReturnType<typeof useGetChatAndFriendsForAdminSelectorLazyQuery>;
export type GetChatAndFriendsForAdminSelectorQueryResult = Apollo.QueryResult<GetChatAndFriendsForAdminSelectorQuery, GetChatAndFriendsForAdminSelectorQueryVariables>;
export const GetChatForChatUpdateActionDocument = gql`
    query GetChatForChatUpdateAction($chatId: HashId!) {
  chat(chatId: $chatId) {
    ... on GroupChat {
      isAdmin
    }
  }
}
    `;

/**
 * __useGetChatForChatUpdateActionQuery__
 *
 * To run a query within a React component, call `useGetChatForChatUpdateActionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChatForChatUpdateActionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChatForChatUpdateActionQuery({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useGetChatForChatUpdateActionQuery(baseOptions: Apollo.QueryHookOptions<GetChatForChatUpdateActionQuery, GetChatForChatUpdateActionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetChatForChatUpdateActionQuery, GetChatForChatUpdateActionQueryVariables>(GetChatForChatUpdateActionDocument, options);
      }
export function useGetChatForChatUpdateActionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChatForChatUpdateActionQuery, GetChatForChatUpdateActionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetChatForChatUpdateActionQuery, GetChatForChatUpdateActionQueryVariables>(GetChatForChatUpdateActionDocument, options);
        }
export type GetChatForChatUpdateActionQueryHookResult = ReturnType<typeof useGetChatForChatUpdateActionQuery>;
export type GetChatForChatUpdateActionLazyQueryHookResult = ReturnType<typeof useGetChatForChatUpdateActionLazyQuery>;
export type GetChatForChatUpdateActionQueryResult = Apollo.QueryResult<GetChatForChatUpdateActionQuery, GetChatForChatUpdateActionQueryVariables>;
export const CreateDirectMessageChatDocument = gql`
    mutation CreateDirectMessageChat($friendId: HashId!) {
  createDirectMessageChat(friendId: $friendId) {
    id
    isCreator
    createdAt
    friend {
      id
      name
      username
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
    mutation CreateGroupChat($data: CreateGroupChatInput!) {
  createGroupChat(data: $data) {
    id
    name
    createdBy {
      id
      name
      username
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
export const DeleteChatDocument = gql`
    mutation DeleteChat($chatId: HashId!) {
  deleteChat(chatId: $chatId) {
    id
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
export const AcceptFriendRequestDocument = gql`
    mutation AcceptFriendRequest($friendRequestId: HashId!) {
  acceptFriendRequest(friendRequestId: $friendRequestId) {
    ...RequestInfo
  }
}
    ${RequestInfoFragmentDoc}`;
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
export const DeclineFriendRequestDocument = gql`
    mutation DeclineFriendRequest($friendRequestId: HashId!) {
  declineFriendRequest(friendRequestId: $friendRequestId) {
    ...RequestInfo
  }
}
    ${RequestInfoFragmentDoc}`;
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
export const CancelFriendRequestDocument = gql`
    mutation CancelFriendRequest($friendRequestId: HashId!) {
  cancelFriendRequest(friendRequestId: $friendRequestId) {
    ...RequestInfo
  }
}
    ${RequestInfoFragmentDoc}`;
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
export const SendFriendRequestDocument = gql`
    mutation SendFriendRequest($friendId: HashId!) {
  sendFriendRequest(friendId: $friendId) {
    ...RequestInfo
  }
}
    ${RequestInfoFragmentDoc}`;
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
export const DeleteFriendDocument = gql`
    mutation DeleteFriend($friendId: HashId!) {
  deleteFriend(friendId: $friendId) {
    id
    status
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
export const UpdateGroupChatDocument = gql`
    mutation UpdateGroupChat($data: UpdateGroupChatInput!) {
  updateGroupChat(data: $data) {
    id
    name
    description
    admins {
      id
    }
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