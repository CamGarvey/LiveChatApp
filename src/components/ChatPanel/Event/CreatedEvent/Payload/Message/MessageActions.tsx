import { gql } from '@apollo/client';
import { MessageActionsEventFragment } from 'graphql/generated/graphql';
import DeleteEventAction from '../../../DeleteEventAction';

type Props = {
  event: MessageActionsEventFragment;
  onDelete: () => void;
};

const MessageActions = ({ event, onDelete }: Props) => {
  if (!event.isCreator) {
    return <></>;
  }
  return (
    <>
      <DeleteEventAction onDelete={onDelete} />
    </>
  );
};

MessageActions.fragments = {
  event: gql`
    fragment MessageActionsEvent on Event {
      id
      isCreator
    }
  `,
};

export default MessageActions;
