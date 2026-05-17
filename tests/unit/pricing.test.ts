import { describe, expect, it } from "vitest";
import { calculateBouquetPrice, calculateOrderTotal } from "../../src/lib/domain/pricing";

describe("pricing engine", () => {
  it("calculates flowers, wrapper, ribbon, fillers, and accessories", () => {
    const result = calculateBouquetPrice({ flowers: [{ flowerVariantId: "rose-red", quantity: 6 }], wrapperId: "kraft", ribbonId: "satin-rose", fillerIds: ["eucalyptus"], accessories: [{ accessoryId: "card", quantity: 1 }] });
    expect(result.subtotal).toBe(47);
  });
  it("applies delivery fee and discounts without negative totals", () => {
    expect(calculateOrderTotal(25, 10, 5)).toBe(30);
    expect(calculateOrderTotal(10, 0, 100)).toBe(0);
  });
});
