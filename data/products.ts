import { Product } from "@/types";

export const products: Product[] = [
  {
    id: "prod-01",
    slug: "soren-lounge-chair",
    name: "Soren Lounge Chair",
    category: "Chairs",
    tags: ["lounge", "oak", "minimalist", "living-room"],
    price: 450,
    description: "Designed for comfort and visual lightness, the Soren Lounge Chair brings a sculptural ease to any space. Structured in solid warm oak and upholstered in a light beige textured boucle fabric.",
    imageUrls: [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1580481072645-022f9a6dbf27?q=80&w=800&auto=format&fit=crop"
    ],
    stock: 8,
    dimensions: "W 75cm x D 80cm x H 70cm",
    material: "Solid Oak & Boucle Fabric"
  },
  {
    id: "prod-02",
    slug: "karin-oak-dining-table",
    name: "Karin Oak Dining Table",
    category: "Tables",
    tags: ["dining", "table", "oak", "wooden"],
    price: 1200,
    description: "Crafted to celebrate the natural grain of premium white oak, the Karin Dining Table is a study in quiet strength. Gently rounded corners and slender tapered legs create a soft, inviting profile for family gatherings.",
    imageUrls: [
      "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1577140917170-285929fb55b7?q=80&w=800&auto=format&fit=crop"
    ],
    stock: 3,
    dimensions: "W 180cm x D 90cm x H 75cm",
    material: "Solid White Oak"
  },
  {
    id: "prod-03",
    slug: "mira-linen-sofa",
    name: "Mira Linen Sofa",
    category: "Sofas",
    tags: ["sofa", "linen", "living-room", "cozy"],
    price: 2400,
    description: "The Mira Sofa merges plush comfort with a highly tailored, clean silhouette. Draped in high-performance off-white Italian linen, it features deep seating and feather-blend cushions for the ultimate lounging experience.",
    imageUrls: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=800&auto=format&fit=crop"
    ],
    stock: 4,
    dimensions: "W 220cm x D 95cm x H 80cm",
    material: "Italian Linen & Solid Maple Frame"
  },
  {
    id: "prod-04",
    slug: "tove-pendant-light",
    name: "Tove Pendant Light",
    category: "Lighting",
    tags: ["pendant", "lighting", "minimalist", "dining-room"],
    price: 180,
    description: "Suspended by a delicate black textile cord, the Tove Pendant Light is a minimal floating sphere of soft light. The sand-blasted opal glass shade diffuses a warm, glare-free ambient glow.",
    imageUrls: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=800&auto=format&fit=crop"
    ],
    stock: 12,
    dimensions: "Dia 30cm x H 32cm",
    material: "Opal Glass & Brushed Brass"
  },
  {
    id: "prod-05",
    slug: "elin-ash-sideboard",
    name: "Elin Ash Sideboard",
    category: "Storage",
    tags: ["sideboard", "storage", "ash-wood", "credenza"],
    price: 850,
    description: "The Elin Sideboard offers refined storage with its sliding slatted doors and warm ash wood finish. Perfectly sized for dining spaces or media systems, it keeps clutter concealed while maintaining a light visual footprint.",
    imageUrls: [
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601084881623-cef5a7de3796?q=80&w=800&auto=format&fit=crop"
    ],
    stock: 2,
    dimensions: "W 150cm x D 45cm x H 70cm",
    material: "Ash Veneer & Solid Oak Legs"
  },
  {
    id: "prod-06",
    slug: "nils-accent-stool",
    name: "Nils Accent Stool",
    category: "Chairs",
    tags: ["stool", "chair", "oak", "minimal"],
    price: 120,
    description: "Multi-functional and compact, the Nils Accent Stool works beautifully as extra seating, a bedside table, or a side pedestal. Crafted with smooth finger-joint details from solid white oak.",
    imageUrls: [
      "https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?q=80&w=800&auto=format&fit=crop"
    ],
    stock: 15,
    dimensions: "Dia 35cm x H 45cm",
    material: "Solid White Oak"
  },
  {
    id: "prod-07",
    slug: "arvid-coffee-table",
    name: "Arvid Coffee Table",
    category: "Tables",
    tags: ["coffee-table", "living-room", "wood", "round"],
    price: 550,
    description: "Showcasing structural geometry, the Arvid Coffee Table pairs a robust circular oak top with three blocky cylindrical legs. A beautiful center piece that adds organic texture to living spaces.",
    imageUrls: [
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?q=80&w=800&auto=format&fit=crop"
    ],
    stock: 6,
    dimensions: "Dia 90cm x H 38cm",
    material: "Solid Red Oak"
  },
  {
    id: "prod-08",
    slug: "freja-floor-lamp",
    name: "Freja Floor Lamp",
    category: "Lighting",
    tags: ["lamp", "floor-lamp", "minimal", "living-room"],
    price: 320,
    description: "Sleek and tall, the Freja Floor Lamp features an elegant, powder-coated matte dark chocolate brown metal frame. Its adjustable head directs targeted light for reading or soft, angled uplighting.",
    imageUrls: [
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=800&auto=format&fit=crop"
    ],
    stock: 0,
    dimensions: "W 25cm x D 35cm x H 145cm",
    material: "Powder Coated Steel & Brass Accents"
  }
];
