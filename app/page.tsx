'use client';

import { AppProps } from 'next/app';
import { SessionProvider as AuthSessionProvider } from 'next-auth/react';
import { LandingPage } from '../components/landing-page/landing-page';
import { Welcome } from '../components/Welcome/Welcome';

export default function HomePage({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthSessionProvider>
        <LandingPage />
      </AuthSessionProvider>
      {/* <ColorSchemeToggle /> */}
    </>
  );
}
