'use client';

import { useForm } from '@mantine/form';
import { TextInput, Textarea, Button, Paper, Title, Container, Alert, Group } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { IconAlertCircle } from '@tabler/icons-react';
import { useAuth } from '@/context/AuthContext';

export default function CreateProjectPage() {
  const router = useRouter();
  const { token } = useAuth();
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    initialValues: {
      title: '',
      description: '',
      imageUrl: '',
      liveUrl: '',
      repoUrl: '',
      tags: '',
    },
    validate: {
      title: (value) => (value.length > 0 ? null : 'Title is required'),
      description: (value) => (value.length > 0 ? null : 'Description is required'),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    if (!token) {
      setApiError('You must be logged in to create a project.');
      return;
    }

    setIsLoading(true);
    setApiError(null);

    const projectData = {
      ...values,
      tags: values.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
    };

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        throw new Error('Failed to create project. Please try again.');
      }

      const newProject = await response.json();
      router.push(`/projects/${newProject.id}`);

    } catch (error: any) {
      setApiError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container size={600} my={40}>
      <Title ta="center">Create a New Project</Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          {/* Form fields go here... */}
          <TextInput label="Title" placeholder="Project title" required {...form.getInputProps('title')} />
          <Textarea label="Description" placeholder="Project description" required mt="md" minRows={4} {...form.getInputProps('description')} />
          <TextInput label="Image URL" placeholder="https://example.com/image.png" mt="md" {...form.getInputProps('imageUrl')} />
          <Group grow mt="md">
            <TextInput label="Live Demo URL" placeholder="https://my-project.com" {...form.getInputProps('liveUrl')} />
            <TextInput label="Source Code URL" placeholder="https://github.com/user/repo" {...form.getInputProps('repoUrl')} />
          </Group>
          <TextInput label="Tags" placeholder="Java, Spring Boot, Next.js" description="Enter tags separated by commas" mt="md" {...form.getInputProps('tags')} />
          
          <Button fullWidth mt="xl" type="submit" loading={isLoading}>
            Submit Project
          </Button>
        </form>
      </Paper>
    </Container>
  );
}