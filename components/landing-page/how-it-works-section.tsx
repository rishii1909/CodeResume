import { IconBrandGithubFilled } from '@tabler/icons-react';
import { motion } from 'motion/react';
import { Carousel } from '@mantine/carousel';
import { Button, Stepper, Text, Title } from '@mantine/core';
import { animationContainer, animationItem, LandingSection } from './landing-section';

export const HowItWorksSection: React.FC = () => {
  return (
    <LandingSection
      className="!h-fit bg-gradient-to-b from-transparent  via-slate-100 to-transparentrounded-none md:rounded-lg"
      id="how-it-works"
      fullWidth
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={animationContainer}
        className="text-center items-center flex flex-col w-full"
      >
        <motion.div variants={animationItem}>
          <Title order={1}>How it works</Title>
        </motion.div>
        <motion.div className="w-full flex items-center justify-center" variants={animationItem}>
          <Carousel loop className="w-full max-w-[1200px] px-24 py-8">
            <Carousel.Slide className="m-2">
              <motion.div className=" h-[460px] border-solid border-2 border-slate-500 bg-slate-200 rounded-none md:rounded-lg shadow-lg"></motion.div>
            </Carousel.Slide>
            <Carousel.Slide className="m-2">
              <motion.div className=" h-[460px] border-solid border-2 border-slate-500 bg-slate-200 rounded-none md:rounded-lg shadow-lg"></motion.div>
            </Carousel.Slide>
            <Carousel.Slide className="m-2">
              <motion.div className=" h-[460px] border-solid border-2 border-slate-500 bg-slate-200 rounded-none md:rounded-lg shadow-lg"></motion.div>
            </Carousel.Slide>
          </Carousel>
        </motion.div>

        <motion.div variants={animationItem}>
          <Stepper
            active={0}
            color="primary"
            onStepClick={(step) => console.log(step)}
            className="w-full max-w-[1200px] mx-auto px-4 py-6 border-t-0 border-b-2 border-solid border-l-2 border-r-2 border-slate-200 rounded-b-lg my-4 mb-16"
            classNames={{ step: 'flex flex-col space-y-4 text-center justify-center' }}
          >
            <Stepper.Step
              label={
                <Button
                  variant="filled"
                  className="shadow-md mb-1"
                  leftSection={<IconBrandGithubFilled className="h-4 w-4" />}
                >
                  Connect Github
                </Button>
              }
              description="Authorise via Github OAuth and connect your account"
            />
            <Stepper.Step
              label={<Text className="mb-3">AI analysis</Text>}
              description="Analyses your repos, commits, and contributions"
            />
            <Stepper.Step
              label={<Text className="mb-3">View your Impact Score</Text>}
              description="View your GitHub Impact Score & share your profile"
            />
          </Stepper>
        </motion.div>
      </motion.div>
    </LandingSection>
  );
};
