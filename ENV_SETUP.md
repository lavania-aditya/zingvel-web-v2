# Environment Configuration Setup

This document explains how to set up environment variables for different environments in the Zingvel Web application.

## Environment Files

The application supports three environments:
- **Development** (local development)
- **Regression** (testing/staging)
- **Production** (live site)

### Setup Instructions

1. Create the following environment files in the root directory:

   - `.env.development` - For local development
   - `.env.production` - For production builds
   - `.env.regression` - For regression/staging builds

2. Use the provided example files as templates:
   - `.env.development.example`
   - `.env.production.example`

### Required Environment Variables

Each environment file should contain:

```
# API Base URLs
NEXT_PUBLIC_WANDERLIST_API_URL=<wanderlist-api-url>
NEXT_PUBLIC_PACKAGES_API_URL=<packages-api-url>

# Other configuration
NEXT_PUBLIC_APP_ENV=<environment-name>
NEXT_PUBLIC_APP_URL=<app-url>
```

## Running with Different Environments

The package.json contains scripts for running the application with different environment configurations:

- **Development:**
  ```
  npm run dev           # Uses .env.development
  ```

- **Regression:**
  ```
  npm run dev:reg       # Uses .env.regression
  ```

- **Building:**
  ```
  npm run build         # Production build
  npm run build:dev     # Development build
  npm run build:reg     # Regression build
  ```

- **Starting:**
  ```
  npm run start         # Start production build
  npm run start:dev     # Start development build
  npm run start:reg     # Start regression build
  ```

## Using Environment Variables in Code

Environment variables are centralized in the `src/utils/config.ts` file. Import this file to access any environment variable:

```typescript
import { config } from '@/utils/config';

// Use API URLs
const wanderlistApiUrl = config.api.wanderlist;

// Check current environment
if (config.isDevelopment) {
  // Development-only code
}
```

This approach ensures consistent access to environment variables throughout the application.

## Security Notes

- Never commit actual `.env` files to the repository
- Only the example files should be committed
- Keep sensitive information like API keys and secrets in the actual `.env` files
