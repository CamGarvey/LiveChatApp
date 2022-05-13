import { withFilter } from 'graphql-subscriptions';
import { intArg, nonNull, objectType, subscriptionField } from 'nexus';
import Message from '../types/message';
import { Subscriptions } from '../types/subscriptions';

const newMessagePayload = objectType({
  name: 'NewMessagePayload',
  definition(t) {
    t.nonNull.int('channelId');
    t.nonNull.field('message', {
      type: Message,
    });
  },
});

export const newMessageSubscription = subscriptionField('newMessage', {
  type: newMessagePayload,
  args: {
    channelId: nonNull(intArg()),
  },
  subscribe: withFilter(
    (_, __, { pubsub }) => pubsub.asyncIterator(Subscriptions.NEW_MESSAGE),
    (payload, variables) => {
      return payload.channelId === variables.channelId;
    }
  ),
  resolve(payload: any) {
    console.log(payload);

    return payload;
  },
});
