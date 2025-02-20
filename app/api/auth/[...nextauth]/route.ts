import NextAuth, { Account, Profile, SessionStrategy, User, type JWT } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import useAuthStore from '@/stores/auth.store';

export const nextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
    encryption: true, // this is extremely important, because the Github accessToken is being stored inside the JWT.
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      // scope: 'user repo', // add your own
    }),
  ],
  callbacks: {
    jwt: async ({
      token,
      user,
      account,
      profile,
    }: {
      token: any;
      user: User;
      account: Account | null;
      profile?: Profile;
    }) => {
      if (user) {
        // Save the user to our auth store
        const authStore = useAuthStore.getState();
        authStore.setUser(user);
      }
      if (user && account && account.provider === 'github') {
        const t = token as any;
        t.username = (profile as any).login; // save the github username
        (t.githubAccessToken = account.accessToken), // get the github accessToken from the user who signed in
          (t.randomStuff = 'anything you want');
        return Promise.resolve(t);
      }

      return Promise.resolve({}); // return an empty token object
    },
  },
};

// Named export for the `GET` handler
export const GET = NextAuth(nextAuthOptions);

// Named export for the `POST` handler
export const POST = NextAuth(nextAuthOptions);
