"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Github,
  GitCommit,
  GitPullRequest,
  Bug,
  ExternalLink,
  TrendingUp,
  TrendingDown,
  Minus,
  BarChart3,
  Clock,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const CONTRIBUTOR_DATA = {
  id: 1,
  username: "johndoe",
  name: "John Doe",
  email: "john@example.com",
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  bio: "Full-stack developer passionate about open source. Building amazing things with TypeScript and React.",
  location: "San Francisco, CA",
  company: "Tech Corp",
  website: "https://johndoe.dev",
  joinDate: "2023-01-15",
  totalCommits: 89,
  totalLinesAdded: 2345,
  totalLinesDeleted: 567,
  totalPullRequests: 12,
  totalIssuesOpened: 5,
  lastActivity: "2 hours ago",
  trend: "up",
  role: "maintainer",
};

const ACTIVITY_DATA = [
  { date: "2024-01", commits: 12, pullRequests: 2, issues: 1 },
  { date: "2024-02", commits: 15, pullRequests: 3, issues: 0 },
  { date: "2024-03", commits: 8, pullRequests: 1, issues: 2 },
  { date: "2024-04", commits: 20, pullRequests: 4, issues: 1 },
  { date: "2024-05", commits: 18, pullRequests: 2, issues: 0 },
  { date: "2024-06", commits: 16, pullRequests: 0, issues: 1 },
];

const WEEKLY_COMMITS = [
  { day: "Mon", commits: 3 },
  { day: "Tue", commits: 7 },
  { day: "Wed", commits: 12 },
  { day: "Thu", commits: 8 },
  { day: "Fri", commits: 15 },
  { day: "Sat", commits: 2 },
  { day: "Sun", commits: 1 },
];

const RECENT_COMMITS = [
  {
    id: 1,
    message: "feat: Add user authentication system",
    sha: "a1b2c3d",
    date: "2 hours ago",
    additions: 89,
    deletions: 12,
  },
  {
    id: 2,
    message: "fix: Resolve memory leak in data processing",
    sha: "e4f5g6h",
    date: "1 day ago",
    additions: 23,
    deletions: 45,
  },
  {
    id: 3,
    message: "docs: Update API documentation",
    sha: "i7j8k9l",
    date: "3 days ago",
    additions: 156,
    deletions: 8,
  },
  {
    id: 4,
    message: "refactor: Optimize database queries",
    sha: "m1n2o3p",
    date: "1 week ago",
    additions: 67,
    deletions: 134,
  },
];

const RECENT_PULL_REQUESTS = [
  {
    id: 1,
    title: "Add user profile management",
    number: 45,
    state: "merged",
    date: "3 days ago",
  },
  {
    id: 2,
    title: "Implement real-time notifications",
    number: 42,
    state: "open",
    date: "1 week ago",
  },
  {
    id: 3,
    title: "Fix responsive design issues",
    number: 38,
    state: "closed",
    date: "2 weeks ago",
  },
];

export default function ContributorPage() {
  const [dateFilter, setDateFilter] = useState("6months");

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStateColor = (state: string) => {
    switch (state) {
      case "merged":
        return "bg-purple-100 text-purple-800";
      case "open":
        return "bg-green-100 text-green-800";
      case "closed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link
                href="/repository/1"
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
        {/* Contributor Profile */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6">
            <div className="flex items-start space-x-6">
              <Image
                src={CONTRIBUTOR_DATA.avatar}
                alt={CONTRIBUTOR_DATA.name}
                width={120}
                height={120}
                className="w-30 h-30 rounded-full"
              />

              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {CONTRIBUTOR_DATA.name}
                  </h1>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                    {CONTRIBUTOR_DATA.role}
                  </span>
                  {getTrendIcon(CONTRIBUTOR_DATA.trend)}
                </div>

                <p className="text-lg text-gray-600 mb-2">
                  @{CONTRIBUTOR_DATA.username}
                </p>
                <p className="text-gray-700 mb-4">{CONTRIBUTOR_DATA.bio}</p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                  {CONTRIBUTOR_DATA.company && (
                    <span>{CONTRIBUTOR_DATA.company}</span>
                  )}
                  {CONTRIBUTOR_DATA.location && (
                    <span>{CONTRIBUTOR_DATA.location}</span>
                  )}
                  <span>
                    Joined{" "}
                    {new Date(CONTRIBUTOR_DATA.joinDate).toLocaleDateString()}
                  </span>
                  <span>Last active {CONTRIBUTOR_DATA.lastActivity}</span>
                </div>

                <div className="flex items-center space-x-4">
                  <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View on GitHub
                  </button>
                  {CONTRIBUTOR_DATA.website && (
                    <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Website
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <GitCommit className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Commits
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {CONTRIBUTOR_DATA.totalCommits}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <GitPullRequest className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Pull Requests
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {CONTRIBUTOR_DATA.totalPullRequests}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Bug className="w-8 h-8 text-red-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Issues Opened
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {CONTRIBUTOR_DATA.totalIssuesOpened}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <TrendingUp className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-500">Lines Added</p>
                <p className="text-2xl font-bold text-green-600">
                  +{CONTRIBUTOR_DATA.totalLinesAdded.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <TrendingDown className="w-8 h-8 text-red-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Lines Deleted
                </p>
                <p className="text-2xl font-bold text-red-600">
                  -{CONTRIBUTOR_DATA.totalLinesDeleted.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Activity Chart */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Activity Over Time
                </h3>
                <div className="flex items-center space-x-2">
                  <select
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="3months">Last 3 months</option>
                    <option value="6months">Last 6 months</option>
                    <option value="1year">Last year</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="p-6">
              <ResponsiveContainer width="100%" height={300}>
                <RechartsLineChart data={ACTIVITY_DATA}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="commits"
                    stroke="#3b82f6"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="pullRequests"
                    stroke="#10b981"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="issues"
                    stroke="#f59e0b"
                    strokeWidth={2}
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Weekly Commits */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Weekly Commit Pattern
              </h3>
            </div>
            <div className="p-6">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={WEEKLY_COMMITS}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="commits" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Commits */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Commits
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {RECENT_COMMITS.map((commit) => (
                  <div
                    key={commit.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900">
                        {commit.message}
                      </h4>
                      <span className="text-xs text-gray-500 font-mono">
                        {commit.sha}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{commit.date}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-green-600">
                          +{commit.additions}
                        </span>
                        <span className="text-red-600">
                          -{commit.deletions}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Pull Requests */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Pull Requests
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {RECENT_PULL_REQUESTS.map((pr) => (
                  <div
                    key={pr.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{pr.title}</h4>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStateColor(
                          pr.state
                        )}`}
                      >
                        {pr.state}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>#{pr.number}</span>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{pr.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
