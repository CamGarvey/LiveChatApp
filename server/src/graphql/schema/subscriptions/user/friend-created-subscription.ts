import { withFilter } from 'graphql-subscriptions';
import { subscriptionField } from 'nexus';
import { Subscription } from '../../../backing-types';

export const friendCreatedSubscription = subscriptionField(
  'userFriendCreated',
  {
    type: 'Me',
    description: 'Subscribe to new friends',
    subscribe: withFilter(
      (_, __, { pubsub }) =>
        pubsub.asyncIterator(Subscription.UserFriendCreated),
      (payload, _, context) => {
        return payload.id === context.userId;
      }
    ),
    resolve(payload: any) {
      return payload;
    },
  }
);
