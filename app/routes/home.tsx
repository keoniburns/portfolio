import React, { useState, useEffect, useRef } from "react";
import { Card } from "../components/Layout";
import constants from "../constants";
import { animate } from "motion";

// Type assertion for constants to address TypeScript error
const typedConstants = constants as {
  programmingLanguages: string[];
  frameworks: string[];
  cloudPlatforms: string[];
  devOpsTools: string[];
  databases: string[];
  parallelComputing: string[];
  testing: string[];
};

// Define content categories
type FilterCategory = "all" | "projects" | "skills" | "experience";

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
  // Add state to track current filter
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");
  const filterIndicatorRef = useRef<HTMLDivElement | null>(null);
  const filterContainerRef = useRef<HTMLDivElement | null>(null);

  // Filter handler function
  const handleFilterChange = (filter: FilterCategory) => {
    // First store the previous active filter before updating
    const previousFilter = activeFilter;

    // Then update state
    setActiveFilter(filter);

    // Animate the content sections
    const sections = document.querySelectorAll(".content-section");

    // First animate all sections out
    sections.forEach((section) => {
      animate(section, { opacity: 0, y: 20 }, { duration: 0.3 });
    });

    // Then animate the visible section in
    setTimeout(() => {
      // When switching to "all", make sure all sections are accessible first
      if (filter === "all") {
        // Find all sections that might still be hidden in the DOM
        const allSections = document.querySelectorAll(
          ".projects-section, .skills-section, .experience-section"
        );
        allSections.forEach((section) => {
          // Check which type of section it is
          (section as HTMLElement).style.display = "grid";

          (section as HTMLElement).style.opacity = "0";
        });

        // Then animate them in with staggered timing
        sections.forEach((section, index) => {
          animate(
            section,
            { opacity: 1, y: 0 },
            { duration: 0.5, delay: 0.1 * index }
          );
        });
      } else {
        // For specific filter, only animate the target section
        const visibleSection = document.querySelector(`.${filter}-section`);
        if (visibleSection) {
          animate(
            visibleSection,
            { opacity: 1, y: 0 },
            { duration: 0.5, delay: 0.1 }
          );
        }
      }
    }, 300);

    // Animate the active filter indicator
    if (filterIndicatorRef.current && filterContainerRef.current) {
      const activeButton = document.querySelector(`[data-filter="${filter}"]`);
      if (activeButton) {
        const rect = activeButton.getBoundingClientRect();
        const containerRect =
          filterContainerRef.current.getBoundingClientRect();

        // Use style properties instead of animate for the indicator
        filterIndicatorRef.current.style.width = `${rect.width}px`;
        filterIndicatorRef.current.style.left = `${
          rect.left - containerRect.left
        }px`;
        filterIndicatorRef.current.style.transition =
          "width 0.4s ease-out, left 0.4s ease-out";
      }
    }
  };

  // Determine if content should be visible based on current filter
  const isVisible = (categories: FilterCategory[]) => {
    return activeFilter === "all" || categories.includes(activeFilter);
  };

  // Initialize animations on component mount
  useEffect(() => {
    // Create the filter indicator
    if (filterContainerRef.current) {
      const indicator = document.createElement("div");
      indicator.className =
        "filter-indicator absolute h-1 bg-[#1DB954] bottom-0 rounded-full transition-all";
      filterContainerRef.current.appendChild(indicator);
      filterIndicatorRef.current = indicator;

      // Initialize indicator position
      const activeButton = document.querySelector('[data-filter="all"]');
      if (activeButton && filterContainerRef.current) {
        const rect = activeButton.getBoundingClientRect();
        const containerRect =
          filterContainerRef.current.getBoundingClientRect();
        indicator.style.width = `${rect.width}px`;
        indicator.style.left = `${rect.left - containerRect.left}px`;
      }
    }

    // Initial animations for content sections
    const sections = document.querySelectorAll(".content-section");
    sections.forEach((section, index) => {
      animate(
        section,
        { opacity: 1, y: 0 },
        { duration: 0.5, delay: 0.1 * index }
      );
    });
  }, []);

  return (
    <>
      {/* Filter tabs */}
      <div
        ref={filterContainerRef}
        className="filter-container relative flex space-x-4 mb-6 pb-1"
      >
        <button
          data-filter="all"
          className={`px-6 py-2 rounded-full font-medium transition-colors ${
            activeFilter === "all"
              ? "bg-[#333333] text-white"
              : "bg-[#181818] text-gray-300 hover:bg-[#282828]"
          }`}
          onClick={() => handleFilterChange("all")}
        >
          All
        </button>
        <button
          data-filter="projects"
          className={`px-6 py-2 rounded-full font-medium transition-colors ${
            activeFilter === "projects"
              ? "bg-[#333333] text-white"
              : "bg-[#181818] text-gray-300 hover:bg-[#282828]"
          }`}
          onClick={() => handleFilterChange("projects")}
        >
          Projects
        </button>
        <button
          data-filter="skills"
          className={`px-6 py-2 rounded-full font-medium transition-colors ${
            activeFilter === "skills"
              ? "bg-[#333333] text-white"
              : "bg-[#181818] text-gray-300 hover:bg-[#282828]"
          }`}
          onClick={() => handleFilterChange("skills")}
        >
          Skills
        </button>
        <button
          data-filter="experience"
          className={`px-6 py-2 rounded-full font-medium transition-colors ${
            activeFilter === "experience"
              ? "bg-[#333333] text-white"
              : "bg-[#181818] text-gray-300 hover:bg-[#282828]"
          }`}
          onClick={() => handleFilterChange("experience")}
        >
          Experience
        </button>
      </div>
      {/* Featured grid section - Projects */}
      {isVisible(["projects"]) && (
        <section className="content-section projects-section mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">
              Projects Made For You
            </h2>
            <a
              href="/projects"
              className="text-sm text-gray-400 hover:text-white"
            >
              Show all
            </a>
          </div>
          <div className="content-section projects-section grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <Card
              title="Parallelized Phase Vocoder"
              description="Parallel programming on distributed system"
              image="/Parallel.jpg"
              link="/projects/1"
            />
            <Card
              title="EndyBot"
              description="SlackBot for post aggregation and distribution"
              image="/p2.jpg"
              link="/projects/2"
            />
            <Card
              title="Stroke Corrector"
              description="an embedded system to help correct stroke consistency for pool players "
              image="/P3.jpg"
              link="/projects/3"
            />
            <Card
              title="DayStart"
              description="A desktop application that provides a single place to journal, read articles, and leetcode"
              image="/p4.jpg"
              link="/projects/4"
            />
          </div>
        </section>
      )}
      {/* Experience section */}
      {isVisible(["experience"]) && (
        <section className="content-section experience-section mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">
              Experienced By Keoni Burns
            </h2>
            <a
              href="/recommended"
              className="text-sm text-gray-400 hover:text-white"
            >
              Show all
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Experience cards */}
            <div className="bg-[#181818] p-4 rounded-lg hover:bg-[#282828] transition-all group cursor-pointer">
              <div className="relative mb-4">
                <img
                  src="../../public/briefcase-icon.svg"
                  alt="Daily Mix 1"
                  className="w-full aspect-square object-cover rounded-md shadow-lg"
                />
                <div className="absolute bottom-2 right-2 bg-[#1DB954] rounded-full p-3 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="font-bold text-white mb-1">
                Excalibur Security Inc.
              </h3>
              <p className="text-gray-400 text-sm">
                Frontend, React, and UI/UX skills
              </p>
            </div>
            {/* Other experience cards */}
            <div className="bg-[#181818] p-4 rounded-lg hover:bg-[#282828] transition-all group cursor-pointer">
              <div className="relative mb-4">
                <img
                  src="../../public/Liatrio.png"
                  alt="Daily Mix 2"
                  className="w-full aspect-square object-cover rounded-md shadow-lg"
                />
                <div className="absolute bottom-2 right-2 bg-[#1DB954] rounded-full p-3 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="font-bold text-white mb-1">Liatrio</h3>
              <p className="text-gray-400 text-sm">DevOps</p>
            </div>

            <div className="bg-[#181818] p-4 rounded-lg hover:bg-[#282828] transition-all group cursor-pointer">
              <div className="relative mb-4">
                <img
                  src="../../public/RideStream.jpg"
                  alt="Daily Mix 3"
                  className="w-full aspect-square object-cover rounded-md shadow-lg"
                />
                <div className="absolute bottom-2 right-2 bg-[#1DB954] rounded-full p-3 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="font-bold text-white mb-1">RideStream</h3>
              <p className="text-gray-400 text-sm">
                Mobile Development, React Native, AWS
              </p>
            </div>
          </div>
        </section>
      )}
      {/* Skills section */}
      {isVisible(["skills"]) && (
        <section className="content-section skills-section mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">
              Skills & Expertise
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#181818] p-4 rounded-md hover:bg-[#282828] transition-all">
              <h3 className="font-bold mb-2 text-white">
                Programming Languages
              </h3>
              <div className="flex flex-wrap gap-2">
                {typedConstants.programmingLanguages.map(
                  (language: string, index: number) => (
                    <span
                      key={index}
                      className="bg-[#282828] px-2 py-1 rounded text-sm text-gray-300"
                    >
                      {language}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="bg-[#181818] p-4 rounded-md hover:bg-[#282828] transition-all">
              <h3 className="font-bold mb-2 text-white">
                Frameworks & Libraries
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  ...typedConstants.frameworks,
                  ...typedConstants.databases,
                  ...typedConstants.testing,
                ].map((framework: string, index: number) => (
                  <span
                    key={index}
                    className="bg-[#282828] px-2 py-1 rounded text-sm text-gray-300"
                  >
                    {framework}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[#181818] p-4 rounded-md hover:bg-[#282828] transition-all">
              <h3 className="font-bold mb-2 text-white">Cloud & DevOps</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  ...typedConstants.cloudPlatforms,
                  ...typedConstants.devOpsTools,
                ].map((tool: string, index: number) => (
                  <span
                    key={index}
                    className="bg-[#282828] px-2 py-1 rounded text-sm text-gray-300"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-[#181818] p-4 rounded-md hover:bg-[#282828] transition-all">
              <h3 className="font-bold mb-2 text-white">Parallel Computing</h3>
              <div className="flex flex-wrap gap-2">
                {[...typedConstants.parallelComputing].map(
                  (tool: string, index: number) => (
                    <span
                      key={index}
                      className="bg-[#282828] px-2 py-1 rounded text-sm text-gray-300"
                    >
                      {tool}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </section>
      )}
      {/* Recently viewed - always visible */}
      {/* <section className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Recently viewed</h2>
          <a href="/history" className="text-sm text-gray-400 hover:text-white">
            Show all
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-[#181818] p-4 rounded-lg hover:bg-[#282828] transition-all group cursor-pointer"
            >
              <div className="relative mb-4">
                <img
                  src={`https://via.placeholder.com/150?text=Project${i}`}
                  alt={`Recent ${i}`}
                  className="w-full aspect-square object-cover rounded-md shadow-lg"
                />
              </div>
              <h3 className="font-bold text-white text-sm truncate">
                Recent Project {i}
              </h3>
              <p className="text-gray-400 text-xs">Last viewed 2d ago</p>
            </div>
          ))}
        </div>
      </section>
      */}
    </>
  );
}
