import React from 'react';
import DeleteEventAction from '../DeleteEventAction';

type MessageData = {
  __typename?: 'InstantMessage' | 'DeletedMessage';
  isCreator: boolean;
};

type Props = {
  data: MessageData;
  onDelete: () => void;
};

const MessageActions = ({ data, onDelete }: Props) => {
  if (data.__typename === 'DeletedMessage' || !data.isCreator) {
    return <></>;
  }
  return (
    <>
      <DeleteEventAction onDelete={onDelete} />
    </>
  );
};

export default MessageActions;
