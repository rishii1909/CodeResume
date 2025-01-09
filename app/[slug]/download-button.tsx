'use client';

import React from 'react';
import { usePDF } from 'react-to-pdf';
import { Button } from '@mantine/core';

export const DownloadButton = ({ username }: { username: string }) => {
  const { toPDF, targetRef } = usePDF({ filename: `${username}'s Github Resume.pdf` });

  return <Button onClick={() => toPDF()}>Download Resume</Button>;
};
