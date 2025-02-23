import { NextResponse } from 'next/server';
import { Octokit } from '@octokit/rest';
import { getServerSession } from 'next-auth/next';
import { nextAuthOptions } from '../auth/[...nextauth]/auth-options';

export async function GET(req: Request) {
  const session = await getServerSession({ req, ...nextAuthOptions }); // Use this format

  if (!session || !session.accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const octokit = new Octokit({
    auth: session.accessToken, // Use the access token
  });

  try {
    const { data } = await octokit.request('GET /user/repos');
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch repositories' }, { status: 500 });
  }
}
