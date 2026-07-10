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
      <div className="flex justify-center gap-4 sm:gap-6 py-6 opacity-0">
        <div className="h-16 w-16 sm:h-20 sm:w-20 rounded border border-furnizo-border bg-furnizo-border/10 flex flex-col justify-center items-center" />
      </div>
    );
  }

  const pad = (num: number) => String(num).padStart(2, "0");

  return (
    <div className="flex flex-col items-center space-y-3">
      <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-furnizo-brown">
        Limited Time Offer Ends In
      </span>
      <div className="flex justify-center gap-3 sm:gap-4 font-mono text-2xl sm:text-3xl font-light text-furnizo-charcoal">
        <div className="flex flex-col items-center">
          <div className="h-14 w-14 sm:h-16 sm:w-16 rounded border border-furnizo-border bg-furnizo-border/20 flex justify-center items-center font-normal shadow-sm">
            {pad(timeLeft.hours)}
          </div>
          <span className="font-sans text-[9px] uppercase tracking-wider text-furnizo-muted mt-1.5 font-medium">Hours</span>
        </div>
        <div className="flex items-center text-furnizo-muted h-14 sm:h-16 font-sans font-light">:</div>
        <div className="flex flex-col items-center">
          <div className="h-14 w-14 sm:h-16 sm:w-16 rounded border border-furnizo-border bg-furnizo-border/20 flex justify-center items-center font-normal shadow-sm">
            {pad(timeLeft.minutes)}
          </div>
          <span className="font-sans text-[9px] uppercase tracking-wider text-furnizo-muted mt-1.5 font-medium">Minutes</span>
        </div>
        <div className="flex items-center text-furnizo-muted h-14 sm:h-16 font-sans font-light">:</div>
        <div className="flex flex-col items-center">
          <div className="h-14 w-14 sm:h-16 sm:w-16 rounded border border-furnizo-border bg-furnizo-border/20 flex justify-center items-center font-normal text-furnizo-brown shadow-sm">
            {pad(timeLeft.seconds)}
          </div>
          <span className="font-sans text-[9px] uppercase tracking-wider text-furnizo-muted mt-1.5 font-medium">Seconds</span>
        </div>
      </div>
    </div>
  );
}
