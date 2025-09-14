// AI-powered contributor activity analysis service

export interface CommitAnalysis {
  id: string;
  message: string;
  timestamp: string;
  author: string;
  files: FileAnalysis[];
  summary: ActivitySummary;
}

export interface FileAnalysis {
  path: string;
  type: "added" | "modified" | "deleted" | "renamed";
  additions: number;
  deletions: number;
  language: string;
  category:
    | "feature"
    | "bugfix"
    | "refactor"
    | "documentation"
    | "config"
    | "test"
    | "style";
  impact: "low" | "medium" | "high";
}

export interface ActivitySummary {
  mainAccomplishment: string;
  categories: CategorySummary[];
  productivity: ProductivityMetrics;
  codeQuality: QualityIndicators;
  intelligentSummary: string;
}

export interface CategorySummary {
  category: string;
  description: string;
  filesCount: number;
  impact: "low" | "medium" | "high";
}

export interface ProductivityMetrics {
  linesAdded: number;
  linesDeleted: number;
  filesModified: number;
  complexity: "low" | "medium" | "high";
  efficiency: number; // 0-100 score
}

export interface QualityIndicators {
  hasTests: boolean;
  hasDocumentation: boolean;
  followsConventions: boolean;
  refactoringRatio: number;
}

export interface DailyAccomplishment {
  date: string;
  contributor: string;
  commits: CommitAnalysis[];
  overallSummary: string;
  keyAchievements: string[];
  technicalDetails: TechnicalSummary;
  productivityScore: number;
}

export interface TechnicalSummary {
  mainTechnologies: string[];
  architecturalChanges: string[];
  performanceImpacts: string[];
  securityImprovements: string[];
}

// Mock data with intelligent analysis
export const AI_CONTRIBUTOR_ANALYSIS: Record<number, DailyAccomplishment> = {
  1: {
    date: "2024-09-13",
    contributor: "John Doe",
    overallSummary:
      "John had a highly productive day focused on improving system security and user experience. He successfully implemented a comprehensive authentication overhaul, addressing critical security vulnerabilities while enhancing the login flow. His work demonstrates strong architectural thinking and attention to both security and usability.",
    keyAchievements: [
      "Implemented OAuth 2.0 authentication system with JWT tokens",
      "Fixed critical security vulnerability in user session management",
      "Enhanced login UI with improved error handling and loading states",
      "Added comprehensive API documentation for authentication endpoints",
      "Optimized database queries reducing auth response time by 40%",
    ],
    technicalDetails: {
      mainTechnologies: ["TypeScript", "React", "Node.js", "PostgreSQL", "JWT"],
      architecturalChanges: [
        "Migrated from session-based to token-based authentication",
        "Implemented middleware for JWT validation",
        "Added refresh token rotation mechanism",
      ],
      performanceImpacts: [
        "Reduced authentication response time from 400ms to 240ms",
        "Optimized database connection pooling",
        "Implemented Redis caching for session data",
      ],
      securityImprovements: [
        "Added CSRF protection",
        "Implemented rate limiting for login attempts",
        "Enhanced password hashing with bcrypt salt rounds",
      ],
    },
    productivityScore: 92,
    commits: [
      {
        id: "abc123",
        message: "Fix user authentication bug",
        timestamp: "2024-09-13T14:30:00Z",
        author: "John Doe",
        files: [
          {
            path: "src/auth/AuthService.ts",
            type: "modified",
            additions: 23,
            deletions: 8,
            language: "typescript",
            category: "bugfix",
            impact: "high",
          },
          {
            path: "src/components/LoginForm.tsx",
            type: "modified",
            additions: 15,
            deletions: 4,
            language: "typescript",
            category: "feature",
            impact: "medium",
          },
          {
            path: "src/types/User.ts",
            type: "added",
            additions: 7,
            deletions: 0,
            language: "typescript",
            category: "feature",
            impact: "low",
          },
        ],
        summary: {
          mainAccomplishment:
            "Fixed critical authentication vulnerability and improved user login experience",
          categories: [
            {
              category: "Security Fix",
              description:
                "Resolved JWT token validation issue that could allow unauthorized access",
              filesCount: 1,
              impact: "high",
            },
            {
              category: "UX Enhancement",
              description:
                "Improved login form with better error messages and loading states",
              filesCount: 1,
              impact: "medium",
            },
            {
              category: "Type Safety",
              description:
                "Added proper TypeScript interfaces for user authentication",
              filesCount: 1,
              impact: "low",
            },
          ],
          productivity: {
            linesAdded: 45,
            linesDeleted: 12,
            filesModified: 3,
            complexity: "medium",
            efficiency: 88,
          },
          codeQuality: {
            hasTests: true,
            hasDocumentation: true,
            followsConventions: true,
            refactoringRatio: 0.27,
          },
          intelligentSummary:
            "This commit demonstrates excellent problem-solving skills by addressing a critical security vulnerability while simultaneously improving user experience. The code changes show good architectural thinking with proper type definitions and clean separation of concerns.",
        },
      },
      {
        id: "def456",
        message: "Update API documentation",
        timestamp: "2024-09-13T11:15:00Z",
        author: "John Doe",
        files: [
          {
            path: "README.md",
            type: "modified",
            additions: 25,
            deletions: 3,
            language: "markdown",
            category: "documentation",
            impact: "medium",
          },
          {
            path: "docs/api.md",
            type: "modified",
            additions: 3,
            deletions: 2,
            language: "markdown",
            category: "documentation",
            impact: "low",
          },
        ],
        summary: {
          mainAccomplishment:
            "Comprehensive documentation update for authentication API endpoints",
          categories: [
            {
              category: "Documentation",
              description:
                "Updated API documentation with new authentication endpoints and examples",
              filesCount: 2,
              impact: "medium",
            },
          ],
          productivity: {
            linesAdded: 28,
            linesDeleted: 5,
            filesModified: 2,
            complexity: "low",
            efficiency: 75,
          },
          codeQuality: {
            hasTests: false,
            hasDocumentation: true,
            followsConventions: true,
            refactoringRatio: 0.18,
          },
          intelligentSummary:
            "Thorough documentation work that will significantly help other developers understand and integrate with the authentication system. Shows commitment to maintainable codebases.",
        },
      },
    ],
  },
  2: {
    date: "2024-09-12",
    contributor: "Sarah Smith",
    overallSummary:
      "Sarah delivered exceptional work on the frontend architecture, building a comprehensive dashboard system with excellent attention to responsive design and user experience. Her work shows strong React expertise and modern development practices.",
    keyAchievements: [
      "Built complete dashboard component architecture with reusable charts",
      "Implemented responsive design system supporting mobile and desktop",
      "Created efficient data visualization components with excellent performance",
      "Established component testing patterns for the frontend team",
      "Optimized CSS bundle size reducing load time by 30%",
    ],
    technicalDetails: {
      mainTechnologies: ["React", "TypeScript", "CSS3", "Chart.js", "Jest"],
      architecturalChanges: [
        "Implemented modular dashboard component system",
        "Created reusable chart abstraction layer",
        "Established CSS-in-JS architecture",
      ],
      performanceImpacts: [
        "Reduced CSS bundle size by 30%",
        "Implemented lazy loading for chart components",
        "Optimized re-rendering with React.memo",
      ],
      securityImprovements: [],
    },
    productivityScore: 89,
    commits: [
      {
        id: "ghi789",
        message: "Add new dashboard components",
        timestamp: "2024-09-12T16:45:00Z",
        author: "Sarah Smith",
        files: [
          {
            path: "src/components/Dashboard.tsx",
            type: "added",
            additions: 89,
            deletions: 0,
            language: "typescript",
            category: "feature",
            impact: "high",
          },
          {
            path: "src/components/Chart.tsx",
            type: "added",
            additions: 45,
            deletions: 0,
            language: "typescript",
            category: "feature",
            impact: "medium",
          },
          {
            path: "src/components/index.ts",
            type: "modified",
            additions: 2,
            deletions: 0,
            language: "typescript",
            category: "config",
            impact: "low",
          },
          {
            path: "src/styles/dashboard.css",
            type: "added",
            additions: 67,
            deletions: 0,
            language: "css",
            category: "style",
            impact: "medium",
          },
        ],
        summary: {
          mainAccomplishment:
            "Built comprehensive dashboard system with reusable chart components",
          categories: [
            {
              category: "Frontend Architecture",
              description:
                "Created modular dashboard with responsive design and interactive charts",
              filesCount: 2,
              impact: "high",
            },
            {
              category: "Styling System",
              description:
                "Implemented responsive CSS with mobile-first approach",
              filesCount: 1,
              impact: "medium",
            },
            {
              category: "Module Organization",
              description:
                "Updated component exports for better developer experience",
              filesCount: 1,
              impact: "low",
            },
          ],
          productivity: {
            linesAdded: 203,
            linesDeleted: 0,
            filesModified: 4,
            complexity: "high",
            efficiency: 95,
          },
          codeQuality: {
            hasTests: true,
            hasDocumentation: true,
            followsConventions: true,
            refactoringRatio: 0.0,
          },
          intelligentSummary:
            "Exceptional frontend development work creating a sophisticated dashboard system. The code demonstrates strong React patterns, excellent component design, and attention to performance and user experience.",
        },
      },
    ],
  },
  3: {
    date: "2024-09-11",
    contributor: "Mike Wilson",
    overallSummary:
      "Mike focused on critical backend optimizations, delivering significant performance improvements through database query optimization and caching implementation. His work shows strong database expertise and system performance understanding.",
    keyAchievements: [
      "Optimized critical database queries reducing response time by 60%",
      "Implemented intelligent caching system with Redis",
      "Refactored database connection management for better scalability",
      "Added comprehensive database monitoring and alerting",
      "Improved API throughput from 100 to 280 requests/second",
    ],
    technicalDetails: {
      mainTechnologies: ["Node.js", "PostgreSQL", "Redis", "TypeScript"],
      architecturalChanges: [
        "Implemented connection pooling with optimized configurations",
        "Added Redis caching layer for frequently accessed data",
        "Refactored query builder for better performance",
      ],
      performanceImpacts: [
        "Database query response time improved by 60%",
        "API throughput increased by 180%",
        "Memory usage optimization saving 40% RAM",
      ],
      securityImprovements: [],
    },
    productivityScore: 85,
    commits: [
      {
        id: "jkl012",
        message: "Refactor database queries for better performance",
        timestamp: "2024-09-11T13:20:00Z",
        author: "Mike Wilson",
        files: [
          {
            path: "src/lib/database.ts",
            type: "modified",
            additions: 45,
            deletions: 15,
            language: "typescript",
            category: "refactor",
            impact: "high",
          },
          {
            path: "src/lib/queries.ts",
            type: "modified",
            additions: 22,
            deletions: 8,
            language: "typescript",
            category: "refactor",
            impact: "medium",
          },
          {
            path: "src/lib/cache.ts",
            type: "added",
            additions: 34,
            deletions: 0,
            language: "typescript",
            category: "feature",
            impact: "medium",
          },
        ],
        summary: {
          mainAccomplishment:
            "Major database performance optimization with intelligent caching",
          categories: [
            {
              category: "Performance Optimization",
              description:
                "Refactored database queries and connection management for 60% speed improvement",
              filesCount: 2,
              impact: "high",
            },
            {
              category: "Caching System",
              description:
                "Implemented Redis-based caching for frequently accessed data",
              filesCount: 1,
              impact: "medium",
            },
          ],
          productivity: {
            linesAdded: 101,
            linesDeleted: 23,
            filesModified: 3,
            complexity: "high",
            efficiency: 82,
          },
          codeQuality: {
            hasTests: true,
            hasDocumentation: true,
            followsConventions: true,
            refactoringRatio: 0.23,
          },
          intelligentSummary:
            "Excellent backend optimization work that significantly improves system performance. The implementation shows deep understanding of database optimization and caching strategies.",
        },
      },
    ],
  },
  4: {
    date: "2024-09-10",
    contributor: "Emily Chen",
    overallSummary:
      "Emily delivered comprehensive search functionality with excellent test coverage and user experience design. Her work demonstrates full-stack capabilities and strong attention to testing and maintainability.",
    keyAchievements: [
      "Implemented powerful search functionality with auto-complete and filtering",
      "Created comprehensive test suite with 95% coverage",
      "Built responsive search UI with excellent UX patterns",
      "Added search analytics and performance monitoring",
      "Optimized search algorithms for sub-100ms response times",
    ],
    technicalDetails: {
      mainTechnologies: [
        "React",
        "TypeScript",
        "Elasticsearch",
        "Jest",
        "React Testing Library",
      ],
      architecturalChanges: [
        "Implemented search abstraction layer with multiple backends",
        "Created reusable search hook for component integration",
        "Added search result caching and pagination",
      ],
      performanceImpacts: [
        "Search response time optimized to <100ms",
        "Implemented efficient result pagination",
        "Added search result caching reducing server load",
      ],
      securityImprovements: [
        "Input sanitization for search queries",
        "Rate limiting for search API endpoints",
      ],
    },
    productivityScore: 91,
    commits: [
      {
        id: "mno345",
        message: "Implement search functionality",
        timestamp: "2024-09-10T10:30:00Z",
        author: "Emily Chen",
        files: [
          {
            path: "src/components/Search.tsx",
            type: "added",
            additions: 67,
            deletions: 0,
            language: "typescript",
            category: "feature",
            impact: "high",
          },
          {
            path: "src/lib/utils.ts",
            type: "modified",
            additions: 22,
            deletions: 4,
            language: "typescript",
            category: "feature",
            impact: "medium",
          },
          {
            path: "src/hooks/useSearch.ts",
            type: "added",
            additions: 43,
            deletions: 0,
            language: "typescript",
            category: "feature",
            impact: "medium",
          },
        ],
        summary: {
          mainAccomplishment:
            "Complete search system implementation with excellent UX and performance",
          categories: [
            {
              category: "Search Feature",
              description:
                "Built comprehensive search with autocomplete, filtering, and responsive design",
              filesCount: 1,
              impact: "high",
            },
            {
              category: "React Hooks",
              description:
                "Created reusable search hook with debouncing and state management",
              filesCount: 1,
              impact: "medium",
            },
            {
              category: "Utility Functions",
              description:
                "Enhanced utility library with search-related helper functions",
              filesCount: 1,
              impact: "medium",
            },
          ],
          productivity: {
            linesAdded: 132,
            linesDeleted: 4,
            filesModified: 3,
            complexity: "medium",
            efficiency: 88,
          },
          codeQuality: {
            hasTests: true,
            hasDocumentation: true,
            followsConventions: true,
            refactoringRatio: 0.03,
          },
          intelligentSummary:
            "Excellent implementation of search functionality showing strong React expertise and UX understanding. The code is well-structured with proper separation of concerns and reusable patterns.",
        },
      },
      {
        id: "pqr678",
        message: "Add unit tests for search component",
        timestamp: "2024-09-10T15:45:00Z",
        author: "Emily Chen",
        files: [
          {
            path: "__tests__/Search.test.tsx",
            type: "added",
            additions: 45,
            deletions: 0,
            language: "typescript",
            category: "test",
            impact: "medium",
          },
        ],
        summary: {
          mainAccomplishment:
            "Comprehensive test coverage for search functionality",
          categories: [
            {
              category: "Testing",
              description:
                "Added thorough unit tests for search component with edge cases",
              filesCount: 1,
              impact: "medium",
            },
          ],
          productivity: {
            linesAdded: 45,
            linesDeleted: 0,
            filesModified: 1,
            complexity: "low",
            efficiency: 85,
          },
          codeQuality: {
            hasTests: true,
            hasDocumentation: false,
            followsConventions: true,
            refactoringRatio: 0.0,
          },
          intelligentSummary:
            "Excellent commitment to code quality with comprehensive test coverage. The tests cover various scenarios and edge cases, ensuring reliable search functionality.",
        },
      },
    ],
  },
};

// AI Analysis Functions
export const generateDailySummary = (
  contributorId: number
): DailyAccomplishment | null => {
  return AI_CONTRIBUTOR_ANALYSIS[contributorId] || null;
};

export const analyzeProductivityTrends = (contributorId: number) => {
  // In a real implementation, this would analyze multiple days of data
  const dayData = AI_CONTRIBUTOR_ANALYSIS[contributorId];
  if (!dayData) return null;

  return {
    averageProductivity: dayData.productivityScore,
    trendDirection: "up" as const,
    improvementAreas: ["Add more tests", "Improve documentation"],
    strengths: [
      "Code quality",
      "Performance optimization",
      "Security awareness",
    ],
  };
};

export const categorizeWorkType = (commits: CommitAnalysis[]) => {
  const categories = {
    feature: 0,
    bugfix: 0,
    refactor: 0,
    documentation: 0,
    test: 0,
    config: 0,
    style: 0,
  };

  commits.forEach((commit) => {
    commit.files.forEach((file) => {
      categories[file.category]++;
    });
  });

  return categories;
};

export const generateTechnicalInsights = (
  accomplishment: DailyAccomplishment
) => {
  return {
    complexityScore: accomplishment.productivityScore,
    mainFocus: accomplishment.keyAchievements[0],
    technicalDepth:
      accomplishment.technicalDetails.architecturalChanges.length > 0
        ? "high"
        : "medium",
    impactArea:
      accomplishment.technicalDetails.performanceImpacts.length > 0
        ? "performance"
        : "feature",
  };
};
