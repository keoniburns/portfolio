// Define project types for better type safety
export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  demoUrl?: string;
  github?: string;
  detailedDescription?: string;
};

// Sample projects data - in a real app, this might come from an API or database
export const projects: Project[] = [
  {
    id: "1",
    title: "Parallelized Phase Vocoder",
    description: "Parallel programming on distributed system",
    detailedDescription:
      "An audio processing tool that uses parallel computing techniques to accelerate time-stretching and pitch-shifting. Implemented using MPI and OpenMP for distributed processing across multiple nodes.",
    image: "/Parallel.jpg",
    tags: ["C++", "MPI", "OpenMP", "Audio Processing", "Parallel Computing"],
    link: "/projects/1",
    github: "https://github.com/keoniburns/parallelized-phase-vocoder",
  },
  {
    id: "2",
    title: "EndyBot",
    description: "SlackBot for post aggregation and distribution",
    detailedDescription:
      "A Slack bot that aggregates and categorizes messages from multiple channels, then distributes summaries to team members based on their preferences and roles.",
    image: "/p2.jpg",
    tags: ["Node.js", "Slack API", "MongoDB", "NLP", "AWS Lambda"],
    link: "/projects/2",
    github:"",
    demoUrl: "https://endybot-demo.example.com",
  },
  {
    id: "3",
    title: "Stroke Corrector",
    description:
      "An embedded system to help correct stroke consistency for pool players",
    detailedDescription:
      "A precision device that attaches to pool cues to measure and analyze stroke mechanics. Provides real-time feedback to improve player consistency through a companion mobile app.",
    image: "/P3.jpg",
    tags: [
      "Embedded Systems",
      "Arduino",
      "Bluetooth",
      "React Native",
      "Motion Sensors",
    ],
    link: "/projects/3",
    github: "https://github.com/keoniburns/stroke-corrector",
  },
  {
    id: "4",
    title: "DayStart",
    description:
      "A desktop application that provides a single place to journal, read articles, and leetcode",
    detailedDescription:
      "An all-in-one productivity desktop application that combines journaling, article reading, and coding practice. Features include daily goal tracking, offline article saving, and LeetCode integration.",
    image: "/p4.jpg",
    tags: ["Electron", "React", "TypeScript", "IndexedDB", "REST APIs"],
    link: "/projects/4",
    github: "https://github.com/keoniburns/daystart",
    demoUrl: "https://daystart-demo.example.com",
  },
]; 
