import { gql } from '@apollo/client';
import { Aside, Group, LoadingOverlay, ScrollArea, Text } from '@mantine/core';
import { OpenedAsideChatFragment } from 'graphql/generated/graphql';
import { useMemo } from 'react';
import ChatMemberItem from '../ChatMemberItem';
import OpenedHeader from './OpenedHeader';

type Props = {
  chat?: OpenedAsideChatFragment | null | undefined;
  loading: boolean;
  onClose: () => void;
};

const OpenedAside = ({ chat, loading, onClose }: Props) => {
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
        <OpenedHeader onClose={onClose} chat={chat} loading={loading} />
      </Aside.Section>
      {chat?.__typename === 'GroupChat' && (
        <Aside.Section>
          <Group>
            <Text>Members ({chat.members.length})</Text>
          </Group>
        </Aside.Section>
      )}
      <Aside.Section
        grow
        component={ScrollArea}
        mx="-xs"
        px="xs"
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
          users.map((member) => <ChatMemberItem chat={chat} user={member} />)}
      </Aside.Section>
    </>
  );
};

OpenedAside.fragments = {
  chat: gql`
    fragment OpenedAsideChat on Chat {
      ... on GroupChat {
        name
        description
        members {
          ...ChatMemberItemUser
        }
      }
      ... on DirectMessageChat {
        friend {
          ...ChatMemberItemUser
        }
      }
      ...ChatMemberItemChat
    }
    ${ChatMemberItem.fragments.chat}
    ${ChatMemberItem.fragments.user}
  `,
};

export default OpenedAside;
