import React, { useState, useEffect, useRef } from "react";
import constants from "../constants";
// import { projects } from "../data/projects";
import type { Project } from "../data/projects";
import { projects } from "../data/projects";
import ProjectModal from "../components/ProjectModal";

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

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Add refs and state for carousel
  const carouselRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Add state to track friend activity panel status
  const [friendActivityOpen, setFriendActivityOpen] = useState(false);

  // Add ref to track previous view state
  const previousViewWasCarousel = useRef(false);

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

  // Filter handler function - using CSS transitions instead of animate
  const handleFilterChange = (filter: FilterCategory) => {
    // Store the previous active filter before updating
    const previousFilter = activeFilter;

    // Update state
    setActiveFilter(filter);

    // Ensure the filter indicator updates by querying the correct button and moving the indicator
    if (filterIndicatorRef.current && filterContainerRef.current) {
      const activeButton = document.querySelector(`[data-filter="${filter}"]`);
      if (activeButton) {
        const rect = activeButton.getBoundingClientRect();
        const containerRect =
          filterContainerRef.current.getBoundingClientRect();

        // Set position with transition
        filterIndicatorRef.current.style.width = `${rect.width}px`;
        filterIndicatorRef.current.style.left = `${
          rect.left - containerRect.left
        }px`;
        filterIndicatorRef.current.style.transition =
          "width 0.4s ease-out, left 0.4s ease-out";

        // Ensure the indicator is visible
        filterIndicatorRef.current.style.opacity = "1";
      }
    }

    // Reset scroll positions and ensure layout consistency
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = 0;
    }

    // Find all content sections once
    const sections = document.querySelectorAll(".content-section");

    // Cancel any ongoing animations
    sections.forEach((section) => {
      const el = section as HTMLElement;
      // Clear any transition delays
      el.style.transitionDelay = "";
    });

    if (filter === "all") {
      // For "all" filter, make all sections visible first
      sections.forEach((section, index) => {
        const el = section as HTMLElement;
        // Set initial opacity and transform for animation
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";

        // Preserve original display type
        if (section.classList.contains("projects-section")) {
          el.style.display = "grid"; // Restore grid display for projects
        } else {
          el.style.display = "block"; // Use block for others
        }

        // Apply staggered delays
        const delay = 0.08 * index;
        el.style.transitionDelay = `${delay}s`;

        // Force a reflow to ensure the initial state is applied
        void el.offsetWidth;

        // Then set the final state to trigger animation
        setTimeout(() => {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }, 10);
      });
    } else {
      // For specific filters, handle differently
      sections.forEach((section) => {
        const el = section as HTMLElement;

        if (section.classList.contains(`${filter}-section`)) {
          // Show and animate in the matching section
          if (filter === "projects") {
            el.style.display = "grid"; // Use grid for projects
          } else {
            el.style.display = "block"; // Use block for others
          }

          // Set initial state
          el.style.opacity = "0";
          el.style.transform = "translateY(20px)";

          // Force a reflow
          void el.offsetWidth;

          // Apply final state
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        } else {
          // Animate out non-matching sections, then hide them
          el.style.opacity = "0";
          el.style.transform = "translateY(20px)";

          // Hide after transition completes
          setTimeout(() => {
            el.style.display = "none";
          }, 300);
        }
      });
    }
  };

  // Determine if content should be visible based on current filter
  const isVisible = (categories: FilterCategory[]) => {
    return activeFilter === "all" || categories.includes(activeFilter);
  };

  // Initialize filter indicator and initial content transitions
  useEffect(() => {
    // Remove any existing indicator first to prevent duplicates
    const existingIndicator =
      filterContainerRef.current?.querySelector(".filter-indicator");
    if (existingIndicator) {
      existingIndicator.remove();
    }

    // Create the filter indicator
    if (filterContainerRef.current) {
      const indicator = document.createElement("div");
      indicator.className =
        "filter-indicator absolute h-1 bg-[#1DB954] bottom-0 rounded-full transition-all";
      filterContainerRef.current.appendChild(indicator);
      filterIndicatorRef.current = indicator;

      // Initialize indicator position
      const activeButton = document.querySelector(
        `[data-filter="${activeFilter}"]`
      );
      if (activeButton && filterContainerRef.current) {
        const rect = activeButton.getBoundingClientRect();
        const containerRect =
          filterContainerRef.current.getBoundingClientRect();
        indicator.style.width = `${rect.width}px`;
        indicator.style.left = `${rect.left - containerRect.left}px`;
      }
    }

    // Initial animations for content sections using CSS transitions
    const sections = document.querySelectorAll(".content-section");
    sections.forEach((section, index) => {
      const el = section as HTMLElement;
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "opacity 0.5s ease-out, transform 0.5s ease-out";
      el.style.transitionDelay = `${0.1 * index}s`;

      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 10);
    });
  }, []);

  // Add a resize observer to handle dynamic width changes
  useEffect(() => {
    // Create resize observer to detect container width changes
    if (carouselRef.current) {
      const resizeObserver = new ResizeObserver(() => {
        // When container width changes, update carousel
        handleCarouselScroll();
      });

      // Observe both the carousel and its parent container
      resizeObserver.observe(carouselRef.current);
      if (carouselRef.current.parentElement) {
        resizeObserver.observe(carouselRef.current.parentElement);
      }

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, []);

  // Update the scrollCarousel function to scroll by one project width
  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      // Calculate the width of the container
      const containerWidth =
        carouselRef.current.parentElement?.clientWidth ||
        carouselRef.current.clientWidth;

      // Calculate how many items are visible based on container width
      const visibleItems = Math.floor(containerWidth / 300); // Approximate item width with gaps

      // Calculate the width of a single item (including gap)
      const itemWidth = containerWidth / visibleItems;

      // Get current scroll position
      const currentScroll = carouselRef.current.scrollLeft;

      // Calculate new scroll position
      const newScroll =
        direction === "left"
          ? currentScroll - itemWidth
          : currentScroll + itemWidth;

      // Scroll to the new position with smooth animation
      carouselRef.current.scrollTo({
        left: newScroll,
        behavior: "smooth",
      });
    }
  };

  // Update arrow visibility based on scroll position
  const handleCarouselScroll = () => {
    if (!carouselRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10); // 10px buffer
  };

  // Add scroll event listener
  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener("scroll", handleCarouselScroll);
      // Check initial state
      handleCarouselScroll();

      return () => {
        carousel.removeEventListener("scroll", handleCarouselScroll);
      };
    }
  }, [activeFilter]); // Re-run when filter changes

  // Add effect to listen for custom event from friend activity component
  useEffect(() => {
    // Listen for friend activity toggle events
    const handleFriendActivityToggle = (event: CustomEvent) => {
      setFriendActivityOpen(event.detail.isOpen);
    };

    // Add event listener for custom event
    window.addEventListener(
      "friendActivityToggle",
      handleFriendActivityToggle as EventListener
    );

    // Initial check if friend activity is open (could read from localStorage or app state)
    const initialFriendActivityState =
      localStorage.getItem("friendActivityOpen") === "true";
    setFriendActivityOpen(initialFriendActivityState);

    // Clean up event listener
    return () => {
      window.removeEventListener(
        "friendActivityToggle",
        handleFriendActivityToggle as EventListener
      );
    };
  }, []);

  // Add resize handler when friend activity state changes
  useEffect(() => {
    // Recalculate layout when friend activity panel is toggled
    const handleResize = () => {
      if (carouselRef.current) {
        // Force recalculation of carousel layout
        handleCarouselScroll();

        // Reset carousel scroll position on layout change to prevent overflow
        if (!friendActivityOpen && carouselRef.current.scrollLeft > 0) {
          carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
        }
      }

      // Add any other responsive adjustments here
    };

    // Call immediately when state changes
    handleResize();

    // Also handle window resizes while in this state
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [friendActivityOpen]);

  // Add effect to reset carousel on filter change
  useEffect(() => {
    // Reset carousel position when filter changes
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = 0;

      // Update arrow visibility after reset
      setTimeout(() => {
        handleCarouselScroll();
      }, 100);
    }
  }, [activeFilter]);

  // Add this useEffect to ensure consistent sizing
  useEffect(() => {
    // Function to handle layout consistency
    const maintainLayoutConsistency = () => {
      const projectsSection = document.querySelector(".projects-section");

      if (projectsSection) {
        // If switching to grid view from carousel, preserve height temporarily
        if (activeFilter === "projects" && previousViewWasCarousel.current) {
          const currentHeight = projectsSection.clientHeight;
          (
            projectsSection as HTMLElement
          ).style.minHeight = `${currentHeight}px`;

          // After grid renders, adjust height smoothly
          setTimeout(() => {
            (projectsSection as HTMLElement).style.transition =
              "min-height 0.3s ease-out";
            (projectsSection as HTMLElement).style.minHeight = "auto";
          }, 50);
        }
      }
    };

    maintainLayoutConsistency();
  }, [activeFilter]);

  // Add ref to track previous view state
  useEffect(() => {
    // Track whether we're coming from carousel view
    previousViewWasCarousel.current = activeFilter === "all";
  }, [activeFilter]);

  // Add this effect to reset any horizontal scroll on filter change
  useEffect(() => {
    // Reset horizontal scroll of the page when filter changes
    window.scrollTo({
      left: 0,
      behavior: "auto", // Use 'auto' to avoid animation
    });

    // Fix any overflow issues by temporarily adding overflow control
    document.body.style.overflowX = "hidden";

    // Clean up after transition
    const cleanup = setTimeout(() => {
      document.body.style.overflowX = "";
    }, 500);

    return () => clearTimeout(cleanup);
  }, [activeFilter]);

  return (
    <div className="main-content-wrapper overflow-x-hidden w-full">
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

      {/* Projects section with fixed overflow handling */}
      {isVisible(["projects"]) && (
        <section className="content-section projects-section mb-10 transition-all duration-300 overflow-x-hidden w-full">
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

          {activeFilter === "all" ? (
            <div className="relative overflow-x-hidden w-full">
              {/* Left arrow */}
              {showLeftArrow && (
                <button
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/70 rounded-full p-2 text-white hover:bg-black/90 transition-colors focus:outline-none group shadow-lg"
                  onClick={() => scrollCarousel("left")}
                  aria-label="Scroll left"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 group-hover:scale-110 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
              )}

              {/* Fixed carousel container with strict width control */}
              <div className="overflow-hidden w-full">
                <div
                  ref={carouselRef}
                  className="overflow-x-auto scrollbar-hide flex gap-6 pb-4 scroll-smooth snap-x px-2 max-w-full"
                  style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                  }}
                  onScroll={handleCarouselScroll}
                >
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="bg-[#181818] rounded-lg p-4 hover:bg-[#282828] transition-all duration-300 cursor-pointer group flex-shrink-0 snap-start"
                      style={{
                        width: "calc((100% - 72px) / 4)",
                        minWidth: "240px",
                        maxWidth: "400px",
                      }}
                      onClick={() => openProjectModal(project)}
                    >
                      {/* Project card content */}
                      <div className="relative mb-3 overflow-hidden rounded-md">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full aspect-square object-cover object-center transform group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute bottom-2 right-2 bg-[#1DB954] rounded-full p-2.5 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all shadow-lg">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                      <h3 className="font-bold text-white mb-1 truncate">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 text-sm line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right arrow */}
              {showRightArrow && (
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/70 rounded-full p-2 text-white hover:bg-black/90 transition-colors focus:outline-none group shadow-lg"
                  onClick={() => scrollCarousel("right")}
                  aria-label="Scroll right"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 group-hover:scale-110 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              )}

              {/* Carousel indicators */}
              {projects.length > 4 && (
                <div className="flex justify-center mt-4 gap-2">
                  {projects
                    .map((_, index) => {
                      if (index % 4 !== 0) return null;

                      return (
                        <button
                          key={index}
                          onClick={() => {
                            if (carouselRef.current) {
                              const itemWidth =
                                carouselRef.current.clientWidth / 4;
                              const scrollAmount =
                                ((itemWidth * index) / 4) * 4;

                              carouselRef.current.scrollTo({
                                left: scrollAmount,
                                behavior: "smooth",
                              });
                            }
                          }}
                          className="w-2 h-2 rounded-full bg-gray-600 hover:bg-gray-400 focus:outline-none focus:bg-white transition-colors"
                          aria-label={`Go to project ${index + 1}`}
                        />
                      );
                    })
                    .filter(Boolean)}
                </div>
              )}
            </div>
          ) : (
            /* Grid layout with fixed width */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-[#181818] rounded-lg p-4 hover:bg-[#282828] transition-all duration-300 cursor-pointer group"
                  onClick={() => openProjectModal(project)}
                >
                  {/* Project card content */}
                  <div className="relative mb-3 overflow-hidden rounded-md">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full aspect-square object-cover object-center transform group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-2 right-2 bg-[#1DB954] rounded-full p-2.5 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all shadow-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <h3 className="font-bold text-white mb-1 truncate">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-2">
                    {project.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Experience section */}
      {isVisible(["experience"]) && (
        <section className="content-section experience-section mb-10 transition-all duration-300">
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
                  src="/briefcase-icon.svg"
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
            {/* Other experience cards - kept as is */}
            <div className="bg-[#181818] p-4 rounded-lg hover:bg-[#282828] transition-all group cursor-pointer">
              <div className="relative mb-4">
                <img
                  src="/Liatrio.png"
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
                  src="/RideStream.jpg"
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

      {/* Skills section - kept as is */}
      {isVisible(["skills"]) && (
        <section className="content-section skills-section mb-10 transition-all duration-300">
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

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={modalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
