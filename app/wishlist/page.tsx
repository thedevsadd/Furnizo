"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EmptyState from "@/components/shared/EmptyState";
import ProductGrid from "@/components/product/ProductGrid";
import { useWishlistStore } from "@/lib/store/wishlistStore";
import { products } from "@/data/products";

export default function WishlistPage() {
  const [mounted, setMounted] = useState(false);
  const wishlistIds = useWishlistStore((state) => state.items);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Filter products by hearted IDs
  const wishlistProducts = products.filter((product) =>
    wishlistIds.includes(product.id)
  );

  if (!mounted) {
    return (
      <div className="flex flex-col min-h-screen bg-furnizo-beige">
        <Navbar />
        <main className="flex-grow py-16 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8" />
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-furnizo-beige">
      <Navbar />

      <main className="flex-grow py-16 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 mb-12">
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-furnizo-brown">
            Favorites
          </span>
          <h1 className="font-sans text-3xl sm:text-4xl font-light text-furnizo-charcoal tracking-wide">
            Your Wishlist
          </h1>
        </div>

        {wishlistProducts.length === 0 ? (
          <EmptyState
            title="Your wishlist is empty"
            description="Keep track of pieces you love by tapping the heart icon on any product card."
            actionText="Discover Products"
            actionHref="/products"
          />
        ) : (
          <ProductGrid products={wishlistProducts} />
        )}
      </main>

      <Footer />
    </div>
  );
}
