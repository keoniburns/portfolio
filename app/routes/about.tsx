import React from "react";

export function meta() {
  return [
    { title: "About Me - Portfolio" },
    {
      name: "description",
      content: "Learn more about my background and experience",
    },
  ];
}

export default function About() {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">About Me</h1>

      <div className="flex flex-col md:flex-row gap-8 mb-10">
        <div className="md:w-1/3">
          <div className="bg-[#282828] rounded-lg overflow-hidden">
            <img
              src="/me2.JPEG"
              alt="Your Name"
              className="w-full object-cover"
            />
          </div>
        </div>

        <div className="md:w-2/3">
          <p className="mb-4 text-gray-300">
            Hello! I'm Keoni Burns, a Software Engineer based in Los Angeles. I
            currently work in the compliance and time and attendance space, but
            I have a love for Ai and embedded systems, specifically autonomous
            navigation.
          </p>

          <p className="mb-4 text-gray-300">
            I currently work for Excalibur Security leading the initiative for a
            proprietary time and attendance platform. I have been developing
            this platform for the past 6 months with a small team of hungry
            developers and our goal is to be a competitor alongside the likes of
            workday and ukg. Previously I have worked across the tech stack and
            in differing disciplines like mobile/web development, DevOps and
            infrastructure, and project management.
          </p>

          <p className="mb-6 text-gray-300">
            When I'm not coding, you can find me at the local pool hall with my
            girlfriend or if it's the season at heavenly or boreal shredding some
            pow.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="/contact"
              className="bg-[#1DB954] text-white px-6 py-2 rounded-full hover:bg-opacity-80 transition-all"
            >
              Contact Me
            </a>
            <a
              href="/path-to-your-resume.pdf"
              target="_blank"
              className="bg-transparent border border-white text-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition-all"
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Experience</h2>

        <div className="bg-[#181818] p-6 rounded-lg mb-4">
          <div className="flex justify-between mb-2">
            <h3 className="font-bold text-white">Excalibur Security Inc.</h3>
            <span className="text-gray-400">September 2024 - Present</span>
          </div>
          <h4 className="text-[#1DB954] mb-2">Full-Stack Software Engineer</h4>
          <p className="text-gray-300">I lead the development of a scheduling and compliance platform, designing a secure, scalable architecture using React, Node.js, and PostgreSQL. I implemented authentication, access control, and DevOps practices to enhance reliability while building features that streamline payroll and scheduling.
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {["React", "Node.js", "PostgreSQL", "Docker Compose", "JWT", "CI/CD", "DevOps", "Role-Based Access Control (RBAC)", "Database Optimization", "Authentication"].map((tag, index) => (
              <span key={index} className="bg-[#282828] text-gray-300 text-xs px-2 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-[#181818] p-6 rounded-lg mb-4">
          <div className="flex justify-between mb-2">
            <h3 className="font-bold text-white">Liatrio</h3>
            <span className="text-gray-400">June 2023 - November 2023</span>
          </div>
          <h4 className="text-[#1DB954] mb-2">DevOps Engineer</h4>
          <p className="text-gray-300">I developed “Endybot,” an automation tool that reduced managerial overhead, and optimized cloud infrastructure by deploying containerized applications on AWS. I enhanced CI/CD pipelines, automated infrastructure provisioning, and maintained Kubernetes deployments for high availability and efficiency.</p>
          <div className="flex flex-wrap gap-2 mt-3">
            {["Slack Bot", "AWS EKS", "AWS ECS", "Docker", "Kubernetes", "GitHub Actions", "Terraform", "Helm", "CI/CD", "Infrastructure Automation", "Cloud Computing"].map((tag, index) => (
              <span key={index} className="bg-[#282828] text-gray-300 text-xs px-2 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-[#181818] p-6 rounded-lg">
          <div className="flex justify-between mb-2">
            <h3 className="font-bold text-white">RideStream</h3>
            <span className="text-gray-400">March 2020 - March 2022</span>
          </div>
          <h4 className="text-[#1DB954] mb-2">Full-Stack Software Engineer</h4>
          <p className="text-gray-300">I played a key role in developing a mobile app, building core features with React Native and integrating real-time data pipelines with AWS. I created playlist functionality, a driver dashboard, and geo-referenced ad targeting while ensuring compliance with data privacy regulations.
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {["React Native", "AWS S3", "AWS Lambda", "DynamoDB", "Real-Time Data Pipelines", "Geo-Referencing", "Mobile Development", "In-App Playlists", "Ad Tech", "GDPR Compliance"].map((tag, index) => (
              <span key={index} className="bg-[#282828] text-gray-300 text-xs px-2 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Education</h2>

        <div className="bg-[#181818] p-6 rounded-lg">
          <div className="flex justify-between mb-2">
            <h3 className="font-bold text-white">California State University, Chico</h3>
            <span className="text-gray-400">2021 - 2024</span>
          </div>
          <h4 className="text-[#1DB954] mb-2">B.S. Computer Science</h4>
          <p className="text-gray-300">
          Gotta figure out tf ima put on this jawn
          </p>
        </div>
      </div>
    </div>
  );
}
