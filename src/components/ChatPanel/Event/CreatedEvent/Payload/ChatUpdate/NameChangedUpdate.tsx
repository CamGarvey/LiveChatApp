import { gql } from '@apollo/client';
import { useMemo } from 'react';
import { ChatUpdate } from './ChatUpdate';
import { NameChangedUpdateComponentFragment } from 'graphql/generated/graphql';

type Props = {
  update: NameChangedUpdateComponentFragment;
};

const NameChangedUpdate = ({ update }: Props) => {
  const message = useMemo(
    () => `${update.event.createdBy.username} named the group ${update.nameAfter}`,
    [update]
  );
  return <ChatUpdate message={message} />;
};

NameChangedUpdate.fragments = {
  update: gql`
    fragment NameChangedUpdateComponent on NameChangedUpdate {
      event {
        createdBy {
          id
          username
        }
      }
      nameAfter
    }
  `,
};

export default NameChangedUpdate;
