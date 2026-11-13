-- CartWise Specification 2.0 — Seed Data
-- PostgreSQL DML script (02_seed.sql)
-- Run after 01_schema.sql on a fresh database; no manual edits required.
-- Idempotent: safe to run multiple times.

BEGIN;

-- ─────────────────────────────────────────────────────────────
-- Products (5 realistic grocery items)
-- Uses WHERE NOT EXISTS to prevent duplicates on re-run.
-- ─────────────────────────────────────────────────────────────
INSERT INTO products (
  name, brand, category, image_url,
  calories, protein_g, sugar_g, fiber_g, sodium_mg,
  ingredients, allergens
)
SELECT * FROM (VALUES
  (
    'Oatly Oat Milk', 'Oatly', 'Dairy Alternative', 'https://example.com/oatly-oat-milk.png',
    140, 3.0, 7.0, 2.0, 105,
    'Water, oats (10%), rapeseed oil, calcium, vitamin D2, vitamin B12, sea salt.',
    ARRAY[]::text[]
  ),
  (
    'Silk Almond Milk', 'Silk', 'Dairy Alternative', 'https://example.com/silk-almond-milk.png',
    60, 1.0, 0.0, 1.0, 170,
    'Almondmilk (filtered water, almonds), sea salt, gellan gum, locust bean gum, sunflower lecithin, natural flavor, vitamin A palmitate, vitamin D2, d-alpha-tocopherol (vitamin E).',
    ARRAY['tree nuts']::text[]
  ),
  (
    'Nature Valley Protein Granola', 'Nature Valley', 'Breakfast', 'https://example.com/nature-valley-protein.png',
    190, 10.0, 6.0, 3.0, 95,
    'Whole grain oats, sugar, soy protein isolate, palm oil, honey, crisp rice (rice flour, sugar, malt syrup, salt), almonds, sea salt, vitamin E (mixed tocopherols) added to preserve freshness.',
    ARRAY['soy', 'tree nuts']::text[]
  ),
  (
    'Kashi GOLEAN Cereal', 'Kashi', 'Breakfast', 'https://example.com/kashi-golean.png',
    140, 13.0, 9.0, 10.0, 125,
    'Whole grain rolled oats, whole grain wheat, soy protein crisps (soy protein isolate, rice flour), sugar, rice, honey, sea salt, molasses.',
    ARRAY['soy', 'wheat']::text[]
  ),
  (
    'Bob''s Red Mill Gluten Free Oats', 'Bob''s Red Mill', 'Grains', 'https://example.com/bobs-red-mill-oats.png',
    150, 5.0, 1.0, 4.0, 0,
    'Gluten free whole grain rolled oats.',
    ARRAY[]::text[]
  )
) AS v(name, brand, category, image_url, calories, protein_g, sugar_g, fiber_g, sodium_mg, ingredients, allergens)
WHERE NOT EXISTS (
  SELECT 1 FROM products p WHERE p.name = v.name AND p.brand = v.brand
);

-- ─────────────────────────────────────────────────────────────
-- User Preferences (3 sessions)
-- Uses ON CONFLICT on session_key unique index.
-- ─────────────────────────────────────────────────────────────
INSERT INTO user_preferences (
  session_key, priority_factors, excluded_allergens
) VALUES
(
  'session_anon_001',
  '[
    {"factor": "high_protein", "importance": 9, "rank": 1},
    {"factor": "low_sugar", "importance": 8, "rank": 2},
    {"factor": "gluten_free", "importance": 6, "rank": 3}
  ]'::jsonb,
  ARRAY['gluten', 'soy']::text[]
),
(
  'session_anon_002',
  '[
    {"factor": "low_sodium", "importance": 7, "rank": 1},
    {"factor": "high_fiber", "importance": 7, "rank": 2},
    {"factor": "organic", "importance": 5, "rank": 3}
  ]'::jsonb,
  ARRAY['tree nuts']::text[]
),
(
  'session_anon_003',
  '[
    {"factor": "low_calories", "importance": 8, "rank": 1},
    {"factor": "dairy_free", "importance": 10, "rank": 2},
    {"factor": "vegan", "importance": 9, "rank": 3}
  ]'::jsonb,
  ARRAY['dairy', 'tree nuts']::text[]
)
ON CONFLICT (session_key) DO NOTHING;

-- ─────────────────────────────────────────────────────────────
-- Saved Products (3 products tied to 3 different sessions)
-- Uses subqueries to resolve product IDs by name for safety.
-- ON CONFLICT on (session_key, product_id) unique constraint.
-- ─────────────────────────────────────────────────────────────
INSERT INTO saved_products (session_key, product_id)
SELECT 'session_anon_001', id FROM products WHERE name = 'Oatly Oat Milk'
ON CONFLICT (session_key, product_id) DO NOTHING;

INSERT INTO saved_products (session_key, product_id)
SELECT 'session_anon_002', id FROM products WHERE name = 'Kashi GOLEAN Cereal'
ON CONFLICT (session_key, product_id) DO NOTHING;

INSERT INTO saved_products (session_key, product_id)
SELECT 'session_anon_003', id FROM products WHERE name = 'Bob''s Red Mill Gluten Free Oats'
ON CONFLICT (session_key, product_id) DO NOTHING;

COMMIT;
