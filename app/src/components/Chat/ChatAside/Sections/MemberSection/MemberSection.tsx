import { gql } from '@apollo/client';
import {
  Aside,
  MantineNumberSize,
  ScrollArea,
  Skeleton,
  Stack,
} from '@mantine/core';
import { useScroller } from 'hooks';
import {
  ChatMemberItemUserFragment,
  MemberSectionChatFragment,
  MemberSectionUserFragment,
} from 'graphql/generated/graphql';
import { useMemo, useRef } from 'react';
import { AVATAR_SIZES, sortRelationship } from 'utils';
import ChatMemberItem from './ChatMemberItem';

type Props = {
  chat: MemberSectionChatFragment | null | undefined;
  members: MemberSectionUserFragment[];
  size?: MantineNumberSize | undefined;
  onLoadMore: () => void;
  loading: boolean;
};

export const MemberSection = ({
  chat,
  members,
  loading,
  size = 'md',
  onLoadMore,
}: Props) => {
  const viewport = useRef<HTMLDivElement>(null);
  useScroller({
    viewport,
    onHitBottom: onLoadMore,
  });
  const sortedMembers = useMemo<ChatMemberItemUserFragment[]>(
    () => members.slice().sort(sortRelationship),
    [members]
  );

  return (
    <Aside.Section
      grow
      viewportRef={viewport}
      component={ScrollArea}
      styles={{
        viewport: {
          padding: 0,
        },
      }}
      type="never"
    >
      <Stack
        p={0}
        spacing={3}
        sx={{
          width: '100%',
        }}
      >
        {loading ? (
          <LoadingMembers height={AVATAR_SIZES[size]} length={5} />
        ) : (
          chat &&
          sortedMembers.map((member) => (
            <ChatMemberItem
              key={member.id}
              chat={chat}
              user={member}
              size={size}
            />
          ))
        )}
      </Stack>
    </Aside.Section>
  );
};

const LoadingMembers = ({
  height,
  length,
}: {
  height: MantineNumberSize | undefined;
  length: number;
}) => (
  <Stack spacing={3}>
    {[...Array.from({ length })].map(() => (
      <Skeleton radius={50} height={height} width={'100%'} />
    ))}
  </Stack>
);

MemberSection.fragments = {
  user: gql`
    fragment MemberSectionUser on User {
      id
      ...ChatMemberItemUser
    }
    ${ChatMemberItem.fragments.user}
  `,
  chat: gql`
    fragment MemberSectionChat on Chat {
      ...ChatMemberItemChat
    }
    ${ChatMemberItem.fragments.chat}
  `,
};
