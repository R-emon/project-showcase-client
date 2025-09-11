"use client";

import { AppShell, Group, Button, Title } from "@mantine/core";
import Link from "next/link";

export function AppHeader() {
  return (
    <AppShell.Header>
      <Group h="100%" px="md" justify="space-between">
        <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Title order={3}>DevFolio</Title>
        </Link>
        <Group>
          <Button variant="default">Log in</Button>
          <Button>Sign up</Button>
        </Group>
      </Group>
    </AppShell.Header>
  );
}

<AppShell padding="md">
  <AppShell.Header>
    <AppHeader />
  </AppShell.Header>
  {/* Other components */}
</AppShell>;
