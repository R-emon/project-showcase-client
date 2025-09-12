'use client';

import { AppShell, Group, Button, Title } from '@mantine/core';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export function AppHeader() {
  const { token, logout } = useAuth();

  return (
    <AppShell.Header>
      <Group h="100%" px="md" justify="space-between">
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Title order={3}>DevFolio</Title>
        </Link>

        <Group>
          {token ? (
            <>
              {/* --- THIS IS THE NEWLY ADDED SECTION --- */}
              <Link href="/projects/create">
                <Button>Create Project</Button>
              </Link>
              {/* --- END OF NEW SECTION --- */}

              <Button variant="default" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="default">Log in</Button>
              </Link>
              <Link href="/register">
                <Button>Sign up</Button>
              </Link>
            </>
          )}
        </Group>
      </Group>
    </AppShell.Header>
  );
}