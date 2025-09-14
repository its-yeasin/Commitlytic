// Mock data service for the Commitlytic application
// This file contains all dummy data used throughout the app

export interface Repository {
  id: number;
  name: string;
  fullName: string;
  description: string;
  private: boolean;
  contributors: number;
  commits: number;
  stars: number;
  branches: number;
  lastCommit: string;
  language: string;
  activity: "high" | "medium" | "low";
  createdAt: string;
  updatedAt: string;
}

export interface Contributor {
  id: number;
  username: string;
  name: string;
  email: string;
  avatar: string;
  bio?: string;
  location?: string;
  company?: string;
  website?: string;
  commits: number;
  linesAdded: number;
  linesDeleted: number;
  pullRequests: number;
  issuesOpened: number;
  lastActivity: string;
  joinDate: string;
  trend: "up" | "down" | "stable";
  role: "maintainer" | "contributor";
}

export interface Commit {
  id: number;
  sha: string;
  message: string;
  author: string;
  date: string;
  additions: number;
  deletions: number;
  repositoryId: number;
}

export interface PullRequest {
  id: number;
  number: number;
  title: string;
  state: "open" | "closed" | "merged";
  author: string;
  date: string;
  repositoryId: number;
}

export interface ActivityData {
  date: string;
  commits: number;
  pullRequests: number;
  issues: number;
}

// Mock repositories data
export const MOCK_REPOSITORIES: Repository[] = [
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
    createdAt: "2023-01-15",
    updatedAt: "2024-09-13",
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
    createdAt: "2023-03-20",
    updatedAt: "2024-09-12",
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
    createdAt: "2023-06-10",
    updatedAt: "2024-09-10",
  },
  {
    id: 4,
    name: "mobile-app",
    fullName: "sarah-tech/mobile-app",
    description: "Cross-platform mobile application using React Native",
    private: true,
    contributors: 4,
    commits: 67,
    stars: 12,
    branches: 2,
    lastCommit: "5 days ago",
    language: "TypeScript",
    activity: "medium",
    createdAt: "2023-08-15",
    updatedAt: "2024-09-08",
  },
  {
    id: 5,
    name: "api-gateway",
    fullName: "mike-systems/api-gateway",
    description: "Microservices API gateway with authentication",
    private: false,
    contributors: 15,
    commits: 189,
    stars: 156,
    branches: 8,
    lastCommit: "6 hours ago",
    language: "Go",
    activity: "high",
    createdAt: "2023-02-28",
    updatedAt: "2024-09-13",
  },
];

// Mock contributors data
export const MOCK_CONTRIBUTORS: Contributor[] = [
  {
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
    commits: 89,
    linesAdded: 2345,
    linesDeleted: 567,
    pullRequests: 12,
    issuesOpened: 5,
    lastActivity: "2 hours ago",
    joinDate: "2023-01-15",
    trend: "up",
    role: "maintainer",
  },
  {
    id: 2,
    username: "sarasmith",
    name: "Sara Smith",
    email: "sara@example.com",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    bio: "Frontend specialist with a passion for user experience and design systems.",
    location: "New York, NY",
    company: "Design Studio",
    commits: 67,
    linesAdded: 1890,
    linesDeleted: 234,
    pullRequests: 8,
    issuesOpened: 3,
    lastActivity: "1 day ago",
    joinDate: "2023-02-20",
    trend: "up",
    role: "contributor",
  },
  {
    id: 3,
    username: "mikewilson",
    name: "Mike Wilson",
    email: "mike@example.com",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    bio: "Backend engineer focused on scalable architecture and performance optimization.",
    location: "Austin, TX",
    company: "Scale Systems",
    commits: 45,
    linesAdded: 1234,
    linesDeleted: 189,
    pullRequests: 6,
    issuesOpened: 8,
    lastActivity: "3 days ago",
    joinDate: "2023-03-10",
    trend: "down",
    role: "contributor",
  },
  {
    id: 4,
    username: "emilychen",
    name: "Emily Chen",
    email: "emily@example.com",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    bio: "Data scientist and machine learning engineer working on intelligent systems.",
    location: "Seattle, WA",
    company: "AI Labs",
    commits: 34,
    linesAdded: 987,
    linesDeleted: 145,
    pullRequests: 4,
    issuesOpened: 2,
    lastActivity: "1 week ago",
    joinDate: "2023-04-05",
    trend: "stable",
    role: "contributor",
  },
  {
    id: 5,
    username: "alexbrown",
    name: "Alex Brown",
    email: "alex@example.com",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    bio: "DevOps engineer passionate about automation and cloud infrastructure.",
    location: "Denver, CO",
    company: "Cloud Native",
    commits: 23,
    linesAdded: 678,
    linesDeleted: 89,
    pullRequests: 3,
    issuesOpened: 1,
    lastActivity: "2 weeks ago",
    joinDate: "2023-05-12",
    trend: "up",
    role: "contributor",
  },
  {
    id: 6,
    username: "lisawang",
    name: "Lisa Wang",
    email: "lisa@example.com",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    bio: "QA engineer ensuring quality and reliability across all our products.",
    location: "Los Angeles, CA",
    company: "Quality First",
    commits: 28,
    linesAdded: 456,
    linesDeleted: 123,
    pullRequests: 5,
    issuesOpened: 12,
    lastActivity: "4 days ago",
    joinDate: "2023-07-08",
    trend: "stable",
    role: "contributor",
  },
];

// Mock commits data
export const MOCK_COMMITS: Commit[] = [
  {
    id: 1,
    sha: "a1b2c3d",
    message: "feat: Add user authentication system",
    author: "johndoe",
    date: "2 hours ago",
    additions: 89,
    deletions: 12,
    repositoryId: 1,
  },
  {
    id: 2,
    sha: "e4f5g6h",
    message: "fix: Resolve memory leak in data processing",
    author: "johndoe",
    date: "1 day ago",
    additions: 23,
    deletions: 45,
    repositoryId: 1,
  },
  {
    id: 3,
    sha: "i7j8k9l",
    message: "docs: Update API documentation",
    author: "sarasmith",
    date: "3 days ago",
    additions: 156,
    deletions: 8,
    repositoryId: 1,
  },
  {
    id: 4,
    sha: "m1n2o3p",
    message: "refactor: Optimize database queries",
    author: "mikewilson",
    date: "1 week ago",
    additions: 67,
    deletions: 134,
    repositoryId: 1,
  },
];

// Mock pull requests data
export const MOCK_PULL_REQUESTS: PullRequest[] = [
  {
    id: 1,
    number: 45,
    title: "Add user profile management",
    state: "merged",
    author: "johndoe",
    date: "3 days ago",
    repositoryId: 1,
  },
  {
    id: 2,
    number: 42,
    title: "Implement real-time notifications",
    state: "open",
    author: "sarasmith",
    date: "1 week ago",
    repositoryId: 1,
  },
  {
    id: 3,
    number: 38,
    title: "Fix responsive design issues",
    state: "closed",
    author: "emilychen",
    date: "2 weeks ago",
    repositoryId: 1,
  },
];

// Mock activity data for charts
export const MOCK_ACTIVITY_DATA: ActivityData[] = [
  { date: "2024-01", commits: 12, pullRequests: 2, issues: 1 },
  { date: "2024-02", commits: 15, pullRequests: 3, issues: 0 },
  { date: "2024-03", commits: 8, pullRequests: 1, issues: 2 },
  { date: "2024-04", commits: 20, pullRequests: 4, issues: 1 },
  { date: "2024-05", commits: 18, pullRequests: 2, issues: 0 },
  { date: "2024-06", commits: 16, pullRequests: 0, issues: 1 },
  { date: "2024-07", commits: 22, pullRequests: 3, issues: 2 },
  { date: "2024-08", commits: 19, pullRequests: 1, issues: 0 },
  { date: "2024-09", commits: 14, pullRequests: 2, issues: 1 },
];

export const MOCK_WEEKLY_COMMITS = [
  { day: "Mon", commits: 3 },
  { day: "Tue", commits: 7 },
  { day: "Wed", commits: 12 },
  { day: "Thu", commits: 8 },
  { day: "Fri", commits: 15 },
  { day: "Sat", commits: 2 },
  { day: "Sun", commits: 1 },
];

// Service functions to simulate API calls
export class MockDataService {
  static async getRepositories(): Promise<Repository[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return MOCK_REPOSITORIES;
  }

  static async getRepository(id: number): Promise<Repository | null> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return MOCK_REPOSITORIES.find((repo) => repo.id === id) || null;
  }

  static async getContributors(repositoryId?: number): Promise<Contributor[]> {
    await new Promise((resolve) => setTimeout(resolve, 400));
    // In a real app, you'd filter by repositoryId
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _ = repositoryId;
    return MOCK_CONTRIBUTORS;
  }

  static async getContributor(id: number): Promise<Contributor | null> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return (
      MOCK_CONTRIBUTORS.find((contributor) => contributor.id === id) || null
    );
  }

  static async getCommits(
    repositoryId?: number,
    contributorId?: number
  ): Promise<Commit[]> {
    await new Promise((resolve) => setTimeout(resolve, 400));
    let commits = MOCK_COMMITS;

    if (repositoryId) {
      commits = commits.filter(
        (commit) => commit.repositoryId === repositoryId
      );
    }

    if (contributorId) {
      const contributor = MOCK_CONTRIBUTORS.find((c) => c.id === contributorId);
      if (contributor) {
        commits = commits.filter(
          (commit) => commit.author === contributor.username
        );
      }
    }

    return commits;
  }

  static async getPullRequests(repositoryId?: number): Promise<PullRequest[]> {
    await new Promise((resolve) => setTimeout(resolve, 400));
    let prs = MOCK_PULL_REQUESTS;

    if (repositoryId) {
      prs = prs.filter((pr) => pr.repositoryId === repositoryId);
    }

    return prs;
  }

  static async getActivityData(
    repositoryId?: number,
    contributorId?: number
  ): Promise<ActivityData[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    // In a real app, you'd filter and aggregate based on parameters
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _repo = repositoryId;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _contributor = contributorId;
    return MOCK_ACTIVITY_DATA;
  }

  static async getWeeklyCommits(
    contributorId?: number
  ): Promise<typeof MOCK_WEEKLY_COMMITS> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _ = contributorId;
    return MOCK_WEEKLY_COMMITS;
  }
}

// Utility functions
export const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "bg-blue-500",
  JavaScript: "bg-yellow-500",
  Python: "bg-green-500",
  Java: "bg-red-500",
  Go: "bg-cyan-500",
  Rust: "bg-orange-500",
  "C++": "bg-blue-600",
  PHP: "bg-purple-500",
};

export const ACTIVITY_COLORS: Record<string, string> = {
  high: "text-green-600 bg-green-100",
  medium: "text-yellow-600 bg-yellow-100",
  low: "text-red-600 bg-red-100",
};

export const ROLE_COLORS: Record<string, string> = {
  maintainer: "bg-purple-100 text-purple-800",
  contributor: "bg-blue-100 text-blue-800",
};

export const PR_STATE_COLORS: Record<string, string> = {
  merged: "bg-purple-100 text-purple-800",
  open: "bg-green-100 text-green-800",
  closed: "bg-red-100 text-red-800",
};
