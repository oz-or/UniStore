import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function addItemToWishlist(userId: string, productId: number) {
  const { data, error } = await supabase
    .from("wishlists")
    .insert([{ user_id: userId, product_id: productId }]);
  if (error) throw error;
  return data;
}

export async function removeItemFromWishlist(
  userId: string,
  productId: number
) {
  const { data, error } = await supabase
    .from("wishlists")
    .delete()
    .eq("user_id", userId)
    .eq("product_id", productId);
  if (error) throw error;
  return data;
}

// Fetch all wishlist items for a user
export async function getWishlist(userId: string) {
  const { data, error } = await supabase
    .from("wishlists")
    .select("product_id, products(*)")
    .eq("user_id", userId);

  if (error) throw error;
  // Map to just the product objects
  return data.map((row: any) => row.products);
}

export async function isItemInWishlist(userId: string, productId: number) {
  const { data, error } = await supabase
    .from("wishlists")
    .select("id")
    .eq("user_id", userId)
    .eq("product_id", productId)
    .maybeSingle(); // Use maybeSingle for 0 or 1 row

  if (error && error.code !== "PGRST116") throw error;
  return !!data;
}

export async function clearWishlist(userId: string) {
  const { error } = await supabase
    .from("wishlists")
    .delete()
    .eq("user_id", userId);
  if (error) throw error;
}
