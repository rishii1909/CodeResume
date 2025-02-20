import { useEffect } from 'react';
import Image from 'next/image';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { IconBrandGithubFilled } from '@tabler/icons-react';
import { motion } from 'motion/react';
import { Button, Title } from '@mantine/core';
import { LandingSection } from './landing-section';

export const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const buttonAndDivVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 1 },
    },
  };

  const arrowVariants = {
    hidden: { opacity: 0, x: -18, y: 18 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 1.8,
        type: 'spring',
        stiffness: 120,
      },
    },
  };
  return (
    <LandingSection
      fullWidth
      className="flex w-full !pt-36 items-center flex-col bg-gradient-to-b from-slate-200 via-slate-100 to-transparent"
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full flex items-center justify-center flex-col"
      >
        <Title order={1} className="flex flex-col space-y-6 text-center items-center">
          <motion.span variants={itemVariants} className="text-4xl">
            Your <span className="underline px-2 py-0.5 bg-slate-200 rounded-md">Github</span> is
            more than a repo,
          </motion.span>
          <motion.span className="text-6xl" variants={itemVariants}>
            It's your first-hand{' '}
            <span className=" underline px-2 py-0.5 bg-slate-200 rounded-md">Reputation.</span>
          </motion.span>
        </Title>

        <div className="h-[600px] w-full mt-12 ">
          <motion.div variants={buttonAndDivVariants} className="flex flex-col items-center">
            <div className="flex items-center space-x-4 justify-center pr-32 ">
              <motion.div variants={arrowVariants}>
                <Image
                  width={120}
                  height={120}
                  src="/cta-arrow.svg"
                  alt="CTA Arrow"
                  className="mt-3 rotate-[-15deg]"
                />
              </motion.div>
              <Button
                variant="filled"
                className="shadow-md font-semibold"
                size="md"
                leftSection={<IconBrandGithubFilled className="h-4 w-4" />}
                rightSection={<ArrowRightIcon className="h-4 w-4" />}
              >
                Scan now
              </Button>
            </div>
          </motion.div>
          <motion.div
            variants={buttonAndDivVariants}
            className="h-[600px] max-w-[1200px] mx-auto bg-transparent rounded-none md:rounded-lg mt-0"
          >
            <div className="p-4 border-8 border-slate-100 rounded-2xl">
              <Image
                src="/screen.png"
                alt="Screenshot of CodeResume"
                height={800}
                width={1200}
                className=" border-2 border-slate-200 rounded-lg shadow-lg "
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </LandingSection>
  );
};
