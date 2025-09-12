'use client';

import { Project } from '@/types/project';
import { Container, Title, Text, Group, Badge, Button, Image, Skeleton } from '@mantine/core';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';

interface DecodedToken {
  sub: string; // 'sub' is the standard claim for subject (username)
  iat: number;
  exp: number;
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const { token } = useAuth();
  const [project, setProject] = useState<Project | null>(null);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  useEffect(() => {
    // Decode the token to find the current user's username
    if (token) {
      const decodedToken: DecodedToken = jwtDecode(token);
      setCurrentUser(decodedToken.sub);
    }

    // Fetch the project data from the API
    async function getProject() {
      const res = await fetch(`http://localhost:8080/api/projects/${params.id}`);
      if (res.ok) {
        const data = await res.json();
        setProject(data);
      }
    }
    getProject();
  }, [params.id, token]);

  const isOwner = project && currentUser === project.ownerUsername;

  if (!project) {
    return (
      <Container py="xl">
        <Skeleton height={400} mb="xl" />
        <Skeleton height={30} width="70%" radius="xl" />
        <Skeleton height={20} mt={6} width="20%" radius="xl" />
        <Skeleton height={100} mt="md" />
      </Container>
    );
  }

  return (
    <Container py="xl">
      <Image
        src={project.imageUrl || 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3'}
        height={400}
        alt={project.title}
        radius="md"
        mb="xl"
      />
      
      <Group justify="space-between" align="center">
        <Title order={1}>{project.title}</Title>
        {isOwner && (
          <Group>
            <Button variant="outline">Edit Project</Button>
            <Button color="red">Delete Project</Button>
          </Group>
        )}
      </Group>

      <Badge size="lg" color="pink" my="md">by {project.ownerUsername}</Badge>
      <Text my="md">{project.description}</Text>
      
      <Group my="xl">
        {(project.tags || []).map((tag) => (
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