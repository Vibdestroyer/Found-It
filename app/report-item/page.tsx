"use client";

import { useState, useEffect } from "react";

import { supabase } from "@/lib/supabase";
import { useUser } from "@/lib/useUser";
import { useRouter } from "next/navigation";
import { FaFileUpload } from "react-icons/fa";

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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);


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

    if (!itemName || !finalCategory || !description || !locationFound || !dateFound || !selectedFile) {
      alert("Please fill out all required fields.");
      return;
    }

    const { error: uploadError, data: uploadData } = await supabase.storage
      .from("item-images")
      .upload(
        `images/${user.id}/${Date.now()}_${crypto.randomUUID()}`,
        selectedFile as File,
      );

    if (uploadError) {
      console.error(uploadError);
      alert("Failed to upload image: " + uploadError.message);
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
      image_url: uploadData.fullPath ? supabase.storage.from("item-images").getPublicUrl(uploadData.fullPath)?.data?.publicUrl : null,
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

            {/* Image Upload */}
      <label className="group relative block w-full cursor-pointer overflow-hidden rounded-xl border border-dashed p-4">
        <input
          type="file"
          accept="image/*"
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          onChange={(e) => {
            const file = e.target.files?.[0] ?? null;
            setSelectedFile(file);
          }}
        />

        <div className="flex items-center gap-4">
          <div className="grid h-12 w-12 place-items-center rounded-full">
            <FaFileUpload className="text-lg" />
          </div>

          <div>
            <p className="text-sm font-medium text-white">
              {selectedFile?.name || "Upload an image of the found item"}
            </p>
            <p className="text-xs">Click to browse your files</p>
          </div>
        </div>
      </label>

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
