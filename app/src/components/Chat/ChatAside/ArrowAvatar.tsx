import { Avatar } from '@mantine/core';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons';

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
      {dir === 'left' && <IconArrowLeft />}
      {dir === 'right' && <IconArrowRight />}
    </Avatar>
  );
};

export default ArrowAvatar;
