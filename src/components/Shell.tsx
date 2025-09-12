// src/components/Shell.tsx
'use client';

import { MantineProvider, AppShell } from '@mantine/core';
import { AppHeader } from '@/components/Header';
import { ReactNode } from 'react';

export function Shell({ children }: { children: ReactNode }) {
  return (
    <MantineProvider defaultColorScheme="auto">
      <AppShell header={{ height: 60 }} padding="md">
        <AppHeader />
        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}