import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface CollectionCardProps {
  title: string;
  description: string;
  imageUrl: string;
  href: string;
  itemCount: string;
}

function CollectionCard({ title, description, imageUrl, href, itemCount }: CollectionCardProps) {
  return (
    <Link href={href} className="group flex flex-col relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden rounded-lg border border-furnizo-border bg-white shadow-sm hover:shadow-md transition-all duration-500">
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/5 z-10" />
      <Image
        src={imageUrl}
        alt={title}
        fill
        className="object-cover object-center group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      <div className="absolute top-4 left-4 z-20">
        <span className="font-sans text-[9px] font-semibold uppercase tracking-[0.2em] text-furnizo-beige bg-furnizo-brown/85 px-2.5 py-1 rounded backdrop-blur-xs">
          {itemCount}
        </span>
      </div>
      <div className="mt-auto p-6 sm:p-8 z-20 flex flex-col space-y-2">
        <h3 className="font-sans text-xl font-light text-white tracking-wide group-hover:text-furnizo-beige transition-colors">
          {title}
        </h3>
        <p className="font-sans text-xs text-white/80 font-light leading-relaxed max-w-sm">
          {description}
        </p>
        <span className="font-sans text-[10px] uppercase tracking-widest text-furnizo-beige mt-2.5 inline-flex items-center gap-1.5 font-medium group-hover:translate-x-1.5 transition-transform duration-300">
          Explore Collection <span>→</span>
        </span>
      </div>
    </Link>
  );
}

export default function CollectionsPage() {
  const collections = [
    {
      title: "Living Room Essentials",
      description: "Sculptural lounge chairs, travertine coffee tables, and accent stools that anchor your space with organic warmth.",
      imageUrl: "/Furnizo-Assets/Products/Chair/Chair 1/Main-Product.jpeg",
      href: "/products?category=Chair",
      itemCount: "13 Items",
    },
    {
      title: "Minimalist Storage",
      description: "Floating wall shelves, stackable oak modular systems, and sliding wardrobes that keep details clean and clutter away.",
      imageUrl: "/Furnizo-Assets/Products/Shelf/Shelf 4/Main-Product.jpeg",
      href: "/products?category=Shelf",
      itemCount: "8 Items",
    },
    {
      title: "Premium Dining Sets",
      description: "American walnut live-edge sets and solid white oak suites made for lingering conversations and shared meals.",
      imageUrl: "/Furnizo-Assets/Products/Table/Table 1/Main-Product.jpeg",
      href: "/products?category=Table",
      itemCount: "6 Items",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-furnizo-beige">
      <Navbar />

      <main className="flex-grow py-16 sm:py-24 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl space-y-4 mb-16 sm:mb-20">
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-furnizo-brown">
            Curated Spaces
          </span>
          <h1 className="font-sans text-3xl sm:text-5xl font-light text-furnizo-charcoal tracking-wide leading-tight">
            Our Collections
          </h1>
          <p className="font-sans text-sm sm:text-base text-furnizo-muted leading-relaxed font-light">
            Carefully grouped products designed with a shared architectural vocabulary. Explore configurations crafted for longevity and modern simplicity.
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {collections.map((collection, idx) => (
            <CollectionCard key={idx} {...collection} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
