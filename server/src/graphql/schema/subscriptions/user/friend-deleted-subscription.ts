import { withFilter } from 'graphql-subscriptions';
import { subscriptionField } from 'nexus';
import { Subscription } from '../../../backing-types';

export const friendDeletedSubscription = subscriptionField(
  'userFriendDeleted',
  {
    type: 'Me',
    description: 'Subscribe to unfriend events',
    subscribe: withFilter(
      (_, __, { pubsub }) =>
        pubsub.asyncIterator(Subscription.UserFriendDeleted),
      (payload, _, context) => {
        return payload.id === context.userId;
      }
    ),
    resolve(payload: any) {
      return payload;
    },
  }
);
