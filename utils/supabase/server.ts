"use server";

type CookieToSet = {
  name: string;
  value: string;
  options?: {
    path?: string;
    expires?: Date;
    maxAge?: number;
    domain?: string;
    secure?: boolean;
    httpOnly?: boolean;
    sameSite?: "strict" | "lax" | "none";
  };
};

const { createServerClient } = require("@supabase/ssr");
const { cookies } = require("next/headers");

export async function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: CookieToSet[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch (error) {
            console.error("Error setting cookies:", error);
          }
        },
      },
    }
  );
}

//TODO: This should be an async function, it is written in the Docs. But if I make it async, it shows that the await cookies() is pointless. But that is in the Supabase Auth installation guide. If i make this sync, the browser will throw an error that "Server actions must be async functions". Everything was fine until I tried to access the session of the user in the useUser hook.
