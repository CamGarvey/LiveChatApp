import { withFilter } from 'graphql-subscriptions';
import { subscriptionField } from 'nexus';
import { Event } from '@prisma/client';
import { hashIdArg } from '../shared';
import SubscriptionPayload from 'src/graphql/backing-types/subscription-payload';

export const EventsSubscription = subscriptionField('events', {
  type: 'Event',
  description: 'Subscribe to any created/updated/deleted events',
  args: {
    chatId: hashIdArg(),
  },
  authorize: (_, { chatId }, { auth }) =>
    chatId ? auth.canViewChat(chatId) : true,
  subscribe: async (rootValue, args, context) => {
    return withFilter(
      () => context.pubsub.asyncIterator('*.event', { pattern: true }),
      (payload: SubscriptionPayload<Event>, variables, context) => {
        if (variables.chatId) {
          return (
            payload.content.createdById !== context.userId &&
            payload.content.chatId == variables.chatId
          );
        }
        return payload.recipients.includes(context.userId);
      }
    )(rootValue, args, context);
  },
  resolve: (payload: SubscriptionPayload<Event>) => payload.content,
});

export const EventCreatedSubscription = subscriptionField('eventCreated', {
  type: 'Event',
  description: 'Subscribe to created events in chat',
  args: {
    chatId: hashIdArg(),
  },
  authorize: (_, { chatId }, { auth }) =>
    chatId ? auth.canViewChat(chatId) : true,
  subscribe: async (rootValue, args, context) => {
    return withFilter(
      () =>
        context.pubsub.asyncIterator('created.*.event', {
          pattern: true,
        }),
      (payload: SubscriptionPayload<Event>, variables, context) => {
        if (variables.chatId) {
          return (
            payload.content.createdById !== context.userId &&
            payload.content.chatId == variables.chatId
          );
        }
        return payload.recipients.includes(context.userId);
      }
    )(rootValue, args, context);
  },
  resolve: (payload: SubscriptionPayload<Event>) => payload.content,
});

export const EventDeletedSubscription = subscriptionField('eventDeleted', {
  type: 'DeletedEvent',
  description: 'Subscribe to deleted events in chat',
  args: {
    chatId: hashIdArg(),
  },
  authorize: (_, { chatId }, { auth }) =>
    chatId ? auth.canViewChat(chatId) : true,
  subscribe: async (rootValue, args, context) => {
    return withFilter(
      () =>
        context.pubsub.asyncIterator('deleted.*.event', {
          pattern: true,
        }),
      (payload: SubscriptionPayload<Event>, variables, context) => {
        if (variables.chatId) {
          return (
            payload.content.createdById !== context.userId &&
            payload.content.chatId == variables.chatId
          );
        }
        return payload.recipients.includes(context.userId);
      }
    )(rootValue, args, context);
  },
  resolve: (payload: SubscriptionPayload<Event>) => payload.content,
});

export const EventUpdatedSubscription = subscriptionField('eventUpdated', {
  type: 'Event',
  description: 'Subscribe to updated events in chat',
  args: {
    chatId: hashIdArg(),
  },
  authorize: (_, { chatId }, { auth }) =>
    chatId ? auth.canViewChat(chatId) : true,
  subscribe: async (rootValue, args, context) => {
    return withFilter(
      () =>
        context.pubsub.asyncIterator('updated.*.event', {
          pattern: true,
        }),
      (payload: SubscriptionPayload<Event>, variables, context) => {
        if (variables.chatId) {
          return (
            payload.content.createdById !== context.userId &&
            payload.content.chatId == variables.chatId
          );
        }
        return payload.recipients.includes(context.userId);
      }
    )(rootValue, args, context);
  },
  resolve: (payload: SubscriptionPayload<Event>) => payload.content,
});
