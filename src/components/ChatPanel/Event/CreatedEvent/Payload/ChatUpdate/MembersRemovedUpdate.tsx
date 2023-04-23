import { gql } from '@apollo/client';
import { useMemo } from 'react';
import { ChatUpdate } from './ChatUpdate';
import { userDesc } from './user-desc';
import { MembersRemovedUpdateComponentFragment } from 'graphql/generated/graphql';

type Props = {
  update: MembersRemovedUpdateComponentFragment;
};

const MembersRemovedUpdate = ({ update }: Props) => {
  const message = useMemo(() => {
    const createdBy = update.event.createdBy;
    if (update.members.length === 1 && update.members[0].user.id === createdBy) {
      return `${createdBy.username} left the group`;
    }
    return `${createdBy.username} removed ${userDesc(
      update.members.map((x) => x.user)
    )} from the group`;
  }, [update]);
  return <ChatUpdate message={message} />;
};

MembersRemovedUpdate.fragments = {
  update: gql`
    fragment MembersRemovedUpdateComponent on MembersRemovedUpdate {
      event {
        createdBy {
          id
          username
        }
      }
      members {
        user {
          id
          username
        }
      }
    }
  `,
};

export default MembersRemovedUpdate;
