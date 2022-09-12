import { withFilter } from 'graphql-subscriptions';
import { subscriptionField } from 'nexus';
import { Event } from '@prisma/client';
import { hashIdArg } from '../shared';
import { Subscription, SubscriptionPayload } from '../../backing-types';

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
      () => context.pubsub.asyncIterator('event.*', { pattern: true }),
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
        context.pubsub.asyncIterator(Subscription.EventCreated, {
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
        context.pubsub.asyncIterator(Subscription.EventDeleted, {
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
        context.pubsub.asyncIterator(Subscription.EventUpdated, {
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
