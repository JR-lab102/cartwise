import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ALLERGENS } from '../data/mockData'
import { useApp } from '../context/AppContext'
import { getProducts } from '../services/api'

export default function SearchPage() {
  const navigate = useNavigate()
  const { preferences } = useApp()
  const [searchQuery, setSearchQuery] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedAllergensLocal, setSelectedAllergensLocal] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      setError(null)
      try {
        const excludeAllergens = [
          ...preferences.excludedAllergens,
          ...selectedAllergensLocal
        ];
        const response = await getProducts({
          q: searchQuery || undefined,
          excludeAllergens: excludeAllergens.length > 0 ? excludeAllergens.join(',') : undefined
        });
        setProducts(response.data || []);
      } catch (err) {
        setError(err.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    // Debounce search
    const timeoutId = setTimeout(fetchProducts, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, preferences.excludedAllergens, selectedAllergensLocal]);

  const showRecommendations = showDropdown && searchQuery.trim().length > 0

  const handleSearch = (e) => {
    e.preventDefault()
    if (products.length > 0) {
      navigate(`/product/${products[0].id}`)
    }
  }

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`)
    setShowDropdown(false)
  }

  const toggleAllergen = (allergen) => {
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

          {loading && <div className="loading">Searching...</div>}
          {error && <div className="error">{error}</div>}

          {showRecommendations && !loading && (
            <div className="search-dropdown">
              {products.slice(0, 5).map(product => (
                <div
                  key={product.id}
                  className="dropdown-item"
                  onClick={() => handleProductClick(product)}
                >
                  <div className="dropdown-product-name">{product.name}</div>
                  <div className="dropdown-product-brand">{product.brand}</div>
                </div>
              ))}
              {products.length === 0 && (
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

      {searchQuery && products.length > 0 && !loading && (
        <div className="search-results">
          <h2>Search Results ({products.length})</h2>
          <div className="product-grid">
            {products.map(product => (
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
