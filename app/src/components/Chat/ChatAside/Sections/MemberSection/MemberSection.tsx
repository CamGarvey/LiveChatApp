import { gql } from '@apollo/client';
import {
  Aside,
  MantineNumberSize,
  ScrollArea,
  Skeleton,
  Stack,
} from '@mantine/core';
import {
  ChatMemberItemUserFragment,
  OpenedMemberSectionChatFragment,
} from 'graphql/generated/graphql';
import { useMemo } from 'react';
import { AVATAR_SIZES, sortRelationship } from 'utils';
import ChatMemberItem from './ChatMemberItem';

type Props = {
  chat?: OpenedMemberSectionChatFragment | null | undefined;
  avatar?: {
    size?: MantineNumberSize | undefined;
  };
  loading: boolean;
};

export const MemberSection = ({ chat, loading, avatar }: Props) => {
  const users = useMemo<ChatMemberItemUserFragment[]>(() => {
    let userArr: ChatMemberItemUserFragment[] = [];
    switch (chat?.__typename) {
      case 'DirectMessageChat':
        userArr = [chat.friend];
        break;
      case 'GroupChat':
        userArr =
          chat.members.edges
            ?.filter((x) => !!x)
            .map((x) => x?.node as ChatMemberItemUserFragment) ?? [];
        break;
      default:
        userArr = [];
    }
    return userArr.slice().sort(sortRelationship);
  }, [chat]);

  return (
    <Aside.Section
      grow
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
        spacing={'xs'}
        sx={{
          width: '100%',
        }}
      >
        {loading ? (
          <LoadingMembers
            height={AVATAR_SIZES[avatar?.size ?? 'md']}
            length={5}
          />
        ) : (
          chat &&
          users.map((member) => (
            <ChatMemberItem
              key={member.id}
              chat={chat}
              user={member}
              avatar={avatar}
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
  <Stack>
    {[...Array.from({ length })].map(() => (
      <Skeleton radius={50} height={height} width={'100%'} />
    ))}
  </Stack>
);

MemberSection.fragments = {
  chat: gql`
    fragment OpenedMemberSectionChat on Chat {
      ...ChatMemberItemChat
      ... on GroupChat {
        ...ChatMemberItemChat
        members(first: $firstMembers, after: $afterMember) {
          edges {
            node {
              id
              ...ChatMemberItemUser
            }
          }
        }
      }
      ... on DirectMessageChat {
        friend {
          ...ChatMemberItemUser
        }
      }
    }
    ${ChatMemberItem.fragments.chat}
    ${ChatMemberItem.fragments.user}
  `,
};
