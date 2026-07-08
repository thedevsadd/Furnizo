"use client";

import { useEffect } from "react";
import { useStockStore } from "@/lib/store/stockStore";

export default function Initializer() {
  const initializeStock = useStockStore((state) => state.initializeStock);

  useEffect(() => {
    initializeStock();
  }, [initializeStock]);

  return null;
}
