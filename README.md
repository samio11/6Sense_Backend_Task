<div align="center">

<br/>



# Product Management System

**A robust, production-ready REST API for managing products and categories**



</div>



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

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/6sense-product-management.git
cd 6sense-product-management
```

### 2. Install Dependencies

```bash
npm install
```

## Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# Server
PORT=5000
NODE_ENV=development           # "development" | "production"

# MongoDB Atlas
DATABASE=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?appName=<AppName>

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



<div align="center">

<br/>

Made with by **Samio Hasan**

[![TypeScript](https://img.shields.io/badge/Built%20with-TypeScript-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![MongoDB](https://img.shields.io/badge/Powered%20by-MongoDB-47A248?style=flat-square&logo=mongodb)](https://www.mongodb.com)
[![Express](https://img.shields.io/badge/Served%20by-Express-000000?style=flat-square&logo=express)](https://expressjs.com)

</div>
