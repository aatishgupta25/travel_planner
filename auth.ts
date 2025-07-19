// import NextAuth from "next-auth";
// import GitHub from 'next-auth/providers/github';
// import { prisma } from './lib/prisma';
// import {PrismaAdapter} from '@auth/prisma-adapter';

// export const {auth, handlers, signIn, signOut} = NextAuth({
//     providers: [GitHub],
//     adapter: PrismaAdapter(prisma)

// });

// auth.ts
import NextAuth from "next-auth";
import { authConfig } from "./auth.config"; // import config to use explicitly

export const { auth, handlers, signIn, signOut } = NextAuth(authConfig);
