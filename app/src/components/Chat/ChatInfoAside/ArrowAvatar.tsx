import { Avatar } from '@mantine/core';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons';

type Props = {
  dir: 'left' | 'right';
  onClick?: () => void;
};

const ArrowAvatar = ({ dir, onClick }: Props) => {
  return (
    <Avatar
      radius={'xl'}
      color={'blue'}
      sx={{
        cursor: 'pointer',
      }}
      onClick={() => onClick?.()}
    >
      {dir === 'left' && <IconArrowLeft />}
      {dir === 'right' && <IconArrowRight />}
    </Avatar>
  );
};

export default ArrowAvatar;
