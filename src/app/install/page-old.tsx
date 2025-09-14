"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Github,
  Check,
  Shield,
  Database,
  GitBranch,
  Users,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Code2,
  Lock,
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
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Users,
      title: "Team Insights",
      description:
        "Understand productivity, collaboration patterns, and individual contributions",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: TrendingUp,
      title: "Performance Analytics",
      description:
        "Track metrics, identify bottlenecks, and optimize development processes",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: Code2,
      title: "AI-Powered Summaries",
      description:
        "Automated insights that understand what contributors actually accomplished",
      color: "from-orange-500 to-red-500",
    },
  ];

  const permissions = [
    {
      icon: GitBranch,
      title: "Repository Metadata",
      description:
        "Access to repository information, branches, and basic structure",
      level: "Read",
    },
    {
      icon: Database,
      title: "Commit History",
      description:
        "Analyze commit patterns, file changes, and development timeline",
      level: "Analysis",
    },
    {
      icon: Users,
      title: "Contributor Data",
      description: "Process contributor statistics and collaboration metrics",
      level: "Processing",
    },
    {
      icon: Shield,
      title: "Secure Access",
      description: "Enterprise-grade security with encrypted data processing",
      level: "Protected",
    },
  ];

  // Loading state
  if (isCheckingInstallation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 text-center max-w-md w-full">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
            Verifying Installation
          </h1>
          <p className="text-slate-600">
            Checking your current setup status...
          </p>
        </div>
      </div>
    );
  }

  // Success state
  if (isInstalled) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 text-center max-w-md w-full">
          <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
            Installation Complete!
          </h1>
          <p className="text-slate-600 mb-6">
            Commitlytic is now configured and ready to analyze your
            repositories.
          </p>
          <div className="flex items-center justify-center space-x-2 text-emerald-600 mb-4">
            <Sparkles className="w-5 h-5" />
            <span className="font-medium">
              Launching analytics dashboard...
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Main install page
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="flex items-center justify-center mb-8">
              <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl">
                <Github className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-6">
              Connect with GitHub
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Transform your development workflow with AI-powered analytics that
              understand what your team actually accomplishes, not just commit
              messages.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Installation Panel */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 lg:p-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-800 mb-4">
                GitHub Integration
              </h2>
              <p className="text-slate-600">
                Secure, one-click setup with enterprise-grade permissions
              </p>
            </div>

            {/* Installation Steps */}
            <div className="space-y-6 mb-10">
              {[
                {
                  step: 1,
                  title: "Authorize Access",
                  desc: "Connect your GitHub account securely",
                },
                {
                  step: 2,
                  title: "Select Repositories",
                  desc: "Choose which repos to analyze",
                },
                {
                  step: 3,
                  title: "Start Analytics",
                  desc: "Begin generating insights immediately",
                },
              ].map((item) => (
                <div key={item.step} className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                    {item.step}
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="font-semibold text-slate-800">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Install Button */}
            <button
              type="button"
              onClick={handleInstall}
              disabled={isInstalling}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5"
            >
              {isInstalling ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Installing...</span>
                </>
              ) : (
                <>
                  <Github className="w-5 h-5" />
                  <span>Install on GitHub</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            <p className="text-xs text-slate-500 text-center mt-4">
              By installing, you agree to our
              <span className="text-blue-600 hover:underline cursor-pointer mx-1">
                Terms of Service
              </span>
              and
              <span className="text-blue-600 hover:underline cursor-pointer mx-1">
                Privacy Policy
              </span>
            </p>
          </div>

          {/* Capabilities & Permissions */}
          <div className="space-y-8">
            {/* Capabilities */}
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">
                Platform Capabilities
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {capabilities.map((capability, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-200/50 hover:shadow-lg transition-shadow"
                  >
                    <div
                      className={`w-10 h-10 bg-gradient-to-r ${capability.color} rounded-xl flex items-center justify-center mb-3 shadow-lg`}
                    >
                      <capability.icon className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-semibold text-slate-800 text-sm mb-2">
                      {capability.title}
                    </h4>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      {capability.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Permissions */}
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl">
                  <Lock className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800">
                  Security & Permissions
                </h3>
              </div>

              <div className="space-y-4">
                {permissions.map((permission, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 p-4 rounded-xl bg-gradient-to-r from-slate-50 to-white border border-slate-200/50"
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-slate-600 to-slate-700 rounded-xl flex items-center justify-center shadow-lg">
                      <permission.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-slate-800">
                          {permission.title}
                        </h4>
                        <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                          {permission.level}
                        </span>
                      </div>
                      <p className="text-slate-600 text-sm">
                        {permission.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200/50">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900 mb-1">
                      Enterprise Security
                    </h4>
                    <p className="text-blue-700 text-sm">
                      All data is processed with bank-level encryption. We never
                      store your source code - only metadata and analytics are
                      retained for insights generation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
