# Contributing to CurrencyWise

Thank you for considering contributing to CurrencyWise! This document outlines the guidelines and processes for contributing to our project.

## Code of Conduct

By participating in this project, you agree to abide by our code of conduct. Please be respectful and considerate of others.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue tracker to see if the problem has already been reported. When creating a bug report, include as many details as possible using the bug report template.

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please use the feature request template and provide detailed information about your idea.

### Pull Requests

1. Fork the repository
2. Create a new branch from `main` for your feature (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Write or update tests as necessary
5. Commit your changes following conventional commit format
6. Push to your branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request against `main` using our PR template

## Development Setup

### Prerequisites

- Node.js (v18 or newer)
- npm (v8 or newer)

### Setup Steps

1. Clone your fork of the repository
```bash
git clone https://github.com/YOUR_USERNAME/currency-converter.git
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

## Coding Standards

### Commit Messages

We follow the Conventional Commits specification for our commit messages:

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

Types include:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools and libraries

### Code Style

- We use ESLint and TypeScript for code consistency
- Our code is formatted using Prettier
- Run `npm run lint` to check for linting issues

### Testing

- Write tests for new features and bug fixes
- Maintain a high level of test coverage
- Run `npm test` to execute the test suite

## Branching Strategy

- `main`: Production-ready code
- `develop`: Feature integration branch
- Feature branches: `feature/your-feature-name`
- Bug fix branches: `fix/issue-description`
- Release branches: `release/x.y.z`
- Hotfix branches: `hotfix/issue-description`

## Review Process

- All code changes require review from at least one maintainer
- Address all review comments before merging
- Squash commits when merging to keep history clean

## Documentation

- Update README.md with details of changes to the interface
- Update API documentation for new or modified endpoints
- Include JSDoc comments for functions and classes

## Questions?

Feel free to create an issue with the "question" label if you need help or clarification on any aspect of the contribution process.

Thank you for your contributions!