# Pronajemik Monorepo

A TypeScript monorepo for a real estate application with client, server, and shared packages.

## Development

This project uses [Bun](https://bun.sh/) as the package manager and runtime.

### Getting Started

```bash
# Install dependencies
bun install

# Run all packages in development mode
bun run dev

# Run specific packages
bun run client:dev
bun run server:dev
```

### Code Formatting & Type Checking

This project uses [Biome](https://biomejs.dev/) for code formatting and linting, and TypeScript for type checking.

```bash
# Check formatting and linting
bun run format

# Fix formatting and linting issues
bun run format:fix

# Run TypeScript type checking
bun run typecheck
```

### Pre-commit Hooks

This project uses Husky for pre-commit hooks that automatically check formatting before commits.

## Continuous Integration

The project includes a streamlined GitHub Actions workflow for comprehensive code quality checks:

### CI Workflow

- **Runs on all branches**: Automatically checks every push and pull request
- **Quality checks**: Format checking, linting, and TypeScript type checking
- **Build verification**: Ensures client builds and server compiles correctly

### Workflow Features

- **Smart caching**: Bun dependencies and TypeScript build info cached for faster runs
- **Parallel execution**: Quality checks and build verification run efficiently
- **Optimized for free runners**: Maximum performance with GitHub's free tier limits

All CI checks must pass before code can be merged.

## Project Structure

```
packages/
├── client/          # React frontend application
├── server/          # Elysia backend API
└── common/          # Shared types and utilities
```
