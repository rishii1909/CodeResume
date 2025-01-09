'use client';

import { createTheme, virtualColor } from '@mantine/core';

export const theme = createTheme({
  primaryColor: 'primary',
  colors: {
    primary: virtualColor({
      name: 'primary',
      dark: 'violet',
      light: 'dark',
    }),
  },
});
