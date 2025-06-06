import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server"; // adjust path as needed

export async function GET(req: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");

  if (!name) {
    return NextResponse.json({}, { status: 400 });
  }

  const { data, error } = await supabase
    .from("products")
    .select("id, name, price, img")
    .ilike("name", `%${name}%`)
    .single();

  if (error || !data) {
    return NextResponse.json({}, { status: 404 });
  }

  return NextResponse.json(data);
}
