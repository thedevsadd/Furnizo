"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EmptyState from "@/components/shared/EmptyState";
import { useCartStore } from "@/lib/store/cartStore";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  
  const cartItems = useCartStore((state) => state.items);
  const cartTotalPrice = useCartStore((state) => state.getTotalPrice());
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Shipping logic: Free shipping over $150
  const shippingThreshold = 150;
  const shippingCost = cartTotalPrice >= shippingThreshold ? 0 : 15;
  const estimatedTax = Math.round(cartTotalPrice * 0.08 * 100) / 100;
  const finalTotal = cartTotalPrice + shippingCost + estimatedTax;

  if (!mounted) {
    return (
      <div className="flex flex-col min-h-screen bg-furnizo-beige">
        <Navbar />
        <main className="flex-grow py-16 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8" />
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-furnizo-beige">
      <Navbar />

      <main className="flex-grow py-16 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 mb-12">
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-furnizo-brown">
            Summary
          </span>
          <h1 className="font-sans text-3xl sm:text-4xl font-light text-furnizo-charcoal tracking-wide">
            Shopping Bag
          </h1>
        </div>

        {cartItems.length === 0 ? (
          <EmptyState
            title="Your bag is empty"
            description="Explore our range of premium, minimal furniture to find something that inspires you."
            actionText="Start Shopping"
            actionHref="/products"
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Cart Items List */}
            <div className="lg:col-span-8 space-y-6">
              <div className="border-t border-furnizo-border">
                {cartItems.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex flex-col sm:flex-row gap-6 py-8 border-b border-furnizo-border/50 items-start sm:items-center justify-between"
                  >
                    
                    {/* Item Image and Title */}
                    <div className="flex gap-4 items-center">
                      <div className="relative h-24 w-24 overflow-hidden rounded bg-furnizo-border/30 flex-shrink-0">
                        <Image
                          src={item.product.imageUrls[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </div>
                      <div>
                        <h3 className="font-sans text-sm font-medium text-furnizo-charcoal">
                          <Link href={`/products/${item.product.slug}`} className="hover:text-furnizo-brown transition-colors">
                            {item.product.name}
                          </Link>
                        </h3>
                        <p className="mt-1 text-xs text-furnizo-muted font-sans">
                          {item.product.category}
                        </p>
                        <p className="mt-1 text-xs font-sans text-furnizo-charcoal/70">
                          Unit: ${item.product.price}
                        </p>
                      </div>
                    </div>

                    {/* Quantity Selector & Price Column */}
                    <div className="flex w-full sm:w-auto items-center justify-between sm:justify-start gap-12">
                      
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-furnizo-border bg-furnizo-beige rounded overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-3 py-1.5 hover:bg-furnizo-border/30 transition-colors cursor-pointer text-furnizo-muted"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-4 py-1.5 font-sans text-sm text-furnizo-charcoal">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-3 py-1.5 hover:bg-furnizo-border/30 transition-colors cursor-pointer text-furnizo-muted"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* Total and Delete Action */}
                      <div className="flex items-center gap-6">
                        <p className="font-sans text-sm font-medium text-furnizo-charcoal min-w-[60px] text-right">
                          ${item.product.price * item.quantity}
                        </p>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-furnizo-muted hover:text-red-500 transition-colors p-1.5 cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* Cart Summary Panel */}
            <div className="lg:col-span-4">
              <div className="bg-furnizo-border/10 border border-furnizo-border rounded-lg p-6 space-y-6">
                <h2 className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-furnizo-charcoal border-b border-furnizo-border pb-4">
                  Order Summary
                </h2>

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between font-sans">
                    <span className="text-furnizo-muted">Subtotal</span>
                    <span className="text-furnizo-charcoal">${cartTotalPrice}</span>
                  </div>

                  <div className="flex justify-between font-sans">
                    <span className="text-furnizo-muted">Shipping</span>
                    <span className="text-furnizo-charcoal">
                      {shippingCost === 0 ? "Free" : `$${shippingCost}`}
                    </span>
                  </div>

                  <div className="flex justify-between font-sans">
                    <span className="text-furnizo-muted">Estimated Tax (8%)</span>
                    <span className="text-furnizo-charcoal">${estimatedTax}</span>
                  </div>

                  {shippingCost > 0 && (
                    <p className="text-[10px] font-sans text-furnizo-muted italic">
                      Spend ${shippingThreshold - cartTotalPrice} more to qualify for Free Shipping!
                    </p>
                  )}
                </div>

                <div className="border-t border-furnizo-border pt-4 flex justify-between font-sans text-base font-medium text-furnizo-charcoal">
                  <span>Total</span>
                  <span>${finalTotal}</span>
                </div>

                <div className="pt-2">
                  <Link href="/checkout" className="w-full block">
                    <Button className="w-full font-sans text-xs tracking-wider uppercase bg-furnizo-brown text-furnizo-beige hover:bg-furnizo-brown/95 py-4 h-12 flex items-center justify-center gap-2 cursor-pointer border border-transparent">
                      Checkout
                      <ArrowRight size={14} />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
