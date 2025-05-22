"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import Stripe from "stripe";

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

export const updateCartItemQuantity = async (id: number, quantity: number) => {
  const supabase = await createClient(); // Ensure the client is created properly

  const { error } = await supabase
    .from("cart_items") // Ensure this is the correct table name
    .update({ quantity }) // Ensure "quantity" is the correct column name
    .eq("id", id); // Ensure "id" is the correct column for identifying the item

  if (error) {
    console.error("Error updating cart item quantity:", error.message);
    throw new Error("Failed to update cart item quantity.");
  }
};

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

/* Coupon validation */

export async function validateCoupon(couponCode: string, subtotal: number) {
  const supabase = await createClient();
  try {
    // Query the database for the coupon code
    const { data: coupon, error } = await supabase
      .from("coupons")
      .select("*")
      .eq("code", couponCode)
      .single();

    if (error || !coupon) {
      return { valid: false, error: "Invalid coupon code." };
    }

    if (coupon.expires_at && new Date(coupon.expires_at) < new Date()) {
      return { valid: false, error: "This coupon has expired." };
    }

    if (subtotal >= 400) {
      return {
        valid: false,
        error: "Coupon is only valid for orders below $400.",
      };
    }

    // Return the discount percentage if the coupon is valid
    return { valid: true, discount: coupon.discount };
  } catch (err) {
    console.error("Error validating coupon:", err);
    return {
      valid: false,
      error: "An error occurred while validating the coupon.",
    };
  }
}

/* Stripe */

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
});

export async function createPaymentIntent(amount: number) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Amount in cents
      currency: "usd",
      payment_method_types: ["card"],
    });

    return { clientSecret: paymentIntent.client_secret };
  } catch (error) {
    console.error("Error creating payment intent:", error);
    throw new Error("Failed to create payment intent.");
  }
}

/* Saving billing details into public.profiles - billing_details*/
export const saveBillingDetailsToProfile = async (
  userId: string,
  billingDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    address: string;
    apartment: string;
  }
) => {
  const supabase = await createClient();
  try {
    const { error } = await supabase
      .from("profiles")
      .update({
        billing_details: billingDetails, // Only this, not address/city/etc.
      })
      .eq("id", userId);

    if (error) {
      throw new Error(error.message);
    }

    console.log("Billing details saved successfully!");
  } catch (err) {
    console.error("Error saving billing details:", err);
    throw err;
  }
};

/* Placing Order */
export const placeOrder = async (
  userId: string,
  cartItems: {
    product_id: string;
    quantity: number;
    price: number;
    name: string;
    img: string;
    // You can add other fields if needed, e.g. name, img, etc.
  }[],
  total: number,
  paymentOption: string
) => {
  const supabase = await createClient();

  try {
    // Insert the order with the items array as JSONB
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert([
        {
          user_id: userId,
          total: total,
          status: "Ordered",
          items: cartItems, // Store the items as JSONB
          payment_option: paymentOption,
        },
      ])
      .select()
      .single();

    if (orderError) {
      throw new Error(orderError.message);
    }

    // Clear the cart for the user
    const { error: clearCartError } = await supabase
      .from("cart_items")
      .delete()
      .eq("user_id", userId);

    if (clearCartError) {
      throw new Error(clearCartError.message);
    }

    return order.id;
  } catch (error) {
    console.error("Error placing order:", error);
    throw error;
  }
};
