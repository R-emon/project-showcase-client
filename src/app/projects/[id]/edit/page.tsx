'use client';

import { useForm } from '@mantine/form';
import { TextInput, Textarea, Button, Paper, Title, Container, Alert, Group, Loader } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { IconAlertCircle } from '@tabler/icons-react';
import { useAuth } from '@/context/AuthContext';

export default function EditProjectPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { token } = useAuth();
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

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

  useEffect(() => {
    async function fetchProject() {
      const res = await fetch(`http://localhost:8080/api/projects/${params.id}`);
      if (res.ok) {
        const project = await res.json();
        form.setValues({
          ...project,
          tags: project.tags.join(', '),
        });
      }
      setIsFetching(false);
    }
    fetchProject();
  }, [params.id]);

  const handleSubmit = async (values: typeof form.values) => {
    if (!token) {
      setApiError('You must be logged in to edit a project.');
      return;
    }

    setIsLoading(true);
    setApiError(null);

    const projectData = {
      ...values,
      tags: values.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
    };

    try {
      const response = await fetch(`http://localhost:8080/api/projects/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        throw new Error('Failed to update project. Please try again.');
      }
      router.push(`/projects/${params.id}`);

    } catch (error: any) {
      setApiError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isFetching) {
    return <Container my={40} style={{ display: 'flex', justifyContent: 'center' }}><Loader /></Container>;
  }

  return (
    <Container size={600} my={40}>
      <Title ta="center">Edit Project</Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          {apiError && (
             <Alert icon={<IconAlertCircle size="1rem" />} title="Error" color="red" mb="md">
               {apiError}
             </Alert>
          )}
          <TextInput label="Title" {...form.getInputProps('title')} />
          <Textarea label="Description" mt="md" minRows={4} {...form.getInputProps('description')} />
          <TextInput label="Image URL" mt="md" {...form.getInputProps('imageUrl')} />
          <Group grow mt="md">
            <TextInput label="Live Demo URL" {...form.getInputProps('liveUrl')} />
            <TextInput label="Source Code URL" {...form.getInputProps('repoUrl')} />
          </Group>
          <TextInput label="Tags" description="Enter tags separated by commas" mt="md" {...form.getInputProps('tags')} />
          
          <Button fullWidth mt="xl" type="submit" loading={isLoading}>
            Save Changes
          </Button>
        </form>
      </Paper>
    </Container>
  );
}