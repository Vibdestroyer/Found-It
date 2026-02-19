"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/lib/useUser";
import { supabase } from "@/lib/supabase";
import { useRouter, useParams } from "next/navigation";

export default function ClaimPage() {
  const { user, loading } = useUser();
  const router = useRouter();
  const params = useParams();
  const itemId = params.id as string;

  const [item, setItem] = useState<any>(null);
  const [claimantName, setClaimantName] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchItem = async () => {
      const { data } = await supabase
        .from("found_items")
        .select("*")
        .eq("id", itemId)
        .single();

      setItem(data);
    };

    fetchItem();
  }, [itemId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.from("claims").insert({
      item_id: itemId,
      claimant_name: claimantName,
      claimant_email: user?.email,
      message,
      status: "pending",
    });

    if (!error) {
      setSuccess(true);
    }
  };

  if (!item) return null;

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-black text-white">
      <div className="w-full max-w-lg rounded-xl bg-white/5 p-6 border border-white/10">

        <h1 className="text-2xl font-semibold mb-4">
          Claim: {item.item_name}
        </h1>

        <p className="text-sm text-zinc-400 mb-6">
          Located at: {item.location_found}
        </p>

        {success ? (
          <p className="text-green-400">
            Claim submitted successfully. We will review it shortly.
          </p>
        ) : (
          <form onSubmit={handleSubmit}>

            <input
              type="text"
              placeholder="Your Full Name"
              value={claimantName}
              onChange={(e) => setClaimantName(e.target.value)}
              required
              className="w-full rounded-md bg-black/40 px-4 py-2 text-white border border-white/10"
            />

            <textarea
              placeholder="Describe the item and where you lost it. Include identifying details."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="mt-4 w-full rounded-md bg-black/40 px-4 py-2 text-white border border-white/10 h-32"
            />

            <button
              type="submit"
              className="mt-6 w-full rounded-md bg-purple-600 py-2 text-white hover:bg-purple-500 transition"
            >
              Submit Claim
            </button>

          </form>
        )}
      </div>
    </div>
  );
}
