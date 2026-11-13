import express from 'express';
import { supabase } from '../config/supabase.js';

const router = express.Router();

// Mock data fallback (used if Supabase is not configured)
const MOCK_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Oatly Oat Milk',
    brand: 'Oatly',
    category: 'Dairy Alternative',
    image_url: 'https://via.placeholder.com/300x300?text=Oatly+Oat+Milk',
    calories: 140,
    protein_g: 3.0,
    sugar_g: 7.0,
    fiber_g: 2.0,
    sodium_mg: 105,
    ingredients: 'Water, oats (10%), rapeseed oil, calcium, vitamin D2, vitamin B12, sea salt.',
    allergens: []
  },
  {
    id: 'prod-2',
    name: 'Silk Almond Milk',
    brand: 'Silk',
    category: 'Dairy Alternative',
    image_url: 'https://via.placeholder.com/300x300?text=Silk+Almond+Milk',
    calories: 60,
    protein_g: 1.0,
    sugar_g: 0.0,
    fiber_g: 1.0,
    sodium_mg: 170,
    ingredients: 'Almondmilk (filtered water, almonds), sea salt, gellan gum, locust bean gum, sunflower lecithin, natural flavor, vitamin A palmitate, vitamin D2, d-alpha-tocopherol (vitamin E).',
    allergens: ['tree nuts']
  },
  {
    id: 'prod-3',
    name: 'Nature Valley Protein Granola',
    brand: 'Nature Valley',
    category: 'Breakfast',
    image_url: 'https://via.placeholder.com/300x300?text=Nature+Valley+Protein',
    calories: 190,
    protein_g: 10.0,
    sugar_g: 6.0,
    fiber_g: 3.0,
    sodium_mg: 95,
    ingredients: 'Whole grain oats, sugar, soy protein isolate, palm oil, honey, crisp rice (rice flour, sugar, malt syrup, salt), almonds, sea salt, vitamin E (mixed tocopherols) added to preserve freshness.',
    allergens: ['soy', 'tree nuts']
  },
  {
    id: 'prod-4',
    name: 'Kashi GOLEAN Cereal',
    brand: 'Kashi',
    category: 'Breakfast',
    image_url: 'https://via.placeholder.com/300x300?text=Kashi+GOLEAN',
    calories: 140,
    protein_g: 13.0,
    sugar_g: 9.0,
    fiber_g: 10.0,
    sodium_mg: 125,
    ingredients: 'Whole grain rolled oats, whole grain wheat, soy protein crisps (soy protein isolate, rice flour), sugar, rice, honey, sea salt, molasses.',
    allergens: ['soy', 'wheat']
  },
  {
    id: 'prod-5',
    name: "Bob's Red Mill Gluten Free Oats",
    brand: "Bob's Red Mill",
    category: 'Grains',
    image_url: 'https://via.placeholder.com/300x300?text=Bob%27s+Red+Mill+Oats',
    calories: 150,
    protein_g: 5.0,
    sugar_g: 1.0,
    fiber_g: 4.0,
    sodium_mg: 0,
    ingredients: 'Gluten free whole grain rolled oats.',
    allergens: []
  }
];

// GET /api/products - Search products by name, filter by allergens
router.get('/', async (req, res) => {
  try {
    const { q, excludeAllergens } = req.query;
    const excludedAllergens = excludeAllergens
      ? excludeAllergens.split(',').map(a => a.trim().toLowerCase())
      : [];

    let products = MOCK_PRODUCTS;

    // Filter by search query
    if (q) {
      const query = q.toLowerCase();
      products = products.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );
    }

    // Filter by excluded allergens
    if (excludedAllergens.length > 0) {
      products = products.filter(p => {
        return !p.allergens.some(allergen =>
          excludedAllergens.includes(allergen.toLowerCase())
        );
      });
    }

    res.json({
      success: true,
      data: products,
      count: products.length
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch products'
    });
  }
});

// GET /api/products/:id - Get single product details
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validate UUID format (basic check)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id) && !id.startsWith('prod-')) {
      return res.status(400).json({
        success: false,
        error: 'Invalid product ID format'
      });
    }

    const product = MOCK_PRODUCTS.find(p => p.id === id);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch product'
    });
  }
});

// GET /api/products/:id/alternatives - Get comparable products
router.get('/:id/alternatives', async (req, res) => {
  try {
    const { id } = req.params;
    const { excludeAllergens } = req.query;

    const excludedAllergens = excludeAllergens
      ? excludeAllergens.split(',').map(a => a.trim().toLowerCase())
      : [];

    const currentProduct = MOCK_PRODUCTS.find(p => p.id === id);

    if (!currentProduct) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    // Find alternatives in same category, excluding current product
    let alternatives = MOCK_PRODUCTS.filter(p => {
      if (p.id === id) return false;
      if (p.category !== currentProduct.category) return false;

      // Filter by excluded allergens
      if (excludedAllergens.length > 0) {
        const hasExcludedAllergen = p.allergens.some(allergen =>
          excludedAllergens.includes(allergen.toLowerCase())
        );
        if (hasExcludedAllergen) return false;
      }

      return true;
    });

    // Limit to 5 alternatives
    alternatives = alternatives.slice(0, 5);

    res.json({
      success: true,
      data: alternatives,
      count: alternatives.length
    });
  } catch (error) {
    console.error('Error fetching alternatives:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch alternatives'
    });
  }
});

export default router;
