'use client';

import { useForm } from '@mantine/form';
import { TextInput, Textarea, Button, Paper, Title, Container, Group, Alert, Loader } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
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
      setIsFetching(true);
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects/${params.id}`;
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Project not found or you do not have permission to view it.');
        }
        const data = await response.json();
        form.setValues({
          title: data.title,
          description: data.description,
          imageUrl: data.imageUrl || '',
          liveUrl: data.liveUrl || '',
          repoUrl: data.repoUrl || '',
          tags: (data.tags || []).join(', '),
        });
      } catch (error) {
        if (error instanceof Error) {
          setApiError(error.message);
        } else {
          setApiError('An unknown error occurred while fetching project data.');
        }
      } finally {
        setIsFetching(false);
      }
    }

    fetchProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects/${params.id}`;
      const response = await fetch(apiUrl, {
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

    } catch (error) { // <-- EDITED SECTION 1
      if (error instanceof Error) {
        setApiError(error.message);
      } else {
        setApiError('An unknown error occurred while updating the project.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return <Container size={600} my={40} style={{ display: 'flex', justifyContent: 'center' }}><Loader /></Container>;
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
          <TextInput label="Title" placeholder="Project title" required {...form.getInputProps('title')} />
          <Textarea label="Description" placeholder="Project description" required mt="md" minRows={4} {...form.getInputProps('description')} />
          <TextInput label="Image URL" placeholder="https://example.com/image.png" mt="md" {...form.getInputProps('imageUrl')} />
          <Group grow mt="md">
            <TextInput label="Live Demo URL" placeholder="https://my-project.com" {...form.getInputProps('liveUrl')} />
            <TextInput label="Source Code URL" placeholder="https://github.com/user/repo" {...form.getInputProps('repoUrl')} />
          </Group>
          <TextInput label="Tags" placeholder="Java, Spring Boot, Next.js" description="Enter tags separated by commas" mt="md" {...form.getInputProps('tags')} />
          
          <Button fullWidth mt="xl" type="submit" loading={isLoading}>
            Save Changes
          </Button>
        </form>
      </Paper>
    </Container>
  );
}