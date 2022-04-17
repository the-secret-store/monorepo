import { ColorScheme, MantineProvider } from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { WrapperProps } from '../types/wrapper.prop.type';

export function ThemeEngine({ children }: WrapperProps) {
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] =
    useState<ColorScheme>(preferredColorScheme);

  useEffect(() => setColorScheme(preferredColorScheme), [preferredColorScheme]);

  return <MantineProvider theme={{ colorScheme }}>{children}</MantineProvider>;
}
