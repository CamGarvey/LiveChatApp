import { PrismaClient, User } from '@prisma/client';
import { users } from './data';

const loadUsers = async (prisma: PrismaClient) => {
  await prisma.user.createMany({
    data: users,
  });

  const otherUsers = await prisma.user.findMany();

  const masterUser = await prisma.user.create({
    data: {
      email: 'cam.garvey11@gmail.com',
      name: 'Cameron g',
      username: 'Camgaroo',
      friends: {
        connect: otherUsers.map(({ userId }) => ({ userId })),
      },
      friendsOf: {
        connect: otherUsers.map(({ userId }) => ({ userId })),
      },
    },
  });
  return { masterUser, otherUsers };
};

const loadChats = async (
  prisma: PrismaClient,
  { userId }: User,
  otherUsers: User[]
) => {
  const chatFun = await prisma.chat.create({
    data: {
      name: 'FUN',
      createdBy: {
        connect: {
          userId,
        },
      },
      messages: {
        create: [
          {
            content: 'Sup',
            createdById: userId,
          },
          {
            content: "yo! I'm having so much fun",
            createdById: otherUsers[0].userId,
          },
          {
            content: 'Yeah same here',
            createdById: userId,
          },
        ],
      },
      members: {
        connect: [{ userId }, ...otherUsers.map(({ userId }) => ({ userId }))],
      },
      isDM: false,
    },
  });
  const chatBoring = await prisma.chat.create({
    data: {
      name: 'BORING',
      createdBy: {
        connect: {
          userId,
        },
      },
      members: {
        connect: [{ userId }, ...otherUsers.map(({ userId }) => ({ userId }))],
      },
      messages: {
        create: [
          {
            content: 'Yo',
            createdById: userId,
          },
          {
            content: 'oh hey... im bored man',
            createdById: otherUsers[0].userId,
          },
          {
            content: 'Yeah same here',
            createdById: userId,
          },
        ],
      },
      isDM: false,
    },
  });
  return [chatFun, chatBoring];
};

const loadAll = async (prisma: PrismaClient) => {
  try {
    const { masterUser, otherUsers } = await loadUsers(prisma);
    await loadChats(prisma, masterUser, otherUsers);
    console.log('Database seeded');
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

loadAll(new PrismaClient());
