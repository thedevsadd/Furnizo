"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import {
  ArrowLeft, ShoppingBag, Heart, Minus, Plus,
  Truck, RotateCcw, ShieldCheck,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Product } from "@/types";
import { useCartStore } from "@/lib/store/cartStore";
import { useWishlistStore } from "@/lib/store/wishlistStore";
import { useStockStore } from "@/lib/store/stockStore";
import { toast } from "sonner";
import StockBadge from "./StockBadge";
import ProductGrid from "./ProductGrid";

interface Props {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailsClient({ product, relatedProducts }: Props) {
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [cartPop, setCartPop] = useState(false);
  const [wishlistBounce, setWishlistBounce] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  // Mobile swipe state
  const [mobileIndex, setMobileIndex] = useState(0);
  const dragX = useMotionValue(0);

  const addItem = useCartStore((state) => state.addItem);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const isInWishlist = useWishlistStore((state) => state.hasItem(product.id));
  const getStock = useStockStore((state) => state.getStock);

  useEffect(() => { setMounted(true); }, []);

  const stock = mounted ? getStock(product.id) : product.stock;
  const isOutOfStock = stock <= 0;
  const maxQty = Math.min(stock, 10);

  // ── Handlers ────────────────────────────────────────────────────────────────
  const handleAddToCart = () => {
    if (isOutOfStock) { toast.error("This item is currently out of stock."); return; }
    for (let i = 0; i < quantity; i++) addItem(product);
    setCartPop(true);
    setTimeout(() => setCartPop(false), 500);
    toast.success(`${product.name} × ${quantity} added to cart.`, { icon: "🤎" });
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product.id);
    setWishlistBounce(true);
    setTimeout(() => setWishlistBounce(false), 400);
    const added = !isInWishlist;
    toast(added ? `Added to wishlist.` : `Removed from wishlist.`, { icon: added ? "🤎" : undefined });
  };

  const handleThumbnailClick = (index: number) => {
    setActiveIndex(index);
    setMobileIndex(index);
  };

  // Mobile drag to swipe
  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    const threshold = 60;
    if (info.offset.x < -threshold && mobileIndex < product.imageUrls.length - 1) {
      const next = mobileIndex + 1;
      setMobileIndex(next);
      setActiveIndex(next);
    } else if (info.offset.x > threshold && mobileIndex > 0) {
      const prev = mobileIndex - 1;
      setMobileIndex(prev);
      setActiveIndex(prev);
    }
    dragX.set(0);
  };

  return (
    <div className="space-y-24">

      {/* Back link */}
      <Link
        href="/products"
        className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-wider text-furnizo-muted hover:text-furnizo-charcoal transition-colors group"
      >
        <ArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform" />
        Back to Collection
      </Link>

      {/* ── Product layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

        {/* ── LEFT: Gallery ── */}
        <div className="lg:col-span-7">

          {/* Mobile: swipeable carousel */}
          <div className="block lg:hidden relative aspect-square w-full overflow-hidden rounded-xl bg-furnizo-border/20 mb-3">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={mobileIndex}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                style={{ x: dragX }}
                onDragEnd={handleDragEnd}
                className="absolute inset-0 cursor-grab active:cursor-grabbing"
              >
                <Image
                  src={product.imageUrls[mobileIndex] || product.imageUrls[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Dot indicators */}
            {product.imageUrls.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {product.imageUrls.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleThumbnailClick(i)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      i === mobileIndex ? "w-5 bg-furnizo-brown" : "w-1.5 bg-white/60"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Desktop: main image + thumbnails */}
          <div className="hidden lg:flex flex-row-reverse gap-4">
            {/* Main image */}
            <div
              className={`relative flex-1 aspect-square overflow-hidden rounded-xl bg-furnizo-border/20 cursor-zoom-in transition-all duration-300 ${
                zoomed ? "scale-105" : ""
              }`}
              onClick={() => setZoomed((z) => !z)}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={product.imageUrls[activeIndex] || product.imageUrls[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="55vw"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
              {zoomed && (
                <div className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 text-[10px] font-sans text-furnizo-charcoal">
                  Click to zoom out
                </div>
              )}
            </div>

            {/* Thumbnail strip */}
            {product.imageUrls.length > 1 && (
              <div className="flex flex-col gap-3 w-20 flex-shrink-0">
                {product.imageUrls.map((url, i) => (
                  <button
                    key={i}
                    onClick={() => handleThumbnailClick(i)}
                    className={`relative aspect-square w-full overflow-hidden rounded-lg border-2 transition-all cursor-pointer ${
                      i === activeIndex
                        ? "border-furnizo-brown opacity-100"
                        : "border-transparent opacity-55 hover:opacity-90"
                    }`}
                  >
                    <Image
                      src={url}
                      alt={`${product.name} — view ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── RIGHT: Info panel ── */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="space-y-5 flex-1">

            {/* Category + Stock badge */}
            <div className="flex items-center justify-between gap-4">
              <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-furnizo-brown">
                {product.category}
              </span>
              <StockBadge stock={stock} />
            </div>

            {/* Name */}
            <h1 className="font-sans text-3xl sm:text-4xl font-light tracking-wide text-furnizo-charcoal leading-snug">
              {product.name}
            </h1>

            {/* Price */}
            <p className="font-sans text-2xl font-light text-furnizo-brown">
              ${product.price.toLocaleString()}
            </p>

            {/* Stock line */}
            {!isOutOfStock && stock <= 5 && (
              <p className="font-sans text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-3 py-1 inline-block">
                Only {stock} left in stock
              </p>
            )}

            {/* Description */}
            <p className="font-sans text-sm text-furnizo-muted leading-relaxed font-light border-t border-furnizo-border pt-5">
              {product.description}
            </p>

            {/* Quantity stepper */}
            {!isOutOfStock && (
              <div className="flex items-center gap-4">
                <span className="font-sans text-xs uppercase tracking-wider text-furnizo-muted">Qty</span>
                <div className="flex items-center border border-furnizo-border rounded-md overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-2 text-furnizo-muted hover:text-furnizo-charcoal hover:bg-furnizo-border/30 transition-colors cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="px-5 py-2 font-sans text-sm text-furnizo-charcoal font-medium min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(maxQty, q + 1))}
                    className="px-3 py-2 text-furnizo-muted hover:text-furnizo-charcoal hover:bg-furnizo-border/30 transition-colors cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus size={12} />
                  </button>
                </div>
                <span className="font-sans text-xs text-furnizo-muted">
                  {stock} available
                </span>
              </div>
            )}

            {/* CTA row */}
            <div className="flex gap-3 pt-2">
              <motion.button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                animate={cartPop ? { scale: [1, 0.94, 1.04, 1] } : { scale: 1 }}
                transition={{ duration: 0.4 }}
                className={`flex-1 flex items-center justify-center gap-2.5 font-sans text-xs tracking-widest uppercase py-4 rounded-md transition-all cursor-pointer ${
                  isOutOfStock
                    ? "bg-furnizo-border text-furnizo-muted cursor-not-allowed"
                    : "bg-furnizo-brown text-furnizo-beige hover:bg-furnizo-charcoal"
                }`}
              >
                <ShoppingBag size={14} strokeWidth={1.6} />
                {isOutOfStock ? "Out of Stock" : "Add to Cart"}
              </motion.button>

              <motion.button
                onClick={handleToggleWishlist}
                animate={wishlistBounce ? { scale: [1, 1.3, 0.9, 1.1, 1] } : { scale: 1 }}
                transition={{ duration: 0.4 }}
                className="flex items-center justify-center w-14 rounded-md border border-furnizo-border text-furnizo-charcoal hover:border-furnizo-brown hover:text-furnizo-brown transition-all cursor-pointer"
                aria-label="Toggle Wishlist"
              >
                <Heart
                  size={18}
                  strokeWidth={1.6}
                  className={mounted && isInWishlist ? "fill-furnizo-brown text-furnizo-brown" : ""}
                />
              </motion.button>
            </div>

            {/* Trust row */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-furnizo-border">
              {[
                { icon: Truck, label: "Free Shipping", sub: "Orders over $200" },
                { icon: RotateCcw, label: "Easy Returns", sub: "30-day window" },
                { icon: ShieldCheck, label: "Secure Checkout", sub: "SSL encrypted" },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex flex-col items-center text-center gap-1.5">
                  <Icon size={16} className="text-furnizo-brown" strokeWidth={1.5} />
                  <span className="font-sans text-[10px] font-medium text-furnizo-charcoal">{label}</span>
                  <span className="font-sans text-[9px] text-furnizo-muted">{sub}</span>
                </div>
              ))}
            </div>

            {/* Accordion: Details + Shipping */}
            <Accordion multiple={false} className="border-t border-furnizo-border pt-2">
              <AccordionItem value="details" className="border-furnizo-border">
                <AccordionTrigger className="font-sans text-xs font-medium uppercase tracking-wider text-furnizo-charcoal hover:text-furnizo-brown hover:no-underline py-4">
                  Details & Materials
                </AccordionTrigger>
                <AccordionContent className="font-sans text-sm text-furnizo-muted leading-relaxed space-y-2 pb-4">
                  {product.material && (
                    <p><span className="font-medium text-furnizo-charcoal">Material:</span> {product.material}</p>
                  )}
                  {product.dimensions && (
                    <p><span className="font-medium text-furnizo-charcoal">Dimensions:</span> {product.dimensions}</p>
                  )}
                  <p><span className="font-medium text-furnizo-charcoal">Warranty:</span> 2-year structural frame warranty</p>
                  <p>Each piece is crafted to order and may feature subtle natural variations in grain and tone — a mark of authentic craftsmanship.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="shipping" className="border-furnizo-border">
                <AccordionTrigger className="font-sans text-xs font-medium uppercase tracking-wider text-furnizo-charcoal hover:text-furnizo-brown hover:no-underline py-4">
                  Shipping & Returns
                </AccordionTrigger>
                <AccordionContent className="font-sans text-sm text-furnizo-muted leading-relaxed space-y-2 pb-4">
                  <p><span className="font-medium text-furnizo-charcoal">Delivery:</span> Free white-glove delivery on orders over $200. Standard delivery in 5–10 business days.</p>
                  <p><span className="font-medium text-furnizo-charcoal">Returns:</span> We accept returns within 30 days of delivery. Items must be in original, unassembled condition.</p>
                  <p><span className="font-medium text-furnizo-charcoal">Damages:</span> In the unlikely event of damage in transit, please contact us within 48 hours with photos and we'll arrange a replacement.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

          </div>
        </div>
      </div>

      {/* ── Related Products ── */}
      {relatedProducts.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="border-t border-furnizo-border pt-16"
        >
          <div className="mb-10">
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-furnizo-brown">
              Curated Pairs
            </span>
            <h2 className="mt-2 font-sans text-2xl font-light text-furnizo-charcoal tracking-wide">
              You May Also Like
            </h2>
          </div>
          <ProductGrid products={relatedProducts.slice(0, 4)} />
        </motion.section>
      )}

    </div>
  );
}
