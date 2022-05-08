import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date custom scalar type */
  Date: any;
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
  Friends?: Maybe<UserConnection>;
  User?: Maybe<User>;
  Users?: Maybe<UserConnection>;
};

export type QueryFriendsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  userId?: InputMaybe<Scalars['Int']>;
};

export type QueryUserArgs = {
  id: Scalars['Int'];
};

export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  nameFilter?: InputMaybe<Scalars['String']>;
  orderBy?: InputMaybe<UserOrderBy>;
};

export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['Date']>;
  email?: Maybe<Scalars['String']>;
  friends?: Maybe<Array<Maybe<User>>>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Date']>;
  username?: Maybe<Scalars['String']>;
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
  username?: InputMaybe<UserSort>;
};

export enum UserSort {
  Asc = 'asc',
  Desc = 'desc',
}

export type GetUsersQueryVariables = Exact<{
  nameFilter?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  last?: InputMaybe<Scalars['Int']>;
  before?: InputMaybe<Scalars['String']>;
}>;

export type GetUsersQuery = {
  __typename?: 'Query';
  Users?: {
    __typename?: 'UserConnection';
    edges?: Array<{
      __typename?: 'UserEdge';
      cursor: string;
      node?: {
        __typename?: 'User';
        id?: number | null;
        name?: string | null;
        username?: string | null;
        email?: string | null;
        createdAt?: any | null;
        updatedAt?: any | null;
        friends?: Array<{
          __typename?: 'User';
          id?: number | null;
          name?: string | null;
          username?: string | null;
          email?: string | null;
          createdAt?: any | null;
          updatedAt?: any | null;
        } | null> | null;
      } | null;
    } | null> | null;
    pageInfo: {
      __typename?: 'PageInfo';
      endCursor?: string | null;
      startCursor?: string | null;
      hasPreviousPage: boolean;
      hasNextPage: boolean;
    };
  } | null;
};

export const GetUsersDocument = gql`
  query GetUsers(
    $nameFilter: String
    $first: Int
    $after: String
    $last: Int
    $before: String
  ) {
    Users(
      nameFilter: $nameFilter
      first: $first
      after: $after
      last: $last
      before: $before
    ) {
      edges {
        cursor
        node {
          id
          name
          username
          email
          createdAt
          updatedAt
          friends {
            id
            name
            username
            email
            createdAt
            updatedAt
          }
        }
      }
      pageInfo {
        endCursor
        startCursor
        hasPreviousPage
        hasNextPage
      }
    }
  }
`;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *      nameFilter: // value for 'nameFilter'
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      last: // value for 'last'
 *      before: // value for 'before'
 *   },
 * });
 */
export function useGetUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(
    GetUsersDocument,
    options
  );
}
export function useGetUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUsersQuery,
    GetUsersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(
    GetUsersDocument,
    options
  );
}
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<
  typeof useGetUsersLazyQuery
>;
export type GetUsersQueryResult = Apollo.QueryResult<
  GetUsersQuery,
  GetUsersQueryVariables
>;
