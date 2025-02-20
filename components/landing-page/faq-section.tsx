import clsx from 'clsx';
import { motion } from 'motion/react';
import { Carousel } from '@mantine/carousel';
import { Accordion, Stepper, Text, Title } from '@mantine/core';
import { LandingSection } from './landing-section';

export const animationContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const animationItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: 'easeOut',
      duration: 0.4,
    },
  },
};

export const FAQSection: React.FC = () => {
  return (
    <LandingSection
      className="!h-fit py-12 mb-24 border-t border-slate-200 rounded-none md:rounded-lg"
      id="how-it-works"
      fullWidth
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={animationContainer}
        className="w-full flex items-center justify-center flex-col space-y-8"
      >
        <motion.div variants={animationItem} className="my-6">
          <Title order={1} className=" leading-11 my-4">
            Frequently Asked Questions
          </Title>
        </motion.div>
        <Accordion className="mx-auto !shadow-lg w-full max-w-[1200px] py-0.5 border-2 rounded-lg border-solid border-slate-200">
          {[
            {
              value: 'What is CodeResume?',
              description:
                'CodeResume is an AI-powered GitHub profile analysis tool that helps developers showcase their skills and accomplishments on their GitHub profile.',
              emoji: ' ',
            },
            {
              value: 'How does CodeResume work?',
              description:
                'CodeResume uses AI to analyze your GitHub profile and generate a beautiful, data-driven resume that highlights your skills, accomplishments, and contributions.',
              emoji: ' ',
            },
            {
              value: 'What kind of data does CodeResume analyze?',
              description:
                'CodeResume analyzes your GitHub profile, including your repositories, commits, pull requests, and contributions. It also uses natural language processing to identify relevant skills and technologies in your profile.',
              emoji: ' ',
            },
            {
              value: 'Is CodeResume free?',
              description:
                'Yes, CodeResume is free to use for personal and non-commercial purposes. If you are interested in using CodeResume for commercial purposes, please contact us to discuss pricing.',
              emoji: ' ',
            },
            {
              value: 'How do I get started with CodeResume?',
              description:
                'Getting started with CodeResume is easy! Simply sign up for a free account, connect your GitHub profile, and let our AI do the rest.',
              emoji: ' ',
            },
            {
              value: 'What is the difference between CodeResume and a traditional resume?',
              description:
                'CodeResume is a data-driven resume that is generated using AI and your GitHub profile. It is designed to be more concise and visually appealing than a traditional resume, and is optimized for technical hiring managers and recruiters.',
              emoji: ' ',
            },
            {
              value: 'Can I customize my CodeResume?',
              description:
                'Yes, you can customize your CodeResume by selecting the sections and information you want to include. You can also add a personal statement and other relevant information to make your resume stand out.',
              emoji: ' ',
            },
            {
              value: 'Is CodeResume secure?',
              description:
                'Yes, CodeResume is secure. We use industry-standard encryption and secure servers to protect your data. We also have strict policies and procedures in place to ensure that your data is used only for the purpose of generating your resume.',
              emoji: ' ',
            },
            {
              value: 'Can I use CodeResume if I am not a developer?',
              description:
                'Yes, CodeResume is not just for developers. If you are a technical professional with a GitHub profile, you can use CodeResume to generate a beautiful, data-driven resume that highlights your skills and accomplishments.',
              emoji: ' ',
            },
            {
              value: 'How do I get in touch with CodeResume?',
              description:
                'You can get in touch with CodeResume by sending an email to [support@coderesume.io](mailto:support@coderesume.io). We also have a community Discord server where you can ask questions and get feedback from other users.',
              emoji: ' ',
            },
          ].map((item, i, arr) => (
            <Accordion.Item
              className={clsx(i === arr.length - 1 && 'border-b-0')}
              key={item.value}
              value={item.value}
            >
              <Accordion.Control icon={item.emoji}>
                <motion.span variants={animationItem}>
                  <Text className="hover:underline">{item.value}</Text>
                </motion.span>
              </Accordion.Control>
              <Accordion.Panel>
                <Text className="text-slate-500">{item.description}</Text>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </motion.div>
    </LandingSection>
  );
};
