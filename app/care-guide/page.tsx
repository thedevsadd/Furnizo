"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Plus, Minus } from "lucide-react";

interface AccordionItemProps {
  title: string;
  subtitle: string;
  content: React.ReactNode;
}

function AccordionItem({ title, subtitle, content }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-furnizo-border bg-white rounded-lg overflow-hidden transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left p-6 sm:p-8 cursor-pointer hover:bg-furnizo-border/10 transition-colors"
      >
        <div className="space-y-1">
          <span className="font-sans text-[9px] font-bold uppercase tracking-wider text-furnizo-brown">
            {subtitle}
          </span>
          <h3 className="font-sans text-lg font-light text-furnizo-charcoal tracking-wide">
            {title}
          </h3>
        </div>
        <div className="text-furnizo-muted flex-shrink-0 ml-4">
          {isOpen ? <Minus size={18} strokeWidth={1.5} /> : <Plus size={18} strokeWidth={1.5} />}
        </div>
      </button>

      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[800px] border-t border-furnizo-border" : "max-h-0"
        } overflow-hidden`}
      >
        <div className="p-6 sm:p-8 font-sans text-sm text-furnizo-muted font-light leading-relaxed space-y-4">
          {content}
        </div>
      </div>
    </div>
  );
}

export default function CareGuidePage() {
  return (
    <div className="flex flex-col min-h-screen bg-furnizo-beige">
      <Navbar />

      <main className="flex-grow py-16 sm:py-24 mx-auto max-w-3xl w-full px-4 sm:px-6">
        {/* Title */}
        <div className="space-y-4 mb-16">
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-furnizo-brown">
            Maintenance Guide
          </span>
          <h1 className="font-sans text-3xl sm:text-4xl font-light text-furnizo-charcoal tracking-wide">
            Care & Maintenance
          </h1>
          <p className="font-sans text-xs sm:text-sm text-furnizo-muted font-light leading-relaxed">
            Our furniture is designed to mature gracefully. Follow these simple material-specific maintenance routines to ensure they last for generations.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-6">
          
          <AccordionItem
            subtitle="Solid Woods"
            title="Oak, Ash & American Walnut"
            content={
              <>
                <p>
                  Solid wood is an active, organic material. It breathes, reacts to humidity, and develops a beautiful natural patina over time.
                </p>
                <div className="space-y-2">
                  <h4 className="font-sans text-xs font-semibold uppercase text-furnizo-charcoal">Daily Care</h4>
                  <p>Dust regularly with a soft, dry lint-free cloth. Wipe spills immediately using a damp cloth wrung out in warm water — do not allow moisture to sit on the surface.</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-sans text-xs font-semibold uppercase text-furnizo-charcoal">Deep Protection</h4>
                  <p>Apply a thin coat of natural furniture oil (such as white wood oil or organic linseed oil) once every six months. Wipe along the grain and buff off any excess with a dry cloth after 15 minutes.</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-sans text-xs font-semibold uppercase text-furnizo-charcoal">Precautions</h4>
                  <p>Keep wood out of direct, prolonged sunlight to prevent uneven fading. Avoid placing items directly next to radiators, vents, or fireplaces, as intense heat can warp or split the wood.</p>
                </div>
              </>
            }
          />

          <AccordionItem
            subtitle="Natural Stones"
            title="Roman Travertine & Carrara Marble"
            content={
              <>
                <p>
                  Natural stones are porous and highly sensitive to acids, dyes, and heat. Every slab has a unique crystalline formation that should be preserved.
                </p>
                <div className="space-y-2">
                  <h4 className="font-sans text-xs font-semibold uppercase text-furnizo-charcoal">Daily Care</h4>
                  <p>Wipe clean with a damp microfiber cloth. If needed, use a pH-neutral liquid dish soap diluted in warm water. Avoid acidic cleaners, ammonia, vinegar, or abrasive scrubbing sponges.</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-sans text-xs font-semibold uppercase text-furnizo-charcoal">Preventing Stains</h4>
                  <p>Always use coasters, placemats, and hot pads. Citrus juices, wine, coffee, and oils will etch the stone surface if left unattended. Wipe away spills instantly.</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-sans text-xs font-semibold uppercase text-furnizo-charcoal">Sealing</h4>
                  <p>Our stone furniture is sealed at dispatch. We recommend resealing the stone surfaces once a year with a premium impregnating stone sealer to maintain stain resistance.</p>
                </div>
              </>
            }
          />

          <AccordionItem
            subtitle="Textiles & Upholstery"
            title="Flax Linen, Bouclé & Cotton Velvet"
            content={
              <>
                <p>
                  Our fabrics are sourced for their natural textures and high durability, but require gentle vacuuming and immediate spot-cleaning.
                </p>
                <div className="space-y-2">
                  <h4 className="font-sans text-xs font-semibold uppercase text-furnizo-charcoal">Regular Cleaning</h4>
                  <p>Vacuum upholstery weekly with a soft brush attachment on low suction. This prevents dust and microscopic particles from settling into the woven fibers.</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-sans text-xs font-semibold uppercase text-furnizo-charcoal">Spills & Spots</h4>
                  <p>Never rub a spill. Blot gently with a clean, dry white cloth or paper towel to absorb as much liquid as possible. For stains, apply a mild solvent-free fabric cleaner or warm water mixed with gentle wool soap, blotting from the outer edge inwards.</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-sans text-xs font-semibold uppercase text-furnizo-charcoal">Velvet Care</h4>
                  <p>Cotton velvet has a pile that can become compressed. Gently steam the compressed area and use a soft-bristled clothes brush in the direction of the pile to restore its original look.</p>
                </div>
              </>
            }
          />

        </div>
      </main>

      <Footer />
    </div>
  );
}
