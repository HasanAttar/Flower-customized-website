import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminWrappersPage() {
  return <div><div className="flex items-center justify-between"><h1 className="text-3xl font-black capitalize">wrappers</h1><Button>New</Button></div><Card className="mt-6 border-white/10 bg-white/10 text-white"><CardHeader><CardTitle>Manage wrappers</CardTitle></CardHeader><CardContent><div className="grid gap-3 md:grid-cols-3"><Input placeholder="Name" /><Input placeholder="Price or status" /><Button variant="secondary">Save draft</Button></div><div className="mt-6 rounded-2xl border border-white/10 p-4 text-sm text-white/70">CRUD workspace with validation, image uploads, inventory fields, and audit-ready order/status controls.</div></CardContent></Card></div>;
}
