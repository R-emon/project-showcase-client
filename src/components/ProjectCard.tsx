'use client';

import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { Project } from '@/types/project';
import Link from 'next/link';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={project.imageUrl || 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3'}
          height={160}
          alt={project.title}
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{project.title}</Text>
        <Badge color="pink">by {project.ownerUsername}</Badge>
      </Group>

      <Text size="sm" c="dimmed" lineClamp={3}>
        {project.description}
      </Text>

      <Group mt="md">
          {project.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}
      </Group>

      <Link href={`/projects/${project.id}`} style={{ textDecoration: 'none' }}>
        <Button color="blue" fullWidth mt="md" radius="md">
          View Details
      </Button>
      </Link>
    </Card>
  );
}