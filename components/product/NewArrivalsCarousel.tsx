"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Product } from "@/types";
import ProductCard from "./ProductCard";

interface NewArrivalsCarouselProps {
  products: Product[];
}

export default function NewArrivalsCarousel({ products }: NewArrivalsCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideStep, setSlideStep] = useState(324); // default to desktop: 300 + 24
  const controls = useAnimation();

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setViewportWidth(containerRef.current.offsetWidth);
      }
      const isMobile = window.innerWidth < 640;
      setSlideStep(isMobile ? 304 : 324);
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Calculate the max active index dynamically to prevent sliding beyond content
  const visibleCards = Math.max(1, Math.floor(viewportWidth / slideStep));
  const maxIndex = Math.max(0, products.length - visibleCards);

  // Sync translation when activeIndex or maxIndex changes
  useEffect(() => {
    const targetIndex = Math.min(activeIndex, maxIndex);
    if (targetIndex !== activeIndex) {
      setActiveIndex(targetIndex);
    }
    controls.start({ x: -targetIndex * slideStep });
  }, [activeIndex, maxIndex, slideStep, controls]);

  const handlePrev = () => {
    setActiveIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    }
  };

  const handleDragEnd = (event: any, info: any) => {
    const draggedDistance = info.offset.x;
    const velocity = info.velocity.x;

    const swipeThreshold = 50;
    const velocityThreshold = 150;

    let indexChange = 0;

    if (draggedDistance < -swipeThreshold || velocity < -velocityThreshold) {
      // Swiped left -> increment index
      indexChange = Math.ceil(Math.abs(draggedDistance) / slideStep);
    } else if (draggedDistance > swipeThreshold || velocity > velocityThreshold) {
      // Swiped right -> decrement index
      indexChange = -Math.ceil(draggedDistance / slideStep);
    }

    const newIndex = Math.min(Math.max(0, activeIndex + indexChange), maxIndex);
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    } else {
      controls.start({ x: -activeIndex * slideStep });
    }
  };

  return (
    <div className="w-full flex flex-col lg:flex-row gap-12 items-stretch py-16 border-t border-furnizo-border/30">
      {/* Left Column: Heading, Shimmering NEW, See All Button */}
      <div className="w-full lg:w-1/3 flex flex-col justify-between pr-0 lg:pr-8">
        <div className="space-y-6">
          <div className="space-y-2.5">
            <span className="block font-sans text-xs font-semibold uppercase tracking-[0.25em] text-furnizo-brown">
              Fresh Off the Design Studio
            </span>
            
            {/* Shimmering Large NEW text */}
            <div className="relative inline-flex items-center select-none py-1 overflow-visible">
              <h2 className="relative font-serif text-5xl sm:text-6xl font-normal tracking-wide leading-none select-none sparkle-new-large">
                NEW
              </h2>
            </div>

            <p className="font-sans text-lg font-light text-furnizo-muted">
              Our New Arrivals
            </p>
          </div>

          <p className="font-sans text-sm font-light leading-relaxed text-furnizo-muted/90 max-w-sm">
            Discover our latest collection of architectural chairs, handcrafted bedside tables, premium dining sets, and structural wardrobes designed to refine your modern living space.
          </p>
        </div>

        <div className="mt-8 lg:mt-12">
          {/* See All button */}
          <Link
            href="/new"
            className="inline-flex items-center justify-center gap-3 bg-furnizo-brown text-furnizo-beige font-sans text-[11px] tracking-widest uppercase px-8 py-4 rounded hover:bg-furnizo-charcoal transition-all duration-300 shadow-sm border border-transparent"
          >
            See All New Pieces
            <ArrowRight size={13} strokeWidth={1.8} />
          </Link>
        </div>
      </div>

      {/* Right Column: Arrows + Slider */}
      <div className="w-full lg:w-2/3 flex flex-col">
        {/* Navigation Arrows for Carousel above products */}
        {maxIndex > 0 && (
          <div className="flex justify-end items-center gap-4 mb-5 select-none">
            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-furnizo-brown text-furnizo-brown bg-white hover:bg-furnizo-brown hover:text-white disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-furnizo-brown transition-all duration-300 cursor-pointer shadow-sm disabled:cursor-not-allowed"
              aria-label="Previous Products"
            >
              <ChevronLeft size={18} strokeWidth={1.8} />
            </button>
            <button
              onClick={handleNext}
              disabled={activeIndex === maxIndex}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-furnizo-brown text-furnizo-brown bg-white hover:bg-furnizo-brown hover:text-white disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-furnizo-brown transition-all duration-300 cursor-pointer shadow-sm disabled:cursor-not-allowed"
              aria-label="Next Products"
            >
              <ChevronRight size={18} strokeWidth={1.8} />
            </button>
          </div>
        )}

        {/* Carousel sliding container */}
        <div 
          ref={containerRef}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          className="overflow-hidden outline-none relative w-full"
        >
          <motion.div
            drag="x"
            dragConstraints={{ left: -maxIndex * slideStep, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            animate={controls}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="flex gap-6 select-none cursor-grab active:cursor-grabbing"
            style={{ width: "max-content" }}
          >
            {products.map((product) => (
              <div 
                key={product.id} 
                className="w-[280px] sm:w-[300px] flex-shrink-0"
                style={{ pointerEvents: "auto" }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Global CSS for the text shimmer effect matching the Navbar link */}
      <style jsx global>{`
        @keyframes sparkleShimmerLarge {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        .sparkle-new-large {
          background: linear-gradient(
            90deg,
            #6F4423 0%,
            #6F4423 30%,
            #f5c842 42%,
            #fff9c4 50%,
            #f5c842 58%,
            #6F4423 70%,
            #6F4423 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: sparkleShimmerLarge 5s linear infinite;
        }
      `}</style>
    </div>
  );
}
