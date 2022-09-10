import { gql } from '@apollo/client';
import {
  MessageEventFragment,
  useDeleteMessageMutation,
} from 'graphql/generated/graphql';
import IncomingEvent from '../IncomingEvent';
import OutgoingEvent from '../OutgoingEvent';
import { DeletedMessage } from './DeletedMessage';
import MessageActions from './MessageActions';
import MessageBubble from './MessageBubble';

gql`
  mutation DeleteMessage($messageId: HashId!) {
    deleteMessage(messageId: $messageId) {
      id
    }
  }
`;

type Props = {
  message: { __typename?: 'Message' | 'DeletedEvent' } & MessageEventFragment;
  displayAvatar: boolean;
};

export const Message = ({ message, displayAvatar }: Props) => {
  const [deleteMessage] = useDeleteMessageMutation();
  const messageContent =
    message.__typename === 'DeletedEvent' ? (
      <DeletedMessage iconSide={message.isCreator ? 'left' : 'right'} />
    ) : (
      <MessageBubble
        message={message}
        variant={message.isCreator ? 'light' : 'default'}
      />
    );

  if (message.isCreator) {
    return (
      <OutgoingEvent
        event={message}
        state={
          (message.id as string).startsWith('temp-id') ? 'sending' : 'sent'
        }
        children={messageContent}
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
      children={messageContent}
    />
  );
};

Message.fragments = {
  message: gql`
    fragment MessageEvent on Event {
      id
      isCreator
      ...OutgoingEvent
      ...IncomingEvent

      ... on Message {
        content
        ...MessageActions
      }
    }
    ${OutgoingEvent.fragments.event}
    ${IncomingEvent.fragments.event}
    ${MessageActions.fragments.message}
  `,
};
