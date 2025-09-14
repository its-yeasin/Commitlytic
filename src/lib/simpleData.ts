// Simple mock data for the simplified Commitlytic application

export interface SimpleContributor {
  id: number;
  name: string;
  username: string;
  avatar: string;
  lastCommitDate: string;
  totalCommits: number;
}

export interface FileChange {
  name: string;
  status: "added" | "modified" | "deleted";
  added: number;
  deleted: number;
}

export interface SimpleCommit {
  id: number;
  message: string;
  time: string;
  filesChanged: number;
  linesAdded: number;
  linesDeleted: number;
  files: FileChange[];
}

export interface DailyActivity {
  date: string;
  commits: SimpleCommit[];
}

// Simple contributors data
export const SIMPLE_CONTRIBUTORS: SimpleContributor[] = [
  {
    id: 1,
    name: "John Doe",
    username: "johndoe",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    lastCommitDate: "2024-09-13",
    totalCommits: 156,
  },
  {
    id: 2,
    name: "Sarah Smith",
    username: "sarahsmith",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    lastCommitDate: "2024-09-12",
    totalCommits: 89,
  },
  {
    id: 3,
    name: "Mike Wilson",
    username: "mikewilson",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    lastCommitDate: "2024-09-11",
    totalCommits: 67,
  },
  {
    id: 4,
    name: "Emily Chen",
    username: "emilychen",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    lastCommitDate: "2024-09-10",
    totalCommits: 43,
  },
];

// Simple daily activity data with more realistic examples
export const SIMPLE_DAILY_ACTIVITY: Record<number, DailyActivity> = {
  1: {
    date: "2024-09-13",
    commits: [
      {
        id: 1,
        message: "Fix user authentication bug",
        time: "14:30",
        filesChanged: 3,
        linesAdded: 45,
        linesDeleted: 12,
        files: [
          {
            name: "src/auth/AuthService.ts",
            status: "modified",
            added: 23,
            deleted: 8,
          },
          {
            name: "src/components/LoginForm.tsx",
            status: "modified",
            added: 15,
            deleted: 4,
          },
          { name: "src/types/User.ts", status: "added", added: 7, deleted: 0 },
        ],
      },
      {
        id: 2,
        message: "Update API documentation",
        time: "11:15",
        filesChanged: 2,
        linesAdded: 28,
        linesDeleted: 5,
        files: [
          { name: "README.md", status: "modified", added: 25, deleted: 3 },
          { name: "docs/api.md", status: "modified", added: 3, deleted: 2 },
        ],
      },
    ],
  },
  2: {
    date: "2024-09-12",
    commits: [
      {
        id: 3,
        message: "Add new dashboard components",
        time: "16:45",
        filesChanged: 4,
        linesAdded: 134,
        linesDeleted: 8,
        files: [
          {
            name: "src/components/Dashboard.tsx",
            status: "added",
            added: 89,
            deleted: 0,
          },
          {
            name: "src/components/Chart.tsx",
            status: "added",
            added: 45,
            deleted: 0,
          },
          {
            name: "src/components/index.ts",
            status: "modified",
            added: 0,
            deleted: 8,
          },
          {
            name: "src/styles/dashboard.css",
            status: "added",
            added: 0,
            deleted: 0,
          },
        ],
      },
      {
        id: 4,
        message: "Fix responsive design issues",
        time: "09:30",
        filesChanged: 2,
        linesAdded: 23,
        linesDeleted: 15,
        files: [
          {
            name: "src/styles/globals.css",
            status: "modified",
            added: 15,
            deleted: 10,
          },
          {
            name: "src/components/Navigation.tsx",
            status: "modified",
            added: 8,
            deleted: 5,
          },
        ],
      },
    ],
  },
  3: {
    date: "2024-09-11",
    commits: [
      {
        id: 5,
        message: "Refactor database queries for better performance",
        time: "13:20",
        filesChanged: 3,
        linesAdded: 67,
        linesDeleted: 23,
        files: [
          {
            name: "src/lib/database.ts",
            status: "modified",
            added: 45,
            deleted: 15,
          },
          {
            name: "src/lib/queries.ts",
            status: "modified",
            added: 22,
            deleted: 8,
          },
          { name: "src/lib/cache.ts", status: "added", added: 0, deleted: 0 },
        ],
      },
    ],
  },
  4: {
    date: "2024-09-10",
    commits: [
      {
        id: 6,
        message: "Implement search functionality",
        time: "10:30",
        filesChanged: 3,
        linesAdded: 89,
        linesDeleted: 4,
        files: [
          {
            name: "src/components/Search.tsx",
            status: "added",
            added: 67,
            deleted: 0,
          },
          {
            name: "src/lib/utils.ts",
            status: "modified",
            added: 22,
            deleted: 4,
          },
          {
            name: "src/hooks/useSearch.ts",
            status: "added",
            added: 0,
            deleted: 0,
          },
        ],
      },
      {
        id: 7,
        message: "Add unit tests for search component",
        time: "15:45",
        filesChanged: 1,
        linesAdded: 45,
        linesDeleted: 0,
        files: [
          {
            name: "__tests__/Search.test.tsx",
            status: "added",
            added: 45,
            deleted: 0,
          },
        ],
      },
    ],
  },
};

// Utility functions
export const getContributorActivity = (
  contributorId: number
): DailyActivity | null => {
  const activity = SIMPLE_DAILY_ACTIVITY[contributorId];
  if (!activity) return null;

  // In a real app, you would filter by date here
  return activity;
};

export const getContributors = (): SimpleContributor[] => {
  return SIMPLE_CONTRIBUTORS;
};

export const getContributor = (id: number): SimpleContributor | null => {
  return (
    SIMPLE_CONTRIBUTORS.find((contributor) => contributor.id === id) || null
  );
};
