import { Avatar, Group, Text, UnstyledButton } from '@mantine/core';

type Props = {
  name: string;
  memberCount: number;
  isSelected: boolean;
  onClick?: () => void;
};

const ChannelItem = ({ name, isSelected, memberCount, onClick }: Props) => {
  return (
    <UnstyledButton
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        backgroundColor:
          isSelected &&
          (theme.colorScheme === 'dark'
            ? theme.colors.dark[6]
            : theme.colors.gray[1]),
        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[6]
              : theme.colors.gray[1],
        },
      })}
      onClick={onClick}
    >
      <Group>
        <Avatar
          size="sm"
          src={`https://avatars.dicebear.com/api/initials/${name}.svg`}
        />
        <Text size="sm">{name}</Text>
      </Group>
    </UnstyledButton>
  );
};

export default ChannelItem;
