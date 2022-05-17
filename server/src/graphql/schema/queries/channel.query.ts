import { ForbiddenError } from 'apollo-server-core';
import { connectionFromArraySlice, cursorToOffset } from 'graphql-relay';
import { extendType, intArg, nonNull } from 'nexus';
import Channel from '../types/channel';
import Message from '../types/message';

export const channelMessages = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.connectionField('channelMessages', {
      type: Message,
      additionalArgs: {
        channelId: nonNull(
          intArg({
            description: 'If set, filters users by given filter',
          })
        ),
      },
      resolve: async (_, { channelId, after, first }, { prisma, userId }) => {
        const members = await prisma.channel
          .findUnique({
            where: {
              id: channelId,
            },
          })
          .members();

        if (!members.find((member) => member.id == userId)) {
          throw new ForbiddenError(
            'You do not have permission to this channel'
          );
        }

        const offset = after ? cursorToOffset(after) + 1 : 0;
        if (isNaN(offset)) throw new Error('cursor is invalid');

        const [totalCount, items] = await Promise.all([
          prisma.message.count({
            where: {
              channelId,
            },
          }),
          prisma.message.findMany({
            take: first,
            skip: offset,
            where: {
              channelId,
            },
          }),
        ]);

        return connectionFromArraySlice(
          items,
          { first, after },
          { sliceStart: offset, arrayLength: totalCount }
        );
      },
    });
  },
});

// export const openChannels = extendType({
//   type: 'Query',
//   definition(t) {
//     t.nonNull.list.nonNull.field('openChannels', {
//       type: Channel,
//       resolve: async (_, __, {prisma, userId}) => {
//         await prisma.channel.findMany({
//           where: {
//             members: {

//             }
//           }
//         })
//       }
//     })
//   }
// });
