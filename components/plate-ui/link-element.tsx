'use client';

import React from 'react';
import { cn, withRef } from '@udecode/cn';
import type { TLinkElement } from '@udecode/plate-link';
import { useLink } from '@udecode/plate-link/react';
import { PlateElement } from './plate-element';

export const LinkElement = withRef<typeof PlateElement>(
  ({ children, className, ...props }, ref) => {
    const element = props.element as TLinkElement;
    const { props: linkProps } = useLink({ element });

    return (
      <PlateElement
        ref={ref}
        as="a"
        className={cn(
          className,
          'font-medium text-blue-700 visited:text-blue-800 visited:decoration-blue-800 underline decoration-blue-700 underline-offset-4'
        )}
        {...(linkProps as any)}
        {...props}
      >
        {children}
      </PlateElement>
    );
  }
);
