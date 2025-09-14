"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Github,
  Shield,
  Database,
  Users,
  TrendingUp,
  ArrowRight,
  Lock,
  CheckCircle,
} from "lucide-react";

export default function InstallPage() {
  const [isInstalling, setIsInstalling] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isCheckingInstallation, setIsCheckingInstallation] = useState(true);
  const [hasRedirected, setHasRedirected] = useState(false);
  const router = useRouter();

  // Check if already installed when component mounts
  useEffect(() => {
    const checkInstallation = () => {
      try {
        const isInstalled =
          localStorage.getItem("commitlytic_installed") === "true";
        const hasGitHubApp = localStorage.getItem("hasGitHubApp") === "true";

        if (isInstalled && hasGitHubApp && !hasRedirected) {
          console.log("Already installed, redirecting to contributors");
          setHasRedirected(true);
          router.push("/contributors");
        } else {
          setIsCheckingInstallation(false);
        }
      } catch (error) {
        console.error("Error checking installation:", error);
        setIsCheckingInstallation(false);
      }
    };

    const timeoutId = setTimeout(checkInstallation, 100);
    return () => clearTimeout(timeoutId);
  }, [router, hasRedirected]);

  const handleInstall = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      console.log("Install button clicked");
      setIsInstalling(true);

      setTimeout(() => {
        try {
          console.log("Installation completed");
          setIsInstalled(true);
          setIsInstalling(false);

          // Store installation state
          localStorage.setItem("commitlytic_installed", "true");
          localStorage.setItem("hasGitHubApp", "true");
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem(
            "commitlytic_user",
            JSON.stringify({
              id: "user_1",
              name: "Demo User",
              avatar: "https://github.com/ghost.png",
              githubUsername: "demo-user",
            })
          );
          localStorage.setItem(
            "selectedRepoData",
            JSON.stringify({
              id: 1,
              name: "my-awesome-project",
              fullName: "demo-user/my-awesome-project",
              private: false,
              description: "A demo repository for testing Commitlytic",
            })
          );

          setTimeout(() => {
            console.log("Redirecting to contributors page");
            router.push("/contributors");
          }, 2000);
        } catch (error) {
          console.error("Error during installation:", error);
        }
      }, 2000);
    } catch (error) {
      console.error("Error starting installation:", error);
      setIsInstalling(false);
    }
  };

  const capabilities = [
    {
      icon: Database,
      title: "Repository Intelligence",
      description:
        "Deep analysis of code patterns, commit history, and development workflows",
    },
    {
      icon: TrendingUp,
      title: "Performance Analytics",
      description:
        "Track productivity metrics, code quality trends, and team performance indicators",
    },
    {
      icon: Users,
      title: "Team Insights",
      description:
        "Individual contributor analytics, collaboration patterns, and skill assessments",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description:
        "Enterprise-grade security with encrypted data transmission and storage",
    },
  ];

  const installationSteps = [
    {
      title: "Connect GitHub Account",
      description: "Secure OAuth integration with your GitHub account",
    },
    {
      title: "Select Repositories",
      description: "Choose which repositories to analyze and monitor",
    },
    {
      title: "Configure Analytics",
      description: "Set up team tracking and reporting preferences",
    },
    {
      title: "Start Analyzing",
      description: "Begin generating intelligent insights from your codebase",
    },
  ];

  if (isCheckingInstallation) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">
            Checking Installation
          </h1>
          <p className="text-gray-600">
            Please wait while we verify your setup...
          </p>
        </div>
      </div>
    );
  }

  if (isInstalled) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Installation Complete!
          </h1>
          <p className="text-gray-600 mb-6">
            Commitlytic has been successfully installed. Redirecting to your
            dashboard...
          </p>
          <div className="w-16 h-1 bg-gray-200 rounded-full mx-auto">
            <div
              className="h-1 bg-green-600 rounded-full animate-pulse"
              style={{ width: "100%" }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-3 bg-gray-900 rounded-xl">
                  <Github className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <h1 className="text-2xl font-bold text-gray-900">
                    Commitlytic
                  </h1>
                  <p className="text-gray-600">
                    Professional Git Analytics Platform
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Install GitHub App
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Connect Commitlytic to your GitHub repositories and unlock
              powerful analytics for your development team.
            </p>
          </div>

          {/* Installation Steps */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {installationSteps.map((step, index) => (
              <div
                key={index}
                className="bg-white rounded-lg border border-gray-200 p-6 text-center"
              >
                <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center text-white text-sm font-bold mx-auto mb-4">
                  {index + 1}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>

          {/* Install Button */}
          <div className="text-center mb-12">
            <button
              onClick={handleInstall}
              disabled={isInstalling}
              className="w-full max-w-md bg-gray-900 hover:bg-gray-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 mx-auto"
            >
              {isInstalling ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Installing Commitlytic...</span>
                </>
              ) : (
                <>
                  <Github className="w-5 h-5" />
                  <span>Install GitHub App</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>

          {/* Capabilities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {capabilities.map((capability, index) => (
              <div
                key={index}
                className="bg-white rounded-lg border border-gray-200 p-6"
              >
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
                  <capability.icon className="w-5 h-5 text-gray-700" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {capability.title}
                </h3>
                <p className="text-gray-600">{capability.description}</p>
              </div>
            ))}
          </div>

          {/* Benefits Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <div className="p-3 bg-green-100 rounded-xl inline-flex mb-6">
              <Lock className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Why Install Commitlytic?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mt-1">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">
                    Real-time Analytics
                  </h4>
                  <p className="text-sm text-gray-600">
                    Monitor team performance and code quality in real-time with
                    intelligent dashboards.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mt-1">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">
                    Smart Insights
                  </h4>
                  <p className="text-sm text-gray-600">
                    AI-powered analysis identifies patterns, bottlenecks, and
                    optimization opportunities.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mt-1">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">
                    Team Growth
                  </h4>
                  <p className="text-sm text-gray-600">
                    Help developers improve skills and optimize workflows with
                    actionable feedback.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <p className="text-sm text-gray-600">
                <strong className="text-gray-900">Privacy First:</strong> Your
                code remains private and secure. Commitlytic only accesses
                commit metadata and repository statistics - never your source
                code.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
