import { signIn } from 'next-auth/react';

export const handleGithubAuth = async () => {
  await signIn('github', {
    callbackUrl: process.env.VERCEL_URL ? `${process.env.VERCEL_URL}/` : '/',
  });
};
