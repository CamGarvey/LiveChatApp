import { PrismaClient } from '@prisma/client';
import { IAuth } from 'src/graphql/context.interface';

export class Auth implements IAuth {
  constructor(private prisma: PrismaClient) {}

  canViewChat = async (chatId: string) => {
    const user = await this.prisma.user.findUnique({
      select: {
        memberOfChats: {
          where: {
            id: chatId,
          },
        },
      },
      where: {
        id: this.userId,
      },
    });
    return user.memberOfChats.length !== 0;
  };
}
