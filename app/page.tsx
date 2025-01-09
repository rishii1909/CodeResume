'use client';

import { SessionProvider as AuthSessionProvider } from 'next-auth/react';
import { Welcome } from '../components/Welcome/Welcome';

export default function HomePage() {
  return (
    <>
      <AuthSessionProvider>
        <Welcome />
      </AuthSessionProvider>
      {/* <ColorSchemeToggle /> */}
    </>
  );
}
