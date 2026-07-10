import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/product/ProductGrid";
import CuratedCategories from "@/components/product/CuratedCategories";
import NewArrivalsCarousel from "@/components/product/NewArrivalsCarousel";
import { products } from "@/data/products";
import { ArrowRight, Trees, ShieldCheck, Wrench, MapPin } from "lucide-react";

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

          <div className="relative z-20 flex h-full w-full flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-24 xl:px-32">
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

        {/* Why Choose Us Section */}
        <section className="border-y border-furnizo-border bg-furnizo-border/10 py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-furnizo-brown block">
              Why Choose Us
            </span>
            <h2 className="mt-3 font-sans text-3xl font-light text-furnizo-charcoal tracking-wide">
              The Furnizo Standard
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16 text-left">
              {/* Point 1 */}
              <div className="bg-white/50 backdrop-blur-xs border border-furnizo-border/60 rounded-xl p-6 hover:-translate-y-1 transition-all duration-300 shadow-xs flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <div className="h-10 w-10 rounded-lg bg-furnizo-brown/10 flex items-center justify-center text-furnizo-brown">
                    <Trees size={20} />
                  </div>
                  <h3 className="font-sans text-sm font-semibold text-furnizo-charcoal uppercase tracking-wider">
                    Solid Woods Only
                  </h3>
                  <p className="font-sans text-xs text-furnizo-muted leading-relaxed font-light">
                    We select and utilize only high-quality, sustainably harvested solid oak, ash, and walnut. No composite boards or cheap veneers.
                  </p>
                </div>
              </div>

              {/* Point 2 */}
              <div className="bg-white/50 backdrop-blur-xs border border-furnizo-border/60 rounded-xl p-6 hover:-translate-y-1 transition-all duration-300 shadow-xs flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <div className="h-10 w-10 rounded-lg bg-furnizo-brown/10 flex items-center justify-center text-furnizo-brown">
                    <Wrench size={20} />
                  </div>
                  <h3 className="font-sans text-sm font-semibold text-furnizo-charcoal uppercase tracking-wider">
                    Rust-Free Hardware
                  </h3>
                  <p className="font-sans text-xs text-furnizo-muted leading-relaxed font-light">
                    Every screw, bracket, and hinge is crafted from 100% rust-free Grade 304 stainless steel, built to resist moisture and wear.
                  </p>
                </div>
              </div>

              {/* Point 3 */}
              <div className="bg-white/50 backdrop-blur-xs border border-furnizo-border/60 rounded-xl p-6 hover:-translate-y-1 transition-all duration-300 shadow-xs flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <div className="h-10 w-10 rounded-lg bg-furnizo-brown/10 flex items-center justify-center text-furnizo-brown">
                    <ShieldCheck size={20} />
                  </div>
                  <h3 className="font-sans text-sm font-semibold text-furnizo-charcoal uppercase tracking-wider">
                    100% Safe Finishes
                  </h3>
                  <p className="font-sans text-xs text-furnizo-muted leading-relaxed font-light">
                    We exclusively coat our designs with non-toxic, eco-certified organic oils and water-based sealants safe for families.
                  </p>
                </div>
              </div>

              {/* Point 4 */}
              <div className="bg-white/50 backdrop-blur-xs border border-furnizo-border/60 rounded-xl p-6 hover:-translate-y-1 transition-all duration-300 shadow-xs flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <div className="h-10 w-10 rounded-lg bg-furnizo-brown/10 flex items-center justify-center text-furnizo-brown">
                    <MapPin size={20} />
                  </div>
                  <h3 className="font-sans text-sm font-semibold text-furnizo-charcoal uppercase tracking-wider">
                    California Hubs
                  </h3>
                  <p className="font-sans text-xs text-furnizo-muted leading-relaxed font-light">
                    With over 50+ showrooms and logistics hubs across California, we offer white-glove inside delivery and local support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Selected Pieces Section */}
        <section className="w-full bg-furnizo-charcoal py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-furnizo-beige/50">
                  Featured
                </span>
                <h2 className="mt-2 font-sans text-2xl font-light text-furnizo-beige tracking-wide">
                  Selected Pieces
                </h2>
              </div>
              <Link
                href="/products"
                className="w-fit mt-4 md:mt-0 inline-flex items-center gap-2 font-sans text-xs font-medium tracking-wider text-furnizo-beige/80 border-b border-furnizo-beige/40 pb-1 hover:text-furnizo-beige/60 hover:border-furnizo-beige/60 transition-colors"
              >
                Browse All Products
                <ArrowRight size={12} />
              </Link>
            </div>

            <ProductGrid products={featuredProducts} darkMode />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
