import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductDetailsClient from "@/components/product/ProductDetailsClient";
import { products } from "@/data/products";

interface PageProps {
  params: {
    slug: string;
  };
}

// Generate page metadata dynamically
export async function generateMetadata({ params }: PageProps) {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) return {};

  return {
    title: `${product.name} — Furnizo`,
    description: product.description,
  };
}

// Generate static paths for slugs
export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default function ProductDetailPage({ params }: PageProps) {
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  // Fetch related products sharing same category, excluding current product (max 4)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // If there are less than 4 related items in same category, pad with overlapping tags
  if (relatedProducts.length < 4) {
    const ids = new Set(relatedProducts.map((p) => p.id));
    const extraProducts = products.filter(
      (p) =>
        p.id !== product.id &&
        !ids.has(p.id) &&
        p.tags.some((tag) => product.tags.includes(tag))
    );
    
    for (const extra of extraProducts) {
      if (relatedProducts.length >= 4) break;
      relatedProducts.push(extra);
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-furnizo-beige">
      <Navbar />

      <main className="flex-grow py-16 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
        <ProductDetailsClient
          product={product}
          relatedProducts={relatedProducts}
        />
      </main>

      <Footer />
    </div>
  );
}
