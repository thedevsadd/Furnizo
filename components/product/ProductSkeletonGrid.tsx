"use client";

export default function ProductSkeletonGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10 w-full animate-fadeIn">
      {Array.from({ length: 8 }).map((_, idx) => (
        <div key={idx} className="space-y-4">
          {/* Image placeholder */}
          <div className="bg-furnizo-border/30 animate-pulse rounded-lg aspect-5/6 w-full" />
          
          {/* Metadata placeholders */}
          <div className="space-y-2.5">
            {/* Title */}
            <div className="bg-furnizo-border/30 animate-pulse rounded h-3.5 w-3/4" />
            {/* Category */}
            <div className="bg-furnizo-border/20 animate-pulse rounded h-2.5 w-1/2" />
            {/* Price */}
            <div className="bg-furnizo-border/30 animate-pulse rounded h-3 w-1/5 mt-1" />
          </div>
        </div>
      ))}
    </div>
  );
}
