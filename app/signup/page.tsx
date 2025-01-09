import React from 'react';
import Link from 'next/link';
import {
  ArrowLeftEndOnRectangleIcon,
  ArrowRightEndOnRectangleIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/solid';
import {
  IconBrandGit,
  IconBrandGithub,
  IconBrandGithubFilled,
  IconDoorEnter,
} from '@tabler/icons-react';
import { Alert, Button, Divider, Input, PasswordInput, Text, Title } from '@mantine/core';

export default function SignUpPage() {
  return (
    <div className="flex flex-col justify-center items-center pt-16 w-full">
      <div className="bg-white shadow-lg flex flex-col space-y-12 items-center px-8 py-8 pb-12 max-w-[428px]">
        <div className=" flex flex-col space-y-4 w-full">
          <Title order={2} className="text-left w-full">
            Sign Up
          </Title>
          <Text>Sign up to enhance your resume and showcase your coding journey.</Text>
        </div>
        <div className="flex flex-col space-y-8 w-full">
          <Button
            leftSection={
              <IconBrandGithubFilled className="p-[0.18em] w-5 h-5 ml-2 rounded-full bg-slate-50 text-black" />
            }
          >
            Sign up with Github
          </Button>
          <Divider className="my-10" label="or" />
          <div className="flex space-y-4 flex-col">
            <Input name="username" placeholder={'Username'} />
            <PasswordInput name="password" placeholder={'Password'} />
            <PasswordInput name="comfirmed_password" placeholder={'Confirm Password'} />
          </div>
          <div className="flex flex-col space-y-2">
            <Button leftSection={<ArrowRightEndOnRectangleIcon className="h-5 w-5" />}>
              Sign Up
            </Button>
            <Link href={'/signin'}>
              <Text className="underline text-sm text-right ml-1">Already have an account?</Text>
            </Link>
          </div>
        </div>
        <Alert
          radius="md"
          className="text-xs opacity-60 leading-4 mt-16 border-slate-300 italic"
          variant="outline"
          title="Note"
          icon={<InformationCircleIcon />}
        >
          We highly recommend signing up with{' '}
          <Text className=" text-xs font-bold">Github OAuth.</Text>
          This enables us to generate an all-inclusive, insightful resume. Some of these features
          may not be available using other sign in methods.{' '}
        </Alert>
      </div>
    </div>
  );
}
