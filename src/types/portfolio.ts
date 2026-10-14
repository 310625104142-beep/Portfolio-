export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'Full-Stack' | 'Cloud Infrastructure' | 'Developer Tools' | 'FinTech / Real-time';
  description: string;
  fullStory: string;
  techStack: string[];
  liveUrl?: string;
  repoUrl?: string;
  imageUrl: string;
  metrics: {
    label: string;
    value: string;
  }[];
  stars: number;
  year: string;
  featured: boolean;
  architecture: {
    frontend: string;
    backend: string;
    database: string;
    deployment: string;
    diagram?: string;
  };
  keyDecisions: string[];
}

export interface Skill {
  id: string;
  category: 'Frontend' | 'Backend & API' | 'Databases & Storage' | 'DevOps & Cloud' | 'Systems & Core';
  name: string;
  proficiency: number; // 0 - 100
  years: string;
  highlight: string;
  level: 'Expert' | 'Advanced' | 'Proficient';
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: string;
  description: string;
  achievements: string[];
  techStack: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  relationship: string;
  linkedInUrl?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  category: 'Hiring / Job Opportunity' | 'Contract / Consulting' | 'Technical Inquiry' | 'Other';
  createdAt: string;
  status: 'unread' | 'read' | 'archived';
}

export interface DatabaseStats {
  projectsCount: number;
  messagesCount: number;
  skillsCount: number;
  experienceCount: number;
  uptimeSeconds: number;
  memoryUsageMb: number;
  databaseSizeKb: number;
  lastBackup: string;
}

export interface QueryResult {
  columns: string[];
  rows: Record<string, unknown>[];
  rowCount: number;
  executionTimeMs: number;
  query: string;
  error?: string;
}
