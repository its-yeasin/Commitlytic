"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Github,
  Users,
  GitCommit,
  Star,
  GitBranch,
  Calendar,
  Filter,
  Search,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Minus,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import AISummary from "@/components/AISummary";
import DateFilter from "@/components/DateFilter";

const DUMMY_CONTRIBUTORS = [
  {
    id: 1,
    username: "johndoe",
    name: "John Doe",
    email: "john@example.com",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    commits: 89,
    linesAdded: 2345,
    linesDeleted: 567,
    pullRequests: 12,
    issuesOpened: 5,
    lastActivity: "2 hours ago",
    joinDate: "2023-01-15",
    trend: "up" as const,
    role: "maintainer" as const,
  },
  {
    id: 2,
    username: "sarasmith",
    name: "Sara Smith",
    email: "sara@example.com",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    commits: 67,
    linesAdded: 1890,
    linesDeleted: 234,
    pullRequests: 8,
    issuesOpened: 3,
    lastActivity: "1 day ago",
    joinDate: "2023-02-20",
    trend: "up" as const,
    role: "contributor" as const,
  },
  {
    id: 3,
    username: "mikewilson",
    name: "Mike Wilson",
    email: "mike@example.com",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    commits: 45,
    linesAdded: 1234,
    linesDeleted: 189,
    pullRequests: 6,
    issuesOpened: 8,
    lastActivity: "3 days ago",
    joinDate: "2023-03-10",
    trend: "down" as const,
    role: "contributor" as const,
  },
  {
    id: 4,
    username: "emilychen",
    name: "Emily Chen",
    email: "emily@example.com",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    commits: 34,
    linesAdded: 987,
    linesDeleted: 145,
    pullRequests: 4,
    issuesOpened: 2,
    lastActivity: "1 week ago",
    joinDate: "2023-04-05",
    trend: "stable" as const,
    role: "contributor" as const,
  },
  {
    id: 5,
    username: "alexbrown",
    name: "Alex Brown",
    email: "alex@example.com",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    commits: 23,
    linesAdded: 678,
    linesDeleted: 89,
    pullRequests: 3,
    issuesOpened: 1,
    lastActivity: "2 weeks ago",
    joinDate: "2023-05-12",
    trend: "up" as const,
    role: "contributor" as const,
  },
];

const REPOSITORY_INFO = {
  name: "awesome-project",
  fullName: "john-doe/awesome-project",
  description: "An awesome open source project with amazing features",
  private: false,
  language: "TypeScript",
  stars: 89,
  forks: 23,
  watchers: 45,
};

const TREND_ICONS = {
  up: <TrendingUp className="w-4 h-4 text-green-600" />,
  down: <TrendingDown className="w-4 h-4 text-red-600" />,
  stable: <Minus className="w-4 h-4 text-gray-600" />,
};

const ROLE_COLORS = {
  maintainer: "bg-purple-100 text-purple-800",
  contributor: "bg-blue-100 text-blue-800",
};

export default function RepositoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("commits");
  const [filterRole, setFilterRole] = useState("all");

  const filteredContributors = DUMMY_CONTRIBUTORS.filter((contributor) => {
    const matchesSearch =
      contributor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contributor.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || contributor.role === filterRole;
    return matchesSearch && matchesRole;
  }).sort((a, b) => {
    switch (sortBy) {
      case "commits":
        return b.commits - a.commits;
      case "lines":
        return b.linesAdded + b.linesDeleted - (a.linesAdded + a.linesDeleted);
      case "prs":
        return b.pullRequests - a.pullRequests;
      case "recent":
        return (
          new Date(b.lastActivity).getTime() -
          new Date(a.lastActivity).getTime()
        );
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center">
                  <Github className="w-5 h-5" />
                </div>
                <span className="ml-2 text-xl font-bold text-gray-900">
                  Commitlytic
                </span>
              </div>
            </div>
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
        {/* Repository Header */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {REPOSITORY_INFO.fullName}
                  </h1>
                  {!REPOSITORY_INFO.private && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                      Public
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mb-4">
                  {REPOSITORY_INFO.description}
                </p>

                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span>{REPOSITORY_INFO.language}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4" />
                    <span>{REPOSITORY_INFO.stars} stars</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <GitBranch className="w-4 h-4" />
                    <span>{REPOSITORY_INFO.forks} forks</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{REPOSITORY_INFO.watchers} watching</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View on GitHub
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Contributors
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {DUMMY_CONTRIBUTORS.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <GitCommit className="w-8 h-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Total Commits
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {DUMMY_CONTRIBUTORS.reduce((sum, c) => sum + c.commits, 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Pull Requests
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {DUMMY_CONTRIBUTORS.reduce(
                    (sum, c) => sum + c.pullRequests,
                    0
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Calendar className="w-8 h-8 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Lines Changed
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {DUMMY_CONTRIBUTORS.reduce(
                    (sum, c) => sum + c.linesAdded + c.linesDeleted,
                    0
                  ).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* AI Summary */}
        <AISummary className="mb-8" />

        {/* Contributors Section */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Contributors
            </h2>
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
                  placeholder="Search contributors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Filter className="w-5 h-5 text-gray-400" />
                  <select
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="all">All Roles</option>
                    <option value="maintainer">Maintainers</option>
                    <option value="contributor">Contributors</option>
                  </select>
                </div>

                <DateFilter showCustomRange={true} />

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="commits">Sort by Commits</option>
                  <option value="lines">Sort by Lines Changed</option>
                  <option value="prs">Sort by Pull Requests</option>
                  <option value="recent">Sort by Recent Activity</option>
                </select>
              </div>
            </div>

            {/* Contributors List */}
            <div className="space-y-4">
              {filteredContributors.map((contributor) => (
                <div
                  key={contributor.id}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start space-x-4">
                    <Image
                      src={contributor.avatar}
                      alt={contributor.name}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full"
                    />

                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Link
                          href={`/contributor/${contributor.id}`}
                          className="text-lg font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
                        >
                          {contributor.name}
                        </Link>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                            ROLE_COLORS[contributor.role]
                          }`}
                        >
                          {contributor.role}
                        </span>
                        <div className="flex items-center space-x-1">
                          {TREND_ICONS[contributor.trend]}
                        </div>
                      </div>

                      <p className="text-gray-600 mb-3">
                        @{contributor.username} • {contributor.email}
                      </p>

                      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Commits</p>
                          <p className="font-semibold text-gray-900">
                            {contributor.commits}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">Lines Added</p>
                          <p className="font-semibold text-green-600">
                            +{contributor.linesAdded.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">Lines Deleted</p>
                          <p className="font-semibold text-red-600">
                            -{contributor.linesDeleted.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">Pull Requests</p>
                          <p className="font-semibold text-gray-900">
                            {contributor.pullRequests}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">Issues</p>
                          <p className="font-semibold text-gray-900">
                            {contributor.issuesOpened}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">Last Activity</p>
                          <p className="font-semibold text-gray-900">
                            {contributor.lastActivity}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Link
                        href={`/contributor/${contributor.id}`}
                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                      >
                        View Profile
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredContributors.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No contributors found
                </h3>
                <p className="text-gray-600">
                  {searchTerm
                    ? "Try adjusting your search terms"
                    : "No contributors match your current filters"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
