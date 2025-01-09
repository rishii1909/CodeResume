'use client';

import '@mantine/core/styles.css';

import React from 'react';
import {
  AppShell,
  Burger,
  ColorSchemeScript,
  MantineProvider,
  MantineRadiusValues,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { theme } from '../theme';

import './globals.css';

import Link from 'next/link';
import {
  IconBrandFacebookFilled,
  IconBrandInstagramFilled,
  IconBrandTwitterFilled,
  IconCopyright,
} from '@tabler/icons-react';
import { ColorSchemeSwitch } from '@/components/ColorSchemeSwitch/ColorSchemeSwitch';

export default function RootLayout({ children }: { children: any }) {
  const [opened, { toggle }] = useDisclosure();

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
            header={{ height: 50 }}
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
            <AppShell.Header className="py-4 px-4 flex items-center justify-between shadow-md">
              <Text className="font-bold text-lg">CodeResume</Text>
              <div className="flex flex-row space-x-6 items-center">
                <Link href={'/'}>Home</Link>
                <Link href={'/contact-us'}>Contact Us</Link>
                <Link href={'/signin'}>Sign In</Link>
                {/* <Link href={'/'} className="font-semibold hover:scale-110 transition-transform">
                  <Text
                    inherit
                    variant="gradient"
                    component="span"
                    gradient={{ from: 'pink', to: 'yellow' }}
                  >
                    My Resume
                  </Text>
                </Link> */}
                <ColorSchemeSwitch />
                <div className="flex space-x-3 items-center md:hidden">
                  <Burger opened={opened} onClick={toggle} size="sm" />
                </div>
              </div>
            </AppShell.Header>

            <AppShell.Navbar p="md" className="shadow-md">
              Navbar
            </AppShell.Navbar>

            <AppShell.Main className="p-0 pt-12">{children}</AppShell.Main>
            <AppShell.Footer
              pos="relative"
              p="md"
              className=" mt-10 border-t-2 border-solid border-zinc-300"
            >
              <div className="flex space-x-3 w-full">
                <Link href="#">
                  <Text className="text-xs underline">Terms of Service</Text>
                </Link>
                <Link href="#">
                  <Text className="text-xs underline">Privacy Policy</Text>
                </Link>
                <Link href="#">
                  <Text className="text-xs underline">Contact Us</Text>
                </Link>
              </div>
              <div className="flex w-full justify-end">
                <div className="flex">
                  <IconBrandTwitterFilled className="w-7 h-7 p-1 hover:bg-zinc-200 transition rounded-md cursor-pointer" />
                  <IconBrandFacebookFilled className="w-7 h-7 p-1 hover:bg-zinc-200 transition rounded-md cursor-pointer" />
                  <IconBrandInstagramFilled className="w-7 h-7 p-1 hover:bg-zinc-200 transition rounded-md cursor-pointer" />
                </div>
              </div>
              <div className="flex w-full">
                <IconCopyright className="h-4 w-4" />
                <Text className="text-xs">2023 CodeResume. All Rights Reserved.</Text>
              </div>
            </AppShell.Footer>
          </AppShell>
        </MantineProvider>
      </body>
    </html>
  );
}
