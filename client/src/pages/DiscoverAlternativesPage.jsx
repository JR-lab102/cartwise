import { useState, useEffect, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { getProduct, getProductAlternatives } from '../services/api'

export default function DiscoverAlternativesPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { preferences, addToComparison } = useApp()
  const [currentProduct, setCurrentProduct] = useState(null)
  const [alternatives, setAlternatives] = useState([])
  const [selectedProducts, setSelectedProducts] = useState(new Set())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        // Fetch current product
        const productResponse = await getProduct(id)
        setCurrentProduct(productResponse.data)

        // Fetch alternatives
        const alternativesResponse = await getProductAlternatives(
          id,
          preferences.excludedAllergens
        );
        setAlternatives(alternativesResponse.data || []);
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchData()
    }
  }, [id, preferences.excludedAllergens])

  if (loading) {
    return (
      <div className="alternatives-page">
        <div className="loading">Loading alternatives...</div>
      </div>
    )
  }

  if (error || !currentProduct) {
    return (
      <div className="alternatives-page">
        <h1>Product Not Found</h1>
        <p>{error || 'The requested product could not be found.'}</p>
        <button onClick={() => navigate('/')} className="back-button">
          Back to Search
        </button>
      </div>
    )
  }

  const toggleProductSelection = (productId) => {
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
      const product = alternatives.find(p => p.id === productId)
      if (product) {
        addToComparison(product)
      }
    })
    navigate('/comparison')
  }

  const isSelected = (productId) => selectedProducts.has(productId)
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
