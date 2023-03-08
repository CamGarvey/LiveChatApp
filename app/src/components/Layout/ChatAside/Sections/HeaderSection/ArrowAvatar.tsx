import { Avatar, AvatarProps } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons';
import { motion } from 'framer-motion';

const MotionAvatar = motion(Avatar);

type Props = {
  dir: 'left' | 'right';
  onClick: () => void;
} & AvatarProps;

const ArrowAvatar = ({ dir, onClick, ...other }: Props) => {
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
      radius={'100%'}
      color={'default'}
      onClick={() => onClick?.()}
      {...other}
    >
      <IconArrowLeft />
    </MotionAvatar>
  );
};

export default ArrowAvatar;
