import { ProjectCard } from '@/components/ProjectCard';
import { Project } from '@/types/project';
import { Title, SimpleGrid } from '@mantine/core';

async function getProjects(): Promise<Project[]> {
  // Fetch data from our Spring Boot backend
  const res = await fetch('http://localhost:8080/api/projects', {
    // We use 'no-store' to ensure we get fresh data on every request,
    // which is good for development.
    cache: 'no-store', 
  });

  if (!res.ok) {
    // This will be caught by the error page and logged to the console.
    throw new Error('Failed to fetch projects');
  }

  return res.json();
}

export default async function HomePage() {
  const projects = await getProjects();

  return (
    <main>
      <Title order={2} mb="xl">
        Explore Projects
      </Title>
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }}>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </SimpleGrid>
    </main>
  );
}