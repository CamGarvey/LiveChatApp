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
    id: number; // Int!
    isDM: boolean; // Boolean!
    name: string; // String!
    updatedAt: NexusGenScalars['Date']; // Date!
  }
  Message: { // root type
    content: string; // String!
    createdAt: NexusGenScalars['Date']; // Date!
    createdById: number; // Int!
    id: number; // Int!
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
    channelId: number; // Int!
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
    id: number; // Int!
    name: string; // String!
    updatedAt: NexusGenScalars['Date']; // Date!
    username?: string | null; // String
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
    createBy: NexusGenRootTypes['User']; // User!
    createdAt: NexusGenScalars['Date']; // Date!
    id: number; // Int!
    isDM: boolean; // Boolean!
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
    createdById: number; // Int!
    id: number; // Int!
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
    acceptFriendRequest: boolean | null; // Boolean
    addUsersToChannel: NexusGenRootTypes['Channel'] | null; // Channel
    createChannel: NexusGenRootTypes['Channel'] | null; // Channel
    createMessage: NexusGenRootTypes['Message'] | null; // Message
    createUser: NexusGenRootTypes['User'] | null; // User
    deleteChannel: boolean | null; // Boolean
    deleteFriend: boolean | null; // Boolean
    deleteFriendRequest: boolean | null; // Boolean
    deleteMessage: NexusGenRootTypes['Message'] | null; // Message
    deleteUser: NexusGenRootTypes['User'] | null; // User
    removeUsersFromChannel: NexusGenRootTypes['Channel'] | null; // Channel
    sendFriendRequest: boolean | null; // Boolean
    updateChannel: NexusGenRootTypes['Channel'] | null; // Channel
    updateMessage: NexusGenRootTypes['Message'] | null; // Message
    updateUser: NexusGenRootTypes['User'] | null; // User
  }
  NewMessagePayload: { // field return type
    channelId: number; // Int!
    message: NexusGenRootTypes['Message']; // Message!
  }
  PageInfo: { // field return type
    endCursor: string | null; // String
    hasNextPage: boolean; // Boolean!
    hasPreviousPage: boolean; // Boolean!
    startCursor: string | null; // String
  }
  Query: { // field return type
    Channel: NexusGenRootTypes['Channel'] | null; // Channel
    Channels: Array<NexusGenRootTypes['Channel'] | null> | null; // [Channel]
    Friends: NexusGenRootTypes['User'][]; // [User!]!
    Me: NexusGenRootTypes['User'] | null; // User
    Message: NexusGenRootTypes['Message'] | null; // Message
    User: NexusGenRootTypes['User'] | null; // User
    Users: NexusGenRootTypes['UserConnection']; // UserConnection!
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
    friends: NexusGenRootTypes['UserConnection']; // UserConnection!
    id: number; // Int!
    name: string; // String!
    receivedFriendRequests: NexusGenRootTypes['User'][]; // [User!]!
    sentFriendRequests: NexusGenRootTypes['User'][]; // [User!]!
    updatedAt: NexusGenScalars['Date']; // Date!
    username: string | null; // String
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
    createBy: 'User'
    createdAt: 'Date'
    id: 'Int'
    isDM: 'Boolean'
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
    createdById: 'Int'
    id: 'Int'
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
    acceptFriendRequest: 'Boolean'
    addUsersToChannel: 'Channel'
    createChannel: 'Channel'
    createMessage: 'Message'
    createUser: 'User'
    deleteChannel: 'Boolean'
    deleteFriend: 'Boolean'
    deleteFriendRequest: 'Boolean'
    deleteMessage: 'Message'
    deleteUser: 'User'
    removeUsersFromChannel: 'Channel'
    sendFriendRequest: 'Boolean'
    updateChannel: 'Channel'
    updateMessage: 'Message'
    updateUser: 'User'
  }
  NewMessagePayload: { // field return type name
    channelId: 'Int'
    message: 'Message'
  }
  PageInfo: { // field return type name
    endCursor: 'String'
    hasNextPage: 'Boolean'
    hasPreviousPage: 'Boolean'
    startCursor: 'String'
  }
  Query: { // field return type name
    Channel: 'Channel'
    Channels: 'Channel'
    Friends: 'User'
    Me: 'User'
    Message: 'Message'
    User: 'User'
    Users: 'UserConnection'
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
    friends: 'UserConnection'
    id: 'Int'
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
      friendId: number; // Int!
      userId: number; // Int!
    }
    addUsersToChannel: { // args
      id: number; // Int!
      userIds: number[]; // [Int!]!
    }
    createChannel: { // args
      createdById: number; // Int!
      isDM: boolean; // Boolean!
      name: string; // String!
    }
    createMessage: { // args
      channelId: number; // Int!
      content: string; // String!
      createdById: number; // Int!
    }
    createUser: { // args
      email?: string | null; // String
      name: string; // String!
      username?: string | null; // String
    }
    deleteChannel: { // args
      id: number; // Int!
    }
    deleteFriend: { // args
      friendId: number; // Int!
      userId: number; // Int!
    }
    deleteFriendRequest: { // args
      friendId: number; // Int!
      userId: number; // Int!
    }
    deleteMessage: { // args
      id: number; // Int!
    }
    deleteUser: { // args
      id: number; // Int!
    }
    removeUsersFromChannel: { // args
      id: number; // Int!
      userIds: number[]; // [Int!]!
    }
    sendFriendRequest: { // args
      friendId: number; // Int!
      userId: number; // Int!
    }
    updateChannel: { // args
      id: number; // Int!
      isDM: boolean; // Boolean!
      name: string; // String!
    }
    updateMessage: { // args
      content: string; // String!
      id: number; // Int!
    }
    updateUser: { // args
      email: string; // String!
      id: number; // Int!
      username: string; // String!
    }
  }
  Query: {
    Channel: { // args
      id: number; // Int!
    }
    Channels: { // args
      userId: number; // Int!
    }
    Message: { // args
      id: number; // Int!
    }
    User: { // args
      id: number; // Int!
    }
    Users: { // args
      after?: string | null; // String
      before?: string | null; // String
      first?: number | null; // Int
      last?: number | null; // Int
      nameFilter?: string | null; // String
      orderBy?: NexusGenInputs['UserOrderBy'] | null; // UserOrderBy
    }
  }
  Subscription: {
    newFriend: { // args
      userId: number; // Int!
    }
    newFriendRequest: { // args
      userId: number; // Int!
    }
    newMessage: { // args
      channelId: number; // Int!
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