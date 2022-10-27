import { gql } from '@apollo/client';
import { Aside, ScrollArea, Stack } from '@mantine/core';
import { UserAvatar } from 'components/shared/Avatars';
import { useScroller } from 'components/shared/Scroller/useScroller';
import { AvatarSectionUserFragment } from 'graphql/generated/graphql';
import { useRef } from 'react';

type Props = {
  users: AvatarSectionUserFragment[];
  onHitBottom: () => void;
  loading: boolean;
};

export const AvatarSection = ({ users, loading, onHitBottom }: Props) => {
  const viewport = useRef<HTMLDivElement>(null);

  useScroller({
    viewport,
    onHitBottom,
  });

  return (
    <Aside.Section
      component={ScrollArea}
      viewportRef={viewport}
      type={'never'}
      grow
    >
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
};

AvatarSection.fragments = {
  users: gql`
    fragment AvatarSectionUser on User {
      ...UserAvatar
    }
    ${UserAvatar.fragments.user}
  `,
};
