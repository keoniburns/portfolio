import React, { useState, useEffect, useRef } from "react";
import { Link, useSearchParams, useNavigate } from "react-router";
import { Card } from "../components/Layout";
import { projects } from "../data/projects";
import type { Project } from "../data/projects";
import ProjectModal from "../components/ProjectModal";

// Define filter categories
type FilterCategory = "all" | "web" | "mobile" | "embedded" | "parallel";

/**
 * Projects page component
 * Displays a filterable grid of projects with search functionality
 */
export default function Projects() {
  // Use React Router hooks
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Get initial values from URL
  const initialFilter =
    (searchParams.get("category") as FilterCategory) || "all";
  const initialSearch = searchParams.get("q") || "";

  // Local state for UI
  const [activeFilter, setActiveFilter] =
    useState<FilterCategory>(initialFilter);
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  // Add state for modal
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (activeFilter !== "all") params.set("category", activeFilter);

    // Update URL without full page reload
    setSearchParams(params);
  }, [activeFilter, searchQuery, setSearchParams]);

  // Handle filter changes
  const handleFilterChange = (filter: FilterCategory) => {
    setActiveFilter(filter);
  };

  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle search visibility
  const showSearch = () => {
    setIsSearchVisible(true);
    // Focus the input when shown
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 100);
  };

  const hideSearch = () => {
    // Only hide if there's no search query
    if (!searchQuery) {
      setIsSearchVisible(false);
    }
  };

  // Function to open modal with project data
  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setModalOpen(false);
    setSelectedProject(null);
  };

  // Filter projects based on category and search query
  const filteredProjects = projects.filter((project) => {
    // First check if it matches the category filter
    const matchesCategory =
      activeFilter === "all" ||
      (activeFilter === "web" &&
        project.tags.some((tag) =>
          ["React", "Node.js", "TypeScript", "JavaScript", "Web"].includes(tag)
        )) ||
      (activeFilter === "mobile" &&
        project.tags.some((tag) =>
          ["React Native", "Mobile", "iOS", "Android"].includes(tag)
        )) ||
      (activeFilter === "embedded" &&
        project.tags.some((tag) =>
          ["Embedded Systems", "Arduino", "IoT", "Hardware"].includes(tag)
        )) ||
      (activeFilter === "parallel" &&
        project.tags.some((tag) =>
          [
            "Parallel Computing",
            "MPI",
            "OpenMP",
            "CUDA",
            "Distributed Systems",
          ].includes(tag)
        ));

    // Then check if it matches the search query
    const matchesSearch =
      searchQuery === "" ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return matchesCategory && matchesSearch;
  });

  // Set document title (React Router doesn't handle this automatically)
  useEffect(() => {
    document.title = "Projects | Your Portfolio";
  }, []);

  return (
    <div className="pb-10 overflow-x-hidden">
      {/* Restructured page header with search bar on the right */}
      <div className="mb-8 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="md:max-w-[60%]">
          <h1 className="text-3xl font-bold text-white mb-2">My Projects</h1>
          <p className="text-gray-400">
            Explore my portfolio of projects spanning web, mobile, embedded
            systems, and parallel computing
          </p>
        </div>
      </div>

      {/* Filter buttons in their own section */}
      <div className="mb-8">
        {/* Filter buttons and search in a row with spacing between them */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Filter buttons */}
          <div className="flex space-x-2 overflow-x-auto pb-1 max-w-full">
            <button
              className={`px-3 sm:px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap ${
                activeFilter === "all"
                  ? "bg-[#1DB954] text-black"
                  : "bg-[#282828] text-gray-300 hover:bg-[#333333]"
              }`}
              onClick={() => handleFilterChange("all")}
            >
              All Projects
            </button>
            <button
              className={`px-3 sm:px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap ${
                activeFilter === "web"
                  ? "bg-[#1DB954] text-black"
                  : "bg-[#282828] text-gray-300 hover:bg-[#333333]"
              }`}
              onClick={() => handleFilterChange("web")}
            >
              Web
            </button>
            <button
              className={`px-3 sm:px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap ${
                activeFilter === "mobile"
                  ? "bg-[#1DB954] text-black"
                  : "bg-[#282828] text-gray-300 hover:bg-[#333333]"
              }`}
              onClick={() => handleFilterChange("mobile")}
            >
              Mobile
            </button>
            <button
              className={`px-3 sm:px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap ${
                activeFilter === "embedded"
                  ? "bg-[#1DB954] text-black"
                  : "bg-[#282828] text-gray-300 hover:bg-[#333333]"
              }`}
              onClick={() => handleFilterChange("embedded")}
            >
              Embedded
            </button>
            <button
              className={`px-3 sm:px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap ${
                activeFilter === "parallel"
                  ? "bg-[#1DB954] text-black"
                  : "bg-[#282828] text-gray-300 hover:bg-[#333333]"
              }`}
              onClick={() => handleFilterChange("parallel")}
            >
              Parallel
            </button>
          </div>

          {/* Search bar */}
          <div className="relative flex items-center md:w-auto">
            {/* Search toggle button/icon */}
            <button
              className="p-2 rounded-full bg-[#282828] hover:bg-[#333333] text-gray-300 transition-all"
              onClick={showSearch}
              aria-label="Search projects"
              style={{ zIndex: isSearchVisible ? 0 : 1 }}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </button>

            {/* Search input - animated expansion */}
            <div
              className={`absolute right-0 ${
                isSearchVisible
                  ? "opacity-100 w-64 md:w-80"
                  : "opacity-0 w-0 pointer-events-none"
              } transition-all duration-300 ease-in-out`}
            >
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
                <input
                  ref={searchInputRef}
                  type="text"
                  className="block w-full pl-10 pr-10 py-2 bg-[#282828] border-none rounded-full text-white focus:ring-[#1DB954] focus:ring-1 focus:outline-none"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onBlur={hideSearch}
                />
                {searchQuery && (
                  <button
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                    onClick={() => setSearchQuery("")}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project grid - adjusted for smaller cards */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-[#181818] rounded-lg overflow-hidden hover:bg-[#282828] transition-all cursor-pointer"
              onClick={() => openProjectModal(project)}
            >
              {/* Smaller aspect ratio for images */}
              <div className="relative aspect-[16/9]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                {" "}
                {/* Reduced padding */}
                <h3 className="text-lg font-bold text-white mb-1">
                  {" "}
                  {/* Smaller text */}
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-3">
                  {project.description}
                </p>{" "}
                {/* Smaller text */}
                {/* Tags with more compact styling */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {" "}
                  {/* Reduced gap */}
                  {/* Limit tags shown */}
                  {project.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-0.5 bg-[#282828] text-gray-300 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="px-2 py-0.5 bg-[#282828] text-gray-300 text-xs rounded-full">
                      +{project.tags.length - 3} more
                    </span>
                  )}
                </div>
                {/* Project links with tighter layout */}
                <div className="flex items-center space-x-3 mt-2">
                  {" "}
                  {/* Reduced spacing */}
                  <Link
                    to={project.link}
                    className="text-[#1DB954] text-sm font-medium hover:underline"
                  >
                    {/* Smaller text */}
                    View Project
                  </Link>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white flex items-center text-sm"
                    >
                      {/* Smaller text */}
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      GitHub
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white flex items-center"
                    >
                      <svg
                        className="w-5 h-5 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        ></path>
                      </svg>
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl text-white mb-2">No projects found</h3>
          <p className="text-gray-400">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          isOpen={modalOpen} 
          onClose={closeModal} 
        />
      )}

      {/* Back to home link */}
      <div className="mt-10">
        <Link
          to="/"
          className="text-gray-400 hover:text-white flex items-center"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
