"use client";

import { accessories, fillers, flowerOptions, ribbons, wrappers } from "@/lib/data/catalog";
import { calculateBouquetPrice } from "@/lib/domain/pricing";
import { formatCurrency } from "@/lib/utils";
import { useBuilderStore } from "@/store/builder-store";
import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BouquetPreview } from "./bouquet-preview";

export function BuilderWorkspace() {
  const builder = useBuilderStore();
  const addDesign = useCartStore((state) => state.addDesign);
  const breakdown = calculateBouquetPrice(builder);
  const design = { flowers: builder.flowers, wrapperId: builder.wrapperId, ribbonId: builder.ribbonId, fillerIds: builder.fillerIds, accessories: builder.accessories, subtotal: breakdown.subtotal };

  async function saveDesign() {
    await fetch("/api/saved-designs", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(design) });
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-6">
        <Card><CardHeader><CardTitle>1. Select flowers</CardTitle></CardHeader><CardContent className="grid gap-3 sm:grid-cols-2">
          {flowerOptions.map((flower) => {
            const current = builder.flowers.find((item) => item.flowerVariantId === flower.id)?.quantity ?? 0;
            return <label key={flower.id} className="rounded-2xl border border-[var(--border)] bg-white p-4"><span className="font-semibold">{flower.color} {flower.flowerName}</span><span className="block text-sm text-[var(--muted-foreground)]">{formatCurrency(flower.price)} each</span><input className="mt-3 w-full accent-rose-600" type="number" min={0} value={current} onChange={(event) => Number(event.target.value) > 0 ? builder.setFlower({ flowerVariantId: flower.id, quantity: Number(event.target.value) }) : builder.removeFlower(flower.id)} /></label>;
          })}
        </CardContent></Card>
        <Card><CardHeader><CardTitle>2–5. Style and extras</CardTitle></CardHeader><CardContent className="grid gap-5 md:grid-cols-2">
          <OptionGroup title="Wrapping" items={wrappers} selected={builder.wrapperId} onSelect={builder.setWrapper} />
          <OptionGroup title="Ribbon" items={ribbons} selected={builder.ribbonId} onSelect={builder.setRibbon} />
          <CheckboxGroup title="Fillers" items={fillers} selected={builder.fillerIds} onToggle={builder.toggleFiller} />
          <div><h3 className="mb-2 font-semibold">Accessories</h3>{accessories.map((item) => <label key={item.id} className="mb-2 flex items-center justify-between rounded-xl bg-rose-50 p-3 text-sm"><span>{item.name} · {formatCurrency(item.price)}</span><input type="number" min={0} className="w-16 rounded-lg border p-1" onChange={(event) => builder.setAccessory({ accessoryId: item.id, quantity: Number(event.target.value) })} /></label>)}</div>
        </CardContent></Card>
      </div>
      <aside className="sticky top-6 h-fit space-y-4"><BouquetPreview design={design} /><Card><CardHeader><CardTitle>6. Review</CardTitle></CardHeader><CardContent><ul className="space-y-2 text-sm">{breakdown.lines.map((line) => <li key={line.label} className="flex justify-between"><span>{line.label}</span><strong>{formatCurrency(line.amount)}</strong></li>)}</ul><div className="mt-4 flex justify-between border-t pt-4 text-xl font-bold"><span>Total</span><span>{formatCurrency(breakdown.subtotal)}</span></div><div className="mt-5 grid gap-2"><Button onClick={saveDesign} variant="outline">Save design</Button><Button onClick={() => addDesign(design)}>Add custom bouquet to cart</Button></div></CardContent></Card></aside>
    </div>
  );
}

function OptionGroup({ title, items, selected, onSelect }: { title: string; items: Array<{ id: string; name: string; price: number }>; selected?: string; onSelect: (id: string) => void }) {
  return <div><h3 className="mb-2 font-semibold">{title}</h3>{items.map((item) => <button key={item.id} type="button" onClick={() => onSelect(item.id)} className={`mb-2 block w-full rounded-xl p-3 text-left text-sm ${selected === item.id ? "bg-rose-600 text-white" : "bg-rose-50"}`}>{item.name} · {formatCurrency(item.price)}</button>)}</div>;
}
function CheckboxGroup({ title, items, selected, onToggle }: { title: string; items: Array<{ id: string; name: string; price: number }>; selected: string[]; onToggle: (id: string) => void }) {
  return <div><h3 className="mb-2 font-semibold">{title}</h3>{items.map((item) => <label key={item.id} className="mb-2 flex items-center gap-2 rounded-xl bg-rose-50 p-3 text-sm"><input type="checkbox" checked={selected.includes(item.id)} onChange={() => onToggle(item.id)} />{item.name} · {formatCurrency(item.price)}</label>)}</div>;
}
