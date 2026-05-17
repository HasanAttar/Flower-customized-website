import { NextResponse } from "next/server";
import { calculateOrderTotal } from "@/lib/domain/pricing";
import { checkoutSchema } from "@/lib/validations/shop";
import { sendAdminOrderAlert, sendOrderConfirmation } from "@/lib/email/resend";

export async function POST(request: Request) {
  const parsed = checkoutSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const subtotal = parsed.data.items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const deliveryFee = 12;
  const total = calculateOrderTotal(subtotal, deliveryFee);
  const orderNumber = `BS-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 99999)).padStart(5, "0")}`;
  await Promise.all([sendOrderConfirmation({ to: parsed.data.email, orderNumber, total }), sendAdminOrderAlert({ orderNumber, total })]);
  return NextResponse.json({ orderNumber, status: "PENDING", paymentMethod: "COD", paymentStatus: "PENDING", subtotal, deliveryFee, total }, { status: 201 });
}
