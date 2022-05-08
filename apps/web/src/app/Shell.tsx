import { AppShell, Navbar, Header } from '@mantine/core';

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar
          width={{ base: 300 }}
          height={500}
          p="xs"
          style={{ minHeight: 'calc(100vh - 60px)' }}
        >
          {/* Navbar content */}
          <p>Navbar</p>
        </Navbar>
      }
      header={
        <Header height={60} p="xs">
          {/* Header content */}
          <p>Header</p>
        </Header>
      }
      styles={theme => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      })}
    >
      <h1>Hello World</h1>
      {children}
      {/* Your application here */}
    </AppShell>
  );
}
