import { ColorScheme, Global, MantineProvider } from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { WrapperProps } from '../types/wrapper.prop.type';

export function ThemeEngine({ children }: WrapperProps) {
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useState<ColorScheme>(preferredColorScheme);

  useEffect(() => setColorScheme(preferredColorScheme), [preferredColorScheme]);

  return (
    <>
      <Global
        styles={theme => ({
          '*, *::before, *::after': {
            boxSizing: 'border-box',
          },

          body: {
            padding: 0,
            margin: 0,

            ...theme.fn.fontStyles(),
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
            color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
            lineHeight: theme.lineHeight,
          },
        })}
      />
      <MantineProvider
        theme={{
          colorScheme,
        }}
      >
        {children}
      </MantineProvider>
    </>
  );
}
