"use client";

import { useEffect, useState } from "react";

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    const key = "furnizo_offer_deadline";
    let deadline = localStorage.getItem(key);
    
    if (!deadline) {
      // Set deadline to 48 hours from now
      const targetTime = Date.now() + 48 * 60 * 60 * 1000;
      localStorage.setItem(key, targetTime.toString());
      deadline = targetTime.toString();
    }

    const targetTimestamp = parseInt(deadline, 10);

    const calculateTime = () => {
      const difference = targetTimestamp - Date.now();
      if (difference <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        return false;
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
      return true;
    };

    calculateTime();
    const interval = setInterval(() => {
      const active = calculateTime();
      if (!active) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!timeLeft) {
    return (
      <div className="flex justify-center py-4 opacity-0">
        <div className="h-28 w-72 rounded-xl bg-furnizo-charcoal" />
      </div>
    );
  }

  const pad = (num: number) => String(num).padStart(2, "0");

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Premium Dark Panel Countdown */}
      <div className="bg-furnizo-charcoal text-[#FAF9F6] py-5 px-8 sm:px-10 rounded-xl shadow-md border border-furnizo-charcoal/90 w-full max-w-sm mx-auto flex flex-col items-center space-y-3.5">
        <span className="font-sans text-[9px] font-semibold uppercase tracking-[0.3em] text-[#FAF9F6]/60">
          Limited Time Offer Ends In
        </span>
        
        <div className="flex items-center gap-4 sm:gap-6 font-mono text-2xl sm:text-3xl font-light text-[#FAF9F6]">
          <div className="flex flex-col items-center w-12 sm:w-16">
            <span className="font-serif font-light text-3xl sm:text-4xl text-white tracking-wide">{pad(timeLeft.hours)}</span>
            <span className="font-sans text-[8px] uppercase tracking-[0.2em] text-[#FAF9F6]/50 mt-1 font-semibold">hours</span>
          </div>
          
          <div className="h-8 w-px bg-white/10" />
          
          <div className="flex flex-col items-center w-12 sm:w-16">
            <span className="font-serif font-light text-3xl sm:text-4xl text-white tracking-wide">{pad(timeLeft.minutes)}</span>
            <span className="font-sans text-[8px] uppercase tracking-[0.2em] text-[#FAF9F6]/50 mt-1 font-semibold">minutes</span>
          </div>
          
          <div className="h-8 w-px bg-white/10" />
          
          <div className="flex flex-col items-center w-12 sm:w-16">
            <span className="font-serif font-light text-3xl sm:text-4xl text-[#FAF9F6] tracking-wide animate-pulse">{pad(timeLeft.seconds)}</span>
            <span className="font-sans text-[8px] uppercase tracking-[0.2em] text-[#FAF9F6]/65 mt-1 font-bold">seconds</span>
          </div>
        </div>
      </div>
    </div>
  );
}
