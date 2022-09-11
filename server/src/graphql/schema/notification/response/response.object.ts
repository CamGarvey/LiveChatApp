import { objectType } from 'nexus';

export const FriendRequestResponse = objectType({
  name: 'FriendRequestResponse',
  definition: (t) => {
    t.implements('Response');
    t.nonNull.field('status', {
      type: 'ResponseStatus',
    });
  },
});
