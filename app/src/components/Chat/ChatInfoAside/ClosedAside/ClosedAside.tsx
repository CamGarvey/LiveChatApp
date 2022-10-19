import { gql } from '@apollo/client';
import { Aside, ScrollArea } from '@mantine/core';
import { ClosedAsideChatFragment } from 'graphql/generated/graphql';
import { useMemo } from 'react';
import ArrowAvatar from '../ArrowAvatar';
import AvatarSection from './AvatarSection';

type Props = {
  chat?: ClosedAsideChatFragment | null | undefined;
  loading: boolean;
  onOpen: () => void;
};

const ClosedAside = ({ chat, loading, onOpen }: Props) => {
  const users = useMemo(() => {
    switch (chat?.__typename) {
      case 'DirectMessageChat':
        return [chat.friend];
      case 'GroupChat':
        return chat.members;
      default:
        return [];
    }
  }, [chat]);

  return (
    <>
      <Aside.Section>
        <ArrowAvatar dir={'left'} onClick={onOpen} />
      </Aside.Section>
      <Aside.Section component={ScrollArea} type={'never'} grow>
        <AvatarSection users={users} loading={loading} />
      </Aside.Section>
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
