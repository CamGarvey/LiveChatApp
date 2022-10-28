import { Avatar } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons';
import { motion } from 'framer-motion';

const MotionIconArrowLeft = motion(IconArrowLeft);

type Props = {
  dir: 'left' | 'right';
  onClick?: () => void;
};

const ArrowAvatar = ({ dir, onClick }: Props) => {
  return (
    <Avatar
      sx={{
        cursor: 'pointer',
      }}
      radius={'xl'}
      color={'default'}
      onClick={() => onClick?.()}
    >
      <MotionIconArrowLeft
        animate={dir}
        transition={{
          left: {
            rotate: -100,
          },
          right: {
            rotate: 0,
          },
        }}
      />
    </Avatar>
  );
};

export default ArrowAvatar;
