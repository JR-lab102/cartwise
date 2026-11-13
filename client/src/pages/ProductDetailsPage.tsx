import { useParams, useNavigate } from 'react-router-dom'
import { PRODUCTS } from '../data/mockData'
import { useApp } from '../context/AppContext'

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { toggleSavedProduct, isProductSaved, addToComparison } = useApp()

  const product = PRODUCTS.find(p => p.id === id)

  if (!product) {
    return (
      <div className="product-details-page">
        <h1>Product Not Found</h1>
        <button onClick={() => navigate('/')} className="back-button">
          Back to Search
        </button>
      </div>
    )
  }

  const isSaved = isProductSaved(product.id)

  const handleSaveToggle = () => {
    toggleSavedProduct(product)
  }

  const handleDiscoverAlternatives = () => {
    navigate(`/alternatives/${product.id}`)
  }

  const handleAddToComparison = () => {
    addToComparison(product)
    navigate('/comparison')
  }

  return (
    <div className="product-details-page">
      <button onClick={() => navigate('/')} className="back-button">
        ← Back to Search
      </button>

      <h1>Product Details</h1>

      <div className="product-details-container">
        <div className="product-image-section">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="product-detail-image"
          />
        </div>

        <div className="product-info-section">
          <h2>{product.name}</h2>
          <p className="product-brand-detail">{product.brand}</p>
          <p className="product-category-detail">{product.category}</p>

          {product.allergens.length > 0 && (
            <div className="allergen-section">
              <h3>Contains:</h3>
              <div className="allergen-badges">
                {product.allergens.map(allergen => (
                  <span key={allergen} className="allergen-badge warning">
                    {allergen}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="product-actions">
            <button
              onClick={handleSaveToggle}
              className={`save-button ${isSaved ? 'saved' : ''}`}
            >
              {isSaved ? '★ Saved' : '☆ Save'}
            </button>
            <button onClick={handleDiscoverAlternatives} className="discover-button">
              Discover Alternatives
            </button>
            <button onClick={handleAddToComparison} className="compare-button">
              Add to Comparison
            </button>
          </div>
        </div>
      </div>

      <div className="nutrition-section">
        <h2>Nutrition Facts</h2>
        <div className="nutrition-facts-panel">
          <div className="nutrition-row">
            <span className="nutrition-label">Calories</span>
            <span className="nutrition-value">{product.calories}</span>
          </div>
          <div className="nutrition-row">
            <span className="nutrition-label">Protein</span>
            <span className="nutrition-value">{product.proteinG}g</span>
          </div>
          <div className="nutrition-row">
            <span className="nutrition-label">Sugar</span>
            <span className="nutrition-value">{product.sugarG}g</span>
          </div>
          <div className="nutrition-row">
            <span className="nutrition-label">Fiber</span>
            <span className="nutrition-value">{product.fiberG}g</span>
          </div>
          <div className="nutrition-row">
            <span className="nutrition-label">Sodium</span>
            <span className="nutrition-value">{product.sodiumMg}mg</span>
          </div>
        </div>
      </div>

      <div className="ingredients-section">
        <h2>Ingredients</h2>
        <p className="ingredients-text">{product.ingredients}</p>
      </div>
    </div>
  )
}
