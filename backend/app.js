const path = require("path");

const express = require("express");
// const cors = require("cors");
const app = express();

//  builds the Express application: middleware + routes + error handling.

const errorHandler = require("./middleware/errorHandler");
const productRoutes = require("./routes/productRoutes");

// Middleware to parse JSON
app.use(express.json());
const requestLogger = require("./middleware/requestLogger");

app.use(requestLogger);

// Serve static frontend files
app.use(express.static(path.join(__dirname, "../frontend")));

// ---------- Health check ----------
app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is healthy" });
});

// ---------- Routes ----------
app.use("/products", productRoutes);

// Frontend fallback: redirect browser requests on unsupported routes
app.use((req, res, next) => {
  const acceptsHTML =
    req.headers.accept && req.headers.accept.includes("text/html");

  if (acceptsHTML) {
    return res.redirect("/");
  }

  next();
});

// ---------- 404 handler ----------
app.use((req, res, next) => {
  const ApiError = require("./utils/apiError");
  next(new ApiError(404, "NotFound", "Route does not exist"));
});

// ---------- Global error handler ----------
app.use(errorHandler);

module.exports = app;
