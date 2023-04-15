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
  DateTime: any;
  HashId: any;
};

export type Alert = {
  createdAt: Scalars['DateTime'];
  createdBy: User;
  createdById: Scalars['HashId'];
  id: Scalars['HashId'];
  isCreator: Scalars['Boolean'];
  recipients: Array<User>;
};

export type Chat = {
  createdAt: Scalars['DateTime'];
  createdBy: User;
  createdById: Scalars['HashId'];
  id: Scalars['HashId'];
  isCreator: Scalars['Boolean'];
  updatedAt: Scalars['DateTime'];
};

export type ChatAccessAlert = {
  chat: Chat;
  chatId: Scalars['HashId'];
  createdAt: Scalars['DateTime'];
  createdBy: User;
  createdById: Scalars['HashId'];
  id: Scalars['HashId'];
  isCreator: Scalars['Boolean'];
  recipients: Array<User>;
};

export type ChatAlert = {
  chat: Chat;
  chatId: Scalars['HashId'];
  createdAt: Scalars['DateTime'];
  createdBy: User;
  createdById: Scalars['HashId'];
  id: Scalars['HashId'];
  isCreator: Scalars['Boolean'];
  recipients: Array<User>;
};

export type ChatDeletedAlert = Alert & {
  __typename?: 'ChatDeletedAlert';
  chat: User;
  chatId: Scalars['HashId'];
  createdAt: Scalars['DateTime'];
  createdBy: User;
  createdById: Scalars['HashId'];
  id: Scalars['HashId'];
  isCreator: Scalars['Boolean'];
  recipients: Array<User>;
};

export type ChatDescriptionUpdate = ChatUpdate & {
  __typename?: 'ChatDescriptionUpdate';
  descriptionAfter: Scalars['String'];
  descriptionBefore: Scalars['String'];
  event: Event;
  eventId: Scalars['Float'];
};

export type ChatMember = Member & {
  __typename?: 'ChatMember';
  addedBy: User;
  addedById: Scalars['HashId'];
  chat: Chat;
  chatId: Scalars['HashId'];
  id: Scalars['HashId'];
  role: Role;
  user: User;
  userId: Scalars['HashId'];
};

export type ChatMemberAccessGrantedAlert = Alert & ChatAccessAlert & ChatAlert & {
  __typename?: 'ChatMemberAccessGrantedAlert';
  chat: Chat;
  chatId: Scalars['HashId'];
  createdAt: Scalars['DateTime'];
  createdBy: User;
  createdById: Scalars['HashId'];
  id: Scalars['HashId'];
  isCreator: Scalars['Boolean'];
  recipients: Array<User>;
};

export type ChatMemberAlteration = {
  event: Event;
  eventId: Scalars['Float'];
  members: Array<Member>;
};

export type ChatMembersAddedUpdate = ChatMemberAlteration & ChatUpdate & {
  __typename?: 'ChatMembersAddedUpdate';
  event: Event;
  eventId: Scalars['Float'];
  members: Array<Member>;
};

export type ChatMembersRemovedUpdate = ChatMemberAlteration & ChatUpdate & {
  __typename?: 'ChatMembersRemovedUpdate';
  event: Event;
  eventId: Scalars['Float'];
  members: Array<Member>;
};

export type ChatNameUpdate = ChatUpdate & {
  __typename?: 'ChatNameUpdate';
  event: Event;
  eventId: Scalars['Float'];
  nameAfter: Scalars['String'];
  nameBefore: Scalars['String'];
};

export type ChatUpdate = {
  event: Event;
  eventId: Scalars['Float'];
};

export type CreateGroupChatInput = {
  /** Short description of the group chat */
  description?: InputMaybe<Scalars['String']>;
  /** Name of the group chat */
  name: Scalars['String'];
  /** Ids of the users to be added to the group chat */
  userIds?: InputMaybe<Array<Scalars['HashId']>>;
};

export type CreatedEvent = Event & {
  __typename?: 'CreatedEvent';
  chat: Chat;
  chatId: Scalars['HashId'];
  createdAt: Scalars['DateTime'];
  createdBy: User;
  createdById: Scalars['HashId'];
  id: Scalars['HashId'];
  isCreator: Scalars['Boolean'];
  payload: PayloadUnion;
  updatedAt: Scalars['DateTime'];
};

/** A deleted chat */
export type DeletedChat = Chat & {
  __typename?: 'DeletedChat';
  createdAt: Scalars['DateTime'];
  createdBy: User;
  createdById: Scalars['HashId'];
  deletedAt: Scalars['DateTime'];
  id: Scalars['HashId'];
  isCreator: Scalars['Boolean'];
  updatedAt: Scalars['DateTime'];
};

export type DeletedEvent = Event & {
  __typename?: 'DeletedEvent';
  chat: Chat;
  chatId: Scalars['HashId'];
  createdAt: Scalars['DateTime'];
  createdBy: User;
  createdById: Scalars['HashId'];
  deletedAt: Scalars['DateTime'];
  id: Scalars['HashId'];
  isCreator: Scalars['Boolean'];
  updatedAt: Scalars['DateTime'];
};

export type DirectMessageChat = Chat & {
  __typename?: 'DirectMessageChat';
  createdAt: Scalars['DateTime'];
  createdBy: User;
  createdById: Scalars['HashId'];
  id: Scalars['HashId'];
  isCreator: Scalars['Boolean'];
  receipent: Member;
  updatedAt: Scalars['DateTime'];
};

export type Event = {
  chat: Chat;
  chatId: Scalars['HashId'];
  createdAt: Scalars['DateTime'];
  createdBy: User;
  createdById: Scalars['HashId'];
  id: Scalars['HashId'];
  isCreator: Scalars['Boolean'];
  updatedAt: Scalars['DateTime'];
};

export type EventEdge = {
  __typename?: 'EventEdge';
  cursor: Scalars['String'];
  node: Event;
};

/** A chat you do not have access to */
export type ForbiddenChat = Chat & {
  __typename?: 'ForbiddenChat';
  createdAt: Scalars['DateTime'];
  createdBy: User;
  createdById: Scalars['HashId'];
  id: Scalars['HashId'];
  isCreator: Scalars['Boolean'];
  updatedAt: Scalars['DateTime'];
};

export type Friend = User & {
  __typename?: 'Friend';
  createdAt: Scalars['DateTime'];
  friends: PaginatedUser;
  id: Scalars['HashId'];
  name?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};


export type FriendFriendsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type FriendDeletedAlert = Alert & {
  __typename?: 'FriendDeletedAlert';
  createdAt: Scalars['DateTime'];
  createdBy: User;
  createdById: Scalars['HashId'];
  id: Scalars['HashId'];
  isCreator: Scalars['Boolean'];
  recipients: Array<User>;
  user: User;
  userId: Scalars['HashId'];
};

export type FriendEdge = {
  __typename?: 'FriendEdge';
  cursor: Scalars['String'];
  node: Friend;
};

export type FriendRequest = Request & {
  __typename?: 'FriendRequest';
  createdAt: Scalars['DateTime'];
  createdBy: User;
  createdById: Scalars['HashId'];
  id: Scalars['HashId'];
  isCreator: Scalars['Boolean'];
  recipient: User;
  recipientId: Scalars['HashId'];
  state: RequestState;
};

export type GroupChat = Chat & {
  __typename?: 'GroupChat';
  createdAt: Scalars['DateTime'];
  createdBy: User;
  createdById: Scalars['HashId'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['HashId'];
  isCreator: Scalars['Boolean'];
  members: PaginatedMember;
  name: Scalars['String'];
  role: Role;
  updatedAt: Scalars['DateTime'];
};


export type GroupChatMembersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type Me = User & {
  __typename?: 'Me';
  createdAt: Scalars['DateTime'];
  friends: PaginatedUser;
  id: Scalars['HashId'];
  name?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};


export type MeFriendsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type Member = {
  addedBy: User;
  addedById: Scalars['HashId'];
  chat: Chat;
  chatId: Scalars['HashId'];
  id: Scalars['HashId'];
  role: Role;
  user: User;
  userId: Scalars['HashId'];
};

export type MemberEdge = {
  __typename?: 'MemberEdge';
  cursor: Scalars['String'];
  node: Member;
};

export type Message = {
  __typename?: 'Message';
  content: Scalars['String'];
  event: Event;
  eventId: Scalars['Float'];
  likedBy: Array<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptRequest: Request;
  acknowledgeAlert: Alert;
  addMembers: ChatMembersAddedUpdate;
  cancelRequest: Request;
  changeMemberRoles: ChatMembersRemovedUpdate;
  createDirectMessageChat: DirectMessageChat;
  createGroupChat: GroupChat;
  createMessage: Message;
  declineRequest: Request;
  deleteEvent: DeletedEvent;
  deleteFriend: Stranger;
  deletedChat: DeletedChat;
  removeMembers: ChatMembersRemovedUpdate;
  sendFriendRequest: FriendRequest;
  updateGroupChatDescription: ChatDescriptionUpdate;
  updateGroupChatName: ChatNameUpdate;
  updateMessage: Message;
};


export type MutationAcceptRequestArgs = {
  requestId: Scalars['HashId'];
};


export type MutationAcknowledgeAlertArgs = {
  alertId: Scalars['HashId'];
};


export type MutationAddMembersArgs = {
  chatId: Scalars['HashId'];
  userIds: Array<Scalars['HashId']>;
};


export type MutationCancelRequestArgs = {
  requestId: Scalars['HashId'];
};


export type MutationChangeMemberRolesArgs = {
  chatId: Scalars['HashId'];
  role: Role;
  userIds: Array<Scalars['HashId']>;
};


export type MutationCreateDirectMessageChatArgs = {
  receipentUserId: Scalars['HashId'];
};


export type MutationCreateGroupChatArgs = {
  createGroupChatData: CreateGroupChatInput;
};


export type MutationCreateMessageArgs = {
  chatId: Scalars['HashId'];
  content: Scalars['String'];
};


export type MutationDeclineRequestArgs = {
  requestId: Scalars['HashId'];
};


export type MutationDeleteEventArgs = {
  eventId: Scalars['HashId'];
};


export type MutationDeleteFriendArgs = {
  userId: Scalars['HashId'];
};


export type MutationDeletedChatArgs = {
  chatId: Scalars['HashId'];
};


export type MutationRemoveMembersArgs = {
  chatId: Scalars['HashId'];
  userIds: Array<Scalars['HashId']>;
};


export type MutationSendFriendRequestArgs = {
  userId: Scalars['HashId'];
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
  eventId: Scalars['HashId'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor: Scalars['String'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor: Scalars['String'];
};

export type PaginatedEvent = {
  __typename?: 'PaginatedEvent';
  edges?: Maybe<Array<EventEdge>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Float'];
};

export type PaginatedFriend = {
  __typename?: 'PaginatedFriend';
  edges?: Maybe<Array<FriendEdge>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Float'];
};

export type PaginatedMember = {
  __typename?: 'PaginatedMember';
  edges?: Maybe<Array<MemberEdge>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Float'];
};

export type PaginatedUser = {
  __typename?: 'PaginatedUser';
  edges?: Maybe<Array<UserEdge>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Float'];
};

export type PayloadUnion = ChatDescriptionUpdate | ChatMembersAddedUpdate | ChatMembersRemovedUpdate | ChatNameUpdate | Message;

export type Query = {
  __typename?: 'Query';
  alerts: Array<Alert>;
  chat: Chat;
  chats: Array<Chat>;
  event: Event;
  events: PaginatedEvent;
  friends: PaginatedFriend;
  me: Me;
  members: PaginatedMember;
  requests: Array<Request>;
  users: PaginatedUser;
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


export type QueryFriendsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<Scalars['String']>;
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


export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type RemovedMember = Member & {
  __typename?: 'RemovedMember';
  addedBy: User;
  addedById: Scalars['HashId'];
  chat: Chat;
  chatId: Scalars['HashId'];
  id: Scalars['HashId'];
  removedBy: User;
  removedById: Scalars['HashId'];
  role: Role;
  user: User;
  userId: Scalars['HashId'];
};

export type Request = {
  createdAt: Scalars['DateTime'];
  createdBy: User;
  createdById: Scalars['HashId'];
  id: Scalars['HashId'];
  isCreator: Scalars['Boolean'];
  recipient: User;
  recipientId: Scalars['HashId'];
  state: RequestState;
};

export enum RequestState {
  Accepted = 'ACCEPTED',
  Cancelled = 'CANCELLED',
  Declined = 'DECLINED',
  Sent = 'SENT'
}

export enum Role {
  Admin = 'ADMIN',
  Basic = 'BASIC',
  Owner = 'OWNER'
}

export type Stranger = User & {
  __typename?: 'Stranger';
  createdAt: Scalars['DateTime'];
  friendRequest?: Maybe<FriendRequest>;
  friends: PaginatedUser;
  id: Scalars['HashId'];
  mutualFriends: Array<Friend>;
  name?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};


export type StrangerFriendsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type StrangerMutualFriendsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  alerts: ChatAlert;
  chats: Chat;
  events: Event;
  requests: Request;
};

export type User = {
  createdAt: Scalars['DateTime'];
  friends: PaginatedUser;
  id: Scalars['HashId'];
  name?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};


export type UserFriendsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type UserEdge = {
  __typename?: 'UserEdge';
  cursor: Scalars['String'];
  node: User;
};

export type GetChatsForChatDisplayQueryVariables = Exact<{
  firstMembers?: InputMaybe<Scalars['Int']>;
  afterMember?: InputMaybe<Scalars['String']>;
}>;


export type GetChatsForChatDisplayQuery = { __typename?: 'Query', chats: Array<{ __typename?: 'DeletedChat', id: any, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'DirectMessageChat', id: any, receipent: { __typename?: 'ChatMember', id: any, user: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } } | { __typename?: 'RemovedMember', id: any, user: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } }, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'ForbiddenChat', id: any, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'GroupChat', id: any, name: string, members: { __typename?: 'PaginatedMember', totalCount: number, edges?: Array<{ __typename?: 'MemberEdge', node: { __typename?: 'ChatMember', id: any, user: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } } | { __typename?: 'RemovedMember', id: any, user: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } } }> | null }, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } }> };

export type ChatsForChatDisplaySubscriptionVariables = Exact<{
  firstMembers?: InputMaybe<Scalars['Int']>;
  afterMember?: InputMaybe<Scalars['String']>;
}>;


export type ChatsForChatDisplaySubscription = { __typename?: 'Subscription', chats: { __typename?: 'DeletedChat', id: any, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'DirectMessageChat', id: any, receipent: { __typename?: 'ChatMember', id: any, user: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } } | { __typename?: 'RemovedMember', id: any, user: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } }, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'ForbiddenChat', id: any, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'GroupChat', id: any, name: string, members: { __typename?: 'PaginatedMember', totalCount: number, edges?: Array<{ __typename?: 'MemberEdge', node: { __typename?: 'ChatMember', id: any, user: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } } | { __typename?: 'RemovedMember', id: any, user: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } } }> | null }, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } };

type ChatDisplayChat_DeletedChat_Fragment = { __typename?: 'DeletedChat', id: any, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

type ChatDisplayChat_DirectMessageChat_Fragment = { __typename?: 'DirectMessageChat', id: any, receipent: { __typename?: 'ChatMember', id: any, user: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } } | { __typename?: 'RemovedMember', id: any, user: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } }, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

type ChatDisplayChat_ForbiddenChat_Fragment = { __typename?: 'ForbiddenChat', id: any, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

type ChatDisplayChat_GroupChat_Fragment = { __typename?: 'GroupChat', id: any, name: string, members: { __typename?: 'PaginatedMember', totalCount: number, edges?: Array<{ __typename?: 'MemberEdge', node: { __typename?: 'ChatMember', id: any, user: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } } | { __typename?: 'RemovedMember', id: any, user: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } } }> | null }, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

export type ChatDisplayChatFragment = ChatDisplayChat_DeletedChat_Fragment | ChatDisplayChat_DirectMessageChat_Fragment | ChatDisplayChat_ForbiddenChat_Fragment | ChatDisplayChat_GroupChat_Fragment;

type ChatItem_DeletedChat_Fragment = { __typename?: 'DeletedChat', id: any };

type ChatItem_DirectMessageChat_Fragment = { __typename?: 'DirectMessageChat', id: any, receipent: { __typename?: 'ChatMember', user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'RemovedMember', user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } };

type ChatItem_ForbiddenChat_Fragment = { __typename?: 'ForbiddenChat', id: any };

type ChatItem_GroupChat_Fragment = { __typename?: 'GroupChat', name: string, id: any, members: { __typename?: 'PaginatedMember', totalCount: number, edges?: Array<{ __typename?: 'MemberEdge', node: { __typename?: 'ChatMember', user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'RemovedMember', user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } }> | null } };

export type ChatItemFragment = ChatItem_DeletedChat_Fragment | ChatItem_DirectMessageChat_Fragment | ChatItem_ForbiddenChat_Fragment | ChatItem_GroupChat_Fragment;

type ChatItemUser_Friend_Fragment = { __typename?: 'Friend', id: any, username: string };

type ChatItemUser_Me_Fragment = { __typename?: 'Me', id: any, username: string };

type ChatItemUser_Stranger_Fragment = { __typename?: 'Stranger', id: any, username: string };

export type ChatItemUserFragment = ChatItemUser_Friend_Fragment | ChatItemUser_Me_Fragment | ChatItemUser_Stranger_Fragment;

export type GetChatForChatHeaderQueryVariables = Exact<{
  chatId: Scalars['HashId'];
}>;


export type GetChatForChatHeaderQuery = { __typename?: 'Query', chat: { __typename?: 'DeletedChat', id: any } | { __typename?: 'DirectMessageChat', id: any, receipent: { __typename?: 'ChatMember', user: { __typename?: 'Friend', username: string, id: any } | { __typename?: 'Me', username: string, id: any } | { __typename?: 'Stranger', username: string, id: any } } | { __typename?: 'RemovedMember', user: { __typename?: 'Friend', username: string, id: any } | { __typename?: 'Me', username: string, id: any } | { __typename?: 'Stranger', username: string, id: any } } } | { __typename?: 'ForbiddenChat', id: any } | { __typename?: 'GroupChat', name: string, description?: string | null, id: any } };

type ChatHeaderChat_DeletedChat_Fragment = { __typename?: 'DeletedChat', id: any };

type ChatHeaderChat_DirectMessageChat_Fragment = { __typename?: 'DirectMessageChat', id: any, receipent: { __typename?: 'ChatMember', user: { __typename?: 'Friend', username: string, id: any } | { __typename?: 'Me', username: string, id: any } | { __typename?: 'Stranger', username: string, id: any } } | { __typename?: 'RemovedMember', user: { __typename?: 'Friend', username: string, id: any } | { __typename?: 'Me', username: string, id: any } | { __typename?: 'Stranger', username: string, id: any } } };

type ChatHeaderChat_ForbiddenChat_Fragment = { __typename?: 'ForbiddenChat', id: any };

type ChatHeaderChat_GroupChat_Fragment = { __typename?: 'GroupChat', name: string, description?: string | null, id: any };

export type ChatHeaderChatFragment = ChatHeaderChat_DeletedChat_Fragment | ChatHeaderChat_DirectMessageChat_Fragment | ChatHeaderChat_ForbiddenChat_Fragment | ChatHeaderChat_GroupChat_Fragment;

export type GetEventsQueryVariables = Exact<{
  chatId: Scalars['HashId'];
  last?: InputMaybe<Scalars['Int']>;
  before?: InputMaybe<Scalars['String']>;
}>;


export type GetEventsQuery = { __typename?: 'Query', events: { __typename?: 'PaginatedEvent', pageInfo: { __typename?: 'PageInfo', hasPreviousPage: boolean, startCursor: string }, edges?: Array<{ __typename?: 'EventEdge', node: { __typename?: 'CreatedEvent', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', id: any }, payload: { __typename?: 'ChatDescriptionUpdate', descriptionAfter: string, event: { __typename?: 'CreatedEvent', createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'DeletedEvent', createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } } | { __typename?: 'ChatMembersAddedUpdate', event: { __typename?: 'CreatedEvent', createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'DeletedEvent', createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } }, members: Array<{ __typename?: 'ChatMember', user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'RemovedMember', user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } }> } | { __typename?: 'ChatMembersRemovedUpdate', event: { __typename?: 'CreatedEvent', createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'DeletedEvent', createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } }, members: Array<{ __typename?: 'ChatMember', user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'RemovedMember', user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } }> } | { __typename?: 'ChatNameUpdate', nameAfter: string, event: { __typename?: 'CreatedEvent', createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'DeletedEvent', createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } } | { __typename?: 'Message', content: string, event: { __typename?: 'CreatedEvent', id: any, isCreator: boolean, createdAt: any, createdBy: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } } | { __typename?: 'DeletedEvent', id: any, isCreator: boolean, createdAt: any, createdBy: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } } } } | { __typename?: 'DeletedEvent', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } } }> | null } };

export type EventsSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type EventsSubscription = { __typename?: 'Subscription', events: { __typename?: 'CreatedEvent', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', id: any }, payload: { __typename?: 'ChatDescriptionUpdate', descriptionAfter: string, event: { __typename?: 'CreatedEvent', createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'DeletedEvent', createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } } | { __typename?: 'ChatMembersAddedUpdate', event: { __typename?: 'CreatedEvent', createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'DeletedEvent', createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } }, members: Array<{ __typename?: 'ChatMember', user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'RemovedMember', user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } }> } | { __typename?: 'ChatMembersRemovedUpdate', event: { __typename?: 'CreatedEvent', createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'DeletedEvent', createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } }, members: Array<{ __typename?: 'ChatMember', user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'RemovedMember', user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } }> } | { __typename?: 'ChatNameUpdate', nameAfter: string, event: { __typename?: 'CreatedEvent', createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'DeletedEvent', createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } } | { __typename?: 'Message', content: string, event: { __typename?: 'CreatedEvent', id: any, isCreator: boolean, createdAt: any, createdBy: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } } | { __typename?: 'DeletedEvent', id: any, isCreator: boolean, createdAt: any, createdBy: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } } } } | { __typename?: 'DeletedEvent', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } } };

type ChatPanelEvent_CreatedEvent_Fragment = { __typename?: 'CreatedEvent', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', id: any }, payload: { __typename?: 'ChatDescriptionUpdate', descriptionAfter: string, event: { __typename?: 'CreatedEvent', createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'DeletedEvent', createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } } | { __typename?: 'ChatMembersAddedUpdate', event: { __typename?: 'CreatedEvent', createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'DeletedEvent', createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } }, members: Array<{ __typename?: 'ChatMember', user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'RemovedMember', user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } }> } | { __typename?: 'ChatMembersRemovedUpdate', event: { __typename?: 'CreatedEvent', createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'DeletedEvent', createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } }, members: Array<{ __typename?: 'ChatMember', user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'RemovedMember', user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } }> } | { __typename?: 'ChatNameUpdate', nameAfter: string, event: { __typename?: 'CreatedEvent', createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'DeletedEvent', createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } } | { __typename?: 'Message', content: string, event: { __typename?: 'CreatedEvent', id: any, isCreator: boolean, createdAt: any, createdBy: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } } | { __typename?: 'DeletedEvent', id: any, isCreator: boolean, createdAt: any, createdBy: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } } } };

type ChatPanelEvent_DeletedEvent_Fragment = { __typename?: 'DeletedEvent', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } };

export type ChatPanelEventFragment = ChatPanelEvent_CreatedEvent_Fragment | ChatPanelEvent_DeletedEvent_Fragment;

type ChatPanelChat_DeletedChat_Fragment = { __typename?: 'DeletedChat', id: any };

type ChatPanelChat_DirectMessageChat_Fragment = { __typename?: 'DirectMessageChat', id: any, receipent: { __typename?: 'ChatMember', user: { __typename?: 'Friend', username: string, id: any } | { __typename?: 'Me', username: string, id: any } | { __typename?: 'Stranger', username: string, id: any } } | { __typename?: 'RemovedMember', user: { __typename?: 'Friend', username: string, id: any } | { __typename?: 'Me', username: string, id: any } | { __typename?: 'Stranger', username: string, id: any } } };

type ChatPanelChat_ForbiddenChat_Fragment = { __typename?: 'ForbiddenChat', id: any };

type ChatPanelChat_GroupChat_Fragment = { __typename?: 'GroupChat', name: string, description?: string | null, id: any };

export type ChatPanelChatFragment = ChatPanelChat_DeletedChat_Fragment | ChatPanelChat_DirectMessageChat_Fragment | ChatPanelChat_ForbiddenChat_Fragment | ChatPanelChat_GroupChat_Fragment;

export type CreatedEventComponentFragment = { __typename?: 'CreatedEvent', isCreator: boolean, payload: { __typename?: 'ChatDescriptionUpdate', descriptionAfter: string, event: { __typename?: 'CreatedEvent', createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'DeletedEvent', createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } } | { __typename?: 'ChatMembersAddedUpdate', event: { __typename?: 'CreatedEvent', createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'DeletedEvent', createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } }, members: Array<{ __typename?: 'ChatMember', user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'RemovedMember', user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } }> } | { __typename?: 'ChatMembersRemovedUpdate', event: { __typename?: 'CreatedEvent', createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'DeletedEvent', createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } }, members: Array<{ __typename?: 'ChatMember', user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'RemovedMember', user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } }> } | { __typename?: 'ChatNameUpdate', nameAfter: string, event: { __typename?: 'CreatedEvent', createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'DeletedEvent', createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } } | { __typename?: 'Message', content: string, event: { __typename?: 'CreatedEvent', id: any, isCreator: boolean, createdAt: any, createdBy: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } } | { __typename?: 'DeletedEvent', id: any, isCreator: boolean, createdAt: any, createdBy: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } } } };

export type ChatDescriptionUpdateComponentFragment = { __typename?: 'ChatDescriptionUpdate', descriptionAfter: string, event: { __typename?: 'CreatedEvent', createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'DeletedEvent', createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } };

export type ChatMembersAddedUpdateComponentFragment = { __typename?: 'ChatMembersAddedUpdate', event: { __typename?: 'CreatedEvent', createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'DeletedEvent', createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } }, members: Array<{ __typename?: 'ChatMember', user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'RemovedMember', user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } }> };

export type ChatMembersRemovedUpdateComponentFragment = { __typename?: 'ChatMembersRemovedUpdate', event: { __typename?: 'CreatedEvent', createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'DeletedEvent', createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } }, members: Array<{ __typename?: 'ChatMember', user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'RemovedMember', user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } }> };

export type ChatNameUpdateComponentFragment = { __typename?: 'ChatNameUpdate', nameAfter: string, event: { __typename?: 'CreatedEvent', createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'DeletedEvent', createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } };

export type DeleteMessageMutationVariables = Exact<{
  eventId: Scalars['HashId'];
}>;


export type DeleteMessageMutation = { __typename?: 'Mutation', deleteEvent: { __typename?: 'DeletedEvent', id: any } };

export type MessageComponentFragment = { __typename?: 'Message', content: string, event: { __typename?: 'CreatedEvent', id: any, isCreator: boolean, createdAt: any, createdBy: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } } | { __typename?: 'DeletedEvent', id: any, isCreator: boolean, createdAt: any, createdBy: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } } };

type MessageActions_CreatedEvent_Fragment = { __typename?: 'CreatedEvent', id: any, isCreator: boolean };

type MessageActions_DeletedEvent_Fragment = { __typename?: 'DeletedEvent', id: any, isCreator: boolean };

export type MessageActionsFragment = MessageActions_CreatedEvent_Fragment | MessageActions_DeletedEvent_Fragment;

export type MessageBubbleFragment = { __typename?: 'Message', content: string, event: { __typename?: 'CreatedEvent', id: any } | { __typename?: 'DeletedEvent', id: any } };

export type DeletedEventComponentFragment = { __typename?: 'DeletedEvent', id: any, isCreator: boolean, createdAt: any, createdBy: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } };

type EventAvatar_CreatedEvent_Fragment = { __typename?: 'CreatedEvent', id: any, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

type EventAvatar_DeletedEvent_Fragment = { __typename?: 'DeletedEvent', id: any, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

export type EventAvatarFragment = EventAvatar_CreatedEvent_Fragment | EventAvatar_DeletedEvent_Fragment;

type EventContainer_CreatedEvent_Fragment = { __typename?: 'CreatedEvent', id: any, createdAt: any, isCreator: boolean };

type EventContainer_DeletedEvent_Fragment = { __typename?: 'DeletedEvent', id: any, createdAt: any, isCreator: boolean };

export type EventContainerFragment = EventContainer_CreatedEvent_Fragment | EventContainer_DeletedEvent_Fragment;

type EventInfo_CreatedEvent_Fragment = { __typename?: 'CreatedEvent', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

type EventInfo_DeletedEvent_Fragment = { __typename?: 'DeletedEvent', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

export type EventInfoFragment = EventInfo_CreatedEvent_Fragment | EventInfo_DeletedEvent_Fragment;

type IncomingEvent_CreatedEvent_Fragment = { __typename?: 'CreatedEvent', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } };

type IncomingEvent_DeletedEvent_Fragment = { __typename?: 'DeletedEvent', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } };

export type IncomingEventFragment = IncomingEvent_CreatedEvent_Fragment | IncomingEvent_DeletedEvent_Fragment;

type OutgoingEvent_CreatedEvent_Fragment = { __typename?: 'CreatedEvent', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

type OutgoingEvent_DeletedEvent_Fragment = { __typename?: 'DeletedEvent', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } };

export type OutgoingEventFragment = OutgoingEvent_CreatedEvent_Fragment | OutgoingEvent_DeletedEvent_Fragment;

export type CreateMessageMutationVariables = Exact<{
  chatId: Scalars['HashId'];
  content: Scalars['String'];
}>;


export type CreateMessageMutation = { __typename?: 'Mutation', createMessage: { __typename?: 'Message', content: string, event: { __typename?: 'CreatedEvent', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } } | { __typename?: 'DeletedEvent', id: any, createdAt: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } } } };

export type GetChatForChatAsideQueryVariables = Exact<{
  chatId: Scalars['HashId'];
}>;


export type GetChatForChatAsideQuery = { __typename?: 'Query', chat: { __typename?: 'DeletedChat', id: any } | { __typename?: 'DirectMessageChat', id: any, receipent: { __typename?: 'ChatMember', user: { __typename?: 'Friend', username: string } | { __typename?: 'Me', username: string } | { __typename?: 'Stranger', username: string } } | { __typename?: 'RemovedMember', user: { __typename?: 'Friend', username: string } | { __typename?: 'Me', username: string } | { __typename?: 'Stranger', username: string } } } | { __typename?: 'ForbiddenChat', id: any } | { __typename?: 'GroupChat', name: string, id: any, role: Role } };

export type GetMembersForMemberSectionQueryVariables = Exact<{
  chatId: Scalars['HashId'];
  first: Scalars['Int'];
  after?: InputMaybe<Scalars['String']>;
}>;


export type GetMembersForMemberSectionQuery = { __typename?: 'Query', members: { __typename?: 'PaginatedMember', totalCount: number, edges?: Array<{ __typename?: 'MemberEdge', node: { __typename?: 'ChatMember', user: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null, friendRequest?: { __typename?: 'FriendRequest', id: any, isCreator: boolean, createdById: any, recipientId: any, state: RequestState } | null } } | { __typename?: 'RemovedMember', user: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null, friendRequest?: { __typename?: 'FriendRequest', id: any, isCreator: boolean, createdById: any, recipientId: any, state: RequestState } | null } } }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor: string } } };

type FooterSectionChat_DeletedChat_Fragment = { __typename?: 'DeletedChat', isCreator: boolean, id: any };

type FooterSectionChat_DirectMessageChat_Fragment = { __typename?: 'DirectMessageChat', isCreator: boolean, id: any };

type FooterSectionChat_ForbiddenChat_Fragment = { __typename?: 'ForbiddenChat', isCreator: boolean, id: any };

type FooterSectionChat_GroupChat_Fragment = { __typename?: 'GroupChat', name: string, isCreator: boolean, id: any };

export type FooterSectionChatFragment = FooterSectionChat_DeletedChat_Fragment | FooterSectionChat_DirectMessageChat_Fragment | FooterSectionChat_ForbiddenChat_Fragment | FooterSectionChat_GroupChat_Fragment;

type HeaderSectionChat_DeletedChat_Fragment = { __typename?: 'DeletedChat' };

type HeaderSectionChat_DirectMessageChat_Fragment = { __typename?: 'DirectMessageChat', receipent: { __typename?: 'ChatMember', user: { __typename?: 'Friend', username: string } | { __typename?: 'Me', username: string } | { __typename?: 'Stranger', username: string } } | { __typename?: 'RemovedMember', user: { __typename?: 'Friend', username: string } | { __typename?: 'Me', username: string } | { __typename?: 'Stranger', username: string } } };

type HeaderSectionChat_ForbiddenChat_Fragment = { __typename?: 'ForbiddenChat' };

type HeaderSectionChat_GroupChat_Fragment = { __typename?: 'GroupChat', name: string, id: any, role: Role };

export type HeaderSectionChatFragment = HeaderSectionChat_DeletedChat_Fragment | HeaderSectionChat_DirectMessageChat_Fragment | HeaderSectionChat_ForbiddenChat_Fragment | HeaderSectionChat_GroupChat_Fragment;

type ChatMemberItemChat_DeletedChat_Fragment = { __typename?: 'DeletedChat', id: any };

type ChatMemberItemChat_DirectMessageChat_Fragment = { __typename?: 'DirectMessageChat', id: any };

type ChatMemberItemChat_ForbiddenChat_Fragment = { __typename?: 'ForbiddenChat', id: any };

type ChatMemberItemChat_GroupChat_Fragment = { __typename?: 'GroupChat', role: Role, id: any };

export type ChatMemberItemChatFragment = ChatMemberItemChat_DeletedChat_Fragment | ChatMemberItemChat_DirectMessageChat_Fragment | ChatMemberItemChat_ForbiddenChat_Fragment | ChatMemberItemChat_GroupChat_Fragment;

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

type MemberSectionChat_ForbiddenChat_Fragment = { __typename?: 'ForbiddenChat', id: any };

type MemberSectionChat_GroupChat_Fragment = { __typename?: 'GroupChat', role: Role, id: any };

export type MemberSectionChatFragment = MemberSectionChat_DeletedChat_Fragment | MemberSectionChat_DirectMessageChat_Fragment | MemberSectionChat_ForbiddenChat_Fragment | MemberSectionChat_GroupChat_Fragment;

export type GetMeForAccountMenuQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeForAccountMenuQuery = { __typename?: 'Query', me: { __typename?: 'Me', id: any, username: string, name?: string | null } };

export type GetChatForAnimatedTitleQueryVariables = Exact<{
  chatId: Scalars['HashId'];
}>;


export type GetChatForAnimatedTitleQuery = { __typename?: 'Query', chat: { __typename?: 'DeletedChat', id: any } | { __typename?: 'DirectMessageChat', id: any, receipent: { __typename?: 'ChatMember', user: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', id: any, name?: string | null, username: string } } | { __typename?: 'RemovedMember', user: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', id: any, name?: string | null, username: string } } } | { __typename?: 'ForbiddenChat', id: any } | { __typename?: 'GroupChat', name: string, description?: string | null, role: Role, id: any } };

export type FriendRequestComponentRequestFragment = { __typename?: 'FriendRequest', id: any, createdAt: any, createdById: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } };

export type NotificationMenuRequestFragment = { __typename?: 'FriendRequest', id: any, createdAt: any, createdById: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } };

export type RequestComponentFragment = { __typename?: 'FriendRequest', id: any, createdAt: any, createdById: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } };

export type GetFriendsForCreateGroupChatQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFriendsForCreateGroupChatQuery = { __typename?: 'Query', friends: { __typename?: 'PaginatedFriend', edges?: Array<{ __typename?: 'FriendEdge', node: { __typename?: 'Friend', id: any, name?: string | null, username: string } }> | null } };

export type GetFriendsForSelectSearchModalQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFriendsForSelectSearchModalQuery = { __typename?: 'Query', friends: { __typename?: 'PaginatedFriend', edges?: Array<{ __typename?: 'FriendEdge', node: { __typename?: 'Friend', id: any, username: string, name?: string | null } }> | null } };

export type GetChatForUpdateQueryVariables = Exact<{
  chatId: Scalars['HashId'];
  firstMembers?: InputMaybe<Scalars['Int']>;
}>;


export type GetChatForUpdateQuery = { __typename?: 'Query', chat: { __typename?: 'DeletedChat', id: any, isCreator: boolean, createdById: any } | { __typename?: 'DirectMessageChat', id: any, isCreator: boolean, createdById: any } | { __typename?: 'ForbiddenChat', id: any, isCreator: boolean, createdById: any } | { __typename?: 'GroupChat', name: string, description?: string | null, role: Role, id: any, isCreator: boolean, createdById: any, members: { __typename?: 'PaginatedMember', edges?: Array<{ __typename?: 'MemberEdge', node: { __typename?: 'ChatMember', role: Role, user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'RemovedMember', role: Role, user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } }> | null } } };

export type GetFriendsForUpdateGroupChatQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFriendsForUpdateGroupChatQuery = { __typename?: 'Query', friends: { __typename?: 'PaginatedFriend', edges?: Array<{ __typename?: 'FriendEdge', node: { __typename?: 'Friend', id: any, username: string } }> | null } };

type UpdateGroupUser_Friend_Fragment = { __typename?: 'Friend', id: any, username: string };

type UpdateGroupUser_Me_Fragment = { __typename?: 'Me', id: any, username: string };

type UpdateGroupUser_Stranger_Fragment = { __typename?: 'Stranger', id: any, username: string };

export type UpdateGroupUserFragment = UpdateGroupUser_Friend_Fragment | UpdateGroupUser_Me_Fragment | UpdateGroupUser_Stranger_Fragment;

export type GetUserSearchQueryVariables = Exact<{
  filter?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
}>;


export type GetUserSearchQuery = { __typename?: 'Query', users: { __typename?: 'PaginatedUser', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor: string }, edges?: Array<{ __typename?: 'UserEdge', cursor: string, node: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null, friendRequest?: { __typename?: 'FriendRequest', id: any, isCreator: boolean, createdById: any, recipientId: any, state: RequestState } | null } }> | null } };

type UserSearchModelUser_Friend_Fragment = { __typename?: 'Friend', id: any, username: string, name?: string | null };

type UserSearchModelUser_Me_Fragment = { __typename?: 'Me', id: any, username: string, name?: string | null };

type UserSearchModelUser_Stranger_Fragment = { __typename?: 'Stranger', id: any, username: string, name?: string | null, friendRequest?: { __typename?: 'FriendRequest', id: any, isCreator: boolean, createdById: any, recipientId: any, state: RequestState } | null };

export type UserSearchModelUserFragment = UserSearchModelUser_Friend_Fragment | UserSearchModelUser_Me_Fragment | UserSearchModelUser_Stranger_Fragment;

export type GetRequestsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRequestsQuery = { __typename?: 'Query', requests: Array<{ __typename?: 'FriendRequest', state: RequestState, createdAt: any, id: any, createdById: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } }> };

export type RequestsSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type RequestsSubscription = { __typename?: 'Subscription', requests: { __typename?: 'FriendRequest', state: RequestState, createdAt: any, id: any, createdById: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } } };

export type LiveRequestFragment = { __typename?: 'FriendRequest', state: RequestState, createdAt: any, id: any, createdById: any, isCreator: boolean, createdBy: { __typename?: 'Friend', id: any, username: string, name?: string | null } | { __typename?: 'Me', id: any, username: string, name?: string | null } | { __typename?: 'Stranger', id: any, username: string, name?: string | null } };

export type GetMeForUserProviderQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeForUserProviderQuery = { __typename?: 'Query', me: { __typename?: 'Me', id: any, username: string, name?: string | null } };

type ChatAvatar_DeletedChat_Fragment = { __typename?: 'DeletedChat', id: any };

type ChatAvatar_DirectMessageChat_Fragment = { __typename?: 'DirectMessageChat', id: any, receipent: { __typename?: 'ChatMember', user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'RemovedMember', user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } };

type ChatAvatar_ForbiddenChat_Fragment = { __typename?: 'ForbiddenChat', id: any };

type ChatAvatar_GroupChat_Fragment = { __typename?: 'GroupChat', name: string, id: any };

export type ChatAvatarFragment = ChatAvatar_DeletedChat_Fragment | ChatAvatar_DirectMessageChat_Fragment | ChatAvatar_ForbiddenChat_Fragment | ChatAvatar_GroupChat_Fragment;

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


export type AcknoledgeAlertMutation = { __typename?: 'Mutation', acknowledgeAlert: { __typename?: 'ChatDeletedAlert', id: any } | { __typename?: 'ChatMemberAccessGrantedAlert', id: any } | { __typename?: 'FriendDeletedAlert', id: any } };

export type UpdateGroupChatDescriptionMutationVariables = Exact<{
  chatId: Scalars['HashId'];
  description: Scalars['String'];
}>;


export type UpdateGroupChatDescriptionMutation = { __typename?: 'Mutation', updateGroupChatDescription: { __typename?: 'ChatDescriptionUpdate', descriptionBefore: string, descriptionAfter: string, eventId: number, event: { __typename?: 'CreatedEvent', chat: { __typename?: 'DeletedChat', id: any } | { __typename?: 'DirectMessageChat', id: any } | { __typename?: 'ForbiddenChat', id: any } | { __typename?: 'GroupChat', description?: string | null, id: any }, createdBy: { __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', id: any } } | { __typename?: 'DeletedEvent', chat: { __typename?: 'DeletedChat', id: any } | { __typename?: 'DirectMessageChat', id: any } | { __typename?: 'ForbiddenChat', id: any } | { __typename?: 'GroupChat', description?: string | null, id: any }, createdBy: { __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', id: any } } } };

type GroupChatUpdate_ChatDescriptionUpdate_Fragment = { __typename?: 'ChatDescriptionUpdate', eventId: number, event: { __typename?: 'CreatedEvent', createdBy: { __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', id: any } } | { __typename?: 'DeletedEvent', createdBy: { __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', id: any } } };

type GroupChatUpdate_ChatMembersAddedUpdate_Fragment = { __typename?: 'ChatMembersAddedUpdate', eventId: number, event: { __typename?: 'CreatedEvent', createdBy: { __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', id: any } } | { __typename?: 'DeletedEvent', createdBy: { __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', id: any } } };

type GroupChatUpdate_ChatMembersRemovedUpdate_Fragment = { __typename?: 'ChatMembersRemovedUpdate', eventId: number, event: { __typename?: 'CreatedEvent', createdBy: { __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', id: any } } | { __typename?: 'DeletedEvent', createdBy: { __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', id: any } } };

type GroupChatUpdate_ChatNameUpdate_Fragment = { __typename?: 'ChatNameUpdate', eventId: number, event: { __typename?: 'CreatedEvent', createdBy: { __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', id: any } } | { __typename?: 'DeletedEvent', createdBy: { __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', id: any } } };

export type GroupChatUpdateFragment = GroupChatUpdate_ChatDescriptionUpdate_Fragment | GroupChatUpdate_ChatMembersAddedUpdate_Fragment | GroupChatUpdate_ChatMembersRemovedUpdate_Fragment | GroupChatUpdate_ChatNameUpdate_Fragment;

export type AddMembersMutationVariables = Exact<{
  chatId: Scalars['HashId'];
  userIds: Array<Scalars['HashId']> | Scalars['HashId'];
}>;


export type AddMembersMutation = { __typename?: 'Mutation', addMembers: { __typename?: 'ChatMembersAddedUpdate', eventId: number, event: { __typename?: 'CreatedEvent', chat: { __typename?: 'DeletedChat', id: any } | { __typename?: 'DirectMessageChat', id: any } | { __typename?: 'ForbiddenChat', id: any } | { __typename?: 'GroupChat', id: any }, createdBy: { __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', id: any } } | { __typename?: 'DeletedEvent', chat: { __typename?: 'DeletedChat', id: any } | { __typename?: 'DirectMessageChat', id: any } | { __typename?: 'ForbiddenChat', id: any } | { __typename?: 'GroupChat', id: any }, createdBy: { __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', id: any } }, members: Array<{ __typename?: 'ChatMember', role: Role, user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'RemovedMember', role: Role, user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } }> } };

export type RemoveMembersMutationVariables = Exact<{
  chatId: Scalars['HashId'];
  userIds: Array<Scalars['HashId']> | Scalars['HashId'];
}>;


export type RemoveMembersMutation = { __typename?: 'Mutation', removeMembers: { __typename?: 'ChatMembersRemovedUpdate', eventId: number, event: { __typename?: 'CreatedEvent', chat: { __typename?: 'DeletedChat', id: any } | { __typename?: 'DirectMessageChat', id: any } | { __typename?: 'ForbiddenChat', id: any } | { __typename?: 'GroupChat', id: any }, createdBy: { __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', id: any } } | { __typename?: 'DeletedEvent', chat: { __typename?: 'DeletedChat', id: any } | { __typename?: 'DirectMessageChat', id: any } | { __typename?: 'ForbiddenChat', id: any } | { __typename?: 'GroupChat', id: any }, createdBy: { __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', id: any } }, members: Array<{ __typename?: 'ChatMember', role: Role, user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'RemovedMember', role: Role, user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } }> } };

export type ChangeMemberRolesMutationVariables = Exact<{
  chatId: Scalars['HashId'];
  userIds: Array<Scalars['HashId']> | Scalars['HashId'];
  role: Role;
}>;


export type ChangeMemberRolesMutation = { __typename?: 'Mutation', changeMemberRoles: { __typename?: 'ChatMembersRemovedUpdate', event: { __typename?: 'CreatedEvent', chat: { __typename?: 'DeletedChat', id: any } | { __typename?: 'DirectMessageChat', id: any } | { __typename?: 'ForbiddenChat', id: any } | { __typename?: 'GroupChat', id: any } } | { __typename?: 'DeletedEvent', chat: { __typename?: 'DeletedChat', id: any } | { __typename?: 'DirectMessageChat', id: any } | { __typename?: 'ForbiddenChat', id: any } | { __typename?: 'GroupChat', id: any } } } };

type UserAlerationGroupChatUpdate_ChatMembersAddedUpdate_Fragment = { __typename?: 'ChatMembersAddedUpdate', members: Array<{ __typename?: 'ChatMember', role: Role, user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'RemovedMember', role: Role, user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } }> };

type UserAlerationGroupChatUpdate_ChatMembersRemovedUpdate_Fragment = { __typename?: 'ChatMembersRemovedUpdate', members: Array<{ __typename?: 'ChatMember', role: Role, user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } } | { __typename?: 'RemovedMember', role: Role, user: { __typename?: 'Friend', id: any, username: string } | { __typename?: 'Me', id: any, username: string } | { __typename?: 'Stranger', id: any, username: string } }> };

export type UserAlerationGroupChatUpdateFragment = UserAlerationGroupChatUpdate_ChatMembersAddedUpdate_Fragment | UserAlerationGroupChatUpdate_ChatMembersRemovedUpdate_Fragment;

export type UpdateGroupChatNameMutationVariables = Exact<{
  chatId: Scalars['HashId'];
  name: Scalars['String'];
}>;


export type UpdateGroupChatNameMutation = { __typename?: 'Mutation', updateGroupChatName: { __typename?: 'ChatNameUpdate', eventId: number, nameBefore: string, nameAfter: string, event: { __typename?: 'CreatedEvent', id: any, createdBy: { __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', id: any }, chat: { __typename?: 'DeletedChat', id: any } | { __typename?: 'DirectMessageChat', id: any } | { __typename?: 'ForbiddenChat', id: any } | { __typename?: 'GroupChat', name: string, id: any } } | { __typename?: 'DeletedEvent', id: any, createdBy: { __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', id: any }, chat: { __typename?: 'DeletedChat', id: any } | { __typename?: 'DirectMessageChat', id: any } | { __typename?: 'ForbiddenChat', id: any } | { __typename?: 'GroupChat', name: string, id: any } } } };

export type CreateGroupChatMutationVariables = Exact<{
  data: CreateGroupChatInput;
}>;


export type CreateGroupChatMutation = { __typename?: 'Mutation', createGroupChat: { __typename?: 'GroupChat', id: any, name: string, createdBy: { __typename?: 'Friend', id: any, name?: string | null, username: string } | { __typename?: 'Me', id: any, name?: string | null, username: string } | { __typename?: 'Stranger', id: any, name?: string | null, username: string } } };

export type CreateDirectMessageChatMutationVariables = Exact<{
  receipentUserId: Scalars['HashId'];
}>;


export type CreateDirectMessageChatMutation = { __typename?: 'Mutation', createDirectMessageChat: { __typename?: 'DirectMessageChat', id: any, isCreator: boolean, createdAt: any, receipent: { __typename?: 'ChatMember', id: any, user: { __typename?: 'Friend', name?: string | null, username: string } | { __typename?: 'Me', name?: string | null, username: string } | { __typename?: 'Stranger', name?: string | null, username: string } } | { __typename?: 'RemovedMember', id: any, user: { __typename?: 'Friend', name?: string | null, username: string } | { __typename?: 'Me', name?: string | null, username: string } | { __typename?: 'Stranger', name?: string | null, username: string } } } };

export type DeleteChatMutationVariables = Exact<{
  chatId: Scalars['HashId'];
}>;


export type DeleteChatMutation = { __typename?: 'Mutation', deletedChat: { __typename?: 'DeletedChat', id: any, deletedAt: any } };

type UseDeleteChat_DeletedChat_Fragment = { __typename?: 'DeletedChat', id: any };

type UseDeleteChat_DirectMessageChat_Fragment = { __typename?: 'DirectMessageChat', id: any };

type UseDeleteChat_ForbiddenChat_Fragment = { __typename?: 'ForbiddenChat', id: any };

type UseDeleteChat_GroupChat_Fragment = { __typename?: 'GroupChat', id: any };

export type UseDeleteChatFragment = UseDeleteChat_DeletedChat_Fragment | UseDeleteChat_DirectMessageChat_Fragment | UseDeleteChat_ForbiddenChat_Fragment | UseDeleteChat_GroupChat_Fragment;

export type DeleteFriendMutationVariables = Exact<{
  userId: Scalars['HashId'];
}>;


export type DeleteFriendMutation = { __typename?: 'Mutation', deleteFriend: { __typename?: 'Stranger', id: any } };

export type FriendRequestStrangerFragment = { __typename?: 'Stranger', id: any, friendRequest?: { __typename?: 'FriendRequest', id: any } | null };

export type UseFriendFragment = { __typename?: 'Friend', id: any };

export type AcceptRequestMutationVariables = Exact<{
  requestId: Scalars['HashId'];
}>;


export type AcceptRequestMutation = { __typename?: 'Mutation', acceptRequest: { __typename?: 'FriendRequest', id: any, isCreator: boolean, createdById: any, recipientId: any, state: RequestState, createdBy: { __typename?: 'Friend', id: any } | { __typename?: 'Me', id: any } | { __typename?: 'Stranger', id: any } } };

export type DeclineRequestMutationVariables = Exact<{
  requestId: Scalars['HashId'];
}>;


export type DeclineRequestMutation = { __typename?: 'Mutation', declineRequest: { __typename?: 'FriendRequest', id: any, isCreator: boolean, createdById: any, recipientId: any, state: RequestState } };

export type CancelRequestMutationVariables = Exact<{
  requestId: Scalars['HashId'];
}>;


export type CancelRequestMutation = { __typename?: 'Mutation', cancelRequest: { __typename?: 'FriendRequest', id: any, isCreator: boolean, createdById: any, recipientId: any, state: RequestState } };

export type UseRequestFragment = { __typename?: 'FriendRequest', id: any, isCreator: boolean, createdById: any, recipientId: any, state: RequestState };

export type SendFriendRequestMutationVariables = Exact<{
  userId: Scalars['HashId'];
}>;


export type SendFriendRequestMutation = { __typename?: 'Mutation', sendFriendRequest: { __typename?: 'FriendRequest', id: any, isCreator: boolean, createdById: any, recipientId: any, state: RequestState } };

export type RequestInfoFragment = { __typename?: 'FriendRequest', id: any, isCreator: boolean, createdById: any, recipientId: any, state: RequestState };

export type UseStrangerFragment = { __typename?: 'Stranger', id: any, friendRequest?: { __typename?: 'FriendRequest', id: any, isCreator: boolean, createdById: any, recipientId: any, state: RequestState } | null };

export const ChatAvatarFragmentDoc = gql`
    fragment ChatAvatar on Chat {
  id
  ... on GroupChat {
    name
  }
  ... on DirectMessageChat {
    receipent {
      user {
        id
        username
      }
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
    receipent {
      user {
        ...ChatItemUser
      }
    }
  }
  ... on GroupChat {
    name
    members(first: $firstMembers, after: $afterMember) {
      totalCount
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
export const ChatDisplayChatFragmentDoc = gql`
    fragment ChatDisplayChat on Chat {
  id
  ...ChatItem
  createdBy {
    id
    username
  }
  ... on GroupChat {
    members(first: $firstMembers, after: $afterMember) {
      totalCount
      edges {
        node {
          id
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
    receipent {
      id
      user {
        id
        username
        name
      }
    }
  }
}
    ${ChatItemFragmentDoc}`;
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
export const MessageComponentFragmentDoc = gql`
    fragment MessageComponent on Message {
  event {
    id
    isCreator
    ...OutgoingEvent
    ...IncomingEvent
    ...MessageActions
  }
  content
}
    ${OutgoingEventFragmentDoc}
${IncomingEventFragmentDoc}
${MessageActionsFragmentDoc}`;
export const ChatNameUpdateComponentFragmentDoc = gql`
    fragment ChatNameUpdateComponent on ChatNameUpdate {
  event {
    createdBy {
      id
      username
    }
  }
  nameAfter
}
    `;
export const ChatDescriptionUpdateComponentFragmentDoc = gql`
    fragment ChatDescriptionUpdateComponent on ChatDescriptionUpdate {
  event {
    createdBy {
      id
      username
    }
  }
  descriptionAfter
}
    `;
export const ChatMembersAddedUpdateComponentFragmentDoc = gql`
    fragment ChatMembersAddedUpdateComponent on ChatMembersAddedUpdate {
  event {
    createdBy {
      id
      username
    }
  }
  members {
    user {
      id
      username
    }
  }
}
    `;
export const ChatMembersRemovedUpdateComponentFragmentDoc = gql`
    fragment ChatMembersRemovedUpdateComponent on ChatMembersRemovedUpdate {
  event {
    createdBy {
      id
      username
    }
  }
  members {
    user {
      id
      username
    }
  }
}
    `;
export const CreatedEventComponentFragmentDoc = gql`
    fragment CreatedEventComponent on CreatedEvent {
  isCreator
  payload {
    ... on Message {
      ...MessageComponent
    }
    ... on ChatNameUpdate {
      ...ChatNameUpdateComponent
    }
    ... on ChatDescriptionUpdate {
      ...ChatDescriptionUpdateComponent
    }
    ... on ChatMembersAddedUpdate {
      ...ChatMembersAddedUpdateComponent
    }
    ... on ChatMembersRemovedUpdate {
      ...ChatMembersRemovedUpdateComponent
    }
  }
}
    ${MessageComponentFragmentDoc}
${ChatNameUpdateComponentFragmentDoc}
${ChatDescriptionUpdateComponentFragmentDoc}
${ChatMembersAddedUpdateComponentFragmentDoc}
${ChatMembersRemovedUpdateComponentFragmentDoc}`;
export const EventContainerFragmentDoc = gql`
    fragment EventContainer on Event {
  id
  createdAt
  isCreator
}
    `;
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
export const ChatPanelEventFragmentDoc = gql`
    fragment ChatPanelEvent on Event {
  id
  createdAt
  createdBy {
    id
  }
  ...CreatedEventComponent
  ...EventContainer
  ...DeletedEventComponent
}
    ${CreatedEventComponentFragmentDoc}
${EventContainerFragmentDoc}
${DeletedEventComponentFragmentDoc}`;
export const ChatHeaderChatFragmentDoc = gql`
    fragment ChatHeaderChat on Chat {
  ... on DirectMessageChat {
    receipent {
      user {
        username
      }
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
export const MessageBubbleFragmentDoc = gql`
    fragment MessageBubble on Message {
  event {
    id
  }
  content
}
    `;
export const EventAvatarFragmentDoc = gql`
    fragment EventAvatar on Event {
  id
  createdBy {
    id
    username
  }
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
    receipent {
      user {
        username
      }
    }
  }
}
    ${ChatUpdateActionGroupChatFragmentDoc}`;
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
export const RequestComponentFragmentDoc = gql`
    fragment RequestComponent on Request {
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
export const NotificationMenuRequestFragmentDoc = gql`
    fragment NotificationMenuRequest on Request {
  ...RequestComponent
}
    ${RequestComponentFragmentDoc}`;
export const LiveRequestFragmentDoc = gql`
    fragment LiveRequest on Request {
  ...NotificationMenuRequest
  state
  createdAt
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
    fragment GroupChatUpdate on ChatUpdate {
  eventId
  event {
    createdBy {
      id
    }
  }
}
    `;
export const UserAlerationGroupChatUpdateFragmentDoc = gql`
    fragment UserAlerationGroupChatUpdate on ChatMemberAlteration {
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
    ...ChatDisplayChat
  }
}
    ${ChatDisplayChatFragmentDoc}`;

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
export const ChatsForChatDisplayDocument = gql`
    subscription ChatsForChatDisplay($firstMembers: Int = 2, $afterMember: String) {
  chats {
    ...ChatDisplayChat
  }
}
    ${ChatDisplayChatFragmentDoc}`;

/**
 * __useChatsForChatDisplaySubscription__
 *
 * To run a query within a React component, call `useChatsForChatDisplaySubscription` and pass it any options that fit your needs.
 * When your component renders, `useChatsForChatDisplaySubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatsForChatDisplaySubscription({
 *   variables: {
 *      firstMembers: // value for 'firstMembers'
 *      afterMember: // value for 'afterMember'
 *   },
 * });
 */
export function useChatsForChatDisplaySubscription(baseOptions?: Apollo.SubscriptionHookOptions<ChatsForChatDisplaySubscription, ChatsForChatDisplaySubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<ChatsForChatDisplaySubscription, ChatsForChatDisplaySubscriptionVariables>(ChatsForChatDisplayDocument, options);
      }
export type ChatsForChatDisplaySubscriptionHookResult = ReturnType<typeof useChatsForChatDisplaySubscription>;
export type ChatsForChatDisplaySubscriptionResult = Apollo.SubscriptionResult<ChatsForChatDisplaySubscription>;
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
    subscription Events {
  events {
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
    mutation DeleteMessage($eventId: HashId!) {
  deleteEvent(eventId: $eventId) {
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
 *      eventId: // value for 'eventId'
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
    event {
      id
      createdAt
      isCreator
      createdBy {
        id
        username
        name
      }
    }
    content
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
  }
}
    ${HeaderSectionChatFragmentDoc}
${MemberSectionChatFragmentDoc}`;

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
    totalCount
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
      receipent {
        user {
          id
          name
          username
        }
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
    edges {
      node {
        id
        name
        username
      }
    }
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
    edges {
      node {
        ...UserList
      }
    }
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
    edges {
      node {
        ...UpdateGroupUser
      }
    }
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
    query GetUserSearch($filter: String, $first: Int, $after: String) {
  users(filter: $filter, first: $first, after: $after) {
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
 *      filter: // value for 'filter'
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
export const GetRequestsDocument = gql`
    query GetRequests {
  requests {
    ...LiveRequest
  }
}
    ${LiveRequestFragmentDoc}`;

/**
 * __useGetRequestsQuery__
 *
 * To run a query within a React component, call `useGetRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRequestsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetRequestsQuery(baseOptions?: Apollo.QueryHookOptions<GetRequestsQuery, GetRequestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRequestsQuery, GetRequestsQueryVariables>(GetRequestsDocument, options);
      }
export function useGetRequestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRequestsQuery, GetRequestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRequestsQuery, GetRequestsQueryVariables>(GetRequestsDocument, options);
        }
export type GetRequestsQueryHookResult = ReturnType<typeof useGetRequestsQuery>;
export type GetRequestsLazyQueryHookResult = ReturnType<typeof useGetRequestsLazyQuery>;
export type GetRequestsQueryResult = Apollo.QueryResult<GetRequestsQuery, GetRequestsQueryVariables>;
export const RequestsDocument = gql`
    subscription Requests {
  requests {
    ...LiveRequest
  }
}
    ${LiveRequestFragmentDoc}`;

/**
 * __useRequestsSubscription__
 *
 * To run a query within a React component, call `useRequestsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useRequestsSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRequestsSubscription({
 *   variables: {
 *   },
 * });
 */
export function useRequestsSubscription(baseOptions?: Apollo.SubscriptionHookOptions<RequestsSubscription, RequestsSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<RequestsSubscription, RequestsSubscriptionVariables>(RequestsDocument, options);
      }
export type RequestsSubscriptionHookResult = ReturnType<typeof useRequestsSubscription>;
export type RequestsSubscriptionResult = Apollo.SubscriptionResult<RequestsSubscription>;
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
    event {
      chat {
        id
        ... on GroupChat {
          description
        }
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
    mutation AddMembers($chatId: HashId!, $userIds: [HashId!]!) {
  addMembers(chatId: $chatId, userIds: $userIds) {
    ...GroupChatUpdate
    ...UserAlerationGroupChatUpdate
    event {
      chat {
        id
      }
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
 *      userIds: // value for 'userIds'
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
    mutation RemoveMembers($chatId: HashId!, $userIds: [HashId!]!) {
  removeMembers(chatId: $chatId, userIds: $userIds) {
    ...GroupChatUpdate
    ...UserAlerationGroupChatUpdate
    event {
      chat {
        id
      }
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
 *      userIds: // value for 'userIds'
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
export const ChangeMemberRolesDocument = gql`
    mutation changeMemberRoles($chatId: HashId!, $userIds: [HashId!]!, $role: Role!) {
  changeMemberRoles(chatId: $chatId, userIds: $userIds, role: $role) {
    event {
      chat {
        id
      }
    }
  }
}
    `;
export type ChangeMemberRolesMutationFn = Apollo.MutationFunction<ChangeMemberRolesMutation, ChangeMemberRolesMutationVariables>;

/**
 * __useChangeMemberRolesMutation__
 *
 * To run a mutation, you first call `useChangeMemberRolesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeMemberRolesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeMemberRolesMutation, { data, loading, error }] = useChangeMemberRolesMutation({
 *   variables: {
 *      chatId: // value for 'chatId'
 *      userIds: // value for 'userIds'
 *      role: // value for 'role'
 *   },
 * });
 */
export function useChangeMemberRolesMutation(baseOptions?: Apollo.MutationHookOptions<ChangeMemberRolesMutation, ChangeMemberRolesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeMemberRolesMutation, ChangeMemberRolesMutationVariables>(ChangeMemberRolesDocument, options);
      }
export type ChangeMemberRolesMutationHookResult = ReturnType<typeof useChangeMemberRolesMutation>;
export type ChangeMemberRolesMutationResult = Apollo.MutationResult<ChangeMemberRolesMutation>;
export type ChangeMemberRolesMutationOptions = Apollo.BaseMutationOptions<ChangeMemberRolesMutation, ChangeMemberRolesMutationVariables>;
export const UpdateGroupChatNameDocument = gql`
    mutation UpdateGroupChatName($chatId: HashId!, $name: String!) {
  updateGroupChatName(chatId: $chatId, name: $name) {
    eventId
    event {
      id
      createdBy {
        id
      }
    }
    nameBefore
    nameAfter
    event {
      chat {
        id
        ... on GroupChat {
          name
        }
      }
    }
  }
}
    `;
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
  createGroupChat(createGroupChatData: $data) {
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
    mutation CreateDirectMessageChat($receipentUserId: HashId!) {
  createDirectMessageChat(receipentUserId: $receipentUserId) {
    id
    isCreator
    createdAt
    receipent {
      id
      user {
        name
        username
      }
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
 *      receipentUserId: // value for 'receipentUserId'
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
  deletedChat(chatId: $chatId) {
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
    mutation DeleteFriend($userId: HashId!) {
  deleteFriend(userId: $userId) {
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
 *      userId: // value for 'userId'
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
    mutation SendFriendRequest($userId: HashId!) {
  sendFriendRequest(userId: $userId) {
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
 *      userId: // value for 'userId'
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