import { accessories, fillers, flowerOptions, ribbons, wrappers } from "@/lib/data/catalog";
import type { BouquetDesign } from "@/types/shop";

export type PriceLine = { label: string; amount: number };
export type PriceBreakdown = { lines: PriceLine[]; subtotal: number };

export function calculateBouquetPrice(design: Pick<BouquetDesign, "flowers" | "wrapperId" | "ribbonId" | "fillerIds" | "accessories">): PriceBreakdown {
  const lines: PriceLine[] = [];
  for (const selection of design.flowers) {
    const option = flowerOptions.find((item) => item.id === selection.flowerVariantId);
    if (!option || selection.quantity <= 0) continue;
    lines.push({ label: `${selection.quantity}× ${option.color} ${option.flowerName}`, amount: option.price * selection.quantity });
  }
  const wrapper = wrappers.find((item) => item.id === design.wrapperId);
  if (wrapper) lines.push({ label: wrapper.name, amount: wrapper.price });
  const ribbon = ribbons.find((item) => item.id === design.ribbonId);
  if (ribbon) lines.push({ label: ribbon.name, amount: ribbon.price });
  for (const fillerId of design.fillerIds) {
    const filler = fillers.find((item) => item.id === fillerId);
    if (filler) lines.push({ label: filler.name, amount: filler.price });
  }
  for (const selection of design.accessories) {
    const accessory = accessories.find((item) => item.id === selection.accessoryId);
    if (!accessory || selection.quantity <= 0) continue;
    lines.push({ label: `${selection.quantity}× ${accessory.name}`, amount: accessory.price * selection.quantity });
  }
  const subtotal = Number(lines.reduce((sum, line) => sum + line.amount, 0).toFixed(2));
  return { lines, subtotal };
}

export function calculateOrderTotal(subtotal: number, deliveryFee: number, discount = 0) {
  return Number(Math.max(subtotal + deliveryFee - discount, 0).toFixed(2));
}
