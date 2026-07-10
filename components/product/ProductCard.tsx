"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/types";
import { useWishlistStore } from "@/lib/store/wishlistStore";
import { useCartStore } from "@/lib/store/cartStore";
import { useStockStore } from "@/lib/store/stockStore";
import { toast } from "sonner";
import StockBadge from "./StockBadge";

interface ProductCardProps {
  product: Product;
  index?: number;
  darkMode?: boolean;
}

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function ProductCard({ product, index = 0, darkMode = false }: ProductCardProps) {
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [wishlistBounce, setWishlistBounce] = useState(false);

  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const isInWishlist = useWishlistStore((state) => state.hasItem(product.id));
  const addItem = useCartStore((state) => state.addItem);
  const getStock = useStockStore((state) => state.getStock);

  // Hydration-safe mount
  useEffect(() => {
    setMounted(true);
  }, []);
  const stock = mounted ? getStock(product.id) : product.stock;
  const isOutOfStock = stock <= 0;

  const showHoverImage = hovered && product.imageUrls.length > 1;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) {
      toast.error("Item is out of stock.");
      return;
    }
    addItem(product);
    toast.success(`${product.name} added to cart.`, { icon: "🤎" });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    setWishlistBounce(true);
    setTimeout(() => setWishlistBounce(false), 400);
    const added = !isInWishlist;
    toast(
      added ? `Added to wishlist.` : `Removed from wishlist.`,
      { icon: added ? "🤎" : undefined }
    );
  };

  return (
    <motion.div variants={cardVariants}>
      <Link
        href={`/products/${product.slug}`}
        className={`group relative flex flex-col h-full ${isOutOfStock ? "pointer-events-auto" : ""}`}
      >
        {/* Image container */}
        <div
          className="relative aspect-square w-full overflow-hidden rounded-lg bg-furnizo-border/20"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Crossfade image */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={showHoverImage ? "hover" : "main"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={showHoverImage ? product.imageUrls[1] : product.imageUrls[0]}
                alt={product.name}
                fill
                className={`object-cover transition-transform duration-500 ease-out group-hover:scale-103 ${
                  isOutOfStock ? "grayscale-[40%] brightness-95" : ""
                }`}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            </motion.div>
          </AnimatePresence>

          {/* Stock badge & Sale badge */}
          <div className="absolute top-3 left-3 z-10 flex flex-col items-start gap-1">
            <StockBadge stock={stock} />
            {product.originalPrice && (
              <span className="font-sans text-[8px] font-bold uppercase tracking-[0.15em] text-white bg-furnizo-brown px-2 py-1 rounded shadow-sm">
                Save ${product.originalPrice - product.price}
              </span>
            )}
          </div>

          {/* Wishlist button */}
          <motion.button
            onClick={handleToggleWishlist}
            animate={wishlistBounce ? { scale: [1, 1.35, 0.9, 1.1, 1] } : { scale: 1 }}
            transition={{ duration: 0.4 }}
            className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm border border-furnizo-border/20 text-furnizo-charcoal hover:bg-furnizo-brown hover:text-white transition-all duration-200 cursor-pointer shadow-sm"
            aria-label="Toggle Wishlist"
          >
            <Heart
              size={14}
              className={mounted && isInWishlist ? "fill-furnizo-brown text-furnizo-brown" : ""}
            />
          </motion.button>

          {/* Quick Add overlay */}
          {!isOutOfStock && (
            <div className="absolute bottom-0 left-0 right-0 z-10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out p-3">
              <button
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-2 bg-furnizo-brown text-furnizo-beige font-sans text-[11px] tracking-widest uppercase py-2.5 rounded-md hover:bg-furnizo-charcoal transition-colors cursor-pointer"
              >
                <ShoppingBag size={12} strokeWidth={1.8} />
                Quick Add
              </button>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="mt-3.5 flex flex-col flex-grow">
          <p className={`text-[9px] font-sans font-semibold uppercase tracking-[0.18em] ${darkMode ? "text-furnizo-beige/50" : "text-furnizo-muted/80"}`}>
            {product.category}
          </p>
          <h3 className={`mt-1 font-sans text-sm font-medium line-clamp-1 transition-colors ${darkMode ? "text-furnizo-beige group-hover:text-furnizo-brown" : "text-furnizo-charcoal group-hover:text-furnizo-brown"}`}>
            {product.name}
          </h3>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-sans text-sm font-medium text-furnizo-brown">
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className={`font-sans text-xs font-light line-through ${darkMode ? "text-furnizo-beige/40" : "text-furnizo-muted/70"}`}>
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
