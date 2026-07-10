import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/product/ProductGrid";
import CuratedCategories from "@/components/product/CuratedCategories";
import NewArrivalsCarousel from "@/components/product/NewArrivalsCarousel";
import { products } from "@/data/products";
import { ArrowRight } from "lucide-react";

export default function Home() {
  // Get 4 featured bestsellers
  const featuredProducts = products.slice(0, 4);

  // Get new arrivals
  const newProducts = products.filter((p) => p.isNew);

  return (
    <div className="flex flex-col min-h-screen bg-furnizo-beige">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[calc(100vh-64px)] w-full overflow-hidden bg-furnizo-border/20">
          <div className="absolute inset-0 z-0">
            <Image
              src="/Furnizo-Assets/Hero-image.jpeg"
              alt="Minimalist room setup"
              fill
              className="object-cover brightness-[0.95]"
              priority
            />
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-r from-furnizo-beige/40 via-transparent to-transparent z-10" />

          <div className="relative z-20 mx-auto flex h-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl space-y-6">
              <span className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-furnizo-brown">
                New Collection
              </span>
              <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-furnizo-charcoal leading-[1.15]">
                Architectural Clarity.<br />
                Enduring Comfort.
              </h1>
              <p className="font-sans text-sm sm:text-base text-furnizo-muted max-w-md leading-relaxed font-light">
                Sculptural outlines made from premium oak, linen, and brushed brass. Crafted for modern interior spaces.
              </p>
              <div className="pt-4">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-3 bg-furnizo-brown text-furnizo-beige font-sans text-xs tracking-wider uppercase px-8 py-4 rounded hover:bg-furnizo-brown/95 hover:gap-4 transition-all duration-300 shadow-none border border-transparent"
                >
                  Explore Collection
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Curated Categories Section */}
        <section className="py-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-furnizo-brown">
                Categories
              </span>
              <h2 className="mt-2 font-sans text-2xl font-light text-furnizo-charcoal tracking-wide">
                Curated Spaces
              </h2>
            </div>
            <Link
              href="/products"
              className="w-fit mt-4 md:mt-0 inline-flex items-center gap-2 font-sans text-xs font-medium tracking-wider text-furnizo-brown border-b border-furnizo-brown pb-1 hover:text-furnizo-charcoal hover:border-furnizo-charcoal transition-colors"
            >
              View Shop
              <ArrowRight size={12} />
            </Link>
          </div>

          <CuratedCategories />
        </section>

        {/* New Arrivals Section */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <NewArrivalsCarousel products={newProducts} />
        </section>

        {/* Brand Narrative Banner */}
        <section className="border-y border-furnizo-border bg-furnizo-border/10 py-20 text-center">
          <div className="mx-auto max-w-3xl px-4">
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-furnizo-brown">
              Our Vision
            </span>
            <p className="mt-6 font-sans text-lg sm:text-xl font-light leading-relaxed text-furnizo-charcoal italic">
              "We believe that furniture should speak softly. Each design is stripped of unnecessary detail to allow structural integrity, organic grain patterns, and premium material textures to form the character of your space."
            </p>
            <div className="mt-8 flex justify-center">
              <span className="h-1 w-8 rounded-full bg-furnizo-brown/40"></span>
            </div>
          </div>
        </section>

        {/* Selected Pieces Section */}
        <section className="py-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-furnizo-brown">
                Featured
              </span>
              <h2 className="mt-2 font-sans text-2xl font-light text-furnizo-charcoal tracking-wide">
                Selected Pieces
              </h2>
            </div>
            <Link
              href="/products"
              className="w-fit mt-4 md:mt-0 inline-flex items-center gap-2 font-sans text-xs font-medium tracking-wider text-furnizo-brown border-b border-furnizo-brown pb-1 hover:text-furnizo-charcoal hover:border-furnizo-charcoal transition-colors"
            >
              Browse All Products
              <ArrowRight size={12} />
            </Link>
          </div>

          <ProductGrid products={featuredProducts} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
