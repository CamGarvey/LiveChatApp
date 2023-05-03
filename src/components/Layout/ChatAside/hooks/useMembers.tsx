import { gql } from '@apollo/client';
import {
  MemberSectionUserFragment,
  useGetChatAsideMembersQuery,
} from 'graphql/generated/graphql';
import { useMemo } from 'react';
import { MemberSection } from '../Sections';

gql`
  query GetChatAsideMembers($chatId: HashId!, $first: Int!, $after: String) {
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
  ${MemberSection.fragments.chat}
`;

export const useMembers = (chatId: string) => {
  const { data, loading, fetchMore } = useGetChatAsideMembersQuery({
    variables: {
      chatId,
      first: 50,
    },
    fetchPolicy: 'cache-and-network',
  });

  const members = useMemo<MemberSectionUserFragment[]>(
    () =>
      data?.members.edges?.map(
        (edge) => edge.node.user as MemberSectionUserFragment
      ) ?? [],
    [data]
  );

  return {
    members,
    loading,
    pageInfo: data?.members.pageInfo,
    totalCount: data?.members.totalCount,
    fetchMore,
  };
};
