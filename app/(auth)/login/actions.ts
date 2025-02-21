"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { supabase } from "@/utils/supabase/client";

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs

  const { user, error } = await supabase.auth.signInWithPassword({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (error) {
    console.error("Error logging in:", error);

    /* return null; */
    // Return null or handle the error as needed
  } else {
    console.log("User logged in:", user);

    revalidatePath("/account");
    redirect("/account");
  }
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: {
        first_name: formData.get("firstName") as string,
        last_name: formData.get("lastName") as string,
      },
    },
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function logout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Error signing out:", error);
  }

  revalidatePath("/");
  redirect("/login");
}

export async function addItemToCart(
  userId: string,
  item: {
    id: number;
    quantity: number;
    size: string;
  }
) {
  const supabase = await createClient();

  if (!userId || !item) {
    throw new Error("Missing userId or item");
  }

  // Fetch the product from the products table
  const { data: product, error: fetchError } = await supabase
    .from("products")
    .select("*")
    .eq("id", item.id)
    .single();

  const { data: description, error: detailsFetchError } = await supabase
    .from("products_details")
    .select("description")
    .eq("id", item.id)
    .single();

  if (detailsFetchError) {
    console.error("Error fetching product details:", detailsFetchError);
  } else {
    console.log("Product details:", description);
  }

  if (fetchError || !product) {
    throw new Error("Error fetching product or product not found");
  }

  // Insert the product into the cart_items table with the userId
  const { error: insertError } = await supabase.rpc("insert_item_into_cart", {
    user_id: userId,
    product_id: product.id,
    name: product.name,
    price: product.price,
    description: description,
    quantity: item.quantity,
    size: item.size,
    img: product.img,
  });

  if (insertError) {
    console.error("Error inserting item into cart:", insertError);
  } else {
    console.log("Item added to cart successfully");
  }

  return { message: "Item added to cart successfully" };
}

export async function getUserCartItems() {
  const supabase = await createClient();
  // Fetch the current session
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.error("Error fetching user:", userError);
    return []; // Return an empty array or handle the error as needed
  }

  if (!user) {
    console.log("User is not authenticated");
    return []; // Return an empty array if the user is not authenticated
  }

  // Get the user ID from the session
  const userId = user.id;

  // Query the cart_items table for rows with the same user_id
  const { data: cartItems, error: fetchError } = await supabase
    .from("cart_items")
    .select("*")
    .eq("user_id", userId);

  if (fetchError) {
    console.error("Error fetching cart items:", fetchError);
    return []; // Return an empty array or handle the error as needed
  }

  return cartItems; // Return the retrieved cart items
}

export async function deleteCartItem(itemId: number) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("cart_items")
    .delete()
    .eq("id", itemId);

  if (error) {
    console.error("Error deleting cart item:", error);
    alert("Failed to delete item. Please try again.");
  } else {
    console.log("Cart item deleted:", data);
    // Refresh the cart items display
    getUserCartItems();
  }
}

/* Uploading the user's profile picture */

/* I need functions: */
//  First that uploads(with the help of a supabase trigger function) to the storage bucket
//  Second that updates the user's profile picture column in the users table from the profile picture that was uploaded to the storage bucket
//  Third that fetches the user's profile picture from the storage bucket so that it can be displayed in the UI

//First function that uploads the received file to the storage bucket
