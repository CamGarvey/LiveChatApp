import { gql } from '@apollo/client';
import { MediaQuery, Aside, Group, Text, Avatar, Center } from '@mantine/core';
import { LayoutGroup, motion } from 'framer-motion';
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

enum AsideWidth {
  Opened = 300,
  Closed = 58,
}

const MotionAside = motion(Aside);
const MotionText = motion(Text);

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

  const width = useMemo(
    () => (closed ? AsideWidth.Closed : AsideWidth.Opened),
    [closed]
  );

  const chat = data?.chat;

  if (!chatId) return <></>;

  return (
    <MediaQuery smallerThan="xs" styles={{ display: 'none' }}>
      <LayoutGroup>
        <MotionAside
          p="xs"
          layout
          hiddenBreakpoint="md"
          animate={closed ? 'closed' : 'opened'}
          variants={{
            opened: {
              width: `${AsideWidth.Opened}px`,
              transition: {
                type: 'just',
                when: 'beforeChildren',
              },
            },
            closed: {
              width: `${AsideWidth.Closed}px`,
              transition: {
                type: 'just',
                when: 'afterChildren',
              },
            },
          }}
          width={{ xs: width, sm: width, md: width, lg: width, xl: width }}
          sx={{
            gap: '5px',
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
              <Group
                sx={{
                  justifyContent: 'right',
                  flexWrap: 'nowrap',
                }}
              >
                <MotionText
                  layout
                  variants={{
                    opened: {
                      x: 0,
                      opacity: 1,
                    },
                    closed: {
                      x: 100,
                      opacity: 0,
                    },
                  }}
                >
                  Members
                </MotionText>
                <Avatar size="md" radius={'xl'} color={'dimmed'}>
                  {chat.memberCount}
                </Avatar>
              </Group>
            </Aside.Section>
          )}
          <MemberSection chat={chat} loading={loading} />
          <FooterSection chat={chat} loading={loading} />
        </MotionAside>
      </LayoutGroup>
    </MediaQuery>
  );
};

export default ChatAside;
