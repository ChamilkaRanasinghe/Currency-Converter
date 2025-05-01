# CurrencyWise - Modern Currency Converter

<p align="center">
  <img src="https://img.shields.io/badge/version-0.1.0-blue.svg" alt="Version 0.1.0">
  <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License MIT">
  <img src="https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg" alt="Node >=18.0.0">
  <img src="https://img.shields.io/badge/typescript-%3E%3D5.0.0-blue.svg" alt="TypeScript >=5.0.0">
</p>

CurrencyWise is a modern, user-friendly currency conversion application built with React, TypeScript, and Vite. It provides real-time currency conversion, historical exchange rate charts, and personalized features like conversion history and favorite currency pairs.

## Features

- 💱 Real-time currency conversion with support for multiple currencies
- 📈 Historical exchange rate visualization with interactive charts
- 📱 Responsive design optimized for all device sizes
- 🔄 Quick currency swap functionality
- ⭐ Save favorite currency pairs for quick access
- 📝 Detailed conversion history with export capabilities
- 🔌 Offline functionality with cached exchange rates

## Demo

[View Live Demo](#) (Replace with your deployed application URL)

## Screenshots

(Screenshots will be added after deployment)

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Routing**: React Router
- **Charts**: Chart.js with React-Chartjs-2
- **State Management**: React Context API
- **Testing**: Vitest, Testing Library
- **CI/CD**: GitHub Actions
- **DevOps**: Husky, Commitlint, Conventional Commits
- **Deployment**: Netlify (Multi-environment)

## Getting Started

### Prerequisites

- Node.js (v18 or newer)
- npm (v8 or newer)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/currency-converter.git
cd currency-converter
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) to view the application in your browser

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint to check for code issues
- `npm test` - Run the test suite
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run commit` - Commit changes using the conventional commit format

## Project Structure

```
currency-converter/
├── .github/                  # GitHub configuration files
│   ├── workflows/            # CI/CD workflow configurations
│   └── ISSUE_TEMPLATE/       # Issue templates
├── docs/                     # Documentation files
│   ├── ADRs/                 # Architecture Decision Records
│   ├── PRD.md                # Product Requirements Document
│   ├── TDD.md                # Technical Design Document
│   └── RUNBOOK.md            # Operations Runbook
├── public/                   # Static assets
├── src/                      # Source code
│   ├── components/           # React components
│   ├── context/              # React context providers
│   ├── pages/                # Page components
│   ├── services/             # API services and utilities
│   ├── tests/                # Test files
│   ├── types/                # TypeScript type definitions
│   ├── App.tsx               # Main App component
│   └── main.tsx              # Application entry point
├── .eslintrc.js              # ESLint configuration
├── package.json              # Dependencies and scripts
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── vite.config.ts            # Vite configuration
```

## DevOps & CI/CD

### Continuous Integration

- Automated linting and testing on each commit
- Matrix testing across multiple Node.js versions
- Code coverage reporting with Codecov

### Continuous Deployment

- Three-environment deployment pipeline (dev, staging, production)
- Blue-green deployment strategy
- Automated security scanning

### Development Workflow

- Conventional Commits for standardized commit messages
- GitHub Flow branching strategy
- Pre-commit hooks for code quality enforcement
- Automated dependency updates with Dependabot

## Documentation

Comprehensive documentation is available in the `docs/` directory:

- [Product Requirements Document](./docs/PRD.md)
- [Technical Design Document](./docs/TDD.md)
- [Operations Runbook](./docs/RUNBOOK.md)
- [Architecture Decision Records](./docs/ADRs/)

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Exchange Rates API](https://exchangerate-api.com/) for currency exchange rate data
- [Lucide React](https://lucide.dev/) for the beautiful icons
- All contributors who have helped this project grow# Currency-Converter
