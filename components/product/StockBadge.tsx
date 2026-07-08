interface StockBadgeProps {
  stock: number;
}

export default function StockBadge({ stock }: StockBadgeProps) {
  if (stock === 0) {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded bg-red-50 text-red-700 text-[10px] font-sans font-medium uppercase tracking-wider border border-red-100/50">
        Out of Stock
      </span>
    );
  }

  if (stock <= 5) {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded bg-orange-50 text-orange-700 text-[10px] font-sans font-medium uppercase tracking-wider border border-orange-100/50">
        Only {stock} Left
      </span>
    );
  }

  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-sans font-medium uppercase tracking-wider border border-emerald-100/50">
      In Stock
    </span>
  );
}
