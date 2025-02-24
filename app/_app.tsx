// app/_app.tsx
import { AppProps } from 'next/app.js';
import { SessionProvider, useSession } from 'next-auth/react';
import { useAuthStore } from '../stores/auth.store';

import '@mantine/charts/styles.css';

function MyApp({ Component, pageProps }: AppProps) {
  const { data: session, status } = useSession();
  const setUser = useAuthStore((state) => state.setUser);

  if (status === 'authenticated') {
    setUser(session.user);
  }

  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
