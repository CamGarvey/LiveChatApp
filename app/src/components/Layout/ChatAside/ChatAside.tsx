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
  query GetChatForChatAside($chatId: HashId!, $first: Int!, $after: String) {
    chat(chatId: $chatId) {
      ...HeaderSectionChat
      ...MemberSectionChat
    }
  }
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
  ${HeaderSection.fragments.chat}
  ${MemberSection.fragments.chat}
  ${MemberSection.fragments.user}
`;

const MotionAside = motion(Aside);

type Props = {
  size?: MantineNumberSize;
  openedWidth?: number;
};

export const ChatAside = ({ size = 'md', openedWidth = 300 }: Props) => {
  const { chatId } = useParams();
  const [closed, setClosed] = useState(true);

  const chatData = useGetChatForChatAsideQuery({
    variables: {
      chatId,
    },
  });

  const membersData = useGetMembersForMemberSectionQuery({
    variables: {
      chatId,
      first: 50,
    },
    fetchPolicy: 'cache-and-network',
  });

  const closedWidth = useMemo(() => AVATAR_SIZES[size] + 20, [size]);

  console.log({ chatData });

  const chat = chatData.data?.chat;

  const members = useMemo<MemberSectionUserFragment[]>(
    () =>
      membersData.data?.members?.edges
        ?.filter((x) => !!x?.node)
        .map((x) => x.node?.user as MemberSectionUserFragment) ?? [],
    [membersData]
  );
  const memberPageInfo = membersData.data?.members.pageInfo;

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
          loading={chatData.loading}
          avatarProps={{
            size,
          }}
        />
        {membersData.data && chat?.__typename === 'GroupChat' && (
          <MemberCountSection
            count={membersData.data.members.totalCount}
            avatarProps={{
              size,
            }}
          />
        )}
        <MemberSection
          chat={chat}
          members={members}
          loading={membersData.loading || chatData.loading}
          size={size}
          onLoadMore={() => {
            if (memberPageInfo?.hasNextPage) {
              membersData.fetchMore({
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
