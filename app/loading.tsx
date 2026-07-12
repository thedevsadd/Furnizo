"use client";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-furnizo-beige/95 backdrop-blur-xs transition-opacity duration-300">
      <div className="flex flex-col items-center space-y-6">
        {/* Brand logo animation */}
        <h1 className="font-sans text-2xl font-light tracking-[0.4em] text-furnizo-charcoal select-none animate-pulse">
          F U R N I Z O
        </h1>
        
        {/* Sleek, premium line loading indicator */}
        <div className="w-40 h-[2px] bg-furnizo-border/60 overflow-hidden rounded-full relative">
          <div className="absolute left-0 top-0 h-full bg-furnizo-brown rounded-full w-1/2 animate-[loadingBar_1.5s_ease-in-out_infinite]" />
        </div>
      </div>

      {/* Embedded style for the custom loading bar animation keyframes */}
      <style jsx global>{`
        @keyframes loadingBar {
          0% {
            left: -50%;
            width: 30%;
          }
          50% {
            left: 25%;
            width: 50%;
          }
          100% {
            left: 100%;
            width: 30%;
          }
        }
      `}</style>
    </div>
  );
}
