"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingBag, Heart, Menu, Plus, Minus, Trash2, Search } from "lucide-react";
import { useCartStore } from "@/lib/store/cartStore";
import { useWishlistStore } from "@/lib/store/wishlistStore";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Image from "next/image";

/* ─── Sparkle "NEW" badge ─── */
function SparkleNew() {
  return (
    <>
      <style>{`
        @keyframes sparkleShimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        .sparkle-new {
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
          animation: sparkleShimmer 2.4s linear infinite;
        }
        .sparkle-new-scrolled {
          background: linear-gradient(
            90deg,
            #f5e6d3 0%,
            #f5e6d3 30%,
            #fef08a 42%,
            #ffffff 50%,
            #fef08a 58%,
            #f5e6d3 70%,
            #f5e6d3 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: sparkleShimmer 2.4s linear infinite;
        }
      `}</style>
    </>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Zustand State
  const cartItems = useCartStore((state) => state.items);
  const cartTotalItems = useCartStore((state) => state.getTotalItems());
  const cartTotalPrice = useCartStore((state) => state.getTotalPrice());
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const wishlistItems = useWishlistStore((state) => state.items);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
      setMobileMenuOpen(false);
    }
  };

  const menuLinks = [
    { name: "Shop", href: "/products" },
    { name: "Offers", href: "/offers" },
    { name: "Collections", href: "/collections" },
    { name: "About", href: "/about" },
  ];

  const categories = ["Chair", "Coffee Table", "Shelf", "Side Table", "Table", "Wardrobe"];
  const showScrolled = isScrolled && !mobileMenuOpen;

  return (
    <>
      <SparkleNew />
      {/* Top Thin Marquee Banner */}
      <div className="w-full bg-furnizo-brown text-furnizo-beige py-1.5 overflow-hidden select-none border-b border-[#FAF9F6]/10 z-50 relative flex">
        <div className="whitespace-nowrap animate-marquee text-[9px] font-sans font-medium uppercase tracking-[0.25em] flex-shrink-0">
          LIMITED TIME ARCHIVAL SALE: USE CODE ARCHIVE15 FOR AN ADDITIONAL 15% OFF ALL DESIGNS &nbsp;•&nbsp; COMPLIMENTARY INSIDE DELIVERY ON ORDERS OVER $1,500 &nbsp;•&nbsp; CRAFTED IN COPENHAGEN &nbsp;•&nbsp;&nbsp;
        </div>
        <div className="whitespace-nowrap animate-marquee text-[9px] font-sans font-medium uppercase tracking-[0.25em] flex-shrink-0" aria-hidden="true">
          LIMITED TIME ARCHIVAL SALE: USE CODE ARCHIVE15 FOR AN ADDITIONAL 15% OFF ALL DESIGNS &nbsp;•&nbsp; COMPLIMENTARY INSIDE DELIVERY ON ORDERS OVER $1,500 &nbsp;•&nbsp; CRAFTED IN COPENHAGEN &nbsp;•&nbsp;&nbsp;
        </div>
      </div>
      <header
        className={`sticky transition-all duration-500 ease-in-out z-50 ${
          showScrolled
            ? "top-4 mx-auto max-w-3xl w-[90%] rounded-full bg-furnizo-brown text-furnizo-beige shadow-lg h-12 border-none"
            : "top-0 w-full bg-white border-b border-furnizo-border text-furnizo-charcoal h-16"
        }`}
      >
        {/* ── Inner flex container ── */}
        <div
          className={`relative mx-auto flex items-center w-full transition-all duration-500 ease-in-out ${
            showScrolled ? "h-12 px-6" : "h-16 px-4 sm:px-6 lg:px-8 max-w-7xl"
          }`}
        >

          {/* ── LEFT: Mobile drawer trigger + Logo ── */}
          <div className="flex items-center gap-3 z-10">
            {/* Mobile Menu Side Drawer */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger
                render={
                  <button
                    type="button"
                    className={`p-2 transition-colors lg:hidden ${
                      showScrolled
                        ? "text-furnizo-beige hover:text-white"
                        : "text-furnizo-charcoal hover:text-furnizo-brown"
                    }`}
                    aria-label="Open mobile menu"
                  >
                    <Menu size={20} />
                  </button>
                }
              />
              <SheetContent
                side="left"
                className="w-[300px] bg-furnizo-beige border-r border-furnizo-border p-6 flex flex-col h-full"
              >
                <SheetHeader className="border-b border-furnizo-border pb-4">
                  <Image
                    src="/Furnizo-Assets/Furnizo-logo-Main.png"
                    alt="FURNIZO"
                    width={120}
                    height={35}
                    className="h-7 w-auto object-contain"
                  />
                </SheetHeader>

                {/* Mobile Search */}
                <form
                  onSubmit={handleSearchSubmit}
                  className="relative flex items-center bg-furnizo-border/30 rounded-md px-3 py-2 mt-6"
                >
                  <Search size={14} className="text-furnizo-muted mr-2 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Search catalog..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent text-xs outline-none text-furnizo-charcoal w-full placeholder-furnizo-muted/60 font-sans"
                    suppressHydrationWarning
                  />
                </form>

                <div className="flex-1 overflow-y-auto py-6 space-y-8">
                  <div className="space-y-4">
                    <h3 className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-furnizo-brown">
                      Menu
                    </h3>
                    <div className="flex flex-col gap-3.5 font-sans text-sm text-furnizo-charcoal">
                      {menuLinks.map((link) => (
                        <Link
                          key={link.name}
                          href={link.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="hover:text-furnizo-brown transition-colors"
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-furnizo-brown">
                      Categories
                    </h3>
                    <div className="flex flex-col gap-3 font-sans text-sm text-furnizo-muted">
                      {categories.map((cat) => (
                        <Link
                          key={cat}
                          href={`/products?category=${cat}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="hover:text-furnizo-charcoal transition-colors"
                        >
                          {cat}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Brand Logo */}
            <Link href="/" className="flex items-center">
              {mounted && (
                <Image
                  src={
                    showScrolled
                      ? "/Furnizo-Assets/Furnizo-logo-White.png"
                      : "/Furnizo-Assets/Furnizo-logo-Main.png"
                  }
                  alt="FURNIZO"
                  width={showScrolled ? 125 : 145}
                  height={showScrolled ? 33 : 38}
                  className={`w-auto object-contain transition-all duration-300 ${
                    showScrolled ? "h-6" : "h-8"
                  }`}
                  priority
                />
              )}
            </Link>
          </div>

          {/* ── CENTER: Nav links — absolutely centered ── */}
          <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-x-7">
            {menuLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-sans text-xs font-medium tracking-widest uppercase transition-colors ${
                    showScrolled
                      ? isActive
                        ? "text-white font-semibold"
                        : "text-furnizo-beige hover:text-white"
                      : isActive
                      ? "text-furnizo-brown font-semibold"
                      : "text-furnizo-charcoal hover:text-furnizo-brown"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* NEW sparkle badge */}
            <Link
              href="/new"
              className={`font-sans text-xs font-medium tracking-widest uppercase cursor-pointer hover:opacity-80 transition-opacity select-none ${
                showScrolled ? "sparkle-new-scrolled" : "sparkle-new"
              }`}
            >
              NEW
            </Link>
          </nav>

          {/* ── RIGHT: Search + Wishlist + Cart ── */}
          <div className="flex items-center gap-x-1 ml-auto z-10">

            {/* Search — bottom border style, icons same size as others */}
            {!showScrolled && (
              <form
                onSubmit={handleSearchSubmit}
                className="hidden md:flex items-center gap-x-1.5 border-b border-furnizo-charcoal/15 hover:border-furnizo-charcoal/35 focus-within:border-furnizo-brown transition-colors py-1 mr-2"
              >
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-[11px] outline-none text-furnizo-charcoal w-24 lg:w-32 placeholder-furnizo-muted/50 font-sans tracking-wide"
                  suppressHydrationWarning
                />
                <button
                  type="submit"
                  className="text-furnizo-charcoal hover:text-furnizo-brown transition-colors cursor-pointer p-1"
                  aria-label="Search"
                >
                  <Search size={18} strokeWidth={1.6} />
                </button>
              </form>
            )}

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className={`relative p-2 transition-colors ${
                showScrolled
                  ? "text-furnizo-beige hover:text-white"
                  : "text-furnizo-charcoal hover:text-furnizo-brown"
              }`}
              aria-label="Wishlist"
            >
              <Heart
                size={18}
                strokeWidth={1.6}
                className={
                  mounted && wishlistItems.length > 0
                    ? showScrolled
                      ? "fill-white text-white"
                      : "fill-furnizo-brown text-furnizo-brown"
                    : ""
                }
              />
              {mounted && wishlistItems.length > 0 && (
                <span
                  className={`absolute top-0.5 right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full text-[8px] font-medium ${
                    showScrolled
                      ? "bg-furnizo-beige text-furnizo-brown"
                      : "bg-furnizo-brown text-furnizo-beige"
                  }`}
                >
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Cart Drawer */}
            <Sheet>
              <SheetTrigger
                render={
                  <button
                    className={`relative p-2 transition-colors cursor-pointer ${
                      showScrolled
                        ? "text-furnizo-beige hover:text-white"
                        : "text-furnizo-charcoal hover:text-furnizo-brown"
                    }`}
                    aria-label="Cart"
                  >
                    <ShoppingBag size={18} strokeWidth={1.6} />
                    {mounted && cartTotalItems > 0 && (
                      <span
                        className={`absolute top-0.5 right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full text-[8px] font-medium ${
                          showScrolled
                            ? "bg-furnizo-beige text-furnizo-brown"
                            : "bg-furnizo-brown text-furnizo-beige"
                        }`}
                      >
                        {cartTotalItems}
                      </span>
                    )}
                  </button>
                }
              />

              {/* ── Cart Drawer Panel ── */}
              <SheetContent className="w-full sm:max-w-md bg-furnizo-beige border-l border-furnizo-border p-6 flex flex-col h-full">
                <SheetHeader className="border-b border-furnizo-border pb-4">
                  <SheetTitle className="font-sans text-lg font-light tracking-wider text-furnizo-charcoal flex items-center justify-between">
                    <span>Shopping Cart</span>
                    {mounted && (
                      <span className="text-xs font-normal text-furnizo-muted">
                        ({cartTotalItems} {cartTotalItems === 1 ? "item" : "items"})
                      </span>
                    )}
                  </SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto py-4 space-y-4">
                  {!mounted || cartItems.length === 0 ? (
                    <div className="flex h-64 flex-col items-center justify-center text-center">
                      <ShoppingBag size={40} className="text-furnizo-border mb-3" />
                      <p className="font-sans text-sm text-furnizo-muted">Your cart is empty.</p>
                      <Link
                        href="/products"
                        className="mt-4 inline-block font-sans text-xs tracking-wider text-furnizo-brown border-b border-furnizo-brown pb-0.5 hover:text-furnizo-charcoal hover:border-furnizo-charcoal transition-colors"
                      >
                        Start Browsing
                      </Link>
                    </div>
                  ) : (
                    cartItems.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex gap-4 border-b border-furnizo-border/50 pb-4"
                      >
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
                              <p className="font-sans font-light pl-2">
                                ${item.product.price * item.quantity}
                              </p>
                            </div>
                            <p className="mt-1 text-xs text-furnizo-muted font-sans">
                              {item.product.category}
                            </p>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center border border-furnizo-border bg-furnizo-beige rounded overflow-hidden">
                              <button
                                onClick={() =>
                                  updateQuantity(item.product.id, item.quantity - 1)
                                }
                                className="px-2 py-1 hover:bg-furnizo-border/30 transition-colors cursor-pointer text-furnizo-muted"
                              >
                                <Minus size={10} />
                              </button>
                              <span className="px-3 py-1 font-sans text-furnizo-charcoal">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.product.id, item.quantity + 1)
                                }
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
                            <Button
                              variant="outline"
                              className="w-full font-sans text-xs tracking-wider border-furnizo-border text-furnizo-charcoal hover:bg-furnizo-border/20 cursor-pointer h-11"
                            >
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
      </header>
    </>
  );
}
