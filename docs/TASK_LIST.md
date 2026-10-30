# Task List

## CartWise — Level 1 Task List

### Feature 1: Search

#### Task 1.1: Product Search by Name
**Associated Feature:** Search
**User Story:** As a grocery shopper, I want to search for a product by its name so that I can quickly find a product I already have in mind.
**Description:** Implement frontend search bar component and REST API endpoint to query products by name.
**Acceptance Criteria:**
- [ ] Search input field accepts text entry on home screen.
- [ ] API endpoint returns product records matching text query.
- [ ] Displays matching results in a list or an explicit "No products found" empty state.

---

### Feature 2: Product Details

#### Task 2.1: View Nutrition Facts and Ingredients
**Associated Feature:** Product Details
**User Story:** As a grocery shopper, I want to view a product's nutrition facts and ingredients so that I can understand its contents before comparing it with alternatives.
**Description:** Build dedicated Product Details view rendering structured nutrition facts and ingredients.
**Acceptance Criteria:**
- [ ] Selecting a search result opens the Product Details view.
- [ ] Displays structured Nutrition Facts panel (calories, macronutrients, key vitamins).
- [ ] Displays complete ingredients list in readable text format.

---

### Feature 3: Discover

#### Task 3.1: Discover Comparable Product Alternatives
**Associated Feature:** Discover
**User Story:** As a grocery shopper, I want to discover comparable alternatives after searching for a product so that I can explore options that may better fit my needs.
**Description:** Implement algorithm and database query to return similar/comparable products based on product category.
**Acceptance Criteria:**
- [ ] "Discover Alternatives" button present on Product Details screen.
- [ ] Triggering action fetches comparable products sharing category attributes.
- [ ] Renders a list of alternative candidate products ready for preference evaluation.

---

### Feature 4: Apply Priorities

#### Task 4.1: Priority Factor Selection
**Associated Feature:** Apply Priorities
**User Story:** As a grocery shopper, I want to choose which product factors matter to me so that CartWise evaluates alternatives using my preferences.
**Description:** Create UI toggle list allowing users to select personal evaluation factors (e.g., low sugar, high protein, organic).
**Acceptance Criteria:**
- [ ] UI provides selectable list of priority factors.
- [ ] User can check/uncheck individual factors.
- [ ] Selected factors persist into evaluation state.

#### Task 4.2: Priority Importance Rating (0 to 10)
**Associated Feature:** Apply Priorities
**User Story:** As a grocery shopper, I want to assign each selected priority an importance rating from 0 to 10 so that CartWise can reflect how strongly I value each factor.
**Description:** Attach numerical importance rating controls (0–10 scale) to every active priority factor.
**Acceptance Criteria:**
- [ ] Each selected factor displays an interactive slider or numeric input bounded from 0 to 10.
- [ ] Input values strictly enforce integer bounds (0 minimum, 10 maximum).
- [ ] Rating values update product scoring logic dynamically.

#### Task 4.3: Priority Tie-Breaker Ranking
**Associated Feature:** Apply Priorities
**User Story:** As a grocery shopper, I want to rank priorities when their importance ratings are tied so that CartWise can distinguish which factor matters more to me.
**Description:** Implement tie-breaking ranking mechanism when two or more factors hold identical numerical ratings.
**Acceptance Criteria:**
- [ ] System automatically detects tied importance rating values among selected factors.
- [ ] UI displays explicit reordering controls (drag-and-drop or rank buttons) for tied items.
- [ ] Secondary rank order resolves scoring ties during product evaluation.

---

### Feature 5: Side-by-Side Comparison & Table Results

#### Task 5.1: Side-by-Side Product Comparison Table
**Associated Feature:** Comparison
**User Story:** As a grocery shopper, I want to compare selected products in a side-by-side table so that I can evaluate their attributes without switching between separate product pages.
**Description:** Build responsive matrix component displaying target product alongside selected alternatives in parallel columns.
**Acceptance Criteria:**
- [ ] Renders multi-column table displaying initial product alongside alternatives.
- [ ] Rows align attributes horizontally (nutrition, ingredients, factor scores).
- [ ] Includes horizontal scrolling support for mobile viewports.

#### Task 5.2: Highlight Priority Strengths in Green
**Associated Feature:** Discover Table Result
**User Story:** As a grocery shopper, I want the comparison table to highlight where products best meet my priorities in green so that I can identify their strengths quickly.
**Description:** Create visual formatting engine that applies green background styling to table cells best meeting user priorities.
**Acceptance Criteria:**
- [ ] Scoring logic identifies top attribute values relative to user priorities.
- [ ] Cells representing primary strengths are styled with green background highlighting.
- [ ] Visual indicator/legend explains green highlighting criteria to user.

---

### Feature 6: Save / Star Product

#### Task 6.1: Save and Star Product Action
**Associated Feature:** Save/Star Product
**User Story:** As a grocery shopper, I want to save or star a product so that I can easily return to it later.
**Description:** Build star toggle action on product components and a dedicated Saved Products view.
**Acceptance Criteria:**
- [ ] Star/bookmark icon accessible on product cards and details screens.
- [ ] Toggling star updates state and saves product reference.
- [ ] Saved Products view lists all currently starred items.

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
