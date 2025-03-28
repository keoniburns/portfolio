import { Link, NavLink } from "react-router";
import { useState } from "react";
import type { ReactNode } from "react";
import React from "react";
import FriendActivity from "./FriendActivity";
import TopNav from "./TopNav";
import Playbar from "./Playbar";

interface NavItemProps {
  to: string;
  children: ReactNode;
  icon: ReactNode;
  isCollapsed: boolean;
}

interface CardProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

interface SpotifyLayoutProps {
  children: ReactNode;
}

/**
 * Modified NavItem component that supports collapsed state with smoother text transition
 */
const NavItem: React.FC<NavItemProps> = ({
  to,
  children,
  icon,
  isCollapsed,
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center ${
          isCollapsed ? "justify-center" : "gap-3 px-4"
        } py-3 rounded-md transition-colors ${
          isActive
            ? "bg-[#282828] text-white"
            : "text-gray-400 hover:text-white"
        } overflow-hidden`
      }
      title={isCollapsed ? children?.toString() : ""}
    >
      <span className="text-xl">{icon}</span>
      <span
        className={`font-medium whitespace-nowrap transition-all duration-300 ${
          isCollapsed
            ? "opacity-0 w-0 translate-x-4"
            : "opacity-100 w-auto translate-x-0"
        }`}
        style={{
          transitionDelay: isCollapsed ? "0ms" : "150ms",
        }}
      >
        {children}
      </span>
    </NavLink>
  );
};

/**
 * Card component for portfolio projects/items
 */
export const Card: React.FC<CardProps> = ({
  title,
  description,
  image,
  link,
}) => {
  return (
    <Link
      to={link}
      className="bg-[#181818] p-4 rounded-md hover:bg-[#282828] transition-all duration-200 flex flex-col h-full"
    >
      <div className="relative mb-4 group">
        <img
          src={image}
          alt={title}
          className="w-full aspect-square object-cover object-center rounded-md shadow-lg"
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
      <h3 className="font-bold text-white mb-1">{title}</h3>
      <p className="text-gray-400 text-sm flex-grow">{description}</p>
    </Link>
  );
};

/**
 * Main layout component with collapsible Spotify-like sidebar and content area
 */
const SpotifyLayout: React.FC<SpotifyLayoutProps> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showFriends, setShowFriends] = useState(true);

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div
        className={`relative top-0 bottom-0 bg-black p-2 flex flex-col transition-all duration-500 ease-in-out ${
          isCollapsed ? "w-16" : "w-64"
        }`}
        style={{
          transform: isCollapsed ? "translateX(0)" : "translateX(0)",
          transition: "width 500ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div
          className={`p-4 flex items-center ${
            isCollapsed ? "justify-center" : "justify-between"
          } transition-all duration-300 overflow-hidden`}
        >
          <div
            className={`transition-all duration-300 ease-in-out ${
              isCollapsed
                ? "opacity-0 max-w-0 transform -translate-x-4"
                : "opacity-100 max-w-full transform translate-x-0"
            }`}
            style={{
              transitionDelay: isCollapsed ? "0ms" : "200ms",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            <h1 className="text-2xl font-bold text-white">Keoni Burns</h1>
            <p className="text-gray-400 text-sm">Portfolio</p>
          </div>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-gray-400 hover:text-white p-1 rounded-md hover:bg-[#282828] transition-colors"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={
                  isCollapsed
                    ? "M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    : "M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                }
              />
            </svg>
          </button>
        </div>

        <nav className="mt-2 mb-8">
          <NavItem
            to="/"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
            }
            isCollapsed={isCollapsed}
          >
            Home
          </NavItem>
          <NavItem
            to="/about"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            }
            isCollapsed={isCollapsed}
          >
            About
          </NavItem>
          <NavItem
            to="/projects"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                />
              </svg>
            }
            isCollapsed={isCollapsed}
          >
            Projects
          </NavItem>
          <NavItem
            to="/contact"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>
            }
            isCollapsed={isCollapsed}
          >
            Contact
          </NavItem>
        </nav>

        <div
          className={`mt-auto p-4 ${
            isCollapsed ? "flex justify-center" : ""
          } transition-all duration-500`}
        >
          <div
            className={`flex ${
              isCollapsed ? "flex-col" : "flex-row"
            } gap-2 transition-all duration-400 ease-in-out`}
          >
            {/* GitHub icon */}
            <a
              href="https://github.com/keoniburns"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>

            {/* LinkedIn icon */}
            <a
              href="https://linkedin.com/in/keoniburns98"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
              </svg>
            </a>

            {/* Email icon */}
            <a
              href="mailto:your.email@example.com"
              className="text-gray-400 hover:text-white transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Main content with Spotify styling */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navigation bar */}
        <TopNav />

        {/* Scrollable content */}
        <div className="flex-1 overflow-auto bg-gradient-to-b from-[#1e1e1e] to-[#121212]">
          <div className="p-6">{children}</div>
        </div>

        {/* Playbar */}
        <Playbar />
      </div>

      {/* Friend activity panel */}
      {showFriends && <FriendActivity />}
    </div>
  );
};

export default SpotifyLayout;
