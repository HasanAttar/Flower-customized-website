import type { BuilderOption, CatalogProduct, FlowerOption } from "@/types/shop";

export const categories = [
  { id: "birthday", name: "Birthday", slug: "birthday" },
  { id: "anniversary", name: "Anniversary", slug: "anniversary" },
  { id: "wedding", name: "Wedding", slug: "wedding" },
  { id: "sympathy", name: "Sympathy", slug: "sympathy" }
];

export const products: CatalogProduct[] = [
  { id: "p1", slug: "rose-radiance", name: "Rose Radiance", description: "A classic red rose bouquet wrapped with satin ribbon.", price: 74, salePrice: 65, imageUrl: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=1200", category: "Birthday", featured: true, stock: 18 },
  { id: "p2", slug: "pastel-dream", name: "Pastel Dream", description: "Soft seasonal blooms in blush, cream, and lavender.", price: 88, imageUrl: "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?q=80&w=1200", category: "Wedding", featured: true, stock: 10 },
  { id: "p3", slug: "sunshine-market", name: "Sunshine Market", description: "Cheerful sunflowers, daisies, and greenery for any celebration.", price: 58, imageUrl: "https://images.unsplash.com/photo-1487530903081-59e0e3331512?q=80&w=1200", category: "Anniversary", stock: 22 },
  { id: "p4", slug: "serene-white", name: "Serene White", description: "Elegant white lilies and roses for thoughtful moments.", price: 96, imageUrl: "https://images.unsplash.com/photo-1468327768560-75b778cbb551?q=80&w=1200", category: "Sympathy", stock: 7 }
];

const asset = (name: string) => `/images/builder/${name}.svg`;

export const flowerOptions: FlowerOption[] = [
  { id: "rose-red", name: "Red", flowerName: "Rose", imageUrl: asset("rose-red"), price: 4, basePrice: 3.5, additionalPrice: 0.5, layerOrder: 22, color: "Red", stock: 120 },
  { id: "rose-pink", name: "Pink", flowerName: "Rose", imageUrl: asset("rose-pink"), price: 4, basePrice: 3.5, additionalPrice: 0.5, layerOrder: 24, color: "Pink", stock: 98 },
  { id: "tulip-yellow", name: "Yellow", flowerName: "Tulip", imageUrl: asset("tulip-yellow"), price: 3.25, basePrice: 3, additionalPrice: 0.25, layerOrder: 23, color: "Yellow", stock: 140 },
  { id: "lily-white", name: "White", flowerName: "Lily", imageUrl: asset("lily-white"), price: 5.5, basePrice: 5, additionalPrice: 0.5, layerOrder: 25, color: "White", stock: 55 }
];

export const wrappers: BuilderOption[] = [
  { id: "kraft", name: "Kraft Paper", imageUrl: asset("wrapper-kraft"), price: 8, layerOrder: 10, color: "Natural" },
  { id: "blush", name: "Blush Wrap", imageUrl: asset("wrapper-blush"), price: 10, layerOrder: 10, color: "Blush" }
];
export const ribbons: BuilderOption[] = [
  { id: "satin-rose", name: "Rose Satin", imageUrl: asset("ribbon-rose"), price: 5, layerOrder: 42, color: "Rose" },
  { id: "ivory", name: "Ivory Silk", imageUrl: asset("ribbon-ivory"), price: 6, layerOrder: 42, color: "Ivory" }
];
export const fillers: BuilderOption[] = [
  { id: "eucalyptus", name: "Eucalyptus", imageUrl: asset("filler-eucalyptus"), price: 6, layerOrder: 31 },
  { id: "babys-breath", name: "Baby's Breath", imageUrl: asset("filler-babys-breath"), price: 5, layerOrder: 32 }
];
export const accessories: BuilderOption[] = [
  { id: "card", name: "Greeting Card", imageUrl: asset("accessory-card"), price: 4, layerOrder: 50, stock: 200 },
  { id: "chocolates", name: "Artisan Chocolates", imageUrl: asset("accessory-chocolates"), price: 14, layerOrder: 51, stock: 42 },
  { id: "teddy", name: "Mini Teddy Bear", imageUrl: asset("accessory-teddy"), price: 18, layerOrder: 52, stock: 20 }
];
