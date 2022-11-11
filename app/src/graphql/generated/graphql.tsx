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
  /** Users that recieved alert */
  recipients: Array<User>;
};

export enum AlertState {
  All = 'ALL',
  Unseen = 'UNSEEN'
}

/** Chat interface */
export type Chat = {
  /** Time of creation */
  createdAt?: Maybe<Scalars['Date']>;
  /** User that created the chat */
  createdBy: User;
  /** Id of user that created the chat */
  createdById: Scalars['HashId'];
  /** Id of chat */
  id: Scalars['HashId'];
  /** Are you the creator? */
  isCreator: Scalars['Boolean'];
  /** Time of last update */
  updatedAt?: Maybe<Scalars['Date']>;
};

/** An alert about chat access changes */
export type ChatAccessAlert = {
  /** Chat associated with alert */
  chat: Chat;
  /** Id of chat associated with alert */
  chatId: Scalars['HashId'];
  createdAt: Scalars['Date'];
  createdBy: User;
  createdById: Scalars['HashId'];
  id: Scalars['HashId'];
  isCreator: Scalars['Boolean'];
  /** Users that recieved alert */
  recipients: Array<User>;
};

export type ChatAdminAccessGrantedAlert = Alert & ChatAccessAlert & Notification & {
  __typename?: 'ChatAdminAccessGrantedAlert';
  /** Chat associated with alert */
  chat: Chat;
  /** Id of chat associated with alert */
  chatId: Scalars['HashId'];
  createdAt: Scalars['Date'];
  createdBy: User;
  createdById: Scalars['HashId'];
  id: Scalars['HashId'];
  isCreator: Scalars['Boolean'];
  /** Users that recieved alert */
  recipients: Array<User>;
};

export type ChatAdminAccessRevokedAlert = Alert & ChatAccessAlert & Notification & {
  __typename?: 'ChatAdminAccessRevokedAlert';
  /** Chat associated with alert */
  chat: Chat;
  /** Id of chat associated with alert */
  chatId: Scalars['HashId'];
  createdAt: Scalars['Date'];
  createdBy: User;
  createdById: Scalars['HashId'];
  id: Scalars['HashId'];
  isCreator: Scalars['Boolean'];
  /** Users that recieved alert */
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
  /** Users that recieved alert */
  recipients: Array<User>;
};

/** A chat member */
export type ChatMember = Member & {
  __typename?: 'ChatMember';
  /** User that added this member into the chat */
  addedBy: User;
  /** Id of user that added this member into the chat */
  addedById: Scalars['HashId'];
  /** Chat associated with member */
  chat: Chat;
  /** Id of chat assiociated with member */
  chatId: Scalars['HashId'];
  /** Role of member in chat */
  role: Role;
  /** User associated with member */
  user: User;
  /** Id of user assiociated with member */
  userId: Scalars['HashId'];
};

export type ChatMemberAccessGrantedAlert = Alert & ChatAccessAlert & Notification & {
  __typename?: 'ChatMemberAccessGrantedAlert';
  /** Chat associated with alert */
  chat: Chat;
  /** Id of chat associated with alert */
  chatId: Scalars['HashId'];
  createdAt: Scalars['Date'];
  createdBy: User;
  createdById: Scalars['HashId'];
  id: Scalars['HashId'];
  isCreator: Scalars['Boolean'];
  /** Users that recieved alert */
  recipients: Array<User>;
};

export type ChatMemberAccessRevokedAlert = Alert & ChatAccessAlert & Notification & {
  __typename?: 'ChatMemberAccessRevokedAlert';
  /** Chat associated with alert */
  chat: Chat;
  /** Id of chat associated with alert */
  chatId: Scalars['HashId'];
  createdAt: Scalars['Date'];
  createdBy: User;
  createdById: Scalars['HashId'];
  id: Scalars['HashId'];
  isCreator: Scalars['Boolean'];
  /** Users that recieved alert */
  recipients: Array<User>;
};

export type ChatSubscriptionResult = DeletedChat | DirectMessageChat | GroupChat;

/** Event involving an update within chat */
export type ChatUpdateEvent = {
  /** Chat associated with event */
  chat: Chat;
  /** Id of chat associated with event */
  chatId: Scalars['HashId'];
  /** Time of creation */
  createdAt: Scalars['Date'];
  /** User that created the chat */
  createdBy: User;
  /** Id of user that created the chat */
  createdById: Scalars['HashId'];
  /** Id of chat */
  id: Scalars['HashId'];
  /** Are you the creator of the chat? */
  isCreator: Scalars['Boolean'];
  /** Time of last update */
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

/** A chat that has been deleted */
export type DeletedChat = Chat & {
  __typename?: 'DeletedChat';
  /** Time of creation */
  createdAt?: Maybe<Scalars['Date']>;
  /** User that created the chat */
  createdBy: User;
  /** Id of user that created the chat */
  createdById: Scalars['HashId'];
  deletedAt: Scalars['Date'];
  /** Id of chat */
  id: Scalars['HashId'];
  /** Are you the creator? */
  isCreator: Scalars['Boolean'];
  /** Time of last update */
  updatedAt?: Maybe<Scalars['Date']>;
};

/** A deleted event */
export type DeletedEvent = Event & {
  __typename?: 'DeletedEvent';
  /** Chat associated with event */
  chat: Chat;
  /** Id of chat associated with event */
  chatId: Scalars['HashId'];
  /** Time of creation */
  createdAt: Scalars['Date'];
  /** User that created the chat */
  createdBy: User;
  /** Id of user that created the chat */
  createdById: Scalars['HashId'];
  /** Time event was deleted */
  deletedAt: Scalars['Date'];
  /** Id of chat */
  id: Scalars['HashId'];
  /** Are you the creator of the chat? */
  isCreator: Scalars['Boolean'];
  /** Time of last update */
  updatedAt: Scalars['Date'];
};

/** A member that as been deleted */
export type DeletedMember = Member & {
  __typename?: 'DeletedMember';
  /** User that added this member into the chat */
  addedBy: User;
  /** Id of user that added this member into the chat */
  addedById: Scalars['HashId'];
  /** Chat associated with member */
  chat: Chat;
  /** Id of chat assiociated with member */
  chatId: Scalars['HashId'];
  /** User that deleted this member from the chat */
  deletedBy: User;
  /** Id of user that deleted this member from the chat */
  deletedById: Scalars['HashId'];
  /** Role of member in chat */
  role: Role;
  /** User associated with member */
  user: User;
  /** Id of user assiociated with member */
  userId: Scalars['HashId'];
};

/** Chat description updated event */
export type DescriptionUpdatedEvent = ChatUpdateEvent & Event & {
  __typename?: 'DescriptionUpdatedEvent';
  /** Chat associated with event */
  chat: Chat;
  /** Id of chat associated with event */
  chatId: Scalars['HashId'];
  /** Time of creation */
  createdAt: Scalars['Date'];
  /** User that created the chat */
  createdBy: User;
  /** Id of user that created the chat */
  createdById: Scalars['HashId'];
  descriptionAfter: Scalars['String'];
  descriptionBefore: Scalars['String'];
  /** Id of chat */
  id: Scalars['HashId'];
  /** Are you the creator of the chat? */
  isCreator: Scalars['Boolean'];
  /** Time of last update */
  updatedAt: Scalars['Date'];
};

/** A direct message chat is a conversation between 2 members */
export type DirectMessageChat = Chat & {
  __typename?: 'DirectMessageChat';
  /** Time of creation */
  createdAt?: Maybe<Scalars['Date']>;
  /** User that created the chat */
  createdBy: User;
  /** Id of user that created the chat */
  createdById: Scalars['HashId'];
  /** Events in chat */
  events: EventConnection;
  /** Other user involved in direct message conversation */
  friend: User;
  /** Id of chat */
  id: Scalars['HashId'];
  /** Are you the creator? */
  isCreator: Scalars['Boolean'];
  /** Time of last update */
  updatedAt?: Maybe<Scalars['Date']>;
};


/** A direct message chat is a conversation between 2 members */
export type DirectMessageChatEventsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

/** A chat event */
export type Event = {
  /** Chat associated with event */
  chat: Chat;
  /** Id of chat associated with event */
  chatId: Scalars['HashId'];
  /** Time of creation */
  createdAt: Scalars['Date'];
  /** User that created the chat */
  createdBy: User;
  /** Id of user that created the chat */
  createdById: Scalars['HashId'];
  /** Id of chat */
  id: Scalars['HashId'];
  /** Are you the creator of the chat? */
  isCreator: Scalars['Boolean'];
  /** Time of last update */
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
  /** Users that recieved alert */
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

/**
 *
 *     A group chat can involve two or more members, can have a name, a description and members can be given roles.
 */
export type GroupChat = Chat & {
  __typename?: 'GroupChat';
  /** Time of creation */
  createdAt?: Maybe<Scalars['Date']>;
  /** User that created the chat */
  createdBy: User;
  /** Id of user that created the chat */
  createdById: Scalars['HashId'];
  /** Group chat description */
  description?: Maybe<Scalars['String']>;
  /** Events in chat */
  events: EventConnection;
  /** Id of chat */
  id: Scalars['HashId'];
  /** Are you the creator? */
  isCreator: Scalars['Boolean'];
  /** Number of members in the chat */
  memberCount: Scalars['Int'];
  /** Members in chat */
  members: MemberConnection;
  /** Group chat name */
  name: Scalars['String'];
  /** Your role in the chat */
  role: Role;
  /** Time of last update */
  updatedAt?: Maybe<Scalars['Date']>;
};


/**
 *
 *     A group chat can involve two or more members, can have a name, a description and members can be given roles.
 */
export type GroupChatEventsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


/**
 *
 *     A group chat can involve two or more members, can have a name, a description and members can be given roles.
 */
export type GroupChatMembersArgs = {
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

/** Member of chat */
export type Member = {
  /** User that added this member into the chat */
  addedBy: User;
  /** Id of user that added this member into the chat */
  addedById: Scalars['HashId'];
  /** Chat associated with member */
  chat: Chat;
  /** Id of chat assiociated with member */
  chatId: Scalars['HashId'];
  /** Role of member in chat */
  role: Role;
  /** User associated with member */
  user: User;
  /** Id of user assiociated with member */
  userId: Scalars['HashId'];
};

/** Event involving alterations of member/s in chat */
export type MemberAlterationEvent = {
  /** Chat associated with event */
  chat: Chat;
  /** Id of chat associated with event */
  chatId: Scalars['HashId'];
  /** Time of creation */
  createdAt: Scalars['Date'];
  /** User that created the chat */
  createdBy: User;
  /** Id of user that created the chat */
  createdById: Scalars['HashId'];
  /** Id of chat */
  id: Scalars['HashId'];
  /** Are you the creator of the chat? */
  isCreator: Scalars['Boolean'];
  members: Array<Member>;
  /** Time of last update */
  updatedAt: Scalars['Date'];
};

export type MemberConnection = {
  __typename?: 'MemberConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges?: Maybe<Array<Maybe<MemberEdge>>>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
};

export type MemberEdge = {
  __typename?: 'MemberEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node?: Maybe<Member>;
};

/** Members added to chat event */
export type MembersAddedEvent = ChatUpdateEvent & Event & MemberAlterationEvent & {
  __typename?: 'MembersAddedEvent';
  /** Chat associated with event */
  chat: Chat;
  /** Id of chat associated with event */
  chatId: Scalars['HashId'];
  /** Time of creation */
  createdAt: Scalars['Date'];
  /** User that created the chat */
  createdBy: User;
  /** Id of user that created the chat */
  createdById: Scalars['HashId'];
  /** Id of chat */
  id: Scalars['HashId'];
  /** Are you the creator of the chat? */
  isCreator: Scalars['Boolean'];
  members: Array<Member>;
  /** Time of last update */
  updatedAt: Scalars['Date'];
};

/** Members removed from chat event */
export type MembersRemovedEvent = ChatUpdateEvent & Event & MemberAlterationEvent & {
  __typename?: 'MembersRemovedEvent';
  /** Chat associated with event */
  chat: Chat;
  /** Id of chat associated with event */
  chatId: Scalars['HashId'];
  /** Time of creation */
  createdAt: Scalars['Date'];
  /** User that created the chat */
  createdBy: User;
  /** Id of user that created the chat */
  createdById: Scalars['HashId'];
  /** Id of chat */
  id: Scalars['HashId'];
  /** Are you the creator of the chat? */
  isCreator: Scalars['Boolean'];
  members: Array<Member>;
  /** Time of last update */
  updatedAt: Scalars['Date'];
};

/** Message event */
export type MessageEvent = Event & {
  __typename?: 'MessageEvent';
  /** Chat associated with event */
  chat: Chat;
  /** Id of chat associated with event */
  chatId: Scalars['HashId'];
  /** Content of message */
  content: Scalars['String'];
  /** Time of creation */
  createdAt: Scalars['Date'];
  /** User that created the chat */
  createdBy: User;
  /** Id of user that created the chat */
  createdById: Scalars['HashId'];
  /** Id of chat */
  id: Scalars['HashId'];
  /** Are you the creator of the chat? */
  isCreator: Scalars['Boolean'];
  /** Users that liked this message */
  likedBy: Array<User>;
  /** Time of last update */
  updatedAt: Scalars['Date'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Accept a request */
  acceptRequest?: Maybe<Request>;
  /**
   *
   *     By acknowledging an alert, you'll be removed from the recipients.
   *     The alert will be deleted if all recipients have acknowledged it
   */
  acknowledgeAlert?: Maybe<Alert>;
  /** Add members to a group chat */
  addMembers?: Maybe<MembersAddedEvent>;
  /** Cancel a sent request */
  cancelRequest?: Maybe<Request>;
  /** Change the role of a list of members */
  changeRole?: Maybe<RoleChangedEvent>;
  /** Create a direct message chat */
  createDirectMessageChat?: Maybe<DirectMessageChat>;
  /** Create a group chat */
  createGroupChat?: Maybe<GroupChat>;
  /** Create a message in a chat */
  createMessage?: Maybe<MessageEvent>;
  /** Decline a received request */
  declineRequest?: Maybe<Request>;
  /** Delete a chat */
  deleteChat?: Maybe<DeletedChat>;
  /** A deleted event */
  deleteEvent?: Maybe<DeletedEvent>;
  /** Delete a Friend */
  deleteFriend?: Maybe<Stranger>;
  /** Leave a group chat */
  leaveGroupChat?: Maybe<MembersRemovedEvent>;
  /** Remove members from a group chat */
  removeMembers?: Maybe<MembersRemovedEvent>;
  /** Send a friend request to a user */
  sendFriendRequest?: Maybe<FriendRequest>;
  /** Update the description of a group chat */
  updateGroupChatDescription?: Maybe<DescriptionUpdatedEvent>;
  /** Update the name of group chat */
  updateGroupChatName?: Maybe<NameUpdatedEvent>;
  /** Update a message */
  updateMessage?: Maybe<MessageEvent>;
  /** Update current user */
  updateUser?: Maybe<Me>;
};


export type MutationAcceptRequestArgs = {
  requestId: Scalars['HashId'];
};


export type MutationAcknowledgeAlertArgs = {
  alertId: Scalars['HashId'];
};


export type MutationAddMembersArgs = {
  chatId: Scalars['HashId'];
  members: Array<Scalars['HashId']>;
};


export type MutationCancelRequestArgs = {
  requestId: Scalars['HashId'];
};


export type MutationChangeRoleArgs = {
  chatId: Scalars['HashId'];
  members: Array<Scalars['HashId']>;
  role: Role;
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


export type MutationLeaveGroupChatArgs = {
  chatId: Scalars['HashId'];
};


export type MutationRemoveMembersArgs = {
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

/** Chat name updated event */
export type NameUpdatedEvent = ChatUpdateEvent & Event & {
  __typename?: 'NameUpdatedEvent';
  /** Chat associated with event */
  chat: Chat;
  /** Id of chat associated with event */
  chatId: Scalars['HashId'];
  /** Time of creation */
  createdAt: Scalars['Date'];
  /** User that created the chat */
  createdBy: User;
  /** Id of user that created the chat */
  createdById: Scalars['HashId'];
  /** Id of chat */
  id: Scalars['HashId'];
  /** Are you the creator of the chat? */
  isCreator: Scalars['Boolean'];
  nameAfter: Scalars['String'];
  nameBefore: Scalars['String'];
  /** Time of last update */
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
  /** Get a chat by id */
  chat?: Maybe<Chat>;
  /** Get all chats you are a member in */
  chats: Array<Chat>;
  /** Get a event by id */
  event?: Maybe<Event>;
  /** Get events based on chat id */
  events: EventConnection;
  friends: Array<Friend>;
  me?: Maybe<Me>;
  /** Get Members based on chat id */
  members: MemberConnection;
  /** Get all notifications for current user */
  notifications: Array<Notification>;
  requests: Array<Request>;
  user?: Maybe<User>;
  /** Find users */
  users: UserConnection;
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


export type QueryMembersArgs = {
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

export type RequestAcceptedAlert = Alert & Notification & RequestResponseAlert & {
  __typename?: 'RequestAcceptedAlert';
  createdAt: Scalars['Date'];
  createdBy: User;
  createdById: Scalars['HashId'];
  id: Scalars['HashId'];
  isCreator: Scalars['Boolean'];
  /** Users that recieved alert */
  recipients: Array<User>;
  /** Request associated with alert */
  request: Request;
  /** Id of request associated with alert */
  requestId: Scalars['HashId'];
};

export type RequestDeclinedAlert = Alert & Notification & RequestResponseAlert & {
  __typename?: 'RequestDeclinedAlert';
  createdAt: Scalars['Date'];
  createdBy: User;
  createdById: Scalars['HashId'];
  id: Scalars['HashId'];
  isCreator: Scalars['Boolean'];
  /** Users that recieved alert */
  recipients: Array<User>;
  /** Request associated with alert */
  request: Request;
  /** Id of request associated with alert */
  requestId: Scalars['HashId'];
};

/** A response alert for requests */
export type RequestResponseAlert = {
  createdAt: Scalars['Date'];
  createdBy: User;
  createdById: Scalars['HashId'];
  id: Scalars['HashId'];
  isCreator: Scalars['Boolean'];
  /** Users that recieved alert */
  recipients: Array<User>;
  /** Request associated with alert */
  request: Request;
  /** Id of request associated with alert */
  requestId: Scalars['HashId'];
};

export enum RequestState {
  Accepted = 'ACCEPTED',
  Cancelled = 'CANCELLED',
  Declined = 'DECLINED',
  Sent = 'SENT'
}

/** Role of member in the chat */
export enum Role {
  Admin = 'ADMIN',
  Basic = 'BASIC',
  Owner = 'OWNER'
}

/** Roles of members updated event */
export type RoleChangedEvent = ChatUpdateEvent & Event & MemberAlterationEvent & {
  __typename?: 'RoleChangedEvent';
  /** Chat associated with event */
  chat: Chat;
  /** Id of chat associated with event */
  chatId: Scalars['HashId'];
  /** Time of creation */
  createdAt: Scalars['Date'];
  /** User that created the chat */
  createdBy: User;
  /** Id of user that created the chat */
  createdById: Scalars['HashId'];
  /** Id of chat */
  id: Scalars['HashId'];
  /** Are you the creator of the chat? */
  isCreator: Scalars['Boolean'];
  members: Array<Member>;
  newRole: Role;
  /** Time of last update */
  updatedAt: Scalars['Date'];
};

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
  /** Subscribe to alerts */
  alerts?: Maybe<Alert>;
  /** Subscribe to alerts */
  chatAccessAlerts?: Maybe<ChatAccessAlert>;
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

export type GetChatsForChatDisplayQueryVariables = Exact<{
  firstMembers?: InputMaybe<Scalars['Int']>;
  afterMember?: InputMaybe<Scalars['String']>;
}>;


export type GetChatsForChatDisplayQuery = { __typename?: 'Query', chats: Array<{ __typename?: 'DeletedChat', id: any, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'DirectMessageChat', id: any, friend: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null }, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'GroupChat', memberCount: number, id: any, name: string, members: { __typename?: 'MemberConnection', edges?: Array<{ __typename?: 'MemberEdge', node?: { __typename?: 'ChatMember', user: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } } | { __typename?: 'DeletedMember', user: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } } | null } | null> | null }, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } }> };

export type GetChatsForChatDisplayChangesSubscriptionVariables = Exact<{
  firstMembers?: InputMaybe<Scalars['Int']>;
  afterMember?: InputMaybe<Scalars['String']>;
}>;


export type GetChatsForChatDisplayChangesSubscription = { __typename?: 'Subscription', chatAccessAlerts?: { __typename?: 'ChatAdminAccessGrantedAlert', chat: { __typename?: 'DeletedChat', id: any, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'DirectMessageChat', id: any, friend: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null }, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'GroupChat', memberCount: number, id: any, name: string, members: { __typename?: 'MemberConnection', edges?: Array<{ __typename?: 'MemberEdge', node?: { __typename?: 'ChatMember', user: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } } | { __typename?: 'DeletedMember', user: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } } | null } | null> | null }, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } } | { __typename?: 'ChatAdminAccessRevokedAlert', chat: { __typename?: 'DeletedChat', id: any, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'DirectMessageChat', id: any, friend: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null }, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'GroupChat', memberCount: number, id: any, name: string, members: { __typename?: 'MemberConnection', edges?: Array<{ __typename?: 'MemberEdge', node?: { __typename?: 'ChatMember', user: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } } | { __typename?: 'DeletedMember', user: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } } | null } | null> | null }, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } } | { __typename?: 'ChatMemberAccessGrantedAlert', chat: { __typename?: 'DeletedChat', id: any, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'DirectMessageChat', id: any, friend: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null }, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'GroupChat', memberCount: number, id: any, name: string, members: { __typename?: 'MemberConnection', edges?: Array<{ __typename?: 'MemberEdge', node?: { __typename?: 'ChatMember', user: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } } | { __typename?: 'DeletedMember', user: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } } | null } | null> | null }, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } } | { __typename?: 'ChatMemberAccessRevokedAlert', chat: { __typename?: 'DeletedChat', id: any, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'DirectMessageChat', id: any, friend: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null }, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'GroupChat', memberCount: number, id: any, name: string, members: { __typename?: 'MemberConnection', edges?: Array<{ __typename?: 'MemberEdge', node?: { __typename?: 'ChatMember', user: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } } | { __typename?: 'DeletedMember', user: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } } | null } | null> | null }, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } } | null };

type ChatForChatDisplay_DeletedChat_Fragment = { __typename?: 'DeletedChat', id: any, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

type ChatForChatDisplay_DirectMessageChat_Fragment = { __typename?: 'DirectMessageChat', id: any, friend: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null }, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

type ChatForChatDisplay_GroupChat_Fragment = { __typename?: 'GroupChat', memberCount: number, id: any, name: string, members: { __typename?: 'MemberConnection', edges?: Array<{ __typename?: 'MemberEdge', node?: { __typename?: 'ChatMember', user: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } } | { __typename?: 'DeletedMember', user: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } } | null } | null> | null }, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

export type ChatForChatDisplayFragment = ChatForChatDisplay_DeletedChat_Fragment | ChatForChatDisplay_DirectMessageChat_Fragment | ChatForChatDisplay_GroupChat_Fragment;

type ChatItem_DeletedChat_Fragment = { __typename?: 'DeletedChat', id: any };

type ChatItem_DirectMessageChat_Fragment = { __typename?: 'DirectMessageChat', id: any, friend: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

type ChatItem_GroupChat_Fragment = { __typename?: 'GroupChat', name: string, memberCount: number, id: any, members: { __typename?: 'MemberConnection', edges?: Array<{ __typename?: 'MemberEdge', node?: { __typename?: 'ChatMember', user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'DeletedMember', user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | null } | null> | null } };

export type ChatItemFragment = ChatItem_DeletedChat_Fragment | ChatItem_DirectMessageChat_Fragment | ChatItem_GroupChat_Fragment;

type ChatItemUser_Friend_Fragment = { __typename?: 'Friend', id: any, username: string };

type ChatItemUser_Me_Fragment = { __typename?: 'Me', id: any, username: string };

type ChatItemUser_Stranger_Fragment = { __typename?: 'Stranger', id: any, username: string };

export type ChatItemUserFragment = ChatItemUser_Friend_Fragment | ChatItemUser_Me_Fragment | ChatItemUser_Stranger_Fragment;

export type GetChatForChatHeaderQueryVariables = Exact<{
  chatId: Scalars['HashId'];
}>;


export type GetChatForChatHeaderQuery = { __typename?: 'Query', chat?: { __typename?: 'DeletedChat', id: any } | { __typename?: 'DirectMessageChat', id: any, friend: { __typename?: 'Friend', username: string, id: any } | { __typename?: 'Me', username: string, id: any } | { __typename?: 'Stranger', username: string, id: any } } | { __typename?: 'GroupChat', name: string, description?: string | null, id: any } | null };

type ChatHeaderChat_DeletedChat_Fragment = { __typename?: 'DeletedChat', id: any };

type ChatHeaderChat_DirectMessageChat_Fragment = { __typename?: 'DirectMessageChat', id: any, friend: { __typename?: 'Friend', username: string, id: any } | { __typename?: 'Me', username: string, id: any } | { __typename?: 'Stranger', username: string, id: any } };

type ChatHeaderChat_GroupChat_Fragment = { __typename?: 'GroupChat', name: string, description?: string | null, id: any };

export type ChatHeaderChatFragment = ChatHeaderChat_DeletedChat_Fragment | ChatHeaderChat_DirectMessageChat_Fragment | ChatHeaderChat_GroupChat_Fragment;

export type GetEventsQueryVariables = Exact<{
  chatId: Scalars['HashId'];
  last?: InputMaybe<Scalars['Int']>;
  before?: InputMaybe<Scalars['String']>;
}>;


export type GetEventsQuery = { __typename?: 'Query', events: { __typename?: 'EventConnection', pageInfo: { __typename?: 'PageInfo', hasPreviousPage: boolean, startCursor?: string | null }, edges?: Array<{ __typename?: 'EventEdge', node?: { __typename?: 'DeletedEvent', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } } | { __typename?: 'DescriptionUpdatedEvent', id: any, createdAt: any, descriptionAfter: string, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'MembersAddedEvent', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }, members: Array<{ __typename?: 'ChatMember', user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'DeletedMember', user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } }> } | { __typename?: 'MembersRemovedEvent', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }, members: Array<{ __typename?: 'ChatMember', user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'DeletedMember', user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } }> } | { __typename?: 'MessageEvent', id: any, createdAt: any, isCreator: boolean, content: string, createdBy: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } } | { __typename?: 'NameUpdatedEvent', id: any, createdAt: any, nameAfter: string, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'RoleChangedEvent', id: any, createdAt: any, newRole: Role, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }, members: Array<{ __typename?: 'ChatMember', user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'DeletedMember', user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } }> } | null } | null> | null } };

export type EventsSubscriptionVariables = Exact<{
  chatId?: InputMaybe<Scalars['HashId']>;
}>;


export type EventsSubscription = { __typename?: 'Subscription', events?: { __typename?: 'DeletedEvent', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } } | { __typename?: 'DescriptionUpdatedEvent', id: any, createdAt: any, descriptionAfter: string, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'MembersAddedEvent', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }, members: Array<{ __typename?: 'ChatMember', user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'DeletedMember', user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } }> } | { __typename?: 'MembersRemovedEvent', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }, members: Array<{ __typename?: 'ChatMember', user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'DeletedMember', user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } }> } | { __typename?: 'MessageEvent', id: any, createdAt: any, isCreator: boolean, content: string, createdBy: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } } | { __typename?: 'NameUpdatedEvent', id: any, createdAt: any, nameAfter: string, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'RoleChangedEvent', id: any, createdAt: any, newRole: Role, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }, members: Array<{ __typename?: 'ChatMember', user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'DeletedMember', user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } }> } | null };

type ChatPanelEvent_DeletedEvent_Fragment = { __typename?: 'DeletedEvent', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } };

type ChatPanelEvent_DescriptionUpdatedEvent_Fragment = { __typename?: 'DescriptionUpdatedEvent', id: any, createdAt: any, descriptionAfter: string, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

type ChatPanelEvent_MembersAddedEvent_Fragment = { __typename?: 'MembersAddedEvent', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }, members: Array<{ __typename?: 'ChatMember', user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'DeletedMember', user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } }> };

type ChatPanelEvent_MembersRemovedEvent_Fragment = { __typename?: 'MembersRemovedEvent', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }, members: Array<{ __typename?: 'ChatMember', user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'DeletedMember', user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } }> };

type ChatPanelEvent_MessageEvent_Fragment = { __typename?: 'MessageEvent', id: any, createdAt: any, isCreator: boolean, content: string, createdBy: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } };

type ChatPanelEvent_NameUpdatedEvent_Fragment = { __typename?: 'NameUpdatedEvent', id: any, createdAt: any, nameAfter: string, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

type ChatPanelEvent_RoleChangedEvent_Fragment = { __typename?: 'RoleChangedEvent', id: any, createdAt: any, newRole: Role, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }, members: Array<{ __typename?: 'ChatMember', user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'DeletedMember', user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } }> };

export type ChatPanelEventFragment = ChatPanelEvent_DeletedEvent_Fragment | ChatPanelEvent_DescriptionUpdatedEvent_Fragment | ChatPanelEvent_MembersAddedEvent_Fragment | ChatPanelEvent_MembersRemovedEvent_Fragment | ChatPanelEvent_MessageEvent_Fragment | ChatPanelEvent_NameUpdatedEvent_Fragment | ChatPanelEvent_RoleChangedEvent_Fragment;

type ChatPanelChat_DeletedChat_Fragment = { __typename?: 'DeletedChat', id: any };

type ChatPanelChat_DirectMessageChat_Fragment = { __typename?: 'DirectMessageChat', id: any, friend: { __typename?: 'Friend', username: string, id: any } | { __typename?: 'Me', username: string, id: any } | { __typename?: 'Stranger', username: string, id: any } };

type ChatPanelChat_GroupChat_Fragment = { __typename?: 'GroupChat', name: string, description?: string | null, id: any };

export type ChatPanelChatFragment = ChatPanelChat_DeletedChat_Fragment | ChatPanelChat_DirectMessageChat_Fragment | ChatPanelChat_GroupChat_Fragment;

type ChatUpdateEventComponent_DescriptionUpdatedEvent_Fragment = { __typename?: 'DescriptionUpdatedEvent', descriptionAfter: string, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

type ChatUpdateEventComponent_MembersAddedEvent_Fragment = { __typename?: 'MembersAddedEvent', createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }, members: Array<{ __typename?: 'ChatMember', user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'DeletedMember', user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } }> };

type ChatUpdateEventComponent_MembersRemovedEvent_Fragment = { __typename?: 'MembersRemovedEvent', createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }, members: Array<{ __typename?: 'ChatMember', user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'DeletedMember', user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } }> };

type ChatUpdateEventComponent_NameUpdatedEvent_Fragment = { __typename?: 'NameUpdatedEvent', nameAfter: string, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

type ChatUpdateEventComponent_RoleChangedEvent_Fragment = { __typename?: 'RoleChangedEvent', newRole: Role, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string }, members: Array<{ __typename?: 'ChatMember', user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'DeletedMember', user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } }> };

export type ChatUpdateEventComponentFragment = ChatUpdateEventComponent_DescriptionUpdatedEvent_Fragment | ChatUpdateEventComponent_MembersAddedEvent_Fragment | ChatUpdateEventComponent_MembersRemovedEvent_Fragment | ChatUpdateEventComponent_NameUpdatedEvent_Fragment | ChatUpdateEventComponent_RoleChangedEvent_Fragment;

type ChatUpdateMemberAlteration_MembersAddedEvent_Fragment = { __typename?: 'MembersAddedEvent', members: Array<{ __typename?: 'ChatMember', user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'DeletedMember', user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } }> };

type ChatUpdateMemberAlteration_MembersRemovedEvent_Fragment = { __typename?: 'MembersRemovedEvent', members: Array<{ __typename?: 'ChatMember', user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'DeletedMember', user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } }> };

type ChatUpdateMemberAlteration_RoleChangedEvent_Fragment = { __typename?: 'RoleChangedEvent', members: Array<{ __typename?: 'ChatMember', user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'DeletedMember', user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } }> };

export type ChatUpdateMemberAlterationFragment = ChatUpdateMemberAlteration_MembersAddedEvent_Fragment | ChatUpdateMemberAlteration_MembersRemovedEvent_Fragment | ChatUpdateMemberAlteration_RoleChangedEvent_Fragment;

export type DeletedEventComponentFragment = { __typename?: 'DeletedEvent', id: any, isCreator: boolean, createdAt: any, createdBy: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } };

type EventAvatar_DeletedEvent_Fragment = { __typename?: 'DeletedEvent', id: any, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

type EventAvatar_DescriptionUpdatedEvent_Fragment = { __typename?: 'DescriptionUpdatedEvent', id: any, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

type EventAvatar_MembersAddedEvent_Fragment = { __typename?: 'MembersAddedEvent', id: any, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

type EventAvatar_MembersRemovedEvent_Fragment = { __typename?: 'MembersRemovedEvent', id: any, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

type EventAvatar_MessageEvent_Fragment = { __typename?: 'MessageEvent', id: any, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

type EventAvatar_NameUpdatedEvent_Fragment = { __typename?: 'NameUpdatedEvent', id: any, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

type EventAvatar_RoleChangedEvent_Fragment = { __typename?: 'RoleChangedEvent', id: any, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

export type EventAvatarFragment = EventAvatar_DeletedEvent_Fragment | EventAvatar_DescriptionUpdatedEvent_Fragment | EventAvatar_MembersAddedEvent_Fragment | EventAvatar_MembersRemovedEvent_Fragment | EventAvatar_MessageEvent_Fragment | EventAvatar_NameUpdatedEvent_Fragment | EventAvatar_RoleChangedEvent_Fragment;

type EventContainer_DeletedEvent_Fragment = { __typename?: 'DeletedEvent', id: any, createdAt: any, isCreator: boolean };

type EventContainer_DescriptionUpdatedEvent_Fragment = { __typename?: 'DescriptionUpdatedEvent', id: any, createdAt: any, isCreator: boolean };

type EventContainer_MembersAddedEvent_Fragment = { __typename?: 'MembersAddedEvent', id: any, createdAt: any, isCreator: boolean };

type EventContainer_MembersRemovedEvent_Fragment = { __typename?: 'MembersRemovedEvent', id: any, createdAt: any, isCreator: boolean };

type EventContainer_MessageEvent_Fragment = { __typename?: 'MessageEvent', id: any, createdAt: any, isCreator: boolean };

type EventContainer_NameUpdatedEvent_Fragment = { __typename?: 'NameUpdatedEvent', id: any, createdAt: any, isCreator: boolean };

type EventContainer_RoleChangedEvent_Fragment = { __typename?: 'RoleChangedEvent', id: any, createdAt: any, isCreator: boolean };

export type EventContainerFragment = EventContainer_DeletedEvent_Fragment | EventContainer_DescriptionUpdatedEvent_Fragment | EventContainer_MembersAddedEvent_Fragment | EventContainer_MembersRemovedEvent_Fragment | EventContainer_MessageEvent_Fragment | EventContainer_NameUpdatedEvent_Fragment | EventContainer_RoleChangedEvent_Fragment;

type EventInfo_DeletedEvent_Fragment = { __typename?: 'DeletedEvent', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

type EventInfo_DescriptionUpdatedEvent_Fragment = { __typename?: 'DescriptionUpdatedEvent', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

type EventInfo_MembersAddedEvent_Fragment = { __typename?: 'MembersAddedEvent', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

type EventInfo_MembersRemovedEvent_Fragment = { __typename?: 'MembersRemovedEvent', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

type EventInfo_MessageEvent_Fragment = { __typename?: 'MessageEvent', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

type EventInfo_NameUpdatedEvent_Fragment = { __typename?: 'NameUpdatedEvent', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

type EventInfo_RoleChangedEvent_Fragment = { __typename?: 'RoleChangedEvent', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

export type EventInfoFragment = EventInfo_DeletedEvent_Fragment | EventInfo_DescriptionUpdatedEvent_Fragment | EventInfo_MembersAddedEvent_Fragment | EventInfo_MembersRemovedEvent_Fragment | EventInfo_MessageEvent_Fragment | EventInfo_NameUpdatedEvent_Fragment | EventInfo_RoleChangedEvent_Fragment;

type IncomingEvent_DeletedEvent_Fragment = { __typename?: 'DeletedEvent', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } };

type IncomingEvent_DescriptionUpdatedEvent_Fragment = { __typename?: 'DescriptionUpdatedEvent', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } };

type IncomingEvent_MembersAddedEvent_Fragment = { __typename?: 'MembersAddedEvent', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } };

type IncomingEvent_MembersRemovedEvent_Fragment = { __typename?: 'MembersRemovedEvent', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } };

type IncomingEvent_MessageEvent_Fragment = { __typename?: 'MessageEvent', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } };

type IncomingEvent_NameUpdatedEvent_Fragment = { __typename?: 'NameUpdatedEvent', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } };

type IncomingEvent_RoleChangedEvent_Fragment = { __typename?: 'RoleChangedEvent', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } };

export type IncomingEventFragment = IncomingEvent_DeletedEvent_Fragment | IncomingEvent_DescriptionUpdatedEvent_Fragment | IncomingEvent_MembersAddedEvent_Fragment | IncomingEvent_MembersRemovedEvent_Fragment | IncomingEvent_MessageEvent_Fragment | IncomingEvent_NameUpdatedEvent_Fragment | IncomingEvent_RoleChangedEvent_Fragment;

export type DeleteMessageMutationVariables = Exact<{
  messageId: Scalars['HashId'];
}>;


export type DeleteMessageMutation = { __typename?: 'Mutation', deleteEvent?: { __typename?: 'DeletedEvent', id: any } | null };

export type MessageEventComponentFragment = { __typename?: 'MessageEvent', id: any, isCreator: boolean, content: string, createdAt: any, createdBy: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } };

type MessageActions_DeletedEvent_Fragment = { __typename?: 'DeletedEvent', id: any, isCreator: boolean };

type MessageActions_DescriptionUpdatedEvent_Fragment = { __typename?: 'DescriptionUpdatedEvent', id: any, isCreator: boolean };

type MessageActions_MembersAddedEvent_Fragment = { __typename?: 'MembersAddedEvent', id: any, isCreator: boolean };

type MessageActions_MembersRemovedEvent_Fragment = { __typename?: 'MembersRemovedEvent', id: any, isCreator: boolean };

type MessageActions_MessageEvent_Fragment = { __typename?: 'MessageEvent', id: any, isCreator: boolean };

type MessageActions_NameUpdatedEvent_Fragment = { __typename?: 'NameUpdatedEvent', id: any, isCreator: boolean };

type MessageActions_RoleChangedEvent_Fragment = { __typename?: 'RoleChangedEvent', id: any, isCreator: boolean };

export type MessageActionsFragment = MessageActions_DeletedEvent_Fragment | MessageActions_DescriptionUpdatedEvent_Fragment | MessageActions_MembersAddedEvent_Fragment | MessageActions_MembersRemovedEvent_Fragment | MessageActions_MessageEvent_Fragment | MessageActions_NameUpdatedEvent_Fragment | MessageActions_RoleChangedEvent_Fragment;

export type MessageBubbleFragment = { __typename?: 'MessageEvent', id: any, content: string };

type OutgoingEvent_DeletedEvent_Fragment = { __typename?: 'DeletedEvent', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

type OutgoingEvent_DescriptionUpdatedEvent_Fragment = { __typename?: 'DescriptionUpdatedEvent', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

type OutgoingEvent_MembersAddedEvent_Fragment = { __typename?: 'MembersAddedEvent', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

type OutgoingEvent_MembersRemovedEvent_Fragment = { __typename?: 'MembersRemovedEvent', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

type OutgoingEvent_MessageEvent_Fragment = { __typename?: 'MessageEvent', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

type OutgoingEvent_NameUpdatedEvent_Fragment = { __typename?: 'NameUpdatedEvent', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

type OutgoingEvent_RoleChangedEvent_Fragment = { __typename?: 'RoleChangedEvent', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

export type OutgoingEventFragment = OutgoingEvent_DeletedEvent_Fragment | OutgoingEvent_DescriptionUpdatedEvent_Fragment | OutgoingEvent_MembersAddedEvent_Fragment | OutgoingEvent_MembersRemovedEvent_Fragment | OutgoingEvent_MessageEvent_Fragment | OutgoingEvent_NameUpdatedEvent_Fragment | OutgoingEvent_RoleChangedEvent_Fragment;

export type CreateMessageMutationVariables = Exact<{
  chatId: Scalars['HashId'];
  content: Scalars['String'];
}>;


export type CreateMessageMutation = { __typename?: 'Mutation', createMessage?: { __typename?: 'MessageEvent', id: any, createdAt: any, content: string, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } } | null };

export type GetChatForChatAsideQueryVariables = Exact<{
  chatId: Scalars['HashId'];
}>;


export type GetChatForChatAsideQuery = { __typename?: 'Query', chat?: { __typename?: 'DeletedChat', id: any } | { __typename?: 'DirectMessageChat', id: any, friend: { __typename?: 'Friend', username: string } | { __typename?: 'Me', username: string } | { __typename?: 'Stranger', username: string } } | { __typename?: 'GroupChat', memberCount: number, name: string, id: any, role: Role } | null };

export type GetMembersForMemberSectionQueryVariables = Exact<{
  chatId: Scalars['HashId'];
  first: Scalars['Int'];
  after?: InputMaybe<Scalars['String']>;
}>;


export type GetMembersForMemberSectionQuery = { __typename?: 'Query', members: { __typename?: 'MemberConnection', edges?: Array<{ __typename?: 'MemberEdge', node?: { __typename?: 'ChatMember', user: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null, friendRequest?: { __typename?: 'FriendRequest', id: any, isCreator: boolean, createdById: any, recipientId: any, state: RequestState } | null } } | { __typename?: 'DeletedMember', user: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null, friendRequest?: { __typename?: 'FriendRequest', id: any, isCreator: boolean, createdById: any, recipientId: any, state: RequestState } | null } } | null } | null> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } };

type FooterSectionChat_DeletedChat_Fragment = { __typename?: 'DeletedChat', isCreator: boolean, id: any };

type FooterSectionChat_DirectMessageChat_Fragment = { __typename?: 'DirectMessageChat', isCreator: boolean, id: any };

type FooterSectionChat_GroupChat_Fragment = { __typename?: 'GroupChat', name: string, isCreator: boolean, id: any };

export type FooterSectionChatFragment = FooterSectionChat_DeletedChat_Fragment | FooterSectionChat_DirectMessageChat_Fragment | FooterSectionChat_GroupChat_Fragment;

type HeaderSectionChat_DeletedChat_Fragment = { __typename?: 'DeletedChat' };

type HeaderSectionChat_DirectMessageChat_Fragment = { __typename?: 'DirectMessageChat', friend: { __typename?: 'Friend', username: string } | { __typename?: 'Me', username: string } | { __typename?: 'Stranger', username: string } };

type HeaderSectionChat_GroupChat_Fragment = { __typename?: 'GroupChat', name: string, id: any, role: Role };

export type HeaderSectionChatFragment = HeaderSectionChat_DeletedChat_Fragment | HeaderSectionChat_DirectMessageChat_Fragment | HeaderSectionChat_GroupChat_Fragment;

export type MemberCountSectionChatFragment = { __typename?: 'GroupChat', memberCount: number };

type ChatMemberItemChat_DeletedChat_Fragment = { __typename?: 'DeletedChat', id: any };

type ChatMemberItemChat_DirectMessageChat_Fragment = { __typename?: 'DirectMessageChat', id: any };

type ChatMemberItemChat_GroupChat_Fragment = { __typename?: 'GroupChat', role: Role, id: any };

export type ChatMemberItemChatFragment = ChatMemberItemChat_DeletedChat_Fragment | ChatMemberItemChat_DirectMessageChat_Fragment | ChatMemberItemChat_GroupChat_Fragment;

type ChatMemberItemUser_Friend_Fragment = { __typename?: 'Friend', id: any, username: string, name?: string | null };

type ChatMemberItemUser_Me_Fragment = { __typename?: 'Me', id: any, username: string, name?: string | null };

type ChatMemberItemUser_Stranger_Fragment = { __typename?: 'Stranger', id: any, username: string, name?: string | null, friendRequest?: { __typename?: 'FriendRequest', id: any, isCreator: boolean, createdById: any, recipientId: any, state: RequestState } | null };

export type ChatMemberItemUserFragment = ChatMemberItemUser_Friend_Fragment | ChatMemberItemUser_Me_Fragment | ChatMemberItemUser_Stranger_Fragment;

type MemberSectionUser_Friend_Fragment = { __typename?: 'Friend', id: any, username: string, name?: string | null };

type MemberSectionUser_Me_Fragment = { __typename?: 'Me', id: any, username: string, name?: string | null };

type MemberSectionUser_Stranger_Fragment = { __typename?: 'Stranger', id: any, username: string, name?: string | null, friendRequest?: { __typename?: 'FriendRequest', id: any, isCreator: boolean, createdById: any, recipientId: any, state: RequestState } | null };

export type MemberSectionUserFragment = MemberSectionUser_Friend_Fragment | MemberSectionUser_Me_Fragment | MemberSectionUser_Stranger_Fragment;

type MemberSectionChat_DeletedChat_Fragment = { __typename?: 'DeletedChat', id: any };

type MemberSectionChat_DirectMessageChat_Fragment = { __typename?: 'DirectMessageChat', id: any };

type MemberSectionChat_GroupChat_Fragment = { __typename?: 'GroupChat', role: Role, id: any };

export type MemberSectionChatFragment = MemberSectionChat_DeletedChat_Fragment | MemberSectionChat_DirectMessageChat_Fragment | MemberSectionChat_GroupChat_Fragment;

export type GetMeForAccountMenuQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeForAccountMenuQuery = { __typename?: 'Query', me?: { __typename?: 'Me', id: any, username: string, name?: string | null } | null };

export type GetChatForAnimatedTitleQueryVariables = Exact<{
  chatId: Scalars['HashId'];
}>;


export type GetChatForAnimatedTitleQuery = { __typename?: 'Query', chat?: { __typename?: 'DeletedChat', id: any } | { __typename?: 'DirectMessageChat', id: any, friend: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', id: any, name?: string | null, username: string } } | { __typename?: 'GroupChat', name: string, description?: string | null, role: Role, id: any } | null };

type AlertComponentAlert_ChatAdminAccessGrantedAlert_Fragment = { __typename?: 'ChatAdminAccessGrantedAlert', id: any, createdAt: any, createdById: any, isCreator: boolean, chat: { __typename?: 'DeletedChat', id: any } | { __typename?: 'DirectMessageChat', id: any } | { __typename?: 'GroupChat', name: string, id: any }, createdBy: { __typename?: 'Friend', username: string, id: any, name?: string | null } | { __typename?: 'Me', username: string, id: any, name?: string | null } | { __typename?: 'Stranger', username: string, id: any, name?: string | null } };

type AlertComponentAlert_ChatAdminAccessRevokedAlert_Fragment = { __typename?: 'ChatAdminAccessRevokedAlert', id: any, createdAt: any, createdById: any, isCreator: boolean, chat: { __typename?: 'DeletedChat', id: any } | { __typename?: 'DirectMessageChat', id: any } | { __typename?: 'GroupChat', name: string, id: any }, createdBy: { __typename?: 'Friend', username: string, id: any, name?: string | null } | { __typename?: 'Me', username: string, id: any, name?: string | null } | { __typename?: 'Stranger', username: string, id: any, name?: string | null } };

type AlertComponentAlert_ChatDeletedAlert_Fragment = { __typename?: 'ChatDeletedAlert', id: any, createdAt: any, createdById: any, isCreator: boolean, createdBy: { __typename?: 'Friend', username: string, id: any, name?: string | null } | { __typename?: 'Me', username: string, id: any, name?: string | null } | { __typename?: 'Stranger', username: string, id: any, name?: string | null } };

type AlertComponentAlert_ChatMemberAccessGrantedAlert_Fragment = { __typename?: 'ChatMemberAccessGrantedAlert', id: any, createdAt: any, createdById: any, isCreator: boolean, chat: { __typename?: 'DeletedChat', id: any } | { __typename?: 'DirectMessageChat', id: any } | { __typename?: 'GroupChat', name: string, id: any }, createdBy: { __typename?: 'Friend', username: string, id: any, name?: string | null } | { __typename?: 'Me', username: string, id: any, name?: string | null } | { __typename?: 'Stranger', username: string, id: any, name?: string | null } };

type AlertComponentAlert_ChatMemberAccessRevokedAlert_Fragment = { __typename?: 'ChatMemberAccessRevokedAlert', id: any, createdAt: any, createdById: any, isCreator: boolean, chat: { __typename?: 'DeletedChat', id: any } | { __typename?: 'DirectMessageChat', id: any } | { __typename?: 'GroupChat', name: string, id: any }, createdBy: { __typename?: 'Friend', username: string, id: any, name?: string | null } | { __typename?: 'Me', username: string, id: any, name?: string | null } | { __typename?: 'Stranger', username: string, id: any, name?: string | null } };

type AlertComponentAlert_FriendDeletedAlert_Fragment = { __typename?: 'FriendDeletedAlert', id: any, createdAt: any, createdById: any, isCreator: boolean, createdBy: { __typename?: 'Friend', username: string, id: any, name?: string | null } | { __typename?: 'Me', username: string, id: any, name?: string | null } | { __typename?: 'Stranger', username: string, id: any, name?: string | null } };

type AlertComponentAlert_RequestAcceptedAlert_Fragment = { __typename?: 'RequestAcceptedAlert', id: any, createdAt: any, createdById: any, isCreator: boolean, request: { __typename?: 'FriendRequest', id: any }, createdBy: { __typename?: 'Friend', username: string, id: any, name?: string | null } | { __typename?: 'Me', username: string, id: any, name?: string | null } | { __typename?: 'Stranger', username: string, id: any, name?: string | null } };

type AlertComponentAlert_RequestDeclinedAlert_Fragment = { __typename?: 'RequestDeclinedAlert', id: any, createdAt: any, createdById: any, isCreator: boolean, request: { __typename?: 'FriendRequest', id: any }, createdBy: { __typename?: 'Friend', username: string, id: any, name?: string | null } | { __typename?: 'Me', username: string, id: any, name?: string | null } | { __typename?: 'Stranger', username: string, id: any, name?: string | null } };

export type AlertComponentAlertFragment = AlertComponentAlert_ChatAdminAccessGrantedAlert_Fragment | AlertComponentAlert_ChatAdminAccessRevokedAlert_Fragment | AlertComponentAlert_ChatDeletedAlert_Fragment | AlertComponentAlert_ChatMemberAccessGrantedAlert_Fragment | AlertComponentAlert_ChatMemberAccessRevokedAlert_Fragment | AlertComponentAlert_FriendDeletedAlert_Fragment | AlertComponentAlert_RequestAcceptedAlert_Fragment | AlertComponentAlert_RequestDeclinedAlert_Fragment;

export type FriendRequestComponentRequestFragment = { __typename?: 'FriendRequest', id: any, createdAt: any, createdById: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } };

type NotificationComponentNotification_ChatAdminAccessGrantedAlert_Fragment = { __typename?: 'ChatAdminAccessGrantedAlert', id: any, createdAt: any, createdById: any, isCreator: boolean, chat: { __typename?: 'DeletedChat', id: any } | { __typename?: 'DirectMessageChat', id: any } | { __typename?: 'GroupChat', name: string, id: any }, createdBy: { __typename?: 'Friend', username: string, id: any, name?: string | null } | { __typename?: 'Me', username: string, id: any, name?: string | null } | { __typename?: 'Stranger', username: string, id: any, name?: string | null } };

type NotificationComponentNotification_ChatAdminAccessRevokedAlert_Fragment = { __typename?: 'ChatAdminAccessRevokedAlert', id: any, createdAt: any, createdById: any, isCreator: boolean, chat: { __typename?: 'DeletedChat', id: any } | { __typename?: 'DirectMessageChat', id: any } | { __typename?: 'GroupChat', name: string, id: any }, createdBy: { __typename?: 'Friend', username: string, id: any, name?: string | null } | { __typename?: 'Me', username: string, id: any, name?: string | null } | { __typename?: 'Stranger', username: string, id: any, name?: string | null } };

type NotificationComponentNotification_ChatDeletedAlert_Fragment = { __typename?: 'ChatDeletedAlert', id: any, createdAt: any, createdById: any, isCreator: boolean, createdBy: { __typename?: 'Friend', username: string, id: any, name?: string | null } | { __typename?: 'Me', username: string, id: any, name?: string | null } | { __typename?: 'Stranger', username: string, id: any, name?: string | null } };

type NotificationComponentNotification_ChatMemberAccessGrantedAlert_Fragment = { __typename?: 'ChatMemberAccessGrantedAlert', id: any, createdAt: any, createdById: any, isCreator: boolean, chat: { __typename?: 'DeletedChat', id: any } | { __typename?: 'DirectMessageChat', id: any } | { __typename?: 'GroupChat', name: string, id: any }, createdBy: { __typename?: 'Friend', username: string, id: any, name?: string | null } | { __typename?: 'Me', username: string, id: any, name?: string | null } | { __typename?: 'Stranger', username: string, id: any, name?: string | null } };

type NotificationComponentNotification_ChatMemberAccessRevokedAlert_Fragment = { __typename?: 'ChatMemberAccessRevokedAlert', id: any, createdAt: any, createdById: any, isCreator: boolean, chat: { __typename?: 'DeletedChat', id: any } | { __typename?: 'DirectMessageChat', id: any } | { __typename?: 'GroupChat', name: string, id: any }, createdBy: { __typename?: 'Friend', username: string, id: any, name?: string | null } | { __typename?: 'Me', username: string, id: any, name?: string | null } | { __typename?: 'Stranger', username: string, id: any, name?: string | null } };

type NotificationComponentNotification_FriendDeletedAlert_Fragment = { __typename?: 'FriendDeletedAlert', id: any, createdAt: any, createdById: any, isCreator: boolean, createdBy: { __typename?: 'Friend', username: string, id: any, name?: string | null } | { __typename?: 'Me', username: string, id: any, name?: string | null } | { __typename?: 'Stranger', username: string, id: any, name?: string | null } };

type NotificationComponentNotification_FriendRequest_Fragment = { __typename?: 'FriendRequest', id: any, createdAt: any, createdById: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } };

type NotificationComponentNotification_RequestAcceptedAlert_Fragment = { __typename?: 'RequestAcceptedAlert', id: any, createdAt: any, createdById: any, isCreator: boolean, request: { __typename?: 'FriendRequest', id: any }, createdBy: { __typename?: 'Friend', username: string, id: any, name?: string | null } | { __typename?: 'Me', username: string, id: any, name?: string | null } | { __typename?: 'Stranger', username: string, id: any, name?: string | null } };

type NotificationComponentNotification_RequestDeclinedAlert_Fragment = { __typename?: 'RequestDeclinedAlert', id: any, createdAt: any, createdById: any, isCreator: boolean, request: { __typename?: 'FriendRequest', id: any }, createdBy: { __typename?: 'Friend', username: string, id: any, name?: string | null } | { __typename?: 'Me', username: string, id: any, name?: string | null } | { __typename?: 'Stranger', username: string, id: any, name?: string | null } };

export type NotificationComponentNotificationFragment = NotificationComponentNotification_ChatAdminAccessGrantedAlert_Fragment | NotificationComponentNotification_ChatAdminAccessRevokedAlert_Fragment | NotificationComponentNotification_ChatDeletedAlert_Fragment | NotificationComponentNotification_ChatMemberAccessGrantedAlert_Fragment | NotificationComponentNotification_ChatMemberAccessRevokedAlert_Fragment | NotificationComponentNotification_FriendDeletedAlert_Fragment | NotificationComponentNotification_FriendRequest_Fragment | NotificationComponentNotification_RequestAcceptedAlert_Fragment | NotificationComponentNotification_RequestDeclinedAlert_Fragment;

type NotificationMenuRequest_ChatAdminAccessGrantedAlert_Fragment = { __typename?: 'ChatAdminAccessGrantedAlert', id: any, createdAt: any, createdById: any, isCreator: boolean, chat: { __typename?: 'DeletedChat', id: any } | { __typename?: 'DirectMessageChat', id: any } | { __typename?: 'GroupChat', name: string, id: any }, createdBy: { __typename?: 'Friend', username: string, id: any, name?: string | null } | { __typename?: 'Me', username: string, id: any, name?: string | null } | { __typename?: 'Stranger', username: string, id: any, name?: string | null } };

type NotificationMenuRequest_ChatAdminAccessRevokedAlert_Fragment = { __typename?: 'ChatAdminAccessRevokedAlert', id: any, createdAt: any, createdById: any, isCreator: boolean, chat: { __typename?: 'DeletedChat', id: any } | { __typename?: 'DirectMessageChat', id: any } | { __typename?: 'GroupChat', name: string, id: any }, createdBy: { __typename?: 'Friend', username: string, id: any, name?: string | null } | { __typename?: 'Me', username: string, id: any, name?: string | null } | { __typename?: 'Stranger', username: string, id: any, name?: string | null } };

type NotificationMenuRequest_ChatDeletedAlert_Fragment = { __typename?: 'ChatDeletedAlert', id: any, createdAt: any, createdById: any, isCreator: boolean, createdBy: { __typename?: 'Friend', username: string, id: any, name?: string | null } | { __typename?: 'Me', username: string, id: any, name?: string | null } | { __typename?: 'Stranger', username: string, id: any, name?: string | null } };

type NotificationMenuRequest_ChatMemberAccessGrantedAlert_Fragment = { __typename?: 'ChatMemberAccessGrantedAlert', id: any, createdAt: any, createdById: any, isCreator: boolean, chat: { __typename?: 'DeletedChat', id: any } | { __typename?: 'DirectMessageChat', id: any } | { __typename?: 'GroupChat', name: string, id: any }, createdBy: { __typename?: 'Friend', username: string, id: any, name?: string | null } | { __typename?: 'Me', username: string, id: any, name?: string | null } | { __typename?: 'Stranger', username: string, id: any, name?: string | null } };

type NotificationMenuRequest_ChatMemberAccessRevokedAlert_Fragment = { __typename?: 'ChatMemberAccessRevokedAlert', id: any, createdAt: any, createdById: any, isCreator: boolean, chat: { __typename?: 'DeletedChat', id: any } | { __typename?: 'DirectMessageChat', id: any } | { __typename?: 'GroupChat', name: string, id: any }, createdBy: { __typename?: 'Friend', username: string, id: any, name?: string | null } | { __typename?: 'Me', username: string, id: any, name?: string | null } | { __typename?: 'Stranger', username: string, id: any, name?: string | null } };

type NotificationMenuRequest_FriendDeletedAlert_Fragment = { __typename?: 'FriendDeletedAlert', id: any, createdAt: any, createdById: any, isCreator: boolean, createdBy: { __typename?: 'Friend', username: string, id: any, name?: string | null } | { __typename?: 'Me', username: string, id: any, name?: string | null } | { __typename?: 'Stranger', username: string, id: any, name?: string | null } };

type NotificationMenuRequest_FriendRequest_Fragment = { __typename?: 'FriendRequest', id: any, createdAt: any, createdById: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } };

type NotificationMenuRequest_RequestAcceptedAlert_Fragment = { __typename?: 'RequestAcceptedAlert', id: any, createdAt: any, createdById: any, isCreator: boolean, request: { __typename?: 'FriendRequest', id: any }, createdBy: { __typename?: 'Friend', username: string, id: any, name?: string | null } | { __typename?: 'Me', username: string, id: any, name?: string | null } | { __typename?: 'Stranger', username: string, id: any, name?: string | null } };

type NotificationMenuRequest_RequestDeclinedAlert_Fragment = { __typename?: 'RequestDeclinedAlert', id: any, createdAt: any, createdById: any, isCreator: boolean, request: { __typename?: 'FriendRequest', id: any }, createdBy: { __typename?: 'Friend', username: string, id: any, name?: string | null } | { __typename?: 'Me', username: string, id: any, name?: string | null } | { __typename?: 'Stranger', username: string, id: any, name?: string | null } };

export type NotificationMenuRequestFragment = NotificationMenuRequest_ChatAdminAccessGrantedAlert_Fragment | NotificationMenuRequest_ChatAdminAccessRevokedAlert_Fragment | NotificationMenuRequest_ChatDeletedAlert_Fragment | NotificationMenuRequest_ChatMemberAccessGrantedAlert_Fragment | NotificationMenuRequest_ChatMemberAccessRevokedAlert_Fragment | NotificationMenuRequest_FriendDeletedAlert_Fragment | NotificationMenuRequest_FriendRequest_Fragment | NotificationMenuRequest_RequestAcceptedAlert_Fragment | NotificationMenuRequest_RequestDeclinedAlert_Fragment;

export type GetFriendsForCreateGroupChatQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFriendsForCreateGroupChatQuery = { __typename?: 'Query', friends: Array<{ __typename?: 'Friend', id: any, name?: string | null, username: string }> };

export type GetFriendsForSelectSearchModalQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFriendsForSelectSearchModalQuery = { __typename?: 'Query', friends: Array<{ __typename?: 'Friend', id: any, username: string, name?: string | null }> };

export type GetChatForUpdateQueryVariables = Exact<{
  chatId: Scalars['HashId'];
  firstMembers?: InputMaybe<Scalars['Int']>;
}>;


export type GetChatForUpdateQuery = { __typename?: 'Query', chat?: { __typename?: 'DeletedChat', id: any, isCreator: boolean, createdById: any } | { __typename?: 'DirectMessageChat', id: any, isCreator: boolean, createdById: any } | { __typename?: 'GroupChat', name: string, description?: string | null, role: Role, id: any, isCreator: boolean, createdById: any, members: { __typename?: 'MemberConnection', edges?: Array<{ __typename?: 'MemberEdge', node?: { __typename?: 'ChatMember', role: Role, user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'DeletedMember', role: Role, user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | null } | null> | null } } | null };

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


export type GetNotificationsQuery = { __typename?: 'Query', notifications: Array<{ __typename?: 'ChatAdminAccessGrantedAlert', id: any, createdAt: any, isCreator: boolean, createdById: any, chat: { __typename?: 'DeletedChat', id: any } | { __typename?: 'DirectMessageChat', id: any } | { __typename?: 'GroupChat', name: string, id: any }, createdBy: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', id: any, name?: string | null, username: string, friendRequest?: { __typename?: 'FriendRequest', id: any } | null } } | { __typename?: 'ChatAdminAccessRevokedAlert', id: any, createdAt: any, isCreator: boolean, createdById: any, chat: { __typename?: 'DeletedChat', id: any } | { __typename?: 'DirectMessageChat', id: any } | { __typename?: 'GroupChat', name: string, id: any }, createdBy: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', id: any, name?: string | null, username: string, friendRequest?: { __typename?: 'FriendRequest', id: any } | null } } | { __typename?: 'ChatDeletedAlert', id: any, createdAt: any, isCreator: boolean, createdById: any, createdBy: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', id: any, name?: string | null, username: string, friendRequest?: { __typename?: 'FriendRequest', id: any } | null } } | { __typename?: 'ChatMemberAccessGrantedAlert', id: any, createdAt: any, isCreator: boolean, createdById: any, chat: { __typename?: 'DeletedChat', id: any } | { __typename?: 'DirectMessageChat', id: any } | { __typename?: 'GroupChat', name: string, id: any }, createdBy: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', id: any, name?: string | null, username: string, friendRequest?: { __typename?: 'FriendRequest', id: any } | null } } | { __typename?: 'ChatMemberAccessRevokedAlert', id: any, createdAt: any, isCreator: boolean, createdById: any, chat: { __typename?: 'DeletedChat', id: any } | { __typename?: 'DirectMessageChat', id: any } | { __typename?: 'GroupChat', name: string, id: any }, createdBy: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', id: any, name?: string | null, username: string, friendRequest?: { __typename?: 'FriendRequest', id: any } | null } } | { __typename?: 'FriendDeletedAlert', id: any, createdAt: any, isCreator: boolean, createdById: any, createdBy: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', id: any, name?: string | null, username: string, friendRequest?: { __typename?: 'FriendRequest', id: any } | null } } | { __typename?: 'FriendRequest', createdById: any, isCreator: boolean, state: RequestState, id: any, createdAt: any, createdBy: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', id: any, name?: string | null, username: string, friendRequest?: { __typename?: 'FriendRequest', id: any } | null }, recipient: { __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', id: any, friendRequest?: { __typename?: 'FriendRequest', id: any } | null } } | { __typename?: 'RequestAcceptedAlert', id: any, createdAt: any, isCreator: boolean, createdById: any, request: { __typename?: 'FriendRequest', id: any, state: RequestState }, createdBy: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', id: any, name?: string | null, username: string, friendRequest?: { __typename?: 'FriendRequest', id: any } | null } } | { __typename?: 'RequestDeclinedAlert', id: any, createdAt: any, isCreator: boolean, createdById: any, request: { __typename?: 'FriendRequest', id: any, state: RequestState }, createdBy: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', id: any, name?: string | null, username: string, friendRequest?: { __typename?: 'FriendRequest', id: any } | null } }> };

export type NotificationsSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NotificationsSubscription = { __typename?: 'Subscription', notifications?: { __typename?: 'ChatAdminAccessGrantedAlert', id: any, createdAt: any, isCreator: boolean, createdById: any, chat: { __typename?: 'DeletedChat', id: any } | { __typename?: 'DirectMessageChat', id: any } | { __typename?: 'GroupChat', name: string, id: any }, createdBy: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', id: any, name?: string | null, username: string, friendRequest?: { __typename?: 'FriendRequest', id: any } | null } } | { __typename?: 'ChatAdminAccessRevokedAlert', id: any, createdAt: any, isCreator: boolean, createdById: any, chat: { __typename?: 'DeletedChat', id: any } | { __typename?: 'DirectMessageChat', id: any } | { __typename?: 'GroupChat', name: string, id: any }, createdBy: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', id: any, name?: string | null, username: string, friendRequest?: { __typename?: 'FriendRequest', id: any } | null } } | { __typename?: 'ChatDeletedAlert', id: any, createdAt: any, isCreator: boolean, createdById: any, createdBy: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', id: any, name?: string | null, username: string, friendRequest?: { __typename?: 'FriendRequest', id: any } | null } } | { __typename?: 'ChatMemberAccessGrantedAlert', id: any, createdAt: any, isCreator: boolean, createdById: any, chat: { __typename?: 'DeletedChat', id: any } | { __typename?: 'DirectMessageChat', id: any } | { __typename?: 'GroupChat', name: string, id: any }, createdBy: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', id: any, name?: string | null, username: string, friendRequest?: { __typename?: 'FriendRequest', id: any } | null } } | { __typename?: 'ChatMemberAccessRevokedAlert', id: any, createdAt: any, isCreator: boolean, createdById: any, chat: { __typename?: 'DeletedChat', id: any } | { __typename?: 'DirectMessageChat', id: any } | { __typename?: 'GroupChat', name: string, id: any }, createdBy: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', id: any, name?: string | null, username: string, friendRequest?: { __typename?: 'FriendRequest', id: any } | null } } | { __typename?: 'FriendDeletedAlert', id: any, createdAt: any, isCreator: boolean, createdById: any, createdBy: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', id: any, name?: string | null, username: string, friendRequest?: { __typename?: 'FriendRequest', id: any } | null } } | { __typename?: 'FriendRequest', createdById: any, isCreator: boolean, state: RequestState, id: any, createdAt: any, createdBy: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', id: any, name?: string | null, username: string, friendRequest?: { __typename?: 'FriendRequest', id: any } | null }, recipient: { __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', id: any, friendRequest?: { __typename?: 'FriendRequest', id: any } | null } } | { __typename?: 'RequestAcceptedAlert', id: any, createdAt: any, isCreator: boolean, createdById: any, request: { __typename?: 'FriendRequest', id: any, state: RequestState }, createdBy: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', id: any, name?: string | null, username: string, friendRequest?: { __typename?: 'FriendRequest', id: any } | null } } | { __typename?: 'RequestDeclinedAlert', id: any, createdAt: any, isCreator: boolean, createdById: any, request: { __typename?: 'FriendRequest', id: any, state: RequestState }, createdBy: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', id: any, name?: string | null, username: string, friendRequest?: { __typename?: 'FriendRequest', id: any } | null } } | null };

type LiveNotification_ChatAdminAccessGrantedAlert_Fragment = { __typename?: 'ChatAdminAccessGrantedAlert', id: any, createdAt: any, isCreator: boolean, createdById: any, chat: { __typename?: 'DeletedChat', id: any } | { __typename?: 'DirectMessageChat', id: any } | { __typename?: 'GroupChat', name: string, id: any }, createdBy: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', id: any, name?: string | null, username: string, friendRequest?: { __typename?: 'FriendRequest', id: any } | null } };

type LiveNotification_ChatAdminAccessRevokedAlert_Fragment = { __typename?: 'ChatAdminAccessRevokedAlert', id: any, createdAt: any, isCreator: boolean, createdById: any, chat: { __typename?: 'DeletedChat', id: any } | { __typename?: 'DirectMessageChat', id: any } | { __typename?: 'GroupChat', name: string, id: any }, createdBy: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', id: any, name?: string | null, username: string, friendRequest?: { __typename?: 'FriendRequest', id: any } | null } };

type LiveNotification_ChatDeletedAlert_Fragment = { __typename?: 'ChatDeletedAlert', id: any, createdAt: any, isCreator: boolean, createdById: any, createdBy: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', id: any, name?: string | null, username: string, friendRequest?: { __typename?: 'FriendRequest', id: any } | null } };

type LiveNotification_ChatMemberAccessGrantedAlert_Fragment = { __typename?: 'ChatMemberAccessGrantedAlert', id: any, createdAt: any, isCreator: boolean, createdById: any, chat: { __typename?: 'DeletedChat', id: any } | { __typename?: 'DirectMessageChat', id: any } | { __typename?: 'GroupChat', name: string, id: any }, createdBy: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', id: any, name?: string | null, username: string, friendRequest?: { __typename?: 'FriendRequest', id: any } | null } };

type LiveNotification_ChatMemberAccessRevokedAlert_Fragment = { __typename?: 'ChatMemberAccessRevokedAlert', id: any, createdAt: any, isCreator: boolean, createdById: any, chat: { __typename?: 'DeletedChat', id: any } | { __typename?: 'DirectMessageChat', id: any } | { __typename?: 'GroupChat', name: string, id: any }, createdBy: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', id: any, name?: string | null, username: string, friendRequest?: { __typename?: 'FriendRequest', id: any } | null } };

type LiveNotification_FriendDeletedAlert_Fragment = { __typename?: 'FriendDeletedAlert', id: any, createdAt: any, isCreator: boolean, createdById: any, createdBy: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', id: any, name?: string | null, username: string, friendRequest?: { __typename?: 'FriendRequest', id: any } | null } };

type LiveNotification_FriendRequest_Fragment = { __typename?: 'FriendRequest', createdById: any, isCreator: boolean, state: RequestState, id: any, createdAt: any, createdBy: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', id: any, name?: string | null, username: string, friendRequest?: { __typename?: 'FriendRequest', id: any } | null }, recipient: { __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', id: any, friendRequest?: { __typename?: 'FriendRequest', id: any } | null } };

type LiveNotification_RequestAcceptedAlert_Fragment = { __typename?: 'RequestAcceptedAlert', id: any, createdAt: any, isCreator: boolean, createdById: any, request: { __typename?: 'FriendRequest', id: any, state: RequestState }, createdBy: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', id: any, name?: string | null, username: string, friendRequest?: { __typename?: 'FriendRequest', id: any } | null } };

type LiveNotification_RequestDeclinedAlert_Fragment = { __typename?: 'RequestDeclinedAlert', id: any, createdAt: any, isCreator: boolean, createdById: any, request: { __typename?: 'FriendRequest', id: any, state: RequestState }, createdBy: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', id: any, name?: string | null, username: string, friendRequest?: { __typename?: 'FriendRequest', id: any } | null } };

export type LiveNotificationFragment = LiveNotification_ChatAdminAccessGrantedAlert_Fragment | LiveNotification_ChatAdminAccessRevokedAlert_Fragment | LiveNotification_ChatDeletedAlert_Fragment | LiveNotification_ChatMemberAccessGrantedAlert_Fragment | LiveNotification_ChatMemberAccessRevokedAlert_Fragment | LiveNotification_FriendDeletedAlert_Fragment | LiveNotification_FriendRequest_Fragment | LiveNotification_RequestAcceptedAlert_Fragment | LiveNotification_RequestDeclinedAlert_Fragment;

export type GetMeForUserProviderQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeForUserProviderQuery = { __typename?: 'Query', me?: { __typename?: 'Me', id: any, username: string, name?: string | null } | null };

type ChatAvatar_DeletedChat_Fragment = { __typename?: 'DeletedChat', id: any };

type ChatAvatar_DirectMessageChat_Fragment = { __typename?: 'DirectMessageChat', id: any, friend: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

type ChatAvatar_GroupChat_Fragment = { __typename?: 'GroupChat', name: string, id: any };

export type ChatAvatarFragment = ChatAvatar_DeletedChat_Fragment | ChatAvatar_DirectMessageChat_Fragment | ChatAvatar_GroupChat_Fragment;

type UserAvatar_Friend_Fragment = { __typename?: 'Friend', id: any, username: string, name?: string | null };

type UserAvatar_Me_Fragment = { __typename?: 'Me', id: any, username: string, name?: string | null };

type UserAvatar_Stranger_Fragment = { __typename?: 'Stranger', id: any, username: string, name?: string | null };

export type UserAvatarFragment = UserAvatar_Friend_Fragment | UserAvatar_Me_Fragment | UserAvatar_Stranger_Fragment;

export type ChatUpdateActionGroupChatFragment = { __typename?: 'GroupChat', id: any, role: Role };

type UserItem_Friend_Fragment = { __typename?: 'Friend', id: any, username: string, name?: string | null };

type UserItem_Me_Fragment = { __typename?: 'Me', id: any, username: string, name?: string | null };

type UserItem_Stranger_Fragment = { __typename?: 'Stranger', id: any, username: string, name?: string | null };

export type UserItemFragment = UserItem_Friend_Fragment | UserItem_Me_Fragment | UserItem_Stranger_Fragment;

export type FriendMenuFriendFragment = { __typename?: 'Friend', id: any };

export type StrangerMenuStrangerFragment = { __typename?: 'Stranger', id: any, friendRequest?: { __typename?: 'FriendRequest', id: any, isCreator: boolean, createdById: any, recipientId: any, state: RequestState } | null };

type UserMenu_Friend_Fragment = { __typename?: 'Friend', id: any };

type UserMenu_Me_Fragment = { __typename?: 'Me' };

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

export type AcknoledgeAlertMutationVariables = Exact<{
  alertId: Scalars['HashId'];
}>;


export type AcknoledgeAlertMutation = { __typename?: 'Mutation', acknowledgeAlert?: { __typename?: 'ChatAdminAccessGrantedAlert', id: any } | { __typename?: 'ChatAdminAccessRevokedAlert', id: any } | { __typename?: 'ChatDeletedAlert', id: any } | { __typename?: 'ChatMemberAccessGrantedAlert', id: any } | { __typename?: 'ChatMemberAccessRevokedAlert', id: any } | { __typename?: 'FriendDeletedAlert', id: any } | { __typename?: 'RequestAcceptedAlert', id: any } | { __typename?: 'RequestDeclinedAlert', id: any } | null };

export type UpdateGroupChatDescriptionMutationVariables = Exact<{
  chatId: Scalars['HashId'];
  description: Scalars['String'];
}>;


export type UpdateGroupChatDescriptionMutation = { __typename?: 'Mutation', updateGroupChatDescription?: { __typename?: 'DescriptionUpdatedEvent', descriptionBefore: string, descriptionAfter: string, id: any, chat: { __typename?: 'DeletedChat', id: any } | { __typename?: 'DirectMessageChat', id: any } | { __typename?: 'GroupChat', description?: string | null, id: any }, createdBy: { __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', id: any } } | null };

type GroupChatUpdate_DescriptionUpdatedEvent_Fragment = { __typename?: 'DescriptionUpdatedEvent', id: any, createdBy: { __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', id: any } };

type GroupChatUpdate_MembersAddedEvent_Fragment = { __typename?: 'MembersAddedEvent', id: any, createdBy: { __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', id: any } };

type GroupChatUpdate_MembersRemovedEvent_Fragment = { __typename?: 'MembersRemovedEvent', id: any, createdBy: { __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', id: any } };

type GroupChatUpdate_NameUpdatedEvent_Fragment = { __typename?: 'NameUpdatedEvent', id: any, createdBy: { __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', id: any } };

type GroupChatUpdate_RoleChangedEvent_Fragment = { __typename?: 'RoleChangedEvent', id: any, createdBy: { __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', id: any } };

export type GroupChatUpdateFragment = GroupChatUpdate_DescriptionUpdatedEvent_Fragment | GroupChatUpdate_MembersAddedEvent_Fragment | GroupChatUpdate_MembersRemovedEvent_Fragment | GroupChatUpdate_NameUpdatedEvent_Fragment | GroupChatUpdate_RoleChangedEvent_Fragment;

export type AddMembersMutationVariables = Exact<{
  chatId: Scalars['HashId'];
  members: Array<Scalars['HashId']> | Scalars['HashId'];
}>;


export type AddMembersMutation = { __typename?: 'Mutation', addMembers?: { __typename?: 'MembersAddedEvent', id: any, chat: { __typename?: 'DeletedChat', id: any } | { __typename?: 'DirectMessageChat', id: any } | { __typename?: 'GroupChat', id: any }, createdBy: { __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', id: any }, members: Array<{ __typename?: 'ChatMember', role: Role, user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'DeletedMember', role: Role, user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } }> } | null };

export type RemoveMembersMutationVariables = Exact<{
  chatId: Scalars['HashId'];
  members: Array<Scalars['HashId']> | Scalars['HashId'];
}>;


export type RemoveMembersMutation = { __typename?: 'Mutation', removeMembers?: { __typename?: 'MembersRemovedEvent', id: any, chat: { __typename?: 'DeletedChat', id: any } | { __typename?: 'DirectMessageChat', id: any } | { __typename?: 'GroupChat', id: any }, createdBy: { __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', id: any }, members: Array<{ __typename?: 'ChatMember', role: Role, user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'DeletedMember', role: Role, user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } }> } | null };

export type ChangeRoleMutationVariables = Exact<{
  chatId: Scalars['HashId'];
  members: Array<Scalars['HashId']> | Scalars['HashId'];
  role: Role;
}>;


export type ChangeRoleMutation = { __typename?: 'Mutation', changeRole?: { __typename?: 'RoleChangedEvent', id: any, chat: { __typename?: 'DeletedChat', id: any } | { __typename?: 'DirectMessageChat', id: any } | { __typename?: 'GroupChat', id: any }, createdBy: { __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', id: any }, members: Array<{ __typename?: 'ChatMember', role: Role, user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'DeletedMember', role: Role, user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } }> } | null };

type UserAlerationGroupChatUpdate_MembersAddedEvent_Fragment = { __typename?: 'MembersAddedEvent', members: Array<{ __typename?: 'ChatMember', role: Role, user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'DeletedMember', role: Role, user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } }> };

type UserAlerationGroupChatUpdate_MembersRemovedEvent_Fragment = { __typename?: 'MembersRemovedEvent', members: Array<{ __typename?: 'ChatMember', role: Role, user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'DeletedMember', role: Role, user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } }> };

type UserAlerationGroupChatUpdate_RoleChangedEvent_Fragment = { __typename?: 'RoleChangedEvent', members: Array<{ __typename?: 'ChatMember', role: Role, user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'DeletedMember', role: Role, user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } }> };

export type UserAlerationGroupChatUpdateFragment = UserAlerationGroupChatUpdate_MembersAddedEvent_Fragment | UserAlerationGroupChatUpdate_MembersRemovedEvent_Fragment | UserAlerationGroupChatUpdate_RoleChangedEvent_Fragment;

export type UpdateGroupChatNameMutationVariables = Exact<{
  chatId: Scalars['HashId'];
  name: Scalars['String'];
}>;


export type UpdateGroupChatNameMutation = { __typename?: 'Mutation', updateGroupChatName?: { __typename?: 'NameUpdatedEvent', nameBefore: string, nameAfter: string, id: any, chat: { __typename?: 'DeletedChat', id: any } | { __typename?: 'DirectMessageChat', id: any } | { __typename?: 'GroupChat', name: string, id: any }, createdBy: { __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', id: any } } | null };

export type CreateGroupChatMutationVariables = Exact<{
  data: CreateGroupChatInput;
}>;


export type CreateGroupChatMutation = { __typename?: 'Mutation', createGroupChat?: { __typename?: 'GroupChat', id: any, name: string, createdBy: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', id: any, name?: string | null, username: string } } | null };

export type CreateDirectMessageChatMutationVariables = Exact<{
  friendId: Scalars['HashId'];
}>;


export type CreateDirectMessageChatMutation = { __typename?: 'Mutation', createDirectMessageChat?: { __typename?: 'DirectMessageChat', id: any, isCreator: boolean, createdAt?: any | null, friend: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', id: any, name?: string | null, username: string } } | null };

export type DeleteChatMutationVariables = Exact<{
  chatId: Scalars['HashId'];
}>;


export type DeleteChatMutation = { __typename?: 'Mutation', deleteChat?: { __typename?: 'DeletedChat', id: any } | null };

type UseDeleteChat_DeletedChat_Fragment = { __typename?: 'DeletedChat', id: any };

type UseDeleteChat_DirectMessageChat_Fragment = { __typename?: 'DirectMessageChat', id: any };

type UseDeleteChat_GroupChat_Fragment = { __typename?: 'GroupChat', id: any };

export type UseDeleteChatFragment = UseDeleteChat_DeletedChat_Fragment | UseDeleteChat_DirectMessageChat_Fragment | UseDeleteChat_GroupChat_Fragment;

export type DeleteFriendMutationVariables = Exact<{
  friendId: Scalars['HashId'];
}>;


export type DeleteFriendMutation = { __typename?: 'Mutation', deleteFriend?: { __typename?: 'Stranger', id: any } | null };

export type FriendRequestStrangerFragment = { __typename?: 'Stranger', id: any, friendRequest?: { __typename?: 'FriendRequest', id: any } | null };

export type UseFriendFragment = { __typename?: 'Friend', id: any };

export type LeaveChatMutationVariables = Exact<{
  chatId: Scalars['HashId'];
}>;


export type LeaveChatMutation = { __typename?: 'Mutation', leaveGroupChat?: { __typename?: 'MembersRemovedEvent', id: any } | null };

export type AcceptRequestMutationVariables = Exact<{
  requestId: Scalars['HashId'];
}>;


export type AcceptRequestMutation = { __typename?: 'Mutation', acceptRequest?: { __typename?: 'FriendRequest', id: any, isCreator: boolean, createdById: any, recipientId: any, state: RequestState, createdBy: { __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', id: any } } | null };

export type DeclineRequestMutationVariables = Exact<{
  requestId: Scalars['HashId'];
}>;


export type DeclineRequestMutation = { __typename?: 'Mutation', declineRequest?: { __typename?: 'FriendRequest', id: any, isCreator: boolean, createdById: any, recipientId: any, state: RequestState } | null };

export type CancelRequestMutationVariables = Exact<{
  requestId: Scalars['HashId'];
}>;


export type CancelRequestMutation = { __typename?: 'Mutation', cancelRequest?: { __typename?: 'FriendRequest', id: any, isCreator: boolean, createdById: any, recipientId: any, state: RequestState } | null };

export type UseRequestFragment = { __typename?: 'FriendRequest', id: any, isCreator: boolean, createdById: any, recipientId: any, state: RequestState };

export type SendFriendRequestMutationVariables = Exact<{
  strangerId: Scalars['HashId'];
}>;


export type SendFriendRequestMutation = { __typename?: 'Mutation', sendFriendRequest?: { __typename?: 'FriendRequest', id: any, isCreator: boolean, createdById: any, recipientId: any, state: RequestState } | null };

export type RequestInfoFragment = { __typename?: 'FriendRequest', id: any, isCreator: boolean, createdById: any, recipientId: any, state: RequestState };

export type UseStrangerFragment = { __typename?: 'Stranger', id: any, friendRequest?: { __typename?: 'FriendRequest', id: any, isCreator: boolean, createdById: any, recipientId: any, state: RequestState } | null };

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
    memberCount
    members(first: $firstMembers, after: $afterMember) {
      edges {
        node {
          user {
            ...ChatItemUser
          }
        }
      }
    }
  }
}
    ${ChatAvatarFragmentDoc}
${ChatItemUserFragmentDoc}`;
export const ChatForChatDisplayFragmentDoc = gql`
    fragment ChatForChatDisplay on Chat {
  id
  ...ChatItem
  createdBy {
    id
    username
  }
  ... on GroupChat {
    memberCount
    members(first: $firstMembers, after: $afterMember) {
      edges {
        node {
          user {
            id
            username
            name
          }
        }
      }
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
    ${ChatItemFragmentDoc}`;
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
export const MessageEventComponentFragmentDoc = gql`
    fragment MessageEventComponent on MessageEvent {
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
export const ChatUpdateMemberAlterationFragmentDoc = gql`
    fragment ChatUpdateMemberAlteration on MemberAlterationEvent {
  members {
    user {
      id
      username
    }
  }
}
    `;
export const ChatUpdateEventComponentFragmentDoc = gql`
    fragment ChatUpdateEventComponent on ChatUpdateEvent {
  createdBy {
    id
    username
  }
  ... on NameUpdatedEvent {
    nameAfter
  }
  ... on DescriptionUpdatedEvent {
    descriptionAfter
  }
  ... on MembersAddedEvent {
    ...ChatUpdateMemberAlteration
  }
  ... on MembersRemovedEvent {
    ...ChatUpdateMemberAlteration
  }
  ... on RoleChangedEvent {
    newRole
    ...ChatUpdateMemberAlteration
  }
}
    ${ChatUpdateMemberAlterationFragmentDoc}`;
export const ChatPanelEventFragmentDoc = gql`
    fragment ChatPanelEvent on Event {
  id
  createdAt
  createdBy {
    id
  }
  ...EventContainer
  ...MessageEventComponent
  ...DeletedEventComponent
  ... on ChatUpdateEvent {
    ...ChatUpdateEventComponent
  }
}
    ${EventContainerFragmentDoc}
${MessageEventComponentFragmentDoc}
${DeletedEventComponentFragmentDoc}
${ChatUpdateEventComponentFragmentDoc}`;
export const ChatHeaderChatFragmentDoc = gql`
    fragment ChatHeaderChat on Chat {
  ... on DirectMessageChat {
    friend {
      username
    }
  }
  ... on GroupChat {
    name
    description
  }
  ...ChatAvatar
}
    ${ChatAvatarFragmentDoc}`;
export const ChatPanelChatFragmentDoc = gql`
    fragment ChatPanelChat on Chat {
  ...ChatHeaderChat
}
    ${ChatHeaderChatFragmentDoc}`;
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
    fragment MessageBubble on MessageEvent {
  id
  content
}
    `;
export const FooterSectionChatFragmentDoc = gql`
    fragment FooterSectionChat on Chat {
  isCreator
  id
  ... on GroupChat {
    name
  }
}
    `;
export const ChatUpdateActionGroupChatFragmentDoc = gql`
    fragment ChatUpdateActionGroupChat on GroupChat {
  id
  role
}
    `;
export const HeaderSectionChatFragmentDoc = gql`
    fragment HeaderSectionChat on Chat {
  ... on GroupChat {
    name
    ...ChatUpdateActionGroupChat
  }
  ... on DirectMessageChat {
    friend {
      username
    }
  }
}
    ${ChatUpdateActionGroupChatFragmentDoc}`;
export const MemberCountSectionChatFragmentDoc = gql`
    fragment MemberCountSectionChat on GroupChat {
  memberCount
}
    `;
export const UserItemFragmentDoc = gql`
    fragment UserItem on User {
  id
  username
  name
}
    `;
export const FriendMenuFriendFragmentDoc = gql`
    fragment FriendMenuFriend on Friend {
  id
}
    `;
export const UseStrangerFragmentDoc = gql`
    fragment UseStranger on Stranger {
  id
  friendRequest {
    id
    isCreator
    createdById
    recipientId
    state
  }
}
    `;
export const StrangerMenuStrangerFragmentDoc = gql`
    fragment StrangerMenuStranger on Stranger {
  ...UseStranger
}
    ${UseStrangerFragmentDoc}`;
export const UserMenuFragmentDoc = gql`
    fragment UserMenu on User {
  ...FriendMenuFriend
  ...StrangerMenuStranger
}
    ${FriendMenuFriendFragmentDoc}
${StrangerMenuStrangerFragmentDoc}`;
export const ChatMemberItemUserFragmentDoc = gql`
    fragment ChatMemberItemUser on User {
  ...UserItem
  ...UserMenu
}
    ${UserItemFragmentDoc}
${UserMenuFragmentDoc}`;
export const MemberSectionUserFragmentDoc = gql`
    fragment MemberSectionUser on User {
  id
  ...ChatMemberItemUser
}
    ${ChatMemberItemUserFragmentDoc}`;
export const ChatMemberItemChatFragmentDoc = gql`
    fragment ChatMemberItemChat on Chat {
  id
  ... on GroupChat {
    role
  }
}
    `;
export const MemberSectionChatFragmentDoc = gql`
    fragment MemberSectionChat on Chat {
  ...ChatMemberItemChat
}
    ${ChatMemberItemChatFragmentDoc}`;
export const UpdateGroupUserFragmentDoc = gql`
    fragment UpdateGroupUser on User {
  id
  username
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
export const FriendRequestComponentRequestFragmentDoc = gql`
    fragment FriendRequestComponentRequest on FriendRequest {
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
export const AlertComponentAlertFragmentDoc = gql`
    fragment AlertComponentAlert on Alert {
  id
  createdAt
  createdById
  isCreator
  createdBy {
    ...UserAvatar
    username
  }
  ... on ChatAccessAlert {
    chat {
      id
      ... on GroupChat {
        name
      }
    }
  }
  ... on RequestResponseAlert {
    request {
      id
    }
  }
}
    ${UserAvatarFragmentDoc}`;
export const NotificationComponentNotificationFragmentDoc = gql`
    fragment NotificationComponentNotification on Notification {
  ... on FriendRequest {
    ...FriendRequestComponentRequest
  }
  ... on Alert {
    ...AlertComponentAlert
  }
}
    ${FriendRequestComponentRequestFragmentDoc}
${AlertComponentAlertFragmentDoc}`;
export const NotificationMenuRequestFragmentDoc = gql`
    fragment NotificationMenuRequest on Notification {
  ...NotificationComponentNotification
}
    ${NotificationComponentNotificationFragmentDoc}`;
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
      friendRequest {
        id
      }
    }
  }
  ... on ChatAccessAlert {
    chat {
      id
      ... on GroupChat {
        name
      }
    }
  }
  ... on RequestResponseAlert {
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
        friendRequest {
          id
        }
      }
    }
  }
  ...NotificationMenuRequest
}
    ${NotificationMenuRequestFragmentDoc}`;
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
export const GroupChatUpdateFragmentDoc = gql`
    fragment GroupChatUpdate on ChatUpdateEvent {
  id
  createdBy {
    id
  }
}
    `;
export const UserAlerationGroupChatUpdateFragmentDoc = gql`
    fragment UserAlerationGroupChatUpdate on MemberAlterationEvent {
  members {
    role
    user {
      id
      username
    }
  }
}
    `;
export const UseDeleteChatFragmentDoc = gql`
    fragment UseDeleteChat on Chat {
  id
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
export const UseFriendFragmentDoc = gql`
    fragment UseFriend on Friend {
  id
}
    `;
export const UseRequestFragmentDoc = gql`
    fragment UseRequest on Request {
  id
  isCreator
  createdById
  recipientId
  state
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
export const GetChatsForChatDisplayDocument = gql`
    query GetChatsForChatDisplay($firstMembers: Int = 2, $afterMember: String) {
  chats {
    ...ChatForChatDisplay
  }
}
    ${ChatForChatDisplayFragmentDoc}`;

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
 *      firstMembers: // value for 'firstMembers'
 *      afterMember: // value for 'afterMember'
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
export const GetChatsForChatDisplayChangesDocument = gql`
    subscription GetChatsForChatDisplayChanges($firstMembers: Int = 2, $afterMember: String) {
  chatAccessAlerts {
    chat {
      ...ChatForChatDisplay
    }
  }
}
    ${ChatForChatDisplayFragmentDoc}`;

/**
 * __useGetChatsForChatDisplayChangesSubscription__
 *
 * To run a query within a React component, call `useGetChatsForChatDisplayChangesSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGetChatsForChatDisplayChangesSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChatsForChatDisplayChangesSubscription({
 *   variables: {
 *      firstMembers: // value for 'firstMembers'
 *      afterMember: // value for 'afterMember'
 *   },
 * });
 */
export function useGetChatsForChatDisplayChangesSubscription(baseOptions?: Apollo.SubscriptionHookOptions<GetChatsForChatDisplayChangesSubscription, GetChatsForChatDisplayChangesSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<GetChatsForChatDisplayChangesSubscription, GetChatsForChatDisplayChangesSubscriptionVariables>(GetChatsForChatDisplayChangesDocument, options);
      }
export type GetChatsForChatDisplayChangesSubscriptionHookResult = ReturnType<typeof useGetChatsForChatDisplayChangesSubscription>;
export type GetChatsForChatDisplayChangesSubscriptionResult = Apollo.SubscriptionResult<GetChatsForChatDisplayChangesSubscription>;
export const GetChatForChatHeaderDocument = gql`
    query GetChatForChatHeader($chatId: HashId!) {
  chat(chatId: $chatId) {
    ...ChatHeaderChat
  }
}
    ${ChatHeaderChatFragmentDoc}`;

/**
 * __useGetChatForChatHeaderQuery__
 *
 * To run a query within a React component, call `useGetChatForChatHeaderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChatForChatHeaderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChatForChatHeaderQuery({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useGetChatForChatHeaderQuery(baseOptions: Apollo.QueryHookOptions<GetChatForChatHeaderQuery, GetChatForChatHeaderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetChatForChatHeaderQuery, GetChatForChatHeaderQueryVariables>(GetChatForChatHeaderDocument, options);
      }
export function useGetChatForChatHeaderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChatForChatHeaderQuery, GetChatForChatHeaderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetChatForChatHeaderQuery, GetChatForChatHeaderQueryVariables>(GetChatForChatHeaderDocument, options);
        }
export type GetChatForChatHeaderQueryHookResult = ReturnType<typeof useGetChatForChatHeaderQuery>;
export type GetChatForChatHeaderLazyQueryHookResult = ReturnType<typeof useGetChatForChatHeaderLazyQuery>;
export type GetChatForChatHeaderQueryResult = Apollo.QueryResult<GetChatForChatHeaderQuery, GetChatForChatHeaderQueryVariables>;
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
export const GetChatForChatAsideDocument = gql`
    query GetChatForChatAside($chatId: HashId!) {
  chat(chatId: $chatId) {
    ...HeaderSectionChat
    ...MemberSectionChat
    ... on GroupChat {
      ...MemberCountSectionChat
    }
  }
}
    ${HeaderSectionChatFragmentDoc}
${MemberSectionChatFragmentDoc}
${MemberCountSectionChatFragmentDoc}`;

/**
 * __useGetChatForChatAsideQuery__
 *
 * To run a query within a React component, call `useGetChatForChatAsideQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChatForChatAsideQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChatForChatAsideQuery({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useGetChatForChatAsideQuery(baseOptions: Apollo.QueryHookOptions<GetChatForChatAsideQuery, GetChatForChatAsideQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetChatForChatAsideQuery, GetChatForChatAsideQueryVariables>(GetChatForChatAsideDocument, options);
      }
export function useGetChatForChatAsideLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChatForChatAsideQuery, GetChatForChatAsideQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetChatForChatAsideQuery, GetChatForChatAsideQueryVariables>(GetChatForChatAsideDocument, options);
        }
export type GetChatForChatAsideQueryHookResult = ReturnType<typeof useGetChatForChatAsideQuery>;
export type GetChatForChatAsideLazyQueryHookResult = ReturnType<typeof useGetChatForChatAsideLazyQuery>;
export type GetChatForChatAsideQueryResult = Apollo.QueryResult<GetChatForChatAsideQuery, GetChatForChatAsideQueryVariables>;
export const GetMembersForMemberSectionDocument = gql`
    query GetMembersForMemberSection($chatId: HashId!, $first: Int!, $after: String) {
  members(chatId: $chatId, first: $first, after: $after) {
    edges {
      node {
        user {
          ...MemberSectionUser
        }
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
    ${MemberSectionUserFragmentDoc}`;

/**
 * __useGetMembersForMemberSectionQuery__
 *
 * To run a query within a React component, call `useGetMembersForMemberSectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMembersForMemberSectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMembersForMemberSectionQuery({
 *   variables: {
 *      chatId: // value for 'chatId'
 *      first: // value for 'first'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useGetMembersForMemberSectionQuery(baseOptions: Apollo.QueryHookOptions<GetMembersForMemberSectionQuery, GetMembersForMemberSectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMembersForMemberSectionQuery, GetMembersForMemberSectionQueryVariables>(GetMembersForMemberSectionDocument, options);
      }
export function useGetMembersForMemberSectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMembersForMemberSectionQuery, GetMembersForMemberSectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMembersForMemberSectionQuery, GetMembersForMemberSectionQueryVariables>(GetMembersForMemberSectionDocument, options);
        }
export type GetMembersForMemberSectionQueryHookResult = ReturnType<typeof useGetMembersForMemberSectionQuery>;
export type GetMembersForMemberSectionLazyQueryHookResult = ReturnType<typeof useGetMembersForMemberSectionLazyQuery>;
export type GetMembersForMemberSectionQueryResult = Apollo.QueryResult<GetMembersForMemberSectionQuery, GetMembersForMemberSectionQueryVariables>;
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
      role
      ...ChatUpdateActionGroupChat
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
    ${ChatUpdateActionGroupChatFragmentDoc}`;

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
    query GetChatForUpdate($chatId: HashId!, $firstMembers: Int = 300) {
  chat(chatId: $chatId) {
    id
    isCreator
    createdById
    ... on GroupChat {
      name
      description
      members(first: $firstMembers) {
        edges {
          node {
            role
            user {
              ...UpdateGroupUser
            }
          }
        }
      }
      role
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
 *      firstMembers: // value for 'firstMembers'
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
export const AcknoledgeAlertDocument = gql`
    mutation AcknoledgeAlert($alertId: HashId!) {
  acknowledgeAlert(alertId: $alertId) {
    id
  }
}
    `;
export type AcknoledgeAlertMutationFn = Apollo.MutationFunction<AcknoledgeAlertMutation, AcknoledgeAlertMutationVariables>;

/**
 * __useAcknoledgeAlertMutation__
 *
 * To run a mutation, you first call `useAcknoledgeAlertMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcknoledgeAlertMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acknoledgeAlertMutation, { data, loading, error }] = useAcknoledgeAlertMutation({
 *   variables: {
 *      alertId: // value for 'alertId'
 *   },
 * });
 */
export function useAcknoledgeAlertMutation(baseOptions?: Apollo.MutationHookOptions<AcknoledgeAlertMutation, AcknoledgeAlertMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcknoledgeAlertMutation, AcknoledgeAlertMutationVariables>(AcknoledgeAlertDocument, options);
      }
export type AcknoledgeAlertMutationHookResult = ReturnType<typeof useAcknoledgeAlertMutation>;
export type AcknoledgeAlertMutationResult = Apollo.MutationResult<AcknoledgeAlertMutation>;
export type AcknoledgeAlertMutationOptions = Apollo.BaseMutationOptions<AcknoledgeAlertMutation, AcknoledgeAlertMutationVariables>;
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
export const AddMembersDocument = gql`
    mutation AddMembers($chatId: HashId!, $members: [HashId!]!) {
  addMembers(chatId: $chatId, members: $members) {
    ...GroupChatUpdate
    ...UserAlerationGroupChatUpdate
    chat {
      id
    }
  }
}
    ${GroupChatUpdateFragmentDoc}
${UserAlerationGroupChatUpdateFragmentDoc}`;
export type AddMembersMutationFn = Apollo.MutationFunction<AddMembersMutation, AddMembersMutationVariables>;

/**
 * __useAddMembersMutation__
 *
 * To run a mutation, you first call `useAddMembersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMembersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMembersMutation, { data, loading, error }] = useAddMembersMutation({
 *   variables: {
 *      chatId: // value for 'chatId'
 *      members: // value for 'members'
 *   },
 * });
 */
export function useAddMembersMutation(baseOptions?: Apollo.MutationHookOptions<AddMembersMutation, AddMembersMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddMembersMutation, AddMembersMutationVariables>(AddMembersDocument, options);
      }
export type AddMembersMutationHookResult = ReturnType<typeof useAddMembersMutation>;
export type AddMembersMutationResult = Apollo.MutationResult<AddMembersMutation>;
export type AddMembersMutationOptions = Apollo.BaseMutationOptions<AddMembersMutation, AddMembersMutationVariables>;
export const RemoveMembersDocument = gql`
    mutation RemoveMembers($chatId: HashId!, $members: [HashId!]!) {
  removeMembers(chatId: $chatId, members: $members) {
    ...GroupChatUpdate
    ...UserAlerationGroupChatUpdate
    chat {
      id
    }
  }
}
    ${GroupChatUpdateFragmentDoc}
${UserAlerationGroupChatUpdateFragmentDoc}`;
export type RemoveMembersMutationFn = Apollo.MutationFunction<RemoveMembersMutation, RemoveMembersMutationVariables>;

/**
 * __useRemoveMembersMutation__
 *
 * To run a mutation, you first call `useRemoveMembersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveMembersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeMembersMutation, { data, loading, error }] = useRemoveMembersMutation({
 *   variables: {
 *      chatId: // value for 'chatId'
 *      members: // value for 'members'
 *   },
 * });
 */
export function useRemoveMembersMutation(baseOptions?: Apollo.MutationHookOptions<RemoveMembersMutation, RemoveMembersMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveMembersMutation, RemoveMembersMutationVariables>(RemoveMembersDocument, options);
      }
export type RemoveMembersMutationHookResult = ReturnType<typeof useRemoveMembersMutation>;
export type RemoveMembersMutationResult = Apollo.MutationResult<RemoveMembersMutation>;
export type RemoveMembersMutationOptions = Apollo.BaseMutationOptions<RemoveMembersMutation, RemoveMembersMutationVariables>;
export const ChangeRoleDocument = gql`
    mutation ChangeRole($chatId: HashId!, $members: [HashId!]!, $role: Role!) {
  changeRole(chatId: $chatId, members: $members, role: $role) {
    ...GroupChatUpdate
    ...UserAlerationGroupChatUpdate
    chat {
      id
    }
  }
}
    ${GroupChatUpdateFragmentDoc}
${UserAlerationGroupChatUpdateFragmentDoc}`;
export type ChangeRoleMutationFn = Apollo.MutationFunction<ChangeRoleMutation, ChangeRoleMutationVariables>;

/**
 * __useChangeRoleMutation__
 *
 * To run a mutation, you first call `useChangeRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeRoleMutation, { data, loading, error }] = useChangeRoleMutation({
 *   variables: {
 *      chatId: // value for 'chatId'
 *      members: // value for 'members'
 *      role: // value for 'role'
 *   },
 * });
 */
export function useChangeRoleMutation(baseOptions?: Apollo.MutationHookOptions<ChangeRoleMutation, ChangeRoleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeRoleMutation, ChangeRoleMutationVariables>(ChangeRoleDocument, options);
      }
export type ChangeRoleMutationHookResult = ReturnType<typeof useChangeRoleMutation>;
export type ChangeRoleMutationResult = Apollo.MutationResult<ChangeRoleMutation>;
export type ChangeRoleMutationOptions = Apollo.BaseMutationOptions<ChangeRoleMutation, ChangeRoleMutationVariables>;
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
export const DeleteFriendDocument = gql`
    mutation DeleteFriend($friendId: HashId!) {
  deleteFriend(friendId: $friendId) {
    id
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
export const LeaveChatDocument = gql`
    mutation LeaveChat($chatId: HashId!) {
  leaveGroupChat(chatId: $chatId) {
    id
  }
}
    `;
export type LeaveChatMutationFn = Apollo.MutationFunction<LeaveChatMutation, LeaveChatMutationVariables>;

/**
 * __useLeaveChatMutation__
 *
 * To run a mutation, you first call `useLeaveChatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLeaveChatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [leaveChatMutation, { data, loading, error }] = useLeaveChatMutation({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useLeaveChatMutation(baseOptions?: Apollo.MutationHookOptions<LeaveChatMutation, LeaveChatMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LeaveChatMutation, LeaveChatMutationVariables>(LeaveChatDocument, options);
      }
export type LeaveChatMutationHookResult = ReturnType<typeof useLeaveChatMutation>;
export type LeaveChatMutationResult = Apollo.MutationResult<LeaveChatMutation>;
export type LeaveChatMutationOptions = Apollo.BaseMutationOptions<LeaveChatMutation, LeaveChatMutationVariables>;
export const AcceptRequestDocument = gql`
    mutation AcceptRequest($requestId: HashId!) {
  acceptRequest(requestId: $requestId) {
    ...UseRequest
    createdBy {
      id
    }
  }
}
    ${UseRequestFragmentDoc}`;
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
    ...UseRequest
  }
}
    ${UseRequestFragmentDoc}`;
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
    ...UseRequest
  }
}
    ${UseRequestFragmentDoc}`;
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