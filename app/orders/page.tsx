"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, Calendar, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EmptyState from "@/components/shared/EmptyState";
import { useOrderStore } from "@/lib/store/orderStore";
import { Button } from "@/components/ui/button";

export default function OrderHistoryPage() {
  const [mounted, setMounted] = useState(false);
  const orders = useOrderStore((state) => state.orders);

  useEffect(() => {
    setMounted(true);
  }, []);

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

      <main className="flex-grow py-16 mx-auto max-w-3xl w-full px-4 sm:px-6">
        <div className="space-y-4 mb-12">
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-furnizo-brown">
            History
          </span>
          <h1 className="font-sans text-3xl sm:text-4xl font-light text-furnizo-charcoal tracking-wide">
            Your Orders
          </h1>
        </div>

        {orders.length === 0 ? (
          <EmptyState
            title="No orders found"
            description="You haven't placed any orders yet. Head to the store to configure your space."
            actionText="Start Shopping"
            actionHref="/products"
          />
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border border-furnizo-border bg-furnizo-border/10 rounded p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                
                {/* Details Left */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-sans text-furnizo-muted">
                    <Calendar size={14} className="text-furnizo-charcoal/70" />
                    <span>
                      {new Date(order.date).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <h3 className="font-sans text-sm font-medium text-furnizo-charcoal">
                    Order ID: <strong className="text-furnizo-charcoal font-medium">{order.id}</strong>
                  </h3>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-furnizo-muted font-sans">
                      Items: {order.items.reduce((acc, item) => acc + item.quantity, 0)}
                    </span>
                    <span className="text-furnizo-muted font-sans font-light">|</span>
                    <span className="text-furnizo-charcoal font-sans font-medium">
                      Total: ${order.total}
                    </span>
                  </div>
                </div>

                {/* Tracking & Navigation Right */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 border-furnizo-border/50 pt-4 sm:pt-0">
                  <span className="font-sans text-xs font-medium uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-100/50">
                    {order.status}
                  </span>
                  <Link href={`/orders/${order.id}`}>
                    <Button
                      variant="ghost"
                      className="font-sans text-xs text-furnizo-brown hover:text-furnizo-charcoal hover:bg-transparent p-0 flex items-center gap-1.5 cursor-pointer"
                    >
                      View Receipt
                      <ArrowRight size={12} />
                    </Button>
                  </Link>
                </div>

              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
