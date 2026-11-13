import express from 'express';

const router = express.Router();

// In-memory storage for saved products (replace with database in production)
let savedProducts = [];

// GET /api/saved - Get all saved products for a session
router.get('/', async (req, res) => {
  try {
    const { session_key } = req.query;

    if (!session_key) {
      return res.status(400).json({
        success: false,
        error: 'session_key is required'
      });
    }

    const userSavedProducts = savedProducts.filter(sp => sp.session_key === session_key);

    res.json({
      success: true,
      data: userSavedProducts,
      count: userSavedProducts.length
    });
  } catch (error) {
    console.error('Error fetching saved products:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch saved products'
    });
  }
});

// POST /api/saved - Save a product
router.post('/', async (req, res) => {
  try {
    const { session_key, product_id } = req.body;

    if (!session_key) {
      return res.status(400).json({
        success: false,
        error: 'session_key is required'
      });
    }

    if (!product_id) {
      return res.status(400).json({
        success: false,
        error: 'product_id is required'
      });
    }

    // Check if already saved
    const existing = savedProducts.find(
      sp => sp.session_key === session_key && sp.product_id === product_id
    );

    if (existing) {
      return res.status(409).json({
        success: false,
        error: 'Product already saved'
      });
    }

    const savedProduct = {
      id: `saved-${Date.now()}`,
      session_key,
      product_id,
      created_at: new Date().toISOString()
    };

    savedProducts.push(savedProduct);

    res.status(201).json({
      success: true,
      data: savedProduct,
      message: 'Product saved successfully'
    });
  } catch (error) {
    console.error('Error saving product:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to save product'
    });
  }
});

// DELETE /api/saved/:product_id - Remove a saved product
router.delete('/:product_id', async (req, res) => {
  try {
    const { product_id } = req.params;
    const { session_key } = req.query;

    if (!session_key) {
      return res.status(400).json({
        success: false,
        error: 'session_key is required'
      });
    }

    const index = savedProducts.findIndex(
      sp => sp.session_key === session_key && sp.product_id === product_id
    );

    if (index === -1) {
      return res.status(404).json({
        success: false,
        error: 'Saved product not found'
      });
    }

    savedProducts.splice(index, 1);

    res.json({
      success: true,
      message: 'Product removed from saved'
    });
  } catch (error) {
    console.error('Error removing saved product:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to remove saved product'
    });
  }
});

export default router;
