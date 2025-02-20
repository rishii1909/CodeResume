import { IconBrandGithubFilled } from '@tabler/icons-react';
import { motion } from 'motion/react';
import { Carousel } from '@mantine/carousel';
import { Button, Stepper, Text, Title } from '@mantine/core';
import { animationContainer, animationItem, LandingSection } from './landing-section';

export const animationItem2 = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: 'easeOut',
      duration: 0.4,
    },
  },
};

export const TestimonialsSection: React.FC = () => {
  return (
    <LandingSection
      className="!h-fit py-10 bg-gradient-to-b from-transparent  to-slate-200 bg-slate-200 rounded-none md:rounded-lg"
      id="how-it-works"
      fullWidth
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={animationContainer}
        // className="w-full flex items-center justify-center flex-col"
        className="flex flex-col"
      >
        <motion.div variants={animationItem} className="my-6">
          <Title
            order={2}
            className="mx-auto text-center flex items-center flex-col leading-11 my-4"
          >
            <span>
              Join a thriving community of <span className="underline">go-gitters*</span>!
            </span>
            {/* <span>Why hear from us, </span>
            <span>
              when you can hear from <span className="underline">them*</span>?
            </span> */}
          </Title>
          <Text c="dimmed" className="mx-auto text-center italic">
            *Join 5,000+ developers who are unlocking the full potential of their GitHub profiles
            with CodeResume!
          </Text>
        </motion.div>
        <Carousel
          className="w-full px-24 mb-3 mt-8"
          slideSize="20%"
          loop
          withControls={false}
          slideGap="md"
          align="start"
          dragFree
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
            <Carousel.Slide key={index}>
              <motion.div className="h-[200px] border-solid border-2 border-slate-500 bg-slate-300 rounded-none md:rounded-lg shadow-lg"></motion.div>
            </Carousel.Slide>
          ))}
        </Carousel>
        <Carousel
          className="w-full px-24 "
          withControls={false}
          slideSize="25%"
          loop
          slideGap="md"
          align="start"
          dragFree
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
            <Carousel.Slide key={index}>
              <motion.div className="h-[200px] border-solid border-2 border-slate-500 bg-slate-300 rounded-none md:rounded-lg shadow-lg"></motion.div>
            </Carousel.Slide>
          ))}
        </Carousel>
        <Carousel
          className="w-full mt-3 px-24 "
          slideSize="15%"
          loop
          withControls={false}
          slideGap="md"
          align="start"
          dragFree
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
            <Carousel.Slide key={index}>
              <motion.div className="h-[200px] border-solid border-2 border-slate-500 bg-slate-300 rounded-none md:rounded-lg shadow-lg"></motion.div>
            </Carousel.Slide>
          ))}
        </Carousel>
      </motion.div>
    </LandingSection>
  );
};
