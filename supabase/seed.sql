-- Seed data for Cartwise
-- This file contains sample product data for testing

-- Insert sample products
INSERT INTO products (name, brand, category, nutrition_facts, ingredients, serving_size) VALUES
('Organic Whole Milk', 'Organic Valley', 'Dairy',
 '{"calories": 150, "protein": 8, "carbs": 12, "fat": 8, "fiber": 0, "sugar": 12, "sodium": 120}',
 'Organic grade A milk, vitamin D3',
 '1 cup (240ml)'),
('Greek Yogurt', 'Chobani', 'Dairy',
 '{"calories": 100, "protein": 17, "carbs": 6, "fat": 0, "fiber": 0, "sugar": 4, "sodium": 60}',
 'Grade A pasteurized nonfat milk, live active cultures',
 '1 cup (227g)'),
('Almond Milk', 'Silk', 'Dairy Alternative',
 '{"calories": 30, "protein": 1, "carbs": 1, "fat": 2.5, "fiber": 0, "sugar": 0, "sodium": 180}',
 'Almondmilk (filtered water, almonds), sea salt, locust bean gum, sunflower lecithin, gellan gum, natural flavor, vitamin A palmitate, vitamin D2, d-alpha-tocopherol (vitamin E)',
 '1 cup (240ml)'),
('Whole Wheat Bread', 'Nature\'s Own', 'Bakery',
 '{"calories": 70, "protein": 3, "carbs": 13, "fat": 1, "fiber": 2, "sugar": 2, "sodium": 130}',
 'Whole wheat flour, water, yeast, wheat gluten, salt, molasses, soybean oil',
 '1 slice (28g)'),
('Oatmeal', 'Quaker', 'Grains',
 '{"calories": 150, "protein": 5, "carbs": 27, "fat": 3, "fiber": 4, "sugar": 1, "sodium": 0}',
 '100% whole grain rolled oats',
 '1/2 cup dry (40g)');
