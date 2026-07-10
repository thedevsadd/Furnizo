"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-furnizo-border bg-furnizo-beige py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center">
              <Image
                src="/Furnizo-Assets/Furnizo-logo-Main.png"
                alt="Furnizo Logo"
                width={120}
                height={31}
                className="h-8 w-auto object-contain"
                priority={false}
              />
            </Link>
            <p className="font-sans text-xs text-furnizo-muted leading-relaxed max-w-xs">
              Premium, architectural furniture designed with pure lines and structural longevity in mind.
            </p>
          </div>

          {/* Catalog Directories */}
          <div>
            <h4 className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-furnizo-charcoal mb-4">
              Collection
            </h4>
            <ul className="space-y-2.5 text-xs font-sans text-furnizo-muted">
              <li>
                <Link href="/products" className="hover:text-furnizo-brown transition-colors">
                  Shop All
                </Link>
              </li>
              <li>
                <Link href="/products?category=Chair" className="hover:text-furnizo-brown transition-colors">
                  Chair
                </Link>
              </li>
              <li>
                <Link href="/products?category=Coffee+Table" className="hover:text-furnizo-brown transition-colors">
                  Coffee Table
                </Link>
              </li>
              <li>
                <Link href="/products?category=Wardrobe" className="hover:text-furnizo-brown transition-colors">
                  Wardrobe
                </Link>
              </li>
              <li>
                <Link href="/products?category=Shelf" className="hover:text-furnizo-brown transition-colors">
                  Shelf
                </Link>
              </li>
            </ul>
          </div>

          {/* Information Links */}
          <div>
            <h4 className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-furnizo-charcoal mb-4">
              Support
            </h4>
            <ul className="space-y-2.5 text-xs font-sans text-furnizo-muted">
              <li>
                <Link href="/order-status" className="hover:text-furnizo-brown transition-colors">
                  Order Status
                </Link>
              </li>
              <li>
                <Link href="/shipping-returns" className="hover:text-furnizo-brown transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/care-guide" className="hover:text-furnizo-brown transition-colors">
                  Care Guide
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-furnizo-brown transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Input */}
          <div className="space-y-4">
            <h4 className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-furnizo-charcoal">
              Newsletter
            </h4>
            <p className="font-sans text-xs text-furnizo-muted leading-relaxed">
              Subscribe to receive notice of new arrivals and seasonal stories.
            </p>
            <form className="flex max-w-sm items-center border-b border-furnizo-charcoal/30 py-1.5" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Email address"
                className="w-full bg-transparent font-sans text-xs text-furnizo-charcoal placeholder-furnizo-muted/60 outline-none"
                required
                suppressHydrationWarning
              />
              <button
                type="submit"
                className="font-sans text-xs uppercase tracking-[0.15em] text-furnizo-charcoal hover:text-furnizo-brown transition-colors cursor-pointer pl-2"
              >
                Join
              </button>
            </form>
          </div>

        </div>

        {/* Legal Credit details */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-between border-t border-furnizo-border/50 pt-8 gap-4">
          <p className="font-sans text-[10px] text-furnizo-muted tracking-wider" suppressHydrationWarning>
            &copy; {new Date().getFullYear()} FURNIZO. All rights reserved.
          </p>
          <div className="flex gap-x-6 text-[10px] font-sans text-furnizo-muted tracking-wider">
            <Link href="/privacy" className="hover:text-furnizo-charcoal transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-furnizo-charcoal transition-colors">Terms & Conditions</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
