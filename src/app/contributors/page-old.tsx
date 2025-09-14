"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Clock,
  FileText,
  Target,
  Zap,
  Brain,
  Code2,
  Bug,
  Wrench,
  BookOpen,
  TestTube,
  CheckCircle,
  Users,
  BarChart3,
} from "lucide-react";
import { SIMPLE_CONTRIBUTORS, type SimpleContributor } from "@/lib/simpleData";
import {
  generateDailySummary,
  categorizeWorkType,
  type CommitAnalysis,
  type CategorySummary,
} from "@/lib/aiAnalysis";
import AppHeader from "@/components/AppHeader";

export default function ContributorsPage() {
  const [selectedContributor, setSelectedContributor] =
    useState<SimpleContributor | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [currentRepo, setCurrentRepo] = useState<{
    id: number;
    name: string;
    fullName: string;
    private: boolean;
    description: string;
  } | null>(null);
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      // Check authentication and repository selection
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      const hasGitHubApp = localStorage.getItem("hasGitHubApp") === "true";
      const commitlyticInstalled =
        localStorage.getItem("commitlytic_installed") === "true";
      const selectedRepoData = localStorage.getItem("selectedRepoData");

      if (!isLoggedIn && !hasRedirected) {
        setHasRedirected(true);
        window.location.href = "/login";
        return;
      }

      if ((!hasGitHubApp || !commitlyticInstalled) && !hasRedirected) {
        setHasRedirected(true);
        window.location.href = "/install";
        return;
      }

      if (selectedRepoData) {
        setCurrentRepo(JSON.parse(selectedRepoData));
      }
    };

    // Add a small delay to prevent race conditions
    const timeoutId = setTimeout(checkAuth, 150);
    return () => clearTimeout(timeoutId);
  }, [hasRedirected]);

  const handleContributorClick = (contributor: SimpleContributor) => {
    setSelectedContributor(contributor);
    setSelectedDate(contributor.lastCommitDate);
  };

  // Get AI-powered analysis instead of simple commit data
  const dailyAccomplishment = selectedContributor
    ? generateDailySummary(selectedContributor.id)
    : null;
  const workCategories = dailyAccomplishment
    ? categorizeWorkType(dailyAccomplishment.commits)
    : null;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "feature":
        return <Code2 className="w-4 h-4" />;
      case "bugfix":
        return <Bug className="w-4 h-4" />;
      case "refactor":
        return <Wrench className="w-4 h-4" />;
      case "documentation":
        return <BookOpen className="w-4 h-4" />;
      case "test":
        return <TestTube className="w-4 h-4" />;
      case "config":
        return <Target className="w-4 h-4" />;
      case "style":
        return <Zap className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "text-red-600 bg-red-50";
      case "medium":
        return "text-yellow-600 bg-yellow-50";
      case "low":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  if (!currentRepo) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading Contributors Analysis...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader onRepositoryChange={(repo) => setCurrentRepo(repo)} />

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Dashboard Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Team Analytics Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                {currentRepo.fullName} • Last updated just now
              </p>
            </div>
            {selectedContributor && (
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            )}
          </div>
        </div>

        {/* Main Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Team Members Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 h-fit">
              <div className="p-4 border-b border-gray-200">
                <h2 className="font-semibold text-gray-900">Team Members</h2>
                <p className="text-sm text-gray-500 mt-1">{SIMPLE_CONTRIBUTORS.length} active contributors</p>
              </div>
              <div className="p-3">
                <div className="space-y-2">
                  {SIMPLE_CONTRIBUTORS.map((contributor) => (
                    <div
                      key={contributor.id}
                      onClick={() => handleContributorClick(contributor)}
                      className={`p-3 rounded-lg cursor-pointer transition-all ${
                        selectedContributor?.id === contributor.id
                          ? "bg-blue-50 border border-blue-200"
                          : "hover:bg-gray-50 border border-transparent"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Image
                          src={contributor.avatar}
                          alt={contributor.name}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 text-sm truncate">
                            {contributor.name}
                          </h3>
                          <p className="text-xs text-gray-500 truncate">
                            {contributor.totalCommits} commits
                          </p>
                        </div>
                        {selectedContributor?.id === contributor.id && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Analysis Panel - Now takes 2/3 width */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-gray-600" />
                    Activity Analysis
                  </h2>
                  {selectedContributor && (
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  )}
                </div>
              </div>
              
              <div className="p-6">

                {!selectedContributor ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500">
                      Select a team member to view their activity analysis
                    </p>
                  </div>
                ) : dailyAccomplishment ? (
                  <div className="space-y-6">
                    {/* Key Metrics Summary - Simplified */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-gray-900">
                          {dailyAccomplishment.productivityScore}
                        </div>
                        <div className="text-sm text-gray-600">Productivity Score</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-gray-900">
                          {dailyAccomplishment.commits.length}
                        </div>
                        <div className="text-sm text-gray-600">Commits Today</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-gray-900">
                          {dailyAccomplishment.technicalDetails.mainTechnologies.length}
                        </div>
                        <div className="text-sm text-gray-600">Technologies</div>
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                      <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                        <Brain className="w-4 h-4 mr-2 text-blue-600" />
                        Daily Summary - {selectedContributor.name}
                      </h3>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {dailyAccomplishment.overallSummary}
                      </p>
                    </div>

                    {/* Key Achievements - Simplified */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                        <Target className="w-4 h-4 mr-2 text-gray-600" />
                        Key Achievements
                      </h4>
                      <ul className="space-y-2">
                        {dailyAccomplishment.keyAchievements.slice(0, 3).map(
                          (achievement, index) => (
                            <li
                              key={index}
                              className="text-sm text-gray-700 flex items-start"
                            >
                              <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                              {achievement}
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    {/* Technologies and Work Categories - Side by side */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                          <Code2 className="w-4 h-4 mr-2 text-gray-600" />
                          Technologies
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {dailyAccomplishment.technicalDetails.mainTechnologies.map(
                            (tech, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded border"
                              >
                                {tech}
                              </span>
                            )
                          )}
                        </div>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                          <BarChart3 className="w-4 h-4 mr-2 text-gray-600" />
                          Work Distribution
                        </h4>
                        <div className="space-y-2">
                          {workCategories &&
                            Object.entries(workCategories)
                              .filter(([, count]) => count > 0)
                              .slice(0, 4)
                              .map(([category, count]) => (
                                <div
                                  key={category}
                                  className="flex items-center justify-between text-sm"
                                >
                                  <span className="flex items-center text-gray-700">
                                    {getCategoryIcon(category)}
                                    <span className="ml-2 capitalize">
                                      {category}
                                    </span>
                                  </span>
                                  <span className="font-medium text-gray-900">
                                    {count}
                                  </span>
                                </div>
                              ))}
                        </div>
                      </div>
                    </div>

                    {/* Technical Details with Enhanced Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl blur-lg"></div>
                        <div className="relative bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200/50">
                          <h4 className="font-semibold text-slate-900 mb-4 flex items-center text-lg">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mr-3">
                              <Code2 className="w-4 h-4 text-white" />
                            </div>
                            Technologies
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {dailyAccomplishment.technicalDetails.mainTechnologies.map(
                              (tech, index) => (
                                <span
                                  key={index}
                                  className="px-3 py-2 bg-white/70 text-blue-800 text-sm rounded-full font-medium border border-blue-200/50 shadow-sm"
                                >
                                  {tech}
                                </span>
                              )
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-xl blur-lg"></div>
                        <div className="relative bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-xl border border-orange-200/50">
                          <h4 className="font-semibold text-slate-900 mb-4 flex items-center text-lg">
                            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center mr-3">
                              <Zap className="w-4 h-4 text-white" />
                            </div>
                            Work Categories
                          </h4>
                          <div className="space-y-3">
                            {workCategories &&
                              Object.entries(workCategories)
                                .filter(([, count]) => count > 0)
                                .map(([category, count]) => (
                                  <div
                                    key={category}
                                    className="flex items-center justify-between bg-white/70 p-3 rounded-lg"
                                  >
                                    <span className="flex items-center text-slate-700 font-medium">
                                      {getCategoryIcon(category)}
                                      <span className="ml-3 capitalize">
                                        {category}
                                      </span>
                                    </span>
                                    <span className="text-lg font-bold text-slate-900 bg-white rounded-full px-3 py-1">
                                      {count}
                                    </span>
                                  </div>
                                ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Simplified Commit Analysis */}
                    <div className="border border-gray-200 rounded-lg">
                      <div className="p-4 border-b border-gray-200">
                        <h4 className="font-medium text-gray-900 flex items-center">
                          <FileText className="w-4 h-4 mr-2 text-gray-600" />
                          Recent Commits ({dailyAccomplishment.commits.length})
                        </h4>
                      </div>
                      <div className="p-4 space-y-4">
                        {dailyAccomplishment.commits.slice(0, 3).map(
                          (commit: CommitAnalysis) => (
                            <div
                              key={commit.id}
                              className="border border-gray-100 rounded p-4 bg-gray-50"
                            >
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex-1">
                                  <h5 className="font-medium text-gray-900 text-sm mb-1">
                                    {commit.message}
                                  </h5>
                                  <p className="text-xs text-gray-600 mb-2">
                                    {commit.summary.intelligentSummary}
                                  </p>
                                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                                    <span className="flex items-center">
                                      <Clock className="w-3 h-3 mr-1" />
                                      {new Date(commit.timestamp).toLocaleTimeString()}
                                    </span>
                                    <span className="flex items-center">
                                      <FileText className="w-3 h-3 mr-1" />
                                      {commit.files.length} files
                                    </span>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2 text-xs">
                                  <span className="text-green-600 bg-green-50 px-2 py-1 rounded">
                                    +{commit.summary.productivity.linesAdded}
                                  </span>
                                  <span className="text-red-600 bg-red-50 px-2 py-1 rounded">
                                    -{commit.summary.productivity.linesDeleted}
                                  </span>
                                </div>
                              </div>

                              {/* Simplified Category Tags */}
                              <div className="flex flex-wrap gap-1">
                                {commit.summary.categories.slice(0, 3).map(
                                  (category: CategorySummary, index: number) => (
                                    <span
                                      key={index}
                                      className={`px-2 py-1 text-xs rounded ${getImpactColor(
                                        category.impact
                                      )}`}
                                    >
                                      {category.category}
                                    </span>
                                  )
                                )}
                              </div>
                            </div>
                          )
                        )}
                        {dailyAccomplishment.commits.length > 3 && (
                          <div className="text-center pt-2">
                            <button className="text-sm text-blue-600 hover:text-blue-800">
                              View all {dailyAccomplishment.commits.length} commits
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Brain className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500">
                      No analysis available for selected date
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
