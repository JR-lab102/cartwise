# Workspace Rules

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

#### Branch Naming
- `feature/` - New features
- `bugfix/` - Bug fixes
- `hotfix/` - Critical production fixes
- `refactor/` - Code refactoring
- `docs/` - Documentation updates
- `test/` - Test additions/updates

#### Commit Messages
- Use conventional commits format
- Format: `type(scope): description`
- Types: feat, fix, docs, style, refactor, test, chore
- Examples:
  - `feat(auth): add OAuth login`
  - `fix(cart): resolve item removal bug`
  - `docs(readme): update installation guide`

#### Pull Request Guidelines
- Create PRs from feature branches to main
- Include clear description of changes
- Reference related issues
- Ensure all tests pass
- Request at least one code review
- Keep PRs focused and small

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
- Files: kebab-case (e.g., `user-service.ts`)
- Components: PascalCase (e.g., `UserProfile.tsx`)
- Functions: camelCase (e.g., `getUserById`)
- Constants: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)
- Database tables: snake_case (e.g., `user_profiles`)

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
- Node.js (specific version)
- Git
- IDE (VS Code recommended)
- Supabase CLI
- Docker (optional)

#### Recommended Extensions
- ESLint
- Prettier
- GitLens
- Supabase extension
- Database client (TablePlus, DBeaver)

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
