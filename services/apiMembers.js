import supabase from "./supabase";

// The getMembers function retrieves all the members from the members table in the database.
export async function getMembers() {
  let { data, error } = await supabase.from("members").select("*");

  if (error) {
    console.error(error);
    throw new Error("The list of members could not be loaded");
  }

  return data;
}
