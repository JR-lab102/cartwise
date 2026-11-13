import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { PRIORITY_FACTORS, ALLERGENS, UserPreferences, PriorityFactor } from '../data/mockData'
import { useApp } from '../context/AppContext'

export default function PrioritiesPage() {
  const navigate = useNavigate()
  const { preferences, setPreferences } = useApp()

  const [selectedFactors, setSelectedFactors] = useState<Set<string>>(
    new Set(preferences.priorityFactors.map(pf => pf.factor))
  )
  const [factorRatings, setFactorRatings] = useState<Record<string, number>>(
    Object.fromEntries(preferences.priorityFactors.map(pf => [pf.factor, pf.importance]))
  )
  const [excludedAllergens, setExcludedAllergens] = useState<string[]>(
    preferences.excludedAllergens
  )
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Initialize ratings for all factors
  useEffect(() => {
    const initialRatings: Record<string, number> = {}
    PRIORITY_FACTORS.forEach(f => {
      initialRatings[f.id] = factorRatings[f.id] || 5
    })
    setFactorRatings(initialRatings)
  }, [])

  const toggleFactor = (factorId: string) => {
    setSelectedFactors(prev => {
      const newSet = new Set(prev)
      if (newSet.has(factorId)) {
        newSet.delete(factorId)
      } else {
        newSet.add(factorId)
      }
      return newSet
    })
    // Clear error when toggling
    setErrors(prev => ({ ...prev, [factorId]: '' }))
  }

  const updateRating = (factorId: string, value: number) => {
    // Validate 1-10 bounds
    if (value < 1 || value > 10) {
      setErrors(prev => ({ ...prev, [factorId]: 'Rating must be between 1 and 10' }))
      return
    }
    setFactorRatings(prev => ({ ...prev, [factorId]: value }))
    setErrors(prev => ({ ...prev, [factorId]: '' }))
  }

  const toggleAllergen = (allergen: string) => {
    setExcludedAllergens(prev =>
      prev.includes(allergen)
        ? prev.filter(a => a !== allergen)
        : [...prev, allergen]
    )
  }

  const handleSave = () => {
    // Validate all selected factors have ratings 1-10
    const newErrors: Record<string, string> = {}
    selectedFactors.forEach(factorId => {
      const rating = factorRatings[factorId]
      if (rating === undefined || rating < 1 || rating > 10) {
        newErrors[factorId] = 'Rating must be between 1 and 10'
      }
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Create priority factors with tie-breaker ranks
    // Group by rating, then assign ranks within each group
    const factorsByRating = new Map<number, string[]>()
    selectedFactors.forEach(factorId => {
      const rating = factorRatings[factorId]
      if (!factorsByRating.has(rating)) {
        factorsByRating.set(rating, [])
      }
      factorsByRating.get(rating)!.push(factorId)
    })

    const priorityFactors: PriorityFactor[] = []
    let rank = 1
    // Sort ratings descending (higher importance = lower rank number)
    const sortedRatings = Array.from(factorsByRating.keys()).sort((a, b) => b - a)

    sortedRatings.forEach(rating => {
      const factors = factorsByRating.get(rating)!
      factors.forEach(factorId => {
        priorityFactors.push({
          factor: factorId,
          importance: rating,
          rank: rank++
        })
      })
    })

    const newPreferences: UserPreferences = {
      priorityFactors,
      excludedAllergens
    }

    setPreferences(newPreferences)
    navigate('/')
  }

  const handleReset = () => {
    setSelectedFactors(new Set())
    setFactorRatings({})
    setExcludedAllergens([])
    setErrors({})
  }

  return (
    <div className="priorities-page">
      <h1>Set & Apply Priorities</h1>

      <div className="priorities-container">
        <div className="priority-factors-section">
          <h2>Priority Factors</h2>
          <p>Select the factors that matter most to you:</p>

          <div className="factor-list">
            {PRIORITY_FACTORS.map(factor => (
              <div key={factor.id} className="factor-item">
                <label className="factor-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedFactors.has(factor.id)}
                    onChange={() => toggleFactor(factor.id)}
                  />
                  <span className="factor-label">{factor.label}</span>
                </label>

                {selectedFactors.has(factor.id) && (
                  <div className="factor-rating">
                    <label>Importance (1-10):</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={factorRatings[factor.id] || 5}
                      onChange={(e) => {
                        const value = parseInt(e.target.value, 10)
                        if (!isNaN(value)) {
                          updateRating(factor.id, value)
                        }
                      }}
                      className="rating-input"
                    />
                    {errors[factor.id] && (
                      <span className="error-message">{errors[factor.id]}</span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="allergen-exclusions-section">
          <h2>Exclude Allergens</h2>
          <p>Select allergens you want to avoid:</p>

          <div className="allergen-list">
            {ALLERGENS.map(allergen => (
              <label key={allergen} className="allergen-checkbox">
                <input
                  type="checkbox"
                  checked={excludedAllergens.includes(allergen)}
                  onChange={() => toggleAllergen(allergen)}
                />
                <span>{allergen}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="priority-actions">
          <button onClick={handleReset} className="reset-button">
            Reset
          </button>
          <button onClick={handleSave} className="save-button">
            Save & Apply Priorities
          </button>
        </div>
      </div>
    </div>
  )
}
