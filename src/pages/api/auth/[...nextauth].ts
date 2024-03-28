import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';

const prisma = new PrismaClient();

export const authOptions = {
  Adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: 'test',
      clientSecret: 'test',
    }),
  ],
};

export default NextAuth(authOptions);
