"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface CategoryItem {
  name: string;
  tagline: string;
  image: string;
  href: string;
}

const categories: CategoryItem[] = [
  {
    name: "Wardrobe",
    tagline: "Premium Closet",
    image: "/Furnizo-Assets/Premium_Closet.jpeg",
    href: "/products?category=Wardrobe",
  },
  {
    name: "Side Table",
    tagline: "Closer Table",
    image: "/Furnizo-Assets/Bedside_table.jpeg",
    href: "/products?category=Side Table",
  },
  {
    name: "Table",
    tagline: "For Family Time",
    image: "/Furnizo-Assets/Dining_table.jpeg",
    href: "/products?category=Table",
  },
  {
    name: "Chair",
    tagline: "Relax on Sushi Bun",
    image: "/Furnizo-Assets/Poster__Relax_on_Sushi_Bun.jpeg",
    href: "/products?category=Chair",
  },
];

export default function CuratedCategories() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
      {categories.map((category) => (
        <CategoryCard key={category.name} category={category} />
      ))}
    </div>
  );
}

function CategoryCard({ category }: { category: CategoryItem }) {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isNavigating) return;
    setIsNavigating(true);

    // After the satisfaction of the arrow shoot animation, navigate
    setTimeout(() => {
      router.push(category.href);
    }, 450);
  };

  return (
    <div
      onClick={handleClick}
      className="group cursor-pointer flex flex-col h-full bg-transparent"
    >
      {/* Image container with high-end hover zoom and overlay */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-furnizo-border/10 border border-furnizo-border/20 shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:border-furnizo-brown/20">
        <Image
          src={category.image}
          alt={category.tagline}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-103"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
          priority
        />
        {/* Elegant glassmorphism hover overlay */}
        <div className="absolute inset-0 bg-furnizo-charcoal/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Info & arrow section below the image */}
      <div className="mt-3 sm:mt-4 flex items-center justify-between px-1 sm:px-1.5">
        <div className="flex flex-col min-w-0 pr-2">
          <span className="font-sans text-[8px] sm:text-[10px] font-semibold uppercase tracking-[0.2em] text-furnizo-brown truncate">
            {category.name}
          </span>
          <h3 className="mt-0.5 font-sans text-xs sm:text-sm font-light text-furnizo-charcoal transition-colors duration-300 group-hover:text-furnizo-brown line-clamp-2">
            {category.tagline}
          </h3>
        </div>

        {/* Minimalist interactive circle button with animated arrow */}
        <div className="relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-furnizo-border/60 text-furnizo-charcoal bg-white/50 backdrop-blur-sm group-hover:bg-furnizo-charcoal group-hover:text-white group-hover:border-furnizo-charcoal transition-all duration-300 overflow-hidden shadow-sm flex-shrink-0">
          <motion.div
            animate={
              isNavigating
                ? {
                    x: [0, 22, -22, 0],
                    opacity: [1, 0, 0, 1],
                  }
                : {}
            }
            transition={{
              duration: 0.45,
              ease: "easeInOut",
              times: [0, 0.4, 0.41, 1],
            }}
            className="flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5"
          >
            <ArrowRight size={13} className="sm:hidden" strokeWidth={1.8} />
            <ArrowRight size={15} className="hidden sm:block" strokeWidth={1.8} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
