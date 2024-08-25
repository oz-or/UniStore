import supabase from "./supabase";

// The getProducts function retrieves all the products from the products table in the database.
export async function getProducts() {
  let { data, error } = await supabase.from("products").select("*");

  if (error) {
    console.error(error);
    throw new Error("The products could not be loaded");
  }

  return data;
}

// The getProductsByCategory function retrieves all the products from the products table in the database that match the category passed as an argument.
export async function getProductsByCategory(category) {
  let { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", category);

  if (error) {
    console.error(error);
    throw new Error("The products selected by category could not be loaded");
  }

  return data;
}

// The getProductById function retrieves a product from the products table in the database that matches the id passed as an argument.
export async function getProductById(id) {
  let { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("The product could not be loaded");
  }

  return data;
}

// The getBestSellingProducts function retrieves the 16 products with the highest sales from the products table in the database.
export async function getBestSellingProducts() {
  let { data, error } = await supabase
    .from("products")
    .select("*")
    .order("sales", { ascending: false })
    .range(0, 16);

  if (error) {
    console.error(error);
    throw new Error("The best selling products could not be loaded");
  }

  return data;
}

// The getProductsBySearch function retrieves all the products from the products table in the database that match the search term passed as an argument.
export async function getProductsBySearch(search) {
  let { data, error } = await supabase
    .from("products")
    .select("*")
    .textSearch("name", search);

  if (error) {
    console.error(error);
    throw new Error("The products selected by search could not be loaded");
  }

  return data;
}

// The getFlashSaleProducts function retrieves all the products from the products table in the database that have the flash_sale column set to true.
export async function getFlashSaleProducts() {
  let { data, error } = await supabase
    .from("products")
    .select("*")
    .filter("discount", "gt", 0);

  if (error) {
    console.error(error);
    throw new Error("The flash sale products could not be loaded");
  }

  return data;
}

// The getNewProducts function retrieves the 16 newest products from the products table in the database.
export async function getNewProducts() {
  let { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })
    .range(0, 10);

  if (error) {
    console.error(error);
    throw new Error("The new products could not be loaded");
  }

  return data;
}
