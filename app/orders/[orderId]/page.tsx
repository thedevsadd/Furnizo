"use client";

import { use, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ChevronRight, ShoppingBag } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EmptyState from "@/components/shared/EmptyState";
import { useOrderStore, getOrderStatus } from "@/lib/store/orderStore";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface PageProps {
  params: Promise<{
    orderId: string;
  }>;
}

export default function OrderConfirmationPage({ params }: PageProps) {
  const unwrappedParams = use(params);
  const orderId = unwrappedParams.orderId;
  const [mounted, setMounted] = useState(false);
  const getOrderById = useOrderStore((state) => state.getOrderById);
  const cancelOrder = useOrderStore((state) => state.cancelOrder);
  const order = getOrderById(orderId);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setTick((t) => t + 1);
    }, 1000);
    return () => clearInterval(interval);
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

  if (!order) {
    return (
      <div className="flex flex-col min-h-screen bg-furnizo-beige">
        <Navbar />
        <main className="flex-grow py-16 mx-auto max-w-3xl w-full px-4 sm:px-6">
          <EmptyState
            title="Order not found"
            description="We couldn't find an order matching that identifier. Please check your order history."
            actionText="View Order History"
            actionHref="/orders"
          />
        </main>
        <Footer />
      </div>
    );
  }

  const currentStatus = getOrderStatus(order);
  const canCancel = currentStatus !== "Cancelled" && currentStatus !== "Out for Delivery";

  return (
    <div className="flex flex-col min-h-screen bg-furnizo-beige">
      <Navbar />

      <main className="flex-grow py-16 mx-auto max-w-3xl w-full px-4 sm:px-6">
        <div className="space-y-12">
          
          {/* Header Success Section */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              {currentStatus === "Cancelled" ? (
                <div className="h-12 w-12 rounded-full border border-red-200 bg-red-50 flex items-center justify-center text-red-600 text-xl font-bold font-sans">
                  ×
                </div>
              ) : (
                <CheckCircle2 size={48} className="text-furnizo-brown animate-pulse" />
              )}
            </div>
            <div className="space-y-2">
              <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-furnizo-brown">
                Receipt
              </span>
              <h1 className="font-sans text-3xl font-light text-furnizo-charcoal tracking-wide">
                {currentStatus === "Cancelled" ? "Order Cancelled" : "Thank You for Your Order"}
              </h1>
              <p className="font-sans text-sm text-furnizo-muted">
                Order ID: <strong className="text-furnizo-charcoal font-medium">{order.id}</strong>
              </p>
            </div>
          </div>

          {/* Summary Details Panel */}
          <div className="border border-furnizo-border bg-furnizo-border/10 rounded-lg p-6 space-y-6">
            
            {/* Order Metadata */}
            <div className="grid grid-cols-2 gap-4 border-b border-furnizo-border pb-4 text-xs font-sans">
              <div>
                <span className="text-furnizo-muted block">Date Placed</span>
                <span className="text-furnizo-charcoal font-medium mt-1 block">
                  {new Date(order.date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div>
                <span className="text-furnizo-muted block">Status</span>
                <span className={`font-medium mt-1 block uppercase tracking-wider ${
                  currentStatus === "Cancelled" ? "text-red-700" : "text-emerald-700"
                }`}>
                  {currentStatus}
                </span>
              </div>
            </div>

            {/* Items List */}
            <div className="space-y-4 border-b border-furnizo-border pb-6">
              <h3 className="font-sans text-xs font-medium uppercase tracking-[0.15em] text-furnizo-charcoal">
                Items Purchased
              </h3>
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.product.id} className="flex gap-4 items-center">
                    <div className="relative h-12 w-12 overflow-hidden rounded bg-furnizo-border/20 flex-shrink-0">
                      <Image
                        src={item.product.imageUrls[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div className="flex-grow min-w-0">
                      <h4 className="font-sans text-xs font-medium text-furnizo-charcoal line-clamp-1">
                        {item.product.name}
                      </h4>
                      <p className="text-[10px] text-furnizo-muted font-sans mt-0.5">
                        Quantity: {item.quantity} &middot; ${item.product.price} each
                      </p>
                    </div>
                    <span className="font-sans text-xs font-light text-furnizo-charcoal flex-shrink-0">
                      ${item.product.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="border-b border-furnizo-border pb-6 space-y-3">
              <h3 className="font-sans text-xs font-medium uppercase tracking-[0.15em] text-furnizo-charcoal">
                Shipping Address
              </h3>
              <div className="text-xs font-sans text-furnizo-muted space-y-1 leading-relaxed">
                <p className="text-furnizo-charcoal font-medium">{order.customerInfo.name}</p>
                <p>{order.customerInfo.address}</p>
                <p>
                  {order.customerInfo.city}, {order.customerInfo.postalCode}
                </p>
                <p>Phone: {order.customerInfo.phone}</p>
                <p>Email: {order.customerInfo.email}</p>
              </div>
            </div>

            {/* Pricing subtotal */}
            <div className="flex justify-between font-sans text-sm font-medium text-furnizo-charcoal pt-2">
              <span>Grand Total</span>
              <span>${order.total}</span>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <Link href="/products" className="w-full">
              <Button className="w-full font-sans text-xs tracking-wider uppercase bg-furnizo-brown text-furnizo-beige hover:bg-furnizo-brown/95 py-4 h-12 flex items-center justify-center gap-2 cursor-pointer border border-transparent">
                Continue Shopping
                <ChevronRight size={14} />
              </Button>
            </Link>

            {currentStatus !== "Cancelled" && (
              <Link href={`/order-status?id=${order.id}`} className="w-full">
                <Button variant="outline" className="w-full font-sans text-xs tracking-wider uppercase border-furnizo-brown text-furnizo-brown hover:bg-furnizo-brown hover:text-furnizo-beige py-4 h-12 flex items-center justify-center gap-2 cursor-pointer">
                  Track Delivery
                </Button>
              </Link>
            )}

            {canCancel && (
              <Button
                onClick={() => {
                  if (confirm("Are you sure you want to cancel this order?")) {
                    cancelOrder(order.id);
                    toast.success("Order cancelled successfully.", { icon: "🧹" });
                  }
                }}
                className="w-full font-sans text-xs tracking-wider uppercase bg-red-600 hover:bg-red-700 text-white py-4 h-12 flex items-center justify-center gap-2 cursor-pointer border border-transparent"
              >
                Cancel Order
              </Button>
            )}

            <Link href="/orders" className="w-full">
              <Button variant="outline" className="w-full font-sans text-xs tracking-wider uppercase border-furnizo-border text-furnizo-charcoal hover:bg-furnizo-border/20 py-4 h-12 flex items-center justify-center gap-2 cursor-pointer">
                <ShoppingBag size={14} />
                View All Orders
              </Button>
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
