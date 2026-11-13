import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import SearchPage from './pages/SearchPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import DiscoverAlternativesPage from './pages/DiscoverAlternativesPage'
import PrioritiesPage from './pages/PrioritiesPage'
import ComparisonPage from './pages/ComparisonPage'
import SavedProductsPage from './pages/SavedProductsPage'

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="app">
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="/alternatives/:id" element={<DiscoverAlternativesPage />} />
            <Route path="/priorities" element={<PrioritiesPage />} />
            <Route path="/comparison" element={<ComparisonPage />} />
            <Route path="/saved" element={<SavedProductsPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
