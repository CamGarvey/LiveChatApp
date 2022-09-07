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
    description?: string | null; // String
    name?: string | null; // String
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
  RequestStatus: "ACCEPTED" | "CANCELLED" | "DECLINED" | "SEEN" | "SENT"
  Sort: "asc" | "desc"
  StrangerStatus: "NO_REQUEST" | "REQUEST_RECEIVED" | "REQUEST_SENT"
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
    createdAt: NexusGenScalars['Date']; // Date!
    createdById: NexusGenScalars['HashId']; // HashId!
    id: NexusGenScalars['HashId']; // HashId!
    recipientId: NexusGenScalars['HashId']; // HashId!
    status: NexusGenEnums['RequestStatus']; // RequestStatus!
  }
  GroupChat: { // root type
    adminIds: NexusGenScalars['HashId'][]; // [HashId!]!
    createdAt?: NexusGenScalars['Date'] | null; // Date
    createdById: NexusGenScalars['HashId']; // HashId!
    description?: string | null; // String
    id: NexusGenScalars['HashId']; // HashId!
    name: string; // String!
    updatedAt?: NexusGenScalars['Date'] | null; // Date
  }
  Me: { // root type
    createdAt: NexusGenScalars['Date']; // Date!
    id: NexusGenScalars['HashId']; // HashId!
    name?: string | null; // String
    updatedAt: NexusGenScalars['Date']; // Date!
    username: string; // String!
  }
  Message: { // root type
    chatId: NexusGenScalars['HashId']; // HashId!
    content: string; // String!
    createdAt: NexusGenScalars['Date']; // Date!
    createdById: NexusGenScalars['HashId']; // HashId!
    id: NexusGenScalars['HashId']; // HashId!
    updatedAt: NexusGenScalars['Date']; // Date!
  }
  MessageResultConnection: { // root type
    edges?: Array<NexusGenRootTypes['MessageResultEdge'] | null> | null; // [MessageResultEdge]
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
  }
  MessageResultEdge: { // root type
    cursor: string; // String!
    node?: NexusGenRootTypes['MessageResult'] | null; // MessageResult
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
  Event: NexusGenRootTypes['DeletedMessage'] | NexusGenRootTypes['Message'];
  KnownUser: NexusGenRootTypes['Friend'] | NexusGenRootTypes['Me'];
  Notification: NexusGenRootTypes['FriendRequest'];
  Request: NexusGenRootTypes['FriendRequest'];
  User: NexusGenRootTypes['Friend'] | NexusGenRootTypes['Me'] | NexusGenRootTypes['Stranger'];
}

export interface NexusGenUnions {
  MessageResult: NexusGenRootTypes['DeletedMessage'] | NexusGenRootTypes['Message'];
}

export type NexusGenRootTypes = NexusGenInterfaces & NexusGenObjects & NexusGenUnions

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
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
    messages: NexusGenRootTypes['MessageResultConnection']; // MessageResultConnection!
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
    createdAt: NexusGenScalars['Date']; // Date!
    createdBy: NexusGenRootTypes['User']; // User!
    createdById: NexusGenScalars['HashId']; // HashId!
    id: NexusGenScalars['HashId']; // HashId!
    isCreator: boolean; // Boolean!
    recipient: NexusGenRootTypes['User'] | null; // User
    recipientId: NexusGenScalars['HashId']; // HashId!
    status: NexusGenEnums['RequestStatus']; // RequestStatus!
  }
  GroupChat: { // field return type
    adminIds: NexusGenScalars['HashId'][]; // [HashId!]!
    admins: NexusGenRootTypes['User'][]; // [User!]!
    createdAt: NexusGenScalars['Date'] | null; // Date
    createdBy: NexusGenRootTypes['User']; // User!
    createdById: NexusGenScalars['HashId']; // HashId!
    description: string | null; // String
    id: NexusGenScalars['HashId']; // HashId!
    isAdmin: boolean; // Boolean!
    isCreator: boolean; // Boolean!
    memberCount: number; // Int!
    members: NexusGenRootTypes['User'][]; // [User!]!
    messages: NexusGenRootTypes['MessageResultConnection']; // MessageResultConnection!
    name: string; // String!
    updatedAt: NexusGenScalars['Date'] | null; // Date
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
  Message: { // field return type
    chat: NexusGenRootTypes['Chat']; // Chat!
    chatId: NexusGenScalars['HashId']; // HashId!
    content: string; // String!
    createdAt: NexusGenScalars['Date']; // Date!
    createdBy: NexusGenRootTypes['User']; // User!
    createdById: NexusGenScalars['HashId']; // HashId!
    id: NexusGenScalars['HashId']; // HashId!
    isCreator: boolean; // Boolean!
    likedBy: NexusGenRootTypes['User'][]; // [User!]!
    updatedAt: NexusGenScalars['Date']; // Date!
  }
  MessageResultConnection: { // field return type
    edges: Array<NexusGenRootTypes['MessageResultEdge'] | null> | null; // [MessageResultEdge]
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
  }
  MessageResultEdge: { // field return type
    cursor: string; // String!
    node: NexusGenRootTypes['MessageResult'] | null; // MessageResult
  }
  Mutation: { // field return type
    acceptFriendRequest: NexusGenRootTypes['FriendRequest'] | null; // FriendRequest
    addAdminsToGroupChat: NexusGenRootTypes['GroupChat'] | null; // GroupChat
    addMembersToGroupChat: NexusGenRootTypes['GroupChat'] | null; // GroupChat
    cancelFriendRequest: NexusGenRootTypes['FriendRequest'] | null; // FriendRequest
    createDirectMessageChat: NexusGenRootTypes['DirectMessageChat'] | null; // DirectMessageChat
    createGroupChat: NexusGenRootTypes['GroupChat'] | null; // GroupChat
    createMessage: NexusGenRootTypes['Message'] | null; // Message
    declineFriendRequest: NexusGenRootTypes['FriendRequest'] | null; // FriendRequest
    deleteChat: NexusGenRootTypes['DeletedChat'] | null; // DeletedChat
    deleteFriend: NexusGenRootTypes['Stranger'] | null; // Stranger
    deleteMessage: NexusGenRootTypes['DeletedMessage'] | null; // DeletedMessage
    removeAdminsFromGroupChat: NexusGenRootTypes['GroupChat'] | null; // GroupChat
    removeMembersFromGroupChat: NexusGenRootTypes['GroupChat'] | null; // GroupChat
    sendFriendRequest: NexusGenRootTypes['FriendRequest'] | null; // FriendRequest
    updateGroupChat: NexusGenRootTypes['GroupChat'] | null; // GroupChat
    updateMessage: NexusGenRootTypes['Message'] | null; // Message
    updateUser: NexusGenRootTypes['Me'] | null; // Me
  }
  PageInfo: { // field return type
    endCursor: string | null; // String
    hasNextPage: boolean; // Boolean!
    hasPreviousPage: boolean; // Boolean!
    startCursor: string | null; // String
  }
  Query: { // field return type
    chat: NexusGenRootTypes['Chat'] | null; // Chat
    chats: NexusGenRootTypes['Chat'][]; // [Chat!]!
    friendRequests: NexusGenRootTypes['FriendRequest'][]; // [FriendRequest!]!
    friends: NexusGenRootTypes['Friend'][]; // [Friend!]!
    me: NexusGenRootTypes['Me'] | null; // Me
    message: NexusGenRootTypes['MessageResult'] | null; // MessageResult
    messages: NexusGenRootTypes['MessageResultConnection']; // MessageResultConnection!
    notifications: NexusGenRootTypes['Notification'][]; // [Notification!]!
    user: NexusGenRootTypes['User'] | null; // User
    users: NexusGenRootTypes['UserConnection']; // UserConnection!
  }
  Stranger: { // field return type
    createdAt: NexusGenScalars['Date']; // Date!
    friendRequest: NexusGenRootTypes['FriendRequest'] | null; // FriendRequest
    id: NexusGenScalars['HashId']; // HashId!
    mutualFriends: NexusGenRootTypes['FriendConnection']; // FriendConnection!
    name: string | null; // String
    status: NexusGenEnums['StrangerStatus']; // StrangerStatus!
    updatedAt: NexusGenScalars['Date']; // Date!
    username: string; // String!
  }
  Subscription: { // field return type
    chatCreated: NexusGenRootTypes['Chat'] | null; // Chat
    chatDeleted: NexusGenRootTypes['DeletedChat'] | null; // DeletedChat
    chatUpdated: NexusGenRootTypes['Chat'] | null; // Chat
    chats: NexusGenRootTypes['Chat'] | null; // Chat
    friendRequests: NexusGenRootTypes['FriendRequest'] | null; // FriendRequest
    friends: NexusGenRootTypes['User'] | null; // User
    messageCreated: NexusGenRootTypes['Message'] | null; // Message
    messageDeleted: NexusGenRootTypes['DeletedMessage'] | null; // DeletedMessage
    messageUpdated: NexusGenRootTypes['MessageResult'] | null; // MessageResult
    messages: NexusGenRootTypes['MessageResult'] | null; // MessageResult
    notifications: NexusGenRootTypes['Notification'] | null; // Notification
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
  Event: { // field return type
    chat: NexusGenRootTypes['Chat']; // Chat!
    chatId: NexusGenScalars['HashId']; // HashId!
    createdAt: NexusGenScalars['Date']; // Date!
    createdBy: NexusGenRootTypes['User']; // User!
    createdById: NexusGenScalars['HashId']; // HashId!
    id: NexusGenScalars['HashId']; // HashId!
    isCreator: boolean; // Boolean!
    updatedAt: NexusGenScalars['Date']; // Date!
  }
  KnownUser: { // field return type
    chats: NexusGenRootTypes['Chat'][]; // [Chat!]!
    friends: NexusGenRootTypes['FriendConnection']; // FriendConnection!
  }
  Notification: { // field return type
    createdAt: NexusGenScalars['Date']; // Date!
    createdBy: NexusGenRootTypes['User']; // User!
    createdById: NexusGenScalars['HashId']; // HashId!
    id: NexusGenScalars['HashId']; // HashId!
    isCreator: boolean; // Boolean!
  }
  Request: { // field return type
    createdAt: NexusGenScalars['Date']; // Date!
    createdBy: NexusGenRootTypes['User']; // User!
    createdById: NexusGenScalars['HashId']; // HashId!
    id: NexusGenScalars['HashId']; // HashId!
    isCreator: boolean; // Boolean!
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
    messages: 'MessageResultConnection'
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
    createdAt: 'Date'
    createdBy: 'User'
    createdById: 'HashId'
    id: 'HashId'
    isCreator: 'Boolean'
    recipient: 'User'
    recipientId: 'HashId'
    status: 'RequestStatus'
  }
  GroupChat: { // field return type name
    adminIds: 'HashId'
    admins: 'User'
    createdAt: 'Date'
    createdBy: 'User'
    createdById: 'HashId'
    description: 'String'
    id: 'HashId'
    isAdmin: 'Boolean'
    isCreator: 'Boolean'
    memberCount: 'Int'
    members: 'User'
    messages: 'MessageResultConnection'
    name: 'String'
    updatedAt: 'Date'
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
  Message: { // field return type name
    chat: 'Chat'
    chatId: 'HashId'
    content: 'String'
    createdAt: 'Date'
    createdBy: 'User'
    createdById: 'HashId'
    id: 'HashId'
    isCreator: 'Boolean'
    likedBy: 'User'
    updatedAt: 'Date'
  }
  MessageResultConnection: { // field return type name
    edges: 'MessageResultEdge'
    pageInfo: 'PageInfo'
  }
  MessageResultEdge: { // field return type name
    cursor: 'String'
    node: 'MessageResult'
  }
  Mutation: { // field return type name
    acceptFriendRequest: 'FriendRequest'
    addAdminsToGroupChat: 'GroupChat'
    addMembersToGroupChat: 'GroupChat'
    cancelFriendRequest: 'FriendRequest'
    createDirectMessageChat: 'DirectMessageChat'
    createGroupChat: 'GroupChat'
    createMessage: 'Message'
    declineFriendRequest: 'FriendRequest'
    deleteChat: 'DeletedChat'
    deleteFriend: 'Stranger'
    deleteMessage: 'DeletedMessage'
    removeAdminsFromGroupChat: 'GroupChat'
    removeMembersFromGroupChat: 'GroupChat'
    sendFriendRequest: 'FriendRequest'
    updateGroupChat: 'GroupChat'
    updateMessage: 'Message'
    updateUser: 'Me'
  }
  PageInfo: { // field return type name
    endCursor: 'String'
    hasNextPage: 'Boolean'
    hasPreviousPage: 'Boolean'
    startCursor: 'String'
  }
  Query: { // field return type name
    chat: 'Chat'
    chats: 'Chat'
    friendRequests: 'FriendRequest'
    friends: 'Friend'
    me: 'Me'
    message: 'MessageResult'
    messages: 'MessageResultConnection'
    notifications: 'Notification'
    user: 'User'
    users: 'UserConnection'
  }
  Stranger: { // field return type name
    createdAt: 'Date'
    friendRequest: 'FriendRequest'
    id: 'HashId'
    mutualFriends: 'FriendConnection'
    name: 'String'
    status: 'StrangerStatus'
    updatedAt: 'Date'
    username: 'String'
  }
  Subscription: { // field return type name
    chatCreated: 'Chat'
    chatDeleted: 'DeletedChat'
    chatUpdated: 'Chat'
    chats: 'Chat'
    friendRequests: 'FriendRequest'
    friends: 'User'
    messageCreated: 'Message'
    messageDeleted: 'DeletedMessage'
    messageUpdated: 'MessageResult'
    messages: 'MessageResult'
    notifications: 'Notification'
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
  Event: { // field return type name
    chat: 'Chat'
    chatId: 'HashId'
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
  Notification: { // field return type name
    createdAt: 'Date'
    createdBy: 'User'
    createdById: 'HashId'
    id: 'HashId'
    isCreator: 'Boolean'
  }
  Request: { // field return type name
    createdAt: 'Date'
    createdBy: 'User'
    createdById: 'HashId'
    id: 'HashId'
    isCreator: 'Boolean'
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
    addAdminsToGroupChat: { // args
      chatId: NexusGenScalars['HashId']; // HashId!
      members: NexusGenScalars['HashId'][]; // [HashId!]!
    }
    addMembersToGroupChat: { // args
      chatId: NexusGenScalars['HashId']; // HashId!
      members: NexusGenScalars['HashId'][]; // [HashId!]!
    }
    cancelFriendRequest: { // args
      friendRequestId: NexusGenScalars['HashId']; // HashId!
    }
    createDirectMessageChat: { // args
      friendId: NexusGenScalars['HashId']; // HashId!
    }
    createGroupChat: { // args
      data: NexusGenInputs['CreateGroupChatInput']; // CreateGroupChatInput!
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
    removeAdminsFromGroupChat: { // args
      chatId: NexusGenScalars['HashId']; // HashId!
      members: NexusGenScalars['HashId'][]; // [HashId!]!
    }
    removeMembersFromGroupChat: { // args
      chatId: NexusGenScalars['HashId']; // HashId!
      members: NexusGenScalars['HashId'][]; // [HashId!]!
    }
    sendFriendRequest: { // args
      friendId: NexusGenScalars['HashId']; // HashId!
    }
    updateGroupChat: { // args
      chatId: NexusGenScalars['HashId']; // HashId!
      data: NexusGenInputs['UpdateGroupChatInput']; // UpdateGroupChatInput!
    }
    updateMessage: { // args
      content: string; // String!
      messageId: NexusGenScalars['HashId']; // HashId!
    }
    updateUser: { // args
      name: string; // String!
    }
  }
  Query: {
    chat: { // args
      chatId: NexusGenScalars['HashId']; // HashId!
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
      chatId?: NexusGenScalars['HashId'] | null; // HashId
    }
    messageDeleted: { // args
      chatId?: NexusGenScalars['HashId'] | null; // HashId
    }
    messageUpdated: { // args
      chatId?: NexusGenScalars['HashId'] | null; // HashId
    }
    messages: { // args
      chatId?: NexusGenScalars['HashId'] | null; // HashId
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
  MessageResult: "DeletedMessage" | "Message"
  Chat: "DeletedChat" | "DirectMessageChat" | "GroupChat"
  Event: "DeletedMessage" | "Message"
  KnownUser: "Friend" | "Me"
  Notification: "FriendRequest"
  Request: "FriendRequest"
  User: "Friend" | "Me" | "Stranger"
}

export interface NexusGenTypeInterfaces {
  DeletedChat: "Chat"
  DeletedMessage: "Event"
  DirectMessageChat: "Chat"
  Friend: "KnownUser" | "User"
  FriendRequest: "Notification" | "Request"
  GroupChat: "Chat"
  Me: "KnownUser" | "User"
  Message: "Event"
  Stranger: "User"
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = keyof NexusGenInterfaces;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = keyof NexusGenUnions;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = "Chat" | "Event" | "KnownUser" | "MessageResult" | "Notification" | "Request" | "User";

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