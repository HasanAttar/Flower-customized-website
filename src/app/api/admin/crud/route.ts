import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { adminItemSchema } from "@/lib/validations/shop";
import { canAccessAdmin } from "@/lib/security/rbac";

export async function POST(request: Request) {
  const session = await auth();
  if (!canAccessAdmin(session?.user?.role)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const parsed = adminItemSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  return NextResponse.json({ id: crypto.randomUUID(), ...parsed.data }, { status: 201 });
}
