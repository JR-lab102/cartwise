import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { getSavedProducts, getProduct, unsaveProduct } from '../services/api'

export default function SavedProductsPage() {
  const navigate = useNavigate()
  const { toggleSavedProduct } = useApp()
  const [savedProducts, setSavedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const sessionKey = 'session_anon_001' // In production, get from auth

  useEffect(() => {
    const fetchSavedProducts = async () => {
      setLoading(true)
      setError(null)
      try {
        // Get saved product IDs
        const savedResponse = await getSavedProducts(sessionKey)
        const savedIds = savedResponse.data.map(sp => sp.product_id)

        // Fetch full product details for each saved product
        const productPromises = savedIds.map(id => getProduct(id))
        const productResponses = await Promise.all(productPromises)
        setSavedProducts(productResponses.map(r => r.data))
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchSavedProducts()
  }, [])

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`)
  }

  const handleRemove = async (e, productId) => {
    e.stopPropagation()
    try {
      await unsaveProduct(sessionKey, productId)
      setSavedProducts(prev => prev.filter(p => p.id !== productId))
      const product = savedProducts.find(p => p.id === productId)
      if (product) {
        toggleSavedProduct(product)
      }
    } catch (err) {
      console.error('Error removing saved product:', err)
    }
  }

  if (loading) {
    return (
      <div className="saved-products-page">
        <div className="loading">Loading saved products...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="saved-products-page">
        <h1>Saved Products</h1>
        <div className="error">{error}</div>
        <button onClick={() => navigate('/')} className="back-button">
          Back to Search
        </button>
      </div>
    )
  }

  return (
    <div className="saved-products-page">
      <button onClick={() => navigate('/')} className="back-button">
        ← Back to Search
      </button>

      <h1>Saved Products</h1>
      <p className="saved-subtitle">
        {savedProducts.length} product{savedProducts.length !== 1 ? 's' : ''} saved
      </p>

      {savedProducts.length === 0 ? (
        <div className="no-saved-products">
          <p>No saved products yet.</p>
          <p>Star products you want to save for later!</p>
          <button onClick={() => navigate('/')} className="back-button">
            Back to Search
          </button>
        </div>
      ) : (
        <div className="saved-products-grid">
          {savedProducts.map(product => (
            <div
              key={product.id}
              className="saved-product-card"
              onClick={() => handleProductClick(product.id)}
            >
              <div className="saved-product-header">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="saved-product-image"
                />
                <button
                  onClick={(e) => handleRemove(e, product.id)}
                  className="remove-saved-button"
                  title="Remove from saved"
                >
                  ×
                </button>
              </div>
              <div className="saved-product-info">
                <h3>{product.name}</h3>
                <p className="saved-product-brand">{product.brand}</p>
                <p className="saved-product-category">{product.category}</p>
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
      )}
    </div>
  )
}
