import { Title, Button } from '@mantine/core';

export default function HomePage() {
  return (
    <main style={{ padding: '2rem' }}>
      <Title order={1}>Welcome to DevFolio</Title>
      <Button mt="md">This is a Mantine button</Button>
    </main>
  );
}