import { Avatar } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons';
import { motion } from 'framer-motion';

const MotionAvatar = motion(Avatar);

type Props = {
  dir: 'left' | 'right';
  onClick?: () => void;
};

const ArrowAvatar = ({ dir, onClick }: Props) => {
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
      color={'default'}
      onClick={() => onClick?.()}
    >
      <IconArrowLeft />
    </MotionAvatar>
  );
};

export default ArrowAvatar;
