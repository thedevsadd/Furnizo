"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useOrderStore } from "@/lib/store/orderStore";
import { Order } from "@/types";
import { Check, Truck, Package, Calendar, Search } from "lucide-react";
import Image from "next/image";

export default function OrderStatusPage() {
  const [orderIdInput, setOrderIdInput] = useState("");
  const [searchedId, setSearchedId] = useState("");
  const [trackedOrder, setTrackedOrder] = useState<Order | null>(null);
  const [searched, setSearched] = useState(false);

  const orders = useOrderStore((state) => state.orders);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    const targetId = orderIdInput.trim();
    if (!targetId) return;

    setSearchedId(targetId);
    setSearched(true);

    // Check for demo case
    if (targetId.toUpperCase() === "DEMO-TRACK-100") {
      const demoOrder: Order = {
        id: "DEMO-TRACK-100",
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
        items: [
          {
            product: {
              id: "prod-01",
              slug: "soren-lounge-chair",
              name: "Soren Lounge Chair",
              category: "Chair",
              tags: ["lounge", "oak", "minimalist", "living-room"],
              price: 450,
              description: "Designed for comfort and visual lightness...",
              imageUrls: ["/Furnizo-Assets/Products/Chair/Chair 1/Main-Product.jpeg"],
              stock: 8,
            },
            quantity: 1,
          },
          {
            product: {
              id: "prod-02",
              slug: "nils-accent-stool",
              name: "Nils Accent Stool",
              category: "Chair",
              tags: ["stool", "oak", "minimal", "side"],
              price: 120,
              description: "Multi-functional and compact...",
              imageUrls: ["/Furnizo-Assets/Products/Chair/Chair 2/Main-Product.jpeg"],
              stock: 15,
            },
            quantity: 1,
          },
        ],
        total: 570,
        customerInfo: {
          name: "Alexander Mercer",
          email: "alexander@example.com",
          address: "148 Oiled Ash Avenue, Apt 4B",
          city: "Copenhagen",
          postalCode: "1050",
          phone: "+45 91 82 73 64",
        },
        status: "Shipped",
      };
      setTrackedOrder(demoOrder);
      return;
    }

    // Search in store
    const found = orders.find((o) => o.id === targetId);
    setTrackedOrder(found || null);
  };

  const steps = [
    { label: "Confirmed", status: "Confirmed" },
    { label: "Processing", status: "Processing" },
    { label: "Shipped", status: "Shipped" },
    { label: "Delivered", status: "Delivered" },
  ];

  const getStepIndex = (status: string) => {
    return steps.findIndex((s) => s.status === status);
  };

  const activeIndex = trackedOrder ? getStepIndex(trackedOrder.status) : -1;

  return (
    <div className="flex flex-col min-h-screen bg-furnizo-beige">
      <Navbar />

      <main className="flex-grow py-16 mx-auto max-w-3xl w-full px-4 sm:px-6">
        <div className="space-y-4 mb-12">
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-furnizo-brown">
            Delivery Status
          </span>
          <h1 className="font-sans text-3xl sm:text-4xl font-light text-furnizo-charcoal tracking-wide">
            Track Your Order
          </h1>
          <p className="font-sans text-xs sm:text-sm text-furnizo-muted font-light leading-relaxed">
            Enter your order reference identifier below to trace its dispatch status and estimated receipt timeline.
          </p>
        </div>

        {/* Tracking Form */}
        <form onSubmit={handleTrack} className="flex gap-3 mb-12">
          <div className="relative flex-grow">
            <input
              type="text"
              value={orderIdInput}
              onChange={(e) => setOrderIdInput(e.target.value)}
              placeholder="e.g. DEMO-TRACK-100 or Order ID"
              className="w-full bg-white border border-furnizo-border rounded px-4 py-3 text-sm font-sans text-furnizo-charcoal placeholder-furnizo-muted/50 focus:outline-hidden focus:border-furnizo-brown/50"
            />
            <Search className="absolute right-4 top-3.5 text-furnizo-muted/40 h-4 w-4" />
          </div>
          <button
            type="submit"
            className="bg-furnizo-brown text-furnizo-beige hover:bg-furnizo-charcoal font-sans text-xs tracking-widest uppercase px-6 py-3 rounded transition-colors cursor-pointer"
          >
            Track
          </button>
        </form>

        {searched && (
          <div className="space-y-8 animate-fadeIn">
            {trackedOrder ? (
              <div className="border border-furnizo-border bg-white rounded-lg p-6 sm:p-8 space-y-8 shadow-sm">
                
                {/* Order Summary Metadata */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-furnizo-border/50 pb-6">
                  <div>
                    <span className="font-sans text-[9px] uppercase tracking-wider text-furnizo-muted">Order Identifier</span>
                    <h2 className="font-sans text-base font-semibold text-furnizo-charcoal">{trackedOrder.id}</h2>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-sans text-furnizo-muted">
                    <Calendar size={14} />
                    <span>Placed on {new Date(trackedOrder.date).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Progress Visual Tracker */}
                <div className="py-4">
                  <div className="relative flex justify-between items-center w-full">
                    {/* Connecting Bar */}
                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-furnizo-border/50 -translate-y-1/2 z-0" />
                    <div
                      className="absolute top-1/2 left-0 h-0.5 bg-furnizo-brown -translate-y-1/2 z-0 transition-all duration-700 ease-out"
                      style={{ width: `${(activeIndex / (steps.length - 1)) * 100}%` }}
                    />

                    {/* Step Nodes */}
                    {steps.map((step, idx) => {
                      const isCompleted = idx <= activeIndex;
                      const isActive = idx === activeIndex;

                      return (
                        <div key={idx} className="relative z-10 flex flex-col items-center">
                          <div
                            className={`h-7 w-7 rounded-full flex items-center justify-center border transition-all duration-500 ${
                              isCompleted
                                ? "bg-furnizo-brown border-furnizo-brown text-white"
                                : "bg-white border-furnizo-border text-furnizo-muted"
                            } ${isActive ? "ring-4 ring-furnizo-brown/20 scale-110" : ""}`}
                          >
                            {isCompleted ? <Check size={12} strokeWidth={3} /> : <span className="text-[10px] font-sans font-medium">{idx + 1}</span>}
                          </div>
                          <span
                            className={`absolute -bottom-6 font-sans text-[9px] uppercase tracking-wider font-semibold whitespace-nowrap mt-2 ${
                              isCompleted ? "text-furnizo-charcoal" : "text-furnizo-muted"
                            }`}
                          >
                            {step.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Order Details & Summary Split */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-furnizo-border/50 pt-10 mt-6">
                  {/* Items Ordered */}
                  <div className="space-y-4">
                    <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-furnizo-charcoal">
                      Shipment Items
                    </h3>
                    <div className="space-y-3">
                      {trackedOrder.items.map((item, idx) => (
                        <div key={idx} className="flex gap-3">
                          <div className="relative h-12 w-12 border border-furnizo-border rounded overflow-hidden flex-shrink-0 bg-furnizo-beige">
                            {item.product.imageUrls?.[0] && (
                              <Image
                                src={item.product.imageUrls[0]}
                                alt={item.product.name}
                                fill
                                className="object-cover"
                              />
                            )}
                          </div>
                          <div className="flex-grow">
                            <h4 className="font-sans text-xs font-medium text-furnizo-charcoal">{item.product.name}</h4>
                            <p className="font-sans text-[10px] text-furnizo-muted">
                              Qty: {item.quantity} × ${item.product.price}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div className="space-y-4">
                    <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-furnizo-charcoal">
                      Destination
                    </h3>
                    <div className="font-sans text-xs text-furnizo-muted space-y-1">
                      <p className="font-medium text-furnizo-charcoal">{trackedOrder.customerInfo.name}</p>
                      <p>{trackedOrder.customerInfo.address}</p>
                      <p>
                        {trackedOrder.customerInfo.city}, {trackedOrder.customerInfo.postalCode}
                      </p>
                      <p>{trackedOrder.customerInfo.phone}</p>
                    </div>

                    <div className="border-t border-furnizo-border/40 pt-4 flex justify-between items-baseline">
                      <span className="font-sans text-xs text-furnizo-muted">Transaction Total</span>
                      <span className="font-sans text-base font-semibold text-furnizo-brown">
                        ${trackedOrder.total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              <div className="border border-furnizo-border bg-white rounded-lg p-10 text-center space-y-3 shadow-sm">
                <p className="font-sans text-sm text-furnizo-charcoal font-medium">
                  Reference ID Not Found
                </p>
                <p className="font-sans text-xs text-furnizo-muted max-w-sm mx-auto leading-relaxed">
                  We were unable to locate an active dispatch matching reference "{searchedId}". Please verify the identifier and try again, or use the demo tracker <strong className="text-furnizo-brown">DEMO-TRACK-100</strong>.
                </p>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
