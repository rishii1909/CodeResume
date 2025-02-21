import NextAuth, { Account, Profile, SessionStrategy, User, type JWT } from 'next-auth';
import { nextAuthOptions } from './auth-options';

// Named export for the `GET` handler
export const GET = NextAuth(nextAuthOptions);

// Named export for the `POST` handler
export const POST = NextAuth(nextAuthOptions);
