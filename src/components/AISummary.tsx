"use client";

import { useState } from "react";
import {
  Sparkles,
  Brain,
  TrendingUp,
  Users,
  Clock,
  Lightbulb,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
} from "lucide-react";

const AI_INSIGHTS = [
  {
    id: 1,
    type: "positive" as const,
    icon: <CheckCircle className="w-5 h-5" />,
    title: "High Code Quality",
    description:
      "Contributors are maintaining excellent code quality with an average of 15% test coverage increase per commit.",
    confidence: 92,
  },
  {
    id: 2,
    type: "neutral" as const,
    icon: <TrendingUp className="w-5 h-5" />,
    title: "Steady Growth Pattern",
    description:
      "The repository shows consistent growth with 23% increase in contributions over the last quarter.",
    confidence: 87,
  },
  {
    id: 3,
    type: "warning" as const,
    icon: <AlertTriangle className="w-5 h-5" />,
    title: "Knowledge Concentration Risk",
    description:
      "John Doe accounts for 65% of commits. Consider encouraging more distributed contributions.",
    confidence: 78,
  },
  {
    id: 4,
    type: "positive" as const,
    icon: <Users className="w-5 h-5" />,
    title: "Strong Collaboration",
    description:
      "High pull request review participation (89%) indicates healthy team collaboration practices.",
    confidence: 94,
  },
];

const SUMMARY_STATS = {
  overallHealth: "Excellent",
  teamVelocity: "+23%",
  codeQuality: "High",
  riskLevel: "Low",
  lastUpdated: "2 minutes ago",
};

const RECOMMENDATIONS = [
  {
    id: 1,
    priority: "high",
    title: "Diversify Contributions",
    description:
      "Encourage more team members to contribute to reduce dependency on key contributors.",
    impact: "Reduces bus factor risk and improves knowledge sharing",
  },
  {
    id: 2,
    priority: "medium",
    title: "Documentation Sprint",
    description:
      "Recent commits show 23% decrease in documentation updates compared to code changes.",
    impact: "Improves onboarding and reduces support overhead",
  },
  {
    id: 3,
    priority: "low",
    title: "Performance Optimization",
    description:
      "Consider a focused performance review - code complexity is trending upward.",
    impact: "Maintains long-term maintainability and performance",
  },
];

type InsightType = "positive" | "neutral" | "warning";

interface AISummaryProps {
  repositoryId?: string;
  className?: string;
}

export default function AISummary({ className = "" }: AISummaryProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<"insights" | "recommendations">(
    "insights"
  );

  const handleRegenerateInsights = async () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  const getInsightTypeStyles = (type: InsightType) => {
    switch (type) {
      case "positive":
        return "border-green-200 bg-green-50";
      case "warning":
        return "border-yellow-200 bg-yellow-50";
      default:
        return "border-blue-200 bg-blue-50";
    }
  };

  const getInsightIconColor = (type: InsightType) => {
    switch (type) {
      case "positive":
        return "text-green-600";
      case "warning":
        return "text-yellow-600";
      default:
        return "text-blue-600";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                AI Insights
              </h3>
              <p className="text-sm text-gray-500">
                Generated {SUMMARY_STATS.lastUpdated}
              </p>
            </div>
          </div>

          <button
            onClick={handleRegenerateInsights}
            disabled={isGenerating}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <RefreshCw
              className={`w-4 h-4 mr-2 ${isGenerating ? "animate-spin" : ""}`}
            />
            {isGenerating ? "Generating..." : "Refresh"}
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="p-6 bg-gray-50 border-b border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500">Health Score</p>
            <p className="text-lg font-bold text-green-600">
              {SUMMARY_STATS.overallHealth}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500">Team Velocity</p>
            <p className="text-lg font-bold text-blue-600">
              {SUMMARY_STATS.teamVelocity}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500">Code Quality</p>
            <p className="text-lg font-bold text-purple-600">
              {SUMMARY_STATS.codeQuality}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500">Risk Level</p>
            <p className="text-lg font-bold text-green-600">
              {SUMMARY_STATS.riskLevel}
            </p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex">
          <button
            onClick={() => setActiveTab("insights")}
            className={`py-4 px-6 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "insights"
                ? "border-indigo-500 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center space-x-2">
              <Brain className="w-4 h-4" />
              <span>Key Insights</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab("recommendations")}
            className={`py-4 px-6 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "recommendations"
                ? "border-indigo-500 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center space-x-2">
              <Lightbulb className="w-4 h-4" />
              <span>Recommendations</span>
            </div>
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === "insights" && (
          <div className="space-y-4">
            {isGenerating ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <RefreshCw className="w-8 h-8 text-indigo-600 animate-spin mx-auto mb-4" />
                  <p className="text-gray-600">Analyzing repository data...</p>
                  <p className="text-sm text-gray-500 mt-1">
                    This may take a few moments
                  </p>
                </div>
              </div>
            ) : (
              AI_INSIGHTS.map((insight) => (
                <div
                  key={insight.id}
                  className={`border rounded-lg p-4 ${getInsightTypeStyles(
                    insight.type
                  )}`}
                >
                  <div className="flex items-start space-x-3">
                    <div
                      className={`flex-shrink-0 ${getInsightIconColor(
                        insight.type
                      )}`}
                    >
                      {insight.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">
                          {insight.title}
                        </h4>
                        <span className="text-xs text-gray-500">
                          {insight.confidence}% confidence
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm">
                        {insight.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "recommendations" && (
          <div className="space-y-4">
            {RECOMMENDATIONS.map((recommendation) => (
              <div
                key={recommendation.id}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">
                    {recommendation.title}
                  </h4>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getPriorityColor(
                      recommendation.priority
                    )}`}
                  >
                    {recommendation.priority} priority
                  </span>
                </div>
                <p className="text-gray-700 text-sm mb-3">
                  {recommendation.description}
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded p-3">
                  <p className="text-sm text-blue-800">
                    <strong>Impact:</strong> {recommendation.impact}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>Analysis based on last 30 days of activity</span>
          </div>
          <span>Powered by AI</span>
        </div>
      </div>
    </div>
  );
}
