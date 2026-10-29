# Task List

## Core User Stories Engineering Tasks

### 1. Product Search

#### Task 1.1: Implement Search UI Component
**Associated Feature:** Product Search
**Acceptance Criteria:**
- [ ] Search input field displays on homepage and all pages
- [ ] Search field is prominent and easily accessible
- [ ] Placeholder text guides user input (e.g., "Search products...")
- [ ] Clear button appears when text is entered
- [ ] Loading spinner shows during search
- [ ] Search results display in a list format
- [ ] Each result shows product name, brand, and thumbnail
- [ ] Clicking a result navigates to product detail page
- [ ] Empty state displays when no results found
- [ ] Error state displays with retry option
- [ ] Responsive design works on mobile, tablet, and desktop
- [ ] Keyboard navigation supported (Enter to search, Arrow keys to navigate results)

#### Task 1.2: Implement Real-time Search Suggestions
**Associated Feature:** Product Search
**Acceptance Criteria:**
- [ ] Suggestions appear as user types (debounced after 300ms)
- [ ] Suggestions show product name and brand
- [ ] Maximum 5 suggestions displayed
- [ ] Clicking suggestion navigates to product detail
- [ ] Suggestions dismiss when clicking outside
- [ ] Keyboard navigation (Arrow keys, Enter, Escape)
- [ ] Loading state while fetching suggestions
- [ ] Empty state when no suggestions available

#### Task 1.3: Implement Search API Endpoint
**Associated Feature:** Product Search
**Acceptance Criteria:**
- [ ] GET /api/products endpoint accepts query parameter
- [ ] Returns array of matching products
- [ ] Supports partial string matching (case-insensitive)
- [ ] Limits results to 20 per page
- [ ] Returns product id, name, brand, and thumbnail
- [ ] Response time < 200ms
- [ ] Returns 400 for invalid query parameters
- [ ] Returns 500 for server errors
- [ ] Includes proper error messages
- [ ] API documented in OpenAPI/Swagger

#### Task 1.4: Implement Search Suggestions API Endpoint
**Associated Feature:** Product Search
**Acceptance Criteria:**
- [ ] GET /api/products/suggestions endpoint accepts query parameter
- [ ] Returns array of up to 5 product suggestions
- [ ] Returns product id, name, and brand only
- [ ] Response time < 100ms
- [ ] Debounced on server side if needed
- [ ] Returns empty array for no matches
- [ ] API documented in OpenAPI/Swagger

#### Task 1.5: Implement Database Search Indexing
**Associated Feature:** Product Search
**Acceptance Criteria:**
- [ ] Products table indexed on name column
- [ ] Products table indexed on brand column
- [ ] Full-text search configured for product names
- [ ] Search query optimized with appropriate SQL patterns
- [ ] Benchmark shows < 50ms query time for 10,000 products
- [ ] Migration script includes index creation

#### Task 1.6: Implement Recent Searches
**Associated Feature:** Product Search
**Acceptance Criteria:**
- [ ] Recent searches stored in localStorage
- [ ] Maximum 10 recent searches saved
- [ ] Recent searches display below search field on focus
- [ ] Clicking recent search executes search
- [ ] Clear all button removes all recent searches
- [ ] Duplicates not added to recent searches
- [ ] Persists across page refreshes
- [ ] Clear recent searches functionality works

---

### 2. Product Details (Nutrition & Ingredients)

#### Task 2.1: Create Product Detail Page Layout
**Associated Feature:** Product Details
**Acceptance Criteria:**
- [ ] Product detail page displays at /products/:id route
- [ ] Page includes product name, brand, and images
- [ ] Images support carousel/swipe on mobile
- [ ] Back button to return to search results
- [ ] Responsive layout for mobile, tablet, desktop
- [ ] Loading skeleton while data loads
- [ ] Error state with retry button
- [ ] 404 state for invalid product IDs

#### Task 2.2: Implement Nutrition Facts Display
**Associated Feature:** Product Details
**Acceptance Criteria:**
- [ ] Nutrition facts displayed in standardized format
- [ ] Shows serving size and servings per container
- [ ] Displays calories per serving
- [ ] Shows macronutrients: fat, carbs, protein (in grams)
- [ ] Shows micronutrients: fiber, sugar, sodium (in grams/mg)
- [ ] Shows vitamins and minerals (if available)
- [ ] Values displayed with % Daily Value where applicable
- [ ] Format matches FDA nutrition label style
- [ ] Responsive layout for mobile screens
- [ ] Empty state if nutrition data unavailable

#### Task 2.3: Implement Ingredients List Display
**Associated Feature:** Product Details
**Acceptance Criteria:**
- [ ] Full ingredient list displayed in scrollable section
- [ ] Ingredients listed in order of predominance
- [ ] Common allergens highlighted (peanuts, dairy, gluten, etc.)
- [ ] Additive information included if available
- [ ] Text is readable and properly formatted
- [ ] Copy to clipboard functionality
- [ ] Empty state if ingredient data unavailable

#### Task 2.4: Implement Product Detail API Endpoint
**Associated Feature:** Product Details
**Acceptance Criteria:**
- [ ] GET /api/products/:id endpoint returns full product data
- [ ] Returns product name, brand, description
- [ ] Returns array of image URLs
- [ ] Returns complete nutrition facts object
- [ ] Returns ingredients array
- [ ] Returns category and tags
- [ ] Returns serving size information
- [ ] Response time < 200ms
- [ ] Returns 404 for invalid product ID
- [ ] API documented in OpenAPI/Swagger

#### Task 2.5: Design Database Schema for Nutrition Data
**Associated Feature:** Product Details
**Acceptance Criteria:**
- [ ] Products table includes nutrition columns
- [ ] Nutrition data stored as JSONB or structured columns
- [ ] Includes calories, protein, carbs, fat, fiber, sugar, sodium
- [ ] Includes vitamins and minerals object
- [ ] Includes serving size information
- [ ] Ingredients stored as text or array
- [ ] Migration script creates schema
- [ ] Data validation constraints in place

---

### 3. Discover Alternatives

#### Task 3.1: Implement Alternative Products Section
**Associated Feature:** Discover Alternatives
**Acceptance Criteria:**
- [ ] "Similar Products" section on product detail page
- [ ] Displays 3-5 alternative products
- [ ] Each alternative shows name, brand, and thumbnail
- [ ] Clicking alternative navigates to its detail page
- [ ] Section positioned below product details
- [ ] Loading state while fetching alternatives
- [ ] Empty state if no alternatives found
- [ ] "View all alternatives" link if more available

#### Task 3.2: Implement Alternatives API Endpoint
**Associated Feature:** Discover Alternatives
**Acceptance Criteria:**
- [ ] GET /api/products/:id/alternatives endpoint
- [ ] Returns array of alternative products
- [ ] Alternatives based on similar nutrition profile
- [ ] Alternatives based on category similarity
- [ ] Alternatives based on ingredient similarity
- [ ] Returns 3-5 alternatives by default
- [ ] Supports limit query parameter
- [ ] Excludes original product from results
- [ ] Response time < 300ms
- [ ] API documented in OpenAPI/Swagger

#### Task 3.3: Implement Similarity Algorithm
**Associated Feature:** Discover Alternatives
**Acceptance Criteria:**
- [ ] Algorithm compares nutrition profiles
- [ ] Calculates similarity score (0-1)
- [ ] Weighted comparison of key nutrients
- [ ] Category matching increases similarity score
- [ ] Ingredient overlap increases similarity score
- [ ] Results sorted by similarity score
- [ ] Algorithm documented in code comments
- [ ] Unit tests for similarity calculation

#### Task 3.4: Implement Database Queries for Alternatives
**Associated Feature:** Discover Alternatives
**Acceptance Criteria:**
- [ ] Query finds products in same category
- [ ] Query filters by nutrition range (+/- 20%)
- [ ] Query sorts by similarity score
- [ ] Query optimized with indexes
- [ ] Query handles missing nutrition data
- [ ] Benchmark shows < 100ms query time

---

### 4. Select Priorities

#### Task 4.1: Create Priorities Configuration Page
**Associated Feature:** Select Priorities
**Acceptance Criteria:**
- [ ] Priorities page accessible from navigation
- [ ] Displays list of priority categories
- [ ] Each priority shows name and current rating
- [ ] Add new priority button available
- [ ] Edit priority button on each item
- [ ] Delete priority button on each item
- [ ] Drag-and-drop for reordering
- [ ] Save button to persist changes
- [ ] Cancel button to discard changes
- [ ] Responsive layout for mobile

#### Task 4.2: Implement Priority Creation Form
**Associated Feature:** Select Priorities
**Acceptance Criteria:**
- [ ] Modal or form for creating new priority
- [ ] Input field for priority name
- [ ] Dropdown for nutrition/ingredient criteria
- [ ] Initial rating defaults to 5
- [ ] Save button creates priority
- [ ] Cancel button closes form
- [ ] Validation: name required
- [ ] Validation: name max 50 characters
- [ ] Error messages displayed inline

#### Task 4.3: Implement Priority Editing Form
**Associated Feature:** Select Priorities
**Acceptance Criteria:**
- [ ] Modal or form for editing priority
- [ ] Editable priority name field
- [ ] Editable nutrition/ingredient criteria
- [ ] Save button updates priority
- [ ] Cancel button closes form
- [ ] Changes reflected immediately in list
- [ ] Validation same as creation
- [ ] Error messages displayed inline

#### Task 4.4: Implement Priority Deletion
**Associated Feature:** Select Priorities
**Acceptance Criteria:**
- [ ] Delete button shows confirmation dialog
- [ ] Confirmation dialog explains impact
- [ ] Confirm button removes priority
- [ ] Cancel button keeps priority
- [ ] List updates immediately after deletion
- [ ] Toast notification on successful deletion

#### Task 4.5: Implement Priorities API Endpoints
**Associated Feature:** Select Priorities
**Acceptance Criteria:**
- [ ] GET /api/priorities returns user's priorities
- [ ] POST /api/priorities creates new priority
- [ ] PUT /api/priorities/:id updates priority
- [ ] DELETE /api/priorities/:id deletes priority
- [ ] Returns priority object with id, name, criteria, rating, rank
- [ ] Response time < 200ms
- [ ] Validation errors return 400 with details
- [ ] API documented in OpenAPI/Swagger

#### Task 4.6: Design Database Schema for Priorities
**Associated Feature:** Select Priorities
**Acceptance Criteria:**
- [ ] Priorities table created
- [ ] Columns: id, user_id, name, criteria, rating, rank
- [ ] Foreign key to users table (nullable for anonymous)
- [ ] Unique constraint on (user_id, name)
- [ ] Index on user_id for fast lookup
- [ ] Migration script creates schema
- [ ] Row-level security configured

---

### 5. Priority Importance (0–10)

#### Task 5.1: Implement Rating Slider Component
**Associated Feature:** Priority Importance
**Acceptance Criteria:**
- [ ] Slider component for 0-10 rating
- [ ] Current value displayed next to slider
- [ ] Visual indicator of current value
- [ ] Smooth slider animation
- [ ] Touch-friendly on mobile
- [ ] Keyboard accessible (Arrow keys)
- [ ] Snap to integer values
- [ ] Default value displayed
- [ ] Real-time value update

#### Task 5.2: Integrate Rating into Priority Forms
**Associated Feature:** Priority Importance
**Acceptance Criteria:**
- [ ] Rating slider in priority creation form
- [ ] Rating slider in priority edit form
- [ ] Rating saved with priority
- [ ] Rating defaults to 5 for new priorities
- [ ] Rating persisted in database
- [ ] Rating displayed in priority list
- [ ] Rating updates reflected in comparisons

#### Task 5.3: Implement Rating-Based Scoring
**Associated Feature:** Priority Importance
**Acceptance Criteria:**
- [ ] Scoring algorithm uses rating as weight
- [ ] Higher rating = higher importance in scoring
- [ ] 0 rating excludes priority from scoring
- [ ] 10 rating gives maximum weight
- [ ] Linear or exponential weighting (documented choice)
- [ ] Score calculation documented
- [ ] Unit tests for scoring logic

#### Task 5.4: Update Database Schema for Rating
**Associated Feature:** Priority Importance
**Acceptance Criteria:**
- [ ] Priorities table includes rating column
- [ ] Rating column type: integer
- [ ] Rating defaults to 5
- [ ] Check constraint: rating between 0 and 10
- [ ] Migration adds column
- [ ] Existing data migrated with default value

---

### 6. Priority Ranking/Tie-breakers

#### Task 6.1: Implement Drag-and-Drop Reordering
**Associated Feature:** Priority Ranking
**Acceptance Criteria:**
- [ ] Drag handle on each priority item
- [ ] Visual feedback during drag
- [ ] Items reorder smoothly
- [ ] Touch support for mobile drag
- [ ] Drop zones clearly indicated
- [ ] New order persists after drop
- [ ] Save button required to persist
- [ ] Cancel reverts to saved order

#### Task 6.2: Implement Rank Display
**Associated Feature:** Priority Ranking
**Acceptance Criteria:**
- [ ] Rank number displayed on each priority
- [ ] Rank updates automatically on reorder
- [ ] Rank displayed prominently
- [ ] Rank used in tie-breaking logic
- [ ] Rank 1 = highest priority (tie-breaker)
- [ ] Rank increases down the list

#### Task 6.3: Implement Tie-Breaker Logic
**Associated Feature:** Priority Ranking
**Acceptance Criteria:**
- [ ] Comparison algorithm uses rank for tie-breaking
- [ ] When scores equal, higher rank wins
- [ ] Tie-breaker documented in algorithm
- [ ] Tie-breaker consistent across comparisons
- [ ] Unit tests for tie-breaking scenarios
- [ ] Edge cases handled (all same rank, single priority)

#### Task 6.4: Update Database Schema for Rank
**Associated Feature:** Priority Ranking
**Acceptance Criteria:**
- [ ] Priorities table includes rank column
- [ ] Rank column type: integer
- [ ] Rank defaults to creation order
- [ ] Rank unique per user
- [ ] Check constraint: rank > 0
- [ ] Migration adds column
- [ ] Existing data migrated with sequential ranks

#### Task 6.5: Implement Rank Update API
**Associated Feature:** Priority Ranking
**Acceptance Criteria:**
- [ ] PUT /api/priorities/reorder endpoint
- [ ] Accepts array of priority IDs in new order
- [ ] Updates ranks for all priorities
- [ ] Transaction ensures consistency
- [ ] Returns updated priorities
- [ ] Response time < 300ms
- [ ] Validation: all IDs belong to user
- [ ] API documented in OpenAPI/Swagger

---

### 7. Side-by-Side Comparison Table

#### Task 7.1: Create Comparison Page Layout
**Associated Feature:** Side-by-Side Comparison
**Acceptance Criteria:**
- [ ] Comparison page accessible from product detail
- [ ] Products displayed in horizontal cards
- [ ] Each product shows name, brand, image
- [ ] Scrollable horizontally on mobile
- [ ] "Add to comparison" button on product detail
- [ ] Comparison limit: 4 products max
- [ ] Remove button on each product in comparison
- [ ] "Compare" button to apply priorities
- [ ] Responsive layout for all screen sizes

#### Task 7.2: Implement Comparison Table Structure
**Associated Feature:** Side-by-Side Comparison
**Acceptance Criteria:**
- [ ] Table with rows for each comparison attribute
- [ ] Columns for each product
- [ ] Rows include: calories, protein, carbs, fat, sugar, sodium
- [ ] Rows include: key ingredients (top 5)
- [ ] Rows include: priority scores (if priorities applied)
- [ ] Header row with product names
- [ ] Scrollable if many attributes
- [ ] Sticky header on scroll
- [ ] Mobile-friendly table layout

#### Task 7.3: Implement Comparison Data Fetching
**Associated Feature:** Side-by-Side Comparison
**Acceptance Criteria:**
- [ ] Fetch nutrition data for all products
- [ ] Fetch ingredient data for all products
- [ ] Fetch priority scores if priorities applied
- [ ] Loading state for each product
- [ ] Error state for failed fetches
- [ ] Retry button for failed loads
- [ ] Data cached for session

#### Task 7.4: Implement Comparison API Endpoint
**Associated Feature:** Side-by-Side Comparison
**Acceptance Criteria:**
- [ ] POST /api/compare endpoint
- [ ] Accepts array of product IDs
- [ ] Accepts optional priority configuration ID
- [ ] Returns comparison data for all products
- [ ] Returns nutrition facts for each product
- [ ] Returns ingredients for each product
- [ ] Returns scores if priorities provided
- [ ] Response time < 500ms
- [ ] Validation: 1-4 products required
- [ ] API documented in OpenAPI/Swagger

#### Task 7.5: Implement Add to Comparison UI
**Associated Feature:** Side-by-Side Comparison
**Acceptance Criteria:**
- [ ] "Add to comparison" button on product detail
- [ ] Button shows current comparison count
- [ ] Toast notification on add
- [ ] Button disabled if 4 products already selected
- [ ] Button changes to "View comparison" when products added
- [ ] Quick comparison bar at bottom of screen
- [ ] Comparison badge shows count

#### Task 7.6: Implement Comparison State Management
**Associated Feature:** Side-by-Side Comparison
**Acceptance Criteria:**
- [ ] Comparison state stored in React context
- [ ] State persists across navigation
- [ ] State saved to localStorage
- [ ] State restored on page load
- [ ] Max 4 products enforced
- [ ] Duplicate products prevented
- [ ] Clear all button available
- [ ] Remove individual product functionality

---

### 8. Green Strengths Highlighting

#### Task 8.1: Implement Strength Identification Logic
**Associated Feature:** Green Strengths Highlighting
**Acceptance Criteria:**
- [ ] Algorithm identifies strengths per product
- [ ] Strength = product wins in attribute vs other products
- [ ] Compares based on user priorities if applied
- [ ] Compares all attributes if no priorities
- [ ] Highlights nutrition attributes (lower is better for some)
- [ ] Highlights ingredient attributes
- [ ] Logic documented in code
- [ ] Unit tests for strength identification

#### Task 8.2: Implement Green Highlight Styling
**Associated Feature:** Green Strengths Highlighting
**Acceptance Criteria:**
- [ ] Green background color for strength cells
- [ ] High contrast text color (white or dark)
- [ ] Subtle animation on highlight
- [ ] Highlight applied to entire cell
- [ ] Multiple strengths per product supported
- [ ] Highlight persists on scroll
- [ ] Hover effect on highlighted cells
- [ ] Accessibility: highlight announced to screen readers

#### Task 8.3: Integrate Highlights into Comparison Table
**Associated Feature:** Green Strengths Highlighting
**Acceptance Criteria:**
- [ ] Highlights applied when comparison renders
- [ ] Highlights update when priorities change
- [ ] Highlights recalculate on product add/remove
- [ ] Legend explains green highlighting
- [ ] Toggle to show/hide highlights
- [ ] Highlights work with dark mode
- [ ] Highlights work on mobile

#### Task 8.4: Implement Priority-Based Highlighting
**Associated Feature:** Green Strengths Highlighting
**Acceptance Criteria:**
- [ ] When priorities applied, highlights based on priorities
- [ ] Only attributes matching priorities highlighted
- [ ] Higher priority attributes more prominent
- [ ] Strength determined by priority score
- [ ] Fallback to all attributes if no priorities
- [ ] Clear visual distinction between priority levels

#### Task 8.5: Implement Highlight Legend
**Associated Feature:** Green Strengths Highlighting
**Acceptance Criteria:**
- [ ] Legend displayed above comparison table
- [ ] Explains green highlighting meaning
- [ ] Explains priority-based highlighting
- [ ] Dismissible legend
- [ ] Legend persists per session
- [ ] Legend accessible to screen readers

---

### 9. Save/Star Product

#### Task 9.1: Implement Star Button Component
**Associated Feature:** Save/Star Product
**Acceptance Criteria:**
- [ ] Star icon button on product detail page
- [ ] Star icon filled when saved
- [ ] Star icon outline when not saved
- [ ] Toggle animation on click
- [ ] Toast notification on save
- [ ] Toast notification on unsave
- [ ] Button accessible via keyboard
- [ ] ARIA label: "Save to favorites" / "Remove from favorites"

#### Task 9.2: Create Saved Products Page
**Associated Feature:** Save/Star Product
**Acceptance Criteria:**
- [ ] Saved products page accessible from navigation
- [ ] Displays grid of saved products
- [ ] Each product shows name, brand, thumbnail
- [ ] Clicking product navigates to detail page
- [ ] Star icon on each product (filled)
- [ ] Remove button on each product
- [ ] Empty state when no products saved
- [ ] Search/filter saved products
- [ ] Sort by date saved, name, or priority score

#### Task 9.3: Implement Saved Products API Endpoints
**Associated Feature:** Save/Star Product
**Acceptance Criteria:**
- [ ] GET /api/saved returns user's saved products
- [ ] POST /api/saved adds product to saved list
- [ ] DELETE /api/saved/:productId removes product
- [ ] Returns product details with saved timestamp
- [ ] Supports anonymous users (localStorage)
- [ ] Supports authenticated users (database)
- [ ] Response time < 200ms
- [ ] Returns 409 if already saved
- [ ] API documented in OpenAPI/Swagger

#### Task 9.4: Design Database Schema for Saved Products
**Associated Feature:** Save/Star Product
**Acceptance Criteria:**
- [ ] Saved_products table created
- [ ] Columns: id, user_id, product_id, saved_at
- [ ] Foreign key to users table (nullable)
- [ ] Foreign key to products table
- [ ] Unique constraint on (user_id, product_id)
- [ ] Index on user_id for fast lookup
- [ ] Index on product_id for reverse lookup
- [ ] Migration script creates schema
- [ ] Row-level security configured

#### Task 9.5: Implement LocalStorage Fallback for Anonymous Users
**Associated Feature:** Save/Star Product
**Acceptance Criteria:**
- [ ] Saved products stored in localStorage for anonymous users
- [ ] Syncs to database when user creates account
- [ ] Handles localStorage quota errors
- [ ] Persists across sessions
- [ ] Merges with existing database data on login
- [ ] Conflict resolution: database takes precedence
- [ ] Clear localStorage on logout

#### Task 9.6: Implement Custom Lists (Optional Enhancement)
**Associated Feature:** Save/Star Product
**Acceptance Criteria:**
- [ ] Create custom lists functionality
- [ ] Add saved product to custom list
- [ ] Rename custom list
- [ ] Delete custom list
- [ ] Share custom list (generate link)
- [ ] List count displayed in UI
- [ ] API endpoints for list CRUD
- [ ] Database schema for lists

---

## Project Setup & Infrastructure

### Frontend Setup
- [ ] Initialize React project with Vite
- [ ] Configure PWA manifest
- [ ] Set up service worker
- [ ] Configure routing (React Router)
- [ ] Install UI component library (Material UI or Tailwind)
- [ ] Configure state management (Context API/Redux)
- [ ] Set up ESLint and Prettier
- [ ] Configure environment variables

### Backend Setup
- [ ] Initialize Node.js project
- [ ] Install Express framework
- [ ] Configure server middleware
- [ ] Set up CORS
- [ ] Configure logging (Winston)
- [ ] Set up environment variables
- [ ] Configure Supabase client
- [ ] Set up API structure

### Database Setup
- [ ] Create Supabase project
- [ ] Configure database schema
- [ ] Create tables: products, priorities, saved_products, users
- [ ] Set up foreign keys and indexes
- [ ] Configure row-level security
- [ ] Create initial migration
- [ ] Seed sample product data
- [ ] Set up storage buckets for images

### Testing Setup
- [ ] Configure Jest for unit tests
- [ ] Configure React Testing Library
- [ ] Set up E2E testing (Playwright or Cypress)
- [ ] Configure API testing (Supertest)
- [ ] Set up test coverage reporting
- [ ] Create test data fixtures

### CI/CD Setup
- [ ] Configure GitHub Actions
- [ ] Set up automated testing on push
- [ ] Configure deployment pipeline
- [ ] Set up staging environment
- [ ] Configure production environment
- [ ] Set up automated backups

---

## Documentation

- [ ] Update README with new project details
- [ ] Document API endpoints (OpenAPI/Swagger)
- [ ] Document database schema
- [ ] Document priority algorithm
- [ ] Document comparison algorithm
- [ ] Create user guide
- [ ] Create developer setup guide
- [ ] Document deployment process
