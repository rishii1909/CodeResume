'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { RocketLaunchIcon } from '@heroicons/react/24/solid';
import { Fade } from 'react-awesome-reveal';
import {
  Anchor,
  Avatar,
  Button,
  Divider,
  Grid,
  GridCol,
  Text,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';

export default function ContactUsPage() {
  return (
    <div className="p-8 pt-24">
      <div className="flex flex-row justify-between my-8">
        <div
          className="flex space-y-4 flex-col w-2/5"
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <div className="flex space-x-2 items-center">
            <RocketLaunchIcon className="h-8 w-8 text-violet-800" />
            <Title>Our Mission</Title>
          </div>
          <Text>
            At CodeResume, we are a dedicated team of engineers driven by a singular vision: to
            revolutionize hiring by focusing on merit and transparency. Led by{' '}
            <a
              href="https://www.linkedin.com/in/praneethpatlola/"
              className=" underline font-semibold"
            >
              Mr. Praneeth Patlola
            </a>
            , our mission is to harness the untapped potential of GitHub commits—transforming raw
            data into compelling, professional resumes. By leveraging the source-of-truth in a
            developer's workflow, we aim to streamline resume generation, providing software
            engineers with a seamless way to create modern, comprehensive resumes that authentically
            reflect their contributions and skills. With CodeResume, hiring becomes fairer, resumes
            become smarter, and developers gain the recognition they deserve.
          </Text>
        </div>
        <Divider orientation="vertical" />
        <div className="flex items-center flex-col text-center space-y-4 w-2/5">
          <Image
            src="/founder.jpeg"
            height={160}
            width={160}
            alt="Praneeth Patlola"
            className="rounded-full drop-shadow-xl border-2 border-solid border-zinc-300"
          />
          <Divider />
          <div className="flex flex-col space-y-1">
            <Title>Our Founder</Title>
            <Text className="text-lg">Mr. Praneeth Patlola</Text>
            <Text c="dimmed" className="text-sm">
              2x Founder in HRTech and B2B Enterprise SaaS
            </Text>
          </div>
        </div>
      </div>
      <Divider />
      <div className="flex justify-between my-8">
        <div className="flex flex-col my-8 space-y-4 w-2/5">
          <Title>Contact us</Title>
          <div className="flex flex-col space-y-1.5 pl-4">
            <Title order={3}>
              Email:{' '}
              <a href="mailto:info@coderesume.com" className="underline">
                info@coderesume.com
              </a>
            </Title>
            <Title order={3}>Call: +123 456 789</Title>
          </div>
          <div className="flex ml-44 pt-24">
            <Image
              alt="email"
              src="/contact-us/call-illustration.svg"
              width={300}
              height={200}
            ></Image>
          </div>
        </div>
        <Divider orientation="vertical" />
        <div className="flex flex-col my-8 space-y-4 w-2/5 items-center">
          <div className="flex flex-col space-y-4">
            <Title className="">Drop us a line</Title>
            <Grid>
              <GridCol span={5}>
                <TextInput placeholder="Name" name="name" />
              </GridCol>
              <GridCol span={5}>
                <TextInput placeholder="Email address" type="email" name="email" />
              </GridCol>
              <GridCol span={5}>
                <TextInput placeholder="Company name" />
              </GridCol>
              <GridCol span={5}>
                <TextInput placeholder="Phone number" />
              </GridCol>
              <GridCol span={10}>
                <Textarea rows={10} placeholder="Your message" />
              </GridCol>
              <GridCol offset={6} span={4}>
                <Button fullWidth>Submit</Button>
              </GridCol>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
}
