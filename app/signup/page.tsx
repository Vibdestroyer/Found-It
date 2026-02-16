"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [username, setUsername] = useState("");


  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Client-side validation
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
            username,
            },
        },
    });


    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      setError(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <form
        onSubmit={handleSignUp}
        className="w-full max-w-sm rounded-xl bg-white/5 p-6 border border-white/10"
      >
        <h1 className="text-2xl font-semibold text-white">
          Create an account
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="mt-6 w-full rounded-md bg-black/40 px-4 py-2 text-white border border-white/10"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
            type="text"
            placeholder="Username"
            className="mt-4 w-full rounded-md bg-black/40 px-4 py-2 text-white border border-white/10"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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

        <input
          type="password"
          placeholder="Confirm Password"
          className="mt-4 w-full rounded-md bg-black/40 px-4 py-2 text-white border border-white/10"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {error && (
          <p className="mt-4 text-sm text-red-400">{error}</p>
        )}

        {success && (
          <p className="mt-4 text-sm text-green-400">
            Account created! You can now log in.
          </p>
        )}

        <button
          type="submit"
          className="mt-6 w-full rounded-md bg-purple-600 py-2 text-white hover:bg-purple-500 transition"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
