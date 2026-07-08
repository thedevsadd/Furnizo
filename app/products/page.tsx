import { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ShopClient from "@/components/product/ShopClient";
import Loader from "@/components/shared/Loader";
import { products } from "@/data/products";

export const metadata = {
  title: "Shop Collection — Furnizo",
  description: "Browse our curated range of premium, minimal architectural furniture.",
};

export default function ProductsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-furnizo-beige">
      <Navbar />

      <main className="flex-grow py-16 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 mb-12">
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-furnizo-brown">
            Catalog
          </span>
          <h1 className="font-sans text-3xl sm:text-4xl font-light text-furnizo-charcoal tracking-wide">
            The Collection
          </h1>
        </div>

        <Suspense fallback={<Loader />}>
          <ShopClient initialProducts={products} />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
