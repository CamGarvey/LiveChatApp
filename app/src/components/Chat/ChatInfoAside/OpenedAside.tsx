import { gql } from '@apollo/client';
import { Aside, Group, ScrollArea, Text } from '@mantine/core';
import ChatUpdateAction from 'components/shared/ChatUpdateAction';
import { OpenedAsideChatFragment } from 'graphql/generated/graphql';
import ArrowAvatar from './ArrowAvatar';
import ChatMemberItem from './ChatMemberItem';

type Props = {
  chat: OpenedAsideChatFragment;
  onClose: () => void;
};

const OpenedAside = ({ chat, onClose }: Props) => {
  return (
    <>
      <Aside.Section>
        <Group
          sx={{
            flexFlow: 'nowrap',
          }}
        >
          <ArrowAvatar dir={'right'} onClick={onClose} />
          {chat.__typename === 'GroupChat' && (
            <>
              <Text
                p={1}
                lineClamp={1}
                sx={{
                  lineHeight: '1',
                  width: '100%',
                }}
              >
                {chat.name}
              </Text>
              <ChatUpdateAction size={'md'} />
            </>
          )}
          {chat.__typename === 'DirectMessageChat' && (
            <ChatMemberItem chat={chat} user={chat.friend} />
          )}
        </Group>
      </Aside.Section>
      {chat.__typename === 'GroupChat' && (
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
        {chat.__typename === 'GroupChat' &&
          chat.members.map((member) => (
            <ChatMemberItem chat={chat} user={member} />
          ))}
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
