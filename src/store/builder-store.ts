"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { calculateBouquetPrice } from "@/lib/domain/pricing";
import type { AccessorySelection, BouquetDesign, FlowerSelection } from "@/types/shop";

type BuilderState = BouquetDesign & {
  setFlower: (selection: FlowerSelection) => void;
  removeFlower: (flowerVariantId: string) => void;
  setWrapper: (wrapperId: string) => void;
  setRibbon: (ribbonId: string) => void;
  toggleFiller: (fillerId: string) => void;
  setAccessory: (selection: AccessorySelection) => void;
  reset: () => void;
};

const initial: BouquetDesign = { flowers: [{ flowerVariantId: "rose-red", quantity: 6 }], wrapperId: "kraft", ribbonId: "satin-rose", fillerIds: ["eucalyptus"], accessories: [], subtotal: 0 };
const withPrice = (design: BouquetDesign): BouquetDesign => ({ ...design, subtotal: calculateBouquetPrice(design).subtotal });

export const useBuilderStore = create<BuilderState>()(persist((set) => ({
  ...withPrice(initial),
  setFlower: (selection) => set((state) => withPrice({ ...state, flowers: [...state.flowers.filter((item) => item.flowerVariantId !== selection.flowerVariantId), selection] })),
  removeFlower: (flowerVariantId) => set((state) => withPrice({ ...state, flowers: state.flowers.filter((item) => item.flowerVariantId !== flowerVariantId) })),
  setWrapper: (wrapperId) => set((state) => withPrice({ ...state, wrapperId })),
  setRibbon: (ribbonId) => set((state) => withPrice({ ...state, ribbonId })),
  toggleFiller: (fillerId) => set((state) => withPrice({ ...state, fillerIds: state.fillerIds.includes(fillerId) ? state.fillerIds.filter((id) => id !== fillerId) : [...state.fillerIds, fillerId] })),
  setAccessory: (selection) => set((state) => withPrice({ ...state, accessories: [...state.accessories.filter((item) => item.accessoryId !== selection.accessoryId), selection] })),
  reset: () => set(withPrice(initial))
}), { name: "bloom-builder" }));
