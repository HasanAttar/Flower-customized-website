"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { checkoutSchema } from "@/lib/validations/shop";
import { calculateOrderTotal } from "@/lib/domain/pricing";
import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";

type FormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const cart = useCartStore();
  const subtotal = cart.subtotal();
  const total = calculateOrderTotal(subtotal, 12, 0);
  const form = useForm<FormValues>({ resolver: zodResolver(checkoutSchema), defaultValues: { customerName: "", email: "", phone: "", deliveryDate: "", deliveryTime: "09:00", shippingAddress: { country: "US", city: "", area: "", street: "", building: "" }, items: [] } });
  async function onSubmit(values: FormValues) {
    const items = cart.items.map((item) => item.type === "PRODUCT" ? { itemType: "PRODUCT" as const, productId: item.product.id, quantity: item.quantity, unitPrice: item.unitPrice } : { itemType: "CUSTOM_BOUQUET" as const, design: item.design, quantity: item.quantity, unitPrice: item.unitPrice });
    await fetch("/api/orders", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...values, items }) });
    cart.clear();
  }
  const field = (name: keyof FormValues | "shippingAddress.city" | "shippingAddress.area" | "shippingAddress.street" | "shippingAddress.building", label: string, type = "text") => <div><Label>{label}</Label><Input type={type} {...form.register(name as keyof FormValues)} /></div>;
  return <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[1fr_360px]"><Card><CardHeader><CardTitle>Guest checkout</CardTitle></CardHeader><CardContent className="grid gap-4 md:grid-cols-2">{field("customerName", "Name")}{field("email", "Email", "email")}{field("phone", "Phone")}{field("deliveryDate", "Delivery date", "date")}{field("deliveryTime", "Delivery time", "time")}{field("shippingAddress.city", "City")}{field("shippingAddress.area", "Area")}{field("shippingAddress.street", "Street")}{field("shippingAddress.building", "Building")}</CardContent></Card><Card className="h-fit"><CardHeader><CardTitle>Cash on Delivery</CardTitle></CardHeader><CardContent><p className="text-sm text-[var(--muted-foreground)]">Pay the driver when your order arrives.</p><div className="mt-5 space-y-2"><div className="flex justify-between"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div><div className="flex justify-between"><span>Delivery</span><span>{formatCurrency(12)}</span></div><div className="flex justify-between border-t pt-3 text-xl font-bold"><span>Total</span><span>{formatCurrency(total)}</span></div></div><Button className="mt-6 w-full" type="submit">Place order</Button></CardContent></Card></form>;
}
