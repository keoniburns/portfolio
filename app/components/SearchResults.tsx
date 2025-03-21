import React from "react";
import { Link } from "react-router";
import type { SearchResult } from "../services/searchService";

interface SearchResultsProps {
  results: SearchResult[];
  onResultClick: () => void;
  isVisible: boolean;
}

/**
 * Component to display search results in a dropdown
 */
const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  onResultClick,
  isVisible,
}) => {
  if (!isVisible || results.length === 0) return null;

  const getIconForType = (type: string) => {
    switch (type) {
      case "project":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
            />
          </svg>
        );
      case "skill":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
            />
          </svg>
        );
      case "experience":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
            />
          </svg>
        );
      case "education":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
            />
          </svg>
        );
      default:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
    }
  };

  // Group results by type
  const projectResults = results.filter((r) => r.type === "project");
  const skillResults = results.filter((r) => r.type === "skill");
  const experienceResults = results.filter((r) => r.type === "experience");
  const educationResults = results.filter((r) => r.type === "education");

  // Function to render a result section
  const renderResultSection = (
    sectionResults: SearchResult[],
    title: string
  ) => {
    if (sectionResults.length === 0) return null;

    return (
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-400 mb-2 px-4">
          {title}
        </h3>
        <ul>
          {sectionResults.map((result) => (
            <li key={`${result.type}-${result.id}`}>
              <Link
                to={result.url}
                className="flex items-start px-4 py-3 hover:bg-[#282828] transition-colors"
                onClick={onResultClick}
              >
                <div className="flex-shrink-0 mt-1 mr-3 text-gray-400">
                  {getIconForType(result.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">
                    {result.title}
                  </p>
                  <p className="text-sm text-gray-400 truncate">
                    {result.description}
                  </p>
                  {result.tags && result.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {result.tags.slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          className="inline-block bg-[#333] text-gray-300 rounded px-1.5 py-0.5 text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                      {result.tags.length > 3 && (
                        <span className="text-gray-400 text-xs">
                          +{result.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
                {result.image && (
                  <div className="flex-shrink-0 ml-3">
                    <img
                      src={result.image}
                      alt={result.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-[#1e1e1e] rounded-md shadow-lg overflow-hidden z-20 max-h-[70vh] overflow-y-auto">
      <div className="p-2">
        {results.length === 0 ? (
          <div className="text-center py-6 text-gray-400">No results found</div>
        ) : (
          <>
            {renderResultSection(projectResults, "Projects")}
            {renderResultSection(skillResults, "Skills")}
            {renderResultSection(experienceResults, "Experience")}
            {renderResultSection(educationResults, "Education")}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
