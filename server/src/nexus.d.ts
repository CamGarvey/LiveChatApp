/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { IContext } from "./graphql/context.interface"
import type { core, connectionPluginCore } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * Date custom scalar type
     */
    date<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "Date";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * Date custom scalar type
     */
    date<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "Date";
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
  Sort: "asc" | "desc"
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  Date: any
}

export interface NexusGenObjects {
  Chat: { // root type
    createdAt: NexusGenScalars['Date']; // Date!
    description?: string | null; // String
    id: string; // ID!
    isDM: boolean; // Boolean!
    name: string; // String!
    updatedAt: NexusGenScalars['Date']; // Date!
  }
  ChatUpdate: { // root type
    chatId: string; // ID!
    createdAt: NexusGenScalars['Date']; // Date!
    createdBy?: NexusGenRootTypes['User'] | null; // User
    createdById: string; // ID!
    description?: string | null; // String
    id: string; // ID!
    memberIdsAdded?: string[] | null; // [ID!]
    memberIdsRemoved?: string[] | null; // [ID!]
    name?: string | null; // String
  }
  DeletedChat: { // root type
    createdBy: NexusGenRootTypes['User']; // User!
    id: string; // ID!
    members: Array<NexusGenRootTypes['User'] | null>; // [User]!
    name: string; // String!
  }
  Message: { // root type
    chatId: string; // ID!
    content: string; // String!
    createdAt: NexusGenScalars['Date']; // Date!
    createdById: string; // String!
    id: string; // ID!
    updatedAt: NexusGenScalars['Date']; // Date!
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
  Subscription: {};
  User: { // root type
    createdAt: NexusGenScalars['Date']; // Date!
    email: string; // String!
    id: string; // ID!
    name?: string | null; // String
    updatedAt: NexusGenScalars['Date']; // Date!
    username: string; // String!
  }
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
}

export interface NexusGenUnions {
  ChatPayload: NexusGenRootTypes['Chat'] | NexusGenRootTypes['ChatUpdate'] | NexusGenRootTypes['DeletedChat'];
}

export type NexusGenRootTypes = NexusGenObjects & NexusGenUnions

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  Chat: { // field return type
    createdAt: NexusGenScalars['Date']; // Date!
    createdBy: NexusGenRootTypes['User']; // User!
    description: string | null; // String
    id: string; // ID!
    isDM: boolean; // Boolean!
    memberCount: number; // Int!
    members: NexusGenRootTypes['User'][]; // [User!]!
    messages: NexusGenRootTypes['MessageConnection']; // MessageConnection!
    name: string; // String!
    updatedAt: NexusGenScalars['Date']; // Date!
    updates: NexusGenRootTypes['ChatUpdate'][]; // [ChatUpdate!]!
  }
  ChatUpdate: { // field return type
    chat: NexusGenRootTypes['Chat']; // Chat!
    chatId: string; // ID!
    createdAt: NexusGenScalars['Date']; // Date!
    createdBy: NexusGenRootTypes['User'] | null; // User
    createdById: string; // ID!
    description: string | null; // String
    id: string; // ID!
    memberIdsAdded: string[] | null; // [ID!]
    memberIdsRemoved: string[] | null; // [ID!]
    membersAdded: NexusGenRootTypes['User'][] | null; // [User!]
    membersRemoved: NexusGenRootTypes['User'][] | null; // [User!]
    name: string | null; // String
  }
  DeletedChat: { // field return type
    createdBy: NexusGenRootTypes['User']; // User!
    id: string; // ID!
    members: Array<NexusGenRootTypes['User'] | null>; // [User]!
    name: string; // String!
  }
  Message: { // field return type
    chat: NexusGenRootTypes['Chat']; // Chat!
    chatId: string; // ID!
    content: string; // String!
    createdAt: NexusGenScalars['Date']; // Date!
    createdBy: NexusGenRootTypes['User']; // User!
    createdById: string; // String!
    id: string; // ID!
    likedBy: NexusGenRootTypes['User'][]; // [User!]!
    updatedAt: NexusGenScalars['Date']; // Date!
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
    acceptFriendRequest: NexusGenRootTypes['User'] | null; // User
    addMembersToChat: NexusGenRootTypes['Chat'] | null; // Chat
    cancelFriendRequest: NexusGenRootTypes['User'] | null; // User
    createChat: NexusGenRootTypes['Chat'] | null; // Chat
    createMessage: NexusGenRootTypes['Message'] | null; // Message
    declineFriendRequest: NexusGenRootTypes['User'] | null; // User
    deleteChat: NexusGenRootTypes['DeletedChat'] | null; // DeletedChat
    deleteFriend: NexusGenRootTypes['User'] | null; // User
    deleteMessage: NexusGenRootTypes['Message'] | null; // Message
    editMessage: NexusGenRootTypes['Message'] | null; // Message
    removeMembersFromChat: NexusGenRootTypes['Chat'] | null; // Chat
    sendFriendRequest: NexusGenRootTypes['User'] | null; // User
    updateChat: NexusGenRootTypes['Chat'] | null; // Chat
    updateMe: NexusGenRootTypes['User'] | null; // User
  }
  PageInfo: { // field return type
    endCursor: string | null; // String
    hasNextPage: boolean; // Boolean!
    hasPreviousPage: boolean; // Boolean!
    startCursor: string | null; // String
  }
  Query: { // field return type
    chat: NexusGenRootTypes['Chat'] | null; // Chat
    chatMessages: NexusGenRootTypes['MessageConnection']; // MessageConnection!
    chats: NexusGenRootTypes['Chat'][]; // [Chat!]!
    friends: NexusGenRootTypes['User'][]; // [User!]!
    me: NexusGenRootTypes['User'] | null; // User
    user: NexusGenRootTypes['User'] | null; // User
    users: NexusGenRootTypes['UserConnection']; // UserConnection!
  }
  Subscription: { // field return type
    chatCreated: NexusGenRootTypes['Chat'] | null; // Chat
    chatDeleted: NexusGenRootTypes['DeletedChat'] | null; // DeletedChat
    chatUpdated: NexusGenRootTypes['ChatUpdate'] | null; // ChatUpdate
    chats: NexusGenRootTypes['ChatPayload'] | null; // ChatPayload
    messageCreated: NexusGenRootTypes['Message'] | null; // Message
    messageDeleted: NexusGenRootTypes['Message'] | null; // Message
    messageUpdated: NexusGenRootTypes['Message'] | null; // Message
    messages: NexusGenRootTypes['Message'] | null; // Message
    user: NexusGenRootTypes['User'] | null; // User
    userChats: NexusGenRootTypes['User'] | null; // User
    userFriendCreated: NexusGenRootTypes['User'] | null; // User
    userFriendDeleted: NexusGenRootTypes['User'] | null; // User
    userFriendRequestCreated: NexusGenRootTypes['User'] | null; // User
    userFriendRequestDeleted: NexusGenRootTypes['User'] | null; // User
    userFriendRequests: NexusGenRootTypes['User'] | null; // User
    userFriends: NexusGenRootTypes['User'] | null; // User
  }
  User: { // field return type
    chats: NexusGenRootTypes['Chat'][]; // [Chat!]!
    createdAt: NexusGenScalars['Date']; // Date!
    email: string; // String!
    friendStatus: NexusGenEnums['FriendStatus']; // FriendStatus!
    friends: NexusGenRootTypes['UserConnection']; // UserConnection!
    id: string; // ID!
    name: string | null; // String
    receivedFriendRequests: NexusGenRootTypes['User'][]; // [User!]!
    sentFriendRequests: NexusGenRootTypes['User'][]; // [User!]!
    updatedAt: NexusGenScalars['Date']; // Date!
    username: string; // String!
  }
  UserConnection: { // field return type
    edges: Array<NexusGenRootTypes['UserEdge'] | null> | null; // [UserEdge]
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
  }
  UserEdge: { // field return type
    cursor: string; // String!
    node: NexusGenRootTypes['User'] | null; // User
  }
}

export interface NexusGenFieldTypeNames {
  Chat: { // field return type name
    createdAt: 'Date'
    createdBy: 'User'
    description: 'String'
    id: 'ID'
    isDM: 'Boolean'
    memberCount: 'Int'
    members: 'User'
    messages: 'MessageConnection'
    name: 'String'
    updatedAt: 'Date'
    updates: 'ChatUpdate'
  }
  ChatUpdate: { // field return type name
    chat: 'Chat'
    chatId: 'ID'
    createdAt: 'Date'
    createdBy: 'User'
    createdById: 'ID'
    description: 'String'
    id: 'ID'
    memberIdsAdded: 'ID'
    memberIdsRemoved: 'ID'
    membersAdded: 'User'
    membersRemoved: 'User'
    name: 'String'
  }
  DeletedChat: { // field return type name
    createdBy: 'User'
    id: 'ID'
    members: 'User'
    name: 'String'
  }
  Message: { // field return type name
    chat: 'Chat'
    chatId: 'ID'
    content: 'String'
    createdAt: 'Date'
    createdBy: 'User'
    createdById: 'String'
    id: 'ID'
    likedBy: 'User'
    updatedAt: 'Date'
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
    acceptFriendRequest: 'User'
    addMembersToChat: 'Chat'
    cancelFriendRequest: 'User'
    createChat: 'Chat'
    createMessage: 'Message'
    declineFriendRequest: 'User'
    deleteChat: 'DeletedChat'
    deleteFriend: 'User'
    deleteMessage: 'Message'
    editMessage: 'Message'
    removeMembersFromChat: 'Chat'
    sendFriendRequest: 'User'
    updateChat: 'Chat'
    updateMe: 'User'
  }
  PageInfo: { // field return type name
    endCursor: 'String'
    hasNextPage: 'Boolean'
    hasPreviousPage: 'Boolean'
    startCursor: 'String'
  }
  Query: { // field return type name
    chat: 'Chat'
    chatMessages: 'MessageConnection'
    chats: 'Chat'
    friends: 'User'
    me: 'User'
    user: 'User'
    users: 'UserConnection'
  }
  Subscription: { // field return type name
    chatCreated: 'Chat'
    chatDeleted: 'DeletedChat'
    chatUpdated: 'ChatUpdate'
    chats: 'ChatPayload'
    messageCreated: 'Message'
    messageDeleted: 'Message'
    messageUpdated: 'Message'
    messages: 'Message'
    user: 'User'
    userChats: 'User'
    userFriendCreated: 'User'
    userFriendDeleted: 'User'
    userFriendRequestCreated: 'User'
    userFriendRequestDeleted: 'User'
    userFriendRequests: 'User'
    userFriends: 'User'
  }
  User: { // field return type name
    chats: 'Chat'
    createdAt: 'Date'
    email: 'String'
    friendStatus: 'FriendStatus'
    friends: 'UserConnection'
    id: 'ID'
    name: 'String'
    receivedFriendRequests: 'User'
    sentFriendRequests: 'User'
    updatedAt: 'Date'
    username: 'String'
  }
  UserConnection: { // field return type name
    edges: 'UserEdge'
    pageInfo: 'PageInfo'
  }
  UserEdge: { // field return type name
    cursor: 'String'
    node: 'User'
  }
}

export interface NexusGenArgTypes {
  Chat: {
    messages: { // args
      after?: string | null; // String
      before?: string | null; // String
      first?: number | null; // Int
      last?: number | null; // Int
    }
  }
  Mutation: {
    acceptFriendRequest: { // args
      friendId: string; // String!
    }
    addMembersToChat: { // args
      chatId: string; // String!
      memberIds: string[]; // [String!]!
    }
    cancelFriendRequest: { // args
      friendId: string; // String!
    }
    createChat: { // args
      description?: string | null; // String
      isPrivate: boolean | null; // Boolean
      memberIds?: string[] | null; // [String!]
      name: string; // String!
    }
    createMessage: { // args
      chatId: string; // String!
      content: string; // String!
    }
    declineFriendRequest: { // args
      friendId: string; // String!
    }
    deleteChat: { // args
      chatId: string; // String!
    }
    deleteFriend: { // args
      friendId: string; // String!
    }
    deleteMessage: { // args
      messageId: string; // String!
    }
    editMessage: { // args
      content: string; // String!
      messageId: string; // String!
    }
    removeMembersFromChat: { // args
      chatId: string; // String!
      membersIds: string[]; // [String!]!
    }
    sendFriendRequest: { // args
      friendId: string; // String!
    }
    updateChat: { // args
      addMembersId?: string[] | null; // [String!]
      chatId: string; // String!
      description?: string | null; // String
      isPrivate?: boolean | null; // Boolean
      name?: string | null; // String
      removeMembersId?: string[] | null; // [String!]
    }
    updateMe: { // args
      email: string; // String!
      username: string; // String!
    }
  }
  Query: {
    chat: { // args
      chatId: string; // String!
    }
    chatMessages: { // args
      after?: string | null; // String
      before?: string | null; // String
      chatId: string; // String!
      first?: number | null; // Int
      last?: number | null; // Int
    }
    user: { // args
      id: string; // String!
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
  Subscription: {
    messageCreated: { // args
      chatId: string; // String!
    }
    messageDeleted: { // args
      chatId: string; // String!
    }
    messageUpdated: { // args
      chatId: string; // String!
    }
    messages: { // args
      chatId: string; // String!
    }
  }
  User: {
    friends: { // args
      after?: string | null; // String
      before?: string | null; // String
      first?: number | null; // Int
      last?: number | null; // Int
    }
  }
}

export interface NexusGenAbstractTypeMembers {
  ChatPayload: "Chat" | "ChatUpdate" | "DeletedChat"
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = keyof NexusGenUnions;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    resolveType: false
    __typename: false
    isTypeOf: false
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
    
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}