"use client";

import { AppShell, MantineProvider } from "@mantine/core";
import { AppHeader } from "@/components/Header";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider defaultColorScheme="light">
      <AppShell header={{ height: 60 }} padding="md">
        <AppShell.Header>
          <AppHeader />
        </AppShell.Header>
        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}
