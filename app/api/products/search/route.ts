import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server"; // adjust path as needed

export async function GET(req: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";

  if (!q) {
    return NextResponse.json([]);
  }

  // Simple case-insensitive search on name and description
  const { data, error } = await supabase
    .from("products")
    .select("id, name, price, img")
    .ilike("name", `%${q}%`)
    .limit(10);

  if (error) {
    return NextResponse.json([], { status: 500 });
  }

  return NextResponse.json(data || []);
}
