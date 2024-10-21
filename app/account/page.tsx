import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { Sidebar } from "@/components/account/sidebar/Sidebar";
import Profile from "@/components/account/Profile";

export default async function PrivatePage() {
  //TODO: Display the first name, the last name the email and the address programmatically(in the placeholder of the Input field)

  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <main>
      <div className="1024:grid relative pb-12 1024:pb-0  1024:grid-cols-[300px_1fr] 1200:grid-cols-[320px_1fr] 1440:w-[1440px]">
        <Sidebar />
        <Profile />
      </div>
    </main>
  );
}
