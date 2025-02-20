import Image from 'next/image';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { IconBrandGithubFilled } from '@tabler/icons-react';
import { Link } from 'lucide-react';
import { motion } from 'motion/react';
import { Carousel } from '@mantine/carousel';
import { Button, Divider, List, Pill, Stepper, Tabs, Text, Title } from '@mantine/core';
import { animationContainer, animationItem, LandingSection } from './landing-section';

export const AboutUsSection: React.FC = () => {
  return (
    <LandingSection
      className="!h-fit bg-gradient-to-b via-slate-200 to-transparent pb-16 rounded-none md:rounded-lg"
      id="about-us"
      fullWidth
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={animationContainer}
        className="text-center items-center flex space-y-4 flex-col mx-auto w-full max-w-[1200px]"
      >
        <motion.div variants={animationItem} className="flex flex-col space-y-16">
          <Title order={1}>
            Go <span className="underline px-2 py-0.5 bg-slate-200 rounded-md">limitless</span>{' '}
            {/* <br /> */}
            with <span className="underline px-2 py-0.5 bg-slate-200 rounded-md">CodeResume</span>
          </Title>
          <motion.div variants={animationItem}>
            <Text className="text-slate-600 text-left">
              <Pill size="md" className="border border-slate-600 text-slate-600 font-semibold">
                THE PROBLEM
              </Pill>{' '}
              <br /> <br />
              The open-source community is the silent force pushing frontiers, transcending skin
              color, titles, and origins. To empower developers from underserved regions with
              recognition systems bridging talent gaps and make them seen, a global developer
              passport is essential. To create standardized, verifiable portfolios showing expertise
              and open doors to merit-based platforms, ensuring fair pay and global visibility.{' '}
              <br /> <br />
              <Pill size="md" className="border border-slate-600 text-slate-600 font-semibold">
                THE SOLUTION
              </Pill>{' '}
              <br /> <br />
              CodeResume aims to bridge these barriers and empower developers from underserved
              regions with recognition systems bridging talent gaps and make them seen. We provide a
              wide array of seamless features that scale professional outreach, help recruiters
              assess talent better, and help professionals get better.
            </Text>
          </motion.div>

          <Divider className="my-24 w-full" />

          <Title order={2} className="leading-relaxed">
            Find out why <br />
            <span className="underline px-2 py-0.5 bg-slate-200 rounded-md">
              Devs Love CodeResume
            </span>
          </Title>

          <Tabs classNames={{ tabSection: 'min-w-[200px]' }} defaultValue="gallery-0">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2,
                    type: 'spring',
                    stiffness: 100,
                    damping: 10,
                  },
                },
              }}
            >
              <Tabs.List grow justify="center">
                {[
                  'Feature',
                  'Easy to use',
                  'Customizable',
                  'Performance oriented',
                  'Accessible',
                  'Enterprise ready',
                ].map((tab, index) => (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1 },
                    }}
                  >
                    <Tabs.Tab className="text-lg" value={`gallery-${index}`}>
                      {tab}
                    </Tabs.Tab>
                  </motion.div>
                ))}
              </Tabs.List>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
            >
              {[...Array(6)].map((_, index) => (
                <Tabs.Panel
                  key={index}
                  value={`gallery-${index}`}
                  className="p-8 border-4 border-dashed border-t-0 border-slate-200 rounded-lg rounded-t-none"
                >
                  <Image
                    src="/screen.png"
                    alt="Description of the image"
                    width={1200}
                    height={600}
                    className="shadow-lg mx-auto border-2 border-slate-200 rounded-none md:rounded-lg mt-0"
                  />
                </Tabs.Panel>
              ))}
            </motion.div>
          </Tabs>

          {/* <motion.div className="flex flex-row justify-between items-end" variants={animationItem}>
            <List
              spacing="md"
              className="flex text-left flex-col "
              icon={<CheckCircleIcon className="h-6 w-6" />}
            >
              <List.Item>
                <Text>
                  <Text className="font-semibold">AI-Powered GitHub Insights</Text>
                  Instantly analyze your commits, pull requests, and contributions to uncover
                  patterns and strengths.
                </Text>
              </List.Item>
              <List.Item>
                <Text>
                  <Text className="font-semibold">Showcase Your Developer Identity</Text>
                  Transform your GitHub profile into a polished, data-driven resume that highlights
                  your expertise.
                </Text>
              </List.Item>
              <List.Item>
                <Text>
                  <Text className="font-semibold">Leaderboard & Comparisons</Text>
                  See how you rank among developers worldwide and identify areas for improvement.
                </Text>
              </List.Item>
              <List.Item>
                <Text>
                  <Text className="font-semibold">One-Click Sharing</Text>
                  Easily share your profile with recruiters, hiring managers, or your network to
                  stand out.
                </Text>
              </List.Item>
              <List.Item>
                <Text>
                  <Text className="font-semibold">Optimize Your Growth</Text>
                  Receive AI-driven feedback to refine your coding habits and become a better
                  developer.
                </Text>
              </List.Item>
            </List>
            <Image
              height={200}
              width={200}
              src="/pie.svg"
              alt={'image'}
              className="rounded-md hover:scale-105 transition"
            ></Image>
          </motion.div> */}

          <Button
            variant="filled"
            size="lg"
            className="!shadow-md mb-1 mt-8 mx-auto"
            leftSection={<IconBrandGithubFilled className="h-4 w-4" />}
          >
            SCAN NOW
          </Button>
        </motion.div>
      </motion.div>
    </LandingSection>
  );
};
