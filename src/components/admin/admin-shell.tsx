import Link from "next/link";

const nav = ["analytics", "products", "categories", "flowers", "wrappers", "ribbons", "fillers", "accessories", "inventory", "orders", "coupons", "settings"];
export function AdminShell({ children }: { children: React.ReactNode }) { return <div className="min-h-screen bg-slate-950 text-white"><aside className="fixed hidden h-full w-64 border-r border-white/10 p-6 lg:block"><h1 className="text-2xl font-black">Bloom Admin</h1><nav className="mt-8 grid gap-2">{nav.map((item) => <Link className="rounded-xl px-3 py-2 capitalize hover:bg-white/10" key={item} href={`/admin/${item}`}>{item}</Link>)}</nav></aside><main className="p-4 lg:ml-64 lg:p-8">{children}</main></div>; }
