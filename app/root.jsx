import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import "./app.css";
import SpotifyLayout from "./components/Layout";

export const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <SpotifyLayout>
      <Outlet />
    </SpotifyLayout>
  );
}

export function ErrorBoundary({ error }) {
  if (isRouteErrorResponse(error)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#121212] text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            {error.status} {error.statusText}
          </h1>
          <p className="mb-6">{error.data}</p>
          <a
            href="/"
            className="bg-[#1DB954] px-4 py-2 rounded-full hover:bg-opacity-80 transition-all"
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#121212] text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Oops! Something went wrong</h1>
        <p className="mb-6">
          {error.message || "An unexpected error occurred"}
        </p>
        <a
          href="/"
          className="bg-[#1DB954] px-4 py-2 rounded-full hover:bg-opacity-80 transition-all"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}
