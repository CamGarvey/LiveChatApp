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
     * Adds a Relay-style connection to the type, with numerous options for configuration
     *
     * @see https://nexusjs.org/docs/plugins/connection
     */
    connectionField<FieldName extends string>(
      fieldName: FieldName,
      config: connectionPluginCore.ConnectionFieldConfig<TypeName, FieldName>
    ): void
    /**
     * Date custom scalar type
     */
    date<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "Date";
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
  Channel: { // root type
    createdAt: NexusGenScalars['Date']; // Date!
    description?: string | null; // String
    id: string; // String!
    isDM: boolean; // Boolean!
    name: string; // String!
    updatedAt: NexusGenScalars['Date']; // Date!
  }
  Message: { // root type
    content: string; // String!
    createdAt: NexusGenScalars['Date']; // Date!
    createdById: string; // String!
    id: string; // String!
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
  NewMessagePayload: { // root type
    channelId: string; // String!
    message: NexusGenRootTypes['Message']; // Message!
  }
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
    id: string; // String!
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
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  Channel: { // field return type
    createdAt: NexusGenScalars['Date']; // Date!
    createdBy: NexusGenRootTypes['User']; // User!
    description: string | null; // String
    id: string; // String!
    isDM: boolean; // Boolean!
    memberCount: number; // Int!
    members: NexusGenRootTypes['User'][]; // [User!]!
    messages: NexusGenRootTypes['MessageConnection']; // MessageConnection!
    name: string; // String!
    updatedAt: NexusGenScalars['Date']; // Date!
  }
  Message: { // field return type
    channel: NexusGenRootTypes['Channel']; // Channel!
    content: string; // String!
    createdAt: NexusGenScalars['Date']; // Date!
    createdBy: NexusGenRootTypes['User']; // User!
    createdById: string; // String!
    id: string; // String!
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
    addMembersToChannel: NexusGenRootTypes['Channel'] | null; // Channel
    cancelFriendRequest: NexusGenRootTypes['User'] | null; // User
    createChannel: NexusGenRootTypes['Channel'] | null; // Channel
    createDM: NexusGenRootTypes['Channel'] | null; // Channel
    createMessage: NexusGenRootTypes['Message'] | null; // Message
    declineFriendRequest: NexusGenRootTypes['User'] | null; // User
    deleteChannel: boolean | null; // Boolean
    deleteFriend: NexusGenRootTypes['User'] | null; // User
    deleteMessage: NexusGenRootTypes['Message'] | null; // Message
    editMessage: NexusGenRootTypes['Message'] | null; // Message
    removeMembersFromChannel: NexusGenRootTypes['Channel'] | null; // Channel
    sendFriendRequest: NexusGenRootTypes['User'] | null; // User
    updateChannel: NexusGenRootTypes['Channel'] | null; // Channel
    updateUser: NexusGenRootTypes['User'] | null; // User
  }
  NewMessagePayload: { // field return type
    channelId: string; // String!
    message: NexusGenRootTypes['Message']; // Message!
  }
  PageInfo: { // field return type
    endCursor: string | null; // String
    hasNextPage: boolean; // Boolean!
    hasPreviousPage: boolean; // Boolean!
    startCursor: string | null; // String
  }
  Query: { // field return type
    channel: NexusGenRootTypes['Channel'] | null; // Channel
    channelMessages: NexusGenRootTypes['MessageConnection']; // MessageConnection!
    channels: NexusGenRootTypes['Channel'][]; // [Channel!]!
    friends: NexusGenRootTypes['User'][]; // [User!]!
    me: NexusGenRootTypes['User'] | null; // User
    user: NexusGenRootTypes['User'] | null; // User
    users: NexusGenRootTypes['UserConnection']; // UserConnection!
  }
  Subscription: { // field return type
    newFriend: NexusGenRootTypes['User'] | null; // User
    newFriendRequest: NexusGenRootTypes['User'] | null; // User
    newMessage: NexusGenRootTypes['NewMessagePayload'] | null; // NewMessagePayload
  }
  User: { // field return type
    channels: NexusGenRootTypes['Channel'][]; // [Channel!]!
    createdAt: NexusGenScalars['Date']; // Date!
    email: string; // String!
    friendStatus: NexusGenEnums['FriendStatus']; // FriendStatus!
    friends: NexusGenRootTypes['UserConnection']; // UserConnection!
    id: string; // String!
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
  Channel: { // field return type name
    createdAt: 'Date'
    createdBy: 'User'
    description: 'String'
    id: 'String'
    isDM: 'Boolean'
    memberCount: 'Int'
    members: 'User'
    messages: 'MessageConnection'
    name: 'String'
    updatedAt: 'Date'
  }
  Message: { // field return type name
    channel: 'Channel'
    content: 'String'
    createdAt: 'Date'
    createdBy: 'User'
    createdById: 'String'
    id: 'String'
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
    addMembersToChannel: 'Channel'
    cancelFriendRequest: 'User'
    createChannel: 'Channel'
    createDM: 'Channel'
    createMessage: 'Message'
    declineFriendRequest: 'User'
    deleteChannel: 'Boolean'
    deleteFriend: 'User'
    deleteMessage: 'Message'
    editMessage: 'Message'
    removeMembersFromChannel: 'Channel'
    sendFriendRequest: 'User'
    updateChannel: 'Channel'
    updateUser: 'User'
  }
  NewMessagePayload: { // field return type name
    channelId: 'String'
    message: 'Message'
  }
  PageInfo: { // field return type name
    endCursor: 'String'
    hasNextPage: 'Boolean'
    hasPreviousPage: 'Boolean'
    startCursor: 'String'
  }
  Query: { // field return type name
    channel: 'Channel'
    channelMessages: 'MessageConnection'
    channels: 'Channel'
    friends: 'User'
    me: 'User'
    user: 'User'
    users: 'UserConnection'
  }
  Subscription: { // field return type name
    newFriend: 'User'
    newFriendRequest: 'User'
    newMessage: 'NewMessagePayload'
  }
  User: { // field return type name
    channels: 'Channel'
    createdAt: 'Date'
    email: 'String'
    friendStatus: 'FriendStatus'
    friends: 'UserConnection'
    id: 'String'
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
  Channel: {
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
    addMembersToChannel: { // args
      channelId: string; // String!
      memberIds: string[]; // [String!]!
    }
    cancelFriendRequest: { // args
      friendId: string; // String!
    }
    createChannel: { // args
      description?: string | null; // String
      isPrivate: boolean | null; // Boolean
      memberIds?: string[] | null; // [String!]
      name: string; // String!
    }
    createMessage: { // args
      channelId: string; // String!
      content: string; // String!
    }
    declineFriendRequest: { // args
      friendId: string; // String!
    }
    deleteChannel: { // args
      channelId: string; // String!
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
    removeMembersFromChannel: { // args
      channelId: string; // String!
      membersIds: string[]; // [String!]!
    }
    sendFriendRequest: { // args
      friendId: string; // String!
    }
    updateChannel: { // args
      addMembersId?: string[] | null; // [String!]
      channelId: string; // String!
      isPrivate?: boolean | null; // Boolean
      name?: string | null; // String
      removeMembersId?: string[] | null; // [String!]
    }
    updateUser: { // args
      email: string; // String!
      username: string; // String!
    }
  }
  Query: {
    channel: { // args
      channelId: string; // String!
    }
    channelMessages: { // args
      after?: string | null; // String
      before?: string | null; // String
      channelId: string; // String!
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
    newFriend: { // args
      userId: string; // String!
    }
    newMessage: { // args
      channelId: string; // String!
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
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

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
    
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}