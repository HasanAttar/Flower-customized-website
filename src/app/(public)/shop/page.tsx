import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/data/catalog";
import { formatCurrency } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function ShopPage() {
  return <div className="mx-auto max-w-7xl px-4 py-10"><h1 className="text-4xl font-black">Flower catalog</h1><div className="mt-6 grid gap-3 md:grid-cols-3"><Input placeholder="Search bouquets" /><Input placeholder="Filter by occasion" /><Input placeholder="Max price" type="number" /></div><div className="mt-8 grid gap-6 md:grid-cols-4">{products.map((product) => <Link key={product.id} href={`/products/${product.slug}`}><Card className="overflow-hidden"><div className="relative h-52"><Image src={product.imageUrl} alt={product.name} fill className="object-cover" /></div><CardContent className="pt-5"><h2 className="font-bold">{product.name}</h2><p className="text-sm text-[var(--muted-foreground)]">{product.category}</p><p className="mt-2 font-bold">{formatCurrency(product.salePrice ?? product.price)}</p></CardContent></Card></Link>)}</div></div>;
}
