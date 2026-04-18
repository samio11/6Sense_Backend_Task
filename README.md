<div align="center">

<br/>



# Product Management System

**A robust, production-ready REST API for managing products and categories**

[![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Express](https://img.shields.io/badge/Express-5.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)


<br/>

</div>

---

##  Table of Contents

- [ Overview](#-overview)
- [ Architecture](#️-architecture)
- [ Tech Stack](#-tech-stack)
- [ Project Structure](#-project-structure)
- [ Getting Started](#️-getting-started)
- [ Environment Variables](#-environment-variables)
- [ API Reference](#-api-reference)
  - [Category Endpoints](#category-endpoints)
  - [Product Endpoints](#product-endpoints)
- [ Core Features](#-core-features)
- [ Error Handling](#️-error-handling)
- [ Query Capabilities](#-query-capabilities)
- [ Deployment](#️-deployment)
- [ Postman Collection](#-postman-collection)

---

##  Overview

The **6Sense - Product Management System** is a clean, scalable backend REST API built with **TypeScript** and **Express.js**. It provides a complete solution for managing an e-commerce product catalog — including categories, product codes, image hosting, and advanced querying — all connected to a cloud-hosted **MongoDB Atlas** database.

Key highlights at a glance:

-  **Type-safe** end-to-end with TypeScript interfaces, Mongoose schemas, and Zod validation
-  **Auto-generated product codes** using a custom cryptographic + algorithmic approach
-  **Advanced QueryBuilder** for search, filter, sort, paginate & field selection
-  **Deployed to Vercel** with zero-config routing via `vercel.json`
-  **Centralized error handling** for Zod, Mongoose, duplicate key & cast errors

---

<img width="481" height="361" alt="6senseTask drawio" src="https://github.com/user-attachments/assets/1d0ad1ff-8529-44d1-adfb-47b205bfb3f7" />


##  Architecture

The application follows a **modular MVC-style architecture**, keeping concerns cleanly separated:

```
Request → Router → Controller → Service → Database (Mongoose)
                                    ↓
                              Error Handler (Global)
```

Each domain (`category`, `product`) owns its:
- **Interface** — TypeScript type definitions
- **Model** — Mongoose schema & document model
- **Service** — Business logic layer
- **Controller** — HTTP handler (thin, delegating to service)
- **Routes** — Express router, bound to the root `/api/v1` prefix

---

##  Tech Stack

| Layer | Technology |
|-------|-----------|
| **Runtime** | Node.js (v18+) |
| **Language** | TypeScript 5.x (compiled to ES6 CommonJS) |
| **Framework** | Express.js v5 |
| **Database** | MongoDB Atlas via Mongoose v9 |
| **Validation** | Zod 3.5 |
| **Config** | dotenv |
| **Dev Server** | ts-node-dev (hot reload) |
| **Deployment** | Vercel (Serverless) |

---

##  Project Structure

```
6Sense_Product_Managment/
│
├── src/
│   ├── server.ts                    #  Entry point — DB connect + HTTP server
│   ├── app.ts                       #  Express app setup, middleware, routes
│   │
│   └── app/
│       ├── config/
│       │   └── index.ts             #   Centralised env config (dotenv)
│       │
│       ├── modules/
│       │   ├── category/
│       │   │   ├── category.interface.ts   # TypeScript types
│       │   │   ├── category.model.ts       # Mongoose schema & model
│       │   │   ├── category.services.ts    # Business logic
│       │   │   ├── category.controller.ts  # HTTP handlers
│       │   │   └── category.routes.ts      # Express router
│       │   │
│       │   └── product/
│       │       ├── product.interface.ts    # TypeScript types
│       │       ├── product.model.ts        # Mongoose schema & model
│       │       ├── product.services.ts     # Business logic + price calculation
│       │       ├── product.controller.ts   # HTTP handlers
│       │       ├── product.routes.ts       # Express router
│       │       └── product.utils.ts        # Product code generator
│       │
│       ├── middlewares/
│       │   ├── globalErrorHandler.ts  # Centralised error handler
│       │   ├── notFound.ts            # 404 handler
│       │   └── validateRequest.ts     # Zod schema validation middleware
│       │
│       ├── errors/
│       │   ├── AppError.ts            # Custom operational error class
│       │   ├── handleCastError.ts     # Mongoose ObjectId cast error
│       │   ├── handleDuplicateError.ts# MongoDB duplicate key (11000)
│       │   ├── handleValidationError.ts# Mongoose validation error
│       │   └── handleZodError.ts      # Zod schema parse errors
│       │
│       ├── utils/
│       │   ├── QueryBuilder.ts        # 🔍 Chainable query utility class
│       │   ├── QueryBuilder.constant.ts# Reserved query param exclusions
│       │   ├── catchAsync.ts          # Async error wrapper
│       │   └── sendResponse.ts        # Standardised JSON response helper
│       │
│       ├── routes/
│       │   └── index.ts               # Root router — mounts all modules
│       │
│       └── types/
│           └── error.ts               # Shared error type definitions
│
├── dist/                             # Compiled JS output (gitignored)
├── .env                              # Environment variables (gitignored)
├── .gitignore
├── package.json
├── tsconfig.json
├── vercel.json                       # Vercel serverless config
└── 6Sense_Backend.postman_collection.json  # Postman collection
```

---

##  Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9+
- A **MongoDB Atlas** account (or local MongoDB instance)
- A **Cloudinary** account (for image uploads)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/6sense-product-management.git
cd 6sense-product-management
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root (see [Environment Variables](#-environment-variables)):

```bash
cp .env.example .env
# Then fill in your actual values
```

### 4. Start Development Server

```bash
npm run dev
```

The server will start at **`http://localhost:5000`** with hot-reload enabled.

> ✅ On startup you should see:
> ```
> MongoDB connected successfully
> Server Runs at PORT:- http://localhost:5000
> ```

---

## Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# Server
PORT=5000
NODE_ENV=development           # "development" | "production"

# MongoDB Atlas
DATABASE=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?appName=<AppName>

```

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | ✅ | Port the HTTP server listens on |
| `NODE_ENV` | ✅ | Sets error stack trace visibility in responses |
| `DATABASE` | ✅ | MongoDB connection string |


> ⚠️ **Never commit your `.env` file.** It is already included in `.gitignore`.

---

##  API Reference

All endpoints are prefixed with **`/api/v1`**.

The base health-check endpoint:
```
GET /
→ 200 { message, upTime, Date }
```

---

### Category Endpoints

#### ➕ Create Category

```http
POST /api/v1/category/create
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Electronics",
  "description": "All electronic items"
}
```

**Success Response `201`:**
```json
{
  "success": true,
  "message": "Category created successfully",
  "data": {
    "_id": "69e273246fb8e4938c6e0fb4",
    "name": "Electronics",
    "description": "All electronic items",
    "createdAt": "2026-04-17T10:00:00.000Z",
    "updatedAt": "2026-04-17T10:00:00.000Z"
  }
}
```

>  Returns `400 Bad Request` if a category with the same name already exists.

---

####  Get All Categories

```http
GET /api/v1/category
```

**Success Response `200`:** Returns an array of all categories, sorted by newest first (`-createdAt`).

---

### Product Endpoints

####  Create Product

```http
POST /api/v1/product/create
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Alpha Sorter",
  "description": "A smart sorting device",
  "price": 1200,
  "discount": 10,
  "image": "https://example.com/image.webp",
  "status": "In Stock",
  "category": "69e273246fb8e4938c6e0fb4"
}
```

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `name` | `string` | ✅ | Product name |
| `description` | `string` | ✅ | Product description |
| `price` | `number` | ✅ | Must be `≥ 0` |
| `discount` | `number` | ❌ | Default `0`, range `0–100` |
| `image` | `string` | ✅ | URL or Cloudinary path |
| `status` | `"In Stock" \| "Stock Out"` | ❌ | Default `"In Stock"` |
| `category` | `ObjectId` | ✅ | Must be a valid existing category `_id` |

**Success Response `201`:**
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "_id": "69e281287148a63b45b88170",
    "name": "Alpha Sorter",
    "productCode": "a3f1c2d-0abefhi12",
    "price": 1200,
    "discount": 10,
    "status": "In Stock",
    ...
  }
}
```

>  A unique `productCode` is **auto-generated** from the product name using a cryptographic MD5 prefix + longest-increasing-subsequence algorithm. No manual input needed.

---

####  Get All Products

```http
GET /api/v1/product
```

Supports full query capabilities:

| Query Param | Description | Example |
|------------|-------------|---------|
| `searchTerm` | Search product names (case-insensitive regex) | `?searchTerm=alpha` |
| `category` | Filter by category `_id` | `?category=69e273...` |
| `status` | Filter by stock status | `?status=In+Stock` |
| `sort` | Sort field (prefix `-` for descending) | `?sort=-price` |
| `fields` | Select specific fields (comma-separated) | `?fields=name,price` |
| `page` | Pagination page number (default: `1`) | `?page=2` |
| `limit` | Results per page (default: `10`) | `?limit=5` |

**Success Response `200`** — each product includes computed pricing:
```json
{
  "success": true,
  "message": "Products retrieved successfully",
  "data": [
    {
      "_id": "...",
      "name": "Alpha Sorter",
      "description": "...",
      "image": "...",
      "status": "In Stock",
      "productCode": "a3f1c2d-0abefhi12",
      "category": { "_id": "...", "name": "Electronics" },
      "pricing": {
        "originalPrice": 1200,
        "discount": 10,
        "finalPrice": 1080.00
      },
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
}
```

---

####  Update Product

```http
PATCH /api/v1/product/:id
Content-Type: application/json
```

Only the following fields are updatable for data integrity:

| Field | Type | Notes |
|-------|------|-------|
| `status` | `"In Stock" \| "Stock Out"` | Update availability |
| `description` | `string` | Update product description |
| `discount` | `number` | Must be `0–100` |

**Request Body Example:**
```json
{
  "discount": 15
}
```

**Success Response `200`:** Returns the full updated product document with category populated.

> 🔒 Returns `404` if product ID is not found. Returns `401` if discount is out of range.

---

##  Core Features

###  Auto-Generated Product Codes

Every product gets a deterministic, unique code on creation via `product.utils.ts`:

```
productCode = "<MD5-hash-prefix(7 chars)>-<startIdx><longest-increasing-substring><endIdx>"
```

**Example:** For `"Alpha Sorter"` → `a3f1c2d-0abefhi12`

- **Step 1:** MD5 hash of the product name → first 7 characters for uniqueness
- **Step 2:** Find all **longest increasing character substrings** (e.g. `"abefhi"` from `"Alpha Sorter"`)
- **Step 3:** Combine with positions to form a human-readable, deterministic suffix
- **Collision handling:** If a code already exists, a numeric counter suffix (`-1`, `-2`, ...) is appended

---

###  Advanced QueryBuilder

The `QueryBuilder<T>` class provides a **fluent, chainable API** for building complex Mongoose queries:

```typescript
const queryBuilder = new QueryBuilder(Product.find().populate('category'), query)
  .search(['name'])     // Full-text regex search on name field
  .filter()             // Dynamic field filtering (excludes reserved params)
  .sort()               // Custom sort or default to -createdAt
  .fields()             // Field projection
  .paginate();          // Skip/limit pagination

const products = await queryBuilder.builder();
```

Reserved query parameters excluded from field filtering: `searchTerm`, `sort`, `fields`, `page`, `limit`.

---

###  Real-Time Price Calculation

When fetching products, the API automatically computes the **final price** accounting for the discount:

```
finalPrice = originalPrice - (originalPrice × discount / 100)
```

This is returned in a structured `pricing` object so frontends never need to calculate it:

```json
"pricing": {
  "originalPrice": 1200,
  "discount": 10,
  "finalPrice": 1080.00
}
```

---

##  Error Handling

All errors are caught by the **global error handler middleware** and returned in a consistent shape:

```json
{
  "success": false,
  "message": "Descriptive error message",
  "errorSources": [
    { "path": "fieldName", "message": "What went wrong" }
  ],
  "stack": "..." // Only in NODE_ENV=development
}
```

The handler recognises and provides meaningful messages for:

| Error Type | Trigger | Handler |
|-----------|---------|---------|
| `MongoDB Code 11000` | Duplicate unique field | `handleDuplicateError` |
| `CastError` | Invalid ObjectId | `handleCastError` |
| `ValidationError` | Mongoose schema violation | `handleValidationError` |
| `ZodError` | Request body validation fail | `handleZodError` |
| `AppError` | Custom operational errors | Inline in handler |
| `Error` | Generic unhandled errors | Inline in handler |

Unhandled promise rejections, uncaught exceptions, and `SIGTERM` signals are all captured at the process level in `server.ts` for graceful shutdown.

---

## ☁️ Deployment

This project is configured for **one-click deployment on Vercel**.

### Deploy to Vercel

```bash
npm i -g vercel
vercel --prod
```

The `vercel.json` configuration routes all incoming requests to `src/server.ts`:

```json
{
  "version": 2,
  "builds": [{ "src": "src/server.ts", "use": "@vercel/node" }],
  "routes": [{ "src": "/(.*)", "dest": "src/server.ts" }]
}
```

> ⚠️ Remember to add all environment variables in your **Vercel Project Settings → Environment Variables** before deploying.

---

##  Postman Collection

A complete Postman collection is included: **`6Sense_Backend.postman_collection.json`**

### How to Import

1. Open **Postman**
2. Click **Import** → **File** → Select `6Sense_Backend.postman_collection.json`
3. Set the `BACKEND` collection variable to your server URL:
   - **Local:** `http://localhost:5000/api/v1`
   - **Production:** `https://your-vercel-url.vercel.app/api/v1`

### Available Requests

| Folder | Request | Method | Endpoint |
|--------|---------|--------|----------|
| Category | Create Category | `POST` | `/category/create` |
| Category | Get All Categories | `GET` | `/category` |
| Product | Create Product | `POST` | `/product/create` |
| Product | Get All Products | `GET` | `/product?searchTerm=...` |
| Product | Update Product | `PATCH` | `/product/:id` |

---

<div align="center">

<br/>

Made with by **Samio Hasan**

[![TypeScript](https://img.shields.io/badge/Built%20with-TypeScript-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![MongoDB](https://img.shields.io/badge/Powered%20by-MongoDB-47A248?style=flat-square&logo=mongodb)](https://www.mongodb.com)
[![Express](https://img.shields.io/badge/Served%20by-Express-000000?style=flat-square&logo=express)](https://expressjs.com)

</div>
