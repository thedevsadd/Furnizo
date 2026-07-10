import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/product/ProductGrid";
import SparkleBadge from "@/components/ui/SparkleBadge";
import { products } from "@/data/products";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "New Arrivals | Furnizo",
  description:
    "Discover the latest additions to the Furnizo catalog. Modern architectural lines, premium natural materials, and sculptural shapes.",
};

export default function NewArrivalsPage() {
  const newProducts = products.filter((p) => p.isNew);

  return (
    <div className="flex flex-col min-h-screen bg-furnizo-beige">
      <Navbar />

      <main className="flex-grow">
        {/* Top Header Banner */}
        <section className="relative bg-furnizo-border/15 border-b border-furnizo-border/30 py-20 sm:py-28 overflow-hidden">
          {/* Subtle background abstract shapes */}
          <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
            <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-furnizo-brown/5 blur-3xl" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-furnizo-brown/5 blur-3xl" />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
            {/* Breadcrumb */}
            <nav className="flex items-center justify-center gap-2 text-[10px] font-sans font-semibold uppercase tracking-widest text-furnizo-muted/70">
              <Link href="/" className="hover:text-furnizo-brown transition-colors">
                Home
              </Link>
              <ChevronRight size={10} strokeWidth={2.5} />
              <span className="text-furnizo-brown">New Arrivals</span>
            </nav>

            {/* Sparkle Badge */}
            <div className="flex justify-center">
              <SparkleBadge />
            </div>

            {/* Big Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-furnizo-charcoal leading-tight tracking-tight">
              Our New Arrivals
            </h1>

            {/* Subtext */}
            <p className="font-sans text-sm sm:text-base text-furnizo-muted max-w-lg mx-auto leading-relaxed font-light">
              Explore the latest curated additions to our collection. Thoughtfully designed and hand-finished in warm oak, premium linen, steam-bent ash, and Roman stone.
            </p>
          </div>
        </section>

        {/* Product Catalog Grid Section */}
        <section className="py-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between border-b border-furnizo-border/40 pb-5 mb-10">
            <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-furnizo-brown">
              Fresh Releases ({newProducts.length})
            </h2>
            <Link
              href="/products"
              className="font-sans text-xs font-medium tracking-wider text-furnizo-muted hover:text-furnizo-brown transition-colors"
            >
              Browse All Catalog
            </Link>
          </div>

          {newProducts.length === 0 ? (
            <div className="flex h-72 flex-col items-center justify-center text-center">
              <div className="text-5xl mb-4">✨</div>
              <p className="font-sans text-base font-light text-furnizo-charcoal mb-1">
                No new products tagged yet.
              </p>
              <p className="font-sans text-sm text-furnizo-muted">
                Check back soon or explore our full collection.
              </p>
            </div>
          ) : (
            <ProductGrid products={newProducts} />
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
