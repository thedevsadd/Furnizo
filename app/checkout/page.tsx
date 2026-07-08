"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, CreditCard } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EmptyState from "@/components/shared/EmptyState";
import { useCartStore } from "@/lib/store/cartStore";
import { useOrderStore } from "@/lib/store/orderStore";
import { useStockStore } from "@/lib/store/stockStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { CustomerInfo, Order } from "@/types";

export default function CheckoutPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Form Fields
  const [formData, setFormData] = useState<CustomerInfo>({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  });

  // Zustand Store Items
  const cartItems = useCartStore((state) => state.items);
  const cartTotalPrice = useCartStore((state) => state.getTotalPrice());
  const clearCart = useCartStore((state) => state.clearCart);
  
  const addOrder = useOrderStore((state) => state.addOrder);
  const getStock = useStockStore((state) => state.getStock);
  const decrementStock = useStockStore((state) => state.decrementStock);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Basic validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.address ||
      !formData.city ||
      !formData.postalCode ||
      !formData.phone
    ) {
      toast.error("Please fill in all shipping details.");
      return;
    }

    // 2. Stock validation
    for (const item of cartItems) {
      const liveStock = getStock(item.product.id);
      if (liveStock < item.quantity) {
        toast.error(
          `Insufficient stock for ${item.product.name}. Only ${liveStock} left, but you requested ${item.quantity}.`
        );
        return;
      }
    }

    // 3. Calculation
    const shippingCost = cartTotalPrice >= 150 ? 0 : 15;
    const tax = Math.round(cartTotalPrice * 0.08 * 100) / 100;
    const totalOrderValue = cartTotalPrice + shippingCost + tax;

    // 4. Create Order ID
    const randomId = Math.floor(100000 + Math.random() * 900000);
    const orderId = `ORD-${randomId}`;

    // 5. Decrement Stock for all products
    cartItems.forEach((item) => {
      decrementStock(item.product.id, item.quantity);
    });

    // 6. Create Order
    const newOrder: Order = {
      id: orderId,
      items: [...cartItems],
      total: totalOrderValue,
      date: new Date().toISOString(),
      customerInfo: formData,
      status: "Confirmed",
    };

    addOrder(newOrder);

    // 7. Clear Cart
    clearCart();

    // 8. Redirect
    toast.success("Order placed successfully!", {
      icon: "🤎",
    });
    router.push(`/orders/${orderId}`);
  };

  if (!mounted) {
    return (
      <div className="flex flex-col min-h-screen bg-furnizo-beige">
        <Navbar />
        <main className="flex-grow py-16 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8" />
        <Footer />
      </div>
    );
  }

  const shippingCost = cartTotalPrice >= 150 ? 0 : 15;
  const tax = Math.round(cartTotalPrice * 0.08 * 100) / 100;
  const finalTotal = cartTotalPrice + shippingCost + tax;

  return (
    <div className="flex flex-col min-h-screen bg-furnizo-beige">
      <Navbar />

      <main className="flex-grow py-16 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-wider text-furnizo-muted hover:text-furnizo-charcoal transition-colors group"
          >
            <ArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to Bag
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <EmptyState
            title="Bag is empty"
            description="Add products to your cart before proceeding to checkout."
            actionText="Browse Collection"
            actionHref="/products"
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Shipping Form Panel */}
            <div className="lg:col-span-7">
              <div className="space-y-8">
                <div>
                  <h2 className="font-sans text-xl font-light text-furnizo-charcoal tracking-wide mb-2">
                    Shipping Details
                  </h2>
                  <p className="font-sans text-xs text-furnizo-muted">
                    Please provide your delivery information below. All data is kept locally.
                  </p>
                </div>

                <form onSubmit={handlePlaceOrder} className="space-y-6">
                  
                  {/* Name field */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="font-sans text-xs text-furnizo-charcoal uppercase tracking-wider">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="bg-transparent border-furnizo-border rounded font-sans text-sm h-11 focus-visible:ring-furnizo-brown"
                    />
                  </div>

                  {/* Email field */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-sans text-xs text-furnizo-charcoal uppercase tracking-wider">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="jane.doe@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="bg-transparent border-furnizo-border rounded font-sans text-sm h-11 focus-visible:ring-furnizo-brown"
                    />
                  </div>

                  {/* Address field */}
                  <div className="space-y-2">
                    <Label htmlFor="address" className="font-sans text-xs text-furnizo-charcoal uppercase tracking-wider">
                      Street Address
                    </Label>
                    <Input
                      id="address"
                      name="address"
                      type="text"
                      placeholder="123 Oak Street"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="bg-transparent border-furnizo-border rounded font-sans text-sm h-11 focus-visible:ring-furnizo-brown"
                    />
                  </div>

                  {/* City & Zip Code */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city" className="font-sans text-xs text-furnizo-charcoal uppercase tracking-wider">
                        City
                      </Label>
                      <Input
                        id="city"
                        name="city"
                        type="text"
                        placeholder="Portland"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="bg-transparent border-furnizo-border rounded font-sans text-sm h-11 focus-visible:ring-furnizo-brown"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode" className="font-sans text-xs text-furnizo-charcoal uppercase tracking-wider">
                        Postal Code
                      </Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        type="text"
                        placeholder="97201"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        required
                        className="bg-transparent border-furnizo-border rounded font-sans text-sm h-11 focus-visible:ring-furnizo-brown"
                      />
                    </div>
                  </div>

                  {/* Phone field */}
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="font-sans text-xs text-furnizo-charcoal uppercase tracking-wider">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="(503) 555-0199"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="bg-transparent border-furnizo-border rounded font-sans text-sm h-11 focus-visible:ring-furnizo-brown"
                    />
                  </div>

                  {/* Simulated Payment */}
                  <div className="border border-furnizo-border bg-furnizo-border/10 rounded-lg p-5 mt-8 space-y-4">
                    <div className="flex items-center gap-3">
                      <CreditCard size={18} className="text-furnizo-brown" />
                      <h3 className="font-sans text-sm font-medium text-furnizo-charcoal">
                        Payment System
                      </h3>
                    </div>
                    <p className="font-sans text-xs text-furnizo-muted leading-relaxed">
                      For testing purposes, this site simulates the checkout flow. No real transaction takes place and card info is bypassed. Click "Place Order" to finalize.
                    </p>
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full font-sans text-xs tracking-wider uppercase bg-furnizo-brown text-furnizo-beige hover:bg-furnizo-brown/95 py-4 h-12 cursor-pointer border border-transparent"
                    >
                      Place Order — ${finalTotal}
                    </Button>
                  </div>

                </form>
              </div>
            </div>

            {/* Sidebar Summary */}
            <div className="lg:col-span-5">
              <div className="border border-furnizo-border rounded-lg bg-furnizo-beige p-6 space-y-6">
                <h2 className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-furnizo-charcoal border-b border-furnizo-border pb-4">
                  Bag Items
                </h2>

                {/* Items List */}
                <div className="max-h-[300px] overflow-y-auto pr-2 space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="flex gap-4 items-center">
                      <div className="relative h-14 w-14 overflow-hidden rounded bg-furnizo-border/20 flex-shrink-0">
                        <Image
                          src={item.product.imageUrls[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      </div>
                      <div className="flex-grow min-w-0">
                        <h3 className="font-sans text-xs font-medium text-furnizo-charcoal line-clamp-1">
                          {item.product.name}
                        </h3>
                        <p className="text-[10px] text-furnizo-muted font-sans mt-0.5">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="font-sans text-xs font-light text-furnizo-charcoal flex-shrink-0">
                        ${item.product.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Subtotal & Details */}
                <div className="border-t border-furnizo-border pt-4 space-y-3 text-xs">
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
                    <span className="text-furnizo-muted">Sales Tax (8%)</span>
                    <span className="text-furnizo-charcoal">${tax}</span>
                  </div>
                </div>

                {/* Total */}
                <div className="border-t border-furnizo-border pt-4 flex justify-between font-sans text-sm font-medium text-furnizo-charcoal">
                  <span>Order Total</span>
                  <span>${finalTotal}</span>
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
