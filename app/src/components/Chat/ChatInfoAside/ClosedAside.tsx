import { gql } from '@apollo/client';
import { Aside, ScrollArea, Stack } from '@mantine/core';
import UserAvatar from 'components/shared/UserAvatar';
import { ClosedAsideChatFragment } from 'graphql/generated/graphql';
import ArrowAvatar from './ArrowAvatar';

type Props = {
  chat: ClosedAsideChatFragment;
  onOpen: () => void;
};

const ClosedAside = ({ chat, onOpen }: Props) => {
  if (chat.__typename === 'GroupChat') {
    return (
      <>
        <Aside.Section>
          <ArrowAvatar dir={'left'} onClick={onOpen} />
        </Aside.Section>
        <Aside.Section component={ScrollArea} type={'never'} grow>
          <Stack py={'xs'}>
            {chat.members.map((member) => (
              <UserAvatar user={member} />
            ))}
          </Stack>
        </Aside.Section>
      </>
    );
  }
  return <></>;
};

ClosedAside.fragments = {
  chat: gql`
    fragment ClosedAsideChat on Chat {
      ... on DirectMessageChat {
        friend {
          ...UserAvatar
        }
      }
      ... on GroupChat {
        members {
          ...UserAvatar
        }
      }
    }
    ${UserAvatar.fragments.user}
  `,
};

export default ClosedAside;
