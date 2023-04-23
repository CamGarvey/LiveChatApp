import { Aside, Avatar, AvatarProps, Group, Text } from '@mantine/core';
import { motion } from 'framer-motion';

const MotionText = motion(Text);

type Props = {
  count: number;
  avatarProps?: AvatarProps;
};

export const MemberCountSection = ({ count, avatarProps }: Props) => {
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
          {count}
        </Avatar>
      </Group>
    </Aside.Section>
  );
};
