import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export default async function PrivatePage() {
  //TODO: Display the first name, the last name the email and the address programmatically(in the placeholder of the Input field)

  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return <section id="accountPage"></section>;
}
