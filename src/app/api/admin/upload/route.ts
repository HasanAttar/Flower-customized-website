import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { canAccessAdmin } from "@/lib/security/rbac";
import { uploadImage } from "@/lib/cloudinary/client";

export async function POST(request: Request) {
  const session = await auth();
  if (!canAccessAdmin(session?.user?.role)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { dataUri, folder } = await request.json();
  const result = await uploadImage(dataUri, folder);
  return NextResponse.json({ url: result.secure_url, publicId: result.public_id });
}
