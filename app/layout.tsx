'use client';

import '@mantine/core/styles.css';

import {
  AppShell,
  Avatar,
  Button,
  ColorSchemeScript,
  MantineProvider,
  Menu,
  Text,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { theme } from '../theme';

import './globals.css';

import Link from 'next/link';
import {
  IconBrandFacebookFilled,
  IconBrandGithubFilled,
  IconBrandInstagramFilled,
  IconBrandTwitterFilled,
} from '@tabler/icons-react';

import '@mantine/carousel/styles.css';

import { usePathname } from 'next/navigation.js';
import { SessionProvider, signIn, useSession } from 'next-auth/react';
import useAuthStore from '@/stores/auth.store';

export default function RootLayout({ children }: { children: any }) {
  const [opened, { toggle }] = useDisclosure(false);
  const pathname = usePathname();

  return (
    <SessionProvider>
      <SessionContent pathname={pathname} opened={opened} toggle={toggle}>
        {children}
      </SessionContent>
    </SessionProvider>
  );
}

function SessionContent({
  pathname,
  opened,
  toggle,
  children,
}: {
  pathname: string;
  opened: boolean;
  toggle: () => void;
  children: any;
}) {
  const session = useSession();

  const { data } = session;

  const store = useAuthStore();

  if (data?.user?.email && !store.user) store.setUser(data.user);

  const { user } = store;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={{ defaultRadius: 'md', ...theme }}>
          <AppShell
            header={{ height: 72 }}
            navbar={{
              width: 300,
              breakpoint: 'sm',
              collapsed: {
                desktop: !opened,
                mobile: !opened,
              },
            }}
            padding="sm"
          >
            <AppShell.Header className="py-4  px-4 flex items-center border-b border-solid border-zinc-300 justify-between bg-slate-50">
              <Title order={3} className="text-lg">
                CodeResume
              </Title>

              {session.status !== 'loading' &&
                (user && session.status === 'authenticated' ? (
                  // <Link href={`/u/${user.name}`}>
                  <Menu shadow="md" width={200}>
                    <Menu.Target>
                      <Avatar
                        src={user.image}
                        alt={user.name || 'User'}
                        radius="xl"
                        className="cursor-pointer hover:scale-105 transition-transform"
                      />
                    </Menu.Target>

                    <Menu.Dropdown className="bg-slate-50 border border-slate-300">
                      <Menu.Label>Account</Menu.Label>
                      <Menu.Item component={Link} href={`/u/${user.name}`}>
                        Profile
                      </Menu.Item>
                      <Menu.Divider />
                      <Menu.Item onClick={() => signIn('github', { callbackUrl: '/' })} color="red">
                        Sign out
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                ) : (
                  // {/* </Link> */}
                  <Button
                    className="!shadow-lg hover:scale-105 transition-transform"
                    leftSection={<IconBrandGithubFilled className="h-4 w-4" />}
                    onClick={() => signIn('github', { callbackUrl: '/' })}
                  >
                    Login with GitHub
                  </Button>
                ))}
            </AppShell.Header>

            <AppShell.Navbar p="md" className="shadow-md">
              Navbar
            </AppShell.Navbar>

            <AppShell.Main className="p-0">{children}</AppShell.Main>

            {pathname === '/' && (
              <footer className="border-t border-gray-300 bg-gray-100 py-6 px-4 md:px-10">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between">
                  {/* Left Section */}
                  <div>
                    <Title order={3}>CodeResume</Title>
                    <Text className="text-gray-600 mt-2 max-w-sm">
                      CodeResume is building an unbiased science-backed platform for 200M builders,
                      linking techies with top 5% paying companies and uniting talents from villages
                      to cities.
                    </Text>
                    <div className="flex space-x-4 mt-4">
                      <IconBrandTwitterFilled className="w-8 h-8 p-1.5 hover:bg-zinc-300 transition rounded-sm cursor-pointer" />
                      <IconBrandFacebookFilled className="w-8 h-8 p-1.5 hover:bg-zinc-300 transition rounded-sm cursor-pointer" />
                      <IconBrandInstagramFilled className="w-8 h-8 p-1.5 hover:bg-zinc-300 transition rounded-sm cursor-pointer" />
                    </div>
                  </div>

                  {/* Middle Section */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6 md:mt-0">
                    <div>
                      <Title order={4}>For Techies</Title>
                      <ul className="mt-2 space-y-1">
                        <li>
                          <Link href="#" className="text-gray-600 hover:underline">
                            Feature Roadmap
                          </Link>
                        </li>
                        <li>
                          <Link href="#" className="text-gray-600 hover:underline">
                            Find Jobs
                          </Link>
                        </li>
                        <li>
                          <Link href="#" className="text-gray-600 hover:underline">
                            Rating Algorithm
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <Title order={4}>Use Cases</Title>
                      <ul className="mt-2 space-y-1">
                        <li>
                          <Link href="#" className="text-gray-600 hover:underline">
                            Hiring Managers
                          </Link>
                        </li>
                        <li>
                          <Link href="#" className="text-gray-600 hover:underline">
                            Recruiters/Sourcers
                          </Link>
                        </li>
                        <li>
                          <Link href="#" className="text-gray-600 hover:underline">
                            Institutions
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <Title order={4}>Company</Title>
                      <ul className="mt-2 space-y-1">
                        <li>
                          <Link href="#" className="text-gray-600 hover:underline">
                            About Us
                          </Link>
                        </li>
                        <li>
                          <Link href="#" className="text-gray-600 hover:underline">
                            Blog
                          </Link>
                        </li>
                        <li>
                          <Link href="#" className="text-gray-600 hover:underline">
                            Contact
                          </Link>
                        </li>
                        <li>
                          <Link href="#" className="text-gray-600 hover:underline">
                            Privacy Policy
                          </Link>
                        </li>
                        <li>
                          <Link href="#" className="text-gray-600 hover:underline">
                            Terms of Use
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </footer>
            )}
          </AppShell>
        </MantineProvider>
      </body>
    </html>
  );
}
