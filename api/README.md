# CartWise API

REST API for CartWise - a product search and comparison tool.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account (for database and authentication)

## Installation

1. **Install dependencies**
   ```bash
   cd api
   npm install
   ```

2. **Configure environment variables**

   Create a `.env` file in the `api/` directory based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

   Configure the following variables in `.env`:
   ```
   PORT=3000
   NODE_ENV=development
   DATABASE_URL=postgresql://user:password@localhost:5432/cartwise
   SUPABASE_URL=your-supabase-url
   SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
   JWT_SECRET=your-jwt-secret
   ```

   **Note:** If `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are not set, the API will use mock data as a fallback.

3. **Run the server**
   ```bash
   npm run dev
   ```

   The API will be available at `http://localhost:3000`

## API Endpoints

### Products

- `GET /api/products` - Search products by name, filter by allergens
  - Query params: `q` (search query), `excludeAllergens` (comma-separated list)
  - Returns: Array of matching products

- `GET /api/products/:id` - Get product details
  - Returns: Single product with full details
  - Returns `404` if not found, `400` for invalid ID format

- `GET /api/products/:id/alternatives` - Get comparable products
  - Query params: `excludeAllergens` (comma-separated list)
  - Returns: Array of alternative products in same category

### Saved Products

- `GET /api/saved` - Get saved products for a session
  - Query params: `session_key` (required)
  - Returns: Array of saved product references

- `POST /api/saved` - Save a product
  - Body: `{ "session_key": "...", "product_id": "..." }`
  - Returns `201` on success, `400` if missing fields, `409` if already saved

- `DELETE /api/saved/:product_id` - Remove a saved product
  - Query params: `session_key` (required)
  - Returns: Success message

### Preferences

- `GET /api/preferences` - Get user preferences
  - Returns: Priority factors and excluded allergens

- `PUT /api/preferences` - Update user preferences
  - Body: `{ "priority_factors": [...], "excluded_allergens": [...] }`
  - Returns: Updated preferences

## API Documentation

See `openapi.yaml` for complete API documentation with request/response schemas and examples.

## Development

```bash
# Run with auto-reload
npm run dev

# Run tests
npm test

# Run linter
npm run lint
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port (default: 3000) | No |
| `NODE_ENV` | Environment (development/production) | No |
| `DATABASE_URL` | PostgreSQL connection string | Yes* |
| `SUPABASE_URL` | Supabase project URL | Yes* |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | Yes* |
| `JWT_SECRET` | Secret for JWT tokens | Yes* |

*Required for production. If not set, API uses mock data.

## License

TBD
