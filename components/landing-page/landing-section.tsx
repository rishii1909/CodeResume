import clsx from 'clsx';

interface LandingSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  fullWidth?: boolean;
}

export const LandingSection: React.FC<LandingSectionProps> = ({
  children,
  fullWidth = false,
  className,
  ...rest
}) => {
  return (
    <div
      {...rest}
      className={clsx(
        fullWidth ? 'w-full' : 'mx-auto max-w-[1200px]',
        'px-2 sm:px-4 lg:px-6 py-12 pt-12 lg:py-12',
        'h-screen max-h-[1400px]',
        className
      )}
    >
      {children}
    </div>
  );
};

export const animationContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.6,
    },
  },
};

export const animationItem = {
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
