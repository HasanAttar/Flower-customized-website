import Image from "next/image";
import { notFound } from "next/navigation";
import { products } from "@/lib/data/catalog";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function generateStaticParams() { return products.map((product) => ({ slug: product.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const product = products.find((item) => item.slug === slug); return { title: product?.name ?? "Product" }; }
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();
  return <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 lg:grid-cols-2"><div className="relative min-h-[520px] overflow-hidden rounded-[2rem]"><Image src={product.imageUrl} alt={product.name} fill className="object-cover" /></div><div><p className="font-semibold text-rose-700">{product.category}</p><h1 className="mt-3 text-5xl font-black">{product.name}</h1><p className="mt-5 text-lg text-[var(--muted-foreground)]">{product.description}</p><p className="mt-6 text-3xl font-black">{formatCurrency(product.salePrice ?? product.price)}</p><p className="mt-2 text-sm">{product.stock} available</p><Button className="mt-8" size="lg">Add to cart</Button></div></div>;
}
