import { objectType } from 'nexus';
import Channel from './channel';
import { DateScalar } from './scalars';
import User from './user';

const Message = objectType({
  name: 'Message',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.string('content');
    t.nonNull.field('createdAt', {
      type: DateScalar,
    });
    t.nonNull.int('createdById');
    t.nonNull.field('createdBy', {
      type: User,
      resolve: (parent, _, { prisma }) => {
        return prisma.user.findUnique({
          where: {
            id: parent.createdById,
          },
        });
      },
    });
    t.nonNull.list.nonNull.field('likedBy', {
      type: User,
      resolve: (parent, _, { prisma }) => {
        return prisma.message
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .likedBy();
      },
    });
    t.nonNull.field('updatedAt', {
      type: DateScalar,
    });
    t.nonNull.field('channel', {
      type: Channel,
      resolve: (parent, _, { prisma }) => {
        return prisma.channel.findUnique({
          where: {
            id: parent.id,
          },
        });
      },
    });
  },
});

export default Message;
