import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function SavedProductsPage() {
  const navigate = useNavigate()
  const { savedProducts, toggleSavedProduct } = useApp()

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`)
  }

  const handleRemove = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation()
    const product = savedProducts.find(p => p.id === productId)
    if (product) {
      toggleSavedProduct(product)
    }
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
