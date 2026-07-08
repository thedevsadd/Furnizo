"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import { Product } from "@/types";
import ProductGrid from "./ProductGrid";

interface ShopClientProps {
  initialProducts: Product[];
}

export default function ShopClient({ initialProducts }: ShopClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get active query parameters
  const queryCategory = searchParams.get("category") || "All";
  const querySearch = searchParams.get("search") || "";
  const querySort = searchParams.get("sort") || "default";

  // State
  const [activeCategory, setActiveCategory] = useState(queryCategory);
  const [searchTerm, setSearchTerm] = useState(querySearch);
  const [sortBy, setSortBy] = useState(querySort);

  // Sync state with URL params
  useEffect(() => {
    setActiveCategory(queryCategory);
  }, [queryCategory]);

  useEffect(() => {
    setSearchTerm(querySearch);
  }, [querySearch]);

  useEffect(() => {
    setSortBy(querySort);
  }, [querySort]);

  // Update URL queries
  const updateParams = (newParams: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null || value === "" || value === "All" || value === "default") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    router.push(`/products?${params.toString()}`, { scroll: false });
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    updateParams({ category: category });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchTerm(val);
    updateParams({ search: val });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSortBy(val);
    updateParams({ sort: val });
  };

  const categories = ["All", "Chairs", "Tables", "Sofas", "Lighting", "Storage"];

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    // Category Filter
    if (activeCategory !== "All") {
      result = result.filter(
        (product) => product.category.toLowerCase() === activeCategory.toLowerCase()
      );
    }

    // Search Filter
    if (searchTerm.trim() !== "") {
      const lower = searchTerm.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(lower) ||
          product.description.toLowerCase().includes(lower) ||
          product.tags.some((tag) => tag.toLowerCase().includes(lower))
      );
    }

    // Sorting
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [initialProducts, activeCategory, searchTerm, sortBy]);

  return (
    <div className="space-y-12">
      {/* Search & Sort Panel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-furnizo-border pb-8">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-furnizo-muted/70" />
          <input
            type="text"
            placeholder="Search catalog..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 bg-furnizo-border/10 border border-furnizo-border rounded text-sm font-sans placeholder-furnizo-muted/50 text-furnizo-charcoal outline-none focus:border-furnizo-brown focus:bg-transparent transition-all"
          />
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-3">
          <SlidersHorizontal size={14} className="text-furnizo-muted" />
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="bg-transparent border border-furnizo-border rounded px-3 py-2 text-xs font-sans text-furnizo-charcoal outline-none cursor-pointer focus:border-furnizo-brown"
          >
            <option value="default">Default Sorting</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Category side list */}
        <div className="lg:col-span-1 space-y-6">
          <h3 className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-furnizo-charcoal">
            Category
          </h3>
          <div className="flex flex-wrap lg:flex-col gap-2 lg:gap-3">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`text-left font-sans text-sm tracking-wide transition-colors py-1 cursor-pointer w-full max-w-[120px] lg:max-w-none ${
                    isSelected
                      ? "text-furnizo-brown font-medium border-l-2 border-furnizo-brown pl-2 lg:pl-3"
                      : "text-furnizo-muted hover:text-furnizo-charcoal pl-2 lg:pl-3 border-l border-transparent"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product listing grid */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="flex h-64 flex-col items-center justify-center text-center">
              <p className="font-sans text-sm text-furnizo-muted">
                No products found matching your filter selection.
              </p>
              <button
                onClick={() => {
                  setActiveCategory("All");
                  setSearchTerm("");
                  setSortBy("default");
                  router.push("/products");
                }}
                className="mt-4 font-sans text-xs tracking-wider text-furnizo-brown border-b border-furnizo-brown pb-0.5 hover:text-furnizo-charcoal hover:border-furnizo-charcoal transition-colors cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <ProductGrid products={filteredProducts} />
          )}
        </div>
      </div>
    </div>
  );
}
