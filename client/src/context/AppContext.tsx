import { createContext, useContext, useState, ReactNode } from 'react'
import { Product, UserPreferences } from '../data/mockData'

interface AppState {
  // Search state
  searchQuery: string
  searchResults: Product[]
  selectedAllergens: string[]

  // Product state
  currentProduct: Product | null
  savedProducts: Product[]
  comparisonProducts: Product[]

  // Preferences state
  preferences: UserPreferences
  setPreferences: (prefs: UserPreferences) => void

  // Navigation
  navigateToProduct: (product: Product) => void
  addToComparison: (product: Product) => void
  removeFromComparison: (productId: string) => void
  clearComparison: () => void
  toggleSavedProduct: (product: Product) => void
  isProductSaved: (productId: string) => boolean
}

const AppContext = createContext<AppState | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [searchQuery] = useState('')
  const [searchResults] = useState<Product[]>([])
  const [selectedAllergens] = useState<string[]>([])
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null)
  const [savedProducts, setSavedProducts] = useState<Product[]>([])
  const [comparisonProducts, setComparisonProducts] = useState<Product[]>([])
  const [preferences, setPreferences] = useState<UserPreferences>({
    priorityFactors: [],
    excludedAllergens: []
  })

  const navigateToProduct = (product: Product) => {
    setCurrentProduct(product)
    // Navigation will be handled by React Router in components
  }

  const addToComparison = (product: Product) => {
    setComparisonProducts(prev => {
      if (prev.length >= 5) return prev
      if (prev.find(p => p.id === product.id)) return prev
      return [...prev, product]
    })
  }

  const removeFromComparison = (productId: string) => {
    setComparisonProducts(prev => prev.filter(p => p.id !== productId))
  }

  const clearComparison = () => {
    setComparisonProducts([])
  }

  const toggleSavedProduct = (product: Product) => {
    setSavedProducts(prev => {
      const exists = prev.find(p => p.id === product.id)
      if (exists) {
        return prev.filter(p => p.id !== product.id)
      }
      return [...prev, product]
    })
  }

  const isProductSaved = (productId: string) => {
    return savedProducts.some(p => p.id === productId)
  }

  return (
    <AppContext.Provider
      value={{
        searchQuery,
        searchResults,
        selectedAllergens,
        currentProduct,
        savedProducts,
        comparisonProducts,
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
