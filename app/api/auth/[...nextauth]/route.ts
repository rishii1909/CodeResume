import NextAuth, { Account, Profile, SessionStrategy, User, type JWT } from 'next-auth';
import { nextAuthOptions } from './auth-options';

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
