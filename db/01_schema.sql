-- CartWise Specification 2.0 — Database Schema
-- PostgreSQL DDL script (01_schema.sql)
-- Run on a fresh database; no manual edits required.

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─────────────────────────────────────────────────────────────
-- products
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name            TEXT NOT NULL,
  brand           TEXT,
  category        TEXT,
  image_url       TEXT,
  calories        INTEGER CHECK (calories IS NULL OR calories >= 0),
  protein_g       NUMERIC(8,2) CHECK (protein_g IS NULL OR protein_g >= 0),
  sugar_g         NUMERIC(8,2) CHECK (sugar_g IS NULL OR sugar_g >= 0),
  fiber_g         NUMERIC(8,2) CHECK (fiber_g IS NULL OR fiber_g >= 0),
  sodium_mg       NUMERIC(8,2) CHECK (sodium_mg IS NULL OR sodium_mg >= 0),
  ingredients     TEXT,
  allergens       TEXT[],
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────
-- user_preferences
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS user_preferences (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_key         TEXT NOT NULL,
  priority_factors    JSONB NOT NULL DEFAULT '[]'::jsonb,
  excluded_allergens  TEXT[],
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT chk_priority_factors_is_array
    CHECK (jsonb_typeof(priority_factors) = 'array'),

  CONSTRAINT chk_priority_factors_schema
    CHECK (
      -- Ensure every element has required keys with valid types
      NOT EXISTS (
        SELECT 1
        FROM jsonb_array_elements(priority_factors) AS elem
        WHERE NOT (
          elem ? 'factor'
          AND elem ? 'importance'
          AND elem ? 'rank'
          AND jsonb_typeof(elem -> 'factor') = 'string'
          AND jsonb_typeof(elem -> 'importance') = 'number'
          AND jsonb_typeof(elem -> 'rank') = 'number'
        )
      )
    ),

  CONSTRAINT chk_priority_factors_rating_range
    CHECK (
      -- Ensure importance ratings are integers between 1 and 10
      NOT EXISTS (
        SELECT 1
        FROM jsonb_array_elements(priority_factors) AS elem
        WHERE (elem ->> 'importance')::numeric NOT BETWEEN 1 AND 10
           OR (elem ->> 'importance')::numeric <> floor((elem ->> 'importance')::numeric)
      )
    ),

  CONSTRAINT chk_priority_factors_rank_positive
    CHECK (
      -- Ensure ranks are positive integers
      NOT EXISTS (
        SELECT 1
        FROM jsonb_array_elements(priority_factors) AS elem
        WHERE (elem ->> 'rank')::numeric <= 0
           OR (elem ->> 'rank')::numeric <> floor((elem ->> 'rank')::numeric)
      )
    )
);

-- One preference row per session
CREATE UNIQUE INDEX IF NOT EXISTS idx_user_preferences_session_key
  ON user_preferences(session_key);

-- ─────────────────────────────────────────────────────────────
-- saved_products
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS saved_products (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_key  TEXT NOT NULL,
  product_id   UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT uq_saved_products_session_product
    UNIQUE (session_key, product_id)
);

-- Helpful lookup indexes
CREATE INDEX IF NOT EXISTS idx_saved_products_session_key
  ON saved_products(session_key);

CREATE INDEX IF NOT EXISTS idx_products_category
  ON products(category);

CREATE INDEX IF NOT EXISTS idx_products_name
  ON products(name);
