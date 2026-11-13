import { createContext, useContext, useState } from 'react'

const AppContext = createContext()

export function AppProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [selectedAllergens] = useState([])
  const [currentProduct, setCurrentProduct] = useState(null)
  const [savedProducts, setSavedProducts] = useState([])
  const [comparisonProducts, setComparisonProducts] = useState([])
  const [preferences, setPreferences] = useState({
    priorityFactors: [],
    excludedAllergens: []
  })

  const navigateToProduct = (product) => {
    setCurrentProduct(product)
  }

  const addToComparison = (product) => {
    setComparisonProducts(prev => {
      if (prev.length >= 5) return prev
      if (prev.find(p => p.id === product.id)) return prev
      return [...prev, product]
    })
  }

  const removeFromComparison = (productId) => {
    setComparisonProducts(prev => prev.filter(p => p.id !== productId))
  }

  const clearComparison = () => {
    setComparisonProducts([])
  }

  const toggleSavedProduct = (product) => {
    setSavedProducts(prev => {
      const exists = prev.find(p => p.id === product.id)
      if (exists) {
        return prev.filter(p => p.id !== product.id)
      }
      return [...prev, product]
    })
  }

  const isProductSaved = (productId) => {
    return savedProducts.some(p => p.id === productId)
  }

  return (
    <AppContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        searchResults,
        setSearchResults,
        selectedAllergens,
        currentProduct,
        setCurrentProduct,
        savedProducts,
        setSavedProducts,
        comparisonProducts,
        setComparisonProducts,
        preferences,
        setPreferences,
        navigateToProduct,
        addToComparison,
        removeFromComparison,
        clearComparison,
        toggleSavedProduct,
        isProductSaved
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}
