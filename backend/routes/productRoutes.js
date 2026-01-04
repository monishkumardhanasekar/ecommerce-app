const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductDetails,
  favoriteProduct,
  unfavoriteProduct,
} = require("../controllers/productController");

router.get("/", getProducts);
router.get("/details/:productId", getProductDetails);
router.post("/favorite/:productId", favoriteProduct);
router.delete("/favorite/:productId", unfavoriteProduct);

module.exports = router;
