import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext.jsx'
import SearchPage from './pages/SearchPage.jsx'
import ProductDetailsPage from './pages/ProductDetailsPage.jsx'
import DiscoverAlternativesPage from './pages/DiscoverAlternativesPage.jsx'
import PrioritiesPage from './pages/PrioritiesPage.jsx'
import ComparisonPage from './pages/ComparisonPage.jsx'
import SavedProductsPage from './pages/SavedProductsPage.jsx'

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
