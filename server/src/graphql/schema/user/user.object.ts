import { objectType } from 'nexus';

export const Friend = objectType({
  name: 'Friend',
  definition: (t) => {
    t.implements('UserInterface', 'KnownUserInterface');
  },
});

export const Me = objectType({
  name: 'Me',
  definition: (t) => {
    t.implements('UserInterface', 'KnownUserInterface');
    t.nonNull.list.nonNull.field('receivedFriendRequests', {
      type: 'Stranger',
      resolve: (parent, _, { prisma }) => {
        return prisma.user
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .receivedFriendRequests();
      },
    });
  },
});

export const Stranger = objectType({
  name: 'Stranger',
  definition: (t) => {
    t.implements('UserInterface');
  },
});
