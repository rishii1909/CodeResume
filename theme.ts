'use client';

import { createTheme, virtualColor } from '@mantine/core';

export const theme = createTheme({
  fontFamily: 'Inter, sans-serif',
  headings: {
    fontFamily: 'Inter, sans-serif',
    sizes: {
      h1: { fontSize: '48px', fontWeight: '550', lineHeight: '1.5' },
      h2: { fontSize: '32px', fontWeight: '550', lineHeight: '1.5' },
      h3: { fontSize: '24px', fontWeight: '550', lineHeight: '1.5' },
      h4: { fontWeight: '550', lineHeight: '1.5' },
    },
  },
  primaryColor: 'primary',
  colors: {
    primary: [
      '#eceef0',
      '#d9dce1',
      '#b3b9c3',
      '#8e96a6',
      '#687388',
      '#42506a',
      '#354055',
      '#283040',
      '#1a202a',
      '#0d1015',
    ],
    secondary: virtualColor({
      name: 'secondary',
      dark: '#1A202C',
      light: '#F7FAFC',
    }),
    accent: virtualColor({
      name: 'accent',
      dark: '#48BB78',
      light: '#E53E3E',
    }),
  },
});
