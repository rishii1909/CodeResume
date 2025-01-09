'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { RocketLaunchIcon } from '@heroicons/react/24/solid';
import { zodResolver } from '@hookform/resolvers/zod';
import { Octokit } from '@octokit/rest';
import isHotkey from 'is-hotkey';
import { signIn, useSession } from 'next-auth/react';
import { Fade } from 'react-awesome-reveal';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button, Input, Kbd, Text, Title } from '@mantine/core';

export function Welcome() {
  const router = useRouter();
  const { data: session } = useSession();
  const octokit = new Octokit();

  const [username, setUsername] = useState('');

  const validateUsername = async (username: string): Promise<boolean> => {
    try {
      const response = await octokit.rest.users.getByUsername({ username });
      return !!response.data.login;
    } catch (error) {
      console.error('Username validation error: ', error);
      return false;
    }
  };
  const searchSchema = z
    .object({
      username: z.string().min(1, { message: 'Please enter a username.' }),
    })
    .superRefine(async (data, ctx) => {
      const isValid = await validateUsername(data.username);
      if (!isValid) {
        ctx.addIssue({
          code: 'custom',
          message: 'Please enter a valid GitHub username.',
          path: ['username'],
        });
      }
    });

  type FormSchema = z.infer<typeof searchSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchema>({
    resolver: zodResolver(searchSchema),
    mode: 'onSubmit',
  });

  const onSubmit = async (data: FormSchema) => {
    const { username } = data;
    router.push(`/${username}`);
  };

  useEffect(() => {
    const getUserNameAndRedirect = async () => {
      if (!!session?.user?.name) {
        const { data } = await octokit.rest.users.getAuthenticated();
        router.push(`/${data.login}`);
      }
    };

    getUserNameAndRedirect();
  }, [session]);

  return (
    <Fade triggerOnce cascade>
      <div
        className="flex flex-col coljustify-center items-center px-10 py-44"
        style={{
          background:
            'linear-gradient( rgba(0,0,0,0.8), rgba(0,0,0,0.6), rgba(0,0,0,0.4), rgba(0,0,0,0.4), rgba(0,0,0,0.4), rgba(0,0,0,0.4), rgba(0,0,0,0.2), rgba(250,250,250,0.1), rgba(250,250,250,1)), url(/landing-bg.jpg) center / cover no-repeat',
        }}
      >
        <div className="flex flex-col space-y-8 justify-center items-center space-x-4">
          <div className="flex flex-col text-center space-y-4 items-center">
            <Title className="text-zinc-200">
              Effortlessly transform your Github contributions into a personalized resume!
            </Title>
            <Text className="w-3/5 text-zinc-200 text-lg">
              CodeResume is a simple yet powerful platform that turns your GitHub activity into a
              polished, professional resume, highlighting your projects and contributions with ease.
            </Text>
          </div>

          <div className="flex w-full p-2 mt-6 items-center flex-col">
            {/* <Text className="text-zinc-200 text-lg font-semibold">Try it out now!</Text> */}
            <div className="flex flex-col space-y-4 items-center space-x-4">
              <Input
                size="lg"
                {...register('username')}
                leftSection={<span className="pl-2">github.com /</span>}
                rightSection={
                  <span className="flex space-x-1 items-center pr-2">
                    <Text size="xs">Press</Text>
                    <Kbd size="xs" className="mx-0">
                      Enter
                    </Kbd>
                  </span>
                }
                autoFocus
                autoCorrect="off"
                classNames={{
                  input:
                    'px-4 py-5 w-[420px] border-right pl-[108px] font-bold min-w-96 max-w-[540px]',
                  section: 'w-fit opacity-50 font-semibold',
                }}
                onKeyDown={(e) => {
                  if (isHotkey('enter', e)) handleSubmit(onSubmit)();
                }}
                placeholder="Enter your username"
              />
              {errors.username?.message && (
                <Text c="red" size="sm">
                  {errors.username.message}
                </Text>
              )}
              <Button
                loading={isSubmitting}
                size="lg"
                loaderProps={{ type: 'dots' }}
                rightSection={<RocketLaunchIcon className="h-4 w-4" />}
                onClick={() => handleSubmit(onSubmit, (errors) => console.log(errors))()}
              >
                Generate my Resume!
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between space-x-12 text-center px-12 py-16 mt-8">
        <div className="flex flex-col space-y-6 items-center">
          <Image
            height={240}
            width={240}
            src="/resume-generation.svg"
            alt={'image'}
            className="rounded-md hover:scale-105 transition "
          ></Image>
          <Text className="font-bold text-lg">Automated Resume Generation</Text>
          <Text>
            Automatically create a professional resume with from your Github contributions, complete
            with project details and highlights.
          </Text>
        </div>
        <div className="flex flex-col space-y-6 items-center">
          <Image
            height={240}
            width={312}
            src="/friendly-interface.svg"
            alt={'image'}
            className="rounded-md hover:scale-105 transition"
          ></Image>
          <Text className="font-bold text-lg">User Friendly Interface</Text>
          <Text>
            Enjoy a seamless experience with our intuitive interface designed for ease of use and
            quick navigation.
          </Text>
        </div>
        <div className="flex flex-col space-y-6 items-center">
          <Image
            height={240}
            width={268}
            src="/templates.svg"
            alt={'image'}
            className="rounded-md hover:scale-105 transition"
          ></Image>
          <Text className="font-bold text-lg">Customizable Templates</Text>
          <Text>
            Choose from a variety of templates to customize your resume's look and feel to match
            your personal style.
          </Text>
        </div>
      </div>
    </Fade>
  );
}
