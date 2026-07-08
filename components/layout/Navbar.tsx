"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Heart, Menu, X, Plus, Minus, Trash2 } from "lucide-react";
import { useCartStore } from "@/lib/store/cartStore";
import { useWishlistStore } from "@/lib/store/wishlistStore";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Zustand State
  const cartItems = useCartStore((state) => state.items);
  const cartTotalItems = useCartStore((state) => state.getTotalItems());
  const cartTotalPrice = useCartStore((state) => state.getTotalPrice());
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const wishlistItems = useWishlistStore((state) => state.items);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { name: "Shop All", href: "/products" },
    { name: "Chairs", href: "/products?category=Chairs" },
    { name: "Tables", href: "/products?category=Tables" },
    { name: "Sofas", href: "/products?category=Sofas" },
    { name: "Lighting", href: "/products?category=Lighting" },
    { name: "Storage", href: "/products?category=Storage" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-furnizo-border bg-furnizo-beige/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Mobile Menu Toggle */}
        <button
          type="button"
          className="p-2 text-furnizo-charcoal lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Brand Logo */}
        <div className="flex-1 lg:flex-initial">
          <Link href="/" className="group flex items-center gap-2">
            <span className="h-6 w-6 rounded-full bg-furnizo-brown"></span>
            <span className="font-sans text-xl font-light tracking-[0.2em] text-furnizo-charcoal group-hover:text-furnizo-brown transition-colors">
              FURNIZO
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex lg:gap-x-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href.includes("category") && pathname.includes(link.href.split("?")[0]));
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`font-sans text-sm font-medium tracking-wide transition-colors hover:text-furnizo-brown ${
                  isActive ? "text-furnizo-brown" : "text-furnizo-charcoal"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Icons Action Bar */}
        <div className="flex items-center gap-x-3">
          
          {/* Wishlist Link */}
          <Link
            href="/wishlist"
            className="relative p-2.5 text-furnizo-charcoal hover:text-furnizo-brown transition-colors"
            aria-label="Wishlist"
          >
            <Heart size={20} className={mounted && wishlistItems.length > 0 ? "fill-furnizo-brown text-furnizo-brown" : ""} />
            {mounted && wishlistItems.length > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-furnizo-brown text-[10px] font-medium text-furnizo-beige">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          {/* Cart Drawer */}
          <Sheet>
            <SheetTrigger
              render={
                <button
                  className="relative p-2.5 text-furnizo-charcoal hover:text-furnizo-brown transition-colors cursor-pointer"
                  aria-label="Cart"
                >
                  <ShoppingBag size={20} />
                  {mounted && cartTotalItems > 0 && (
                    <span className="absolute top-1.5 right-1.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-furnizo-brown text-[10px] font-medium text-furnizo-beige">
                      {cartTotalItems}
                    </span>
                  )}
                </button>
              }
            />
            <SheetContent className="w-full sm:max-w-md bg-furnizo-beige border-l border-furnizo-border p-6 flex flex-col h-full">
              <SheetHeader className="border-b border-furnizo-border pb-4">
                <SheetTitle className="font-sans text-lg font-light tracking-wider text-furnizo-charcoal flex items-center justify-between">
                  <span>Shopping Cart</span>
                  {mounted && <span className="text-xs font-normal text-furnizo-muted">({cartTotalItems} {cartTotalItems === 1 ? "item" : "items"})</span>}
                </SheetTitle>
              </SheetHeader>

              {/* Cart Drawer Contents */}
              <div className="flex-1 overflow-y-auto py-4 space-y-4">
                {!mounted || cartItems.length === 0 ? (
                  <div className="flex h-64 flex-col items-center justify-center text-center">
                    <ShoppingBag size={40} className="text-furnizo-border mb-3" />
                    <p className="font-sans text-sm text-furnizo-muted">Your cart is empty.</p>
                    <Link href="/products" className="mt-4 inline-block font-sans text-xs tracking-wider text-furnizo-brown border-b border-furnizo-brown pb-0.5 hover:text-furnizo-charcoal hover:border-furnizo-charcoal transition-colors">
                      Start Browsing
                    </Link>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.product.id} className="flex gap-4 border-b border-furnizo-border/50 pb-4">
                      <div className="relative h-20 w-20 overflow-hidden rounded bg-furnizo-border/30 flex-shrink-0">
                        <Image
                          src={item.product.imageUrls[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <div className="flex justify-between text-sm font-medium text-furnizo-charcoal">
                            <h3 className="font-sans line-clamp-1">{item.product.name}</h3>
                            <p className="font-sans font-light pl-2">${item.product.price * item.quantity}</p>
                          </div>
                          <p className="mt-1 text-xs text-furnizo-muted font-sans">{item.product.category}</p>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center border border-furnizo-border bg-furnizo-beige rounded overflow-hidden">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="px-2 py-1 hover:bg-furnizo-border/30 transition-colors cursor-pointer text-furnizo-muted"
                            >
                              <Minus size={10} />
                            </button>
                            <span className="px-3 py-1 font-sans text-furnizo-charcoal">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="px-2 py-1 hover:bg-furnizo-border/30 transition-colors cursor-pointer text-furnizo-muted"
                            >
                              <Plus size={10} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="text-furnizo-muted hover:text-red-500 transition-colors p-1 cursor-pointer"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Cart Drawer Footer */}
              {mounted && cartItems.length > 0 && (
                <div className="border-t border-furnizo-border pt-4 space-y-4">
                  <div className="flex justify-between text-sm font-medium text-furnizo-charcoal">
                    <span className="font-sans text-furnizo-muted">Subtotal</span>
                    <span className="font-sans font-light">${cartTotalPrice}</span>
                  </div>
                  <p className="text-xs text-furnizo-muted font-sans italic">
                    Shipping & taxes calculated at checkout.
                  </p>
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <SheetTrigger
                      render={
                        <Link href="/cart" className="w-full">
                          <Button variant="outline" className="w-full font-sans text-xs tracking-wider border-furnizo-border text-furnizo-charcoal hover:bg-furnizo-border/20 cursor-pointer h-11">
                            View Cart
                          </Button>
                        </Link>
                      }
                    />
                    <SheetTrigger
                      render={
                        <Link href="/checkout" className="w-full">
                          <Button className="w-full font-sans text-xs tracking-wider bg-furnizo-brown text-furnizo-beige hover:bg-furnizo-brown/90 cursor-pointer h-11">
                            Checkout
                          </Button>
                        </Link>
                      }
                    />
                  </div>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-furnizo-border bg-furnizo-beige">
          <div className="space-y-1 px-4 py-4 sm:px-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block font-sans text-base font-medium text-furnizo-charcoal py-2 border-b border-furnizo-border/30 last:border-b-0 hover:text-furnizo-brown"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
