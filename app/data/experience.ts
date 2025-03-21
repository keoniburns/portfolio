// Define experience types for better type safety
export type Experience = {
  id: string;
  title: string;
  position: string;
  description: string;
  date: string;
  tags: string[];
};

// Define education types for better type safety
export type Education = {
  id: string;
  title: string;
  degree: string;
  description: string;
  date: string;
};

// Experience data
export const experiences: Experience[] = [
  {
    id: 'exp1',
    title: 'Excalibur Security Inc.',
    position: 'Full-Stack Software Engineer',
    description: 'I lead the development of a scheduling and compliance platform, designing a secure, scalable architecture using React, Node.js, and PostgreSQL. I implemented authentication, access control, and DevOps practices to enhance reliability while building features that streamline payroll and scheduling.',
    date: 'September 2024 - Present',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Docker Compose', 'JWT', 'CI/CD', 'DevOps', 'Role-Based Access Control (RBAC)', 'Database Optimization', 'Authentication']
  },
  {
    id: 'exp2',
    title: 'RideStream',
    position: 'Full-Stack Software Engineer',
    description: 'I played a key role in developing a mobile app, building core features with React Native and integrating real-time data pipelines with AWS. I created playlist functionality, a driver dashboard, and geo-referenced ad targeting while ensuring compliance with data privacy regulations.',
    date: 'March 2020 - March 2022',
    tags: ['React Native', 'AWS S3', 'AWS Lambda', 'DynamoDB', 'Real-Time Data Pipelines', 'Geo-Referencing', 'Mobile Development', 'In-App Playlists', 'Ad Tech', 'GDPR Compliance']
  }
];

// Education data
export const education: Education[] = [
  {
    id: 'edu1',
    title: 'California State University, Chico',
    degree: 'B.S. Computer Science',
    description: 'Computer Science program with focus on software engineering, algorithms, and distributed systems.',
    date: '2021 - 2024'
  }
]; 