import { gql } from '@apollo/client';
import { Aside, Avatar } from '@mantine/core';
import {
  AvatarSectionUserFragment,
  ClosedAsideChatFragment,
} from 'graphql/generated/graphql';
import { useMemo } from 'react';
import { sortRelationship } from 'utils';
import ArrowAvatar from '../ArrowAvatar';
import { AvatarSection } from './Sections';

type Props = {
  chat?: ClosedAsideChatFragment | null | undefined;
  loading: boolean;
  onFetchMoreMembers: () => void;
  onOpen: () => void;
};

const ClosedAside = ({ chat, loading, onOpen, onFetchMoreMembers }: Props) => {
  const users = useMemo<AvatarSectionUserFragment[]>(() => {
    let userArr: AvatarSectionUserFragment[];
    switch (chat?.__typename) {
      case 'DirectMessageChat':
        userArr = [chat.friend];
        break;
      case 'GroupChat':
        userArr =
          chat.members.edges
            ?.filter((x) => !!x)
            .map((x) => x!.node as AvatarSectionUserFragment) ?? [];
        break;
      default:
        userArr = [];
    }
    return userArr.slice().sort(sortRelationship);
  }, [chat]);

  return (
    <>
      <Aside.Section>
        <ArrowAvatar dir={'left'} onClick={onOpen} />
      </Aside.Section>
      {chat?.__typename === 'GroupChat' && (
        <Aside.Section>
          <Avatar radius={'xl'}>{chat.memberCount}</Avatar>
        </Aside.Section>
      )}
      <AvatarSection
        users={users}
        loading={loading}
        onHitBottom={onFetchMoreMembers}
      />
    </>
  );
};

ClosedAside.fragments = {
  chat: gql`
    fragment ClosedAsideChat on Chat {
      ... on DirectMessageChat {
        friend {
          ...AvatarSectionUser
        }
      }
      ... on GroupChat {
        memberCount
        members(first: $firstMembers, after: $afterMember) {
          edges {
            node {
              ...AvatarSectionUser
            }
          }
        }
      }
    }
    ${AvatarSection.fragments.users}
  `,
};

export default ClosedAside;
