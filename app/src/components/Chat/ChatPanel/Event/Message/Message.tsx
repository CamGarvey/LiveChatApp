import { gql } from '@apollo/client';
import {
  MessageEventFragment,
  useDeleteMessageMutation,
} from 'graphql/generated/graphql';
import IncomingEvent from '../IncomingEvent';
import OutgoingEvent from '../OutgoingEvent';
import MessageActions from './MessageActions';
import MessageBubble from './MessageBubble';

gql`
  mutation DeleteMessage($messageId: HashId!) {
    deleteEvent(eventId: $messageId) {
      id
    }
  }
`;

type Props = {
  message: { __typename?: 'Message' } & MessageEventFragment;
  displayAvatar: boolean;
};

export const Message = ({ message, displayAvatar }: Props) => {
  const [deleteMessage] = useDeleteMessageMutation();

  if (message.isCreator) {
    return (
      <OutgoingEvent
        event={message}
        state={
          (message.id as string).startsWith('temp-id') ? 'sending' : 'sent'
        }
        children={
          <MessageBubble
            message={message}
            variant={message.isCreator ? 'light' : 'default'}
          />
        }
        actions={
          <MessageActions
            message={message}
            onDelete={() => {
              deleteMessage({
                variables: {
                  messageId: message.id,
                },
              });
            }}
          />
        }
      />
    );
  }

  return (
    <IncomingEvent
      event={message}
      displayAvatar={displayAvatar}
      children={
        <MessageBubble
          message={message}
          variant={message.isCreator ? 'light' : 'default'}
        />
      }
    />
  );
};

Message.fragments = {
  message: gql`
    fragment MessageEvent on Message {
      id
      isCreator
      content
      ...OutgoingEvent
      ...IncomingEvent
      ...MessageActions
    }
    ${OutgoingEvent.fragments.event}
    ${IncomingEvent.fragments.event}
    ${MessageActions.fragments.message}
  `,
};
