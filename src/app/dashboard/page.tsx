"use client";

import { useState } from "react";
import {
  Github,
  Plus,
  Search,
  MoreHorizontal,
  Users,
  GitCommit,
  Star,
  GitBranch,
  Calendar,
  Filter,
  BarChart3,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

const DUMMY_REPOSITORIES = [
  {
    id: 1,
    name: "awesome-project",
    fullName: "john-doe/awesome-project",
    description: "An awesome open source project with amazing features",
    private: false,
    contributors: 12,
    commits: 234,
    stars: 89,
    branches: 5,
    lastCommit: "2 hours ago",
    language: "TypeScript",
    activity: "high",
  },
  {
    id: 2,
    name: "web-app",
    fullName: "john-doe/web-app",
    description: "Modern web application built with React and Node.js",
    private: true,
    contributors: 6,
    commits: 156,
    stars: 23,
    branches: 3,
    lastCommit: "1 day ago",
    language: "JavaScript",
    activity: "medium",
  },
  {
    id: 3,
    name: "data-pipeline",
    fullName: "john-doe/data-pipeline",
    description: "ETL data processing pipeline for analytics",
    private: false,
    contributors: 8,
    commits: 98,
    stars: 45,
    branches: 4,
    lastCommit: "3 days ago",
    language: "Python",
    activity: "low",
  },
];

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "bg-blue-500",
  JavaScript: "bg-yellow-500",
  Python: "bg-green-500",
  Java: "bg-red-500",
  Go: "bg-cyan-500",
};

const ACTIVITY_COLORS: Record<string, string> = {
  high: "text-green-600 bg-green-100",
  medium: "text-yellow-600 bg-yellow-100",
  low: "text-red-600 bg-red-100",
};

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filteredRepos = DUMMY_REPOSITORIES.filter((repo) => {
    const matchesSearch =
      repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      repo.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "private" && repo.private) ||
      (selectedFilter === "public" && !repo.private);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center">
                    <Github className="w-5 h-5" />
                  </div>
                  <span className="ml-2 text-xl font-bold text-gray-900">
                    Commitlytic
                  </span>
                </div>
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <button className="text-gray-400 hover:text-gray-600">
                <BarChart3 className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-gray-700">JD</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">
            Monitor and analyze your repository contributors
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Github className="w-8 h-8 text-indigo-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Total Repositories
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {DUMMY_REPOSITORIES.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Total Contributors
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {DUMMY_REPOSITORIES.reduce(
                    (sum, repo) => sum + repo.contributors,
                    0
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <GitCommit className="w-8 h-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Total Commits
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {DUMMY_REPOSITORIES.reduce(
                    (sum, repo) => sum + repo.commits,
                    0
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="w-8 h-8 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Active Repos
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {
                    DUMMY_REPOSITORIES.filter(
                      (repo) => repo.activity === "high"
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Repository Controls */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Repositories
              </h2>
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                <Plus className="w-4 h-4 mr-2" />
                Add Repository
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search repositories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="all">All Repositories</option>
                  <option value="public">Public Only</option>
                  <option value="private">Private Only</option>
                </select>
              </div>
            </div>

            {/* Repository List */}
            <div className="space-y-4">
              {filteredRepos.map((repo) => (
                <div
                  key={repo.id}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Link
                          href={`/repository/${repo.id}`}
                          className="text-lg font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
                        >
                          {repo.fullName}
                        </Link>
                        {repo.private && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                            Private
                          </span>
                        )}
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                            ACTIVITY_COLORS[repo.activity]
                          }`}
                        >
                          {repo.activity} activity
                        </span>
                      </div>

                      <p className="text-gray-600 mb-4">{repo.description}</p>

                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              LANGUAGE_COLORS[repo.language]
                            }`}
                          ></div>
                          <span>{repo.language}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{repo.contributors} contributors</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <GitCommit className="w-4 h-4" />
                          <span>{repo.commits} commits</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4" />
                          <span>{repo.stars} stars</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <GitBranch className="w-4 h-4" />
                          <span>{repo.branches} branches</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>Updated {repo.lastCommit}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Link
                        href={`/repository/${repo.id}`}
                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                      >
                        View Details
                      </Link>
                      <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredRepos.length === 0 && (
              <div className="text-center py-12">
                <Github className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No repositories found
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm
                    ? "Try adjusting your search terms"
                    : "Get started by adding your first repository"}
                </p>
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Repository
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
