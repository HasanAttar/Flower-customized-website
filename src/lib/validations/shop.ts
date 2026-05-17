import { z } from "zod";

export const quantitySchema = z.number().int().positive().max(99);
export const bouquetDesignSchema = z.object({
  flowers: z.array(z.object({ flowerVariantId: z.string().min(1), quantity: quantitySchema })).min(1, "Choose at least one flower."),
  wrapperId: z.string().optional(),
  ribbonId: z.string().optional(),
  fillerIds: z.array(z.string()),
  accessories: z.array(z.object({ accessoryId: z.string().min(1), quantity: quantitySchema })),
  subtotal: z.number().nonnegative(),
  previewImageUrl: z.string().url().optional()
});

export const checkoutSchema = z.object({
  customerName: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(6).max(30),
  deliveryDate: z.string().min(10),
  deliveryTime: z.string().min(4),
  notes: z.string().max(500).optional(),
  shippingAddress: z.object({
    country: z.string().min(2), city: z.string().min(2), area: z.string().min(2), street: z.string().min(2), building: z.string().min(1)
  }),
  items: z.array(z.object({ itemType: z.enum(["PRODUCT", "CUSTOM_BOUQUET"]), productId: z.string().optional(), design: bouquetDesignSchema.optional(), quantity: quantitySchema, unitPrice: z.number().nonnegative() })).min(1),
  couponCode: z.string().max(40).optional()
});

export const adminItemSchema = z.object({
  name: z.string().min(2).max(120),
  price: z.number().nonnegative().optional(),
  stock: z.number().int().nonnegative().optional(),
  active: z.boolean().default(true)
});
