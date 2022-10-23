import { gql } from '@apollo/client';
import { Aside, ScrollArea, Stack } from '@mantine/core';
import { UserAvatar } from 'components/shared/Avatars';
import { AvatarSectionUserFragment } from 'graphql/generated/graphql';

type Props = {
  users: AvatarSectionUserFragment[];
  loading: boolean;
};

export const AvatarSection = ({ users, loading }: Props) => (
  <Aside.Section component={ScrollArea} type={'never'} grow>
    <Stack>
      {loading ? (
        <>
          {[...Array(5)].map((_, idx) => (
            <UserAvatar key={idx} loading={true} />
          ))}
        </>
      ) : (
        users.map((user) => <UserAvatar key={user.id} user={user} />)
      )}
    </Stack>
  </Aside.Section>
);

AvatarSection.fragments = {
  users: gql`
    fragment AvatarSectionUser on User {
      ...UserAvatar
    }
    ${UserAvatar.fragments.user}
  `,
};
