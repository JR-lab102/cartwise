-- Initial Schema Migration for Cartwise
-- This migration creates the core tables for the application

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (for optional authentication)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  brand VARCHAR(255),
  description TEXT,
  category VARCHAR(100),
  nutrition_facts JSONB,
  ingredients TEXT,
  serving_size VARCHAR(100),
  image_url TEXT,
  barcode VARCHAR(50),
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Priorities table
CREATE TABLE IF NOT EXISTS priorities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  criteria JSONB NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating >= 0 AND rating <= 10),
  rank INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, name)
);

-- Saved products table
CREATE TABLE IF NOT EXISTS saved_products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  list_name VARCHAR(100) DEFAULT 'default',
  saved_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id, list_name)
);

-- Create indexes for performance
CREATE INDEX idx_products_name ON products(name);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_priorities_user_id ON priorities(user_id);
CREATE INDEX idx_saved_products_user_id ON saved_products(user_id);
CREATE INDEX idx_saved_products_product_id ON saved_products(product_id);

-- Row Level Security (RLS) policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE priorities ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_products ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Priorities policies
CREATE POLICY "Users can view own priorities" ON priorities
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own priorities" ON priorities
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own priorities" ON priorities
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own priorities" ON priorities
  FOR DELETE USING (auth.uid() = user_id);

-- Saved products policies
CREATE POLICY "Users can view own saved products" ON saved_products
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own saved products" ON saved_products
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own saved products" ON saved_products
  FOR DELETE USING (auth.uid() = user_id);

-- Products are public (no RLS needed)
