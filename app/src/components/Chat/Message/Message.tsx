import { Group, Avatar, Loader, Tooltip } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useDeleteMessageMutation } from '../../../graphql/generated/graphql';
import MessageActions from './MessageActions';
import MessageBubble from './MessageBubble';
import MessageInfo from './MessageInfo';

type Message = {
  id: string;
  createdBy: {
    username: string;
  };
  createdAt: string;
};

type MessageProps =
  | {
      id: string;
      variant: 'outgoing';
      state: 'sending' | 'sent' | 'deleted';
      content?: string;
      createdBy: {
        username: string;
      };
      createdAt: string;
    }
  | {
      id: string;
      variant: 'incoming';
      state: 're' | 'deleted';
      hideAvatar?: boolean;
      content?: string;
      createdBy: {
        username: string;
      };
      createdAt: string;
    };

const MotionGroup = motion(Group);

const Message = (props: MessageProps) => {
  const [deleteMessage] = useDeleteMessageMutation();
  const [isHovered, setHovered] = useState(false);
  const largeScreen = useMediaQuery('(min-width: 1200px)');
  return (
    <Group
      pb={3}
      sx={{
        direction: props.variant === 'receiver' ? 'ltr' : 'rtl',
      }}
    >
      <Avatar
        size="md"
        src={`https://avatars.dicebear.com/api/initials/${props.createdBy.username}.svg`}
        style={{ marginTop: 'auto' }}
        hidden={props.variant === 'sender'}
        sx={{
          visibility:
            props.variant === 'receiver' && props.hideAvatar
              ? 'hidden'
              : 'visible',
        }}
      />
      <MotionGroup
        transition={{ delay: 1 }}
        style={{ maxWidth: largeScreen ? '600px' : '400px', gap: '3px' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Group spacing={5}>
          {props.variant === 'sender' && props.status === 'sending' && (
            <Tooltip label={'Sending...'} mt={'auto'}>
              <Loader size={8} />
            </Tooltip>
          )}
          <MessageBubble
            content={props.content}
            variant={props.variant === 'receiver' ? 'default' : 'light'}
          />

          <MotionGroup
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isHovered ? 1 : 0, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            spacing={2}
          >
            {props.variant === 'sender' && (
              <MessageActions
                onDelete={() => {
                  deleteMessage({
                    variables: {
                      messageId: props.id,
                    },
                    update: (cache, { data }) => {
                      // cache.readFragment()
                    },
                  });
                }}
              />
            )}
            <MessageInfo
              show={isHovered}
              createdBy={props.createdBy}
              createdAt={props.createdAt}
              isCreator={props.variant === 'sender'}
            />
          </MotionGroup>
        </Group>
      </MotionGroup>
    </Group>
  );
};
export default Message;
