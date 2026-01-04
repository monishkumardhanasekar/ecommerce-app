# E-Commerce Application (Node.js + MongoDB)

This project is a simple e-commerce application built using **Node.js, Express, and MongoDB**, with a lightweight frontend using **HTML, Tailwind CSS, and JavaScript**.

It supports:

- Product listing with pagination and filters
- Product details page
- Favorites (add / remove)
- Image rendering
- Clean REST APIs

---

## Project Structure Overview

```
ecommerce-project/
│
├── backend/
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   ├── .env
│   │
│   ├── models/
│   │   └── Product.js
│   │
│   ├── routes/
│   │   └── productRoutes.js
│   │
│   ├── controllers/
│   │   └── productController.js
│   │
│   ├── middleware/
│   │   └── errorHandler.js
│   │
│   ├── utils/
│   │   └── apiError.js
│   │
│   ├── seed/
│   │   └── seedProducts.js
│   │
│   └── public/
│       └── images/
│
└── frontend/
    ├── index.html
    ├── product.html
    └── js/
        ├── home.js
        ├── product.js
        ├── api.js
        ├── favorites.js
        └── config.js
```

---

## What Each Major Part Does (High Level)

### Backend

- **Express** handles HTTP requests and routing
- **MongoDB (Mongoose)** stores product data
- **Seed script** inserts initial product data
- **Static images** are served from the backend
- **CORS** allows frontend to access APIs

### Frontend

- **index.html** → Product listing, filters, pagination, favorites
- **product.html** → Product details and related products
- **JavaScript modules** handle API calls, UI updates, and state

---

## Prerequisites

Make sure you have:

- **Node.js** (v18 or later recommended)
- **MongoDB** (local or MongoDB Atlas)
- **npm**

Check versions:

```bash
node -v
npm -v
```

---

## Environment Setup

Create a `.env` file inside `backend/`:

```env
PORT=5001
MONGO_URI=mongodb://localhost:27017/ecommerce
FRONTEND_URL=http://localhost:5500
```

> `FRONTEND_URL` is used for CORS configuration.

- In the frontend/config.js: fix the BASE_URL as per your backend url.

---

## Install Dependencies

From the **backend** directory:

```bash
cd backend
npm install
```

---

## Seed the Database

This inserts sample products into MongoDB.

```bash
npm run seed
```

Expected output:

```
MongoDB connected for seeding
Existing products cleared
30 products seeded successfully
```

---

## ▶️ Run the Backend Server

### Development mode

```bash
npm run dev
```

### Production mode

```bash
npm start
```

Server runs on:

```
http://localhost:5001
```

---

## Run the Frontend

Open `frontend/index.html` in the Broswe:

Frontend URL:

```
http://localhost:5500
```

---

## API Endpoints & How to Test

You can test APIs using **browser**, **Postman**, or **curl**.

---

### 1. Health Check

```http
GET /health
```

Example:

```bash
curl http://localhost:5001/health
```

Response:

```json
{ "message": "Server is healthy" }
```

---

### 2. Get Products (with pagination)

```http
GET /products?page=1
```

Example:

```bash
curl http://localhost:5001/products?page=1
```

---

### 3. Filter Products

```http
GET /products?brand=Apple;Samsung&type=Phone
```

---

### 4. Get Product Details

```http
GET /products/details/:productId
```

Example:

```bash
curl http://localhost:5001/products/details/PRODUCT_ID
```

---

### 5. Favorite a Product

```http
POST /products/favorite/:productId
```

Example:

```bash
curl -X POST http://localhost:5001/products/favorite/PRODUCT_ID
```

---

### 6. Unfavorite a Product

```http
DELETE /products/favorite/:productId
```

Example:

```bash
curl -X DELETE http://localhost:5001/products/favorite/PRODUCT_ID
```

---

## Product Images

- Stored as direct image URLs in the DB.
- Rendered dynamically in frontend

---

## NPM Scripts Explained

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js",
  "seed": "node seed/seedProducts.js"
}
```

| Script         | Purpose                      |
| -------------- | ---------------------------- |
| `npm run dev`  | Run backend with auto-reload |
| `npm start`    | Run backend normally         |
| `npm run seed` | Seed MongoDB with products   |

---

## 📌 Summary

This project demonstrates:

- REST API design
- MongoDB data modeling
- Backend-frontend integration
- Production-ready structure
- Clean separation of concerns
