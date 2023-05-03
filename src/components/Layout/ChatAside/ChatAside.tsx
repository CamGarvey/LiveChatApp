import { Aside, MantineNumberSize, MediaQuery } from '@mantine/core';
import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AVATAR_SIZES } from 'utils';
import { HeaderSection, MemberSection } from './Sections';
import { useChat, useMembers } from './hooks';
import { MemberCountSection } from './Sections/MemberSection/MemberCountSection';

const MotionAside = motion(Aside);

type Props = {
  size?: MantineNumberSize;
  openedWidth?: number;
};

export const ChatAside = ({ size = 'md', openedWidth = 300 }: Props) => {
  const { chatId } = useParams();
  const { chat, loading: loadingChat } = useChat(chatId!);
  const members = useMembers(chatId!);
  const [closed, setClosed] = useState(true);
  const closedWidth = useMemo(() => AVATAR_SIZES[size] + 20, [size]);

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
        <MemberCountSection count={members.totalCount ?? 0} />
        <MemberSection
          chat={chat}
          members={members.members}
          loading={members.loading}
          size={size}
          onLoadMore={() => {
            if (members.pageInfo?.hasNextPage) {
              members.fetchMore({
                variables: {
                  after: members.pageInfo.endCursor,
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
