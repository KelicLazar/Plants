# 🚀 Nuxt Starter Theme

A modern Nuxt 3 starter theme designed for eCommerce-style projects, using:

## 🧱 Tech Stack

- **Nuxt 3**
- **Drizzle ORM**
- **Turso (SQLite)**
- **Tailwind CSS + DaisyUI**
- **BetterAuth** for authentication
- **Zod** for validation

Comes with ready-to-use components like:

- Header
- Hero
- Carousel
- Theme Switcher
- Footer

> A perfect foundation for your next eCommerce site.

---

## ⚙️ Getting Started

### 1. Clone the Repo & Install Dependencies

```bash
git clone https://github.com/your-username/your-nuxt-starter.git
cd your-nuxt-starter
npm install
```

Optional: To make sure you're using the latest versions:

```bash
npm update
```

---

### 2. Setup Environment Variables

Copy the `.env.example` file and rename it to `.env`:

```bash
cp .env.example .env
```

Update the environment variables inside `.env` as needed.

---
### 🔐 Type-Safe Environment Variable Validation

This project includes **type-safe environment variable validation** implemented in:

- `lib/env.ts`
- `lib/try-parse-env.ts`

The `lib/env.ts` file defines a **Zod schema** describing all required environment variables and their types.  
It uses the helper function from `lib/try-parse-env.ts` to **validate** that all required variables are present and correctly typed.

If any required environment variable is missing or invalid, the validation **throws a descriptive error** listing the missing variables.

The `lib/env.ts` file is imported in `nuxt.config.ts`, so this validation runs **automatically** on `npm run dev` or `npm run build`.  
This means you get immediate feedback and won’t accidentally start your app with missing environment variables in production.

### 3. Define Your Database Schema

Schema files live in:

```
lib/db/schema/
```

You can start by duplicating or editing the example files for:

- `product`
- `category`

Add your own tables as needed, following Drizzle’s schema syntax.

---

### 4. (Optional) Configure Authentication

BetterAuth is pre-configured with Google login.  
You can optionally configure:

- Admin plugin access
- Role-based access

Edit the auth logic in:

```
lib/db/auth.ts
```

---

### 5. Generate Drizzle Migrations

Important: Before generating new migrations, remove the existing lib/db/migrations/ folder if it exists.
This folder is included in the starter theme for demo purposes, and deleting it ensures your migrations are fresh and up to date.

After defining your schema, generate the migrations:

```bash
npx drizzle-kit generate
```

This will create a `migrations/` folder inside `lib/db/`.

---

### 6. Setup Local Database (Turso)

> ⚠️ **Windows users:** Run this step inside **WSL**.

Start your local Turso dev database:

```bash
npm run dev:db
```

Then apply the migration:

```bash
npx drizzle-kit migrate
```

---

### 7. (Optional) View Tables in Studio

Visualize your database tables using Drizzle Studio:

```bash
npx drizzle-kit studio
```

---

### 8. Start Nuxt Development Server

Run Nuxt in development mode:

```bash
npm run dev
```

---

## 🎨 Included UI

This starter includes a working front page demo using DaisyUI:

- ✅ Header with theme switcher  
- ✅ Hero section  
- ✅ Carousel component  
- ✅ Footer  

All built with Tailwind CSS + DaisyUI conventions.

---

## 🔜 Coming Soon

- 📦 State management with **Pinia**