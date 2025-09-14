"use client";

import { useState, useEffect, useMemo } from "react";
import {
  ChevronDown,
  LogOut,
  Settings,
  Plus,
  Search,
  GitBranch,
  Lock,
  Globe,
  Star,
  Mail,
} from "lucide-react";
import Link from "next/link";

interface Repository {
  id: number;
  name: string;
  fullName: string;
  private: boolean;
  description: string;
  language?: string;
  stars?: number;
  lastUpdated?: string;
}

interface AppHeaderProps {
  onRepositoryChange?: (repo: Repository) => void;
}

export default function AppHeader({ onRepositoryChange }: AppHeaderProps) {
  const [currentRepo, setCurrentRepo] = useState<Repository | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAddRepoOpen, setIsAddRepoOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [adminEmail, setAdminEmail] = useState("");

  // Enhanced mock repositories with more realistic data
  const repositories = useMemo(
    () => [
      {
        id: 1,
        name: "commitlytic-frontend",
        fullName: "acme-corp/commitlytic-frontend",
        private: false,
        description: "React TypeScript frontend for analytics platform",
        language: "TypeScript",
        stars: 42,
        lastUpdated: "2 hours ago",
      },
      {
        id: 2,
        name: "api-gateway",
        fullName: "acme-corp/api-gateway",
        private: true,
        description: "Microservices API gateway with authentication",
        language: "Go",
        stars: 28,
        lastUpdated: "1 day ago",
      },
      {
        id: 3,
        name: "ml-pipeline",
        fullName: "acme-corp/ml-pipeline",
        private: true,
        description: "Machine learning data processing pipeline",
        language: "Python",
        stars: 156,
        lastUpdated: "3 days ago",
      },
      {
        id: 4,
        name: "mobile-app",
        fullName: "acme-corp/mobile-app",
        private: false,
        description: "Cross-platform mobile application",
        language: "React Native",
        stars: 89,
        lastUpdated: "5 days ago",
      },
      {
        id: 5,
        name: "infrastructure",
        fullName: "acme-corp/infrastructure",
        private: true,
        description: "Terraform infrastructure as code",
        language: "HCL",
        stars: 15,
        lastUpdated: "1 week ago",
      },
    ],
    []
  );

  useEffect(() => {
    // Load current repository and admin info from localStorage
    const savedRepo = localStorage.getItem("selectedRepoData");
    const email = localStorage.getItem("adminEmail");

    if (savedRepo) {
      setCurrentRepo(JSON.parse(savedRepo));
    } else {
      // Set first repo as default if none selected
      const defaultRepo = repositories[0];
      setCurrentRepo(defaultRepo);
      localStorage.setItem("selectedRepoData", JSON.stringify(defaultRepo));
    }

    if (email) {
      setAdminEmail(email);
    }
  }, [repositories]);

  const filteredRepositories = repositories.filter(
    (repo) =>
      repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      repo.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRepositoryChange = (repo: Repository) => {
    setCurrentRepo(repo);
    localStorage.setItem("selectedRepo", repo.fullName);
    localStorage.setItem("selectedRepoData", JSON.stringify(repo));
    setIsDropdownOpen(false);

    if (onRepositoryChange) {
      onRepositoryChange(repo);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("hasGitHubApp");
    localStorage.removeItem("commitlytic_installed");
    localStorage.removeItem("selectedRepo");
    localStorage.removeItem("selectedRepoData");
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("commitlytic_user");
    window.location.href = "/";
  };

  const getLanguageColor = (language?: string) => {
    const colors: { [key: string]: string } = {
      TypeScript: "bg-blue-500",
      JavaScript: "bg-yellow-500",
      Python: "bg-green-500",
      Go: "bg-cyan-500",
      "React Native": "bg-purple-500",
      HCL: "bg-indigo-500",
      Java: "bg-orange-500",
      Rust: "bg-red-500",
    };
    return colors[language || ""] || "bg-gray-500";
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and App Name */}
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gray-900 rounded-lg">
              <GitBranch className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">Commitlytic</h1>
          </div>

          {/* Repository Selector */}
          {currentRepo && (
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-left bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      {currentRepo.private ? (
                        <Lock className="h-4 w-4 text-gray-600" />
                      ) : (
                        <Globe className="h-4 w-4 text-gray-600" />
                      )}
                      <span className="text-sm font-medium text-gray-900">
                        {currentRepo.name}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 hidden sm:block">
                      {currentRepo.fullName}
                    </div>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </button>

                {isDropdownOpen && (
                  <div className="absolute z-20 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                    {/* Search and Add Repository */}
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex space-x-2 mb-3">
                        <div className="relative flex-1">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Search repositories..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <button
                          onClick={() => setIsAddRepoOpen(true)}
                          className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-2"
                        >
                          <Plus className="h-4 w-4" />
                          <span className="hidden sm:inline">Add Repo</span>
                        </button>
                      </div>
                    </div>

                    {/* Repository List */}
                    <div className="max-h-80 overflow-y-auto">
                      {filteredRepositories.map((repo) => (
                        <button
                          key={repo.id}
                          onClick={() => handleRepositoryChange(repo)}
                          className={`w-full text-left p-4 hover:bg-slate-50/80 transition-colors group ${
                            currentRepo.id === repo.id
                              ? "bg-blue-50/80 border-l-4 border-blue-500"
                              : ""
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-1">
                                {repo.private ? (
                                  <Lock className="h-3.5 w-3.5 text-amber-600 flex-shrink-0" />
                                ) : (
                                  <Globe className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0" />
                                )}
                                <span className="font-medium text-slate-900 truncate">
                                  {repo.name}
                                </span>
                                {repo.language && (
                                  <div className="flex items-center space-x-1">
                                    <div
                                      className={`w-2 h-2 rounded-full ${getLanguageColor(
                                        repo.language
                                      )}`}
                                    ></div>
                                    <span className="text-xs text-slate-500">
                                      {repo.language}
                                    </span>
                                  </div>
                                )}
                              </div>
                              <p className="text-sm text-slate-600 truncate mb-1">
                                {repo.description}
                              </p>
                              <div className="flex items-center space-x-4 text-xs text-slate-500">
                                <span>{repo.fullName}</span>
                                {repo.stars && (
                                  <div className="flex items-center space-x-1">
                                    <Star className="h-3 w-3" />
                                    <span>{repo.stars}</span>
                                  </div>
                                )}
                                <span>Updated {repo.lastUpdated}</span>
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>

                    {filteredRepositories.length === 0 && (
                      <div className="p-8 text-center text-slate-500">
                        <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p>No repositories found</p>
                        <p className="text-sm">
                          Try adjusting your search terms
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Admin Menu */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-3 text-sm text-slate-600">
              <span>Admin:</span>
              <span className="font-medium text-slate-800">
                {adminEmail || "admin@company.com"}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <Link
                href="/mail-schedules"
                className="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
                title="Email Schedules"
              >
                <Mail className="h-5 w-5" />
              </Link>
              <Link
                href="/settings"
                className="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
              >
                <Settings className="h-5 w-5" />
              </Link>
              <button
                onClick={handleLogout}
                className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Repository Modal */}
      {isAddRepoOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-slate-800 mb-4">
              Add Repository
            </h3>
            <p className="text-slate-600 mb-6">
              Connect a new repository to start analyzing team contributions and
              productivity.
            </p>
            <div className="space-y-4">
              <button className="w-full p-4 border-2 border-dashed border-slate-300 rounded-xl hover:border-blue-400 hover:bg-blue-50/50 transition-colors group">
                <div className="text-center">
                  <Plus className="h-8 w-8 mx-auto mb-2 text-slate-400 group-hover:text-blue-500" />
                  <p className="font-medium text-slate-700 group-hover:text-blue-700">
                    Browse GitHub Repositories
                  </p>
                  <p className="text-sm text-slate-500">
                    Select from your available repositories
                  </p>
                </div>
              </button>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setIsAddRepoOpen(false)}
                className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all duration-200">
                Add Repository
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
