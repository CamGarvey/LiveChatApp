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
  onOpen: () => void;
};

const ClosedAside = ({ chat, loading, onOpen }: Props) => {
  const users = useMemo(() => {
    let userArr: AvatarSectionUserFragment[];
    switch (chat?.__typename) {
      case 'DirectMessageChat':
        userArr = [chat.friend];
        break;
      case 'GroupChat':
        userArr = chat.members;
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
          <Avatar radius={'xl'}>{chat.members.length}</Avatar>
        </Aside.Section>
      )}
      <AvatarSection users={users} loading={loading} />
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
        members {
          ...AvatarSectionUser
        }
      }
    }
    ${AvatarSection.fragments.users}
  `,
};

export default ClosedAside;
