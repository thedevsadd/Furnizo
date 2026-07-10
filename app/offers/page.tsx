import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import CountdownTimer from "@/components/product/CountdownTimer";
import { products } from "@/data/products";

export const metadata = {
  title: "Exclusive Offers — Furnizo",
  description: "Limited time pricing on our premium minimalist architectural furniture.",
};

export default function OffersPage() {
  // Filter products that are on sale/offer
  const offerProducts = products.filter((p) => p.originalPrice !== undefined);

  return (
    <div className="flex flex-col min-h-screen bg-furnizo-beige">
      <Navbar />

      <main className="flex-grow py-16 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
        
        {/* Banner with Timer */}
        <div className="border border-furnizo-border bg-white rounded-xl p-8 md:p-12 mb-16 text-center space-y-6 shadow-sm flex flex-col items-center">
          <div className="max-w-xl space-y-3">
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-furnizo-brown">
              Promotional Pricing
            </span>
            <h1 className="font-sans text-3xl sm:text-4xl font-light text-furnizo-charcoal tracking-wide leading-tight">
              Seasonal Archive Sale
            </h1>
            <p className="font-sans text-xs sm:text-sm text-furnizo-muted font-light leading-relaxed">
              Acquire our signature pieces at special archival pricing. Each piece is crafted with structural integrity and clean-lined geometry, designed to endure for generations.
            </p>
          </div>
          
          <div className="w-full max-w-md border-t border-furnizo-border/50 pt-6">
            <CountdownTimer />
          </div>
        </div>

        {/* Offers Grid */}
        <div className="space-y-6">
          <div className="flex items-baseline justify-between border-b border-furnizo-border pb-4">
            <h2 className="font-sans text-sm font-medium uppercase tracking-[0.15em] text-furnizo-charcoal">
              Featured Offers
            </h2>
            <span className="font-sans text-xs text-furnizo-muted">
              {offerProducts.length} Pieces Available
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6 lg:gap-x-8">
            {offerProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
