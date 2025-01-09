import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import { delay } from 'lodash';
import { Switch, Tooltip, useMantineColorScheme } from '@mantine/core';

export const ColorSchemeSwitch = () => {
  const { setColorScheme } = useMantineColorScheme();
  return (
    <Tooltip label="Switch to Dark Mode" refProp="rootRef">
      <Switch
        size="sm"
        onLabel={<SunIcon style={{ height: '2em', width: '2em' }} />}
        offLabel={<MoonIcon style={{ height: '2em', width: '2em' }} />}
        onChange={(event) =>
          delay(
            (checked) => setColorScheme(checked ? 'dark' : 'light'),
            200,
            event.currentTarget.checked
          )
        }
      />
    </Tooltip>
  );
};
