import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function getProductInStock(productId: number) {
  const { data, error } = await supabase
    .from("products")
    .select("in_stock")
    .eq("id", productId)
    .single();

  if (error) throw error;
  return data?.in_stock ?? false;
}
