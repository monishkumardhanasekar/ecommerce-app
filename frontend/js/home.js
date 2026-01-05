// console.log("HOME JS LOADED");
import { fetchProducts, favoriteProduct, unfavoriteProduct } from "./api.js";
import { getFavorites, addFavorite, removeFavorite } from "./favorites.js";

// ---------- State ----------
let currentPage = 1;
let selectedBrands = [];
let selectedTypes = [];
let lastLoadedProducts = [];

// Allowed filters (must match backend enums)
const BRANDS = ["Apple", "Samsung", "Sony", "Dell", "HP"];
const TYPES = ["Phone", "Laptop", "Accessory"];

// ---------- DOM Elements ----------
const productsGrid = document.getElementById("productsGrid");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const brandFilters = document.getElementById("brandFilters");
const typeFilters = document.getElementById("typeFilters");
const favoritesList = document.getElementById("favoritesList");

// ---------- Init ----------
document.addEventListener("DOMContentLoaded", () => {
  renderFilters();
  loadProducts();
  setupPagination();
  renderFavorites();
});

// ---------- Render Filters ----------
function renderFilters() {
  brandFilters.innerHTML = BRANDS.map(
    (brand) => `
      <label class="flex items-center gap-2">
        <input type="checkbox" value="${brand}" class="brand-checkbox">
        ${brand}
      </label>
    `
  ).join("");

  typeFilters.innerHTML = TYPES.map(
    (type) => `
      <label class="flex items-center gap-2">
        <input type="checkbox" value="${type}" class="type-checkbox">
        ${type}
      </label>
    `
  ).join("");

  // Attach listeners
  document
    .querySelectorAll(".brand-checkbox")
    .forEach((cb) => cb.addEventListener("change", handleFilterChange));

  document
    .querySelectorAll(".type-checkbox")
    .forEach((cb) => cb.addEventListener("change", handleFilterChange));
}

// ---------- Load Products ----------
async function loadProducts() {
  try {
    const data = await fetchProducts({
      page: currentPage,
      brands: selectedBrands,
      types: selectedTypes,
    });

    renderProducts(data.products);
    updatePagination(data.pagination);
  } catch (error) {
    showError(error.message);
  }
}

// ---------- Render Products ----------
function renderProducts(products) {
  lastLoadedProducts = products;
  if (!products || products.length === 0) {
    productsGrid.innerHTML = `
      <p class="col-span-3 text-center text-gray-500">
        No products found
      </p>
    `;
    return;
  }

  const currentFavs = getFavorites();
  productsGrid.innerHTML = products
    .map((product) => {
      const isFav = currentFavs.some((p) => p._id === product._id);
      return `
      <div class="card">
        <div class="relative overflow-hidden rounded-lg">
          <img
            src="${product.imageUrl}"
            class="h-48 w-full object-cover cursor-pointer"
            onclick="window.location.href='product.html?id=${product._id}'"
          />
          <div class="absolute left-3 top-3 bg-white/90 px-2 py-1 rounded text-sm font-medium">
            ${product.brand}
          </div>
        </div>

        <div class="mt-3">
          <h3 class="font-semibold text-gray-800 truncate">${product.name}</h3>
          <p class="muted text-sm mt-1">${product.type}</p>
          <div class="mt-3 flex items-center justify-between">
            <div class="price">$${product.price}</div>
            <div class="flex items-center gap-2">
              <button class="heart-btn" data-id="${
                product._id
              }" aria-pressed="${isFav}">
                ${
                  isFav
                    ? '<svg class="heart-icon heart-filled" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="#ef4444" d="M12 21s-7.5-4.35-10-7.07C-1 9.9 2 5 6 5c1.9 0 3.2 1.1 4 2.09C11.8 6.1 13.1 5 15 5c4 0 7 4.9 4 8.93C19.5 16.65 12 21 12 21z"/></svg>'
                    : '<svg class="heart-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#ef4444" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/></svg>'
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    })
    .join("");

  // Attach favorite listeners
  document.querySelectorAll(".heart-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = btn.dataset.id;
      handleFavorite(id).then(() => {
        // toggle aria-pressed and swap icon by re-rendering favorites and products
        renderFavorites();
        loadProducts();
      });
    });
  });
}

// ---------- Pagination ----------
function setupPagination() {
  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      loadProducts();
    }
  });

  nextBtn.addEventListener("click", () => {
    currentPage++;
    loadProducts();
  });
}

function updatePagination(pagination) {
  if (!pagination) return;

  prevBtn.disabled = pagination.currentPage === 1;
  nextBtn.disabled = pagination.currentPage === pagination.totalPages;
}

// ---------- Filters ----------
function handleFilterChange() {
  selectedBrands = Array.from(
    document.querySelectorAll(".brand-checkbox:checked")
  ).map((cb) => cb.value);

  selectedTypes = Array.from(
    document.querySelectorAll(".type-checkbox:checked")
  ).map((cb) => cb.value);

  currentPage = 1;
  loadProducts();
}

// ---------- Render Favorites ----------
function renderFavorites() {
  const favorites = getFavorites();
  if (favorites.length === 0) {
    favoritesList.innerHTML = `
      <li class="text-gray-500 text-sm">No favorites yet</li>
    `;
    return;
  }

  favoritesList.innerHTML = favorites
    .map(
      (product) => `
      <li class="flex items-center bg-white rounded-lg shadow p-2 gap-3">
        <img
          src="${product.imageUrl}"
          alt="${product.name}"
          class="w-12 h-12 object-cover rounded cursor-pointer border"
          onclick="window.location.href='product.html?id=${product._id}'"
        />
        <span
          class="flex-1 cursor-pointer text-blue-700 font-medium hover:underline"
          onclick="window.location.href='product.html?id=${product._id}'"
        >
          ${product.name}
        </span>
        <button
          class="text-red-500 text-xs font-bold px-2 py-1 hover:bg-red-100 rounded transition"
          data-id="${product._id}"
          title="Remove from favorites"
        >
          ✕
        </button>
      </li>
    `
    )
    .join("");

  document.querySelectorAll("#favoritesList button").forEach((btn) => {
    btn.addEventListener("click", () => handleUnfavorite(btn.dataset.id));
  });
}

// ---------- Favorites ----------
async function handleFavorite(productId) {
  try {
    await favoriteProduct(productId);

    // find product from current grid
    const product = lastLoadedProducts.find((p) => p._id === productId);
    addFavorite(product);

    renderFavorites();
  } catch (error) {
    alert(error.message);
  }
}

// ---------- Unfavorite ----------
async function handleUnfavorite(productId) {
  try {
    await unfavoriteProduct(productId);
    removeFavorite(productId);
    renderFavorites();
    // ensure product cards update their heart state as well
    loadProducts();
  } catch (error) {
    alert(error.message);
  }
}

// ---------- Error Display ----------
function showError(message) {
  productsGrid.innerHTML = `
    <p class="col-span-3 text-center text-red-500">
      ${message}
    </p>
  `;
}
