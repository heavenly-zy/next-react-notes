import { PrismaClient } from '@prisma/client';
import { auth } from 'auth';

const globalForPrisma = global;

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function getAllNotes() {
  const session = await auth();
  if (session === null) return [];
  // 查找登录用户的笔记
  const notes = await prisma.note.findMany({
    where: {
      authorId: (session?.user as any)?.userId,
    },
  });
  // 构造返回数据
  const res: { [key: string]: string } = {};
  notes.forEach(({ title, content, id, updatedAt }) => {
    res[id] = JSON.stringify({
      title,
      content,
      updateTime: updatedAt,
    });
  });
  return res;
}

export async function addNote(data: string) {
  const session = await auth();
  const result = await prisma.note.create({
    data: {
      title: JSON.parse(data).title,
      content: JSON.parse(data).content,
      author: { connect: { id: (session?.user as any)?.userId } },
    },
  });

  return result.id;
}

export async function updateNote(uuid: string, data: string) {
  const parsedData = JSON.parse(data);
  await prisma.note.update({
    where: {
      id: uuid,
    },
    data: {
      title: parsedData.title,
      content: parsedData.content,
    },
  });
}

export async function getNote(uuid: string) {
  const session = await auth();
  if (session == null) return;
  const { title, content, updateTime, id } = await prisma.note.findFirst({
    where: {
      id: uuid,
    },
  }) as any;

  return {
    title,
    content,
    updateTime,
    id,
  };
}

export async function delNote(uuid: string) {
  await prisma.note.delete({
    where: {
      id: uuid,
    },
  });
}

export async function addUser(username: string, password: string) {
  const user = await prisma.user.create({
    data: {
      username,
      password,
      notes: {
        create: [],
      },
    },
  });

  return {
    name: username,
    username,
    userId: user.id,
  };
}

export async function getUser(username: string, password: string) {
  const user = await prisma.user.findFirst({
    where: {
      username,
    },
    include: {
      notes: true,
    },
  });
  if (!user) return 0;
  if (user.password !== password) return 1;
  return {
    name: username,
    username,
    userId: user.id,
  };
}

export default prisma;
