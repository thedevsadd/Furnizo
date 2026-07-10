"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Sparkle {
  id: number;
  x: number; // percentage width
  y: number; // percentage height
  size: number;
  delay: number;
}

export default function SparkleBadge() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    // Generate random sparkles dynamically
    const newSparkles = Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      x: Math.random() * 80 + 10, // keep sparkles within the badge bounds (10% to 90%)
      y: Math.random() * 60 + 20, // 20% to 80%
      size: Math.random() * 8 + 6,  // size in px
      delay: Math.random() * 1.5,
    }));
    setSparkles(newSparkles);
  }, []);

  return (
    <div className="relative inline-flex items-center select-none">
      {/* Sparkles Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        <AnimatePresence>
          {sparkles.map((sparkle) => (
            <motion.svg
              key={sparkle.id}
              className="absolute text-yellow-400 fill-current drop-shadow-[0_0_3px_rgba(250,204,21,0.6)]"
              style={{
                left: `${sparkle.x}%`,
                top: `${sparkle.y}%`,
                width: sparkle.size,
                height: sparkle.size,
              }}
              viewBox="0 0 24 24"
              initial={{ scale: 0, opacity: 0, rotate: 0 }}
              animate={{
                scale: [0, 1.2, 0.8, 1.2, 0],
                opacity: [0, 1, 0.7, 1, 0],
                rotate: [0, 90, 180, 270, 360],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                delay: sparkle.delay,
                ease: "easeInOut",
              }}
            >
              <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
            </motion.svg>
          ))}
        </AnimatePresence>
      </div>

      {/* Shimmering Badge Base */}
      <span className="relative flex items-center justify-center px-3.5 py-1 rounded-full overflow-hidden border border-amber-200/50 bg-gradient-to-r from-amber-50 via-amber-100/60 to-amber-50 text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-amber-800 shadow-sm z-0">
        {/* Shiny moving gradient overlay */}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent -translate-x-full animate-shimmer pointer-events-none" />
        New
      </span>

      {/* Global CSS for the shimmer effect */}
      <style jsx global>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2.5s infinite linear;
        }
      `}</style>
    </div>
  );
}
