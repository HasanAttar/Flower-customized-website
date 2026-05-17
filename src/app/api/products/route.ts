import { NextResponse } from "next/server";
import { products } from "@/lib/data/catalog";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.toLowerCase();
  const category = searchParams.get("category");
  return NextResponse.json(products.filter((product) => (!query || product.name.toLowerCase().includes(query)) && (!category || product.category.toLowerCase() === category.toLowerCase())));
}
