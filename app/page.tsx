"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import BusinessCard from "../components/BusinessCard";
import Hero from "../components/Hero";


export default function Home() {

  const [businesses, setBusinesses] = useState<any[]>([]);


  useEffect(() => {
    const fetchBusinesses = async () => {
      const { data, error } = await supabase
        .from("businesses")
        .select("*")
        .eq("status", "approved");

      console.log("Supabase data:", data);
      console.log("Supabase error:", error);

      if (error) {
        console.error("Supabase error:", error);
      } else {
        setBusinesses(data ?? []);
      }
    };

    fetchBusinesses();
  }, []);



  const [sortBy, setSortBy] = useState("name");


  const [categoryFilter, setCategoryFilter] = useState("all");


  const categories = Array.from(
    new Set(businesses.map((business) => business.category))
  );


  console.log("Businesses length:", businesses.length);
  console.log("Derived categories:", categories);



  const filteredBusinesses =
    categoryFilter === "all"
      ? businesses
      : businesses.filter(
          (business) => business.category === categoryFilter
        );


 const sortedBusinesses = [...filteredBusinesses].sort((a, b) => {
    if (sortBy === "rating") {
      return b.rating - a.rating;
    }

    return a.name.localeCompare(b.name);
  });

  
//<main className="relative min-h-screen w-full">
// <div className="flex min-h-screen items-center justify-center font-sans">
//<main className="flex min-h-screen w-full max-w-3xl flex-col items-center gap-8 py-32 px-16 sm:items-start">


  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      <main className="relative min-h-screen w-full">

        <Hero />
        
        <section className="mx-auto max-w-6xl px-6 py-24">


          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            className="rounded border border-[color:var(--card-border)] bg-[color:var(--card)] px-2 py-1 text-sm text-[color:var(--foreground)]"
            >
              <option value="name">Name</option>
              <option value="rating">Rating</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Category:</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="rounded border border-[color:var(--card-border)] bg-[color:var(--card)] px-2 py-1 text-sm text-[color:var(--foreground)]"
            >
              <option value="all">All</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}

            </select>
          </div>


          <div className="w-full space-y-4">
            {sortedBusinesses.map((business) => (
              <BusinessCard
                key={business.id}
                name={business.name}
                category={business.category}
                rating={business.rating}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
