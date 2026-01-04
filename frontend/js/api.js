import { CONFIG } from "./config.js";

const BASE_URL = CONFIG.BASE_URL;

/**
 * Generic fetch wrapper
 */
async function apiFetch(endpoint, options = {}) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    });

    const data = await response.json();

    // Handle backend errors (AWS-style)
    if (!response.ok) {
      const errorMessage = data?.Error?.Message || "Something went wrong";
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    throw error;
  }
}

/**
 * Get products with pagination and filters
 */
export function fetchProducts({ page = 1, brands = [], types = [] }) {
  let query = `?page=${page}`;

  if (brands.length > 0) {
    query += `&brand=${brands.join(";")}`;
  }

  if (types.length > 0) {
    query += `&type=${types.join(";")}`;
  }

  return apiFetch(`/products${query}`);
}

/**
 * Get product details
 */
export function fetchProductDetails(productId) {
  return apiFetch(`/products/details/${productId}`);
}

/**
 * Favorite product
 */
export function favoriteProduct(productId) {
  return apiFetch(`/products/favorite/${productId}`, {
    method: "POST",
  });
}

/**
 * Unfavorite product
 */
export function unfavoriteProduct(productId) {
  return apiFetch(`/products/favorite/${productId}`, {
    method: "DELETE",
  });
}
