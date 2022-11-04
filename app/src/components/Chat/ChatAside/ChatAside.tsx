import { gql } from '@apollo/client';
import {
  MediaQuery,
  Aside,
  Group,
  Text,
  Avatar,
  MantineNumberSize,
} from '@mantine/core';
import { LayoutGroup, motion } from 'framer-motion';
import { useGetChatForChatAsideLazyQuery } from 'graphql/generated/graphql';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { HeaderSection, MemberSection } from './Sections';

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

const sizes = {
  xs: 16,
  sm: 26,
  md: 38,
  lg: 56,
  xl: 84,
};

const AVATAR: {
  size: MantineNumberSize;
} = {
  size: 'md',
};

enum AsideWidth {
  Opened = 300,
  Closed = sizes[AVATAR.size] + 20,
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

  const width = useMemo<
    Partial<Record<string, string | number>> | undefined
  >(() => {
    const w = closed ? AsideWidth.Closed : AsideWidth.Opened;
    return {
      xs: w,
      sm: w,
      md: w,
      lg: w,
      xl: w,
    };
  }, [closed]);

  const chat = data?.chat;

  if (!chatId) return <></>;

  return (
    <MotionAside
      p="xs"
      layout
      hiddenBreakpoint="md"
      animate={closed ? 'closed' : 'opened'}
      initial={closed ? 'closed' : 'opened'}
      exit={closed ? 'closed' : 'opened'}
      width={width}
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
      sx={{
        gap: '5px',
      }}
    >
      <HeaderSection
        onToggle={() => setClosed((prev) => !prev)}
        chat={chat}
        closed={closed}
        loading={loading}
        avatar={AVATAR}
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
            <Avatar radius={'xl'} color={'dimmed'} {...AVATAR}>
              {chat.memberCount}
            </Avatar>
          </Group>
        </Aside.Section>
      )}
      <MemberSection chat={chat} loading={loading} avatar={AVATAR} />
      {/* <FooterSection chat={chat} loading={loading} /> */}
    </MotionAside>
  );
};

export default ChatAside;
