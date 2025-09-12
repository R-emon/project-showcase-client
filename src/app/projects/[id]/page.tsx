// src/app/projects/[id]/page.tsx
import { Project } from '@/types/project';
import { Container, Title, Text, Group, Badge, Button, Image } from '@mantine/core';
import Link from 'next/link';

async function getProjectById(id: string): Promise<Project> {
  const res = await fetch(`http://localhost:8080/api/projects/${id}`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch project');
  }
  return res.json();
}

interface ProjectPageProps {
  params: {
    id: string;
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getProjectById(params.id);

  return (
    <Container>
      <Image
        src={project.imageUrl || 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3'}
        height={400}
        alt={project.title}
        radius="md"
        mb="xl"
      />
      <Title order={1}>{project.title}</Title>
      <Badge size="lg" color="pink" my="md">by {project.ownerUsername}</Badge>

      <Text my="md">{project.description}</Text>

      <Group my="xl">
        {project.tags.map((tag) => (
          <Badge key={tag} size="lg" variant="filled">{tag}</Badge>
        ))}
      </Group>

      <Group grow>
        {project.liveUrl && <Button component="a" href={project.liveUrl} target="_blank" rel="noopener noreferrer">Live Demo</Button>}
        {project.repoUrl && <Button component="a" href={project.repoUrl} target="_blank" rel="noopener noreferrer" variant="default">Source Code</Button>}
      </Group>
    </Container>
  );
}