"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { BouquetDesign, CatalogProduct } from "@/types/shop";

type CartItem = { id: string; type: "PRODUCT"; product: CatalogProduct; quantity: number; unitPrice: number } | { id: string; type: "CUSTOM_BOUQUET"; design: BouquetDesign; quantity: number; unitPrice: number };
type CartState = { items: CartItem[]; addProduct: (product: CatalogProduct) => void; addDesign: (design: BouquetDesign) => void; updateQuantity: (id: string, quantity: number) => void; removeItem: (id: string) => void; clear: () => void; subtotal: () => number };

export const useCartStore = create<CartState>()(persist((set, get) => ({
  items: [],
  addProduct: (product) => set((state) => ({ items: [...state.items, { id: crypto.randomUUID(), type: "PRODUCT", product, quantity: 1, unitPrice: product.salePrice ?? product.price }] })),
  addDesign: (design) => set((state) => ({ items: [...state.items, { id: crypto.randomUUID(), type: "CUSTOM_BOUQUET", design, quantity: 1, unitPrice: design.subtotal }] })),
  updateQuantity: (id, quantity) => set((state) => ({ items: state.items.map((item) => item.id === id ? { ...item, quantity } : item).filter((item) => item.quantity > 0) })),
  removeItem: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
  clear: () => set({ items: [] }),
  subtotal: () => Number(get().items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0).toFixed(2))
}), { name: "bloom-cart" }));
