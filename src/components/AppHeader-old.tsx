"use client";

import { useState, useEffect } from "react";
import { ChevronDown, LogOut, Settings, GitBranch } from "lucide-react";
import Link from "next/link";

interface Repository {
  id: number;
  name: string;
  fullName: string;
  private: boolean;
  description: string;
}

interface AppHeaderProps {
  onRepositoryChange?: (repo: Repository) => void;
}

export default function AppHeader({ onRepositoryChange }: AppHeaderProps) {
  const [currentRepo, setCurrentRepo] = useState<Repository | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");

  // Mock repositories (in real app, fetch from API)
  const repositories: Repository[] = [
    {
      id: 1,
      name: "awesome-project",
      fullName: "john-doe/awesome-project",
      private: false,
      description: "An awesome open source project",
    },
    {
      id: 2,
      name: "web-app",
      fullName: "john-doe/web-app",
      private: true,
      description: "Modern web application",
    },
    {
      id: 3,
      name: "data-pipeline",
      fullName: "john-doe/data-pipeline",
      private: false,
      description: "ETL data processing pipeline",
    },
  ];

  useEffect(() => {
    // Load current repository and admin info from localStorage
    const savedRepo = localStorage.getItem("selectedRepoData");
    const email = localStorage.getItem("adminEmail");

    if (savedRepo) {
      setCurrentRepo(JSON.parse(savedRepo));
    }

    if (email) {
      setAdminEmail(email);
    }
  }, []);

  const handleRepositoryChange = (repo: Repository) => {
    setCurrentRepo(repo);
    localStorage.setItem("selectedRepo", repo.fullName);
    localStorage.setItem("selectedRepoData", JSON.stringify(repo));
    setIsDropdownOpen(false);

    if (onRepositoryChange) {
      onRepositoryChange(repo);
    }

    // Refresh the page to load new repository data
    window.location.reload();
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("hasGitHubApp");
    localStorage.removeItem("selectedRepo");
    localStorage.removeItem("selectedRepoData");
    localStorage.removeItem("adminEmail");
    window.location.href = "/";
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and App Name */}
          <div className="flex items-center space-x-3">
            <GitBranch className="h-8 w-8 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">Commitlytic</h1>
          </div>

          {/* Repository Selector */}
          {currentRepo && (
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full flex items-center justify-between px-4 py-2 text-left bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {currentRepo.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {currentRepo.fullName}
                    </div>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </button>

                {isDropdownOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                    {repositories.map((repo) => (
                      <button
                        key={repo.id}
                        onClick={() => handleRepositoryChange(repo)}
                        className={`w-full text-left px-4 py-3 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                          currentRepo.id === repo.id
                            ? "bg-blue-50 text-blue-900"
                            : ""
                        }`}
                      >
                        <div className="text-sm font-medium">{repo.name}</div>
                        <div className="text-xs text-gray-500">
                          {repo.fullName}
                        </div>
                        {repo.private && (
                          <div className="text-xs text-orange-600 mt-1">
                            Private
                          </div>
                        )}
                      </button>
                    ))}

                    <div className="border-t border-gray-200">
                      <Link
                        href="/install"
                        className="w-full text-left px-4 py-3 text-sm text-blue-600 hover:bg-gray-50 rounded-b-lg block"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        + Add more repositories
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Admin Menu */}
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Welcome, {adminEmail}</span>

            <div className="flex items-center space-x-2">
              <Link
                href="/install"
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                title="Repository Settings"
              >
                <Settings className="h-5 w-5" />
              </Link>

              <button
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-100"
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
