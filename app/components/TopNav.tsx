import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { searchAll, type SearchResult } from "../services/searchService";
import SearchResults from "./SearchResults";

interface TopNavProps {
  onSearch?: (query: string) => void;
}

const TopNav: React.FC<TopNavProps> = ({ onSearch }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Set up click outside listener to close search results
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Check browser history state on mount and update
  useEffect(() => {
    const updateNavState = () => {
      setCanGoBack(window.history.length > 1);
      setCanGoForward(!!window.history.state?.forward?.length);
    };

    // Initial check
    updateNavState();

    // Listen for history changes
    window.addEventListener("popstate", updateNavState);

    return () => {
      window.removeEventListener("popstate", updateNavState);
    };
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Call parent's onSearch if provided
    if (onSearch) {
      onSearch(query);
    }

    // Perform global search
    if (query.trim()) {
      const results = searchAll(query, 10); // Limit to 10 results per category
      setSearchResults(results);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  // Handle navigation with browser history
  const goBack = () => {
    navigate(-1); // Go back one page in history
    setCanGoForward(true); // We'll have a forward history after going back
  };

  const goForward = () => {
    navigate(1); // Go forward one page in history
    // Update state will happen automatically via the popstate event
  };

  const handleFocus = () => {
    if (searchQuery.trim()) {
      setShowResults(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Close results on escape
    if (e.key === "Escape") {
      setShowResults(false);
      inputRef.current?.blur();
    }
  };

  const handleResultClick = () => {
    setShowResults(false);
    setSearchQuery("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="bg-[#121212] p-4 flex items-center justify-between sticky top-0 z-10">
      <div className="flex space-x-4">
        {/* Skip/Replay buttons - replaced from Playbar */}
        <button
          className={`bg-black rounded-full p-1 ${
            canGoBack
              ? "text-white opacity-70 hover:opacity-100"
              : "text-gray-600 cursor-not-allowed"
          }`}
          onClick={goBack}
          aria-label="Go back"
          disabled={!canGoBack}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
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
        <button
          className={`bg-black rounded-full p-1 ${
            canGoForward
              ? "text-white opacity-70 hover:opacity-100"
              : "text-gray-600 cursor-not-allowed"
          }`}
          onClick={goForward}
          aria-label="Go forward"
          disabled={!canGoForward}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
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
      </div>

      {/* Search bar with dropdown results */}
      <div className="relative flex-1 max-w-xl mx-4" ref={searchRef}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search projects, skills, experience..."
          className="w-full py-2 px-10 bg-[#242424] text-white rounded-full focus:outline-none focus:ring-2 focus:ring-[#1DB954]"
          onChange={handleSearch}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 absolute left-3 top-2.5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        {/* Clear button */}
        {searchQuery && (
          <button
            className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
            onClick={() => {
              setSearchQuery("");
              setSearchResults([]);
              setShowResults(false);
              if (inputRef.current) {
                inputRef.current.value = "";
                inputRef.current.focus();
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}

        {/* Search results dropdown */}
        <SearchResults
          results={searchResults}
          onResultClick={handleResultClick}
          isVisible={showResults}
        />
      </div>

      {/* User profile */}
      <div className="flex items-center space-x-3">
        <button className="p-1 text-white hover:text-[#1DB954]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </button>
        <div className="bg-[#282828] rounded-full h-8 w-8 flex items-center justify-center">
          <span className="text-white font-bold">KB</span>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
