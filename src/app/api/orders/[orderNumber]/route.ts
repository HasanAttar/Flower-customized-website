import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: Promise<{ orderNumber: string }> }) {
  const { orderNumber } = await params;
  return NextResponse.json({ orderNumber, status: "PREPARING", timeline: ["PENDING", "CONFIRMED", "PREPARING"] });
}
