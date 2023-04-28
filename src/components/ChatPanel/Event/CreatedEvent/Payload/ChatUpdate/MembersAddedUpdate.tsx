import { gql } from '@apollo/client';
import { useMemo } from 'react';
import { ChatUpdate } from './ChatUpdate';
import { buildUserDescription } from './user-desc';
import { MembersAddedUpdateComponentFragment } from 'graphql/generated/graphql';

type Props = {
  update: MembersAddedUpdateComponentFragment;
};

const MembersAddedUpdate = ({ update }: Props) => {
  const message = useMemo(
    () =>
      `${update.event.createdBy.username} added ${buildUserDescription(
        update.members.map((x) => x.user)
      )} to the group`,
    [update]
  );

  return <ChatUpdate message={message} />;
};

MembersAddedUpdate.fragments = {
  update: gql`
    fragment MembersAddedUpdateComponent on MembersAddedUpdate {
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

export default MembersAddedUpdate;
