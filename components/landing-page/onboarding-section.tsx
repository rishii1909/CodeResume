import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { IconBrandGithubFilled } from '@tabler/icons-react';
import clsx from 'clsx';
import { motion } from 'motion/react';
import { Button, Divider, List, Table, Text, Title } from '@mantine/core';
import { LandingSection } from './landing-section';
import StaggerVisualizer from './rippe-bg';

export const OnboardingSection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.2,
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const numberVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const stepVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.5,
      },
    },
  };

  return (
    <LandingSection className="rounded-none md:rounded-lg mb-[460px]" id="about-us">
      <StaggerVisualizer>
        <motion.div
          className="text-center mb-12 mt-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          // viewport={{ once: true }}
        >
          <motion.h2 className="text-4xl font-bold mb-4" variants={itemVariants}>
            <Title order={1}>
              Real <span className="underline px-2 py-0.5 bg-slate-200 rounded-md">Work</span>, Real{' '}
              <span className="underline px-2 py-0.5 bg-slate-200 rounded-md">Recognition</span>
            </Title>
          </motion.h2>
          <motion.p className="text-xl text-slate-600" variants={itemVariants}>
            Ditch the Fluff. Let Your{' '}
            <span className=" px-2 py-0.5 bg-slate-200 rounded-md">Code</span> Speak.
          </motion.p>
        </motion.div>

        <motion.div
          className="flex flex-col items-center justify-center w-full max-w-6xl mx-auto py-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          // viewport={{ once: true }}
        >
          <div className="flex flex-row justify-between w-full space-x-8">
            {[
              {
                number: 1,
                title: 'Unlock Your DevRank',
                description:
                  'One scan, infinite possibilities—analyze your GitHub presence and get your DevRank. Your profile is your proof, opening doors to 3M+ global opportunities.',
                buttonText: 'Scan GitHub',
                buttonIcon: <IconBrandGithubFilled size={18} />,
                buttonVariant: 'filled',
              },
              {
                number: 2,
                title: 'Showcase Your Impact',
                description:
                  'Add your DevRank to your portfolio, share it on X, embed it in your GitHub profile. Let your contributions do the talking—no fluff, just results.',
                buttonText: 'Share Your DevRank',
                buttonVariant: 'outline',
              },
              {
                number: 3,
                title: 'Break the Mold',
                description:
                  "Tired of endless coding tests? Annoyed by AI screening your skills? Let real work speak louder than broken hiring pipelines. It's time to flip the script.",
                buttonText: 'Join the Movement',
                buttonVariant: 'light',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-start space-y-4 w-1/3 p-6 bg-white border border-gray-300 rounded-md shadow-md"
                variants={itemVariants}
              >
                <motion.div className="flex items-center space-x-3" variants={numberVariants}>
                  <div
                    className={clsx(
                      'w-8 h-8 border-2 border-slate-200 rounded-full flex items-center justify-center text-white font-bold',
                      {
                        'bg-red-500': index === 0,
                        'bg-yellow-500': index === 1,
                        'bg-green-500': index === 2,
                      }
                    )}
                  >
                    {item.number}
                  </div>
                </motion.div>
                <motion.div variants={contentVariants}>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <Divider className="my-4" />
                  <Text className="text-slate-600 my-6">{item.description}</Text>
                  <div className="mt-6 flex justify-end">
                    <Link href="/onboarding">
                      <Button
                        variant={item.buttonVariant}
                        size="md"
                        leftSection={item.buttonIcon}
                        rightSection={<ArrowRightIcon className="h-4 w-4" />}
                      >
                        {item.buttonText}
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
          <Divider className="my-24 w-full" />

          <motion.div
            className="text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            // viewport={{ once: true }}
          >
            <motion.h2 className="text-4xl font-bold mb-4" variants={itemVariants}>
              <Title order={1}>
                Feel the{' '}
                <span className="underline px-2 py-0.5 bg-slate-200 rounded-md">Difference</span>
              </Title>
            </motion.h2>
            <motion.p className="text-xl text-slate-600" variants={itemVariants}>
              Tired of outdated hiring methods? See why{' '}
              <span className="font-semibold">CodeResume</span> is the future:
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            // viewport={{ once: true }}
            // className="overflow-x-auto w-full"
            className=" p-3 pb-3 rounded-lg bg-gradient-to-b from-transparent to-slate-100"
          >
            <Table
              classNames={{ td: 'text-lg' }}
              className="min-w-full bg-transparent rounded-lg overflow-hidden border text-slate-600 border-gray-300"
            >
              <Table.Thead>
                <Table.Tr>
                  <Table.Td
                    align="center"
                    className="px-6 py-3 text-center font-semibold"
                  ></Table.Td>
                  <Table.Td
                    align="center"
                    className="px-6 py-3 text-center font-semibold underline"
                  >
                    CodeResume
                  </Table.Td>
                  <Table.Td align="center" className="px-6 py-3 text-center font-semibold">
                    LeetCode / Code Challenges ❌
                  </Table.Td>
                  <Table.Td align="center" className="px-6 py-3 text-center font-semibold">
                    Traditional Resumés 📄
                  </Table.Td>
                  <Table.Td align="center" className="px-6 py-3 text-center font-semibold">
                    AI-Powered Hiring 🤖
                  </Table.Td>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {[
                  {
                    feature: 'Evaluates Real Work',
                    yourPlatform: <CheckCircleIcon className="h-6 w-6 text-green-500" />,
                    leetCode: <XCircleIcon className="h-6 w-6 text-red-500" />,
                    traditionalResumes: <XCircleIcon className="h-6 w-6 text-red-500" />,
                    aiPoweredHiring: <XCircleIcon className="h-6 w-6 text-red-500" />,
                  },
                  {
                    feature: 'Proves Practical Skills',
                    yourPlatform: <CheckCircleIcon className="h-6 w-6 text-green-500" />,
                    leetCode: <XCircleIcon className="h-6 w-6 text-red-500" />,
                    traditionalResumes: <XCircleIcon className="h-6 w-6 text-red-500" />,
                    aiPoweredHiring: <XCircleIcon className="h-6 w-6 text-red-500" />,
                  },
                  {
                    feature: 'Recognizes Open Source Work',
                    yourPlatform: <CheckCircleIcon className="h-6 w-6 text-green-500" />,
                    leetCode: <XCircleIcon className="h-6 w-6 text-red-500" />,
                    traditionalResumes: <XCircleIcon className="h-6 w-6 text-red-500" />,
                    aiPoweredHiring: <XCircleIcon className="h-6 w-6 text-red-500" />,
                  },
                  {
                    feature: 'No Time-Wasting Tests',
                    yourPlatform: <CheckCircleIcon className="h-6 w-6 text-green-500" />,
                    leetCode: <XCircleIcon className="h-6 w-6 text-red-500" />,
                    traditionalResumes: <CheckCircleIcon className="h-6 w-6 text-green-500" />,
                    aiPoweredHiring: <CheckCircleIcon className="h-6 w-6 text-green-500" />,
                  },
                  {
                    feature: 'Bias-Free & Transparent',
                    yourPlatform: <CheckCircleIcon className="h-6 w-6 text-green-500" />,
                    leetCode: <XCircleIcon className="h-6 w-6 text-red-500" />,
                    traditionalResumes: <XCircleIcon className="h-6 w-6 text-red-500" />,
                    aiPoweredHiring: <XCircleIcon className="h-6 w-6 text-red-500" />,
                  },
                  {
                    feature: 'Sharable & Verifiable',
                    yourPlatform: <CheckCircleIcon className="h-6 w-6 text-green-500" />,
                    leetCode: <XCircleIcon className="h-6 w-6 text-red-500" />,
                    traditionalResumes: <XCircleIcon className="h-6 w-6 text-red-500" />,
                    aiPoweredHiring: <XCircleIcon className="h-6 w-6 text-red-500" />,
                  },
                  {
                    feature: 'Unlocks Direct Opportunities',
                    yourPlatform: <CheckCircleIcon className="h-6 w-6 text-green-500" />,
                    leetCode: <XCircleIcon className="h-6 w-6 text-red-500" />,
                    traditionalResumes: <XCircleIcon className="h-6 w-6 text-red-500" />,
                    aiPoweredHiring: <XCircleIcon className="h-6 w-6 text-red-500" />,
                  },
                ].map((row, index) => (
                  <Table.Tr
                    key={index}
                    className={` even:bg-white hover:bg-gray-100 transition-colors duration-200 rounded-md`}
                    // initial={{ opacity: 0 }}
                    // animate={{ opacity: 1 }}
                    // transition={{ delay: index * 0.1 }}
                  >
                    <Table.Td align="center" className="px-6 py-4 border-b border-gray-300">
                      {row.feature}
                    </Table.Td>
                    <Table.Td align="center" className="px-6 py-4 border-b border-gray-300">
                      {row.yourPlatform}
                    </Table.Td>
                    <Table.Td align="center" className="px-6 py-4 border-b border-gray-300">
                      {row.leetCode}
                    </Table.Td>
                    <Table.Td align="center" className="px-6 py-4 border-b border-gray-300">
                      {row.traditionalResumes}
                    </Table.Td>
                    <Table.Td align="center" className="px-6 py-4 border-b border-gray-300">
                      {row.aiPoweredHiring}
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </motion.div>
        </motion.div>
      </StaggerVisualizer>
    </LandingSection>
  );
};
