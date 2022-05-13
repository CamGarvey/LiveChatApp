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
      friends: {
        connect: otherUsers.map((user) => ({ id: user.id })),
      },
      friendsOf: {
        connect: otherUsers.map((user) => ({ id: user.id })),
      },
    },
  });
  return { masterUser, otherUsers };
};

const loadChannels = async (
  prisma: PrismaClient,
  masterUser: User,
  otherUsers: User[]
) => {
  const channelFun = await prisma.channel.create({
    data: {
      name: 'FUN',
      createdBy: {
        connect: {
          id: masterUser.id,
        },
      },
      messages: {
        create: [
          {
            content: 'Sup',
            createdById: masterUser.id,
          },
          {
            content: "yo! I'm having so much fun",
            createdById: otherUsers[0].id,
          },
          {
            content: 'Yeah same here',
            createdById: masterUser.id,
          },
        ],
      },
      members: {
        connect: [
          { id: masterUser.id },
          ...otherUsers.map((user) => ({ id: user.id })),
        ],
      },
      isDM: false,
    },
  });
  const channelBoring = await prisma.channel.create({
    data: {
      name: 'BORING',
      createdBy: {
        connect: {
          id: masterUser.id,
        },
      },
      members: {
        connect: [
          { id: masterUser.id },
          ...otherUsers.map((user) => ({ id: user.id })),
        ],
      },
      messages: {
        create: [
          {
            content: 'Yo',
            createdById: masterUser.id,
          },
          {
            content: 'oh hey... im bored man',
            createdById: otherUsers[0].id,
          },
          {
            content: 'Yeah same here',
            createdById: masterUser.id,
          },
        ],
      },
      isDM: false,
    },
  });
  return [channelFun, channelBoring];
};

const loadAll = async (prisma: PrismaClient) => {
  try {
    const { masterUser, otherUsers } = await loadUsers(prisma);
    await loadChannels(prisma, masterUser, otherUsers);
    console.log('Database seedededed');
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

loadAll(new PrismaClient());
