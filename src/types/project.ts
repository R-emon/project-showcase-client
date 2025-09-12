export type Project = {
  id: string;
  title: string;
  description: string;
  imageUrl?: string; // Optional fields
  liveUrl?: string;
  repoUrl?: string;
  tags: string[];
  ownerUsername: string;
};