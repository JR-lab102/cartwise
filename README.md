# Berry Buddy

A mobile-first Progressive Web Application (PWA) for searching, discovering, and comparing products based on personalized user priorities.

## Description

Berry Buddy empowers users to make informed product decisions by providing detailed nutrition facts, ingredient lists, and intelligent comparison tools. Users can set personalized priorities (0–10 rating with tie-breaker ranking) to quickly identify products that best match their health and dietary needs.

### Key Features

- **Product Search**: Search products by name with real-time suggestions
- **Product Details**: View comprehensive nutrition facts and full ingredient lists
- **Discover Alternatives**: Find comparable products based on nutritional profiles
- **Personalized Priorities**: Set custom priorities with 0–10 ratings and tie-breaker rankings
- **Side-by-Side Comparison**: Compare multiple products with visual strength indicators
- **Save/Star Products**: Save favorite products for quick access

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git
- Supabase account (for database and authentication)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/JR-lab102/cartwise.git
   cd cartwise
   ```

2. **Install dependencies**

   Frontend (Client):
   ```bash
   cd client
   npm install
   ```

   Backend (API):
   ```bash
   cd ../api
   npm install
   ```

3. **Set up environment variables**

   Create `.env` files in both `client/` and `api/` directories based on the provided `.env.example` files:
   ```bash
   cp client/.env.example client/.env
   cp api/.env.example api/.env
   ```

   Configure the following variables:
   - `VITE_API_URL`: Backend API URL
   - `SUPABASE_URL`: Your Supabase project URL
   - `SUPABASE_ANON_KEY`: Your Supabase anonymous key
   - `DATABASE_URL`: PostgreSQL connection string
   - `JWT_SECRET`: Secret for JWT token generation

4. **Set up Supabase**

   - Create a new Supabase project at [supabase.com](https://supabase.com)
   - Run the migration scripts in the `supabase/` directory
   - Configure row-level security policies
   - Set up storage buckets for product images

5. **Run the development servers**

   Frontend:
   ```bash
   cd client
   npm run dev
   ```

   Backend:
   ```bash
   cd api
   npm run dev
   ```

   The frontend will be available at `http://localhost:5173` and the backend at `http://localhost:3000`.

## Project Structure

```
Berry Buddy/
├── client/              # React PWA frontend application
│   ├── src/            # Source code
│   ├── public/         # Static assets
│   └── package.json    # Frontend dependencies
├── api/                # Node.js/Express REST API
│   ├── src/            # API source code
│   ├── routes/         # API route handlers
│   └── package.json    # Backend dependencies
├── supabase/           # Supabase configuration and migrations
│   ├── migrations/     # Database migration files
│   ├── functions/      # Database functions
│   └── seed.sql        # Sample data seeding
├── docs/               # Project documentation
│   ├── README.md       # Documentation overview
│   ├── PRD.md          # Product Requirements Document
│   ├── TASK_LIST.md    # Detailed engineering task list
│   └── WORKSPACE_RULES.md  # Team workflow and coding standards
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

### Directory Explanations

- **`/client`**: Contains the React Progressive Web Application built with Vite. Includes all UI components, state management, PWA configuration, and client-side logic.

- **`/api`**: Contains the Node.js/Express REST API. Includes route handlers, middleware, authentication logic, and database integration.

- **`/supabase`**: Contains Supabase-specific configuration, database migration scripts, SQL functions, and seed data for setting up the PostgreSQL database.

- **`/docs`**: Contains all project documentation including requirements, task breakdowns, workflow rules, and technical specifications.

## Tech Stack

### Frontend
- **Framework**: React 18+
- **Build Tool**: Vite
- **Type**: Progressive Web Application (PWA)
- **State Management**: React Context API / Redux (as needed)
- **UI Components**: Material UI or Tailwind CSS
- **Styling**: CSS Modules or Tailwind CSS
- **Testing**: React Testing Library, Jest, Playwright

### Backend
- **Runtime**: Node.js (v18+)
- **Framework**: Express
- **API Type**: REST
- **Authentication**: JWT (optional, for account features)
- **Validation**: Joi or Zod
- **Testing**: Jest, Supertest

### Database
- **Database**: Supabase (PostgreSQL)
- **ORM**: Prisma or Supabase Client
- **Features**: Real-time subscriptions, Row-level security, Storage

### Infrastructure
- **Frontend Hosting**: Vercel or Netlify
- **Backend Hosting**: Render, Railway, or Vercel Functions
- **CI/CD**: GitHub Actions
- **Monitoring**: Sentry (errors), Analytics (usage)

## Documentation

For detailed project information, refer to the documentation in the `/docs` directory:

- **[README.md](docs/README.md)** - Documentation overview and quick links
- **[PRD.md](docs/PRD.md)** - Product Requirements Document with feature specifications, technical architecture, and timeline
- **[TASK_LIST.md](docs/TASK_LIST.md)** - Detailed engineering task breakdown for all 9 core user stories with acceptance criteria
- **[WORKSPACE_RULES.md](docs/WORKSPACE_RULES.md)** - Team workflow guidelines, branching strategy, naming conventions, and coding standards

## Development Workflow

See [WORKSPACE_RULES.md](docs/WORKSPACE_RULES.md) for detailed guidelines on:
- Branching strategy (`main`, `develop`, `feature/<feature-name>`)
- Commit message format (Conventional Commits)
- Naming conventions (camelCase, PascalCase, kebab-case)
- Pull request process and code review requirements

## Contributing

1. Create a feature branch from `develop`
2. Make your changes following the workspace rules
3. Write tests for new features
4. Create a pull request to `develop`
5. Ensure at least one team member reviews and approves
6. Merge after approval

## License

TBD

## Support

For questions or issues, please refer to the project documentation or contact the development team.
