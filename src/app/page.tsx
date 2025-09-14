"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GitBranch, Users, BarChart, Lock, Github } from "lucide-react";

// Simple auth state management (in real app, use proper state management)
const getAuthState = () => {
  if (typeof window === "undefined") return null;
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const hasGitHubApp = localStorage.getItem("hasGitHubApp") === "true";
  const commitlyticInstalled =
    localStorage.getItem("commitlytic_installed") === "true";
  const selectedRepo = localStorage.getItem("selectedRepo");

  return { isLoggedIn, hasGitHubApp, commitlyticInstalled, selectedRepo };
};

export default function Home() {
  const [authState, setAuthState] = useState<{
    isLoggedIn: boolean;
    hasGitHubApp: boolean;
    commitlyticInstalled: boolean;
    selectedRepo: string | null;
  } | null>(null);
  const [hasRedirected, setHasRedirected] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkStateAndRedirect = () => {
      const state = getAuthState();
      setAuthState(state);

      if (state && !hasRedirected) {
        // Redirect based on authentication state
        if (!state.isLoggedIn) {
          setHasRedirected(true);
          router.push("/login");
        } else if (!state.hasGitHubApp || !state.commitlyticInstalled) {
          setHasRedirected(true);
          router.push("/install");
        } else {
          setHasRedirected(true);
          router.push("/contributors");
        }
      }
    };

    // Add delay to prevent race conditions
    const timeoutId = setTimeout(checkStateAndRedirect, 200);
    return () => clearTimeout(timeoutId);
  }, [router, hasRedirected]);

  // Show loading while checking auth state
  if (!authState) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <GitBranch className="h-16 w-16 text-gray-700" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">Commitlytic</h1>

        <p className="text-gray-600 mb-8">
          Simple contributor activity tracking and summary generation for
          repository admins
        </p>

        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-2 text-gray-700">
            <Lock className="h-5 w-5" />
            <span>Admin Authentication</span>
          </div>

          <div className="flex items-center justify-center space-x-2 text-gray-700">
            <Github className="h-5 w-5" />
            <span>GitHub Integration</span>
          </div>

          <div className="flex items-center justify-center space-x-2 text-gray-700">
            <Users className="h-5 w-5" />
            <span>Track Contributors</span>
          </div>

          <div className="flex items-center justify-center space-x-2 text-gray-700">
            <BarChart className="h-5 w-5" />
            <span>Daily Activity Summaries</span>
          </div>
        </div>

        <Link
          href="/login"
          className="mt-8 inline-block bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
        >
          Admin Login
        </Link>
      </div>
    </div>
  );
}
