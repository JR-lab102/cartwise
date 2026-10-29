# Product Requirements Document (PRD)

## Project Overview

**Project Name:** Cartwise
**Version:** 1.0
**Status:** Draft
**Last Updated:** 2026-10-28

## Introduction

Cartwise is a mobile-first Progressive Web Application (PWA) designed to help users search, discover, and compare products based on personalized user priorities. The app focuses on empowering users to make informed decisions by providing detailed product information, nutrition facts, ingredients, and intelligent comparison tools.

## Objectives

### Primary Goals

1. Enable users to search and discover products by name
2. Provide comprehensive product information including nutrition facts and ingredients
3. Help users discover comparable alternatives to products
4. Allow users to apply personalized priorities (0–10 rating and tie-breaker ranking)
5. Facilitate side-by-side product comparisons with visual strength indicators
6. Enable users to save/star favorite products for quick access

### Success Metrics

- User engagement and retention rates
- Search success rate and relevance
- Comparison tool usage frequency
- Saved product count per user
- User satisfaction scores

## Functional Requirements

### In-Scope Features

#### Product Search & Discovery
- Search products by name with real-time suggestions
- View detailed product information including:
  - Nutrition facts (calories, macronutrients, micronutrients)
  - Full ingredient list
  - Product images
  - Brand and category information
- Discover comparable alternatives based on:
  - Similar nutritional profiles
  - Ingredient similarity
  - Category matching

#### Personalized Priorities
- Create and manage custom priority categories (e.g., "Low Sugar", "High Protein", "Organic")
- Assign 0–10 rating to each priority category
- Set tie-breaker ranking order for priorities
- Apply priorities to product searches and comparisons
- Save priority configurations for future use

#### Product Comparison
- Side-by-side comparison table for multiple products
- Green highlight indicators for product strengths based on user priorities
- Visual comparison of:
  - Nutritional values
  - Ingredient lists
  - Priority scores
  - Price (if available)
- Quick add/remove products from comparison
- Share comparison results

#### Saved Products
- Star/save favorite products for quick access
- Organize saved products into custom lists
- Quick access to saved products from dashboard
- Sync saved products across devices

#### User Account (Optional)
- Anonymous usage supported
- Optional account creation for data persistence
- Save priority configurations across sessions
- Sync saved products across devices

### Explicitly Out-of-Scope

#### Store-Based Features
- Store-specific price comparison
- Store availability or inventory tracking
- Store location and hours
- In-store product mapping

#### Price-Related Features
- Real-time price tracking
- Price alerts and notifications
- Discount and coupon management
- Price history charts

#### E-Commerce Features
- Shopping cart functionality
- Checkout and payment processing
- Order management
- Shipping and delivery
- Order history and tracking

## Non-Functional Requirements

### Performance
- Page load time < 2 seconds
- API response time < 200ms
- Support for 10,000+ concurrent users

### Security
- HTTPS/TLS encryption
- Secure authentication (JWT, OAuth) for optional accounts
- Data encryption at rest
- API rate limiting
- Input validation and sanitization

### Scalability
- Horizontal scaling capability
- Load balancing support
- Database sharding readiness

### Availability
- 99.9% uptime target
- Disaster recovery plan
- Automated backups

## Technical Stack

### Frontend
- Framework: React
- Build Tool: Vite
- Application Type: Progressive Web Application (PWA)
- State Management: React Context API / Redux (as needed)
- UI Components: Material UI or Tailwind CSS
- PWA Features: Service Worker, Offline Support, Installable

### Backend
- Runtime: Node.js
- Framework: Express
- API Type: REST
- Authentication: JWT (optional, for account features)

### Database
- Primary: Supabase (PostgreSQL)
- ORM: Prisma or Supabase Client
- Features: Real-time subscriptions, Row-level security

### Infrastructure
- Frontend Hosting: Vercel or Netlify
- Backend Hosting: Render, Railway, or Vercel Functions
- CI/CD: GitHub Actions
- Monitoring: TBD (Sentry for errors, Analytics for usage)

## API Requirements

### Authentication Endpoints (Optional)
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/logout
- POST /api/auth/forgot-password
- POST /api/auth/reset-password

### Product Endpoints
- GET /api/products - Search products by name
- GET /api/products/:id - Get product details with nutrition and ingredients
- GET /api/products/:id/alternatives - Get comparable alternatives
- GET /api/products/similar - Find similar products based on parameters

### Priority Endpoints
- GET /api/priorities - Get user's priority configurations
- POST /api/priorities - Create new priority configuration
- PUT /api/priorities/:id - Update priority configuration
- DELETE /api/priorities/:id - Delete priority configuration

### Comparison Endpoints
- POST /api/compare - Compare multiple products with priorities applied
- GET /api/compare/:sessionId - Retrieve previous comparison

### Saved Products Endpoints
- GET /api/saved - Get user's saved products
- POST /api/saved - Add product to saved list
- DELETE /api/saved/:productId - Remove product from saved list
- GET /api/saved/lists - Get custom saved product lists
- POST /api/saved/lists - Create custom list
- PUT /api/saved/lists/:id - Update custom list
- DELETE /api/saved/lists/:id - Delete custom list

### Admin Endpoints (For Product Data Management)
- POST /api/products (admin) - Add new product
- PUT /api/products/:id (admin) - Update product
- DELETE /api/products/:id (admin) - Delete product
- POST /api/products/bulk (admin) - Bulk upload products

## User Interface Requirements

### Design Principles
- Mobile-first responsive design (PWA-optimized)
- Accessibility compliance (WCAG 2.1 AA)
- Consistent branding and visual identity
- Intuitive navigation
- Fast loading and offline support
- Touch-friendly interface

### Key Screens
- **Search Screen**: Search bar with real-time suggestions, recent searches
- **Product Detail Screen**: Nutrition facts, ingredients, images, alternative suggestions
- **Comparison Screen**: Side-by-side comparison table with green highlights for strengths
- **Priorities Configuration Screen**: 0–10 rating sliders, tie-breaker drag-and-drop ordering
- **Saved Products Screen**: Starred products, custom lists organization
- **Dashboard Screen**: Quick access to search, saved products, and priorities
- **Admin Dashboard** (internal): Product data management, bulk uploads

## Data Requirements

### User Data (Optional)
- Personal information (name, email)
- Priority configurations
- Saved products
- Custom product lists
- Recent searches

### Product Data
- Name, brand, description
- Nutrition facts (calories, protein, carbs, fat, fiber, sugar, sodium, vitamins, minerals)
- Full ingredient list
- Category and subcategory
- Product images
- Serving size information
- Barcode/UPC (if available)
- Tags (organic, gluten-free, vegan, etc.)

### Priority Configuration Data
- Priority category name
- Rating (0–10)
- Tie-breaker rank
- Associated nutrition/ingredient criteria
- User association

### Comparison Data
- Product IDs being compared
- Applied priority configuration
- Computed scores
- Timestamp

## Compliance & Legal

- GDPR compliance for EU users
- CCPA compliance for California users
- Terms of Service
- Privacy Policy
- Cookie Policy

## Future Enhancements

### Phase 2 Features
- Barcode scanning for quick product lookup
- Product recommendations based on saved items
- Advanced search filters (dietary restrictions, allergens)
- Social sharing of comparisons
- User-submitted reviews and ratings
- Integration with nutrition APIs for automatic data import

### Phase 3 Features
- Native mobile applications (iOS, Android)
- Store integration for local inventory
- Price comparison from multiple retailers
- Meal planning and recipe integration
- Community features and forums
- Advanced analytics dashboard

## Risks & Mitigation

### Technical Risks
- Platform downtime mitigation
- Data backup and recovery
- PWA compatibility across devices
- Product data accuracy and completeness

### Business Risks
- Market competition from nutrition apps
- User acquisition and retention
- Product data sourcing and maintenance
- Data provider partnerships

## Timeline

### MVP Release
- **Target:** Q1 2027
- **Scope:**
  - Product search and discovery
  - Nutrition facts and ingredients display
  - Basic alternative product suggestions
  - Simple priority configuration
  - Side-by-side comparison
  - Save/star products

### Version 1.0
- **Target:** Q2 2027
- **Scope:**
  - Advanced priority customization
  - Enhanced comparison algorithms
  - Offline PWA functionality
  - User accounts and data sync
  - Custom saved product lists
  - Optimized performance

## Approval

- [ ] Product Manager
- [ ] Technical Lead
- [ ] Design Lead
- [ ] Stakeholders
