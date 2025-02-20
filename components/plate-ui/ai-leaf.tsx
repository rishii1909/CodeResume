'use client';

import React, { useEffect, useState } from 'react';
import { cn, withRef } from '@udecode/cn';
import { AIChatPlugin } from '@udecode/plate-ai/react';
import { PlateLeaf, useEditorPlugin } from '@udecode/plate/react';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

export const AILeaf = withRef<typeof PlateLeaf>(({ children, className, leaf, ...props }, ref) => {
  try {
    const [isHovered, setIsHovered] = useState(false);
    const { api, editor } = useEditorPlugin(AIChatPlugin);

    const { id, timestamp, content, actor, sources } = leaf;

    return (
      <PlateLeaf
        ref={ref}
        className={cn(
          className,
          'border-b-2 border-b-purple-100 bg-purple-50 text-purple-800',
          'transition-all duration-200 ease-in-out'
        )}
        leaf={leaf}
        {...props}
      >
        <Popover open={isHovered} onOpenChange={(open) => setIsHovered(open)}>
          <PopoverTrigger asChild>
            <span
              onMouseEnter={() => {
                setIsHovered(true);
                api.aiChat.show(); // Ensure this doesn't shift editor focus
              }}
              onMouseLeave={() => setIsHovered(false)}
              className="source-highlight underline decoration-dashed decoration-zinc-300 cursor-pointer"
            >
              {content as string}
            </span>
          </PopoverTrigger>
          <PopoverContent
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="p-3"
          >
            {/* Popover content */}
          </PopoverContent>
        </Popover>
      </PlateLeaf>
    );
  } catch (error) {
    console.error(error);
    return null;
  }
});
