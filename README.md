# Furnizo — Premium Minimalist E-Commerce Website

**Furnizo** is a modern, high-end minimalist furniture e-commerce website. The project serves as a showcase portfolio piece, emphasizing clean, visible code structure, robust client-side logic, and premium design aesthetics.

---

## ✨ Features & Logic

1. **Clean Architectural Coding**: Fully written in Next.js 14+ (App Router) using strict TypeScript.
2. **Zero Local Asset Bloat**: All product photography is hosted on external image CDNs. No product images are stored locally in the `/public` or asset directories, ensuring a 100% visible, lightweight code repository.
3. **Zustand Persistent Stores**:
   - **Cart Store**: Tracks items, adjusts quantity, and computes shipping/taxes.
   - **Wishlist Store**: Hearts products to save in a dedicated wishlist.
   - **Order Store**: Persists checkout records locally.
   - **Stock Store**: Simulates stock inventory levels.
4. **Dynamic Stock Tracking**: Stock limits seed from catalog data on first load. Checkout acts against live stock quantities and decrements stock on successful orders. Products show low stock warnings or "Out of Stock" badges.
5. **Interactive UI Detail**: Gallery thumbnail swaps, side cart previews, searching, category tabs filtering, price sorting, and animated staggered list entrances (via Framer Motion).

---

## 🎨 Design System

- **Background:** Off-white `#FAF9F6` (warm beige)
- **Primary Accent:** Chocolate brown `#6F4423`
- **Text Headings:** Charcoal near-black `#2B2420`
- **Text Body:** Muted brown-grey `#6B645C`
- **Borders:** Warm light grey `#EAE6E0`
- **Typography:** **Manrope** Google Font (Weights: 200, 300, 400, 500, 600). Headings are styled with slim 300/400 weights and wide letter-spacing.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14+ (App Router), TypeScript
- **Styling:** Tailwind CSS + shadcn/ui components
- **State Management:** Zustand (with `persist` middleware)
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Toast Notifications:** Sonner

---

## 📂 Folder Structure

```
furnizo/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                     # Home landing page
│   ├── products/
│   │   ├── page.tsx                 # Shop catalog page
│   │   └── [slug]/page.tsx          # Single product details page
│   ├── cart/page.tsx                # Shopping cart details
│   ├── wishlist/page.tsx            # Wishlist items
│   ├── checkout/page.tsx            # Client checkout form
│   └── orders/
│       ├── page.tsx                 # Local order history
│       └── [orderId]/page.tsx       # Receipt confirmation page
├── components/
│   ├── ui/                          # shadcn UI components
│   ├── layout/                      # Navbar, Footer
│   ├── product/                     # ProductCard, ProductGrid, RelatedProducts, StockBadge, ShopClient
│   └── shared/                      # Button, Loaders, EmptyState, Toaster
├── data/
│   └── products.ts                  # Static product catalog with Unsplash CDN image URLs
├── lib/
│   ├── store/
│   │   ├── cartStore.ts             # Zustand cart manager
│   │   ├── wishlistStore.ts         # Zustand wishlist manager
│   │   ├── orderStore.ts            # Zustand order manager
│   │   └── stockStore.ts            # Zustand stock level simulator
│   └── utils.ts
├── types/
│   └── index.ts                     # TypeScript interface definitions
├── next.config.ts
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18.17.0 or higher)
- npm or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/thedevsadd/Furnizo.git
   cd Furnizo
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## ⚙️ Build and Production

To validate type checks and build the static assets for deployment (such as Vercel):
```bash
npm run build
```
This command compiles and outputs static pages for shop details, and dynamic routes for localized receipts.
