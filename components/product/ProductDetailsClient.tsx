"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import {
  ArrowLeft, ShoppingBag, Heart, Minus, Plus,
  Truck, RotateCcw, ShieldCheck,
  ChevronLeft, ChevronRight, Maximize2, X
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
  const router = useRouter();

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

  const handleBuyNow = () => {
    if (isOutOfStock) { toast.error("This item is currently out of stock."); return; }
    for (let i = 0; i < quantity; i++) addItem(product);
    router.push("/checkout");
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
    <div className="space-y-8">

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
          <div className="block lg:hidden">
            <div 
              onClick={() => {
                setActiveIndex(mobileIndex);
                setZoomed(true);
              }}
              className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-furnizo-border/20 mb-6 shadow-sm cursor-zoom-in"
            >
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
                    className="object-contain bg-white"
                    sizes="100vw"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Maximize option in the top right corner for mobile */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex(mobileIndex);
                  setZoomed(true);
                }}
                className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded bg-white/90 backdrop-blur-sm border border-furnizo-border/30 text-furnizo-charcoal shadow-sm z-10"
                aria-label="Maximize image"
              >
                <Maximize2 size={14} />
              </button>

              {/* Mobile Overlaid Thumbnails at the bottom of the image box */}
              {product.imageUrls.length > 1 && (
                <div 
                  className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-row justify-center gap-2.5 z-10 bg-white/35 backdrop-blur-md p-1.5 rounded-xl border border-white/40 shadow-sm max-w-[90%] overflow-x-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  {product.imageUrls.map((url, i) => (
                    <button
                      key={i}
                      onClick={() => handleThumbnailClick(i)}
                      className={`relative aspect-square h-14 w-14 overflow-hidden rounded-lg border-2 transition-all cursor-pointer flex-shrink-0 ${
                        i === mobileIndex
                          ? "border-furnizo-brown scale-105 opacity-100"
                          : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={url}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Desktop: main image + overlaid thumbnails */}
          <div className="hidden lg:flex flex-col gap-5 w-full items-center">
            {/* Main image container */}
            <div
              className="relative w-full max-w-md aspect-[3/4] overflow-hidden rounded-xl bg-furnizo-border/10 border border-furnizo-border/20 group shadow-sm animate-fade-in"
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
                    className="object-contain bg-white"
                    sizes="50vw"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows on both sides */}
              {product.imageUrls.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveIndex((prev) => (prev > 0 ? prev - 1 : product.imageUrls.length - 1));
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-furnizo-charcoal hover:bg-furnizo-charcoal hover:text-white transition-all duration-200 cursor-pointer shadow opacity-0 group-hover:opacity-100 z-10"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={16} strokeWidth={2} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveIndex((prev) => (prev < product.imageUrls.length - 1 ? prev + 1 : 0));
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-furnizo-charcoal hover:bg-furnizo-charcoal hover:text-white transition-all duration-200 cursor-pointer shadow opacity-0 group-hover:opacity-100 z-10"
                    aria-label="Next image"
                  >
                    <ChevronRight size={16} strokeWidth={2} />
                  </button>
                </>
              )}

              {/* Maximize option in the top right corner */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setZoomed(true);
                }}
                className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded bg-white/90 backdrop-blur-sm border border-furnizo-border/30 text-furnizo-charcoal hover:bg-furnizo-brown hover:text-white transition-all duration-200 cursor-pointer shadow-sm z-10"
                aria-label="Maximize image"
              >
                <Maximize2 size={14} />
              </button>

              {/* Overlay Thumbnail strip at the bottom of the image box */}
              {product.imageUrls.length > 1 && (
                <div 
                  className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-row justify-center gap-2 z-10 bg-white/35 backdrop-blur-md p-1 rounded-xl border border-white/40 shadow-sm max-w-[90%] overflow-x-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  {product.imageUrls.map((url, i) => (
                    <button
                      key={i}
                      onClick={() => handleThumbnailClick(i)}
                      className={`relative aspect-square h-11 w-11 overflow-hidden rounded-lg border-2 transition-all cursor-pointer flex-shrink-0 ${
                        i === activeIndex
                          ? "border-furnizo-brown scale-105 opacity-100"
                          : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={url}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="44px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── RIGHT: Info panel ── */}
        <div className="relative lg:col-span-5 flex flex-col lg:bg-transparent bg-furnizo-brown lg:text-furnizo-charcoal text-white lg:p-0 p-6 sm:p-8 pb-8 lg:pb-0 lg:rounded-2xl rounded-3xl shadow-md lg:shadow-none lg:border-0 border border-furnizo-brown/20 lg:mt-0 mt-6 -mx-4 sm:-mx-6 lg:mx-0 transition-all duration-300">
          <div className="space-y-5 flex-1">

            {/* Category + Stock badge */}
            <div className="flex items-center justify-between gap-4">
              <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] lg:text-furnizo-brown text-furnizo-beige">
                {product.category}
              </span>
              <StockBadge stock={stock} />
            </div>

            {/* Name */}
            <h1 className="font-sans text-3xl sm:text-4xl font-light tracking-wide lg:text-furnizo-charcoal text-white leading-snug">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="font-sans text-2xl font-light lg:text-furnizo-brown text-white">
                ${product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <>
                  <span className="font-sans text-lg font-light lg:text-furnizo-muted/70 text-white/50 line-through">
                    ${product.originalPrice.toLocaleString()}
                  </span>
                  <span className="font-sans text-[10px] font-semibold uppercase tracking-wider text-white bg-furnizo-brown px-2 py-0.5 rounded">
                    Save ${product.originalPrice - product.price}
                  </span>
                </>
              )}
            </div>

            {/* Stock line */}
            {!isOutOfStock && stock <= 5 && (
              <p className="font-sans text-xs lg:text-amber-700 lg:bg-amber-50 lg:border-amber-200 text-amber-100 bg-amber-950/40 border border-amber-800/30 rounded-full px-3 py-1 inline-block">
                Only {stock} left in stock
              </p>
            )}

            {/* Description */}
            <p className="font-sans text-sm lg:text-furnizo-muted text-white/80 leading-relaxed font-light border-t lg:border-furnizo-border border-white/20 pt-5">
              {product.description}
            </p>

            {/* Quantity stepper */}
            {!isOutOfStock && (
              <div className="flex items-center gap-4">
                <span className="font-sans text-xs uppercase tracking-wider lg:text-furnizo-muted text-white/70">Qty</span>
                <div className="flex items-center border lg:border-furnizo-border border-white/30 rounded-md overflow-hidden bg-black/5 lg:bg-transparent">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-2 lg:text-furnizo-muted text-white/80 lg:hover:text-furnizo-charcoal hover:text-white lg:hover:bg-furnizo-border/30 hover:bg-white/10 transition-colors cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="px-5 py-2 font-sans text-sm lg:text-furnizo-charcoal text-white font-medium min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(maxQty, q + 1))}
                    className="px-3 py-2 lg:text-furnizo-muted text-white/80 lg:hover:text-furnizo-charcoal hover:text-white lg:hover:bg-furnizo-border/30 hover:bg-white/10 transition-colors cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus size={12} />
                  </button>
                </div>
                <span className="font-sans text-xs lg:text-furnizo-muted text-white/70">
                  {stock} available
                </span>
              </div>
            )}

            {/* CTA row */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <motion.button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                animate={cartPop ? { scale: [1, 0.94, 1.04, 1] } : { scale: 1 }}
                transition={{ duration: 0.4 }}
                className={`flex-1 flex items-center justify-center gap-2.5 font-sans text-xs tracking-widest uppercase py-4 rounded-md transition-all cursor-pointer ${
                  isOutOfStock
                    ? "bg-furnizo-border text-furnizo-muted cursor-not-allowed"
                    : "lg:bg-white lg:text-furnizo-charcoal lg:border lg:border-furnizo-border lg:hover:bg-furnizo-border/20 bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                <ShoppingBag size={14} strokeWidth={1.6} />
                {isOutOfStock ? "Out of Stock" : "Add to Cart"}
              </motion.button>

              <motion.button
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className={`flex-1 flex items-center justify-center gap-2.5 font-sans text-xs tracking-widest uppercase py-4 rounded-md transition-all cursor-pointer ${
                  isOutOfStock
                    ? "bg-furnizo-border text-furnizo-muted cursor-not-allowed"
                    : "lg:bg-furnizo-brown lg:text-furnizo-beige lg:hover:bg-furnizo-charcoal bg-white text-furnizo-brown hover:bg-white/90"
                }`}
              >
                Buy Now
              </motion.button>

              <motion.button
                onClick={handleToggleWishlist}
                animate={wishlistBounce ? { scale: [1, 1.3, 0.9, 1.1, 1] } : { scale: 1 }}
                transition={{ duration: 0.4 }}
                className="flex items-center justify-center w-full sm:w-14 py-4 rounded-md border lg:border-furnizo-border border-white/30 lg:text-furnizo-charcoal text-white lg:hover:border-furnizo-brown lg:hover:text-furnizo-brown hover:border-white hover:text-white transition-all cursor-pointer"
                aria-label="Toggle Wishlist"
              >
                <Heart
                  size={18}
                  strokeWidth={1.6}
                  className={mounted && isInWishlist ? "lg:fill-furnizo-brown lg:text-furnizo-brown fill-white text-white" : ""}
                />
              </motion.button>
            </div>

            {/* Trust row */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t lg:border-furnizo-border border-white/20">
              {[
                { icon: Truck, label: "Free Shipping", sub: "Orders over $200" },
                { icon: RotateCcw, label: "Easy Returns", sub: "30-day window" },
                { icon: ShieldCheck, label: "Secure Checkout", sub: "SSL encrypted" },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex flex-col items-center text-center gap-1.5">
                  <Icon size={16} className="lg:text-furnizo-brown text-furnizo-beige" strokeWidth={1.5} />
                  <span className="font-sans text-[10px] font-medium lg:text-furnizo-charcoal text-white">{label}</span>
                  <span className="font-sans text-[9px] lg:text-furnizo-muted text-white/70">{sub}</span>
                </div>
              ))}
            </div>

            {/* Accordion: Details + Shipping */}
            <Accordion multiple={false} className="border-t lg:border-furnizo-border border-white/20 pt-2">
              <AccordionItem value="details" className="lg:border-furnizo-border border-white/10">
                <AccordionTrigger className="font-sans text-xs font-medium uppercase tracking-wider lg:text-furnizo-charcoal text-white lg:hover:text-furnizo-brown hover:text-white/80 hover:no-underline py-4">
                  Details & Materials
                </AccordionTrigger>
                <AccordionContent className="font-sans text-sm lg:text-furnizo-muted text-white/85 leading-relaxed space-y-2 pb-4">
                  {product.material && (
                    <p><span className="font-medium lg:text-furnizo-charcoal text-white">Material:</span> {product.material}</p>
                  )}
                  {product.dimensions && (
                    <p><span className="font-medium lg:text-furnizo-charcoal text-white">Dimensions:</span> {product.dimensions}</p>
                  )}
                  <p><span className="font-medium lg:text-furnizo-charcoal text-white">Warranty:</span> 2-year structural frame warranty</p>
                  <p>Each piece is crafted to order and may feature subtle natural variations in grain and tone — a mark of authentic craftsmanship.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="shipping" className="lg:border-furnizo-border border-white/10">
                <AccordionTrigger className="font-sans text-xs font-medium uppercase tracking-wider lg:text-furnizo-charcoal text-white lg:hover:text-furnizo-brown hover:text-white/80 hover:no-underline py-4">
                  Shipping & Returns
                </AccordionTrigger>
                <AccordionContent className="font-sans text-sm lg:text-furnizo-muted text-white/85 leading-relaxed space-y-2 pb-4">
                  <p><span className="font-medium lg:text-furnizo-charcoal text-white">Delivery:</span> Free white-glove delivery on orders over $200. Standard delivery in 5–10 business days.</p>
                  <p><span className="font-medium lg:text-furnizo-charcoal text-white">Returns:</span> We accept returns within 30 days of delivery. Items must be in original, unassembled condition.</p>
                  <p><span className="font-medium lg:text-furnizo-charcoal text-white">Damages:</span> In the unlikely event of damage in transit, please contact us within 48 hours with photos and we'll arrange a replacement.</p>
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

      {/* Lightbox / Fullscreen Modal */}
      <AnimatePresence>
        {zoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4 sm:p-10 select-none"
            onClick={() => setZoomed(false)}
          >
            {/* Close Button */}
            <button
              onClick={() => setZoomed(false)}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors cursor-pointer p-2 rounded-full hover:bg-white/10"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            {/* Previous Arrow */}
            {product.imageUrls.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex((prev) => (prev > 0 ? prev - 1 : product.imageUrls.length - 1));
                }}
                className="absolute left-6 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200 cursor-pointer shadow z-10"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} strokeWidth={2} />
              </button>
            )}

            {/* Next Arrow */}
            {product.imageUrls.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex((prev) => (prev < product.imageUrls.length - 1 ? prev + 1 : 0));
                }}
                className="absolute right-6 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200 cursor-pointer shadow z-10"
                aria-label="Next image"
              >
                <ChevronRight size={24} strokeWidth={2} />
              </button>
            )}

            {/* Main Lightbox Image */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl h-[70vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={product.imageUrls[activeIndex] || product.imageUrls[0]}
                alt={product.name}
                fill
                className="object-contain"
                sizes="85vw"
                priority
              />
            </motion.div>

            {/* Thumbnail Navigation Bar at the bottom of the modal */}
            {product.imageUrls.length > 1 && (
              <div 
                className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10 max-w-[90vw] overflow-x-auto py-2 px-4 rounded-full bg-white/5 backdrop-blur-md"
                onClick={(e) => e.stopPropagation()}
              >
                {product.imageUrls.map((url, i) => (
                  <button
                    key={i}
                    onClick={() => handleThumbnailClick(i)}
                    className={`relative aspect-square h-12 w-12 overflow-hidden rounded-md border-2 transition-all cursor-pointer flex-shrink-0 ${
                      i === activeIndex
                        ? "border-white opacity-100 scale-105"
                        : "border-transparent opacity-40 hover:opacity-80"
                    }`}
                  >
                    <Image
                      src={url}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
