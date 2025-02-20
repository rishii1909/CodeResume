import React from 'react';
import { Divider } from '@mantine/core';
import { AboutUsSection } from './about-us-section';
import { FAQSection } from './faq-section';
import { HeroSection } from './hero-section';
import { HowItWorksSection } from './how-it-works-section';
import { OnboardingSection } from './onboarding-section';
import { TestimonialsSection } from './testimonials-section';

/**
 * The LandingPage component serves as the main container for the landing page sections.
 * It includes various sections such as HeroSection and OnboardingSection.
 * Additional sections like HowItWorksSection, AboutUsSection, TestimonialsSection,
 * and FAQSection are currently commented out and can be included as needed.
 */

export const LandingPage = () => {
  return (
    <div className="">
      <HeroSection></HeroSection>
      <Divider />
      <OnboardingSection />
      {/* <Divider />
      <HowItWorksSection />
      <Divider /> */}
      <AboutUsSection />
      <FAQSection />
      {/* <TestimonialsSection /> */}
    </div>
  );
};
