import { connectionFromArraySlice, cursorToOffset } from 'graphql-relay';
import { objectType } from 'nexus';
import Message from './message';
import { DateScalar } from './scalars';
import User from './user';

// id          Int       @id @default(autoincrement())
// name        String
// updatedAt   DateTime  @updatedAt
// createdAt   DateTime  @default(now())
// createdBy   User      @relation("UserCreatedByChannel", fields: [createdById], references: [id])
// createdById Int
// isDM        Boolean
// members     User[]    @relation("UserMemberOfChannels", references: [id])
// messages    Message[] @relation("ChannelMessagesMessage")

const Channel = objectType({
  name: 'Channel',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.string('name');
    t.nonNull.field('createdAt', {
      type: DateScalar,
    });
    t.nonNull.field('updatedAt', {
      type: DateScalar,
    });
    t.nonNull.field('createBy', {
      type: User,
      resolve: (parent, _, { prisma }) => {
        return prisma.user.findUnique({
          where: {
            id: parent.id,
          },
        });
      },
    });
    t.nonNull.connectionField('messages', {
      type: Message,
      resolve: async (_, { after, first }, { prisma }) => {
        const offset = after ? cursorToOffset(after) + 1 : 0;
        if (isNaN(offset)) throw new Error('cursor is invalid');

        const [totalCount, items] = await Promise.all([
          prisma.message.count(),
          prisma.message.findMany({
            take: first,
            skip: offset,
          }),
        ]);

        return connectionFromArraySlice(
          items,
          { first, after },
          { sliceStart: offset, arrayLength: totalCount }
        );
      },
    });
    t.nonNull.boolean('isDM');
    t.nonNull.list.nonNull.field('members', {
      type: User,
      resolve: (parent, _, { prisma }) => {
        return prisma.channel
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .members();
      },
    });
  },
});

export default Channel;
