import { create } from "zustand";
import { persist } from "zustand/middleware";
import { products } from "@/data/products";

interface StockState {
  stock: Record<string, number>;
  initialized: boolean;
  initializeStock: () => void;
  decrementStock: (productId: string, quantity: number) => void;
  getStock: (productId: string) => number;
}

export const useStockStore = create<StockState>()(
  persist(
    (set, get) => ({
      stock: {},
      initialized: false,
      initializeStock: () => {
        if (get().initialized) return;
        const initialStock: Record<string, number> = {};
        products.forEach((p) => {
          initialStock[p.id] = p.stock;
        });
        set({ stock: initialStock, initialized: true });
      },
      decrementStock: (productId, quantity) => {
        set((state) => {
          const currentStock = state.stock[productId] ?? 0;
          return {
            stock: {
              ...state.stock,
              [productId]: Math.max(0, currentStock - quantity),
            },
          };
        });
      },
      getStock: (productId) => {
        const live = get().stock[productId];
        if (live !== undefined) return live;
        const p = products.find((prod) => prod.id === productId);
        return p ? p.stock : 0;
      },
    }),
    {
      name: "furnizo-stock-store",
    }
  )
);
