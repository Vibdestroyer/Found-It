"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useUser } from "@/lib/useUser";
import { useRouter } from "next/navigation";

export default function AddBusinessPage() {
  const { user } = useUser();
  const router = useRouter();

  // form state
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [website, setWebsite] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);


  // fetch existing categories
  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase
        .from("businesses")
        .select("category")
        .eq("status", "approved");

      const uniqueCategories = Array.from(
        new Set(data?.map((b) => b.category).filter(Boolean))
      );

      setCategories(uniqueCategories);
    };

    fetchCategories();
  }, []);

  // must be logged in
  if (!user) {
    return (
      <div className="py-24 text-center text-white">
        <p>You must be logged in to add a business.</p>
      </div>
    );
  }

  const handleSubmit = async () => {
    const finalCategory =
      category === "other" ? customCategory.trim() : category;

    if (!name || !finalCategory || !description || !address) {
      alert("Please fill out all required fields.");
      return;
    }

    const { error } = await supabase.from("businesses").insert({
      name,
      category: finalCategory,
      description,
      address,
      website: website || null,
      status: "pending",
      submitted_by: user.id, // 🔒 owner link (hidden from public)
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
        Add Your Business
      </h1>

      {/* Business Name */}
      <input
        className="w-full rounded bg-black/40 border border-white/20 p-3 text-white"
        placeholder="Business name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* Category */}
      <select
        className="w-full rounded bg-black/40 border border-white/20 p-3 text-white"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Select a category</option>
        <option value="other">Other</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* Custom Category */}
      {category === "other" && (
        <input
          className="w-full rounded bg-black/40 border border-white/20 p-3 text-white"
          placeholder="Enter new category"
          value={customCategory}
          onChange={(e) => setCustomCategory(e.target.value)}
        />
      )}

      {/* Address */}
      <input
        className="w-full rounded bg-black/40 border border-white/20 p-3 text-white"
        placeholder="Business address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      {/* Website (optional) */}
      <input
        type="url"
        className="w-full rounded bg-black/40 border border-white/20 p-3 text-white"
        placeholder="Business website (optional)"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
      />

      {/* Description */}
      <textarea
        className="w-full rounded bg-black/40 border border-white/20 p-3 text-white"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="rounded bg-purple-600 px-6 py-3 font-medium text-white hover:bg-purple-500 transition"
      >
        Submit for Review
      </button>
          {showSuccess && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
        <div className="relative w-full max-w-md rounded-xl bg-[#0b0b10] border border-white/10 p-6 text-center animate-scale-in">

          {/* Firework dots */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex gap-2">
            <span className="h-2 w-2 rounded-full bg-purple-500 animate-ping" />
            <span className="h-2 w-2 rounded-full bg-pink-500 animate-ping delay-150" />
            <span className="h-2 w-2 rounded-full bg-indigo-500 animate-ping delay-300" />
          </div>

          <h2 className="mt-4 text-xl font-semibold text-white">
            Business Submitted 🎉
          </h2>

          <p className="mt-3 text-sm text-zinc-400">
            Thanks for supporting your community.
            <br />
            Please allow up to <span className="text-white">4 business days</span> for review.
          </p>

          <button
            onClick={() => router.push("/")}
            className="mt-6 w-full rounded-md bg-purple-600 px-4 py-2 font-medium text-white hover:bg-purple-500 transition"
          >
            Got it
          </button>
        </div>
      </div>
    )}

    </div>
  );
}
