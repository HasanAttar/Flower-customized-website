import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function sendOrderConfirmation(input: { to: string; orderNumber: string; total: number }) {
  if (!resend) return { skipped: true };
  return resend.emails.send({ from: "Bloom Studio <orders@bloomstudio.example>", to: input.to, subject: `Order ${input.orderNumber} confirmed`, html: `<h1>Thank you for your order</h1><p>Your Cash on Delivery total is $${input.total.toFixed(2)}.</p>` });
}

export async function sendAdminOrderAlert(input: { orderNumber: string; total: number }) {
  if (!resend || !process.env.ADMIN_EMAIL) return { skipped: true };
  return resend.emails.send({ from: "Bloom Studio <orders@bloomstudio.example>", to: process.env.ADMIN_EMAIL, subject: `New order ${input.orderNumber}`, html: `<p>A new order totaling $${input.total.toFixed(2)} was placed.</p>` });
}
