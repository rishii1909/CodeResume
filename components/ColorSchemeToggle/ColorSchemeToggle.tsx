'use client';

import { Button, Group, useMantineColorScheme } from '@mantine/core';
import { ColorSchemeSwitch } from '../ColorSchemeSwitch/ColorSchemeSwitch';

export function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme();

  return (
    <Group justify="center" mt="xl">
      <Button onClick={() => setColorScheme('light')}>Light</Button>
      <Button onClick={() => setColorScheme('dark')}>Dark</Button>
      <Button onClick={() => setColorScheme('auto')}>Auto</Button>
      <ColorSchemeSwitch />
    </Group>
  );
}
