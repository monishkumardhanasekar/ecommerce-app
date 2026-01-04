const express = require("express");
const cors = require("cors");
const app = express();

const errorHandler = require("./middleware/errorHandler");
const productRoutes = require("./routes/productRoutes");

// Middleware to parse JSON
app.use(express.json());

// ---------- CORS (env-based, production-grade) ----------
const allowedOrigin = process.env.FRONTEND_URL;

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);

// ---------- Health check ----------
app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is healthy" });
});

// ---------- Routes ----------
app.use("/products", productRoutes);

// ---------- 404 handler ----------
app.use((req, res, next) => {
  const ApiError = require("./utils/apiError");
  next(new ApiError(404, "NotFound", "Route does not exist"));
});

// ---------- Global error handler ----------
app.use(errorHandler);

module.exports = app;
