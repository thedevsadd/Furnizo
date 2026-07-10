import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "About Our Studio — Furnizo",
  description: "Learn about the Furnizo ethos, our architectural design philosophy, and commitment to structural longevity.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-furnizo-beige">
      <Navbar />

      <main className="flex-grow py-16 sm:py-24 mx-auto max-w-5xl w-full px-4 sm:px-6 lg:px-8">
        
        {/* Brand Showcase Header */}
        <div className="flex flex-col items-center text-center space-y-8 mb-20">
          <div className="relative h-12 w-48 sm:h-16 sm:w-64">
            <Image
              src="/Furnizo-Assets/Furnizo-logo-Main.png"
              alt="Furnizo Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="max-w-2xl space-y-4">
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-furnizo-brown">
              Our Identity
            </span>
            <p className="font-sans text-lg sm:text-xl font-light text-furnizo-charcoal leading-relaxed max-w-xl mx-auto">
              "We believe furniture should not merely fill space, but structure it. Our pieces represent pure geometry, material honesty, and quiet permanence."
            </p>
          </div>
        </div>

        {/* Brand Details sections */}
        <div className="space-y-20">
          
          {/* Grid section 1: Our Origin */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-furnizo-border bg-white shadow-xs">
              <Image
                src="/Furnizo-Assets/Products/Chair/Chair 1/Angle-2.jpeg"
                alt="Soren Lounge Chair craftsmanship"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-4">
              <span className="font-sans text-[9px] font-bold uppercase tracking-wider text-furnizo-brown">
                Our Origin
              </span>
              <h2 className="font-sans text-2xl font-light text-furnizo-charcoal tracking-wide">
                Copenhagen Roots, Timeless Form
              </h2>
              <p className="font-sans text-sm text-furnizo-muted font-light leading-relaxed">
                Founded with a desire to simplify the domestic landscape, Furnizo combines clean Scandinavian design principles with sculptural architectural geometry. We strip away ornamentation to reveal the intrinsic character of solid timber, natural stone, and woven textiles.
              </p>
            </div>
          </div>

          {/* Grid section 2: Materiality & Longevity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4 order-2 md:order-1">
              <span className="font-sans text-[9px] font-bold uppercase tracking-wider text-furnizo-brown">
                Materiality
              </span>
              <h2 className="font-sans text-2xl font-light text-furnizo-charcoal tracking-wide">
                Honesty in Raw Materials
              </h2>
              <p className="font-sans text-sm text-furnizo-muted font-light leading-relaxed">
                We select materials that mature beautifully. Our solid white oak is treated with light oil to preserve its raw touch, our Roman travertine is minimally honed to show geological details, and our fabrics—linen, bouclé, and velvet—are chosen for tactile durability. No veneers or shortcuts.
              </p>
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-furnizo-border bg-white shadow-xs order-1 md:order-2">
              <Image
                src="/Furnizo-Assets/Products/Coffee Table/Table 3/Main-Product.jpeg"
                alt="Vega Travertine detail"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Core Philosophy Values */}
          <div className="border-t border-furnizo-border/50 pt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-furnizo-charcoal">
                Architectural Form
              </h3>
              <p className="font-sans text-xs text-furnizo-muted font-light leading-relaxed">
                Every dining set, accent table, and shelving unit is designed with pure linear logic. We focus on scale, proportion, and shadow lines.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-furnizo-charcoal">
                Structural Integrity
              </h3>
              <p className="font-sans text-xs text-furnizo-muted font-light leading-relaxed">
                Traditional joinery, soft-close hardware, and thick timber profiles ensure each piece is built to be passed down through generations.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-furnizo-charcoal">
                Quiet Permanence
              </h3>
              <p className="font-sans text-xs text-furnizo-muted font-light leading-relaxed">
                We avoid short-lived design trends. Our aesthetic is calm, neutral, and sculptural, designed to settle quietly into any evolving interior.
              </p>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
