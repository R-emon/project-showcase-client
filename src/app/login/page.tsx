'use client';

// Import Mantine and React hooks
import { useForm } from '@mantine/form';
import { TextInput, PasswordInput, Button, Paper, Title, Container, Alert } from '@mantine/core';
import { useState } from 'react';
import { IconAlertCircle } from '@tabler/icons-react';

// --- CHANGE 1: Import our custom useAuth hook ---
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  // We no longer need useRouter here, as the context will handle redirection
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // --- CHANGE 2: Get the 'login' function from our AuthContext ---
  const { login } = useAuth();

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
    validate: {
      username: (value) => (value.length > 0 ? null : 'Username is required'),
      password: (value) => (value.length > 0 ? null : 'Password is required'),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setIsLoading(true);
    setApiError(null);
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Invalid username or password');
      }

      const data = await response.json();
      
      // --- CHANGE 3: Use the centralized login function ---
      // This single line replaces the manual localStorage and router.push logic
      login(data.token);

    } catch (error: any) {
      setApiError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center">Welcome Back!</Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          {apiError && (
             <Alert icon={<IconAlertCircle size="1rem" />} title="Login Failed" color="red" mb="md">
               {apiError}
             </Alert>
          )}
          <TextInput
            label="Username"
            placeholder="Your username"
            required
            {...form.getInputProps('username')}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            {...form.getInputProps('password')}
          />
          <Button fullWidth mt="xl" type="submit" loading={isLoading}>
            Log in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
