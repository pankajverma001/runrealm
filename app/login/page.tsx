"use client";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function LoginPage() {
  async function signInWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "https://runrealm.vercel.app/dashboard"
      },
    });
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black">
      <button
        onClick={signInWithGoogle}
        className="rounded-xl bg-green-500 px-6 py-4 text-xl font-bold text-black"
      >
        Continue with Google
      </button>
    </main>
  );
}