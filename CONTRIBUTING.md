# Contributing to foundryvtt-dnd5e-types

Thank you for your interest in contributing to the Foundry VTT DnD5e Types project! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Documentation](#documentation)
- [Release Process](#release-process)

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to [your-email@example.com](mailto:your-email@example.com).

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** to your local machine
3. **Set up the development environment**:
   ```bash
   # Use the correct Node.js version
   nvm use
   
   # Install dependencies
   npm install
   
   # Build the project
   npm run build
   ```

## Development Workflow

1. **Create a new branch** for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bugfix-name
   ```

2. **Make your changes** to the codebase

3. **Run linting and formatting**:
   ```bash
   npm run lint
   npm run format
   ```

4. **Build the project** to ensure it compiles correctly:
   ```bash
   npm run build
   ```

5. **Generate documentation** if you've made significant changes:
   ```bash
   npm run docs
   ```

6. **Commit your changes** using the [Conventional Commits](#commit-message-guidelines) format

7. **Push your branch** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

8. **Create a Pull Request** from your fork to the main repository

## Pull Request Process

1. Ensure your PR includes a clear description of the changes and the motivation behind them
2. Update documentation if necessary
3. Make sure all CI checks pass
4. Request a review from a maintainer
5. Address any feedback from reviewers
6. Once approved, a maintainer will merge your PR

## Coding Standards

This project uses ESLint and Prettier to enforce coding standards:

- **TypeScript**: Follow the TypeScript best practices
- **Linting**: All code must pass ESLint checks
- **Formatting**: All code must be formatted with Prettier
- **Documentation**: Use JSDoc comments for all public APIs

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification for commit messages:

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to the build process or auxiliary tools

Examples:
```
feat: add types for ActorSheet5eCharacter
fix: correct return type of getData method
docs: update usage examples
chore: update dependencies
```

## Documentation

- Use JSDoc comments for all public APIs
- Update the README.md if necessary
- Add examples for new features
- Generate documentation with `npm run docs`

## Release Process

This project uses [Release Please](https://github.com/googleapis/release-please) for automated releases:

1. Commits to the main branch are automatically analyzed
2. Release Please creates or updates a release PR that:
   - Updates the version in package.json based on conventional commits
   - Updates the CHANGELOG.md with all changes
3. When the release PR is merged, Release Please:
   - Creates a GitHub release
   - Tags the release
   - Publishes the package to npm

## Thank You!

Your contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.
