import React from "react";
import { Card } from "../components/Layout";

export function meta() {
  return [
    { title: "Your Name - Portfolio" },
    {
      name: "description",
      content: "Personal portfolio showcasing my work and skills",
    },
  ];
}

export default function Home() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Welcome to My Portfolio!</h1>
        <p className="text-gray-300 max-w-2xl">I hope you like snake jazz!</p>
      </div>

      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Featured Projects</h2>
          <a
            href="/projects"
            className="text-sm text-gray-400 hover:text-white"
          >
            View all
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <Card
            title="Project One"
            description="A brief description of what this project is about and the technologies used."
            image="https://via.placeholder.com/300"
            link="/projects/project-one"
          />
          <Card
            title="Project Two"
            description="Another awesome project showcasing different skills and approaches."
            image="https://via.placeholder.com/300"
            link="/projects/project-two"
          />
          <Card
            title="Project Three"
            description="Something completely different that shows your versatility."
            image="https://via.placeholder.com/300"
            link="/projects/project-three"
          />
          <Card
            title="Project Four"
            description="Your most recent or impressive work that you want to highlight."
            image="https://via.placeholder.com/300"
            link="/projects/project-four"
          />
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Skills & Expertise</h2>
          <a href="/skills" className="text-sm text-gray-400 hover:text-white">
            View all
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div className="bg-[#181818] p-4 rounded-md hover:bg-[#282828] transition-all">
            <h3 className="font-bold mb-2">Frontend Development</h3>
            <div className="flex flex-wrap gap-2">
              <span className="bg-[#282828] px-2 py-1 rounded text-sm">
                React
              </span>
              <span className="bg-[#282828] px-2 py-1 rounded text-sm">
                JavaScript
              </span>
              <span className="bg-[#282828] px-2 py-1 rounded text-sm">
                TailwindCSS
              </span>
              <span className="bg-[#282828] px-2 py-1 rounded text-sm">
                React Router
              </span>
            </div>
          </div>

          <div className="bg-[#181818] p-4 rounded-md hover:bg-[#282828] transition-all">
            <h3 className="font-bold mb-2">Backend Development</h3>
            <div className="flex flex-wrap gap-2">
              <span className="bg-[#282828] px-2 py-1 rounded text-sm">
                Node.js
              </span>
              <span className="bg-[#282828] px-2 py-1 rounded text-sm">
                Express
              </span>
              <span className="bg-[#282828] px-2 py-1 rounded text-sm">
                MongoDB
              </span>
              <span className="bg-[#282828] px-2 py-1 rounded text-sm">
                PostgreSQL
              </span>
            </div>
          </div>

          <div className="bg-[#181818] p-4 rounded-md hover:bg-[#282828] transition-all">
            <h3 className="font-bold mb-2">Design Tools</h3>
            <div className="flex flex-wrap gap-2">
              <span className="bg-[#282828] px-2 py-1 rounded text-sm">
                Figma
              </span>
              <span className="bg-[#282828] px-2 py-1 rounded text-sm">
                Adobe XD
              </span>
              <span className="bg-[#282828] px-2 py-1 rounded text-sm">
                Photoshop
              </span>
              <span className="bg-[#282828] px-2 py-1 rounded text-sm">
                Illustrator
              </span>
            </div>
          </div>

          <div className="bg-[#181818] p-4 rounded-md hover:bg-[#282828] transition-all">
            <h3 className="font-bold mb-2">Other Skills</h3>
            <div className="flex flex-wrap gap-2">
              <span className="bg-[#282828] px-2 py-1 rounded text-sm">
                Git
              </span>
              <span className="bg-[#282828] px-2 py-1 rounded text-sm">
                Docker
              </span>
              <span className="bg-[#282828] px-2 py-1 rounded text-sm">
                CI/CD
              </span>
              <span className="bg-[#282828] px-2 py-1 rounded text-sm">
                Agile
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
