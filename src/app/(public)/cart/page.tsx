"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";

export default function CartPage() {
  const cart = useCartStore();
  return <div className="mx-auto max-w-5xl px-4 py-10"><h1 className="text-4xl font-black">Shopping cart</h1><Card className="mt-8"><CardHeader><CardTitle>Your items</CardTitle></CardHeader><CardContent className="space-y-4">{cart.items.length === 0 ? <p>Your cart is empty.</p> : cart.items.map((item) => <div key={item.id} className="flex items-center justify-between rounded-2xl bg-rose-50 p-4"><div><strong>{item.type === "PRODUCT" ? item.product.name : "Custom bouquet"}</strong><p className="text-sm text-[var(--muted-foreground)]">{formatCurrency(item.unitPrice)} each</p></div><input aria-label="Quantity" className="w-20 rounded-xl border p-2" type="number" min={1} value={item.quantity} onChange={(event) => cart.updateQuantity(item.id, Number(event.target.value))} /><Button variant="ghost" onClick={() => cart.removeItem(item.id)}>Remove</Button></div>)}<div className="flex justify-between border-t pt-4 text-xl font-bold"><span>Subtotal</span><span>{formatCurrency(cart.subtotal())}</span></div><Button asChild className="w-full"><Link href="/checkout">Checkout</Link></Button></CardContent></Card></div>;
}
