import { Avatar } from '@mantine/core';

type Props = {
  isVisible: boolean;
  username: string;
};

const EventAvatar = ({ isVisible, username }: Props) => {
  return (
    <Avatar
      size="sm"
      radius={'xl'}
      src={`https://avatars.dicebear.com/api/initials/${username}.svg`}
      style={{ marginTop: 'auto' }}
      sx={{
        visibility: isVisible ? 'visible' : 'hidden',
      }}
    />
  );
};

export default EventAvatar;
