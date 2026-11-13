import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { PRODUCTS, ALLERGENS, Product } from '../data/mockData'
import { useApp } from '../context/AppContext'

export default function SearchPage() {
  const navigate = useNavigate()
  const { preferences } = useApp()
  const [searchQuery, setSearchQuery] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedAllergensLocal, setSelectedAllergensLocal] = useState<string[]>([])

  // Filter products based on search query and allergen exclusions
  const filteredProducts = useMemo(() => {
    let results = PRODUCTS

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      results = results.filter(
        p =>
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      )
    }

    // Filter by excluded allergens
    const excludedAllergens = [...preferences.excludedAllergens, ...selectedAllergensLocal]
    if (excludedAllergens.length > 0) {
      results = results.filter(p => {
        return !p.allergens.some(allergen =>
          excludedAllergens.includes(allergen.toLowerCase())
        )
      })
    }

    return results
  }, [searchQuery, preferences.excludedAllergens, selectedAllergensLocal])

  // Show dropdown with recommendations when typing
  const showRecommendations = showDropdown && searchQuery.trim().length > 0

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (filteredProducts.length > 0) {
      navigate(`/product/${filteredProducts[0].id}`)
    }
  }

  const handleProductClick = (product: Product) => {
    navigate(`/product/${product.id}`)
    setShowDropdown(false)
  }

  const toggleAllergen = (allergen: string) => {
    setSelectedAllergensLocal(prev =>
      prev.includes(allergen)
        ? prev.filter(a => a !== allergen)
        : [...prev, allergen]
    )
  }

  return (
    <div className="search-page">
      <h1>CartWise — Product Search</h1>

      <div className="search-container">
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-wrapper">
            <input
              type="text"
              placeholder="Search products by name..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setShowDropdown(true)
              }}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
              className="search-input"
            />
            <button type="submit" className="search-button">
              Search
            </button>
          </div>

          {showRecommendations && (
            <div className="search-dropdown">
              {filteredProducts.slice(0, 5).map(product => (
                <div
                  key={product.id}
                  className="dropdown-item"
                  onClick={() => handleProductClick(product)}
                >
                  <div className="dropdown-product-name">{product.name}</div>
                  <div className="dropdown-product-brand">{product.brand}</div>
                </div>
              ))}
              {filteredProducts.length === 0 && (
                <div className="dropdown-empty">No products found</div>
              )}
            </div>
          )}
        </form>
      </div>

      <div className="allergen-filters">
        <h3>Quick Allergen Filters</h3>
        <div className="allergen-checkboxes">
          {ALLERGENS.map(allergen => (
            <label key={allergen} className="allergen-checkbox">
              <input
                type="checkbox"
                checked={selectedAllergensLocal.includes(allergen)}
                onChange={() => toggleAllergen(allergen)}
              />
              <span>{allergen}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="quick-links">
        <button
          onClick={() => navigate('/saved')}
          className="nav-link-button"
        >
          Saved Products
        </button>
        <button
          onClick={() => navigate('/priorities')}
          className="nav-link-button"
        >
          Set Priorities
        </button>
      </div>

      {searchQuery && filteredProducts.length > 0 && (
        <div className="search-results">
          <h2>Search Results ({filteredProducts.length})</h2>
          <div className="product-grid">
            {filteredProducts.map(product => (
              <div
                key={product.id}
                className="product-card"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="product-image"
                />
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="product-brand">{product.brand}</p>
                  <p className="product-category">{product.category}</p>
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
        </div>
      )}
    </div>
  )
}
