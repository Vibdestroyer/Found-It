"use client";

import { useState } from "react";
import Image from "next/image";

type FoundItemCardProps = {
  id: string;
  title: string;
  description: string;
  location_found: string;
  date_found: string;
  image_url: string;
};

export default function FoundItemCard({
  title,
  description,
  location_found,
  date_found,
  image_url,
}: FoundItemCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden transition-all duration-500 ${
        expanded ? "shadow-xl shadow-purple-500/10" : ""
      }`}
    >
      {/* IMAGE */}
      <div className="relative w-full aspect-[4/3]">
        {image_url ? (
          <Image
            src={image_url}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-black/40 text-zinc-500">
            No Image
          </div>
        )}

        {/* Bottom gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      </div>

      {/* CONTENT */}
      <div className="p-6">

        {/* HEADER */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-semibold text-white leading-tight text-[clamp(1.1rem,2vw,1.6rem)]">
              {title}
            </h2>

            <p className="mt-2 text-zinc-400 text-sm">
              📍 {location_found}
            </p>

            <p className="text-zinc-500 text-sm">
              🗓 {new Date(date_found).toLocaleDateString()}
            </p>
          </div>

          <button
            onClick={() => setExpanded(!expanded)}
            className="ml-auto rounded-lg bg-purple-600/20 px-4 py-2 text-sm font-medium text-purple-300 transition hover:bg-purple-600/30 hover:text-white"
          >
            {expanded ? "Show Less" : "More"}
          </button>
        </div>

        {/* EXPANDABLE SECTION */}
        <div
          className={`grid transition-all duration-500 overflow-hidden ${
            expanded ? "grid-rows-[1fr] mt-6 opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <p className="text-zinc-400 mb-4 text-sm leading-relaxed">
              {description}
            </p>

            <button className="w-full rounded-lg bg-purple-600 py-2 text-sm font-medium text-white transition hover:bg-purple-500">
              Claim This Item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
