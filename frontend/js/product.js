import {
  fetchProductDetails,
  favoriteProduct,
  unfavoriteProduct,
} from "./api.js";
import { getFavorites, addFavorite, removeFavorite } from "./favorites.js";

// ---------- DOM ----------
const productDetails = document.getElementById("productDetails");
const relatedProducts = document.getElementById("relatedProducts");

// ---------- Get productId from URL ----------
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

// ---------- Init ----------
if (!productId) {
  productDetails.innerHTML = `
    <p class="text-red-500">Invalid product</p>
  `;
} else {
  loadProductDetails();
}

// ---------- Load product ----------
async function loadProductDetails() {
  try {
    const data = await fetchProductDetails(productId);
    renderProduct(data.product);
    renderRelatedProducts(data.relatedProducts);
  } catch (error) {
    productDetails.innerHTML = `
      <p class="text-red-500">${error.message}</p>
    `;
  }
}

// ---------- Render product ----------
function renderProduct(product) {
  const favorites = getFavorites();
  const isFavorited = favorites.some((p) => p._id === product._id);

  productDetails.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
      <div class="overflow-hidden rounded-lg">
        <img src="${product.imageUrl}" class="w-full h-96 object-cover rounded-lg" />
      </div>

      <div>
        <h2 class="text-2xl font-bold text-gray-800">${product.name}</h2>
        <p class="muted mt-1">${product.brand} · ${product.type}</p>
        <div class="mt-4">
          <div class="price text-2xl">$${product.price}</div>
        </div>

        <p class="mt-4 text-gray-700">${product.description}</p>

        <div class="mt-6">
          <button id="favoriteBtn" class="heart-btn" aria-pressed="${isFavorited}">
            ${isFavorited ? '<svg class="heart-icon heart-filled" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="#ef4444" d="M12 21s-7.5-4.35-10-7.07C-1 9.9 2 5 6 5c1.9 0 3.2 1.1 4 2.09C11.8 6.1 13.1 5 15 5c4 0 7 4.9 4 8.93C19.5 16.65 12 21 12 21z"/></svg>' : '<svg class="heart-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#ef4444" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/></svg>'}
          </button>
        </div>
      </div>
    </div>
  `;

  document
    .getElementById("favoriteBtn")
    .addEventListener("click", () => toggleFavorite(product, isFavorited));
}

// ---------- Render related ----------
function renderRelatedProducts(products) {
  if (!products || products.length === 0) {
    relatedProducts.innerHTML = `
      <p class="text-gray-500 col-span-3">
        No related products
      </p>
    `;
    return;
  }

  relatedProducts.innerHTML = products
    .map(
      (p) => `
      <div class="card cursor-pointer" onclick="window.location.href='product.html?id=${p._id}'">
        <img src="${p.imageUrl}" class="h-40 w-full object-cover rounded-lg"/>
        <h3 class="font-medium mt-2 text-sm">${p.name}</h3>
      </div>
    `
    )
    .join("");
}

// ---------- Favorite toggle ----------
async function toggleFavorite(product, isFavorited) {
  try {
    if (isFavorited) {
      await unfavoriteProduct(product._id);
      removeFavorite(product._id);
    } else {
      await favoriteProduct(product._id);
      addFavorite(product);
    }
    loadProductDetails(); // re-render
  } catch (error) {
    alert(error.message);
  }
}
