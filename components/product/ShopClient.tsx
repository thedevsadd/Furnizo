"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Product } from "@/types";
import ProductGrid from "./ProductGrid";
import ProductSkeletonGrid from "./ProductSkeletonGrid";

interface ShopClientProps {
  initialProducts: Product[];
}

const SORT_OPTIONS = [
  { value: "default", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "popularity", label: "Popularity" },
];

const PAGE_SIZE = 12;

export default function ShopClient({ initialProducts }: ShopClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const allCategories = Array.from(new Set(initialProducts.map((p) => p.category))).sort();
  const maxProductPrice = Math.max(...initialProducts.map((p) => p.price));

  // ── Filter state ────────────────────────────────────────────────────────────
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    const qCat = searchParams.get("category");
    return qCat ? [qCat] : [];
  });
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "default");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxProductPrice]);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [selectedCategories, searchTerm, sortBy, priceRange]);

  const hasFilters =
    selectedCategories.length > 0 ||
    searchTerm.trim() !== "" ||
    sortBy !== "default" ||
    priceRange[0] > 0 ||
    priceRange[1] < maxProductPrice;

  // ── Filtered & sorted products ──────────────────────────────────────────────
  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    if (searchTerm.trim()) {
      const lower = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(lower) ||
          p.description.toLowerCase().includes(lower) ||
          p.tags.some((t) => t.toLowerCase().includes(lower))
      );
    }

    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") result.sort((a, b) => b.price - a.price);
    else if (sortBy === "popularity") result.sort((a, b) => b.stock - a.stock);

    return result;
  }, [initialProducts, selectedCategories, searchTerm, priceRange, sortBy]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  // ── Handlers ────────────────────────────────────────────────────────────────
  const toggleCategory = useCallback((cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
    setVisibleCount(PAGE_SIZE);
  }, []);

  const clearAll = useCallback(() => {
    setSelectedCategories([]);
    setSearchTerm("");
    setSortBy("default");
    setPriceRange([0, maxProductPrice]);
    setVisibleCount(PAGE_SIZE);
    router.push("/products", { scroll: false });
  }, [maxProductPrice, router]);

  const removeChip = useCallback((type: string, value?: string) => {
    if (type === "category" && value) {
      setSelectedCategories((prev) => prev.filter((c) => c !== value));
    } else if (type === "search") {
      setSearchTerm("");
    } else if (type === "price") {
      setPriceRange([0, maxProductPrice]);
    }
    setVisibleCount(PAGE_SIZE);
  }, [maxProductPrice]);

  // ── Sidebar content (shared between desktop sidebar & mobile drawer) ─────────
  const SidebarContent = () => (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h3 className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-furnizo-charcoal mb-4">
          Category
        </h3>
        <div className="space-y-2.5">
          {allCategories.map((cat) => {
            const checked = selectedCategories.includes(cat);
            const count = initialProducts.filter((p) => p.category === cat).length;
            return (
              <label
                key={cat}
                className="flex items-center justify-between gap-3 cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <div
                    onClick={() => toggleCategory(cat)}
                    className={`h-4 w-4 rounded border flex items-center justify-center flex-shrink-0 transition-all cursor-pointer ${
                      checked
                        ? "bg-furnizo-brown border-furnizo-brown"
                        : "border-furnizo-border group-hover:border-furnizo-brown"
                    }`}
                  >
                    {checked && (
                      <svg className="h-2.5 w-2.5 text-white" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <span
                    onClick={() => toggleCategory(cat)}
                    className={`font-sans text-sm transition-colors ${
                      checked ? "text-furnizo-charcoal font-medium" : "text-furnizo-muted group-hover:text-furnizo-charcoal"
                    }`}
                  >
                    {cat}
                  </span>
                </div>
                <span className="font-sans text-[11px] text-furnizo-muted/60">{count}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-furnizo-charcoal mb-4">
          Price Range
        </h3>
        <Slider
          min={0}
          max={maxProductPrice}
          step={50}
          value={priceRange}
          onValueChange={(val) => {
            setPriceRange(val as [number, number]);
            setVisibleCount(PAGE_SIZE);
          }}
          className="mb-4"
        />
        <div className="flex items-center justify-between">
          <span className="font-sans text-xs text-furnizo-muted">${priceRange[0]}</span>
          <span className="font-sans text-xs text-furnizo-muted">${priceRange[1].toLocaleString()}</span>
        </div>
      </div>

      {/* Sort */}
      <div>
        <h3 className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-furnizo-charcoal mb-4">
          Sort By
        </h3>
        <div className="space-y-2">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => { setSortBy(opt.value); setVisibleCount(PAGE_SIZE); }}
              className={`w-full text-left font-sans text-sm py-1 transition-colors cursor-pointer ${
                sortBy === opt.value
                  ? "text-furnizo-brown font-medium"
                  : "text-furnizo-muted hover:text-furnizo-charcoal"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Clear All */}
      {hasFilters && (
        <button
          onClick={clearAll}
          className="w-full font-sans text-xs tracking-wider text-furnizo-brown border border-furnizo-brown rounded py-2 hover:bg-furnizo-brown hover:text-white transition-all cursor-pointer"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <div>
      {/* ── Top bar: search + result count + sort (mobile) ── */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-furnizo-muted/60" />
          <input
            type="text"
            placeholder="Search catalog..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setVisibleCount(PAGE_SIZE); }}
            className="w-full pl-9 pr-4 py-2 bg-white border border-furnizo-border rounded-md text-sm font-sans placeholder-furnizo-muted/40 text-furnizo-charcoal outline-none focus:border-furnizo-brown transition-colors"
          />
        </div>

        <div className="flex items-center gap-3 ml-auto">
          {/* Result count */}
          <span className="font-sans text-xs text-furnizo-muted hidden sm:block">
            Showing {Math.min(visibleCount, filteredProducts.length)} of {filteredProducts.length} products
          </span>

          {/* Mobile filter toggle */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 font-sans text-xs border border-furnizo-border rounded-md px-3 py-2 text-furnizo-charcoal hover:border-furnizo-brown transition-colors cursor-pointer"
          >
            <SlidersHorizontal size={13} />
            Filters
            {hasFilters && (
              <span className="h-4 w-4 rounded-full bg-furnizo-brown text-white text-[9px] flex items-center justify-center">
                {selectedCategories.length + (searchTerm ? 1 : 0) + (priceRange[0] > 0 || priceRange[1] < maxProductPrice ? 1 : 0)}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ── Active filter chips ── */}
      <AnimatePresence>
        {hasFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-wrap gap-2 mb-6 overflow-hidden"
          >
            {selectedCategories.map((cat) => (
              <motion.button
                key={`chip-${cat}`}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                onClick={() => removeChip("category", cat)}
                className="flex items-center gap-1.5 bg-furnizo-brown/10 border border-furnizo-brown/30 text-furnizo-brown font-sans text-[11px] rounded-full px-3 py-1 hover:bg-furnizo-brown hover:text-white transition-all cursor-pointer"
              >
                {cat}
                <X size={10} />
              </motion.button>
            ))}
            {searchTerm && (
              <motion.button
                key="chip-search"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                onClick={() => removeChip("search")}
                className="flex items-center gap-1.5 bg-furnizo-brown/10 border border-furnizo-brown/30 text-furnizo-brown font-sans text-[11px] rounded-full px-3 py-1 hover:bg-furnizo-brown hover:text-white transition-all cursor-pointer"
              >
                &ldquo;{searchTerm}&rdquo;
                <X size={10} />
              </motion.button>
            )}
            {(priceRange[0] > 0 || priceRange[1] < maxProductPrice) && (
              <motion.button
                key="chip-price"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                onClick={() => removeChip("price")}
                className="flex items-center gap-1.5 bg-furnizo-brown/10 border border-furnizo-brown/30 text-furnizo-brown font-sans text-[11px] rounded-full px-3 py-1 hover:bg-furnizo-brown hover:text-white transition-all cursor-pointer"
              >
                ${priceRange[0]}–${priceRange[1].toLocaleString()}
                <X size={10} />
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main grid layout ── */}
      <div className="flex gap-10">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <div className="sticky top-24">
            <SidebarContent />
          </div>
        </aside>

        {/* Product listing */}
        <div className="flex-1 min-w-0">
          {isLoading ? (
            <ProductSkeletonGrid />
          ) : filteredProducts.length === 0 ? (
            <div className="flex h-72 flex-col items-center justify-center text-center">
              <div className="text-5xl mb-4">🪑</div>
              <p className="font-sans text-base font-light text-furnizo-charcoal mb-1">
                No products match your filters
              </p>
              <p className="font-sans text-sm text-furnizo-muted mb-6">
                Try adjusting or clearing your filters.
              </p>
              <button
                onClick={clearAll}
                className="font-sans text-xs tracking-wider text-furnizo-brown border-b border-furnizo-brown pb-0.5 hover:text-furnizo-charcoal hover:border-furnizo-charcoal transition-colors cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <>
              <ProductGrid products={visibleProducts} />

              {/* Load More */}
              {hasMore && (
                <div className="mt-12 text-center">
                  <button
                    onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                    className="inline-flex items-center gap-2 font-sans text-xs tracking-widest uppercase border border-furnizo-charcoal/30 text-furnizo-charcoal rounded-full px-8 py-3 hover:bg-furnizo-charcoal hover:text-furnizo-beige transition-all cursor-pointer"
                  >
                    Load More
                    <ChevronDown size={14} />
                  </button>
                  <p className="mt-3 font-sans text-[11px] text-furnizo-muted">
                    Showing {visibleCount} of {filteredProducts.length} products
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* ── Mobile filter drawer ── */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFilterOpen(false)}
              className="fixed inset-0 bg-furnizo-charcoal/30 z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed left-0 top-0 bottom-0 w-[300px] bg-furnizo-beige z-50 overflow-y-auto p-6 lg:hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-sans text-base font-light tracking-wide text-furnizo-charcoal">
                  Filters
                </h2>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 text-furnizo-muted hover:text-furnizo-charcoal cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
              <SidebarContent />
              <div className="mt-8">
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-full bg-furnizo-brown text-furnizo-beige font-sans text-xs tracking-widest uppercase py-3 rounded-md cursor-pointer"
                >
                  View {filteredProducts.length} Results
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
