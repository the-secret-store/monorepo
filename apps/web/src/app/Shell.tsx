import { AppShell, Navbar, Header, Text } from '@mantine/core';

const HEADER_HEIGHT = 60;

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 300 }} height={`calc(100vh - ${HEADER_HEIGHT}px)`} p="xs">
          <Navbar.Section>
            <Text>Hi</Text>
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={HEADER_HEIGHT} p="xs" style={{ display: 'flex', alignItems: 'center' }}>
          <Text color={'violet'} weight={600} size="xl">
            The Secret Store
          </Text>
        </Header>
      }
      styles={theme => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      })}
      style={{ height: '100vh' }}
    >
      {children}
    </AppShell>
  );
}
