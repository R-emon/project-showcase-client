'use client';

import { Project } from '@/types/project';
import { Container, Title, Text, Group, Badge, Button, Image, Skeleton, Modal } from '@mantine/core';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface DecodedToken {
  sub: string;
  iat: number;
  exp: number;
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const { token } = useAuth();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (token) {
      const decodedToken: DecodedToken = jwtDecode(token);
      setCurrentUser(decodedToken.sub);
    }
    async function getProject() {
      const res = await fetch(`http://localhost:8080/api/projects/${params.id}`);
      if (res.ok) {
        const data = await res.json();
        setProject(data);
      }
    }
    getProject();
  }, [params.id, token]);

  const handleDelete = async () => {
    if (!token) return;

    try {
      const response = await fetch(`http://localhost:8080/api/projects/${params.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete project.');
      }

      setDeleteModalOpen(false);
      router.push('/');
      
    } catch (error) {
      console.error('Deletion error:', error);
      // In a real app, you would show an error notification to the user
    }
  };

  const isOwner = project && currentUser === project.ownerUsername;

  if (!project) {
    // ... loading skeleton JSX ...
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
      {/* ... Image, Title, etc. JSX ... */}
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
            <Link href={`/projects/${project.id}/edit`}>
              <Button variant="outline">Edit Project</Button>
            </Link>
            <Button color="red" onClick={() => setDeleteModalOpen(true)}>Delete Project</Button>
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

      <Modal
          opened={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          title="Confirm Deletion"
          centered
      >
          <Text>Are you sure you want to delete this project? This action cannot be undone.</Text>
          <Group mt="xl" justify="flex-end">
              <Button variant="default" onClick={() => setDeleteModalOpen(false)}>
                  Cancel
              </Button>
              <Button color="red" onClick={handleDelete}>
                  Delete Project
              </Button>
          </Group>
      </Modal>
    </Container>
  );
}