"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/lib/useUser";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";

export default function TopMenuTickerLogin() {
  const [items, setItems] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  const { user, loading } = useUser();

  // Fetch items from last 7 days
  useEffect(() => {
    const fetchItems = async () => {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      const { data, error } = await supabase
        .from("found_items")
        .select("item_name, location_found, created_at")
        .eq("status", "approved")
        .gte("created_at", oneWeekAgo.toISOString())
        .order("created_at", { ascending: false });

      if (!error && data) {
        const formatted = data.map((item) => {
          return `📦 New item reported: ${item.item_name} — ${item.location_found}`;
        });

        setItems(formatted);
      }
    };

    fetchItems();
  }, []);

  // Auto rotate
  useEffect(() => {
    if (items.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [items]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-black/30 border-b border-white/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">

        {/* LEFT */}
        <div className="flex items-center gap-6">
          <Link
            href="/about"
            className="text-sm font-semibold tracking-widest text-white uppercase hover:text-purple-400 transition"
          >
            Found It
          </Link>

          <Link
            href="/"
            className="text-sm text-zinc-300 hover:text-white transition"
          >
            Home
          </Link>
        </div>

        {/* CENTER TICKER */}
        <div className="hidden md:block overflow-hidden whitespace-nowrap text-sm text-zinc-400">
          {items.length > 0 ? (
            <span key={index} className="inline-block animate-fade">
              {items[index]}
            </span>
          ) : (
            <span>No recent items reported</span>
          )}
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            {!loading && !user && (
              <>
                <Link
                  href="/signup"
                  className="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-500 transition"
                >
                  Sign Up
                </Link>

                <Link
                  href="/login"
                  className="rounded-md border border-white/20 px-4 py-2 text-sm text-white hover:bg-white/10 transition"
                >
                  Log In
                </Link>
              </>
            )}

            {!loading && user && (
              <>
                <span className="text-xs text-zinc-400">
                  {user?.user_metadata?.username || user?.email}
                </span>

                <button
                  onClick={() => supabase.auth.signOut()}
                  className="rounded-md border border-white/20 px-4 py-2 text-sm text-white hover:bg-white/10 transition"
                >
                  Log Out
                </button>
              </>
            )}
          </div>

          <Link href="/login" className="md:hidden">
            <Image
              src="/unknownUser.png"
              alt="Profile"
              width={36}
              height={36}
              className="rounded-full"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
}
