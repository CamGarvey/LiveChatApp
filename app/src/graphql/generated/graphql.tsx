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

export type AdminsAdded = ChatUpdate & Event & UserAlteration & {
  __typename?: 'AdminsAdded';
  chat: Chat;
  chatId: Scalars['HashId'];
  createdAt: Scalars['Date'];
  createdBy: User;
  createdById: Scalars['HashId'];
  id: Scalars['HashId'];
  isCreator: Scalars['Boolean'];
  updatedAt: Scalars['Date'];
  users: Array<User>;
};

export type AdminsRemoved = ChatUpdate & Event & UserAlteration & {
  __typename?: 'AdminsRemoved';
  chat: Chat;
  chatId: Scalars['HashId'];
  createdAt: Scalars['Date'];
  createdBy: User;
  createdById: Scalars['HashId'];
  id: Scalars['HashId'];
  isCreator: Scalars['Boolean'];
  updatedAt: Scalars['Date'];
  users: Array<User>;
};

/**
 * Alert is a type of notification that does not require a response
 *     and can be sent to multiple users
 */
export type Alert = {
  createdAt: Scalars['Date'];
  createdBy: User;
  createdById: Scalars['HashId'];
  id: Scalars['HashId'];
  isCreator: Scalars['Boolean'];
  recipients: Array<User>;
};

export enum AlertState {
  All = 'ALL',
  Seen = 'SEEN',
  Unseen = 'UNSEEN'
}

export type Chat = {
  createdAt?: Maybe<Scalars['Date']>;
  createdBy: User;
  createdById: Scalars['HashId'];
  id: Scalars['HashId'];
  isCreator: Scalars['Boolean'];
  updatedAt?: Maybe<Scalars['Date']>;
};

export type ChatCreatedAlert = Alert & Notification & {
  __typename?: 'ChatCreatedAlert';
  chat: Chat;
  createdAt: Scalars['Date'];
  createdBy: User;
  createdById: Scalars['HashId'];
  id: Scalars['HashId'];
  isCreator: Scalars['Boolean'];
  recipients: Array<User>;
};

export type ChatDeletedAlert = Alert & Notification & {
  __typename?: 'ChatDeletedAlert';
  chat: Chat;
  createdAt: Scalars['Date'];
  createdBy: User;
  createdById: Scalars['HashId'];
  id: Scalars['HashId'];
  isCreator: Scalars['Boolean'];
  recipients: Array<User>;
};

export type ChatSubscriptionResult = DeletedChat | DirectMessageChat | GroupChat;

export type ChatUpdate = {
  chat: Chat;
  chatId: Scalars['HashId'];
  createdAt: Scalars['Date'];
  createdBy: User;
  createdById: Scalars['HashId'];
  id: Scalars['HashId'];
  isCreator: Scalars['Boolean'];
  updatedAt: Scalars['Date'];
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

export type DeletedEvent = Event & {
  __typename?: 'DeletedEvent';
  chat: Chat;
  chatId: Scalars['HashId'];
  createdAt: Scalars['Date'];
  createdBy: User;
  createdById: Scalars['HashId'];
  deletedAt: Scalars['Date'];
  id: Scalars['HashId'];
  isCreator: Scalars['Boolean'];
  updatedAt: Scalars['Date'];
};

export type DescriptionUpdated = ChatUpdate & Event & {
  __typename?: 'DescriptionUpdated';
  chat: Chat;
  chatId: Scalars['HashId'];
  createdAt: Scalars['Date'];
  createdBy: User;
  createdById: Scalars['HashId'];
  descriptionAfter: Scalars['String'];
  descriptionBefore: Scalars['String'];
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
  events: EventConnection;
  friend: Friend;
  id: Scalars['HashId'];
  isCreator: Scalars['Boolean'];
  updatedAt?: Maybe<Scalars['Date']>;
};


/** A Direct Message Chat is a conversation between 2 members */
export type DirectMessageChatEventsArgs = {
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

export type EventConnection = {
  __typename?: 'EventConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges?: Maybe<Array<Maybe<EventEdge>>>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
};

export type EventEdge = {
  __typename?: 'EventEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node?: Maybe<Event>;
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

export type FriendDeletedAlert = Alert & Notification & {
  __typename?: 'FriendDeletedAlert';
  createdAt: Scalars['Date'];
  createdBy: User;
  createdById: Scalars['HashId'];
  id: Scalars['HashId'];
  isCreator: Scalars['Boolean'];
  recipients: Array<User>;
  user: Stranger;
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
  recipient: User;
  recipientId: Scalars['HashId'];
  state: RequestState;
};

/** A Group Chat is a chat that contains more than 2 members */
export type GroupChat = Chat & {
  __typename?: 'GroupChat';
  admins: Array<User>;
  createdAt?: Maybe<Scalars['Date']>;
  createdBy: User;
  createdById: Scalars['HashId'];
  description?: Maybe<Scalars['String']>;
  events: EventConnection;
  id: Scalars['HashId'];
  isAdmin: Scalars['Boolean'];
  isCreator: Scalars['Boolean'];
  memberCount: Scalars['Int'];
  members: Array<User>;
  name: Scalars['String'];
  updatedAt?: Maybe<Scalars['Date']>;
};


/** A Group Chat is a chat that contains more than 2 members */
export type GroupChatEventsArgs = {
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
  friends: FriendConnection;
  id: Scalars['HashId'];
  name?: Maybe<Scalars['String']>;
  requests: Array<Request>;
  sentRequests: Array<Request>;
  updatedAt: Scalars['Date'];
  username: Scalars['String'];
};


export type MeFriendsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type MeRequestsArgs = {
  state?: InputMaybe<RequestState>;
};


export type MeSentRequestsArgs = {
  state?: InputMaybe<RequestState>;
};

export type MembersAdded = ChatUpdate & Event & UserAlteration & {
  __typename?: 'MembersAdded';
  chat: Chat;
  chatId: Scalars['HashId'];
  createdAt: Scalars['Date'];
  createdBy: User;
  createdById: Scalars['HashId'];
  id: Scalars['HashId'];
  isCreator: Scalars['Boolean'];
  updatedAt: Scalars['Date'];
  users: Array<User>;
};

export type MembersRemoved = ChatUpdate & Event & UserAlteration & {
  __typename?: 'MembersRemoved';
  chat: Chat;
  chatId: Scalars['HashId'];
  createdAt: Scalars['Date'];
  createdBy: User;
  createdById: Scalars['HashId'];
  id: Scalars['HashId'];
  isCreator: Scalars['Boolean'];
  updatedAt: Scalars['Date'];
  users: Array<User>;
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

export type Mutation = {
  __typename?: 'Mutation';
  /** Accept a request */
  acceptRequest?: Maybe<Request>;
  acknowledgeAlert?: Maybe<Alert>;
  /** Add admins to a group chat */
  addAdminsToGroupChat?: Maybe<AdminsAdded>;
  /** Add members to a group chat */
  addMembersToGroupChat?: Maybe<MembersAdded>;
  /** Cancel a sent request */
  cancelRequest?: Maybe<Request>;
  /** Create a Chat */
  createDirectMessageChat?: Maybe<DirectMessageChat>;
  /** Create a Chat */
  createGroupChat?: Maybe<GroupChat>;
  /** Create a Message in a Chat */
  createMessage?: Maybe<Message>;
  /** Decline a received request */
  declineRequest?: Maybe<Request>;
  /** Delete a Chat */
  deleteChat?: Maybe<DeletedChat>;
  deleteEvent?: Maybe<DeletedEvent>;
  /** Delete a Friend */
  deleteFriend?: Maybe<Stranger>;
  /** Remove admins from a group chat */
  removeAdminsFromGroupChat?: Maybe<AdminsRemoved>;
  /** Remove members from a group chat */
  removeMembersFromGroupChat?: Maybe<MembersRemoved>;
  /** Send a friend request to a user */
  sendFriendRequest?: Maybe<FriendRequest>;
  updateGroupChatDescription?: Maybe<DescriptionUpdated>;
  updateGroupChatName?: Maybe<NameUpdated>;
  /** Update a Message */
  updateMessage?: Maybe<Message>;
  /** Update current user */
  updateUser?: Maybe<Me>;
};


export type MutationAcceptRequestArgs = {
  requestId: Scalars['HashId'];
};


export type MutationAcknowledgeAlertArgs = {
  alertId: Scalars['HashId'];
};


export type MutationAddAdminsToGroupChatArgs = {
  chatId: Scalars['HashId'];
  members: Array<Scalars['HashId']>;
};


export type MutationAddMembersToGroupChatArgs = {
  chatId: Scalars['HashId'];
  members: Array<Scalars['HashId']>;
};


export type MutationCancelRequestArgs = {
  requestId: Scalars['HashId'];
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


export type MutationDeclineRequestArgs = {
  requestId: Scalars['HashId'];
};


export type MutationDeleteChatArgs = {
  chatId: Scalars['HashId'];
};


export type MutationDeleteEventArgs = {
  eventId?: InputMaybe<Scalars['HashId']>;
};


export type MutationDeleteFriendArgs = {
  friendId: Scalars['HashId'];
};


export type MutationRemoveAdminsFromGroupChatArgs = {
  chatId: Scalars['HashId'];
  members: Array<Scalars['HashId']>;
};


export type MutationRemoveMembersFromGroupChatArgs = {
  chatId: Scalars['HashId'];
  members: Array<Scalars['HashId']>;
};


export type MutationSendFriendRequestArgs = {
  strangerId: Scalars['HashId'];
};


export type MutationUpdateGroupChatDescriptionArgs = {
  chatId: Scalars['HashId'];
  description: Scalars['String'];
};


export type MutationUpdateGroupChatNameArgs = {
  chatId: Scalars['HashId'];
  name: Scalars['String'];
};


export type MutationUpdateMessageArgs = {
  content: Scalars['String'];
  messageId: Scalars['HashId'];
};


export type MutationUpdateUserArgs = {
  name: Scalars['String'];
};

export type NameUpdated = ChatUpdate & Event & {
  __typename?: 'NameUpdated';
  chat: Chat;
  chatId: Scalars['HashId'];
  createdAt: Scalars['Date'];
  createdBy: User;
  createdById: Scalars['HashId'];
  id: Scalars['HashId'];
  isCreator: Scalars['Boolean'];
  nameAfter: Scalars['String'];
  nameBefore: Scalars['String'];
  updatedAt: Scalars['Date'];
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
  alerts: Array<Alert>;
  chat?: Maybe<Chat>;
  chats: Array<Chat>;
  /** Get a event by id */
  event?: Maybe<Event>;
  events: EventConnection;
  friends: Array<Friend>;
  me?: Maybe<Me>;
  /** Get all notifications for current user */
  notifications: Array<Notification>;
  requests: Array<Request>;
  user?: Maybe<User>;
  /** Find users */
  users: UserConnection;
};


export type QueryAlertsArgs = {
  state?: AlertState;
};


export type QueryChatArgs = {
  chatId: Scalars['HashId'];
};


export type QueryEventArgs = {
  eventId: Scalars['HashId'];
};


export type QueryEventsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  chatId: Scalars['HashId'];
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryRequestsArgs = {
  state?: InputMaybe<RequestState>;
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

/**
 * Request is a type of notification that requires a response
 *     and is sent to a single user
 */
export type Request = {
  createdAt: Scalars['Date'];
  createdBy: User;
  createdById: Scalars['HashId'];
  id: Scalars['HashId'];
  isCreator: Scalars['Boolean'];
  recipient: User;
  recipientId: Scalars['HashId'];
  state: RequestState;
};

export type RequestAcceptedAlert = Alert & Notification & {
  __typename?: 'RequestAcceptedAlert';
  createdAt: Scalars['Date'];
  createdBy: User;
  createdById: Scalars['HashId'];
  id: Scalars['HashId'];
  isCreator: Scalars['Boolean'];
  recipients: Array<User>;
  request: Request;
  requestId: Scalars['HashId'];
};

export type RequestDeclinedAlert = Alert & Notification & {
  __typename?: 'RequestDeclinedAlert';
  createdAt: Scalars['Date'];
  createdBy: User;
  createdById: Scalars['HashId'];
  id: Scalars['HashId'];
  isCreator: Scalars['Boolean'];
  recipients: Array<User>;
  request: Request;
  requestId: Scalars['HashId'];
};

export enum RequestState {
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
  /** Subscribe to alerts */
  alerts?: Maybe<Alert>;
  /** Subscribe to created events in chat */
  eventCreated?: Maybe<Event>;
  /** Subscribe to deleted events in chat */
  eventDeleted?: Maybe<DeletedEvent>;
  /** Subscribe to updated events in chat */
  eventUpdated?: Maybe<Event>;
  /** Subscribe to any created/updated/deleted events */
  events?: Maybe<Event>;
  /** Subscribe to all types of notifications */
  notifications?: Maybe<Notification>;
  /** Subscribe to requests */
  requests?: Maybe<Request>;
};


export type SubscriptionEventCreatedArgs = {
  chatId?: InputMaybe<Scalars['HashId']>;
};


export type SubscriptionEventDeletedArgs = {
  chatId?: InputMaybe<Scalars['HashId']>;
};


export type SubscriptionEventUpdatedArgs = {
  chatId?: InputMaybe<Scalars['HashId']>;
};


export type SubscriptionEventsArgs = {
  chatId?: InputMaybe<Scalars['HashId']>;
};

export type User = {
  createdAt: Scalars['Date'];
  id: Scalars['HashId'];
  name?: Maybe<Scalars['String']>;
  updatedAt: Scalars['Date'];
  username: Scalars['String'];
};

export type UserAlteration = {
  users: Array<User>;
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


export type GetChatForChatInfoAsideQuery = { __typename?: 'Query', chat?: { __typename?: 'DeletedChat' } | { __typename?: 'DirectMessageChat', friend: { __typename?: 'Friend', id: any, username: string, name?: string | null } } | { __typename?: 'GroupChat', name: string, isAdmin: boolean, createdById: any, members: Array<{ __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null, friendRequest?: { __typename?: 'FriendRequest', id: any, isCreator: boolean, createdById: any, recipientId: any, state: RequestState } | null }> } | null };

export type GetEventsQueryVariables = Exact<{
  chatId: Scalars['HashId'];
  last?: InputMaybe<Scalars['Int']>;
  before?: InputMaybe<Scalars['String']>;
}>;


export type GetEventsQuery = { __typename?: 'Query', events: { __typename?: 'EventConnection', pageInfo: { __typename?: 'PageInfo', hasPreviousPage: boolean, startCursor?: string | null }, edges?: Array<{ __typename?: 'EventEdge', node?: { __typename?: 'AdminsAdded', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }, users: Array<{ __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }> } | { __typename?: 'AdminsRemoved', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }, users: Array<{ __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }> } | { __typename?: 'DeletedEvent', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } } | { __typename?: 'DescriptionUpdated', id: any, createdAt: any, descriptionAfter: string, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'MembersAdded', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }, users: Array<{ __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }> } | { __typename?: 'MembersRemoved', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }, users: Array<{ __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }> } | { __typename?: 'Message', id: any, createdAt: any, isCreator: boolean, content: string, createdBy: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } } | { __typename?: 'NameUpdated', id: any, createdAt: any, nameAfter: string, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | null } | null> | null } };

export type EventsSubscriptionVariables = Exact<{
  chatId?: InputMaybe<Scalars['HashId']>;
}>;


export type EventsSubscription = { __typename?: 'Subscription', events?: { __typename?: 'AdminsAdded', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }, users: Array<{ __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }> } | { __typename?: 'AdminsRemoved', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }, users: Array<{ __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }> } | { __typename?: 'DeletedEvent', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } } | { __typename?: 'DescriptionUpdated', id: any, createdAt: any, descriptionAfter: string, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'MembersAdded', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }, users: Array<{ __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }> } | { __typename?: 'MembersRemoved', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }, users: Array<{ __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }> } | { __typename?: 'Message', id: any, createdAt: any, isCreator: boolean, content: string, createdBy: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } } | { __typename?: 'NameUpdated', id: any, createdAt: any, nameAfter: string, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | null };

type ChatPanelEvent_AdminsAdded_Fragment = { __typename?: 'AdminsAdded', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }, users: Array<{ __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }> };

type ChatPanelEvent_AdminsRemoved_Fragment = { __typename?: 'AdminsRemoved', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }, users: Array<{ __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }> };

type ChatPanelEvent_DeletedEvent_Fragment = { __typename?: 'DeletedEvent', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } };

type ChatPanelEvent_DescriptionUpdated_Fragment = { __typename?: 'DescriptionUpdated', id: any, createdAt: any, descriptionAfter: string, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

type ChatPanelEvent_MembersAdded_Fragment = { __typename?: 'MembersAdded', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }, users: Array<{ __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }> };

type ChatPanelEvent_MembersRemoved_Fragment = { __typename?: 'MembersRemoved', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }, users: Array<{ __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }> };

type ChatPanelEvent_Message_Fragment = { __typename?: 'Message', id: any, createdAt: any, isCreator: boolean, content: string, createdBy: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } };

type ChatPanelEvent_NameUpdated_Fragment = { __typename?: 'NameUpdated', id: any, createdAt: any, nameAfter: string, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

export type ChatPanelEventFragment = ChatPanelEvent_AdminsAdded_Fragment | ChatPanelEvent_AdminsRemoved_Fragment | ChatPanelEvent_DeletedEvent_Fragment | ChatPanelEvent_DescriptionUpdated_Fragment | ChatPanelEvent_MembersAdded_Fragment | ChatPanelEvent_MembersRemoved_Fragment | ChatPanelEvent_Message_Fragment | ChatPanelEvent_NameUpdated_Fragment;

type ChatUpdateEvent_AdminsAdded_Fragment = { __typename?: 'AdminsAdded', createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }, users: Array<{ __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }> };

type ChatUpdateEvent_AdminsRemoved_Fragment = { __typename?: 'AdminsRemoved', createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }, users: Array<{ __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }> };

type ChatUpdateEvent_DescriptionUpdated_Fragment = { __typename?: 'DescriptionUpdated', descriptionAfter: string, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

type ChatUpdateEvent_MembersAdded_Fragment = { __typename?: 'MembersAdded', createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }, users: Array<{ __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }> };

type ChatUpdateEvent_MembersRemoved_Fragment = { __typename?: 'MembersRemoved', createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }, users: Array<{ __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }> };

type ChatUpdateEvent_NameUpdated_Fragment = { __typename?: 'NameUpdated', nameAfter: string, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

export type ChatUpdateEventFragment = ChatUpdateEvent_AdminsAdded_Fragment | ChatUpdateEvent_AdminsRemoved_Fragment | ChatUpdateEvent_DescriptionUpdated_Fragment | ChatUpdateEvent_MembersAdded_Fragment | ChatUpdateEvent_MembersRemoved_Fragment | ChatUpdateEvent_NameUpdated_Fragment;

type ChatUpdateUserAlteration_AdminsAdded_Fragment = { __typename?: 'AdminsAdded', users: Array<{ __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }> };

type ChatUpdateUserAlteration_AdminsRemoved_Fragment = { __typename?: 'AdminsRemoved', users: Array<{ __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }> };

type ChatUpdateUserAlteration_MembersAdded_Fragment = { __typename?: 'MembersAdded', users: Array<{ __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }> };

type ChatUpdateUserAlteration_MembersRemoved_Fragment = { __typename?: 'MembersRemoved', users: Array<{ __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }> };

export type ChatUpdateUserAlterationFragment = ChatUpdateUserAlteration_AdminsAdded_Fragment | ChatUpdateUserAlteration_AdminsRemoved_Fragment | ChatUpdateUserAlteration_MembersAdded_Fragment | ChatUpdateUserAlteration_MembersRemoved_Fragment;

export type DeletedEventComponentFragment = { __typename?: 'DeletedEvent', id: any, isCreator: boolean, createdAt: any, createdBy: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } };

type EventAvatar_AdminsAdded_Fragment = { __typename?: 'AdminsAdded', id: any, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

type EventAvatar_AdminsRemoved_Fragment = { __typename?: 'AdminsRemoved', id: any, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

type EventAvatar_DeletedEvent_Fragment = { __typename?: 'DeletedEvent', id: any, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

type EventAvatar_DescriptionUpdated_Fragment = { __typename?: 'DescriptionUpdated', id: any, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

type EventAvatar_MembersAdded_Fragment = { __typename?: 'MembersAdded', id: any, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

type EventAvatar_MembersRemoved_Fragment = { __typename?: 'MembersRemoved', id: any, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

type EventAvatar_Message_Fragment = { __typename?: 'Message', id: any, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

type EventAvatar_NameUpdated_Fragment = { __typename?: 'NameUpdated', id: any, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

export type EventAvatarFragment = EventAvatar_AdminsAdded_Fragment | EventAvatar_AdminsRemoved_Fragment | EventAvatar_DeletedEvent_Fragment | EventAvatar_DescriptionUpdated_Fragment | EventAvatar_MembersAdded_Fragment | EventAvatar_MembersRemoved_Fragment | EventAvatar_Message_Fragment | EventAvatar_NameUpdated_Fragment;

type EventContainer_AdminsAdded_Fragment = { __typename?: 'AdminsAdded', id: any, createdAt: any, isCreator: boolean };

type EventContainer_AdminsRemoved_Fragment = { __typename?: 'AdminsRemoved', id: any, createdAt: any, isCreator: boolean };

type EventContainer_DeletedEvent_Fragment = { __typename?: 'DeletedEvent', id: any, createdAt: any, isCreator: boolean };

type EventContainer_DescriptionUpdated_Fragment = { __typename?: 'DescriptionUpdated', id: any, createdAt: any, isCreator: boolean };

type EventContainer_MembersAdded_Fragment = { __typename?: 'MembersAdded', id: any, createdAt: any, isCreator: boolean };

type EventContainer_MembersRemoved_Fragment = { __typename?: 'MembersRemoved', id: any, createdAt: any, isCreator: boolean };

type EventContainer_Message_Fragment = { __typename?: 'Message', id: any, createdAt: any, isCreator: boolean };

type EventContainer_NameUpdated_Fragment = { __typename?: 'NameUpdated', id: any, createdAt: any, isCreator: boolean };

export type EventContainerFragment = EventContainer_AdminsAdded_Fragment | EventContainer_AdminsRemoved_Fragment | EventContainer_DeletedEvent_Fragment | EventContainer_DescriptionUpdated_Fragment | EventContainer_MembersAdded_Fragment | EventContainer_MembersRemoved_Fragment | EventContainer_Message_Fragment | EventContainer_NameUpdated_Fragment;

type EventInfo_AdminsAdded_Fragment = { __typename?: 'AdminsAdded', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

type EventInfo_AdminsRemoved_Fragment = { __typename?: 'AdminsRemoved', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

type EventInfo_DeletedEvent_Fragment = { __typename?: 'DeletedEvent', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

type EventInfo_DescriptionUpdated_Fragment = { __typename?: 'DescriptionUpdated', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

type EventInfo_MembersAdded_Fragment = { __typename?: 'MembersAdded', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

type EventInfo_MembersRemoved_Fragment = { __typename?: 'MembersRemoved', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

type EventInfo_Message_Fragment = { __typename?: 'Message', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

type EventInfo_NameUpdated_Fragment = { __typename?: 'NameUpdated', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

export type EventInfoFragment = EventInfo_AdminsAdded_Fragment | EventInfo_AdminsRemoved_Fragment | EventInfo_DeletedEvent_Fragment | EventInfo_DescriptionUpdated_Fragment | EventInfo_MembersAdded_Fragment | EventInfo_MembersRemoved_Fragment | EventInfo_Message_Fragment | EventInfo_NameUpdated_Fragment;

type IncomingEvent_AdminsAdded_Fragment = { __typename?: 'AdminsAdded', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } };

type IncomingEvent_AdminsRemoved_Fragment = { __typename?: 'AdminsRemoved', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } };

type IncomingEvent_DeletedEvent_Fragment = { __typename?: 'DeletedEvent', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } };

type IncomingEvent_DescriptionUpdated_Fragment = { __typename?: 'DescriptionUpdated', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } };

type IncomingEvent_MembersAdded_Fragment = { __typename?: 'MembersAdded', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } };

type IncomingEvent_MembersRemoved_Fragment = { __typename?: 'MembersRemoved', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } };

type IncomingEvent_Message_Fragment = { __typename?: 'Message', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } };

type IncomingEvent_NameUpdated_Fragment = { __typename?: 'NameUpdated', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } };

export type IncomingEventFragment = IncomingEvent_AdminsAdded_Fragment | IncomingEvent_AdminsRemoved_Fragment | IncomingEvent_DeletedEvent_Fragment | IncomingEvent_DescriptionUpdated_Fragment | IncomingEvent_MembersAdded_Fragment | IncomingEvent_MembersRemoved_Fragment | IncomingEvent_Message_Fragment | IncomingEvent_NameUpdated_Fragment;

export type DeleteMessageMutationVariables = Exact<{
  messageId: Scalars['HashId'];
}>;


export type DeleteMessageMutation = { __typename?: 'Mutation', deleteEvent?: { __typename?: 'DeletedEvent', id: any } | null };

export type MessageEventFragment = { __typename?: 'Message', id: any, isCreator: boolean, content: string, createdAt: any, createdBy: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } };

type MessageActions_AdminsAdded_Fragment = { __typename?: 'AdminsAdded', id: any, isCreator: boolean };

type MessageActions_AdminsRemoved_Fragment = { __typename?: 'AdminsRemoved', id: any, isCreator: boolean };

type MessageActions_DeletedEvent_Fragment = { __typename?: 'DeletedEvent', id: any, isCreator: boolean };

type MessageActions_DescriptionUpdated_Fragment = { __typename?: 'DescriptionUpdated', id: any, isCreator: boolean };

type MessageActions_MembersAdded_Fragment = { __typename?: 'MembersAdded', id: any, isCreator: boolean };

type MessageActions_MembersRemoved_Fragment = { __typename?: 'MembersRemoved', id: any, isCreator: boolean };

type MessageActions_Message_Fragment = { __typename?: 'Message', id: any, isCreator: boolean };

type MessageActions_NameUpdated_Fragment = { __typename?: 'NameUpdated', id: any, isCreator: boolean };

export type MessageActionsFragment = MessageActions_AdminsAdded_Fragment | MessageActions_AdminsRemoved_Fragment | MessageActions_DeletedEvent_Fragment | MessageActions_DescriptionUpdated_Fragment | MessageActions_MembersAdded_Fragment | MessageActions_MembersRemoved_Fragment | MessageActions_Message_Fragment | MessageActions_NameUpdated_Fragment;

export type MessageBubbleFragment = { __typename?: 'Message', id: any, content: string };

type OutgoingEvent_AdminsAdded_Fragment = { __typename?: 'AdminsAdded', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

type OutgoingEvent_AdminsRemoved_Fragment = { __typename?: 'AdminsRemoved', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

type OutgoingEvent_DeletedEvent_Fragment = { __typename?: 'DeletedEvent', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

type OutgoingEvent_DescriptionUpdated_Fragment = { __typename?: 'DescriptionUpdated', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

type OutgoingEvent_MembersAdded_Fragment = { __typename?: 'MembersAdded', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

type OutgoingEvent_MembersRemoved_Fragment = { __typename?: 'MembersRemoved', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

type OutgoingEvent_Message_Fragment = { __typename?: 'Message', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

type OutgoingEvent_NameUpdated_Fragment = { __typename?: 'NameUpdated', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

export type OutgoingEventFragment = OutgoingEvent_AdminsAdded_Fragment | OutgoingEvent_AdminsRemoved_Fragment | OutgoingEvent_DeletedEvent_Fragment | OutgoingEvent_DescriptionUpdated_Fragment | OutgoingEvent_MembersAdded_Fragment | OutgoingEvent_MembersRemoved_Fragment | OutgoingEvent_Message_Fragment | OutgoingEvent_NameUpdated_Fragment;

export type CreateMessageMutationVariables = Exact<{
  chatId: Scalars['HashId'];
  content: Scalars['String'];
}>;


export type CreateMessageMutation = { __typename?: 'Mutation', createMessage?: { __typename?: 'Message', id: any, createdAt: any, content: string, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } } | null };

export type GetChatsForChatDisplayQueryVariables = Exact<{ [key: string]: never; }>;


export type GetChatsForChatDisplayQuery = { __typename?: 'Query', chats: Array<{ __typename?: 'DeletedChat', id: any, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'DirectMessageChat', id: any, friend: { __typename?: 'Friend', id: any, username: string, name?: string | null }, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'GroupChat', id: any, name: string, members: Array<{ __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null }>, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } }> };

type ChatItem_DeletedChat_Fragment = { __typename?: 'DeletedChat', id: any };

type ChatItem_DirectMessageChat_Fragment = { __typename?: 'DirectMessageChat', id: any, friend: { __typename?: 'Friend', id: any, username: string } };

type ChatItem_GroupChat_Fragment = { __typename?: 'GroupChat', name: string, id: any, members: Array<{ __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }> };

export type ChatItemFragment = ChatItem_DeletedChat_Fragment | ChatItem_DirectMessageChat_Fragment | ChatItem_GroupChat_Fragment;

type ChatItemUser_Friend_Fragment = { __typename?: 'Friend', id: any, username: string };

type ChatItemUser_Me_Fragment = { __typename?: 'Me', id: any, username: string };

type ChatItemUser_Stranger_Fragment = { __typename?: 'Stranger', id: any, username: string };

export type ChatItemUserFragment = ChatItemUser_Friend_Fragment | ChatItemUser_Me_Fragment | ChatItemUser_Stranger_Fragment;

export type GetMeForAccountMenuQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeForAccountMenuQuery = { __typename?: 'Query', me?: { __typename?: 'Me', id: any, username: string, name?: string | null } | null };

export type GetChatForAnimatedTitleQueryVariables = Exact<{
  chatId: Scalars['HashId'];
}>;


export type GetChatForAnimatedTitleQuery = { __typename?: 'Query', chat?: { __typename?: 'DeletedChat', id: any } | { __typename?: 'DirectMessageChat', id: any, friend: { __typename?: 'Friend', id: any, name?: string | null, username: string } } | { __typename?: 'GroupChat', name: string, description?: string | null, isAdmin: boolean, id: any } | null };

export type FriendRequestNotificationFragment = { __typename?: 'FriendRequest', id: any, createdAt: any, createdById: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } };

export type GetFriendsForCreateGroupChatQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFriendsForCreateGroupChatQuery = { __typename?: 'Query', friends: Array<{ __typename?: 'Friend', id: any, name?: string | null, username: string }> };

export type GetFriendsForSelectSearchModalQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFriendsForSelectSearchModalQuery = { __typename?: 'Query', friends: Array<{ __typename?: 'Friend', id: any, username: string, name?: string | null }> };

export type GetChatForUpdateQueryVariables = Exact<{
  chatId: Scalars['HashId'];
}>;


export type GetChatForUpdateQuery = { __typename?: 'Query', chat?: { __typename?: 'DeletedChat', id: any, isCreator: boolean, createdById: any } | { __typename?: 'DirectMessageChat', id: any, isCreator: boolean, createdById: any } | { __typename?: 'GroupChat', name: string, description?: string | null, isAdmin: boolean, id: any, isCreator: boolean, createdById: any, members: Array<{ __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }>, admins: Array<{ __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }> } | null };

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


export type GetUserSearchQuery = { __typename?: 'Query', users: { __typename?: 'UserConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null }, edges?: Array<{ __typename?: 'UserEdge', cursor: string, node?: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null, friendRequest?: { __typename?: 'FriendRequest', id: any, isCreator: boolean, createdById: any, recipientId: any, state: RequestState } | null } | null } | null> | null } };

type UserSearchModelUser_Friend_Fragment = { __typename?: 'Friend', id: any, username: string, name?: string | null };

type UserSearchModelUser_Me_Fragment = { __typename?: 'Me', id: any, username: string, name?: string | null };

type UserSearchModelUser_Stranger_Fragment = { __typename?: 'Stranger', id: any, username: string, name?: string | null, friendRequest?: { __typename?: 'FriendRequest', id: any, isCreator: boolean, createdById: any, recipientId: any, state: RequestState } | null };

export type UserSearchModelUserFragment = UserSearchModelUser_Friend_Fragment | UserSearchModelUser_Me_Fragment | UserSearchModelUser_Stranger_Fragment;

export type GetNotificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNotificationsQuery = { __typename?: 'Query', notifications: Array<{ __typename?: 'ChatCreatedAlert', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', status: StrangerStatus, id: any, name?: string | null, username: string } } | { __typename?: 'ChatDeletedAlert', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', status: StrangerStatus, id: any, name?: string | null, username: string } } | { __typename?: 'FriendDeletedAlert', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', status: StrangerStatus, id: any, name?: string | null, username: string } } | { __typename?: 'FriendRequest', createdById: any, isCreator: boolean, state: RequestState, id: any, createdAt: any, createdBy: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', status: StrangerStatus, id: any, name?: string | null, username: string, friendRequest?: { __typename?: 'FriendRequest', id: any } | null }, recipient: { __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', status: StrangerStatus, id: any } } | { __typename?: 'RequestAcceptedAlert', id: any, createdAt: any, isCreator: boolean, request: { __typename?: 'FriendRequest', id: any, state: RequestState }, createdBy: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', status: StrangerStatus, id: any, name?: string | null, username: string } } | { __typename?: 'RequestDeclinedAlert', id: any, createdAt: any, isCreator: boolean, request: { __typename?: 'FriendRequest', id: any, state: RequestState }, createdBy: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', status: StrangerStatus, id: any, name?: string | null, username: string } }> };

export type NotificationsSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NotificationsSubscription = { __typename?: 'Subscription', notifications?: { __typename?: 'ChatCreatedAlert', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', status: StrangerStatus, id: any, name?: string | null, username: string } } | { __typename?: 'ChatDeletedAlert', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', status: StrangerStatus, id: any, name?: string | null, username: string } } | { __typename?: 'FriendDeletedAlert', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', status: StrangerStatus, id: any, name?: string | null, username: string } } | { __typename?: 'FriendRequest', createdById: any, isCreator: boolean, state: RequestState, id: any, createdAt: any, createdBy: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', status: StrangerStatus, id: any, name?: string | null, username: string, friendRequest?: { __typename?: 'FriendRequest', id: any } | null }, recipient: { __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', status: StrangerStatus, id: any } } | { __typename?: 'RequestAcceptedAlert', id: any, createdAt: any, isCreator: boolean, request: { __typename?: 'FriendRequest', id: any, state: RequestState }, createdBy: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', status: StrangerStatus, id: any, name?: string | null, username: string } } | { __typename?: 'RequestDeclinedAlert', id: any, createdAt: any, isCreator: boolean, request: { __typename?: 'FriendRequest', id: any, state: RequestState }, createdBy: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', status: StrangerStatus, id: any, name?: string | null, username: string } } | null };

type LiveNotification_ChatCreatedAlert_Fragment = { __typename?: 'ChatCreatedAlert', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', status: StrangerStatus, id: any, name?: string | null, username: string } };

type LiveNotification_ChatDeletedAlert_Fragment = { __typename?: 'ChatDeletedAlert', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', status: StrangerStatus, id: any, name?: string | null, username: string } };

type LiveNotification_FriendDeletedAlert_Fragment = { __typename?: 'FriendDeletedAlert', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', status: StrangerStatus, id: any, name?: string | null, username: string } };

type LiveNotification_FriendRequest_Fragment = { __typename?: 'FriendRequest', createdById: any, isCreator: boolean, state: RequestState, id: any, createdAt: any, createdBy: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', status: StrangerStatus, id: any, name?: string | null, username: string, friendRequest?: { __typename?: 'FriendRequest', id: any } | null }, recipient: { __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', status: StrangerStatus, id: any } };

type LiveNotification_RequestAcceptedAlert_Fragment = { __typename?: 'RequestAcceptedAlert', id: any, createdAt: any, isCreator: boolean, request: { __typename?: 'FriendRequest', id: any, state: RequestState }, createdBy: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', status: StrangerStatus, id: any, name?: string | null, username: string } };

type LiveNotification_RequestDeclinedAlert_Fragment = { __typename?: 'RequestDeclinedAlert', id: any, createdAt: any, isCreator: boolean, request: { __typename?: 'FriendRequest', id: any, state: RequestState }, createdBy: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', status: StrangerStatus, id: any, name?: string | null, username: string } };

export type LiveNotificationFragment = LiveNotification_ChatCreatedAlert_Fragment | LiveNotification_ChatDeletedAlert_Fragment | LiveNotification_FriendDeletedAlert_Fragment | LiveNotification_FriendRequest_Fragment | LiveNotification_RequestAcceptedAlert_Fragment | LiveNotification_RequestDeclinedAlert_Fragment;

export type GetMeForUserProviderQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeForUserProviderQuery = { __typename?: 'Query', me?: { __typename?: 'Me', id: any, username: string, name?: string | null } | null };

type ChatAvatar_DeletedChat_Fragment = { __typename?: 'DeletedChat', id: any };

type ChatAvatar_DirectMessageChat_Fragment = { __typename?: 'DirectMessageChat', id: any, friend: { __typename?: 'Friend', id: any, username: string } };

type ChatAvatar_GroupChat_Fragment = { __typename?: 'GroupChat', name: string, id: any };

export type ChatAvatarFragment = ChatAvatar_DeletedChat_Fragment | ChatAvatar_DirectMessageChat_Fragment | ChatAvatar_GroupChat_Fragment;

export type GetChatForChatUpdateActionQueryVariables = Exact<{
  chatId: Scalars['HashId'];
}>;


export type GetChatForChatUpdateActionQuery = { __typename?: 'Query', chat?: { __typename?: 'DeletedChat' } | { __typename?: 'DirectMessageChat' } | { __typename?: 'GroupChat', isAdmin: boolean } | null };

type UserAvatar_Friend_Fragment = { __typename?: 'Friend', id: any, username: string, name?: string | null };

type UserAvatar_Me_Fragment = { __typename?: 'Me', id: any, username: string, name?: string | null };

type UserAvatar_Stranger_Fragment = { __typename?: 'Stranger', id: any, username: string, name?: string | null };

export type UserAvatarFragment = UserAvatar_Friend_Fragment | UserAvatar_Me_Fragment | UserAvatar_Stranger_Fragment;

type UserItem_Friend_Fragment = { __typename?: 'Friend', id: any, username: string, name?: string | null };

type UserItem_Me_Fragment = { __typename?: 'Me', id: any, username: string, name?: string | null };

type UserItem_Stranger_Fragment = { __typename?: 'Stranger', id: any, username: string, name?: string | null };

export type UserItemFragment = UserItem_Friend_Fragment | UserItem_Me_Fragment | UserItem_Stranger_Fragment;

type UserMenu_Friend_Fragment = { __typename?: 'Friend', id: any };

type UserMenu_Me_Fragment = { __typename?: 'Me', id: any };

type UserMenu_Stranger_Fragment = { __typename?: 'Stranger', id: any, friendRequest?: { __typename?: 'FriendRequest', id: any, isCreator: boolean, createdById: any, recipientId: any, state: RequestState } | null };

export type UserMenuFragment = UserMenu_Friend_Fragment | UserMenu_Me_Fragment | UserMenu_Stranger_Fragment;

type UserList_Friend_Fragment = { __typename?: 'Friend', id: any, username: string, name?: string | null };

type UserList_Me_Fragment = { __typename?: 'Me', id: any, username: string, name?: string | null };

type UserList_Stranger_Fragment = { __typename?: 'Stranger', id: any, username: string, name?: string | null, friendRequest?: { __typename?: 'FriendRequest', id: any, isCreator: boolean, createdById: any, recipientId: any, state: RequestState } | null };

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

export type AcceptRequestMutationVariables = Exact<{
  requestId: Scalars['HashId'];
}>;


export type AcceptRequestMutation = { __typename?: 'Mutation', acceptRequest?: { __typename?: 'FriendRequest', id: any, isCreator: boolean, createdById: any, recipientId: any, state: RequestState } | null };

export type DeclineRequestMutationVariables = Exact<{
  requestId: Scalars['HashId'];
}>;


export type DeclineRequestMutation = { __typename?: 'Mutation', declineRequest?: { __typename?: 'FriendRequest', id: any, isCreator: boolean, createdById: any, recipientId: any, state: RequestState } | null };

export type CancelRequestMutationVariables = Exact<{
  requestId: Scalars['HashId'];
}>;


export type CancelRequestMutation = { __typename?: 'Mutation', cancelRequest?: { __typename?: 'FriendRequest', id: any, isCreator: boolean, createdById: any, recipientId: any, state: RequestState } | null };

export type SendFriendRequestMutationVariables = Exact<{
  strangerId: Scalars['HashId'];
}>;


export type SendFriendRequestMutation = { __typename?: 'Mutation', sendFriendRequest?: { __typename?: 'FriendRequest', id: any, isCreator: boolean, createdById: any, recipientId: any, state: RequestState } | null };

export type RequestInfoFragment = { __typename?: 'FriendRequest', id: any, isCreator: boolean, createdById: any, recipientId: any, state: RequestState };

export type FriendRequestStrangerFragment = { __typename?: 'Stranger', id: any, friendRequest?: { __typename?: 'FriendRequest', id: any } | null };

export type UpdateGroupChatNameMutationVariables = Exact<{
  chatId: Scalars['HashId'];
  name: Scalars['String'];
}>;


export type UpdateGroupChatNameMutation = { __typename?: 'Mutation', updateGroupChatName?: { __typename?: 'NameUpdated', nameBefore: string, nameAfter: string, id: any, chat: { __typename?: 'DeletedChat', id: any } | { __typename?: 'DirectMessageChat', id: any } | { __typename?: 'GroupChat', name: string, id: any }, createdBy: { __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', id: any } } | null };

export type UpdateGroupChatDescriptionMutationVariables = Exact<{
  chatId: Scalars['HashId'];
  description: Scalars['String'];
}>;


export type UpdateGroupChatDescriptionMutation = { __typename?: 'Mutation', updateGroupChatDescription?: { __typename?: 'DescriptionUpdated', descriptionBefore: string, descriptionAfter: string, id: any, chat: { __typename?: 'DeletedChat', id: any } | { __typename?: 'DirectMessageChat', id: any } | { __typename?: 'GroupChat', description?: string | null, id: any }, createdBy: { __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', id: any } } | null };

export type AddMembersToGroupChatMutationVariables = Exact<{
  chatId: Scalars['HashId'];
  members: Array<Scalars['HashId']> | Scalars['HashId'];
}>;


export type AddMembersToGroupChatMutation = { __typename?: 'Mutation', addMembersToGroupChat?: { __typename?: 'MembersAdded', id: any, chat: { __typename?: 'DeletedChat', id: any } | { __typename?: 'DirectMessageChat', id: any } | { __typename?: 'GroupChat', id: any, members: Array<{ __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', id: any }> }, createdBy: { __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', id: any }, users: Array<{ __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }> } | null };

export type RemoveMembersFromGroupChatMutationVariables = Exact<{
  chatId: Scalars['HashId'];
  members: Array<Scalars['HashId']> | Scalars['HashId'];
}>;


export type RemoveMembersFromGroupChatMutation = { __typename?: 'Mutation', removeMembersFromGroupChat?: { __typename?: 'MembersRemoved', id: any, chat: { __typename?: 'DeletedChat', id: any } | { __typename?: 'DirectMessageChat', id: any } | { __typename?: 'GroupChat', id: any, members: Array<{ __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', id: any }> }, createdBy: { __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', id: any }, users: Array<{ __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }> } | null };

export type AddAdminsToGroupChatMutationVariables = Exact<{
  chatId: Scalars['HashId'];
  members: Array<Scalars['HashId']> | Scalars['HashId'];
}>;


export type AddAdminsToGroupChatMutation = { __typename?: 'Mutation', addAdminsToGroupChat?: { __typename?: 'AdminsAdded', id: any, chat: { __typename?: 'DeletedChat', id: any } | { __typename?: 'DirectMessageChat', id: any } | { __typename?: 'GroupChat', id: any, admins: Array<{ __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', id: any }> }, createdBy: { __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', id: any }, users: Array<{ __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }> } | null };

export type RemoveAdminsFromGroupChatMutationVariables = Exact<{
  chatId: Scalars['HashId'];
  members: Array<Scalars['HashId']> | Scalars['HashId'];
}>;


export type RemoveAdminsFromGroupChatMutation = { __typename?: 'Mutation', removeAdminsFromGroupChat?: { __typename?: 'AdminsRemoved', id: any, chat: { __typename?: 'DeletedChat', id: any } | { __typename?: 'DirectMessageChat', id: any } | { __typename?: 'GroupChat', id: any, admins: Array<{ __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', id: any }> }, createdBy: { __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', id: any }, users: Array<{ __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }> } | null };

type GroupChatUpdate_AdminsAdded_Fragment = { __typename?: 'AdminsAdded', id: any, createdBy: { __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', id: any } };

type GroupChatUpdate_AdminsRemoved_Fragment = { __typename?: 'AdminsRemoved', id: any, createdBy: { __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', id: any } };

type GroupChatUpdate_DescriptionUpdated_Fragment = { __typename?: 'DescriptionUpdated', id: any, createdBy: { __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', id: any } };

type GroupChatUpdate_MembersAdded_Fragment = { __typename?: 'MembersAdded', id: any, createdBy: { __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', id: any } };

type GroupChatUpdate_MembersRemoved_Fragment = { __typename?: 'MembersRemoved', id: any, createdBy: { __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', id: any } };

type GroupChatUpdate_NameUpdated_Fragment = { __typename?: 'NameUpdated', id: any, createdBy: { __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', id: any } };

export type GroupChatUpdateFragment = GroupChatUpdate_AdminsAdded_Fragment | GroupChatUpdate_AdminsRemoved_Fragment | GroupChatUpdate_DescriptionUpdated_Fragment | GroupChatUpdate_MembersAdded_Fragment | GroupChatUpdate_MembersRemoved_Fragment | GroupChatUpdate_NameUpdated_Fragment;

type UserAlerationGroupChatUpdate_AdminsAdded_Fragment = { __typename?: 'AdminsAdded', users: Array<{ __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }> };

type UserAlerationGroupChatUpdate_AdminsRemoved_Fragment = { __typename?: 'AdminsRemoved', users: Array<{ __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }> };

type UserAlerationGroupChatUpdate_MembersAdded_Fragment = { __typename?: 'MembersAdded', users: Array<{ __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }> };

type UserAlerationGroupChatUpdate_MembersRemoved_Fragment = { __typename?: 'MembersRemoved', users: Array<{ __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }> };

export type UserAlerationGroupChatUpdateFragment = UserAlerationGroupChatUpdate_AdminsAdded_Fragment | UserAlerationGroupChatUpdate_AdminsRemoved_Fragment | UserAlerationGroupChatUpdate_MembersAdded_Fragment | UserAlerationGroupChatUpdate_MembersRemoved_Fragment;

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
  name
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
    fragment MessageActions on Event {
  id
  isCreator
}
    `;
export const MessageEventFragmentDoc = gql`
    fragment MessageEvent on Message {
  id
  isCreator
  content
  ...OutgoingEvent
  ...IncomingEvent
  ...MessageActions
}
    ${OutgoingEventFragmentDoc}
${IncomingEventFragmentDoc}
${MessageActionsFragmentDoc}`;
export const DeletedEventComponentFragmentDoc = gql`
    fragment DeletedEventComponent on DeletedEvent {
  id
  isCreator
  ...OutgoingEvent
  ...IncomingEvent
  ...MessageActions
}
    ${OutgoingEventFragmentDoc}
${IncomingEventFragmentDoc}
${MessageActionsFragmentDoc}`;
export const ChatUpdateUserAlterationFragmentDoc = gql`
    fragment ChatUpdateUserAlteration on UserAlteration {
  users {
    id
    username
  }
}
    `;
export const ChatUpdateEventFragmentDoc = gql`
    fragment ChatUpdateEvent on ChatUpdate {
  createdBy {
    id
    username
  }
  ... on NameUpdated {
    nameAfter
  }
  ... on DescriptionUpdated {
    descriptionAfter
  }
  ... on MembersAdded {
    ...ChatUpdateUserAlteration
  }
  ... on MembersRemoved {
    ...ChatUpdateUserAlteration
  }
  ... on AdminsAdded {
    ...ChatUpdateUserAlteration
  }
  ... on AdminsRemoved {
    ...ChatUpdateUserAlteration
  }
}
    ${ChatUpdateUserAlterationFragmentDoc}`;
export const ChatPanelEventFragmentDoc = gql`
    fragment ChatPanelEvent on Event {
  id
  createdAt
  createdBy {
    id
  }
  ...EventContainer
  ...MessageEvent
  ...DeletedEventComponent
  ... on ChatUpdate {
    ...ChatUpdateEvent
  }
}
    ${EventContainerFragmentDoc}
${MessageEventFragmentDoc}
${DeletedEventComponentFragmentDoc}
${ChatUpdateEventFragmentDoc}`;
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
export const ChatItemUserFragmentDoc = gql`
    fragment ChatItemUser on User {
  id
  username
}
    `;
export const ChatItemFragmentDoc = gql`
    fragment ChatItem on Chat {
  id
  ...ChatAvatar
  ... on DirectMessageChat {
    friend {
      ...ChatItemUser
    }
  }
  ... on GroupChat {
    name
    members {
      ...ChatItemUser
    }
  }
}
    ${ChatAvatarFragmentDoc}
${ChatItemUserFragmentDoc}`;
export const FriendRequestNotificationFragmentDoc = gql`
    fragment FriendRequestNotification on FriendRequest {
  id
  createdAt
  createdById
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
    friendRequest {
      id
      isCreator
      createdById
      recipientId
      state
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
export const UserSearchModelUserFragmentDoc = gql`
    fragment UserSearchModelUser on User {
  id
  ...UserList
}
    ${UserListFragmentDoc}`;
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
  ... on RequestDeclinedAlert {
    request {
      id
      state
    }
  }
  ... on RequestAcceptedAlert {
    request {
      id
      state
    }
  }
  ... on Request {
    createdById
    isCreator
    state
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
  createdById
  recipientId
  state
}
    `;
export const FriendRequestStrangerFragmentDoc = gql`
    fragment FriendRequestStranger on Stranger {
  id
  friendRequest {
    id
  }
}
    `;
export const GroupChatUpdateFragmentDoc = gql`
    fragment GroupChatUpdate on ChatUpdate {
  id
  createdBy {
    id
  }
}
    `;
export const UserAlerationGroupChatUpdateFragmentDoc = gql`
    fragment UserAlerationGroupChatUpdate on UserAlteration {
  users {
    id
    username
  }
}
    `;
export const GetChatForChatInfoAsideDocument = gql`
    query GetChatForChatInfoAside($chatId: HashId!) {
  chat(chatId: $chatId) {
    ... on DirectMessageChat {
      friend {
        id
        ...UserItem
        ...UserMenu
      }
    }
    ... on GroupChat {
      name
      isAdmin
      createdById
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
export const GetEventsDocument = gql`
    query GetEvents($chatId: HashId!, $last: Int, $before: String) {
  events(chatId: $chatId, last: $last, before: $before) {
    pageInfo {
      hasPreviousPage
      startCursor
    }
    edges {
      node {
        ...ChatPanelEvent
      }
    }
  }
}
    ${ChatPanelEventFragmentDoc}`;

/**
 * __useGetEventsQuery__
 *
 * To run a query within a React component, call `useGetEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventsQuery({
 *   variables: {
 *      chatId: // value for 'chatId'
 *      last: // value for 'last'
 *      before: // value for 'before'
 *   },
 * });
 */
export function useGetEventsQuery(baseOptions: Apollo.QueryHookOptions<GetEventsQuery, GetEventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEventsQuery, GetEventsQueryVariables>(GetEventsDocument, options);
      }
export function useGetEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEventsQuery, GetEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEventsQuery, GetEventsQueryVariables>(GetEventsDocument, options);
        }
export type GetEventsQueryHookResult = ReturnType<typeof useGetEventsQuery>;
export type GetEventsLazyQueryHookResult = ReturnType<typeof useGetEventsLazyQuery>;
export type GetEventsQueryResult = Apollo.QueryResult<GetEventsQuery, GetEventsQueryVariables>;
export const EventsDocument = gql`
    subscription Events($chatId: HashId) {
  events(chatId: $chatId) {
    ...ChatPanelEvent
  }
}
    ${ChatPanelEventFragmentDoc}`;

/**
 * __useEventsSubscription__
 *
 * To run a query within a React component, call `useEventsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useEventsSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventsSubscription({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useEventsSubscription(baseOptions?: Apollo.SubscriptionHookOptions<EventsSubscription, EventsSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<EventsSubscription, EventsSubscriptionVariables>(EventsDocument, options);
      }
export type EventsSubscriptionHookResult = ReturnType<typeof useEventsSubscription>;
export type EventsSubscriptionResult = Apollo.SubscriptionResult<EventsSubscription>;
export const DeleteMessageDocument = gql`
    mutation DeleteMessage($messageId: HashId!) {
  deleteEvent(eventId: $messageId) {
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
export const GetChatsForChatDisplayDocument = gql`
    query GetChatsForChatDisplay {
  chats {
    id
    ...ChatItem
    createdBy {
      id
      username
    }
    ... on GroupChat {
      members {
        id
        username
        name
      }
    }
    ... on DirectMessageChat {
      friend {
        id
        username
        name
      }
    }
  }
}
    ${ChatItemFragmentDoc}`;

/**
 * __useGetChatsForChatDisplayQuery__
 *
 * To run a query within a React component, call `useGetChatsForChatDisplayQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChatsForChatDisplayQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChatsForChatDisplayQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetChatsForChatDisplayQuery(baseOptions?: Apollo.QueryHookOptions<GetChatsForChatDisplayQuery, GetChatsForChatDisplayQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetChatsForChatDisplayQuery, GetChatsForChatDisplayQueryVariables>(GetChatsForChatDisplayDocument, options);
      }
export function useGetChatsForChatDisplayLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChatsForChatDisplayQuery, GetChatsForChatDisplayQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetChatsForChatDisplayQuery, GetChatsForChatDisplayQueryVariables>(GetChatsForChatDisplayDocument, options);
        }
export type GetChatsForChatDisplayQueryHookResult = ReturnType<typeof useGetChatsForChatDisplayQuery>;
export type GetChatsForChatDisplayLazyQueryHookResult = ReturnType<typeof useGetChatsForChatDisplayLazyQuery>;
export type GetChatsForChatDisplayQueryResult = Apollo.QueryResult<GetChatsForChatDisplayQuery, GetChatsForChatDisplayQueryVariables>;
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
    createdById
    ... on GroupChat {
      name
      description
      members {
        ...UpdateGroupUser
      }
      admins {
        ...UpdateGroupUser
      }
      isAdmin
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
        ...UserSearchModelUser
      }
    }
  }
}
    ${UserSearchModelUserFragmentDoc}`;

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
export const AcceptRequestDocument = gql`
    mutation AcceptRequest($requestId: HashId!) {
  acceptRequest(requestId: $requestId) {
    ...RequestInfo
  }
}
    ${RequestInfoFragmentDoc}`;
export type AcceptRequestMutationFn = Apollo.MutationFunction<AcceptRequestMutation, AcceptRequestMutationVariables>;

/**
 * __useAcceptRequestMutation__
 *
 * To run a mutation, you first call `useAcceptRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptRequestMutation, { data, loading, error }] = useAcceptRequestMutation({
 *   variables: {
 *      requestId: // value for 'requestId'
 *   },
 * });
 */
export function useAcceptRequestMutation(baseOptions?: Apollo.MutationHookOptions<AcceptRequestMutation, AcceptRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcceptRequestMutation, AcceptRequestMutationVariables>(AcceptRequestDocument, options);
      }
export type AcceptRequestMutationHookResult = ReturnType<typeof useAcceptRequestMutation>;
export type AcceptRequestMutationResult = Apollo.MutationResult<AcceptRequestMutation>;
export type AcceptRequestMutationOptions = Apollo.BaseMutationOptions<AcceptRequestMutation, AcceptRequestMutationVariables>;
export const DeclineRequestDocument = gql`
    mutation DeclineRequest($requestId: HashId!) {
  declineRequest(requestId: $requestId) {
    ...RequestInfo
  }
}
    ${RequestInfoFragmentDoc}`;
export type DeclineRequestMutationFn = Apollo.MutationFunction<DeclineRequestMutation, DeclineRequestMutationVariables>;

/**
 * __useDeclineRequestMutation__
 *
 * To run a mutation, you first call `useDeclineRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeclineRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [declineRequestMutation, { data, loading, error }] = useDeclineRequestMutation({
 *   variables: {
 *      requestId: // value for 'requestId'
 *   },
 * });
 */
export function useDeclineRequestMutation(baseOptions?: Apollo.MutationHookOptions<DeclineRequestMutation, DeclineRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeclineRequestMutation, DeclineRequestMutationVariables>(DeclineRequestDocument, options);
      }
export type DeclineRequestMutationHookResult = ReturnType<typeof useDeclineRequestMutation>;
export type DeclineRequestMutationResult = Apollo.MutationResult<DeclineRequestMutation>;
export type DeclineRequestMutationOptions = Apollo.BaseMutationOptions<DeclineRequestMutation, DeclineRequestMutationVariables>;
export const CancelRequestDocument = gql`
    mutation CancelRequest($requestId: HashId!) {
  cancelRequest(requestId: $requestId) {
    ...RequestInfo
  }
}
    ${RequestInfoFragmentDoc}`;
export type CancelRequestMutationFn = Apollo.MutationFunction<CancelRequestMutation, CancelRequestMutationVariables>;

/**
 * __useCancelRequestMutation__
 *
 * To run a mutation, you first call `useCancelRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelRequestMutation, { data, loading, error }] = useCancelRequestMutation({
 *   variables: {
 *      requestId: // value for 'requestId'
 *   },
 * });
 */
export function useCancelRequestMutation(baseOptions?: Apollo.MutationHookOptions<CancelRequestMutation, CancelRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelRequestMutation, CancelRequestMutationVariables>(CancelRequestDocument, options);
      }
export type CancelRequestMutationHookResult = ReturnType<typeof useCancelRequestMutation>;
export type CancelRequestMutationResult = Apollo.MutationResult<CancelRequestMutation>;
export type CancelRequestMutationOptions = Apollo.BaseMutationOptions<CancelRequestMutation, CancelRequestMutationVariables>;
export const SendFriendRequestDocument = gql`
    mutation SendFriendRequest($strangerId: HashId!) {
  sendFriendRequest(strangerId: $strangerId) {
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
 *      strangerId: // value for 'strangerId'
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
export const UpdateGroupChatNameDocument = gql`
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
    ${GroupChatUpdateFragmentDoc}`;
export type UpdateGroupChatNameMutationFn = Apollo.MutationFunction<UpdateGroupChatNameMutation, UpdateGroupChatNameMutationVariables>;

/**
 * __useUpdateGroupChatNameMutation__
 *
 * To run a mutation, you first call `useUpdateGroupChatNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateGroupChatNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateGroupChatNameMutation, { data, loading, error }] = useUpdateGroupChatNameMutation({
 *   variables: {
 *      chatId: // value for 'chatId'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUpdateGroupChatNameMutation(baseOptions?: Apollo.MutationHookOptions<UpdateGroupChatNameMutation, UpdateGroupChatNameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateGroupChatNameMutation, UpdateGroupChatNameMutationVariables>(UpdateGroupChatNameDocument, options);
      }
export type UpdateGroupChatNameMutationHookResult = ReturnType<typeof useUpdateGroupChatNameMutation>;
export type UpdateGroupChatNameMutationResult = Apollo.MutationResult<UpdateGroupChatNameMutation>;
export type UpdateGroupChatNameMutationOptions = Apollo.BaseMutationOptions<UpdateGroupChatNameMutation, UpdateGroupChatNameMutationVariables>;
export const UpdateGroupChatDescriptionDocument = gql`
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
    ${GroupChatUpdateFragmentDoc}`;
export type UpdateGroupChatDescriptionMutationFn = Apollo.MutationFunction<UpdateGroupChatDescriptionMutation, UpdateGroupChatDescriptionMutationVariables>;

/**
 * __useUpdateGroupChatDescriptionMutation__
 *
 * To run a mutation, you first call `useUpdateGroupChatDescriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateGroupChatDescriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateGroupChatDescriptionMutation, { data, loading, error }] = useUpdateGroupChatDescriptionMutation({
 *   variables: {
 *      chatId: // value for 'chatId'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useUpdateGroupChatDescriptionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateGroupChatDescriptionMutation, UpdateGroupChatDescriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateGroupChatDescriptionMutation, UpdateGroupChatDescriptionMutationVariables>(UpdateGroupChatDescriptionDocument, options);
      }
export type UpdateGroupChatDescriptionMutationHookResult = ReturnType<typeof useUpdateGroupChatDescriptionMutation>;
export type UpdateGroupChatDescriptionMutationResult = Apollo.MutationResult<UpdateGroupChatDescriptionMutation>;
export type UpdateGroupChatDescriptionMutationOptions = Apollo.BaseMutationOptions<UpdateGroupChatDescriptionMutation, UpdateGroupChatDescriptionMutationVariables>;
export const AddMembersToGroupChatDocument = gql`
    mutation AddMembersToGroupChat($chatId: HashId!, $members: [HashId!]!) {
  addMembersToGroupChat(chatId: $chatId, members: $members) {
    ...GroupChatUpdate
    ...UserAlerationGroupChatUpdate
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
    ${GroupChatUpdateFragmentDoc}
${UserAlerationGroupChatUpdateFragmentDoc}`;
export type AddMembersToGroupChatMutationFn = Apollo.MutationFunction<AddMembersToGroupChatMutation, AddMembersToGroupChatMutationVariables>;

/**
 * __useAddMembersToGroupChatMutation__
 *
 * To run a mutation, you first call `useAddMembersToGroupChatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMembersToGroupChatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMembersToGroupChatMutation, { data, loading, error }] = useAddMembersToGroupChatMutation({
 *   variables: {
 *      chatId: // value for 'chatId'
 *      members: // value for 'members'
 *   },
 * });
 */
export function useAddMembersToGroupChatMutation(baseOptions?: Apollo.MutationHookOptions<AddMembersToGroupChatMutation, AddMembersToGroupChatMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddMembersToGroupChatMutation, AddMembersToGroupChatMutationVariables>(AddMembersToGroupChatDocument, options);
      }
export type AddMembersToGroupChatMutationHookResult = ReturnType<typeof useAddMembersToGroupChatMutation>;
export type AddMembersToGroupChatMutationResult = Apollo.MutationResult<AddMembersToGroupChatMutation>;
export type AddMembersToGroupChatMutationOptions = Apollo.BaseMutationOptions<AddMembersToGroupChatMutation, AddMembersToGroupChatMutationVariables>;
export const RemoveMembersFromGroupChatDocument = gql`
    mutation RemoveMembersFromGroupChat($chatId: HashId!, $members: [HashId!]!) {
  removeMembersFromGroupChat(chatId: $chatId, members: $members) {
    ...GroupChatUpdate
    ...UserAlerationGroupChatUpdate
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
    ${GroupChatUpdateFragmentDoc}
${UserAlerationGroupChatUpdateFragmentDoc}`;
export type RemoveMembersFromGroupChatMutationFn = Apollo.MutationFunction<RemoveMembersFromGroupChatMutation, RemoveMembersFromGroupChatMutationVariables>;

/**
 * __useRemoveMembersFromGroupChatMutation__
 *
 * To run a mutation, you first call `useRemoveMembersFromGroupChatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveMembersFromGroupChatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeMembersFromGroupChatMutation, { data, loading, error }] = useRemoveMembersFromGroupChatMutation({
 *   variables: {
 *      chatId: // value for 'chatId'
 *      members: // value for 'members'
 *   },
 * });
 */
export function useRemoveMembersFromGroupChatMutation(baseOptions?: Apollo.MutationHookOptions<RemoveMembersFromGroupChatMutation, RemoveMembersFromGroupChatMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveMembersFromGroupChatMutation, RemoveMembersFromGroupChatMutationVariables>(RemoveMembersFromGroupChatDocument, options);
      }
export type RemoveMembersFromGroupChatMutationHookResult = ReturnType<typeof useRemoveMembersFromGroupChatMutation>;
export type RemoveMembersFromGroupChatMutationResult = Apollo.MutationResult<RemoveMembersFromGroupChatMutation>;
export type RemoveMembersFromGroupChatMutationOptions = Apollo.BaseMutationOptions<RemoveMembersFromGroupChatMutation, RemoveMembersFromGroupChatMutationVariables>;
export const AddAdminsToGroupChatDocument = gql`
    mutation AddAdminsToGroupChat($chatId: HashId!, $members: [HashId!]!) {
  addAdminsToGroupChat(chatId: $chatId, members: $members) {
    ...GroupChatUpdate
    ...UserAlerationGroupChatUpdate
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
    ${GroupChatUpdateFragmentDoc}
${UserAlerationGroupChatUpdateFragmentDoc}`;
export type AddAdminsToGroupChatMutationFn = Apollo.MutationFunction<AddAdminsToGroupChatMutation, AddAdminsToGroupChatMutationVariables>;

/**
 * __useAddAdminsToGroupChatMutation__
 *
 * To run a mutation, you first call `useAddAdminsToGroupChatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddAdminsToGroupChatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addAdminsToGroupChatMutation, { data, loading, error }] = useAddAdminsToGroupChatMutation({
 *   variables: {
 *      chatId: // value for 'chatId'
 *      members: // value for 'members'
 *   },
 * });
 */
export function useAddAdminsToGroupChatMutation(baseOptions?: Apollo.MutationHookOptions<AddAdminsToGroupChatMutation, AddAdminsToGroupChatMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddAdminsToGroupChatMutation, AddAdminsToGroupChatMutationVariables>(AddAdminsToGroupChatDocument, options);
      }
export type AddAdminsToGroupChatMutationHookResult = ReturnType<typeof useAddAdminsToGroupChatMutation>;
export type AddAdminsToGroupChatMutationResult = Apollo.MutationResult<AddAdminsToGroupChatMutation>;
export type AddAdminsToGroupChatMutationOptions = Apollo.BaseMutationOptions<AddAdminsToGroupChatMutation, AddAdminsToGroupChatMutationVariables>;
export const RemoveAdminsFromGroupChatDocument = gql`
    mutation RemoveAdminsFromGroupChat($chatId: HashId!, $members: [HashId!]!) {
  removeAdminsFromGroupChat(chatId: $chatId, members: $members) {
    ...GroupChatUpdate
    ...UserAlerationGroupChatUpdate
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
    ${GroupChatUpdateFragmentDoc}
${UserAlerationGroupChatUpdateFragmentDoc}`;
export type RemoveAdminsFromGroupChatMutationFn = Apollo.MutationFunction<RemoveAdminsFromGroupChatMutation, RemoveAdminsFromGroupChatMutationVariables>;

/**
 * __useRemoveAdminsFromGroupChatMutation__
 *
 * To run a mutation, you first call `useRemoveAdminsFromGroupChatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveAdminsFromGroupChatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeAdminsFromGroupChatMutation, { data, loading, error }] = useRemoveAdminsFromGroupChatMutation({
 *   variables: {
 *      chatId: // value for 'chatId'
 *      members: // value for 'members'
 *   },
 * });
 */
export function useRemoveAdminsFromGroupChatMutation(baseOptions?: Apollo.MutationHookOptions<RemoveAdminsFromGroupChatMutation, RemoveAdminsFromGroupChatMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveAdminsFromGroupChatMutation, RemoveAdminsFromGroupChatMutationVariables>(RemoveAdminsFromGroupChatDocument, options);
      }
export type RemoveAdminsFromGroupChatMutationHookResult = ReturnType<typeof useRemoveAdminsFromGroupChatMutation>;
export type RemoveAdminsFromGroupChatMutationResult = Apollo.MutationResult<RemoveAdminsFromGroupChatMutation>;
export type RemoveAdminsFromGroupChatMutationOptions = Apollo.BaseMutationOptions<RemoveAdminsFromGroupChatMutation, RemoveAdminsFromGroupChatMutationVariables>;