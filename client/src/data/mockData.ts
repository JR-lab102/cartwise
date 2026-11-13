export interface Product {
  id: string
  name: string
  brand: string
  category: string
  imageUrl: string
  calories: number
  proteinG: number
  sugarG: number
  fiberG: number
  sodiumMg: number
  ingredients: string
  allergens: string[]
}

export interface PriorityFactor {
  factor: string
  importance: number // 1-10
  rank: number // tie-breaker rank
}

export interface UserPreferences {
  priorityFactors: PriorityFactor[]
  excludedAllergens: string[]
}

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Oatly Oat Milk',
    brand: 'Oatly',
    category: 'Dairy Alternative',
    imageUrl: 'https://via.placeholder.com/300x300?text=Oatly+Oat+Milk',
    calories: 140,
    proteinG: 3.0,
    sugarG: 7.0,
    fiberG: 2.0,
    sodiumMg: 105,
    ingredients: 'Water, oats (10%), rapeseed oil, calcium, vitamin D2, vitamin B12, sea salt.',
    allergens: []
  },
  {
    id: 'prod-2',
    name: 'Silk Almond Milk',
    brand: 'Silk',
    category: 'Dairy Alternative',
    imageUrl: 'https://via.placeholder.com/300x300?text=Silk+Almond+Milk',
    calories: 60,
    proteinG: 1.0,
    sugarG: 0.0,
    fiberG: 1.0,
    sodiumMg: 170,
    ingredients: 'Almondmilk (filtered water, almonds), sea salt, gellan gum, locust bean gum, sunflower lecithin, natural flavor, vitamin A palmitate, vitamin D2, d-alpha-tocopherol (vitamin E).',
    allergens: ['tree nuts']
  },
  {
    id: 'prod-3',
    name: 'Nature Valley Protein Granola',
    brand: 'Nature Valley',
    category: 'Breakfast',
    imageUrl: 'https://via.placeholder.com/300x300?text=Nature+Valley+Protein',
    calories: 190,
    proteinG: 10.0,
    sugarG: 6.0,
    fiberG: 3.0,
    sodiumMg: 95,
    ingredients: 'Whole grain oats, sugar, soy protein isolate, palm oil, honey, crisp rice (rice flour, sugar, malt syrup, salt), almonds, sea salt, vitamin E (mixed tocopherols) added to preserve freshness.',
    allergens: ['soy', 'tree nuts']
  },
  {
    id: 'prod-4',
    name: 'Kashi GOLEAN Cereal',
    brand: 'Kashi',
    category: 'Breakfast',
    imageUrl: 'https://via.placeholder.com/300x300?text=Kashi+GOLEAN',
    calories: 140,
    proteinG: 13.0,
    sugarG: 9.0,
    fiberG: 10.0,
    sodiumMg: 125,
    ingredients: 'Whole grain rolled oats, whole grain wheat, soy protein crisps (soy protein isolate, rice flour), sugar, rice, honey, sea salt, molasses.',
    allergens: ['soy', 'wheat']
  },
  {
    id: 'prod-5',
    name: "Bob's Red Mill Gluten Free Oats",
    brand: "Bob's Red Mill",
    category: 'Grains',
    imageUrl: 'https://via.placeholder.com/300x300?text=Bob%27s+Red+Mill+Oats',
    calories: 150,
    proteinG: 5.0,
    sugarG: 1.0,
    fiberG: 4.0,
    sodiumMg: 0,
    ingredients: 'Gluten free whole grain rolled oats.',
    allergens: []
  },
  {
    id: 'prod-6',
    name: 'Almond Butter',
    brand: 'Justin\'s',
    category: 'Spreads',
    imageUrl: 'https://via.placeholder.com/300x300?text=Almond+Butter',
    calories: 190,
    proteinG: 7.0,
    sugarG: 3.0,
    fiberG: 3.0,
    sodiumMg: 0,
    ingredients: 'Dry roasted almonds.',
    allergens: ['tree nuts']
  },
  {
    id: 'prod-7',
    name: 'Peanut Butter',
    brand: 'Jif',
    category: 'Spreads',
    imageUrl: 'https://via.placeholder.com/300x300?text=Peanut+Butter',
    calories: 190,
    proteinG: 7.0,
    sugarG: 3.0,
    fiberG: 2.0,
    sodiumMg: 140,
    ingredients: 'Roasted peanuts, sugar, contains 2% or less of: molasses, fully hydrogenated vegetable oils (rapeseed, soybean, and peanut), salt.',
    allergens: ['peanuts', 'soy']
  },
  {
    id: 'prod-8',
    name: 'Greek Yogurt Plain',
    brand: 'Chobani',
    category: 'Dairy',
    imageUrl: 'https://via.placeholder.com/300x300?text=Greek+Yogurt',
    calories: 100,
    proteinG: 17.0,
    sugarG: 4.0,
    fiberG: 0,
    sodiumMg: 60,
    ingredients: 'Grade A pasteurized nonfat milk, live active cultures.',
    allergens: ['dairy']
  }
]

export const PRIORITY_FACTORS = [
  { id: 'high_protein', label: 'High Protein' },
  { id: 'low_sugar', label: 'Low Sugar' },
  { id: 'low_calories', label: 'Low Calories' },
  { id: 'high_fiber', label: 'High Fiber' },
  { id: 'low_sodium', label: 'Low Sodium' },
  { id: 'gluten_free', label: 'Gluten Free' },
  { id: 'dairy_free', label: 'Dairy Free' },
  { id: 'vegan', label: 'Vegan' },
  { id: 'organic', label: 'Organic' },
  { id: 'nut_free', label: 'Nut Free' }
]

export const ALLERGENS = [
  'peanuts',
  'tree nuts',
  'dairy',
  'soy',
  'wheat',
  'gluten',
  'shellfish',
  'eggs',
  'fish'
]
