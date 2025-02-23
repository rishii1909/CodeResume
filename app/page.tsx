'use client';

import { NextPage } from 'next';
import { SessionProvider as AuthSessionProvider } from 'next-auth/react';
import { LandingPage } from '../components/landing-page/landing-page';

const HomePage: NextPage = () => {
  return (
    <>
      <AuthSessionProvider>
        <LandingPage />
      </AuthSessionProvider>
      {/* <ColorSchemeToggle /> */}
    </>
  );
};

export default HomePage;
