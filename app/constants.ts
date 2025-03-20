export interface Constants {
  programmingLanguages: string[];
  frameworks: string[];
  cloudPlatforms: string[];
  devOpsTools: string[];
  databases: string[];
  parallelComputing: string[];
  testing: string[];
}

const constants: Constants = {
  // Programming Languages & Frameworks
  programmingLanguages: [
    "C++",
    "C",
    "Python",
    "JavaScript",
    "TypeScript",
    "Golang",
    "ARM Assembly",
    "HTML",
    "CSS",
    "SQL",
    "NoSQL",
    "YAML",
    "JSON",
    "Bash",
  ],

  frameworks: [
    "Express",
    "Node.js",
    "Django",
    "React",
    "React Native",
    "Bootstrap",
  ],

  // Cloud, DevOps & Infrastructure
  cloudPlatforms: ["AWS", "Azure", "GCP"],

  devOpsTools: [
    "Kubernetes",
    "Docker",
    "Terraform",
    "Helm",
    "GitHub Actions",
    "Packer",
    "Vagrant",
  ],

  // Databases & Parallel Computing
  databases: ["PostgreSQL", "DynamoDB", "MongoDB", "Firebase", "SQL", "NoSQL"],

  parallelComputing: ["MPI", "OpenMP", "Pthreads", "Cuda"],

  testing: ["Jest", "Selenium"],
};

export default constants; 