import express from 'express';

const router = express.Router();

// In-memory storage for user preferences (replace with database in production)
let userPreferences = {
  priority_factors: [],
  excluded_allergens: []
};

// GET /api/preferences - Get user preferences
router.get('/', async (req, res) => {
  try {
    res.json({
      success: true,
      data: userPreferences
    });
  } catch (error) {
    console.error('Error fetching preferences:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch preferences'
    });
  }
});

// PUT /api/preferences - Update user preferences
router.put('/', async (req, res) => {
  try {
    const { priority_factors, excluded_allergens } = req.body;

    // Validate priority_factors structure
    if (priority_factors) {
      if (!Array.isArray(priority_factors)) {
        return res.status(400).json({
          success: false,
          error: 'priority_factors must be an array'
        });
      }

      // Validate each priority factor
      for (const pf of priority_factors) {
        if (!pf.factor || typeof pf.factor !== 'string') {
          return res.status(400).json({
            success: false,
            error: 'Each priority factor must have a factor name (string)'
          });
        }
        if (pf.importance === undefined || pf.importance < 1 || pf.importance > 10) {
          return res.status(400).json({
            success: false,
            error: 'Each priority factor importance must be between 1 and 10'
          });
        }
        if (pf.rank === undefined || pf.rank < 1) {
          return res.status(400).json({
            success: false,
            error: 'Each priority factor rank must be a positive integer'
          });
        }
      }
    }

    // Validate excluded_allergens
    if (excluded_allergens && !Array.isArray(excluded_allergens)) {
      return res.status(400).json({
        success: false,
        error: 'excluded_allergens must be an array'
      });
    }

    // Update preferences
    userPreferences = {
      priority_factors: priority_factors || userPreferences.priority_factors,
      excluded_allergens: excluded_allergens || userPreferences.excluded_allergens
    };

    res.json({
      success: true,
      data: userPreferences,
      message: 'Preferences updated successfully'
    });
  } catch (error) {
    console.error('Error updating preferences:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update preferences'
    });
  }
});

export default router;
