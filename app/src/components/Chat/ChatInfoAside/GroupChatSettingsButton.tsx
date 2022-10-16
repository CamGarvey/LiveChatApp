import { gql } from '@apollo/client';
import { Container, Stack, Text, UnstyledButton } from '@mantine/core';
import { IconSettings } from '@tabler/icons';
import { useUpdateGroupChatModal } from 'components/Modals/UpdateGroupChatModal';
import { GroupChatSettingsButtonChatFragment } from 'graphql/generated/graphql';

type Props = {
  chat: GroupChatSettingsButtonChatFragment;
};

const GroupChatSettingsButton = ({ chat }: Props) => {
  const open = useUpdateGroupChatModal();
  return (
    <UnstyledButton
      onClick={() => open({ chatId: chat.id })}
      sx={(theme) => ({
        display: 'flex',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        gap: '20px',
        color:
          theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        alignItems: 'center',
        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
        },
      })}
    >
      <Stack spacing={1}>
        <Text>{chat.name}</Text>
        {chat.description && (
          <Text
            size={'xs'}
            color={'dimmed'}
            sx={{
              whiteSpace: 'nowrap',
            }}
          >
            {chat.description}
          </Text>
        )}
      </Stack>
      <Container pr={0} mr={0}>
        <IconSettings />
      </Container>
    </UnstyledButton>
  );
};

GroupChatSettingsButton.fragments = {
  chat: gql`
    fragment GroupChatSettingsButtonChat on GroupChat {
      id
      name
      description
    }
  `,
};

export default GroupChatSettingsButton;
