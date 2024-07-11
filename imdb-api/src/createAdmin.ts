import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

const createAdmin = async () => {
  const adminExists = await prisma.user.findFirst({
    where: { role: 'admin' },
  });

  if (!adminExists) {
    const hashedPassword = await bcrypt.hash('adminpassword', 10);
    await prisma.user.create({
      data: {
        name: 'Admin',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin',
      },
    });
    console.log('Admin user created');
  } else {
    console.log('Admin user already exists');
  }
};

createAdmin()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
