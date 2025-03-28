import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import Profile from "@/components/account/Profile";

export default async function PrivatePage() {

  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    console.error("Error fetching user:", error);
    redirect("/login");
  }

  return (
    <main>
      <Profile />
    </main>
  );
}
