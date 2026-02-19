"use client";

import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import FoundItemCard from "../components/FoundItemCard";
import Hero from "@/components/Hero";

export default function Home() {
  const [items, setItems] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    const fetchItems = async () => {
      const { data, error } = await supabase
        .from("found_items")
        .select("*")
        .eq("status", "approved");

      if (error) {
        console.error("Supabase error:", error);
      } else {
        setItems(data ?? []);
      }
    };

    fetchItems();
  }, []);

  /* -----------------------------
     Dynamic Categories
  ----------------------------- */

  const categories = useMemo(() => {
    const unique = new Set(
      items.map((item) => item.category).filter(Boolean)
    );
    return Array.from(unique);
  }, [items]);

  /* -----------------------------
     Filtering
  ----------------------------- */

  const filteredItems = items
    .filter((item) =>
      item.item_name?.toLowerCase().includes(search.toLowerCase())
    )
    .filter((item) =>
      categoryFilter === "all"
        ? true
        : item.category === categoryFilter
    );

  /* -----------------------------
     Sorting
  ----------------------------- */

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === "newest") {
      return (
        new Date(b.created_at || b.date_found).getTime() -
        new Date(a.created_at || a.date_found).getTime()
      );
    }

    if (sortBy === "oldest") {
      return (
        new Date(a.created_at || a.date_found).getTime() -
        new Date(b.created_at || b.date_found).getTime()
      );
    }

    // Alphabetical
    return a.item_name.localeCompare(b.item_name);
  });

  return (
    <div className="flex min-h-screen justify-center font-sans">
      <main className="relative min-h-screen w-full">

        <Hero />

        <section className="mx-auto max-w-6xl px-6 py-10">

          {/* SEARCH + FILTER + SORT */}
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            {/* LEFT SIDE CONTROLS */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">

              {/* Search */}
              <input
                type="text"
                placeholder="Search found items..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-72 rounded-md border border-white/20 bg-black/40 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              {/* Category Filter */}
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="rounded-md border border-white/20 bg-black/40 px-3 py-2 text-white"
              >
                <option value="all">All Categories</option>

                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

            </div>

            {/* SORT DROPDOWN */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-md border border-white/20 bg-black/40 px-3 py-2 text-white"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="alphabetical">Alphabetical</option>
            </select>

          </div>

          {/* ITEM GRID */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sortedItems.map((item) => (
              <FoundItemCard
                key={item.id}
                id={item.id}
                title={item.item_name}
                description={item.description}
                location_found={item.location_found}
                date_found={item.date_found}
                image_url={item.image_url}
              />
            ))}
          </div>

        </section>
      </main>
    </div>
  );
}
