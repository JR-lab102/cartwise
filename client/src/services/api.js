const API_BASE_URL = 'http://localhost:3000/api';

// Convert snake_case to camelCase
function toCamelCase(obj) {
  if (Array.isArray(obj)) {
    return obj.map(item => toCamelCase(item));
  }
  if (obj !== null && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase()),
        toCamelCase(value)
      ])
    );
  }
  return obj;
}

export async function apiGet(endpoint) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'API request failed');
  }

  return toCamelCase(data);
}

export async function apiPost(endpoint, body) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'API request failed');
  }

  return toCamelCase(data);
}

export async function apiPut(endpoint, body) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'API request failed');
  }

  return toCamelCase(data);
}

export async function apiDelete(endpoint) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'DELETE',
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'API request failed');
  }

  return toCamelCase(data);
}

// Product endpoints
export async function getProducts(params = {}) {
  const queryParams = new URLSearchParams();
  if (params.q) queryParams.append('q', params.q);
  if (params.excludeAllergens) queryParams.append('excludeAllergens', params.excludeAllergens);

  const query = queryParams.toString();
  return apiGet(`/products${query ? `?${query}` : ''}`);
}

export async function getProduct(id) {
  return apiGet(`/products/${id}`);
}

export async function getProductAlternatives(id, excludeAllergens = []) {
  const query = excludeAllergens.length > 0
    ? `?excludeAllergens=${excludeAllergens.join(',')}`
    : '';
  return apiGet(`/products/${id}/alternatives${query}`);
}

// Saved products endpoints
export async function getSavedProducts(sessionKey) {
  return apiGet(`/saved?session_key=${sessionKey}`);
}

export async function saveProduct(sessionKey, productId) {
  return apiPost('/saved', { session_key: sessionKey, product_id: productId });
}

export async function unsaveProduct(sessionKey, productId) {
  return apiDelete(`/saved/${productId}?session_key=${sessionKey}`);
}

// Preferences endpoints
export async function getPreferences() {
  return apiGet('/preferences');
}

export async function updatePreferences(preferences) {
  return apiPut('/preferences', {
    priority_factors: preferences.priorityFactors?.map(pf => ({
      factor: pf.factor,
      importance: pf.importance,
      rank: pf.rank,
    })),
    excluded_allergens: preferences.excludedAllergens,
  });
}
