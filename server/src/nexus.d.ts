/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { IContext } from "./graphql/context.interface"
import type { core, connectionPluginCore } from "nexus"
import type { FieldAuthorizeResolver } from "nexus/dist/plugins/fieldAuthorizePlugin"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * Date custom scalar type
     */
    date<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "Date";
    hashId<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "HashId";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * Date custom scalar type
     */
    date<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "Date";
    hashId<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "HashId";
    /**
     * Adds a Relay-style connection to the type, with numerous options for configuration
     *
     * @see https://nexusjs.org/docs/plugins/connection
     */
    connectionField<FieldName extends string>(
      fieldName: FieldName,
      config: connectionPluginCore.ConnectionFieldConfig<TypeName, FieldName>
    ): void
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  CreateGroupChatInput: { // input type
    description?: string | null; // String
    memberIds?: NexusGenScalars['HashId'][] | null; // [HashId!]
    name: string; // String!
  }
  UpdateGroupChatInput: { // input type
    addMemberIds?: NexusGenScalars['HashId'][] | null; // [HashId!]
    chatId: NexusGenScalars['HashId']; // HashId!
    description?: string | null; // String
    name?: string | null; // String
    removeMemberIds?: NexusGenScalars['HashId'][] | null; // [HashId!]
  }
  UserOrderBy: { // input type
    createdAt?: NexusGenEnums['Sort'] | null; // Sort
    email?: NexusGenEnums['Sort'] | null; // Sort
    id?: NexusGenEnums['Sort'] | null; // Sort
    name?: NexusGenEnums['Sort'] | null; // Sort
    updatedAt?: NexusGenEnums['Sort'] | null; // Sort
    username?: NexusGenEnums['Sort'] | null; // Sort
  }
}

export interface NexusGenEnums {
  FriendStatus: "FRIEND" | "NOT_FRIEND" | "REQUEST_RECEIVED" | "REQUEST_SENT"
  RequestStatus: "ACCEPTED" | "DECLINED" | "SEEN" | "SENT"
  Sort: "asc" | "desc"
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  Date: any
  HashId: any
}

export interface NexusGenObjects {
  ChatInvite: { // root type
    chatId: NexusGenScalars['HashId']; // HashId!
    createdById: NexusGenScalars['HashId']; // HashId!
    id: NexusGenScalars['HashId']; // HashId!
    recipient?: NexusGenRootTypes['User'] | null; // User
    recipientId: NexusGenScalars['HashId']; // HashId!
    status: NexusGenEnums['RequestStatus']; // RequestStatus!
  }
  DeletedChat: { // root type
    createdAt?: NexusGenScalars['Date'] | null; // Date
    createdById: NexusGenScalars['HashId']; // HashId!
    deletedAt: NexusGenScalars['Date']; // Date!
    id: NexusGenScalars['HashId']; // HashId!
    updatedAt?: NexusGenScalars['Date'] | null; // Date
  }
  DeletedMessage: { // root type
    chatId: NexusGenScalars['HashId']; // HashId!
    createdAt: NexusGenScalars['Date']; // Date!
    createdById: NexusGenScalars['HashId']; // HashId!
    deletedAt?: NexusGenScalars['Date'] | null; // Date
    id: NexusGenScalars['HashId']; // HashId!
    updatedAt: NexusGenScalars['Date']; // Date!
  }
  DirectMessageChat: { // root type
    createdAt?: NexusGenScalars['Date'] | null; // Date
    createdById: NexusGenScalars['HashId']; // HashId!
    id: NexusGenScalars['HashId']; // HashId!
    updatedAt?: NexusGenScalars['Date'] | null; // Date
  }
  Friend: { // root type
    createdAt: NexusGenScalars['Date']; // Date!
    id: NexusGenScalars['HashId']; // HashId!
    name?: string | null; // String
    updatedAt: NexusGenScalars['Date']; // Date!
    username: string; // String!
  }
  FriendConnection: { // root type
    edges?: Array<NexusGenRootTypes['FriendEdge'] | null> | null; // [FriendEdge]
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
  }
  FriendEdge: { // root type
    cursor: string; // String!
    node?: NexusGenRootTypes['Friend'] | null; // Friend
  }
  FriendRequest: { // root type
    createdById: NexusGenScalars['HashId']; // HashId!
    id: NexusGenScalars['HashId']; // HashId!
    recipient?: NexusGenRootTypes['User'] | null; // User
    recipientId: NexusGenScalars['HashId']; // HashId!
    status: NexusGenEnums['RequestStatus']; // RequestStatus!
  }
  GroupChat: { // root type
    createdAt?: NexusGenScalars['Date'] | null; // Date
    createdById: NexusGenScalars['HashId']; // HashId!
    description?: string | null; // String
    id: NexusGenScalars['HashId']; // HashId!
    name: string; // String!
    updatedAt?: NexusGenScalars['Date'] | null; // Date
  }
  InstantMessage: { // root type
    chatId: NexusGenScalars['HashId']; // HashId!
    content: string; // String!
    createdAt: NexusGenScalars['Date']; // Date!
    createdById: NexusGenScalars['HashId']; // HashId!
    deletedAt?: NexusGenScalars['Date'] | null; // Date
    id: NexusGenScalars['HashId']; // HashId!
    updatedAt: NexusGenScalars['Date']; // Date!
  }
  InstantMessageConnection: { // root type
    edges?: Array<NexusGenRootTypes['InstantMessageEdge'] | null> | null; // [InstantMessageEdge]
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
  }
  InstantMessageEdge: { // root type
    cursor: string; // String!
    node?: NexusGenRootTypes['InstantMessage'] | null; // InstantMessage
  }
  Me: { // root type
    createdAt: NexusGenScalars['Date']; // Date!
    id: NexusGenScalars['HashId']; // HashId!
    name?: string | null; // String
    updatedAt: NexusGenScalars['Date']; // Date!
    username: string; // String!
  }
  MessageConnection: { // root type
    edges?: Array<NexusGenRootTypes['MessageEdge'] | null> | null; // [MessageEdge]
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
  }
  MessageEdge: { // root type
    cursor: string; // String!
    node?: NexusGenRootTypes['Message'] | null; // Message
  }
  Mutation: {};
  PageInfo: { // root type
    endCursor?: string | null; // String
    hasNextPage: boolean; // Boolean!
    hasPreviousPage: boolean; // Boolean!
    startCursor?: string | null; // String
  }
  Query: {};
  Stranger: { // root type
    createdAt: NexusGenScalars['Date']; // Date!
    id: NexusGenScalars['HashId']; // HashId!
    name?: string | null; // String
    updatedAt: NexusGenScalars['Date']; // Date!
    username: string; // String!
  }
  Subscription: {};
  UserConnection: { // root type
    edges?: Array<NexusGenRootTypes['UserEdge'] | null> | null; // [UserEdge]
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
  }
  UserEdge: { // root type
    cursor: string; // String!
    node?: NexusGenRootTypes['User'] | null; // User
  }
}

export interface NexusGenInterfaces {
  Chat: NexusGenRootTypes['DeletedChat'] | NexusGenRootTypes['DirectMessageChat'] | NexusGenRootTypes['GroupChat'];
  KnownUser: NexusGenRootTypes['Friend'] | NexusGenRootTypes['Me'];
  Message: NexusGenRootTypes['DeletedMessage'] | NexusGenRootTypes['InstantMessage'];
  Request: NexusGenRootTypes['ChatInvite'] | NexusGenRootTypes['FriendRequest'];
  User: NexusGenRootTypes['Friend'] | NexusGenRootTypes['Me'] | NexusGenRootTypes['Stranger'];
}

export interface NexusGenUnions {
  Notification: NexusGenRootTypes['ChatInvite'] | NexusGenRootTypes['FriendRequest'];
}

export type NexusGenRootTypes = NexusGenInterfaces & NexusGenObjects & NexusGenUnions

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  ChatInvite: { // field return type
    chat: NexusGenRootTypes['Chat'] | null; // Chat
    chatId: NexusGenScalars['HashId']; // HashId!
    createdBy: NexusGenRootTypes['User']; // User!
    createdById: NexusGenScalars['HashId']; // HashId!
    id: NexusGenScalars['HashId']; // HashId!
    recipient: NexusGenRootTypes['User'] | null; // User
    recipientId: NexusGenScalars['HashId']; // HashId!
    status: NexusGenEnums['RequestStatus']; // RequestStatus!
  }
  DeletedChat: { // field return type
    createdAt: NexusGenScalars['Date'] | null; // Date
    createdBy: NexusGenRootTypes['User']; // User!
    createdById: NexusGenScalars['HashId']; // HashId!
    deletedAt: NexusGenScalars['Date']; // Date!
    id: NexusGenScalars['HashId']; // HashId!
    isCreator: boolean; // Boolean!
    updatedAt: NexusGenScalars['Date'] | null; // Date
  }
  DeletedMessage: { // field return type
    chat: NexusGenRootTypes['Chat']; // Chat!
    chatId: NexusGenScalars['HashId']; // HashId!
    createdAt: NexusGenScalars['Date']; // Date!
    createdBy: NexusGenRootTypes['User']; // User!
    createdById: NexusGenScalars['HashId']; // HashId!
    deletedAt: NexusGenScalars['Date'] | null; // Date
    id: NexusGenScalars['HashId']; // HashId!
    isCreator: boolean; // Boolean!
    updatedAt: NexusGenScalars['Date']; // Date!
  }
  DirectMessageChat: { // field return type
    createdAt: NexusGenScalars['Date'] | null; // Date
    createdBy: NexusGenRootTypes['User']; // User!
    createdById: NexusGenScalars['HashId']; // HashId!
    friend: NexusGenRootTypes['Friend']; // Friend!
    id: NexusGenScalars['HashId']; // HashId!
    isCreator: boolean; // Boolean!
    messages: NexusGenRootTypes['MessageConnection']; // MessageConnection!
    updatedAt: NexusGenScalars['Date'] | null; // Date
  }
  Friend: { // field return type
    chats: NexusGenRootTypes['Chat'][]; // [Chat!]!
    createdAt: NexusGenScalars['Date']; // Date!
    friends: NexusGenRootTypes['FriendConnection']; // FriendConnection!
    id: NexusGenScalars['HashId']; // HashId!
    name: string | null; // String
    updatedAt: NexusGenScalars['Date']; // Date!
    username: string; // String!
  }
  FriendConnection: { // field return type
    edges: Array<NexusGenRootTypes['FriendEdge'] | null> | null; // [FriendEdge]
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
  }
  FriendEdge: { // field return type
    cursor: string; // String!
    node: NexusGenRootTypes['Friend'] | null; // Friend
  }
  FriendRequest: { // field return type
    createdBy: NexusGenRootTypes['User']; // User!
    createdById: NexusGenScalars['HashId']; // HashId!
    id: NexusGenScalars['HashId']; // HashId!
    recipient: NexusGenRootTypes['User'] | null; // User
    recipientId: NexusGenScalars['HashId']; // HashId!
    status: NexusGenEnums['RequestStatus']; // RequestStatus!
  }
  GroupChat: { // field return type
    createdAt: NexusGenScalars['Date'] | null; // Date
    createdBy: NexusGenRootTypes['User']; // User!
    createdById: NexusGenScalars['HashId']; // HashId!
    description: string | null; // String
    id: NexusGenScalars['HashId']; // HashId!
    isCreator: boolean; // Boolean!
    memberCount: number; // Int!
    members: NexusGenRootTypes['User'][]; // [User!]!
    messages: NexusGenRootTypes['MessageConnection']; // MessageConnection!
    name: string; // String!
    updatedAt: NexusGenScalars['Date'] | null; // Date
  }
  InstantMessage: { // field return type
    chat: NexusGenRootTypes['Chat']; // Chat!
    chatId: NexusGenScalars['HashId']; // HashId!
    content: string; // String!
    createdAt: NexusGenScalars['Date']; // Date!
    createdBy: NexusGenRootTypes['User']; // User!
    createdById: NexusGenScalars['HashId']; // HashId!
    deletedAt: NexusGenScalars['Date'] | null; // Date
    id: NexusGenScalars['HashId']; // HashId!
    isCreator: boolean; // Boolean!
    likedBy: NexusGenRootTypes['User'][]; // [User!]!
    updatedAt: NexusGenScalars['Date']; // Date!
  }
  InstantMessageConnection: { // field return type
    edges: Array<NexusGenRootTypes['InstantMessageEdge'] | null> | null; // [InstantMessageEdge]
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
  }
  InstantMessageEdge: { // field return type
    cursor: string; // String!
    node: NexusGenRootTypes['InstantMessage'] | null; // InstantMessage
  }
  Me: { // field return type
    chats: NexusGenRootTypes['Chat'][]; // [Chat!]!
    createdAt: NexusGenScalars['Date']; // Date!
    friendRequests: NexusGenRootTypes['FriendRequest'][]; // [FriendRequest!]!
    friends: NexusGenRootTypes['FriendConnection']; // FriendConnection!
    id: NexusGenScalars['HashId']; // HashId!
    name: string | null; // String
    updatedAt: NexusGenScalars['Date']; // Date!
    username: string; // String!
  }
  MessageConnection: { // field return type
    edges: Array<NexusGenRootTypes['MessageEdge'] | null> | null; // [MessageEdge]
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
  }
  MessageEdge: { // field return type
    cursor: string; // String!
    node: NexusGenRootTypes['Message'] | null; // Message
  }
  Mutation: { // field return type
    acceptFriendRequest: NexusGenRootTypes['FriendRequest'] | null; // FriendRequest
    cancelFriendRequest: NexusGenRootTypes['FriendRequest'] | null; // FriendRequest
    createDirectMessageChat: NexusGenRootTypes['DirectMessageChat'] | null; // DirectMessageChat
    createGroupChat: NexusGenRootTypes['GroupChat'] | null; // GroupChat
    createMessage: NexusGenRootTypes['InstantMessage'] | null; // InstantMessage
    declineFriendRequest: NexusGenRootTypes['FriendRequest'] | null; // FriendRequest
    deleteChat: NexusGenRootTypes['DeletedChat'] | null; // DeletedChat
    deleteFriend: NexusGenRootTypes['Stranger'] | null; // Stranger
    deleteMessage: NexusGenRootTypes['InstantMessage'] | null; // InstantMessage
    sendFriendRequest: NexusGenRootTypes['FriendRequest'] | null; // FriendRequest
    updateGroupChat: NexusGenRootTypes['GroupChat'] | null; // GroupChat
    updateMe: NexusGenRootTypes['Me'] | null; // Me
    updateMessage: NexusGenRootTypes['InstantMessage'] | null; // InstantMessage
  }
  PageInfo: { // field return type
    endCursor: string | null; // String
    hasNextPage: boolean; // Boolean!
    hasPreviousPage: boolean; // Boolean!
    startCursor: string | null; // String
  }
  Query: { // field return type
    chat: NexusGenRootTypes['Chat'] | null; // Chat
    chatInvites: NexusGenRootTypes['ChatInvite'][]; // [ChatInvite!]!
    chats: NexusGenRootTypes['Chat'][]; // [Chat!]!
    friendRequests: NexusGenRootTypes['FriendRequest'][]; // [FriendRequest!]!
    friends: NexusGenRootTypes['Friend'][]; // [Friend!]!
    me: NexusGenRootTypes['Me'] | null; // Me
    message: NexusGenRootTypes['InstantMessage'] | null; // InstantMessage
    messages: NexusGenRootTypes['InstantMessageConnection']; // InstantMessageConnection!
    notifications: NexusGenRootTypes['Notification'][]; // [Notification!]!
    user: NexusGenRootTypes['User'] | null; // User
    users: NexusGenRootTypes['UserConnection']; // UserConnection!
  }
  Stranger: { // field return type
    createdAt: NexusGenScalars['Date']; // Date!
    friendStatus: NexusGenEnums['FriendStatus']; // FriendStatus!
    id: NexusGenScalars['HashId']; // HashId!
    mutualFriends: NexusGenRootTypes['FriendConnection']; // FriendConnection!
    name: string | null; // String
    updatedAt: NexusGenScalars['Date']; // Date!
    username: string; // String!
  }
  Subscription: { // field return type
    chatCreated: NexusGenRootTypes['Chat'] | null; // Chat
    chatDeleted: NexusGenRootTypes['DeletedChat'] | null; // DeletedChat
    chatUpdated: NexusGenRootTypes['Chat'] | null; // Chat
    chats: NexusGenRootTypes['Chat'] | null; // Chat
    messageCreated: NexusGenRootTypes['InstantMessage'] | null; // InstantMessage
    messageDeleted: NexusGenRootTypes['DeletedMessage'] | null; // DeletedMessage
    messageUpdated: NexusGenRootTypes['Message'] | null; // Message
    messages: NexusGenRootTypes['Message'] | null; // Message
    user: NexusGenRootTypes['Me'] | null; // Me
  }
  UserConnection: { // field return type
    edges: Array<NexusGenRootTypes['UserEdge'] | null> | null; // [UserEdge]
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
  }
  UserEdge: { // field return type
    cursor: string; // String!
    node: NexusGenRootTypes['User'] | null; // User
  }
  Chat: { // field return type
    createdAt: NexusGenScalars['Date'] | null; // Date
    createdBy: NexusGenRootTypes['User']; // User!
    createdById: NexusGenScalars['HashId']; // HashId!
    id: NexusGenScalars['HashId']; // HashId!
    isCreator: boolean; // Boolean!
    updatedAt: NexusGenScalars['Date'] | null; // Date
  }
  KnownUser: { // field return type
    chats: NexusGenRootTypes['Chat'][]; // [Chat!]!
    friends: NexusGenRootTypes['FriendConnection']; // FriendConnection!
  }
  Message: { // field return type
    chat: NexusGenRootTypes['Chat']; // Chat!
    chatId: NexusGenScalars['HashId']; // HashId!
    createdAt: NexusGenScalars['Date']; // Date!
    createdBy: NexusGenRootTypes['User']; // User!
    createdById: NexusGenScalars['HashId']; // HashId!
    deletedAt: NexusGenScalars['Date'] | null; // Date
    id: NexusGenScalars['HashId']; // HashId!
    isCreator: boolean; // Boolean!
    updatedAt: NexusGenScalars['Date']; // Date!
  }
  Request: { // field return type
    createdBy: NexusGenRootTypes['User']; // User!
    createdById: NexusGenScalars['HashId']; // HashId!
    id: NexusGenScalars['HashId']; // HashId!
    recipient: NexusGenRootTypes['User'] | null; // User
    recipientId: NexusGenScalars['HashId']; // HashId!
    status: NexusGenEnums['RequestStatus']; // RequestStatus!
  }
  User: { // field return type
    createdAt: NexusGenScalars['Date']; // Date!
    id: NexusGenScalars['HashId']; // HashId!
    name: string | null; // String
    updatedAt: NexusGenScalars['Date']; // Date!
    username: string; // String!
  }
}

export interface NexusGenFieldTypeNames {
  ChatInvite: { // field return type name
    chat: 'Chat'
    chatId: 'HashId'
    createdBy: 'User'
    createdById: 'HashId'
    id: 'HashId'
    recipient: 'User'
    recipientId: 'HashId'
    status: 'RequestStatus'
  }
  DeletedChat: { // field return type name
    createdAt: 'Date'
    createdBy: 'User'
    createdById: 'HashId'
    deletedAt: 'Date'
    id: 'HashId'
    isCreator: 'Boolean'
    updatedAt: 'Date'
  }
  DeletedMessage: { // field return type name
    chat: 'Chat'
    chatId: 'HashId'
    createdAt: 'Date'
    createdBy: 'User'
    createdById: 'HashId'
    deletedAt: 'Date'
    id: 'HashId'
    isCreator: 'Boolean'
    updatedAt: 'Date'
  }
  DirectMessageChat: { // field return type name
    createdAt: 'Date'
    createdBy: 'User'
    createdById: 'HashId'
    friend: 'Friend'
    id: 'HashId'
    isCreator: 'Boolean'
    messages: 'MessageConnection'
    updatedAt: 'Date'
  }
  Friend: { // field return type name
    chats: 'Chat'
    createdAt: 'Date'
    friends: 'FriendConnection'
    id: 'HashId'
    name: 'String'
    updatedAt: 'Date'
    username: 'String'
  }
  FriendConnection: { // field return type name
    edges: 'FriendEdge'
    pageInfo: 'PageInfo'
  }
  FriendEdge: { // field return type name
    cursor: 'String'
    node: 'Friend'
  }
  FriendRequest: { // field return type name
    createdBy: 'User'
    createdById: 'HashId'
    id: 'HashId'
    recipient: 'User'
    recipientId: 'HashId'
    status: 'RequestStatus'
  }
  GroupChat: { // field return type name
    createdAt: 'Date'
    createdBy: 'User'
    createdById: 'HashId'
    description: 'String'
    id: 'HashId'
    isCreator: 'Boolean'
    memberCount: 'Int'
    members: 'User'
    messages: 'MessageConnection'
    name: 'String'
    updatedAt: 'Date'
  }
  InstantMessage: { // field return type name
    chat: 'Chat'
    chatId: 'HashId'
    content: 'String'
    createdAt: 'Date'
    createdBy: 'User'
    createdById: 'HashId'
    deletedAt: 'Date'
    id: 'HashId'
    isCreator: 'Boolean'
    likedBy: 'User'
    updatedAt: 'Date'
  }
  InstantMessageConnection: { // field return type name
    edges: 'InstantMessageEdge'
    pageInfo: 'PageInfo'
  }
  InstantMessageEdge: { // field return type name
    cursor: 'String'
    node: 'InstantMessage'
  }
  Me: { // field return type name
    chats: 'Chat'
    createdAt: 'Date'
    friendRequests: 'FriendRequest'
    friends: 'FriendConnection'
    id: 'HashId'
    name: 'String'
    updatedAt: 'Date'
    username: 'String'
  }
  MessageConnection: { // field return type name
    edges: 'MessageEdge'
    pageInfo: 'PageInfo'
  }
  MessageEdge: { // field return type name
    cursor: 'String'
    node: 'Message'
  }
  Mutation: { // field return type name
    acceptFriendRequest: 'FriendRequest'
    cancelFriendRequest: 'FriendRequest'
    createDirectMessageChat: 'DirectMessageChat'
    createGroupChat: 'GroupChat'
    createMessage: 'InstantMessage'
    declineFriendRequest: 'FriendRequest'
    deleteChat: 'DeletedChat'
    deleteFriend: 'Stranger'
    deleteMessage: 'InstantMessage'
    sendFriendRequest: 'FriendRequest'
    updateGroupChat: 'GroupChat'
    updateMe: 'Me'
    updateMessage: 'InstantMessage'
  }
  PageInfo: { // field return type name
    endCursor: 'String'
    hasNextPage: 'Boolean'
    hasPreviousPage: 'Boolean'
    startCursor: 'String'
  }
  Query: { // field return type name
    chat: 'Chat'
    chatInvites: 'ChatInvite'
    chats: 'Chat'
    friendRequests: 'FriendRequest'
    friends: 'Friend'
    me: 'Me'
    message: 'InstantMessage'
    messages: 'InstantMessageConnection'
    notifications: 'Notification'
    user: 'User'
    users: 'UserConnection'
  }
  Stranger: { // field return type name
    createdAt: 'Date'
    friendStatus: 'FriendStatus'
    id: 'HashId'
    mutualFriends: 'FriendConnection'
    name: 'String'
    updatedAt: 'Date'
    username: 'String'
  }
  Subscription: { // field return type name
    chatCreated: 'Chat'
    chatDeleted: 'DeletedChat'
    chatUpdated: 'Chat'
    chats: 'Chat'
    messageCreated: 'InstantMessage'
    messageDeleted: 'DeletedMessage'
    messageUpdated: 'Message'
    messages: 'Message'
    user: 'Me'
  }
  UserConnection: { // field return type name
    edges: 'UserEdge'
    pageInfo: 'PageInfo'
  }
  UserEdge: { // field return type name
    cursor: 'String'
    node: 'User'
  }
  Chat: { // field return type name
    createdAt: 'Date'
    createdBy: 'User'
    createdById: 'HashId'
    id: 'HashId'
    isCreator: 'Boolean'
    updatedAt: 'Date'
  }
  KnownUser: { // field return type name
    chats: 'Chat'
    friends: 'FriendConnection'
  }
  Message: { // field return type name
    chat: 'Chat'
    chatId: 'HashId'
    createdAt: 'Date'
    createdBy: 'User'
    createdById: 'HashId'
    deletedAt: 'Date'
    id: 'HashId'
    isCreator: 'Boolean'
    updatedAt: 'Date'
  }
  Request: { // field return type name
    createdBy: 'User'
    createdById: 'HashId'
    id: 'HashId'
    recipient: 'User'
    recipientId: 'HashId'
    status: 'RequestStatus'
  }
  User: { // field return type name
    createdAt: 'Date'
    id: 'HashId'
    name: 'String'
    updatedAt: 'Date'
    username: 'String'
  }
}

export interface NexusGenArgTypes {
  DirectMessageChat: {
    messages: { // args
      after?: string | null; // String
      before?: string | null; // String
      first?: number | null; // Int
      last?: number | null; // Int
    }
  }
  Friend: {
    friends: { // args
      after?: string | null; // String
      before?: string | null; // String
      first?: number | null; // Int
      last?: number | null; // Int
    }
  }
  GroupChat: {
    messages: { // args
      after?: string | null; // String
      before?: string | null; // String
      first?: number | null; // Int
      last?: number | null; // Int
    }
  }
  Me: {
    friendRequests: { // args
      status?: NexusGenEnums['RequestStatus'] | null; // RequestStatus
    }
    friends: { // args
      after?: string | null; // String
      before?: string | null; // String
      first?: number | null; // Int
      last?: number | null; // Int
    }
  }
  Mutation: {
    acceptFriendRequest: { // args
      friendRequestId: NexusGenScalars['HashId']; // HashId!
    }
    cancelFriendRequest: { // args
      friendRequestId: NexusGenScalars['HashId']; // HashId!
    }
    createDirectMessageChat: { // args
      friendId: NexusGenScalars['HashId']; // HashId!
    }
    createGroupChat: { // args
      data?: NexusGenInputs['CreateGroupChatInput'] | null; // CreateGroupChatInput
    }
    createMessage: { // args
      chatId: NexusGenScalars['HashId']; // HashId!
      content: string; // String!
    }
    declineFriendRequest: { // args
      friendRequestId: NexusGenScalars['HashId']; // HashId!
    }
    deleteChat: { // args
      chatId: NexusGenScalars['HashId']; // HashId!
    }
    deleteFriend: { // args
      friendId: NexusGenScalars['HashId']; // HashId!
    }
    deleteMessage: { // args
      messageId: NexusGenScalars['HashId']; // HashId!
    }
    sendFriendRequest: { // args
      friendId: NexusGenScalars['HashId']; // HashId!
    }
    updateGroupChat: { // args
      data?: NexusGenInputs['UpdateGroupChatInput'] | null; // UpdateGroupChatInput
    }
    updateMe: { // args
      email: string; // String!
      username: string; // String!
    }
    updateMessage: { // args
      content: string; // String!
      messageId: NexusGenScalars['HashId']; // HashId!
    }
  }
  Query: {
    chat: { // args
      chatId: NexusGenScalars['HashId']; // HashId!
    }
    chatInvites: { // args
      status?: NexusGenEnums['RequestStatus'] | null; // RequestStatus
    }
    friendRequests: { // args
      status?: NexusGenEnums['RequestStatus'] | null; // RequestStatus
    }
    message: { // args
      messageId: NexusGenScalars['HashId']; // HashId!
    }
    messages: { // args
      after?: string | null; // String
      before?: string | null; // String
      chatId: NexusGenScalars['HashId']; // HashId!
      first?: number | null; // Int
      last?: number | null; // Int
    }
    user: { // args
      userId: NexusGenScalars['HashId']; // HashId!
    }
    users: { // args
      after?: string | null; // String
      before?: string | null; // String
      first?: number | null; // Int
      last?: number | null; // Int
      orderBy?: NexusGenInputs['UserOrderBy'] | null; // UserOrderBy
      usernameFilter?: string | null; // String
    }
  }
  Stranger: {
    mutualFriends: { // args
      after?: string | null; // String
      before?: string | null; // String
      first?: number | null; // Int
      last?: number | null; // Int
    }
  }
  Subscription: {
    messageCreated: { // args
      chatId: NexusGenScalars['HashId']; // HashId!
    }
    messageDeleted: { // args
      chatId: NexusGenScalars['HashId']; // HashId!
    }
    messageUpdated: { // args
      chatId: NexusGenScalars['HashId']; // HashId!
    }
    messages: { // args
      chatId: NexusGenScalars['HashId']; // HashId!
    }
  }
  KnownUser: {
    friends: { // args
      after?: string | null; // String
      before?: string | null; // String
      first?: number | null; // Int
      last?: number | null; // Int
    }
  }
}

export interface NexusGenAbstractTypeMembers {
  Notification: "ChatInvite" | "FriendRequest"
  Chat: "DeletedChat" | "DirectMessageChat" | "GroupChat"
  KnownUser: "Friend" | "Me"
  Message: "DeletedMessage" | "InstantMessage"
  Request: "ChatInvite" | "FriendRequest"
  User: "Friend" | "Me" | "Stranger"
}

export interface NexusGenTypeInterfaces {
  ChatInvite: "Request"
  DeletedChat: "Chat"
  DeletedMessage: "Message"
  DirectMessageChat: "Chat"
  Friend: "KnownUser" | "User"
  FriendRequest: "Request"
  GroupChat: "Chat"
  InstantMessage: "Message"
  Me: "KnownUser" | "User"
  Stranger: "User"
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = keyof NexusGenInterfaces;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = keyof NexusGenUnions;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = "Chat" | "KnownUser" | "Message" | "Notification" | "Request" | "User";

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: IContext;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
    
    /**
     * Authorization for an individual field. Returning "true"
     * or "Promise<true>" means the field can be accessed.
     * Returning "false" or "Promise<false>" will respond
     * with a "Not Authorized" error for the field.
     * Returning or throwing an error will also prevent the
     * resolver from executing.
     */
    authorize?: FieldAuthorizeResolver<TypeName, FieldName>
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}