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
      console.log("Install button clicked - starting installation process");
      setIsInstalling(true);

      // Simulate installation process
      setTimeout(() => {
        try {
          console.log("Installation completed successfully");
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

          console.log("Installation data saved to localStorage");

          setTimeout(() => {
            console.log("Redirecting to contributors page");
            router.push("/contributors");
          }, 2000);
        } catch (error) {
          console.error("Error during installation:", error);
          setIsInstalling(false);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="relative">
        {/* Enhanced Header with gradient */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-lg">
                  <Github className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Commitlytic
                  </h1>
                  <p className="text-gray-600 font-medium">
                    Professional Git Analytics Platform
                  </p>
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span>Enterprise Security</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section with enhanced visuals */}
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 text-sm font-medium rounded-full mb-6 border border-blue-200">
              <Database className="w-4 h-4 mr-2" />
              Next-Generation Git Analytics
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Install 
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> GitHub App</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Connect Commitlytic to your GitHub repositories and unlock
              powerful analytics, team insights, and performance metrics for your development workflow.
            </p>
          </div>

          {/* Enhanced Installation Steps with animations */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            {installationSteps.map((step, index) => (
              <div
                key={index}
                className="group relative bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 text-center hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl flex items-center justify-center text-white text-lg font-bold mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  {index + 1}
                </div>
                <h3 className="font-bold text-gray-900 mb-3 text-lg">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
                
                {/* Connecting line for desktop */}
                {index < installationSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-gray-300 to-transparent"></div>
                )}
              </div>
            ))}
          </div>

          {/* Enhanced Install Button with better styling */}
          <div className="text-center mb-16">
            <div className="relative inline-block">
              {/* Decorative elements - moved before button */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300 -z-10"></div>
              
              <button
                onClick={handleInstall}
                disabled={isInstalling}
                className="group relative w-full max-w-md bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white font-bold py-5 px-8 rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 mx-auto shadow-lg hover:shadow-xl hover:shadow-gray-900/25 hover:-translate-y-1 z-10 cursor-pointer"
                type="button"
              >
                {isInstalling ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-lg">Installing Commitlytic...</span>
                  </>
                ) : (
                  <>
                    <Github className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-lg">Install GitHub App</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </button>
            </div>
            
            <p className="mt-4 text-sm text-gray-500">
              Free to install • No credit card required
            </p>
          </div>

          {/* Enhanced Capabilities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {capabilities.map((capability, index) => (
              <div
                key={index}
                className="group bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-8 hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <capability.icon className="w-7 h-7 text-gray-700" />
                </div>
                <h3 className="font-bold text-gray-900 mb-3 text-xl">
                  {capability.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{capability.description}</p>
              </div>
            ))}
          </div>

          {/* Enhanced Benefits Section */}
          <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-3xl border border-gray-200/50 p-10 text-center backdrop-blur-sm">
            <div className="p-4 bg-gradient-to-br from-green-100 to-emerald-50 rounded-2xl inline-flex mb-8">
              <Lock className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Why Choose Commitlytic?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mb-8">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-emerald-50 rounded-xl flex items-center justify-center mt-1">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2 text-lg">
                    Real-time Analytics
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    Monitor team performance and code quality in real-time with
                    intelligent dashboards and instant notifications.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-50 rounded-xl flex items-center justify-center mt-1">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2 text-lg">
                    AI-Powered Insights
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    Advanced machine learning identifies patterns, bottlenecks, and
                    optimization opportunities across your entire codebase.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-violet-50 rounded-xl flex items-center justify-center mt-1">
                  <CheckCircle className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2 text-lg">
                    Team Growth
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    Accelerate developer growth with personalized feedback,
                    skill assessments, and targeted improvement recommendations.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl border border-gray-200/50">
              <div className="flex items-center justify-center space-x-3 mb-3">
                <Shield className="w-5 h-5 text-gray-700" />
                <strong className="text-gray-900 text-lg">Privacy-First Architecture</strong>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Your code remains completely private and secure. Commitlytic analyzes only 
                commit metadata and repository statistics—we never access your source code, 
                ensuring enterprise-grade security and compliance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
