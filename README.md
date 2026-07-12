# Furnizo - Premium Minimalist Furniture E-Commerce

**Furnizo** is a minimalist, portfolio-grade furniture e-commerce web application. Built as a personal side project, the goal of this application is to deliver a premium shopping experience featuring clean typography, a warm color palette, and fluid interactive animations.

🔗 **Live Link:** [https://furnizo.vercel.app/](https://furnizo.vercel.app/)

---

## 🎨 Visual Design & User Experience

Unlike standard templates, Furnizo is crafted with high-end, editorial-style aesthetics in mind:
- **Warm Minimalist Color Scheme:** Utilizes a curated palette (`#FAF9F6` beige, `#6F4423` brown, and `#2B2420` charcoal) to mimic luxury interior design catalogs.
- **Smooth Animations:** Integrated gesture-based sliding, micro-interactions for active state changes, and a customized top-level loading progress template.
- **Responsive Fluidity:** Layouts adapt dynamically from widescreen desktops down to narrow mobile screens.

---

## 🛠️ The Tech Stack & Why It Was Chosen

Here is a list of the core tools used to build Furnizo and the rationale behind each choice:

### 1. Next.js 16 (App Router) & React 19
- **Why:** I used Next.js to leverage client-side routing transitions, server-side metadata generation for SEO, and efficient static-site generation (SSG) for static routes. React 19 keeps the component architecture modern and future-proof.

### 2. Tailwind CSS v4
- **Why:** Using Tailwind allows for rapid design iteration directly in the markup. The configuration is customized to align with Furnizo's design tokens (custom colors, fonts, and animation properties).

### 3. Framer Motion
- **Why:** It handles complex layout animations and gestures beautifully. I used it to implement a customized touch-draggable "New Arrivals" product carousel with card snapping, a fullscreen lightbox modal, and smooth entrance transitions.

### 4. Zustand
- **Why:** Zustand provides a lightweight, boilerplate-free state management store. It handles the shopping cart, active orders, and product wishlists across page navigations without hydration mismatches.

### 5. Lenis (Smooth Scroll)
- **Why:** Standard browser scrolling can feel rigid. Lenis implements smooth inertial scrolling, giving the entire site a fluid, luxurious feel.

### 6. Sharp (Image Optimization)
- **Why:** High-quality furniture images are large. Sharp converts local assets into modern, highly compressed `.avif` and `.webp` formats on the fly, reducing page size by up to 70% while keeping high visual quality.

---

## ⚡ Core Features

- **Draggable Product Carousel:** Swiping or dragging on mobile/touch screens advances slides and snaps exactly to the borders of the product cards.
- **Direct Checkout ("Buy Now"):** Instantly adds a product to the cart and navigates straight to the shipping form.
- **Order Tracking Timeline:** Displays a visual checklist tracing orders from "Received" to "Delivered." The interface shifts automatically to a vertical timeline on mobile screens for easy reading.
- **Interactive Cart & Wishlist:** Fully interactive drawer states and stock decrement logic.
- **Premium Loading Transition:** A custom logo fade-in and progress bar animation renders during page navigations.


