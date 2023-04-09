import { gql } from '@apollo/client';
import { MessageActionsFragment } from 'graphql/generated/graphql';
import DeleteEventAction from '../../../DeleteEventAction';

type Props = {
  message: MessageActionsFragment;
  onDelete: () => void;
};

const MessageActions = ({ message, onDelete }: Props) => {
  if (!message.isCreator) {
    return <></>;
  }
  return (
    <>
      <DeleteEventAction onDelete={onDelete} />
    </>
  );
};

MessageActions.fragments = {
  message: gql`
    fragment MessageActions on Event {
      id
      isCreator
    }
  `,
};

export default MessageActions;
