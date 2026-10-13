/**
 * experience.js — Work experience and education timeline data.
 *
 * All entries are factual, verified, and free of exaggerated claims.
 * Reflects actual mentorship and academic milestones accurately.
 */

export const experience = [
  {
    id: 'persistent',
    type: 'work',
    role: 'Software Engineering Mentee',
    company: 'Persistent Systems',
    period: 'August 2026 – October 2026',
    location: 'Goa, India (Remote)',
    description:
      'Collaborated on a backend-focused code analysis platform combining deterministic static analysis with LLM-based semantic review. Worked with repository analysis workflows, API services and AI-assisted bug detection in a team-based engineering environment.',
    technologies: [
      'Python',
      'FastAPI',
      'Backend Engineering',
      'Static Analysis',
      'LLM Integration',
    ],
    current: false,
  },
];

export const education = [
  {
    id: 'be-it',
    type: 'education',
    degree: 'Bachelor of Engineering (B.E.) in Information Technology',
    institution:
      'Shree Rayeshwar Institute of Engineering & Information Technology, Shiroda, Goa',
    period: 'July 2024 – Expected 2027',
    location: 'Goa, India',
    description:
      'Coursework in data structures and algorithms, database management systems, operating systems, computer networks and software engineering.',
    current: true,
  },
  {
    id: 'diploma',
    type: 'education',
    degree: 'Diploma in Electronics Engineering',
    institution: 'Government Polytechnic Panaji, Altinho, Panaji, Goa',
    period: 'August 2022 – April 2024',
    location: 'Goa, India',
    description:
      'Foundation in electronics engineering, digital systems, circuit fundamentals and technical problem-solving.',
    current: false,
  },
];
