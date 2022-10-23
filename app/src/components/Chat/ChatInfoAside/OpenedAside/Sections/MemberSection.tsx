import { gql } from '@apollo/client';
import { Aside, LoadingOverlay, ScrollArea } from '@mantine/core';
import {
  ChatMemberItemUserFragment,
  MemberSectionChatFragment,
} from 'graphql/generated/graphql';
import { useMemo } from 'react';
import { sortRelationship } from 'utils';
import ChatMemberItem from '../../ChatMemberItem';

type Props = {
  chat?: MemberSectionChatFragment | null | undefined;
  loading: boolean;
};

export const MemberSection = ({ chat, loading }: Props) => {
  const users = useMemo(() => {
    let userArr: ChatMemberItemUserFragment[] = [];
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
    <Aside.Section
      grow
      component={ScrollArea}
      mx="-xs"
      px="xs"
      my={'md'}
      styles={{
        viewport: {
          paddingLeft: '5px',
        },
      }}
      offsetScrollbars={true}
    >
      <LoadingOverlay
        mt={10}
        visible={loading}
        loaderProps={{ variant: 'bars' }}
      />
      {chat &&
        users.map((member) => (
          <ChatMemberItem key={member.id} chat={chat} user={member} />
        ))}
    </Aside.Section>
  );
};

MemberSection.fragments = {
  chat: gql`
    fragment MemberSectionChat on Chat {
      ...ChatMemberItemChat
      ... on GroupChat {
        ...ChatMemberItemChat
        members {
          id
          ...ChatMemberItemUser
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
