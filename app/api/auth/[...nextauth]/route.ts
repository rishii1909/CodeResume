import NextAuth, { Account, Profile, SessionStrategy, User, type JWT } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

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
      // when user comes back after SignIn, we make sure to save the accessToken from
      // the logged user, otherwise it would be discarded. We need to make API calls to Github API
      // on behalf of the logged user, so here we persist the token, since its gonna be needed.
      if (user && account && account.provider === 'github') {
        const t = token as any;
        t.username = (profile as any).login; // save the github username
        (t.githubAccessToken = account.accessToken), // get the github accessToken from the user who signed in
          (t.randomStuff = 'anything you want');
        return Promise.resolve(t);
      }

      return undefined;
    },
  },
};

// Named export for the `GET` handler
export const GET = NextAuth(nextAuthOptions);

// Named export for the `POST` handler
export const POST = NextAuth(nextAuthOptions);
