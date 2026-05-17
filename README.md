# Bloom Studio

Production-oriented single-tenant flower shop e-commerce starter built with Next.js App Router, TypeScript strict mode, Tailwind CSS, shadcn/ui-style components, Prisma/PostgreSQL, Auth.js, Zustand, React Hook Form, Zod, React Konva, Cloudinary, and Resend.

## Features

- Public homepage, catalog, SEO metadata, product detail pages, cart, guest checkout, order tracking.
- Multi-step bouquet builder with flower/color/quantity, wrapper, ribbon, filler, and accessory selections.
- Real-time dynamic pricing and React Konva layered transparent PNG preview.
- Save custom bouquet designs and add custom bouquets to cart.
- Cash on Delivery checkout with delivery date/time scheduling.
- Admin dashboard sections for analytics, products, categories, flowers, wrappers, ribbons, fillers, accessories, inventory, orders, coupons, and settings.
- Prisma schema for users, catalog, configurable bouquet assets, carts, saved designs, orders, coupons, and settings.
- Auth.js credentials configuration with role-based admin authorization.
- Resend email notification helpers and Cloudinary upload route.
- Vitest unit tests and Playwright E2E starter.

## Getting started

1. Copy `.env.example` to `.env` and fill in PostgreSQL, Auth.js, Cloudinary, and Resend values.
2. Install dependencies with `npm install`.
3. Run `npx prisma migrate dev && npm run db:seed`.
4. Start development with `npm run dev`.
