const FAVORITES_KEY = "favorites";

/**
 * Get favorites from localStorage
 */
export function getFavorites() {
  return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
}

/**
 * Add a product to favorites
 */
export function addFavorite(product) {
  const favorites = getFavorites();

  // prevent duplicates
  if (!favorites.find((p) => p._id === product._id)) {
    favorites.push(product);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
}

/**
 * Remove a product from favorites
 */
export function removeFavorite(productId) {
  const favorites = getFavorites().filter((p) => p._id !== productId);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}
