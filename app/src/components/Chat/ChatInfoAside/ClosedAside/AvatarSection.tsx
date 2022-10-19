import { gql } from '@apollo/client';
import { Stack } from '@mantine/core';
import UserAvatar from 'components/shared/UserAvatar';
import { AvatarSectionUserFragment } from 'graphql/generated/graphql';

type Props = {
  users: AvatarSectionUserFragment[];
  loading: boolean;
};

const AvatarSection = ({ users, loading }: Props) => (
  <Stack py={'xs'}>
    {loading ? (
      <>
        {[...Array(5)].map(() => (
          <UserAvatar loading={true} />
        ))}
      </>
    ) : (
      users.map((user) => <UserAvatar user={user} />)
    )}
  </Stack>
);

AvatarSection.fragments = {
  users: gql`
    fragment AvatarSectionUser on User {
      ...UserAvatar
    }
    ${UserAvatar.fragments.user}
  `,
};

export default AvatarSection;
