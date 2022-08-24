import { gql } from '@apollo/client';
import {
  MessageEventFragment,
  useDeleteMessageMutation,
} from 'graphql/generated/graphql';
import IncomingEvent from '../IncomingEvent';
import OutgoingEvent from '../OutgoingEvent';
import DeletedMessage from './DeletedMessage';
import MessageActions from './MessageActions';
import MessageBubble from './MessageBubble';

type Props = {
  message: MessageEventFragment;
  displayAvatar: boolean;
};

const Message = ({ message, displayAvatar }: Props) => {
  const [deleteMessage] = useDeleteMessageMutation();
  const messageContent =
    message.__typename === 'DeletedMessage' ? (
      <DeletedMessage />
    ) : (
      <MessageBubble
        content={message.content}
        variant={message.isCreator ? 'light' : 'default'}
      />
    );

  if (message.isCreator) {
    return (
      <OutgoingEvent
        {...message}
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
    fragment MessageEvent on Message {
      __typename
      id
      isCreator
      ... on InstantMessage {
        content
      }
      ...OutgoingEvent
      ...IncomingEvent
      ...MessageActions
    }
    ${OutgoingEvent.fragments.event}
    ${IncomingEvent.fragments.event}
    ${MessageActions.fragments.message}
  `,
};

export default Message;
