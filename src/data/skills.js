/**
 * skills.js — Skill categories and technology list.
 *
 * Organized into logical engineering groups reflecting backend
 * architecture, databases, languages, applied AI, and tooling.
 * Verified and accurate to actual project work and technical foundation.
 */

export const skillGroups = [
  {
    id: 'backend',
    label: 'Backend and APIs',
    icon: 'server',
    skills: [
      { name: 'Python' },
      { name: 'FastAPI' },
      { name: 'Django' },
      { name: 'Django REST Framework' },
      { name: 'REST API Development' },
    ],
  },
  {
    id: 'languages',
    label: 'Programming Languages',
    icon: 'code',
    skills: [
      { name: 'Python' },
      { name: 'JavaScript' },
      { name: 'C' },
      { name: 'C++' },
    ],
  },
  {
    id: 'databases',
    label: 'Databases and Data Systems',
    icon: 'database',
    skills: [
      { name: 'PostgreSQL' },
      { name: 'MySQL' },
      { name: 'SQL — Schema Design and Querying' },
      { name: 'Redis — Caching and Pub/Sub' },
      { name: 'ChromaDB — Vector Storage' },
    ],
  },
  {
    id: 'ai',
    label: 'AI and LLM Applications',
    icon: 'brain',
    skills: [
      { name: 'LangChain' },
      { name: 'LLM API Integration' },
      { name: 'Retrieval-Augmented Generation (RAG)' },
      { name: 'Vector Embeddings and Retrieval' },
      { name: 'Document Ingestion and Processing' },
      { name: 'Structured Output Validation' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools and Development Workflow',
    icon: 'wrench',
    skills: [
      { name: 'Git and GitHub' },
      { name: 'Docker' },
      { name: 'Postman' },
      { name: 'JWT Authentication' },
    ],
  },
];
