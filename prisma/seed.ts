import { hash } from "bcryptjs";
import { prisma } from "../src/lib/prisma/client";
import { categories, products } from "../src/lib/data/catalog";
import { slugify } from "../src/lib/utils";

async function main() {
  await prisma.user.upsert({ where: { email: process.env.ADMIN_EMAIL ?? "owner@example.com" }, update: {}, create: { email: process.env.ADMIN_EMAIL ?? "owner@example.com", name: "Store Owner", role: "SUPER_ADMIN", passwordHash: await hash("ChangeMe123!", 12) } });
  for (const category of categories) await prisma.category.upsert({ where: { slug: category.slug }, update: {}, create: { name: category.name, slug: category.slug } });
  for (const product of products) {
    const category = await prisma.category.findUniqueOrThrow({ where: { slug: slugify(product.category) } });
    await prisma.product.upsert({ where: { slug: product.slug }, update: {}, create: { categoryId: category.id, name: product.name, slug: product.slug, description: product.description, price: product.price, salePrice: product.salePrice, stock: product.stock, featured: Boolean(product.featured), images: { create: [{ imageUrl: product.imageUrl }] } } });
  }
}

main().finally(async () => prisma.$disconnect());
