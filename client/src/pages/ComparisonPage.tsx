import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Product } from '../data/mockData'
import { useApp } from '../context/AppContext'

export default function ComparisonPage() {
  const navigate = useNavigate()
  const { comparisonProducts, preferences, removeFromComparison, clearComparison } = useApp()

  // Calculate scores based on priorities
  const scoredProducts = useMemo(() => {
    return comparisonProducts.map(product => {
      let totalScore = 0
      let maxPossibleScore = 0

      preferences.priorityFactors.forEach(pf => {
        const weight = pf.importance / 10 // Normalize to 0-1
        maxPossibleScore += weight

        let value = 0
        switch (pf.factor) {
          case 'high_protein':
            value = product.proteinG / 20 // Normalize (assuming 20g is high)
            break
          case 'low_sugar':
            value = 1 - (product.sugarG / 20) // Inverse (lower is better)
            break
          case 'low_calories':
            value = 1 - (product.calories / 300) // Inverse
            break
          case 'high_fiber':
            value = product.fiberG / 10 // Normalize
            break
          case 'low_sodium':
            value = 1 - (product.sodiumMg / 300) // Inverse
            break
          case 'gluten_free':
            value = product.allergens.includes('gluten') ? 0 : 1
            break
          case 'dairy_free':
            value = product.allergens.includes('dairy') ? 0 : 1
            break
          case 'vegan':
            value = product.allergens.some(a => ['dairy', 'eggs'].includes(a)) ? 0 : 1
            break
          case 'organic':
            value = product.brand.toLowerCase().includes('organic') ? 1 : 0.5
            break
          case 'nut_free':
            value = product.allergens.some(a => ['peanuts', 'tree nuts'].includes(a)) ? 0 : 1
            break
          default:
            value = 0.5
        }

        totalScore += value * weight
      })

      const normalizedScore = maxPossibleScore > 0 ? totalScore / maxPossibleScore : 0
      return { ...product, score: normalizedScore }
    })
  }, [comparisonProducts, preferences.priorityFactors])

  // Find best values for highlighting
  const bestValues = useMemo(() => {
    if (scoredProducts.length === 0) return {}

    const attrs = ['calories', 'proteinG', 'sugarG', 'fiberG', 'sodiumMg'] as const
    const best: Record<string, number> = {}

    attrs.forEach(attr => {
      const values = scoredProducts.map(p => p[attr])
      // For calories, sugar, sodium: lower is better
      // For protein, fiber: higher is better
      if (['calories', 'sugarG', 'sodiumMg'].includes(attr)) {
        best[attr] = Math.min(...values)
      } else {
        best[attr] = Math.max(...values)
      }
    })

    return best
  }, [scoredProducts])

  const isBestValue = (_product: Product & { score: number }, attr: string, value: number) => {
    const best = bestValues[attr as keyof typeof bestValues]
    if (best === undefined) return false

    // For lower-is-better attributes
    if (['calories', 'sugarG', 'sodiumMg'].includes(attr)) {
      return value === best
    }
    // For higher-is-better attributes
    return value === best
  }

  if (comparisonProducts.length === 0) {
    return (
      <div className="comparison-page">
        <h1>Side-by-Side Product Comparison</h1>
        <div className="no-comparison">
          <p>No products selected for comparison.</p>
          <button onClick={() => navigate('/')} className="back-button">
            Back to Search
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="comparison-page">
      <button onClick={() => navigate('/')} className="back-button">
        ← Back to Search
      </button>

      <h1>Side-by-Side Product Comparison</h1>
      <p className="comparison-subtitle">
        Comparing {comparisonProducts.length} product{comparisonProducts.length !== 1 ? 's' : ''}
        {preferences.priorityFactors.length > 0 && ' with your priorities applied'}
      </p>

      <div className="comparison-table-container">
        <table className="comparison-table">
          <thead>
            <tr>
              <th className="attribute-column">Attribute</th>
              {scoredProducts.map(product => (
                <th key={product.id} className="product-column">
                  <div className="product-header">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="comparison-product-image"
                    />
                    <div className="product-header-info">
                      <h3>{product.name}</h3>
                      <p>{product.brand}</p>
                      {preferences.priorityFactors.length > 0 && (
                        <div className="score-badge">
                          Score: {(product.score * 100).toFixed(0)}%
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => removeFromComparison(product.id)}
                      className="remove-product-button"
                      title="Remove from comparison"
                    >
                      ×
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="attribute-label">Calories</td>
              {scoredProducts.map(product => (
                <td
                  key={product.id}
                  className={isBestValue(product, 'calories', product.calories) ? 'highlight-green' : ''}
                >
                  {product.calories}
                </td>
              ))}
            </tr>
            <tr>
              <td className="attribute-label">Protein (g)</td>
              {scoredProducts.map(product => (
                <td
                  key={product.id}
                  className={isBestValue(product, 'proteinG', product.proteinG) ? 'highlight-green' : ''}
                >
                  {product.proteinG}
                </td>
              ))}
            </tr>
            <tr>
              <td className="attribute-label">Sugar (g)</td>
              {scoredProducts.map(product => (
                <td
                  key={product.id}
                  className={isBestValue(product, 'sugarG', product.sugarG) ? 'highlight-green' : ''}
                >
                  {product.sugarG}
                </td>
              ))}
            </tr>
            <tr>
              <td className="attribute-label">Fiber (g)</td>
              {scoredProducts.map(product => (
                <td
                  key={product.id}
                  className={isBestValue(product, 'fiberG', product.fiberG) ? 'highlight-green' : ''}
                >
                  {product.fiberG}
                </td>
              ))}
            </tr>
            <tr>
              <td className="attribute-label">Sodium (mg)</td>
              {scoredProducts.map(product => (
                <td
                  key={product.id}
                  className={isBestValue(product, 'sodiumMg', product.sodiumMg) ? 'highlight-green' : ''}
                >
                  {product.sodiumMg}
                </td>
              ))}
            </tr>
            <tr>
              <td className="attribute-label">Allergens</td>
              {scoredProducts.map(product => (
                <td key={product.id}>
                  {product.allergens.length > 0 ? (
                    <div className="allergen-badges">
                      {product.allergens.map(a => (
                        <span key={a} className="allergen-badge">{a}</span>
                      ))}
                    </div>
                  ) : (
                    <span className="no-allergens">None</span>
                  )}
                </td>
              ))}
            </tr>
            <tr>
              <td className="attribute-label">Category</td>
              {scoredProducts.map(product => (
                <td key={product.id}>{product.category}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="comparison-legend">
        <p>
          <span className="highlight-green-sample">Green highlight</span> indicates the best value
          for that attribute among compared products.
        </p>
      </div>

      <div className="comparison-actions">
        <button onClick={clearComparison} className="clear-button">
          Clear All
        </button>
        <button onClick={() => navigate('/')} className="back-button">
          Back to Search
        </button>
      </div>
    </div>
  )
}
