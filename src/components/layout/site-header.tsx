import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const links = [{ href: "/shop", label: "Shop" }, { href: "/builder", label: "Custom Builder" }, { href: "/track", label: "Track Order" }, { href: "/admin", label: "Admin" }];
  return <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-white/90 backdrop-blur"><div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4"><Link href="/" className="text-xl font-black text-rose-700">Bloom Studio</Link><nav className="hidden gap-6 text-sm font-medium md:flex">{links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}</nav><Button asChild size="sm"><Link href="/cart"><ShoppingBag size={16} />Cart</Link></Button></div></header>;
}
