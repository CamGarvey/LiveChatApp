import { mutationField, nonNull } from 'nexus';
import { hashIdArg } from '../../shared';

export const AcknowledgeAlertMutation = mutationField('acknowledgeAlert', {
  type: 'Alert',
  args: {
    alertId: nonNull(hashIdArg()),
  },
  resolve: async (_, { alertId }, { prisma, userId }) => {
    const alert = await prisma.alert.update({
      data: {
        recipients: {
          disconnect: {
            id: userId,
          },
        },
      },
      include: {
        recipients: {
          select: {
            id: true,
          },
        },
      },
      where: {
        id: alertId,
      },
    });

    // If there are no more recipients (everyone has acknowledged)
    // then delete the alert
    if (alert.recipients.length === 0) {
      await prisma.alert.delete({
        where: {
          id: alertId,
        },
      });
    }

    return alert;
  },
});
