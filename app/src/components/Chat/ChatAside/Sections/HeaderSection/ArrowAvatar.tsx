import { Avatar, MantineNumberSize } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons';
import { motion } from 'framer-motion';

const MotionAvatar = motion(Avatar);

type Props = {
  dir: 'left' | 'right';
  size?: MantineNumberSize | undefined;
  onClick?: () => void;
};

const ArrowAvatar = ({ dir, onClick, size }: Props) => {
  return (
    <MotionAvatar
      sx={{
        cursor: 'pointer',
      }}
      animate={dir}
      variants={{
        left: {
          rotate: 0,
        },
        right: {
          rotate: 180,
        },
        transition: {
          type: 'just',
        },
      }}
      radius={'xl'}
      size={size ?? 'md'}
      color={'default'}
      onClick={() => onClick?.()}
    >
      <IconArrowLeft />
    </MotionAvatar>
  );
};

export default ArrowAvatar;
