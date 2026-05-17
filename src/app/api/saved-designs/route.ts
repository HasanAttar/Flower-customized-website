import { NextResponse } from "next/server";
import { bouquetDesignSchema } from "@/lib/validations/shop";
import { calculateBouquetPrice } from "@/lib/domain/pricing";

export async function POST(request: Request) {
  const parsed = bouquetDesignSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const subtotal = calculateBouquetPrice(parsed.data).subtotal;
  return NextResponse.json({ id: crypto.randomUUID(), ...parsed.data, subtotal }, { status: 201 });
}
