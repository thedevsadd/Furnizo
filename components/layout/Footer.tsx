"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-furnizo-border bg-furnizo-beige py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="h-5 w-5 rounded-full bg-furnizo-brown"></span>
              <span className="font-sans text-lg font-light tracking-[0.2em] text-furnizo-charcoal">
                FURNIZO
              </span>
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
                <Link href="/products?category=Chairs" className="hover:text-furnizo-brown transition-colors">
                  Lounge Chairs
                </Link>
              </li>
              <li>
                <Link href="/products?category=Tables" className="hover:text-furnizo-brown transition-colors">
                  Dining Tables
                </Link>
              </li>
              <li>
                <Link href="/products?category=Sofas" className="hover:text-furnizo-brown transition-colors">
                  Linen Sofas
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
                <Link href="/orders" className="hover:text-furnizo-brown transition-colors">
                  Order Status
                </Link>
              </li>
              <li>
                <span className="cursor-default hover:text-furnizo-charcoal transition-colors">
                  Shipping & Returns
                </span>
              </li>
              <li>
                <span className="cursor-default hover:text-furnizo-charcoal transition-colors">
                  Care Guide
                </span>
              </li>
              <li>
                <span className="cursor-default hover:text-furnizo-charcoal transition-colors">
                  Contact Us
                </span>
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
          <p className="font-sans text-[10px] text-furnizo-muted tracking-wider">
            &copy; {new Date().getFullYear()} FURNIZO. All rights reserved.
          </p>
          <div className="flex gap-x-6 text-[10px] font-sans text-furnizo-muted tracking-wider">
            <span className="cursor-pointer hover:text-furnizo-charcoal">Privacy Policy</span>
            <span className="cursor-pointer hover:text-furnizo-charcoal">Terms of Service</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
