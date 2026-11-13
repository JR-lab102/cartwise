import { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { PRODUCTS } from '../data/mockData'
import { useApp } from '../context/AppContext'

export default function DiscoverAlternativesPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { preferences, addToComparison } = useApp()
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set())

  const currentProduct = PRODUCTS.find(p => p.id === id)

  // Find alternatives in same category, filtered by allergen exclusions
  const alternatives = useMemo(() => {
    if (!currentProduct) return []

    const excludedAllergens = preferences.excludedAllergens.map(a => a.toLowerCase())

    return PRODUCTS.filter(p => {
      // Same category
      if (p.category !== currentProduct.category) return false
      // Not the current product
      if (p.id === currentProduct.id) return false
      // Filter out products with excluded allergens
      if (excludedAllergens.length > 0) {
        const hasExcludedAllergen = p.allergens.some(allergen =>
          excludedAllergens.includes(allergen.toLowerCase())
        )
        if (hasExcludedAllergen) return false
      }
      return true
    })
  }, [currentProduct, preferences.excludedAllergens])

  if (!currentProduct) {
    return (
      <div className="alternatives-page">
        <h1>Product Not Found</h1>
        <button onClick={() => navigate('/')} className="back-button">
          Back to Search
        </button>
      </div>
    )
  }

  const toggleProductSelection = (productId: string) => {
    setSelectedProducts(prev => {
      const newSet = new Set(prev)
      if (newSet.has(productId)) {
        newSet.delete(productId)
      } else if (newSet.size < 5) {
        newSet.add(productId)
      }
      return newSet
    })
  }

  const handleAddSelectedToComparison = () => {
    selectedProducts.forEach(productId => {
      const product = PRODUCTS.find(p => p.id === productId)
      if (product) {
        addToComparison(product)
      }
    })
    navigate('/comparison')
  }

  const isSelected = (productId: string) => selectedProducts.has(productId)
  const canSelectMore = selectedProducts.size < 5

  return (
    <div className="alternatives-page">
      <button onClick={() => navigate(`/product/${id}`)} className="back-button">
        ← Back to Product Details
      </button>

      <h1>Discover Comparable Alternatives</h1>
      <p className="alternatives-subtitle">
        Showing alternatives to <strong>{currentProduct.name}</strong> in the same category
        {preferences.excludedAllergens.length > 0 && (
          <span> (excluding: {preferences.excludedAllergens.join(', ')})</span>
        )}
      </p>

      {alternatives.length === 0 ? (
        <div className="no-alternatives">
          <p>No comparable alternatives found.</p>
          <button onClick={() => navigate(`/product/${id}`)} className="back-button">
            Back to Product
          </button>
        </div>
      ) : (
        <>
          <div className="alternatives-list">
            {alternatives.map(product => (
              <div
                key={product.id}
                className={`alternative-card ${isSelected(product.id) ? 'selected' : ''}`}
                onClick={() => canSelectMore && toggleProductSelection(product.id)}
              >
                <div className="alternative-checkbox">
                  <input
                    type="checkbox"
                    checked={isSelected(product.id)}
                    onChange={() => toggleProductSelection(product.id)}
                    disabled={!canSelectMore && !isSelected(product.id)}
                  />
                </div>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="alternative-image"
                />
                <div className="alternative-info">
                  <h3>{product.name}</h3>
                  <p className="alternative-brand">{product.brand}</p>
                  <div className="alternative-nutrition">
                    <span>{product.calories} cal</span>
                    <span>{product.proteinG}g protein</span>
                    <span>{product.sugarG}g sugar</span>
                  </div>
                  {product.allergens.length > 0 && (
                    <div className="allergen-badges">
                      {product.allergens.map(a => (
                        <span key={a} className="allergen-badge">{a}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="comparison-actions">
            <p>
              Selected: {selectedProducts.size} / 5 products
              {selectedProducts.size === 5 && ' (maximum reached)'}
            </p>
            <button
              onClick={handleAddSelectedToComparison}
              disabled={selectedProducts.size === 0}
              className="compare-button"
            >
              Compare Selected ({selectedProducts.size})
            </button>
          </div>
        </>
      )}
    </div>
  )
}
