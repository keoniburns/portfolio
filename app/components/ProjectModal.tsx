import React, { useEffect, useRef, useState } from "react";
import type { Project } from "../data/projects";

interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [animationState, setAnimationState] = useState<
    "entering" | "entered" | "exiting"
  >(isOpen ? "entering" : "entered");

  // Handle modal close with improved animation
  const handleClose = () => {
    setAnimationState("exiting");
    // Wait for animation to complete before unmounting
    setTimeout(() => {
      onClose();
    }, 200); // Match this to your CSS transition duration
  };

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  // Handle escape key press
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [isOpen]);

  // Handle animation state
  useEffect(() => {
    if (isOpen) {
      // Set initial state then transition to entered
      setAnimationState("entering");
      const timer = setTimeout(() => {
        setAnimationState("entered");
      }, 10); // Small delay to ensure browser batches the changes

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Animation classes based on state
  const modalClasses = {
    entering: "opacity-0 scale-95",
    entered: "opacity-100 scale-100",
    exiting: "opacity-0 scale-95",
  };

  return (
    <div
      className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-50 p-4 md:p-6"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className={`bg-[#181818] rounded-xl max-w-6xl w-full max-h-[95vh] overflow-y-auto 
                   transition-all duration-200 ease-out transform-gpu ${modalClasses[animationState]}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header with Image - Standardized display */}
        <div className="relative h-72 sm:h-96 md:h-[400px] overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181818] to-transparent"></div>

          {/* Close button */}
          <button
            className="absolute top-5 right-5 bg-black/50 p-3 rounded-full text-white hover:bg-black/70 transition-colors"
            onClick={handleClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-8 md:p-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {project.title}
          </h2>

          <p className="text-gray-300 mb-8 text-lg leading-relaxed max-w-4xl">
            {project.detailedDescription || project.description}
          </p>

          {/* Technologies */}
          {project.tags && project.tags.length > 0 && (
            <div className="mb-10">
              <h3 className="text-xl font-semibold text-white mb-4">
                Technologies
              </h3>
              <div className="flex flex-wrap gap-3">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-[#282828] px-4 py-2 rounded-full text-base text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          <div className="flex flex-wrap gap-5 mt-8">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-[#282828] hover:bg-[#333] text-white px-6 py-3 rounded-full transition-colors text-base font-medium"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub Repository
              </a>
            )}

            {/* {project.github && (
            //   <a 
            //     href={project.github}
            //     target="_blank"
            //     rel="noopener noreferrer"
            //     className="flex items-center gap-3 bg-[#1DB954] hover:bg-opacity-80 text-white px-6 py-3 rounded-full transition-colors text-base font-medium"
            //   >
            //     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            //       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            //     </svg>
            //     Live Demo
            //   </a>
            // )} */}

            <a
              href={project.github}
              className="flex items-center gap-3 border border-white/20 hover:bg-white/10 text-white px-6 py-3 rounded-full transition-colors text-base font-medium"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              View Details
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
