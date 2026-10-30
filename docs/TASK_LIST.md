# Task List

## CartWise — Level 1 Task List

### Feature 1: Search

#### Task 1.1: Product Search by Name
**Associated Feature:** Search

**User Story:**
As a grocery shopper, I want to search for a product by its name so that I can quickly find a product I already have in mind. When I'm at the store or planning my shopping list, I often have specific products in mind that I want to compare with alternatives. Having a fast and accurate search function will help me find these products efficiently without browsing through endless categories.

**Description:**
Implement frontend search bar component and REST API endpoint to query products by name. The search should support partial matching and return relevant results quickly.

**Acceptance Criteria:**
- [ ] Search input field accepts text entry on home screen
- [ ] API endpoint returns product records matching text query
- [ ] Displays matching results in a list or an explicit "No products found" empty state
- [ ] Search supports partial string matching (case-insensitive)
- [ ] Results display product name, brand, and thumbnail
- [ ] Clicking a result navigates to product detail page
- [ ] Loading state shows while searching
- [ ] Error state displays with retry option

---

### Feature 2: Product Details

#### Task 2.1: View Nutrition Facts and Ingredients
**Associated Feature:** Product Details

**User Story:**
As a grocery shopper, I want to view a product's nutrition facts and ingredients so that I can understand its contents before comparing it with alternatives. I care about my health and dietary needs, so having access to complete nutritional information helps me make informed decisions about what I eat. When comparing products, I need to see the full picture of what each product contains to determine which better meets my health goals.

**Description:**
Build dedicated Product Details view rendering structured nutrition facts and ingredients in a clear, readable format that matches standard nutrition label layouts.

**Acceptance Criteria:**
- [ ] Selecting a search result opens the Product Details view
- [ ] Displays structured Nutrition Facts panel (calories, macronutrients, key vitamins)
- [ ] Displays complete ingredients list in readable text format
- [ ] Nutrition facts include serving size and servings per container
- [ ] Shows calories, protein, carbs, fat, fiber, sugar, sodium
- [ ] Ingredients listed in order of predominance
- [ ] Common allergens highlighted when present
- [ ] Responsive layout for mobile screens
- [ ] Empty state if nutrition or ingredient data unavailable

---

### Feature 3: Discover

#### Task 3.1: Discover Comparable Product Alternatives
**Associated Feature:** Discover

**User Story:**
As a grocery shopper, I want to discover comparable alternatives after searching for a product so that I can explore options that may better fit my needs. Sometimes the product I'm used to buying isn't the best choice for my health goals or budget. Being able to see similar products helps me discover better options that I might not have considered otherwise. This feature should help me find products in the same category with similar nutritional profiles so I can make informed comparisons.

**Description:**
Implement algorithm and database query to return similar/comparable products based on product category, nutritional profile, and ingredient similarity.

**Acceptance Criteria:**
- [ ] "Discover Alternatives" button present on Product Details screen
- [ ] Triggering action fetches comparable products sharing category attributes
- [ ] Renders a list of alternative candidate products ready for preference evaluation
- [ ] Alternatives based on similar nutritional profiles (+/- 20% range)
- [ ] Alternatives based on category matching
- [ ] Alternatives based on ingredient similarity
- [ ] Returns 3-5 alternatives by default
- [ ] Each alternative shows name, brand, and thumbnail
- [ ] Loading state while fetching alternatives
- [ ] Empty state if no alternatives found

---

### Feature 4: Apply Priorities

#### Task 4.1: Priority Factor Selection
**Associated Feature:** Apply Priorities

**User Story:**
As a grocery shopper, I want to choose which product factors matter to me so that CartWise evaluates alternatives using my preferences. Everyone has different health goals and dietary needs - some people prioritize low sugar, others focus on high protein, and some care about organic ingredients. By selecting my own priority factors, I can ensure that product comparisons are personalized to what matters most to me, rather than using a one-size-fits-all approach.

**Description:**
Create UI toggle list allowing users to select personal evaluation factors (e.g., low sugar, high protein, organic) from a predefined set of nutrition and ingredient attributes.

**Acceptance Criteria:**
- [ ] UI provides selectable list of priority factors
- [ ] User can check/uncheck individual factors
- [ ] Selected factors persist into evaluation state
- [ ] Priority factors include: calories, protein, carbs, fat, fiber, sugar, sodium, organic, gluten-free, vegan
- [ ] Factors displayed with clear labels and descriptions
- [ ] Selection state visually indicated (checkboxes or toggle switches)
- [ ] Selected factors saved to localStorage for anonymous users
- [ ] Selected factors saved to database for authenticated users

#### Task 4.2: Priority Importance Rating (0 to 10)
**Associated Feature:** Apply Priorities

**User Story:**
As a grocery shopper, I want to assign each selected priority an importance rating from 0 to 10 so that CartWise can reflect how strongly I value each factor. Not all my priorities are equally important - avoiding sugar might be critical for me (rating 10), while organic certification might be nice but not essential (rating 3). This nuanced weighting ensures that product comparisons reflect my actual preferences and help me identify products that truly align with my needs.

**Description:**
Attach numerical importance rating controls (0–10 scale) to every active priority factor, allowing users to specify how much each factor should influence product scoring.

**Acceptance Criteria:**
- [ ] Each selected factor displays an interactive slider or numeric input bounded from 0 to 10
- [ ] Input values strictly enforce integer bounds (0 minimum, 10 maximum)
- [ ] Rating values update product scoring logic dynamically
- [ ] Current rating value displayed next to input control
- [ ] Smooth slider animation and touch-friendly on mobile
- [ ] Keyboard accessible (Arrow keys for adjustment)
- [ ] Rating defaults to 5 for new priorities
- [ ] Rating persisted across sessions
- [ ] Rating of 0 excludes priority from scoring

#### Task 4.3: Priority Tie-Breaker Ranking
**Associated Feature:** Apply Priorities

**User Story:**
As a grocery shopper, I want to rank priorities when their importance ratings are tied so that CartWise can distinguish which factor matters more to me. Sometimes I assign the same rating to multiple priorities because they feel equally important, but when comparing products, one factor might still be more decisive in my decision. A tie-breaker ranking system allows me to specify this secondary level of preference, ensuring that comparisons break ties in a way that matches my thinking.

**Description:**
Implement tie-breaking ranking mechanism when two or more factors hold identical numerical ratings, using drag-and-drop or rank buttons to establish priority order.

**Acceptance Criteria:**
- [ ] System automatically detects tied importance rating values among selected factors
- [ ] UI displays explicit reordering controls (drag-and-drop or rank buttons) for tied items
- [ ] Secondary rank order resolves scoring ties during product evaluation
- [ ] Rank number displayed on each priority item
- [ ] Drag-and-drop reordering with visual feedback
- [ ] Touch support for mobile drag operations
- [ ] Rank 1 = highest priority (wins tie-breaker)
- [ ] Save button required to persist new ranking
- [ ] Cancel button reverts to saved order

---

### Feature 5: Side-by-Side Comparison & Table Results

#### Task 5.1: Side-by-Side Product Comparison Table
**Associated Feature:** Comparison

**User Story:**
As a grocery shopper, I want to compare selected products in a side-by-side table so that I can evaluate their attributes without switching between separate product pages. When I'm trying to decide between several products, it's frustrating to have to flip back and forth between different product pages to compare nutrition facts and ingredients. A side-by-side comparison table puts all the information I need in one place, making it easy to spot differences and make a quick decision.

**Description:**
Build responsive matrix component displaying target product alongside selected alternatives in parallel columns, with horizontal scrolling support for mobile devices.

**Acceptance Criteria:**
- [ ] Renders multi-column table displaying initial product alongside alternatives
- [ ] Rows align attributes horizontally (nutrition, ingredients, factor scores)
- [ ] Includes horizontal scrolling support for mobile viewports
- [ ] Comparison limit: 4 products maximum
- [ ] Header row with product names and images
- [ ] Rows include: calories, protein, carbs, fat, sugar, sodium
- [ ] Rows include: key ingredients (top 5)
- [ ] Rows include: priority scores (if priorities applied)
- [ ] Sticky header on scroll
- [ ] Remove button on each product in comparison
- [ ] Responsive layout for all screen sizes

#### Task 5.2: Highlight Priority Strengths in Green
**Associated Feature:** Discover Table Result

**User Story:**
As a grocery shopper, I want the comparison table to highlight where products best meet my priorities in green so that I can identify their strengths quickly. When comparing multiple products, there's a lot of data to process. Having visual highlights that show me which products excel in the areas I care about most makes it much easier to identify the best choice at a glance. This visual cue saves time and helps me make confident decisions without having to manually compare every number.

**Description:**
Create visual formatting engine that applies green background styling to table cells best meeting user priorities, with a legend explaining the highlighting criteria.

**Acceptance Criteria:**
- [ ] Scoring logic identifies top attribute values relative to user priorities
- [ ] Cells representing primary strengths are styled with green background highlighting
- [ ] Visual indicator/legend explains green highlighting criteria to user
- [ ] Highlights based on user priorities when applied
- [ ] Highlights on all attributes when no priorities set
- [ ] High contrast text color (white or dark) on green background
- [ ] Subtle animation on highlight
- [ ] Multiple strengths per product supported
- [ ] Highlight persists on scroll
- [ ] Toggle to show/hide highlights
- [ ] Accessibility: highlight announced to screen readers

---

### Feature 6: Save / Star Product

#### Task 6.1: Save and Star Product Action
**Associated Feature:** Save/Star Product

**User Story:**
As a grocery shopper, I want to save or star a product so that I can easily return to it later. I often find products that I want to remember for future shopping trips, whether it's something I want to try later or a product I want to compare against new options. Having a save/star feature lets me build a personal collection of products without having to search for them again, making my shopping experience more efficient and personalized.

**Description:**
Build star toggle action on product components and a dedicated Saved Products view that lists all currently starred items with options to organize them into custom lists.

**Acceptance Criteria:**
- [ ] Star/bookmark icon accessible on product cards and details screens
- [ ] Toggling star updates state and saves product reference
- [ ] Saved Products view lists all currently starred items
- [ ] Star icon filled when saved, outline when not saved
- [ ] Toggle animation on click
- [ ] Toast notification on save/unsave
- [ ] Saved products persist across sessions (localStorage for anonymous, database for authenticated)
- [ ] Organize saved products into custom lists
- [ ] Quick access to saved products from dashboard
- [ ] Remove individual saved products
- [ ] Clear all saved products option

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
