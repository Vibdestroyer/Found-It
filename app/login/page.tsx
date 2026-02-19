"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm rounded-xl bg-white/5 p-6 border border-white/10"
      >
        <h1 className="text-2xl font-semibold text-white">Log in</h1>

        <input
          type="email"
          placeholder="Email"
          className="mt-6 w-full rounded-md bg-black/40 px-4 py-2 text-white border border-white/10"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="mt-4 w-full rounded-md bg-black/40 px-4 py-2 text-white border border-white/10"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && (
          <p className="mt-4 text-sm text-red-400">{error}</p>
        )}

        <button
          type="submit"
          className="mt-6 w-full rounded-md bg-purple-600 py-2 text-white hover:bg-purple-500 transition"
        >
          Log In
        </button>


        {/* Divider */}
        <div className="mt-6 text-center text-sm text-zinc-400">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-purple-400 hover:text-purple-300 underline underline-offset-4"
          >
            Sign up here
          </Link>
        </div>
      </form>
    </div>
  );
}
