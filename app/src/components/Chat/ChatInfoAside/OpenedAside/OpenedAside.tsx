import { gql } from '@apollo/client';
import { Aside, Group, Text } from '@mantine/core';
import { OpenedAsideChatFragment } from 'graphql/generated/graphql';
import { HeaderSection, MemberSection, FooterSection } from './Sections';

type Props = {
  chat?: OpenedAsideChatFragment | null | undefined;
  loading: boolean;
  onClose: () => void;
};

const OpenedAside = ({ chat, loading, onClose }: Props) => {
  return (
    <>
      <HeaderSection onClose={onClose} chat={chat} loading={loading} />
      {chat?.__typename === 'GroupChat' && (
        <Aside.Section>
          <Group>
            <Text>Members ({chat.memberCount})</Text>
          </Group>
        </Aside.Section>
      )}
      <MemberSection chat={chat} loading={loading} />
      <FooterSection chat={chat} loading={loading} />
    </>
  );
};

OpenedAside.fragments = {
  chat: gql`
    fragment OpenedAsideChat on Chat {
      ... on GroupChat {
        memberCount
      }
      ...MemberSectionChat
      ...HeaderSectionChat
      ...FooterSectionChat
    }
    ${HeaderSection.fragments.chat}
    ${MemberSection.fragments.chat}
    ${FooterSection.fragments.chat}
  `,
};

export default OpenedAside;
