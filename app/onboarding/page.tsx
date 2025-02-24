'use client';

import { useState } from 'react';
import { ArrowTopRightOnSquareIcon, UserIcon, UsersIcon } from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { IconBrandGithubFilled } from '@tabler/icons-react';
import { motion } from 'motion/react';
import { Button, Input, Modal, Switch, Text, Title } from '@mantine/core';
import useAuthStore from '@/stores/auth.store';
import { handleGithubAuth } from '@/utils/auth';

export default function AssessmentSelector() {
  const [modalOpen, setModalOpen] = useState(false);
  const [othersModalOpen, setOthersModalOpen] = useState(false);
  const [githubUsername, setGithubUsername] = useState('');
  const { user } = useAuthStore();

  const handleOthersModalOpen = () => {
    setOthersModalOpen(true);
  };

  const handleOthersModalClose = () => {
    setOthersModalOpen(false);
  };

  const handleGithubUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGithubUsername(event.currentTarget.value);
  };

  const handleScanNow = () => {
    // TODO: Implement assessment logic
    console.log('Scan now clicked', githubUsername);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex items-center justify-center min-h-screen px-4"
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                ease: 'easeOut',
                duration: 0.4,
              },
            },
          }}
          initial="hidden"
          animate="visible"
          className="max-w-md w-full text-center space-y-8"
        >
          <Title order={2} className="text-2xl font-bold">
            Welcome to CodeResume
          </Title>
          <Text className="text-lg text-gray-600">
            Who would you like to analyze today? We'll provide a detailed report on their coding
            skills.
          </Text>

          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.95 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: {
                  ease: 'easeOut',
                  duration: 0.4,
                },
              },
            }}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 gap-8"
          >
            {/* Myself Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, ease: 'easeOut', duration: 0.4 }}
              className="border border-gray-300 shadow-md p-6 rounded-lg flex flex-col items-center space-y-4 transition cursor-pointer"
              onClick={() => setModalOpen(true)}
            >
              <UserIcon className="w-10 h-10 text-gray-700" />
              <div className="text-center flex flex-col space-y-4">
                <Title order={3}>Myself</Title>
                <Text className="text-sm text-left text-gray-600">
                  Get a detailed report on your coding skills, including code quality, issues, ranks
                  & more.
                </Text>
              </div>
            </motion.div>

            {/* Others Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, ease: 'easeOut', duration: 0.4 }}
              className="border border-gray-300 shadow-md p-6 rounded-lg flex flex-col items-center space-y-4 transition cursor-pointer"
              onClick={handleOthersModalOpen}
            >
              <UsersIcon className="w-10 h-10 text-gray-700" />
              <div className="text-center flex flex-col space-y-4">
                <Title order={3}>Others</Title>
                <Text className="text-sm text-gray-600">
                  Analyze other developers' abilities and learn from their strengths and weaknesses.
                </Text>
              </div>
            </motion.div>
          </motion.div>

          <Text className="text-sm text-gray-600">
            You'll receive an email notification when the analysis is complete.
          </Text>
        </motion.div>
      </motion.div>

      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        centered
        size="lg"
        padding="lg"
        radius="md"
        classNames={{
          inner: 'flex justify-center items-center',
          title: 'text-lg font-bold',
          close: 'p-0',
          body: 'px-6',
        }}
        title={<Title order={3}>GitHub Verification</Title>}
      >
        <div className="space-y-6">
          {/* Header */}
          <p className="text-gray-600">
            Login to your GitHub account to manage your assessment result. We will collect your
            name, avatar, repositories, and other public data.
          </p>

          {user ? (
            <>
              {/* Profile Section */}
              <div className="flex items-center space-x-4">
                <img
                  src={user.image ?? 'https://avatars.githubusercontent.com/u/1'}
                  alt="GitHub Avatar"
                  className="w-12 h-12 rounded-full border"
                />
                <div className="flex-1">
                  <Title order={3} className="text-lg font-semibold">
                    {user.name ?? ''}
                  </Title>
                </div>
                <a
                  href={`https://github.com/${user.name ?? 'rishii1909'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ArrowTopRightOnSquareIcon className="w-5 h-5 text-gray-600 hover:text-gray-800" />
                </a>
              </div>

              {/* Private Repo Toggle */}
              <div className="p-3 border rounded-lg shadow-sm flex items-center justify-between">
                <span className="text-sm font-medium">Scan private repositories?</span>
                <Switch />
              </div>

              {/* CTA */}
              <Button
                rightSection={<ArrowRightIcon className="h-4 w-4" />}
                fullWidth
                className="text-white hover:bg-gray-900"
              >
                Scan Now
              </Button>
            </>
          ) : (
            <Button
              fullWidth
              className="!shadow-lg hover:scale-105 transition-transform"
              leftSection={<IconBrandGithubFilled className="h-4 w-4" />}
              rightSection={<ArrowRightIcon className="h-4 w-4" />}
              onClick={handleGithubAuth}
            >
              Login with GitHub
            </Button>
          )}
        </div>
      </Modal>

      <Modal
        opened={othersModalOpen}
        onClose={handleOthersModalClose}
        centered
        size="lg"
        padding="lg"
        radius="md"
        classNames={{
          inner: 'flex justify-center items-center',
          title: 'text-lg font-bold',
          close: 'p-0',
          body: 'px-6',
        }}
        title={<Title order={3}>Scan Others</Title>}
      >
        <div className="space-y-4">
          {/* Header */}
          <p className="text-gray-600">Enter a GitHub username or URL to start the assessment.</p>

          {/* Input Field */}
          <Input
            placeholder="GitHub Username or URL"
            value={githubUsername}
            onChange={handleGithubUsernameChange}
            className="w-full"
          />

          {/* CTA */}
          <Button
            rightSection={<ArrowRightIcon className="h-4 w-4" />}
            fullWidth
            className="text-white hover:bg-gray-900"
            onClick={handleScanNow}
          >
            Scan Now
          </Button>
        </div>
      </Modal>
    </>
  );
}
