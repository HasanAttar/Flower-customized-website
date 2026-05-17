export type Role = "SUPER_ADMIN" | "STAFF" | "CUSTOMER";
export type OrderStatus = "PENDING" | "CONFIRMED" | "PREPARING" | "OUT_FOR_DELIVERY" | "DELIVERED" | "CANCELLED";

export type CatalogProduct = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  imageUrl: string;
  category: string;
  featured?: boolean;
  stock: number;
};

export type BuilderOption = { id: string; name: string; imageUrl: string; price: number; layerOrder: number; color?: string; stock?: number };
export type FlowerOption = BuilderOption & { basePrice: number; additionalPrice: number; flowerName: string };
export type FlowerSelection = { flowerVariantId: string; quantity: number };
export type AccessorySelection = { accessoryId: string; quantity: number };

export type BouquetDesign = {
  flowers: FlowerSelection[];
  wrapperId?: string;
  ribbonId?: string;
  fillerIds: string[];
  accessories: AccessorySelection[];
  subtotal: number;
  previewImageUrl?: string;
};

export type CheckoutPayload = {
  customerName: string;
  email: string;
  phone: string;
  deliveryDate: string;
  deliveryTime: string;
  notes?: string;
  shippingAddress: { country: string; city: string; area: string; street: string; building: string };
  items: Array<{ itemType: "PRODUCT" | "CUSTOM_BOUQUET"; productId?: string; design?: BouquetDesign; quantity: number; unitPrice: number }>;
  couponCode?: string;
};
