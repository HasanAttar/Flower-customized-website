import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function TrackPage() {
  return <div className="mx-auto max-w-2xl px-4 py-16"><h1 className="text-4xl font-black">Track your order</h1><p className="mt-3 text-[var(--muted-foreground)]">Enter your order number to view statuses from pending to delivered.</p><form className="mt-8 flex gap-3"><Input name="orderNumber" placeholder="BS-2026-0001" /><Button>Track</Button></form></div>;
}
