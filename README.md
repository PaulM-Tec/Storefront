
# ABC Storefront (Full-Stack Technical Challenge)

A simple storefront with a lightweight backend. Built quickly with clean TypeScript, sensible dependencies, and clear structure.

## Stack & Rationale
- **Backend:** Express + TypeScript, `zod` for validation, in-memory cart keyed by `x-cart-id`/cookie.
- **Frontend:** React + Vite + TypeScript, state with **Zustand** (tiny & explicit), React Router for routing, CSS Modules for light styling.

## API
Base URL: `http://localhost:4000`

- `GET /products` → `Product[]`
- `GET /products/:id` → `Product` | 404
- `GET /cart` → returns current cart (creates one if missing)
- `POST /cart` → add item `{ productId, quantity }` → returns full cart
- `PATCH /cart` → replace quantities `{ items: [{ productId, quantity }] }` → returns cart

Errors are structured as `{ error, message?, issues? }` with appropriate HTTP status.

## Local Development
```bash
# Terminal 1 - backend
cd backend
npm install
npm run dev

# Terminal 2 - frontend
cd frontend
npm install
npm run dev
```
- Frontend: http://localhost:5173
- Backend: http://localhost:4000

> CORS is configured to allow the Vite dev server and expose `x-cart-id`.

## Decisions & Tradeoffs
- Prices as `number` in Rands for speed; in production I’d use integer cents to avoid FP issues.
- In-memory store keeps scope small. A real app would persist carts and validate stock atomically.
- Added a non-required `GET /cart` for UX so the client can hydrate on load.
- Avoided `@ts-ignore` by using Zod + types. If any appears, it will include a comment explaining why and a TODO to remove it.

## Project Scripts
- `backend`: `dev`, `build`, `start`, `test` (Jest + Supertest)
- `frontend`: `dev`, `build`, `preview`

## Future Enhancements (nice-to-haves)
- Filters (category, price range), search
- Toast feedback on add-to-cart
- Basic CI (Node 18/20, install/build/test)
- Minimal e2e smoke via Playwright
```
