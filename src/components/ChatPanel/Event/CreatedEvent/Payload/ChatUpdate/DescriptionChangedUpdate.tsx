import { gql } from '@apollo/client';
import { useMemo } from 'react';
import { ChatUpdate } from './ChatUpdate';
import { DescriptionChangedUpdateComponentFragment } from 'graphql/generated/graphql';

type Props = {
  update: DescriptionChangedUpdateComponentFragment;
};

const DescriptionChangedUpdate = ({ update }: Props) => {
  const message = useMemo(
    () => `${update.event.createdBy.username} set the group description ${update.descriptionAfter}`,
    [update]
  );
  return <ChatUpdate message={message} />;
};

DescriptionChangedUpdate.fragments = {
  update: gql`
    fragment DescriptionChangedUpdateComponent on DescriptionChangedUpdate {
      event {
        createdBy {
          id
          username
        }
      }
      descriptionAfter
    }
  `,
};

export default DescriptionChangedUpdate;
