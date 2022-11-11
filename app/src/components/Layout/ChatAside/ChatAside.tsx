import { gql } from '@apollo/client';
import { Aside, MantineNumberSize, MediaQuery } from '@mantine/core';
import { motion } from 'framer-motion';
import {
  MemberSectionUserFragment,
  useGetChatForChatAsideQuery,
  useGetMembersForMemberSectionQuery,
} from 'graphql/generated/graphql';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AVATAR_SIZES } from 'utils';
import { HeaderSection, MemberSection, MemberCountSection } from './Sections';

gql`
  query GetChatForChatAside($chatId: HashId!) {
    chat(chatId: $chatId) {
      ...HeaderSectionChat
      ...MemberSectionChat
      ... on GroupChat {
        ...MemberCountSectionChat
      }
    }
    ${MemberCountSection.fragments.chat}
  }
  query GetMembersForMemberSection(
    $chatId: HashId!
    $first: Int!
    $after: String
  ) {
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
  ${HeaderSection.fragments.chat}
  ${MemberSection.fragments.chat}
  ${MemberSection.fragments.user}
`;

const MotionAside = motion(Aside);

type Props = {
  size?: MantineNumberSize | undefined;
  openedWidth?: number | undefined;
};

export const ChatAside = ({ size = 'md', openedWidth = 300 }: Props) => {
  const { chatId } = useParams();
  const [closed, setClosed] = useState(true);
  const { data: dataChat, loading: loadingChat } = useGetChatForChatAsideQuery({
    variables: {
      chatId,
    },
  });
  const {
    data: dataMembers,
    loading: loadingMembers,
    fetchMore: fetchMoreMembers,
  } = useGetMembersForMemberSectionQuery({
    variables: {
      chatId,
      first: 50,
    },
    fetchPolicy: 'cache-and-network',
  });

  const closedWidth = useMemo(() => AVATAR_SIZES[size] + 20, [size]);

  const chat = dataChat?.chat;
  const members = useMemo<MemberSectionUserFragment[]>(
    () =>
      dataMembers?.members?.edges
        ?.filter((x) => !!x?.node)
        .map((x) => x!.node?.user as MemberSectionUserFragment) ?? [],
    [dataMembers]
  );
  const memberPageInfo = dataMembers?.members.pageInfo;

  if (!chatId) return <></>;

  return (
    <MediaQuery smallerThan="xs" styles={{ display: 'none' }}>
      <MotionAside
        p="xs"
        layout
        zIndex={100}
        hiddenBreakpoint="md"
        animate={closed ? 'closed' : 'opened'}
        initial={closed ? 'closed' : 'opened'}
        exit={closed ? 'closed' : 'opened'}
        width={{
          xs: closedWidth,
          sm: closedWidth,
          md: closedWidth,
          lg: closedWidth,
          xl: closedWidth,
        }}
        variants={{
          opened: {
            width: `${openedWidth}px`,
            transition: {
              duration: 0.5,
            },
          },
          closed: {
            width: `${closedWidth}px`,
            transition: {
              duration: 0.5,
              delay: 0.3,
            },
          },
        }}
        sx={{
          gap: '5px',
        }}
      >
        <HeaderSection
          onToggle={() => setClosed((prev) => !prev)}
          chat={chat}
          closed={closed}
          loading={loadingChat}
          avatarProps={{
            size,
          }}
        />
        {chat?.__typename === 'GroupChat' && (
          <MemberCountSection
            chat={chat}
            loading={loadingChat}
            avatarProps={{
              size,
            }}
          />
        )}
        <MemberSection
          chat={chat}
          members={members}
          loading={loadingMembers || loadingChat}
          size={size}
          onLoadMore={() => {
            if (memberPageInfo?.hasNextPage) {
              fetchMoreMembers({
                variables: {
                  after: memberPageInfo.endCursor,
                },
              });
            }
          }}
        />
        {/* <FooterSection chat={chat} loading={loading} /> */}
      </MotionAside>
    </MediaQuery>
  );
};
