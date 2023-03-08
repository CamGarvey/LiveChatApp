import { gql } from '@apollo/client';
import { Aside, Avatar, AvatarProps, Group, Text } from '@mantine/core';
import { motion } from 'framer-motion';
import { MemberCountSectionChatFragment } from 'graphql/generated/graphql';

const MotionText = motion(Text);

type Props = {
  chat: MemberCountSectionChatFragment | null | undefined;
  loading: boolean;
  avatarProps?: AvatarProps;
};

export const MemberCountSection = ({ chat, loading, avatarProps }: Props) => {
  return (
    <Aside.Section>
      <Group
        sx={{
          justifyContent: 'right',
          flexWrap: 'nowrap',
        }}
      >
        <MotionText
          layout
          variants={{
            opened: {
              x: 0,
              opacity: 1,
            },
            closed: {
              x: 100,
              opacity: 0,
            },
          }}
        >
          Members
        </MotionText>
        <Avatar sx={{ borderRadius: '100%' }} color={'dimmed'} {...avatarProps}>
          {chat?.memberCount ?? 0}
        </Avatar>
      </Group>
    </Aside.Section>
  );
};

MemberCountSection.fragments = {
  chat: gql`
    fragment MemberCountSectionChat on GroupChat {
      members {
        totalCount
      }
    }
  `,
};
