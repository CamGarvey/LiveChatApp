import { gql } from '@apollo/client';
import { MediaQuery, Aside, Group, Text, Avatar, Center } from '@mantine/core';
import { AnimateSharedLayout, motion } from 'framer-motion';
import { useGetChatForChatAsideLazyQuery } from 'graphql/generated/graphql';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FooterSection, HeaderSection, MemberSection } from './Sections';

gql`
  query GetChatForChatAside(
    $chatId: HashId!
    $firstMembers: Int = 30
    $afterMember: String
  ) {
    chat(chatId: $chatId) {
      ... on GroupChat {
        members(first: $firstMembers, after: $afterMember) {
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    }
  }
`;

enum Width {
  Open = 300,
  Closed = 70,
}

const MotionAside = motion(Aside);

const ChatAside = () => {
  const { chatId } = useParams();
  const [closed, setClosed] = useState(true);
  const [getChat, { data, loading }] = useGetChatForChatAsideLazyQuery();

  useEffect(() => {
    if (chatId)
      getChat({
        variables: {
          chatId,
        },
      });
  }, [chatId, getChat]);

  const width = useMemo(() => (closed ? Width.Closed : Width.Open), [closed]);

  const chat = data?.chat;

  if (!chatId) return <></>;

  return (
    <MediaQuery smallerThan="xs" styles={{ display: 'none' }}>
      <AnimateSharedLayout>
        <MotionAside
          p="xs"
          layout
          hiddenBreakpoint="md"
          animate={closed ? 'closed' : 'open'}
          variants={{
            open: {
              width: '300px',
              transition: {
                // when: 'beforeChildren',
              },
            },
            closed: {
              width: '75px',
              transition: {
                // when: 'afterChildren',
              },
            },
          }}
          width={{ xs: width, sm: width, md: width, lg: width, xl: width }}
          sx={{
            gap: '4px',
          }}
        >
          <HeaderSection
            onToggle={() => setClosed((prev) => !prev)}
            chat={chat}
            closed={closed}
            loading={loading}
          />
          {chat?.__typename === 'GroupChat' && (
            <Aside.Section>
              {closed ? (
                <Center>
                  <Avatar size="md" radius={'xl'}>
                    {chat.memberCount}
                  </Avatar>
                </Center>
              ) : (
                <Text>Members ({chat.memberCount})</Text>
              )}
            </Aside.Section>
          )}
          <MemberSection chat={chat} loading={loading} />
          <FooterSection chat={chat} loading={loading} />
        </MotionAside>
      </AnimateSharedLayout>
    </MediaQuery>
  );
};

export default ChatAside;
