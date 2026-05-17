import { BuilderWorkspace } from "@/components/bouquet-builder/builder-workspace";

export const metadata = { title: "Custom Bouquet Builder" };
export default function BuilderPage() { return <div className="mx-auto max-w-7xl px-4 py-10"><h1 className="text-4xl font-black">Custom bouquet builder</h1><p className="mt-3 text-[var(--muted-foreground)]">Layer transparent PNG assets with React Konva while pricing updates instantly.</p><div className="mt-8"><BuilderWorkspace /></div></div>; }
