import { gql } from '@apollo/client';
import { Aside, Group, Skeleton, Text } from '@mantine/core';
import ChatUpdateAction from 'components/shared/ChatUpdateAction';
import { AnimatePresence, motion } from 'framer-motion';
import { HeaderSectionChatFragment } from 'graphql/generated/graphql';
import { useMemo } from 'react';
import ArrowAvatar from './ArrowAvatar';

const MotionGroup = motion(Group);

type Props = {
  chat?: HeaderSectionChatFragment | null | undefined;
  loading: boolean;
  closed: boolean;
  onToggle: () => void;
};

export const HeaderSection = ({ chat, loading, closed, onToggle }: Props) => {
  const name = useMemo(() => {
    switch (chat?.__typename) {
      case 'GroupChat':
        return chat.name;
      case 'DirectMessageChat':
        return chat.friend.username;
      default:
        return 'Error';
    }
  }, [chat]);

  return (
    <Aside.Section>
      <Group
        sx={{
          flexFlow: 'nowrap',
        }}
      >
        <ArrowAvatar dir={closed ? 'left' : 'right'} onClick={onToggle} />
        <AnimatePresence>
          {!closed && (
            <MotionGroup
              layout
              variants={{
                opened: {
                  opacity: 1,
                },
                closed: {
                  opacity: 0,
                },
              }}
              sx={{
                flexWrap: 'nowrap',
                flexGrow: 1,
              }}
            >
              <Skeleton visible={loading}>
                <Text
                  p={1}
                  lineClamp={1}
                  sx={{
                    lineHeight: '1',
                    width: '100%',
                  }}
                >
                  {name}
                </Text>
              </Skeleton>

              {chat?.__typename === 'GroupChat' && (
                <ChatUpdateAction size={'md'} />
              )}
            </MotionGroup>
          )}
        </AnimatePresence>
      </Group>
    </Aside.Section>
  );
};

HeaderSection.fragments = {
  chat: gql`
    fragment HeaderSectionChat on Chat {
      ... on GroupChat {
        name
      }
      ... on DirectMessageChat {
        friend {
          username
        }
      }
    }
  `,
};
