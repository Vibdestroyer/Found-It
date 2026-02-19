"use client";

import { useState, useEffect } from "react";

import { supabase } from "@/lib/supabase";
import { useUser } from "@/lib/useUser";
import { useRouter } from "next/navigation";

export default function ReportItemPage() {
  const { user } = useUser();
  const router = useRouter();

  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [locationFound, setLocationFound] = useState("");
  const [dateFound, setDateFound] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);


  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase
        .from("found_items")
        .select("category");

      if (!data) return;

      const uniqueCategories = Array.from(
        new Set(data.map((item) => item.category).filter(Boolean))
      );

      setCategories(uniqueCategories);
    };

    fetchCategories();
  }, []);



  if (!user) {
    return (
      <div className="py-24 text-center text-white">
        <p>You must be logged in to report an item.</p>
      </div>
    );
  }

  const handleSubmit = async () => {
    const finalCategory =
      category === "other" ? customCategory.trim() : category;

    if (!itemName || !finalCategory || !description || !locationFound || !dateFound) {
      alert("Please fill out all required fields.");
      return;
    }


    const { error } = await supabase.from("found_items").insert({
      item_name: itemName,
      category: finalCategory,
      description,
      location_found: locationFound,
      date_found: dateFound,
      status: "pending",
      submitted_by: user.id,
    });

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    setShowSuccess(true);
  };

  return (
    <div className="mx-auto max-w-xl py-24 space-y-6">
      <h1 className="text-3xl font-semibold text-white">
        Report a Found Item
      </h1>

      {/* Item Name */}
      <input
        className="w-full rounded bg-black/40 border border-white/20 p-3 text-white"
        placeholder="Item name (e.g., Blue Backpack)"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />

      {/* Category */}
      <select
        className="w-full rounded bg-black/40 border border-white/20 p-3 text-white"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Select a category</option>

        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}

        <option value="other">Other</option>
      </select>

      {/* Custom Category */}
      {category === "other" && (
        <input
          className="w-full rounded bg-black/40 border border-white/20 p-3 text-white mt-3"
          placeholder="Enter new category"
          value={customCategory}
          onChange={(e) => setCustomCategory(e.target.value)}
        />
      )}


      {/* Location Found */}
      <input
        className="w-full rounded bg-black/40 border border-white/20 p-3 text-white"
        placeholder="Location found (Library, Gym, Cafeteria, etc.)"
        value={locationFound}
        onChange={(e) => setLocationFound(e.target.value)}
      />

      {/* Date Found */}
      <input
        type="date"
        className="w-full rounded bg-black/40 border border-white/20 p-3 text-white"
        value={dateFound}
        onChange={(e) => setDateFound(e.target.value)}
      />

      {/* Description */}
      <textarea
        className="w-full rounded bg-black/40 border border-white/20 p-3 text-white"
        placeholder="Describe the item (color, brand, distinguishing features)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="rounded bg-purple-600 px-6 py-3 font-medium text-white hover:bg-purple-500 transition"
      >
        Submit Report
      </button>

      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-xl bg-[#0b0b10] border border-white/10 p-6 text-center">

            <h2 className="mt-4 text-xl font-semibold text-white">
              Item Submitted 🎉
            </h2>

            <p className="mt-3 text-sm text-zinc-400">
              Your report has been submitted for review.
              <br />
              An admin will approve it shortly.
            </p>

            <button
              onClick={() => router.push("/")}
              className="mt-6 w-full rounded-md bg-purple-600 px-4 py-2 font-medium text-white hover:bg-purple-500 transition"
            >
              Back to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
