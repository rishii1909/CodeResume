import React, { useState } from 'react';
import Link from 'next/link';
import { TElement } from '@udecode/plate';
import { createPlatePlugin, PlateElement, PlateLeaf, withRef } from '@udecode/plate/react';
import clsx from 'clsx';
import { Divider, List, ListItem, Title } from '@mantine/core';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

export const SourceElement = withRef<typeof PlateElement>(
  ({ children, element, ...props }, ref) => {
    try {
      // State for hover interaction
      const [isHovered, setIsHovered] = useState(false);

      const {
        id,
        timestamp,
        content,
        actor,
        sources,
      }: {
        sources: { source: string; loaderId: string }[];
        id: string;
        timestamp: string;
        content: string;
        actor: string;
      } = element as any;

      return (
        <PlateElement
          as={'span'}
          element={element}
          ref={ref}
          {...props}
          className={clsx(
            'decoration-dashed decoration-zinc-300 my-0',
            sources.length && 'underline'
          )}
        >
          {children}
        </PlateElement>
      );

      return (
        //   {/* <p>{children}</p> */}
        <>
          <PlateElement
            as={'span'}
            element={element}
            ref={ref}
            {...props}
            className={clsx(
              'decoration-dashed decoration-zinc-300 my-0',
              sources.length && 'underline'
            )}
            onClick={() => setIsHovered(!isHovered)}
            // onMouseEnter={() => {
            //   setIsHovered(true);
            //   //   api.aiChat.show();
            // }}
            // onMouseLeave={() => setIsHovered(false)}
          >
            {children}
          </PlateElement>

          <Popover open={isHovered}>
            <PopoverTrigger></PopoverTrigger>
            <PopoverContent className="p-3 w-fit">
              <Title order={4} className="mb-3">
                {sources?.length ? (sources.length > 0 ? 'Source:' : 'Sources:') : 'No Sources.'}
              </Title>
              <List type="ordered" className="p-1">
                {sources?.map((source, index: number) => (
                  <React.Fragment key={index}>
                    <ListItem key={index} className="italic">
                      {index + 1}. <Link href={source.source}>{source.source}</Link>
                    </ListItem>
                    {index < sources.length - 1 && <Divider className="m-1" />}
                  </React.Fragment>
                ))}
              </List>
            </PopoverContent>
          </Popover>
        </>
      );
    } catch (error) {
      console.log(error);
    }
  }
);

export const SourcePlugin = createPlatePlugin({
  key: 'source',
  node: {
    isElement: true,
    isInline: true,
    type: 'source',
    component: SourceElement,
  },
});
