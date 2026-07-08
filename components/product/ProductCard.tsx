"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag } from "lucide-react";
import { Product } from "@/types";
import { useWishlistStore } from "@/lib/store/wishlistStore";
import { useCartStore } from "@/lib/store/cartStore";
import { useStockStore } from "@/lib/store/stockStore";
import { toast } from "sonner";
import StockBadge from "./StockBadge";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);

  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const isInWishlist = useWishlistStore((state) => state.hasItem(product.id));
  const addItem = useCartStore((state) => state.addItem);
  const getStock = useStockStore((state) => state.getStock);
  
  const stock = mounted ? getStock(product.id) : product.stock;

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (stock <= 0) {
      toast.error("Item is out of stock.");
      return;
    }
    addItem(product);
    toast.success(`${product.name} added to cart.`, {
      icon: "🤎",
    });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    const added = !isInWishlist;
    toast(added ? `${product.name} added to wishlist.` : `${product.name} removed from wishlist.`, {
      icon: added ? "🤎" : undefined,
    });
  };

  const displayImage = hovered && product.imageUrls[1] ? product.imageUrls[1] : product.imageUrls[0];

  return (
    <Link href={`/products/${product.slug}`} className="group relative flex flex-col h-full bg-furnizo-beige">
      <div 
        className="relative aspect-square w-full overflow-hidden rounded bg-furnizo-border/30"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Image
          src={displayImage}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 z-10">
          <StockBadge stock={stock} />
        </div>

        {/* Heart Wishlist Overlay */}
        <button
          onClick={handleToggleWishlist}
          className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-furnizo-beige/95 border border-furnizo-border/30 text-furnizo-charcoal hover:bg-furnizo-brown hover:text-furnizo-beige hover:scale-105 transition-all duration-300 cursor-pointer"
          aria-label="Toggle Wishlist"
        >
          <Heart 
            size={14} 
            className={mounted && isInWishlist ? "fill-furnizo-brown text-furnizo-brown hover:text-furnizo-beige" : ""} 
          />
        </button>

        {/* Quick Add Button Overlay */}
        {stock > 0 && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10 px-4">
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-2 bg-furnizo-brown text-furnizo-beige font-sans text-xs tracking-wider uppercase py-2.5 rounded hover:bg-furnizo-brown/95 active:scale-98 transition-all cursor-pointer border border-transparent"
            >
              <ShoppingBag size={12} />
              Quick Add
            </button>
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-col flex-grow">
        <p className="text-[9px] font-sans font-medium uppercase tracking-[0.15em] text-furnizo-muted">
          {product.category}
        </p>
        <h3 className="mt-1 font-sans text-sm font-medium text-furnizo-charcoal line-clamp-1 group-hover:text-furnizo-brown transition-colors">
          {product.name}
        </h3>
        <p className="mt-1 font-sans font-light text-sm text-furnizo-charcoal">
          ${product.price}
        </p>
      </div>
    </Link>
  );
}
