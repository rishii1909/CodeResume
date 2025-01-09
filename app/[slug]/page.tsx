import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { CircleStackIcon } from '@heroicons/react/24/solid';
import { Octokit } from '@octokit/rest';
import { IconBrandGit } from '@tabler/icons-react';
import axios from 'axios';
import millify from 'millify';
import { getServerSession } from 'next-auth';
import { usePDF } from 'react-to-pdf';
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  GridCol,
  List,
  ListItem,
  Progress,
  ProgressLabel,
  ProgressRoot,
  ProgressSection,
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { githubLanguageColors } from '@/utils/github';
import { nextAuthOptions } from '../api/auth/[...nextauth]/route';
import { DownloadButton } from './download-button';

dayjs.extend(relativeTime);

export default async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug: username } = await params;

  const octokit = new Octokit({
    auth: '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',
  });

  try {
    const { data } = await axios.post('http://localhost:8000/generate-resume', { username });

    const { userData, reposData } = data;

    console.log({ userData, reposData });

    // Step 5: Generate language-wise metrics
    const languageMetrics = generateLanguageMetrics(reposData);

    const getStringFromCount = (noun: string, count: number, pluralNoun?: string) => {
      if (count === 0) return `No ${noun}s`;
      if (count === 1) return `1 ${noun}`;

      return `${count} ${pluralNoun ?? `${noun}s`}`;
    };

    const userStats = [
      `${getStringFromCount('Follower', userData.followersCount)}`,
      `${getStringFromCount('Public Repository', userData.publicReposCount, 'Public Repositories')}`,
      `${getStringFromCount('Public Gist', userData.publicGistsCount)}`,
      `${getStringFromCount('Star', userData.starsCount)}`,
    ];

    console.log(reposData);

    return (
      <div className="p-4 flex flex-col space-y-3">
        <div className="p-4 flex flex-col space-y-3">
          <div className="flex space-x-4 justify-between">
            <Title>{username}'s Github Resume</Title>
            {/* <DownloadButton username={username} /> */}
          </div>
          <Text>Showcasing metrics based on your past Github contributions </Text>
        </div>
        <div>
          <Grid>
            <GridCol className="py-4 px-8 border-slate-200 border-solid border" span={6}>
              <div className="flex flex-col space-y-6">
                <Title order={2}>{username}'s stats</Title>
                <Grid>
                  {userStats.map((userStat) => (
                    <GridCol span={6}>
                      <div className="flex space-x-2">
                        <IconBrandGit /> <Text>{userStat}</Text>
                      </div>
                    </GridCol>
                  ))}
                </Grid>
              </div>
            </GridCol>
            <GridCol span={6} className="py-4 px-8 border-slate-200 border-solid border">
              <Title order={2}>Top 5 Languages</Title>
              <Divider className="my-2" />
              {/* <Select placeholder="Sort languages" data={sortLanguagesOptions} onChange={(_val, option) => } /> */}
              <Table>
                <TableThead>
                  <TableTr>
                    <TableTh className="text-xs">Language</TableTh>
                    <TableTh className="text-xs">Usage in active repos</TableTh>

                    <TableTh className="text-xs">LoC over past 6 months</TableTh>
                    <TableTh className="text-xs">LoC till date</TableTh>
                  </TableTr>
                </TableThead>
                <TableTbody>
                  {Object.keys(languageMetrics)
                    .sort((a, b) =>
                      languageMetrics[a].totalLoc < languageMetrics[b].totalLoc ? 1 : -1
                    )
                    .slice(0, 5)
                    .map((lang) => (
                      <TableTr>
                        <TableTd className="text-xs font-bold">{lang}</TableTd>
                        <TableTd>{languageMetrics[lang].activeRepos} repos</TableTd>
                        <TableTd>{millify(languageMetrics[lang].locLastSixMonths)} LoC</TableTd>
                        <TableTd>{millify(languageMetrics[lang].totalLoc)} LoC</TableTd>
                      </TableTr>
                    ))}
                </TableTbody>
              </Table>
            </GridCol>
          </Grid>
          <div className="flex flex-col p-4 space-x-2 justify-between">
            <div className="flex flex-col justify-start items-start">
              <Title order={2}>Repositories</Title>
              <div className="flex flex-col w-full text-xs space-y-2">
                {Object.keys(reposData)
                  .sort((a, b) => (reposData[a].lastPushedAt < reposData[b].lastPushedAt ? 1 : -1))
                  .map((repoName, index) => {
                    const totalLanguagesLoc = (
                      Object.values(reposData[repoName].languages) as number[]
                    ).reduce((a, b) => a + b, 0);

                    return (
                      <div key={index} className="py-3 px-5">
                        <div>
                          <Title order={4}>{repoName}</Title>
                          <div className="flex flex-col space-y-3">
                            <Text c="dimmed" className=" text-sm">
                              Most recent contribution made to repo{' '}
                              {dayjs(reposData[repoName].lastPushedAt).fromNow().toString()}
                            </Text>
                            <Text>
                              <Divider className="my-1" />
                              <ProgressRoot size={18}>
                                {Object.keys(reposData[repoName].languages).map(
                                  (language, index) => {
                                    const langPercentage = Math.round(
                                      (reposData[repoName].languages[language] /
                                        totalLanguagesLoc) *
                                        100
                                    );

                                    return (
                                      <ProgressSection
                                        striped
                                        className="border border-solid border-zinc-200"
                                        color={(githubLanguageColors as any)[language]}
                                        value={langPercentage}
                                      >
                                        <ProgressLabel>
                                          <Tooltip
                                            opened
                                            withArrow
                                            arrowRadius={10}
                                            label={`${language} ${langPercentage}%`}
                                          >
                                            <span className=" italic">
                                              {/* {lang} */}
                                              {/* {millify(reposData[repoName].languages[language])} LOC */}
                                            </span>
                                          </Tooltip>
                                        </ProgressLabel>
                                      </ProgressSection>
                                    );
                                  }
                                )}
                              </ProgressRoot>
                            </Text>
                            <List listStyleType="disc" type="ordered" spacing="sm">
                              {reposData[repoName].summary.map(
                                (summaryLine: string, index: number) => (
                                  <ListItem key={index}>
                                    <Text
                                      dangerouslySetInnerHTML={{
                                        __html: summaryLine.replace(
                                          /<a /g,
                                          '<a class="underline text-blue-600 hover:text-blue-800 visited:text-purple-600" '
                                        ),
                                      }}
                                      className="text-sm min-w-96 w-4/5"
                                    />
                                  </ListItem>
                                )
                              )}
                            </List>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          {/* <div className="flex space-x-4">
          <div className="flex flex-col space-y-3 justify-center items-center min-w-fit">
            <Avatar
              src={userData.avatar_url}
              size="xl"
              className="shadow-md border-2 border-solid border-slate-200"
              radius="lg"
            />
            <Link href={userData.html_url}>
              <Badge className="cursor-pointer w-full">@{userData.login}</Badge>
            </Link>
          </div>
          <Divider orientation="vertical" />
          <div className="flex flex-col space-y-1 justify-center w-full">
            <Text className="font-bold text-2xl">{userData.name}</Text>
            <Text className="text-sm font-light italic">{userData.bio}</Text>
            <Text className="text-sm font-light w-full text-right text-slate-400">
              Joined Github {dayjs().to(userData.created_at)}.
            </Text>
          </div>
        </div> */}
          {/* <Divider />
        <div className="flex flex-col space-y-6 px-3">
          <Text size="lg" className="underline font-bold">
            Stats
          </Text>
          <Grid
            classNames={{
              col: 'shadow-lg border-slate-400 bg-gradient-to-r p-4 flex flex-col items-end space-y-1',
            }}
          >
            <GridCol
              className="from-violet-500 to-indigo-500 rounded-l-md border border-solid border-r-white"
              span={3}
            >
              <Text className="text-6xl font-bold text-white">{userData.public_repos}</Text>
              <Text className="text-white font-semibold">Public Repositories</Text>
            </GridCol>
            <GridCol
              className="from-indigo-500 to-blue-500 border border-solid border-r-white"
              span={3}
            >
              <Text className="text-6xl font-bold text-white">{contributions}</Text>
              <Text className="text-white font-semibold">Contributions in past year</Text>
            </GridCol>
            <GridCol
              className="from-blue-500 to-cyan-500 border border-solid border-r-white"
              span={3}
            >
              <Text className="text-6xl font-bold text-white">{userData.followers}</Text>
              <Text className="text-white font-semibold">Followers</Text>
            </GridCol>
            <GridCol className="from-cyan-500 to-teal-500 rounded-r-md" span={3}>
              <Text className="text-6xl font-bold text-white">{userData.following}</Text>
              <Text className="text-white font-semibold">Following</Text>
            </GridCol>
          </Grid>
          <Divider />
          <Image src={`https://ghchart.rshah.org/${username}`} />
        </div>
        <Divider />
        <div className="flex flex-col space-y-6 px-3">
          <Text size="lg" className="underline font-bold">
            Popular Repos
          </Text>
        </div>

        {!!userData ? (
          <pre>{JSON.stringify(userData, null, 2)}</pre>
        ) : (
          <p>No user data available.</p>
        )} */}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching repository metrics:', error);
  }
};

async function getTotalContributions(username: string, octokit: Octokit) {
  const query = `
    query($username: String!, $from: DateTime!, $to: DateTime!) {
  user(login: $username) {
    contributionsCollection(from: $from, to: $to) {
      totalCommitContributions
      totalRepositoryContributions
      totalPullRequestContributions
      totalPullRequestReviewContributions
      totalIssueContributions
    }
  }
}
  `;

  const variables = {
    username,
    from: '2022-01-01T00:00:00Z', // Adjust based on your timeframe
    to: '2022-12-31T23:59:59Z',
  };

  try {
    const response = (await octokit.graphql(query, variables)) as any;
    const contributions = response.user.contributionsCollection;
    const totalContributions =
      contributions.totalCommitContributions +
      contributions.totalRepositoryContributions +
      contributions.totalPullRequestContributions +
      contributions.totalPullRequestReviewContributions +
      contributions.totalIssueContributions;

    return totalContributions;
  } catch (error) {
    console.error('Error fetching contributions:', error);
    throw error;
  }
}

function generateLanguageMetrics(repoStats: any[]) {
  const languageMetrics: Record<string, any> = {};

  let totalLocAcrossAllLanguages = 0;

  Object.values(repoStats).forEach((repo) => {
    // Loop over each language used in the repo
    Object.keys(repo.languages).forEach((language) => {
      if (!languageMetrics[language]) {
        languageMetrics[language] = {
          totalLoc: 0,
          locLastMonth: 0,
          locLastSixMonths: 0,
          activeRepos: 0,
        };
      }

      // Update the total LOC for the language
      languageMetrics[language].totalLoc += repo.languages[language];

      // Track LOC for the last month and last 6 months
      const now = new Date();
      const lastMonth = new Date(now.setMonth(now.getMonth() - 1));
      const lastSixMonths = new Date(now.setMonth(now.getMonth() - 6));

      // Ensure `lastCommitDate` is present in the repository stats and is a valid date
      const commitDate = new Date(repo.lastUsed);

      // Update LOC for the last month if applicable
      if (commitDate >= lastMonth) {
        languageMetrics[language].locLastMonth += repo.languages[language];
      }

      // Update LOC for the last 6 months if applicable
      if (commitDate >= lastSixMonths) {
        languageMetrics[language].locLastSixMonths += repo.languages[language];
      }

      // Increment active repositories for the language
      languageMetrics[language].activeRepos += 1;
    });
  });

  // Calculate the total LOC across all languages
  Object.keys(languageMetrics).forEach((language) => {
    totalLocAcrossAllLanguages += languageMetrics[language].totalLoc;
  });

  // Calculate percentage of total LOC for each language
  Object.keys(languageMetrics).forEach((language) => {
    const languageData = languageMetrics[language];
    languageData.percentageOfTotalLoc = (languageData.totalLoc / totalLocAcrossAllLanguages) * 100;
  });

  return languageMetrics;
}

const sortLanguagesOptions = [
  // {
  //   value: 'recent',
  //   label: 'Most recently used',
  // },
  {
    value: '1_month_loc',
    label: 'Total LOC contributed over last month',
  },
  {
    value: '6_month_loc',
    label: 'Total LOC contributed over past 6 months',
  },
  {
    value: 'total_loc',
    label: 'Total usage over all repositories',
  },
];
