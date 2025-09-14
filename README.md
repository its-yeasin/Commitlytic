# Commitlytic 📊

A modern, AI-powered GitHub repository analytics platform built with Next.js. Analyze contributor activity, track repository health, and gain insights into your development team's productivity.

![Commitlytic Dashboard](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=Commitlytic+Dashboard)

## ✨ Features

### 🔐 Authentication

- Clean, modern login interface
- Email/password authentication with validation
- OAuth integration with GitHub
- Remember me functionality

### 🚀 GitHub Integration

- Seamless GitHub App installation flow
- Repository selection and management
- Real-time data synchronization
- Support for both public and private repositories

### 📈 Analytics Dashboard

- **Repository Overview**: Track commits, contributors, stars, and activity
- **Contributor Insights**: Detailed profiles with contribution metrics
- **Activity Charts**: Interactive visualizations using Recharts
- **AI-Powered Summaries**: Intelligent insights and recommendations
- **Date Range Filtering**: Flexible time-based analytics

### 🤖 AI Features

- Smart contributor activity analysis
- Repository health scoring
- Automated recommendations
- Risk assessment and alerts
- Code quality insights

### 📱 Modern UI/UX

- Fully responsive design
- Dark/light mode support
- Smooth animations and transitions
- Accessible components
- Mobile-first approach

## 🛠️ Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Recharts** - Interactive data visualizations
- **Lucide React** - Beautiful icon library
- **Headless UI** - Accessible components

### Development Tools

- **ESLint** - Code linting
- **Date-fns** - Date manipulation utilities

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/commitlytic.git
   cd commitlytic
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Project Structure

```
commitlytic/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── login/          # Authentication pages
│   │   ├── dashboard/      # Main dashboard
│   │   ├── repository/     # Repository details
│   │   ├── contributor/    # Contributor profiles
│   │   └── install/        # GitHub app installation
│   ├── components/         # Reusable UI components
│   │   ├── AISummary.tsx  # AI insights component
│   │   └── DateFilter.tsx # Date range picker
│   └── lib/               # Utilities and services
│       └── mockData.ts    # Mock data service
├── public/                # Static assets
└── ...config files
```

## 🎨 Key Components

### Authentication Flow

1. **Login Page** (`/login`) - Email/password authentication
2. **GitHub OAuth** - One-click GitHub integration
3. **Installation Flow** (`/install`) - GitHub App setup

### Main Application

1. **Dashboard** (`/dashboard`) - Repository overview and management
2. **Repository Details** (`/repository/[id]`) - Contributor list and analytics
3. **Contributor Profile** (`/contributor/[id]`) - Individual activity analysis

### Reusable Components

- **AISummary** - AI-powered insights and recommendations
- **DateFilter** - Flexible date range selection
- **Charts** - Interactive data visualizations

## 🧪 Features in Detail

### AI-Powered Insights

- **Health Scoring**: Repository health assessment
- **Team Velocity**: Development speed analysis
- **Code Quality**: Metrics and trends
- **Risk Assessment**: Identify potential issues
- **Recommendations**: Actionable improvement suggestions

### Analytics & Visualizations

- **Commit Activity**: Line charts showing contribution over time
- **Weekly Patterns**: Bar charts of daily commit patterns
- **Contributor Comparison**: Side-by-side metrics
- **Pull Request Analysis**: State tracking and trends

### Responsive Design

- **Mobile Optimized**: Works perfectly on all devices
- **Flexible Layouts**: Grid and flexbox combinations
- **Progressive Enhancement**: Core functionality first
- **Touch-Friendly**: Optimized for mobile interactions

## 🎯 Demo Data

The application includes comprehensive mock data for demonstration:

- **5 Sample Repositories** with realistic metrics
- **6 Contributors** with detailed profiles and activity
- **Historical Data** spanning multiple months
- **Interactive Charts** with sample analytics
- **AI Insights** with realistic recommendations

## 🔧 Customization

### Styling

- Modify `tailwind.config.ts` for theme customization
- Update `src/app/globals.css` for global styles
- Component-level styling with Tailwind classes

### Data Integration

- Replace mock data in `src/lib/mockData.ts`
- Implement real GitHub API integration
- Add database connectivity for persistence

### AI Features

- Integrate with OpenAI or other AI services
- Implement custom analytics algorithms
- Add machine learning models for predictions

## 📱 Mobile Experience

The application is fully responsive with:

- **Mobile Navigation**: Optimized for touch
- **Responsive Charts**: Adapted for small screens
- **Touch Gestures**: Native mobile interactions
- **Performance**: Optimized for mobile networks

## 🚢 Deployment

### Vercel (Recommended)

```bash
npm run build
npx vercel --prod
```

### Other Platforms

```bash
npm run build
npm run start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing React framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Vercel** - For hosting and deployment platform
- **Lucide** - For the beautiful icon set
- **Recharts** - For the data visualization library

---

**Built with ❤️ using Next.js and TypeScript**

For questions or support, please open an issue or contact the development team.
