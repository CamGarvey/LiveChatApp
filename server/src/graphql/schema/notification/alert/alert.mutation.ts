import { mutationField, nonNull } from 'nexus';
import { hashIdArg } from '../../shared';

export const AcknowledgeAlertMutation = mutationField('acknowledgeAlert', {
  type: 'Alert',
  args: {
    alertId: nonNull(hashIdArg()),
  },
  resolve: async (_, { alertId }, { prisma, userId }) => {
    return await prisma.alert.update({
      data: {
        seenBy: {
          connect: {
            id: userId,
          },
        },
      },
      where: {
        id: alertId,
      },
    });
  },
});
