const { Product, BRANDS, TYPES } = require("../models/Product");
const ApiError = require("../utils/apiError");
const asyncHandler = require("../middleware/asyncHandler");

const PAGE_SIZE = 9;
const mongoose = require("mongoose");

// GET /products -> fetch products with pagination and filtering
exports.getProducts = asyncHandler(async (req, res) => {
  let { page = 1, brand, type } = req.query;

  // ---------- Validate page ----------
  page = Number(page);
  if (!Number.isInteger(page) || page < 1) {
    throw new ApiError(
      422,
      "InvalidParameter",
      "Page must be a positive integer"
    );
  }

  // ---------- Build filter object ----------
  const filter = {};

  // ---------- Validate brand filter ----------
  if (brand) {
    const brands = brand.split(";");
    const invalidBrands = brands.filter((b) => !BRANDS.includes(b));

    if (invalidBrands.length > 0) {
      throw new ApiError(
        422,
        "InvalidParameter",
        "One or more brands are invalid"
      );
    }

    filter.brand = { $in: brands };
  }

  // ---------- Validate type filter ----------
  if (type) {
    const types = type.split(";");
    const invalidTypes = types.filter((t) => !TYPES.includes(t));

    if (invalidTypes.length > 0) {
      throw new ApiError(
        422,
        "InvalidParameter",
        "One or more product types are invalid"
      );
    }

    filter.type = { $in: types };
  }

  // ---------- Pagination logic ----------
  const skip = (page - 1) * PAGE_SIZE;

  const totalProducts = await Product.countDocuments(filter);
  const totalPages = Math.ceil(totalProducts / PAGE_SIZE);

  if (page > totalPages && totalProducts !== 0) {
    throw new ApiError(
      422,
      "InvalidParameter",
      "Page number exceeds total pages"
    );
  }

  const products = await Product.find(filter)
    .skip(skip)
    .limit(PAGE_SIZE)
    .sort({ createdAt: -1 });

  // ---------- No results ----------
  if (products.length === 0) {
    return res.status(200).json({
      message: "No products found",
      products: [],
      pagination: {
        currentPage: page,
        totalPages,
      },
    });
  }

  // ---------- Success ----------
  res.status(200).json({
    products,
    pagination: {
      currentPage: page,
      totalPages,
    },
  });
});

// GET /products/details/:productId -> fetch specific product details and related products by brand
exports.getProductDetails = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  // ---------- Validate ObjectId ----------
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new ApiError(422, "InvalidParameter", "Product ID format is invalid");
  }

  // ---------- Find product ----------
  const product = await Product.findById(productId);

  if (!product) {
    throw new ApiError(404, "NotFound", "Product does not exist");
  }

  // ---------- Fetch related products (same brand) ----------
  const relatedProducts = await Product.find({
    brand: product.brand,
    _id: { $ne: product._id },
  }).limit(6);

  // ---------- Success ----------
  res.status(200).json({
    product,
    relatedProducts,
  });
});

// ----------Favorite a product ----------

// POST /products/favorite/:productId
exports.favoriteProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new ApiError(422, "InvalidParameter", "Product ID format is invalid");
  }

  // Check product exists
  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(404, "NotFound", "Product does not exist");
  }

  res.status(200).json({
    message: "Product favorited successfully",
  });
});

// ----------Unfavorite a product ----------
// DELETE /products/favorite/:productId
exports.unfavoriteProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new ApiError(422, "InvalidParameter", "Product ID format is invalid");
  }

  // Check product exists
  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(404, "NotFound", "Product does not exist");
  }

  res.status(200).json({
    message: "Product unfavorited successfully",
  });
});
