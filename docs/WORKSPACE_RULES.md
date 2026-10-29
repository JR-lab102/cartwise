# Workspace Rules

## Project Overview

**Project:** Berry Buddy
**Type:** Mobile-first Progressive Web Application (PWA)
**Tech Stack:** React (Vite), Node.js/Express, Supabase (PostgreSQL)

This document defines the team's workflow, coding standards, and best practices for the Berry Buddy project.

## Project Standards

### Code Style

#### General Principles
- Write clean, readable, and maintainable code
- Follow existing code patterns and conventions
- Keep functions focused and small
- Use descriptive variable and function names
- Add comments only when necessary for complex logic

#### Frontend (JavaScript/TypeScript)
- Use ESLint for linting
- Use Prettier for code formatting
- Follow Airbnb or project-specific style guide
- Use TypeScript for type safety
- Prefer functional programming patterns
- Use const/let over var

#### Backend (Node.js)
- Use ESLint for linting
- Follow async/await patterns
- Use proper error handling
- Implement request validation
- Use environment variables for configuration

### Git Workflow

#### Branching Strategy

**Branch Types:**
- `main` - Stable/production branch. Only production-ready code is merged here.
- `develop` - Integration branch. All feature branches are merged here for testing and integration.
- `feature/<feature-name>` - Individual feature branches created from `develop` for specific tasks.

**Branch Workflow:**
1. Create `feature/<feature-name>` from `develop` branch
2. Develop and test the feature on the feature branch
3. Create a pull request from `feature/<feature-name>` to `develop`
4. After review and approval, merge to `develop`
5. Once features are tested and stable on `develop`, merge to `main` for production

**Branch Rules:**
- Never commit directly to `main` or `develop`
- Always create feature branches for development
- Keep feature branches focused on a single feature or fix
- Delete feature branches after merging
- Use descriptive branch names (e.g., `feature/product-search`, `feature/priority-configuration`)

#### Commit Message Format

**Conventional Commits:**
- Format: `type(scope): description`
- **Types:**
  - `feat:` - New feature
  - `fix:` - Bug fix
  - `docs:` - Documentation changes
  - `chore:` - Maintenance tasks, build process, dependency updates
  - `style:` - Code style changes (formatting, no logic change)
  - `refactor:` - Code refactoring (no functional change)
  - `test:` - Test additions or updates

**Examples:**
- `feat(search): implement real-time search suggestions`
- `fix(comparison): resolve green highlighting bug`
- `docs(readme): update installation guide`
- `chore(deps): upgrade React to v18`
- `style(priorities): format with Prettier`
- `refactor(api): extract duplicate validation logic`
- `test(comparison): add unit tests for scoring algorithm`

**Guidelines:**
- Use lowercase for type
- Keep description under 72 characters
- Use imperative mood ("add" not "added")
- Add body for detailed explanations if needed
- Reference issue numbers if applicable

#### Pull Request Process

**PR Requirements:**
- All feature branches require a pull request before merging
- PR must be created from `feature/<feature-name>` to `develop`
- At least 1 team member review required before approval
- All automated tests must pass
- Code must pass linting checks
- PR description must include:
  - Clear summary of changes
  - Related issue or task number
  - Testing performed
  - Screenshots for UI changes (if applicable)

**PR Review Guidelines:**
- Be constructive and respectful in feedback
- Focus on code quality, correctness, and maintainability
- Ask questions for clarification
- Suggest improvements when appropriate
- Approve only when confident in the changes
- Request changes if significant issues found

**PR Merging:**
- Use "Squash and merge" to keep history clean
- Delete feature branch after merging
- Ensure commit message follows conventional commits format
- Notify team of significant changes

### Development Practices

#### Environment Setup
- Use `.env` files for local development
- Never commit `.env` files
- Use `.env.example` as template
- Document required environment variables

#### Testing
- Write tests for new features
- Maintain test coverage above 80%
- Run tests before committing
- Write unit tests for business logic
- Write integration tests for API endpoints

#### Code Review
- Be constructive and respectful
- Focus on code quality and correctness
- Ask questions for clarification
- Suggest improvements
- Approve only when confident

### Project Structure

#### File Organization
- Keep related files together
- Use clear folder hierarchies
- Separate concerns by layer
- Use index files for clean imports
- Avoid deep nesting

#### Naming Conventions

**JavaScript/TypeScript:**
- Variables and functions: camelCase (e.g., `getUserById`, `productName`, `isLoading`)
- Constants: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`, `MAX_PRODUCTS`)
- Classes: PascalCase (e.g., `UserService`, `ProductManager`)

**React Components:**
- Component files: PascalCase (e.g., `UserProfile.tsx`, `SearchBar.tsx`)
- Component names: PascalCase (e.g., `UserProfile`, `SearchBar`)
- Props interface: PascalCase with "Props" suffix (e.g., `UserProfileProps`)

**File Names:**
- All files: kebab-case (e.g., `user-service.ts`, `product-search.tsx`)
- Test files: kebab-case with `.test` or `.spec` suffix (e.g., `user-service.test.ts`)
- Utility files: kebab-case (e.g., `api-client.ts`, `date-utils.ts`)

**Database:**
- Tables: snake_case (e.g., `user_profiles`, `product_nutrition`)
- Columns: snake_case (e.g., `created_at`, `user_id`)
- Indexes: snake_case with `idx_` prefix (e.g., `idx_user_email`)

**API Endpoints:**
- Routes: kebab-case (e.g., `/api/product-search`, `/api/priority-config`)
- Query parameters: camelCase (e.g., `sortBy`, `filterBy`)

**CSS/Styles:**
- Classes: kebab-case (e.g., `.search-bar`, `.priority-slider`)
- CSS variables: kebab-case with `--` prefix (e.g., `--primary-color`)

### API Design

#### RESTful Conventions
- Use appropriate HTTP methods (GET, POST, PUT, DELETE)
- Use plural nouns for resources (e.g., `/api/products`)
- Use kebab-case for endpoints (e.g., `/api/user-profiles`)
- Return proper HTTP status codes
- Version APIs (e.g., `/api/v1/products`)

#### Response Format
- Use consistent JSON structure
- Include timestamps in ISO 8601 format
- Use snake_case for JSON keys
- Include error details in error responses
- Paginate list responses

### Database Practices

#### Schema Design
- Use foreign keys for relationships
- Add indexes for frequently queried columns
- Use appropriate data types
- Include created_at and updated_at timestamps
- Use soft deletes when appropriate

#### Migrations
- Write reversible migrations
- Test migrations on sample data
- Document breaking changes
- Never modify existing migrations
- Use transactions for complex changes

### Security Best Practices

#### Authentication
- Use JWT for stateless authentication
- Implement token refresh mechanism
- Store tokens securely (httpOnly cookies)
- Implement logout functionality
- Use secure password hashing (bcrypt)

#### Authorization
- Implement role-based access control
- Validate permissions on server-side
- Use principle of least privilege
- Audit sensitive operations
- Implement rate limiting

#### Data Protection
- Encrypt sensitive data at rest
- Use HTTPS in production
- Validate and sanitize user input
- Parameterize database queries
- Never log sensitive information

### Performance Guidelines

#### Frontend
- Lazy load routes and components
- Optimize images (WebP, compression)
- Minimize bundle size
- Use code splitting
- Implement caching strategies

#### Backend
- Use database connection pooling
- Implement response caching
- Optimize database queries
- Use pagination for large datasets
- Monitor and profile performance

### Documentation

#### Code Documentation
- Document complex algorithms
- Explain non-obvious decisions
- Document API endpoints
- Include usage examples
- Keep documentation up to date

#### Project Documentation
- Maintain README with setup instructions
- Document architecture decisions
- Keep CHANGELOG updated
- Document environment variables
- Include deployment guides

### Communication

#### Team Collaboration
- Use clear and concise communication
- Update task status regularly
- Block and unblock tasks appropriately
- Share knowledge through documentation
- Ask for help when needed

#### Meetings
- Prepare agenda beforehand
- Take notes and share outcomes
- Respect everyone's time
- Follow up on action items
- Cancel if not necessary

### Quality Assurance

#### Before Merging
- All tests must pass
- Code must be reviewed
- No console.log statements
- No commented-out code
- No TODO comments without issues

#### Release Process
- Tag releases with semantic versioning
- Update CHANGELOG
- Run full test suite
- Perform smoke tests
- Have rollback plan ready

### Tooling

#### Required Tools
- Node.js (v18 or higher)
- Git
- IDE (VS Code recommended)
- Supabase CLI
- Vite (for frontend build)
- Docker (optional)

#### Recommended Extensions
- ESLint
- Prettier
- GitLens
- Supabase extension
- Database client (TablePlus, DBeaver)
- PWA tools (Lighthouse, PWA Builder)

### Issue Tracking

#### Reporting Bugs
- Use clear and descriptive title
- Provide steps to reproduce
- Include expected vs actual behavior
- Add environment details
- Attach screenshots if applicable

#### Feature Requests
- Describe the problem to solve
- Propose a solution
- Discuss alternatives considered
- Estimate complexity
- Prioritize based on value

## Consequences

### Violations
- First offense: Reminder and guidance
- Second offense: Code review required
- Third offense: Pair programming session
- Continued issues: Escalation to lead

### Recognition
- Consistent adherence: Recognition in team meetings
- Outstanding contributions: Shout-outs in documentation
- Improving rules: Invited to contribute to guidelines

## Updates

This document should be reviewed and updated:
- Quarterly
- When major technologies change
- When team structure changes
- Based on feedback from team members

Last updated: 2026-10-28
