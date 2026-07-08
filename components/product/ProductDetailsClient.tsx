"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Heart, ShoppingBag, ArrowLeft, Ruler, ShieldCheck, Box } from "lucide-react";
import Link from "next/link";
import { Product } from "@/types";
import { useCartStore } from "@/lib/store/cartStore";
import { useWishlistStore } from "@/lib/store/wishlistStore";
import { useStockStore } from "@/lib/store/stockStore";
import { toast } from "sonner";
import StockBadge from "./StockBadge";
import ProductGrid from "./ProductGrid";

interface ProductDetailsClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailsClient({
  product,
  relatedProducts,
}: ProductDetailsClientProps) {
  const [mounted, setMounted] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const addItem = useCartStore((state) => state.addItem);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const isInWishlist = useWishlistStore((state) => state.hasItem(product.id));
  const getStock = useStockStore((state) => state.getStock);
  
  const stock = mounted ? getStock(product.id) : product.stock;

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAddToCart = () => {
    if (stock <= 0) {
      toast.error("This item is currently out of stock.");
      return;
    }
    addItem(product);
    toast.success(`${product.name} added to cart.`, {
      icon: "🤎",
    });
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product.id);
    const added = !isInWishlist;
    toast(added ? `${product.name} added to wishlist.` : `${product.name} removed from wishlist.`, {
      icon: added ? "🤎" : undefined,
    });
  };

  return (
    <div className="space-y-20">
      
      {/* Back Button */}
      <div>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-wider text-furnizo-muted hover:text-furnizo-charcoal transition-colors group"
        >
          <ArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform" />
          Back to Collection
        </Link>
      </div>

      {/* Main Single Product section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-7 flex flex-col md:flex-row-reverse gap-4">
          {/* Active Main Image */}
          <div className="relative aspect-square w-full overflow-hidden rounded bg-furnizo-border/30 flex-1">
            <Image
              src={product.imageUrls[activeImageIndex] || product.imageUrls[0]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 55vw"
              priority
            />
          </div>

          {/* Thumbnail Panel */}
          {product.imageUrls.length > 1 && (
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 flex-shrink-0 w-full md:w-20">
              {product.imageUrls.map((url, index) => {
                const isActive = index === activeImageIndex;
                return (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`relative aspect-square w-20 md:w-full overflow-hidden rounded bg-furnizo-border/20 border transition-all cursor-pointer ${
                      isActive
                        ? "border-furnizo-brown"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={url}
                      alt={`${product.name} - Angle ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Information Panel */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="space-y-6">
            
            {/* Category / Availability row */}
            <div className="flex items-center justify-between gap-4">
              <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-furnizo-brown">
                {product.category}
              </span>
              <StockBadge stock={stock} />
            </div>

            {/* Name & Pricing */}
            <div className="space-y-2">
              <h1 className="font-sans text-3xl font-light tracking-wide text-furnizo-charcoal leading-tight">
                {product.name}
              </h1>
              <p className="font-sans text-2xl font-light text-furnizo-charcoal">
                ${product.price}
              </p>
            </div>

            {/* Description */}
            <p className="font-sans text-sm text-furnizo-muted leading-relaxed font-light">
              {product.description}
            </p>

            {/* Specs detail boxes */}
            <div className="border-t border-furnizo-border pt-6 space-y-4">
              {product.dimensions && (
                <div className="flex items-center gap-3 text-xs text-furnizo-muted font-sans">
                  <Ruler size={14} className="text-furnizo-charcoal/70" />
                  <span>
                    <strong className="text-furnizo-charcoal font-medium">Dimensions:</strong> {product.dimensions}
                  </span>
                </div>
              )}
              {product.material && (
                <div className="flex items-center gap-3 text-xs text-furnizo-muted font-sans">
                  <Box size={14} className="text-furnizo-charcoal/70" />
                  <span>
                    <strong className="text-furnizo-charcoal font-medium">Material:</strong> {product.material}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-3 text-xs text-furnizo-muted font-sans">
                <ShieldCheck size={14} className="text-furnizo-charcoal/70" />
                <span>
                  <strong className="text-furnizo-charcoal font-medium">Warranty:</strong> 2-year frame warranty
                </span>
              </div>
            </div>

          </div>

          {/* Action Row */}
          <div className="pt-8 mt-8 border-t border-furnizo-border flex gap-3">
            
            {/* Add to Cart button */}
            <button
              onClick={handleAddToCart}
              disabled={stock <= 0}
              className={`flex-1 flex items-center justify-center gap-2 text-furnizo-beige font-sans text-xs tracking-wider uppercase py-4 rounded transition-all cursor-pointer border border-transparent ${
                stock <= 0
                  ? "bg-furnizo-border text-furnizo-muted cursor-not-allowed"
                  : "bg-furnizo-brown hover:bg-furnizo-brown/95 active:scale-98"
              }`}
            >
              <ShoppingBag size={14} />
              {stock <= 0 ? "Out of Stock" : "Add to Cart"}
            </button>

            {/* Wishlist toggle icon */}
            <button
              onClick={handleToggleWishlist}
              className="flex items-center justify-center w-14 rounded border border-furnizo-border bg-furnizo-beige text-furnizo-charcoal hover:bg-furnizo-border/30 hover:border-furnizo-charcoal transition-all cursor-pointer"
              aria-label="Wishlist toggle"
            >
              <Heart
                size={18}
                className={mounted && isInWishlist ? "fill-furnizo-brown text-furnizo-brown" : ""}
              />
            </button>

          </div>

        </div>

      </div>

      {/* Related Products Grid */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-furnizo-border pt-16">
          <div className="mb-10">
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-furnizo-brown">
              Curated Pairs
            </span>
            <h2 className="mt-2 font-sans text-xl font-light text-furnizo-charcoal tracking-wide">
              You May Also Like
            </h2>
          </div>
          <ProductGrid products={relatedProducts} />
        </section>
      )}

    </div>
  );
}
