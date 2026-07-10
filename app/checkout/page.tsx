"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, CreditCard, Lock, ChevronDown } from "lucide-react";
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

const californiaCities = [
  { name: "Los Angeles", zip: "90001" },
  { name: "San Francisco", zip: "94102" },
  { name: "San Diego", zip: "92101" },
  { name: "Beverly Hills", zip: "90210" },
  { name: "Santa Monica", zip: "90401" },
  { name: "Palo Alto", zip: "94301" },
  { name: "Malibu", zip: "90265" },
  { name: "San Jose", zip: "95112" },
];

const CardPaymentLocal = dynamic(
  () => import("@/components/checkout/CardPaymentLocal").catch(() => () => null),
  { ssr: false }
);

const showCardPayment = process.env.NEXT_PUBLIC_ENABLE_CARD_PAYMENTS === "true";

export default function CheckoutPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Payment States
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "card">("cod");
  const [isPaying, setIsPaying] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    name: "",
    number: "",
    expiry: "",
    cvc: "",
  });

  // Custom Dropdown State
  const [cityOpen, setCityOpen] = useState(false);
  const cityRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (cityRef.current && !cityRef.current.contains(e.target as Node)) {
        setCityOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

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
    
    // Restrict phone field to only allow numbers, spaces, hyphens, plus, and parentheses
    if (name === "phone") {
      const sanitized = value.replace(/[^0-9+\-()\s]/g, "");
      setFormData((prev) => ({
        ...prev,
        [name]: sanitized,
      }));
      return;
    }

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

    // Email format validation (Regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // Phone digits validation (at least 7 numbers)
    const digitsOnly = formData.phone.replace(/\D/g, "");
    if (digitsOnly.length < 7) {
      toast.error("Please enter a valid phone number (at least 7 digits).");
      return;
    }

    // 1.5 Card Validation & Simulation
    if (paymentMethod === "card") {
      if (!cardDetails.name || !cardDetails.number || !cardDetails.expiry || !cardDetails.cvc) {
        toast.error("Please fill in all credit card details.");
        return;
      }
      if (cardDetails.number.replace(/\s/g, '').length < 16) {
        toast.error("Please enter a valid 16-digit card number.");
        return;
      }
      if (cardDetails.expiry.length < 5) {
        toast.error("Please enter a valid card expiry date (MM/YY).");
        return;
      }
      if (cardDetails.cvc.length < 3) {
        toast.error("Please enter a valid 3-digit security code (CVC).");
        return;
      }

      setIsPaying(true);

      setTimeout(() => {
        setIsPaying(false);
        toast.error("Credit card transaction failed. Card payments are temporarily unavailable for this region. Please choose Cash on Delivery to finalize.", {
          duration: 6000,
          icon: "❌"
        });
      }, 1500);
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

    setIsPlacingOrder(true);

    setTimeout(() => {
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
    }, 1500);
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
                      placeholder="tawhidsadman.dev@gmail.com"
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

                  {/* City, State & Zip Code Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* City Selection */}
                    <div className="space-y-2 relative" ref={cityRef}>
                      <Label className="font-sans text-xs text-furnizo-charcoal uppercase tracking-wider">
                        City
                      </Label>
                      
                      {/* Custom select trigger */}
                      <div
                        onClick={() => setCityOpen(!cityOpen)}
                        className="w-full bg-transparent border border-furnizo-border rounded font-sans text-sm h-11 px-3 flex items-center justify-between text-furnizo-charcoal cursor-pointer select-none focus:ring-1 focus:ring-furnizo-brown focus-visible:outline-hidden"
                      >
                        <span className={formData.city ? "text-furnizo-charcoal font-normal" : "text-furnizo-muted/60"}>
                          {formData.city || "Select City"}
                        </span>
                        <ChevronDown size={14} className={`text-furnizo-muted transition-transform duration-200 ${cityOpen ? "rotate-180" : ""}`} />
                      </div>

                      {/* Floating custom options panel */}
                      {cityOpen && (
                        <div className="absolute left-0 right-0 z-30 mt-1.5 bg-white border border-furnizo-border rounded shadow-md max-h-60 overflow-y-auto py-1 animate-fadeIn">
                          {californiaCities.map(c => (
                            <div
                              key={c.name}
                              onClick={() => {
                                setFormData(prev => ({
                                  ...prev,
                                  city: c.name,
                                  postalCode: c.zip
                                }));
                                setCityOpen(false);
                              }}
                              className={`px-4 py-2.5 font-sans text-sm cursor-pointer transition-colors hover:bg-furnizo-beige hover:text-furnizo-brown ${
                                formData.city === c.name ? "bg-furnizo-beige/50 text-furnizo-brown font-medium" : "text-furnizo-charcoal"
                              }`}
                            >
                              {c.name}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* State (Fixed) */}
                    <div className="space-y-2">
                      <Label className="font-sans text-xs text-furnizo-charcoal uppercase tracking-wider">
                        State
                      </Label>
                      <Input
                        type="text"
                        value="California (CA)"
                        disabled
                        className="bg-furnizo-border/10 border-furnizo-border rounded font-sans text-sm h-11 text-furnizo-muted/70 cursor-not-allowed select-none"
                      />
                    </div>

                    {/* ZIP Code */}
                    <div className="space-y-2">
                      <Label htmlFor="postalCode" className="font-sans text-xs text-furnizo-charcoal uppercase tracking-wider">
                        ZIP / Postal Code
                      </Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        type="text"
                        placeholder="90001"
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
                      placeholder="0000000000"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="bg-transparent border-furnizo-border rounded font-sans text-sm h-11 focus-visible:ring-furnizo-brown"
                    />
                  </div>

                  {/* Payment Method Selector */}
                  <div className="space-y-4 pt-6 border-t border-furnizo-border">
                    <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-furnizo-charcoal">
                      Payment Method
                    </h3>
                    
                    <div className={showCardPayment ? "grid grid-cols-1 sm:grid-cols-2 gap-4" : "grid grid-cols-1 gap-4"}>
                      {/* Cash on Delivery option */}
                      <label className={`flex items-start justify-between p-4 border rounded-lg cursor-pointer transition-all ${
                        paymentMethod === "cod" 
                          ? "border-furnizo-brown bg-furnizo-brown/5 ring-1 ring-furnizo-brown" 
                          : "border-furnizo-border bg-white hover:border-furnizo-muted"
                      }`}>
                        <div className="flex gap-3">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="cod"
                            checked={paymentMethod === "cod"}
                            onChange={() => setPaymentMethod("cod")}
                            className="mt-0.5 text-furnizo-brown focus:ring-furnizo-brown"
                          />
                          <div className="space-y-0.5">
                            <span className="font-sans text-xs font-semibold text-furnizo-charcoal">Cash on Delivery</span>
                            <p className="font-sans text-[10px] text-furnizo-muted">Pay with cash upon receipt.</p>
                          </div>
                        </div>
                      </label>

                      {/* Card Payment option */}
                      {showCardPayment && (
                        <label className={`flex flex-col p-4 border rounded-lg cursor-pointer transition-all ${
                          paymentMethod === "card" 
                            ? "border-furnizo-brown bg-furnizo-brown/5 ring-1 ring-furnizo-brown" 
                            : "border-furnizo-border bg-white hover:border-furnizo-muted"
                        }`}>
                          <div className="flex items-start justify-between w-full">
                            <div className="flex gap-3">
                              <input
                                type="radio"
                                name="paymentMethod"
                                value="card"
                                checked={paymentMethod === "card"}
                                onChange={() => setPaymentMethod("card")}
                                className="mt-0.5 text-furnizo-brown focus:ring-furnizo-brown"
                              />
                              <div className="space-y-0.5">
                                <span className="font-sans text-xs font-semibold text-furnizo-charcoal">Credit / Debit Card</span>
                                <p className="font-sans text-[10px] text-furnizo-muted">Pay securely with card.</p>
                              </div>
                            </div>

                            {/* Card logos */}
                            <div className="flex gap-1 items-center">
                              {/* Visa */}
                              <svg className="w-8 h-5 rounded border border-gray-200 bg-white p-0.5" viewBox="0 0 24 15" fill="none">
                                <path d="M10.5 12h1.8l1.1-7H11.6l-1.1 7zm7.6-6.8c-.3-.2-.8-.4-1.4-.4-1.5 0-2.5.8-2.5 1.9 0 .8.8 1.3 1.3 1.6.6.3.8.5.8.7 0 .4-.5.6-1 .6-.6 0-1-.2-1.3-.4l-.2-.1-.2 1.4c.4.2.9.3 1.6.3 1.6 0 2.6-.8 2.6-2 0-.8-.5-1.2-1.6-1.7-.5-.3-.9-.5-.9-.8 0-.3.3-.5.8-.5.4 0 .8.1 1.1.3l.1.1.2-1.4zm-4.7.1l-1.3 4.8-.6-3.2-.2-1.1c-.2-.5-.6-.9-1.1-1.1H8.3l-.1.1.1.1c.4.2.9.5 1.2.9l1.4 5.3h1.9l2.8-7h-1.9zm8 .7c-.1-.3-.4-.5-.7-.5h-1.5c-.2 0-.4.1-.5.3l-2.1 5h1.9l.4-.9h2.3l.2.9h1.7l-1.7-4.8zm-1.8 2.5l.7-2 1.1 2h-1.8z" fill="#1A1F71"/>
                              </svg>
                              {/* Mastercard */}
                              <svg className="w-8 h-5 rounded border border-gray-200 bg-white p-0.5" viewBox="0 0 24 15" fill="none">
                                <circle cx="9" cy="7.5" r="4.5" fill="#EB001B" opacity="0.9"/>
                                <circle cx="15" cy="7.5" r="4.5" fill="#F79E1B" opacity="0.9"/>
                                <path d="M12 4.6a4.5 4.5 0 010 5.8 4.5 4.5 0 010-5.8z" fill="#FF5F00"/>
                              </svg>
                              {/* Amex */}
                              <svg className="w-8 h-5 rounded border border-gray-200 bg-white p-0.5" viewBox="0 0 24 15" fill="none">
                                <rect width="24" height="15" rx="1" fill="#0070CD"/>
                                <path d="M4 11V4h2.5c.8 0 1.2.3 1.2.8v.5c0 .5-.3.8-.7.9.6.2.7.5.7 1v2H6.3V8.8c0-.3-.1-.5-.4-.5H5.4v2.7H4zm1.4-3.5h.7c.3 0 .4-.1.4-.3v-.3c0-.2-.1-.3-.4-.3h-.7v.9zm4.2 3.5V4h1.1l1 2.9 1-2.9h1.1v7h-1.3V6.2L11 8.8H10L8.7 6.2v4.8H9.6zm7.2 0V4h3.1v1.1h-2v1.6h1.8v1.1H18v1.8h2.1V11h-3.2z" fill="white"/>
                              </svg>
                            </div>
                          </div>
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Card Details Panel */}
                  {paymentMethod === "card" && showCardPayment && (
                    <CardPaymentLocal cardDetails={cardDetails} setCardDetails={setCardDetails} />
                  )}

                  <div className="pt-6">
                    <Button
                      type="submit"
                      disabled={isPaying}
                      className="w-full font-sans text-xs tracking-wider uppercase bg-furnizo-brown text-furnizo-beige hover:bg-furnizo-brown/95 py-4 h-12 cursor-pointer border border-transparent flex items-center justify-center gap-2"
                    >
                      {isPaying ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-furnizo-beige" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing Payment...
                        </>
                      ) : (
                        `Place Order — $${finalTotal}`
                      )}
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

      {isPlacingOrder && (
        <div className="fixed inset-0 bg-furnizo-beige/95 backdrop-blur-xs flex flex-col justify-center items-center z-50 animate-fadeIn">
          <div className="space-y-4 text-center">
            <div className="h-10 w-10 border-2 border-furnizo-brown border-t-transparent rounded-full animate-spin mx-auto" />
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-furnizo-brown block animate-pulse">
              Securing Your Order
            </span>
            <p className="font-sans text-xs text-furnizo-muted max-w-xs mx-auto leading-relaxed px-4">
              We are verifying stock levels and generating your invoice receipt. Please do not close this window.
            </p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
