"use client";

import { useEffect, useState } from "react";

const items = [
    "Alex donated $10 to Green Leaf Café",
    "Maria supported Downtown Books",
    "James left a review for Sunrise Bakery",
    "Local Market reached 100 supporters",
  ];

export default function TopMenuTickerLogin() {
  const [index, setIndex] = useState(0);

  

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-20 backdrop-blur-md bg-black/30">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        
        {/* Left: Menu */}
        <button className="rounded-md px-3 py-1 text-sm font-medium text-[color:var(--foreground)] hover:bg-white/10 transition">
          ☰ Menu
        </button>

        {/* Center: Ticker */}
        <div className="overflow-hidden whitespace-nowrap text-sm text-[color:var(--muted)]">
          <span
            key={index}
            className="inline-block animate-fade"
          >
            {items[index]}
          </span>
        </div>

        {/* Right: Auth */}
        <div className="flex items-center gap-4">
          <button className="text-sm text-[color:var(--foreground)] hover:underline">
            Log in
          </button>
          <button className="rounded-md bg-purple-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-purple-500 transition">
            Sign up
          </button>
        </div>
      </div>
    </nav>
  );
}
