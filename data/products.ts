import { Product } from "@/types";

const ph = (label: string) =>
  `https://placehold.co/800x800/EAE6E0/6F4423?text=${encodeURIComponent(label)}`;

export const products: Product[] = [
  // ─── CHAIRS (5) ─────────────────────────────────────────────────────────────
  {
    id: "prod-01",
    slug: "soren-lounge-chair",
    name: "Soren Lounge Chair",
    category: "Chairs",
    tags: ["lounge", "oak", "minimalist", "living-room"],
    price: 450,
    description:
      "Designed for comfort and visual lightness, the Soren Lounge Chair brings a sculptural ease to any space. Structured in solid warm oak and upholstered in a light beige textured boucle fabric.",
    imageUrls: [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1580481072645-022f9a6dbf27?q=80&w=800&auto=format&fit=crop",
    ],
    stock: 8,
    dimensions: "W 75cm × D 80cm × H 70cm",
    material: "Solid Oak & Boucle Fabric",
  },
  {
    id: "prod-02",
    slug: "nils-accent-stool",
    name: "Nils Accent Stool",
    category: "Chairs",
    tags: ["stool", "oak", "minimal", "side"],
    price: 120,
    description:
      "Multi-functional and compact, the Nils Accent Stool works beautifully as extra seating, a bedside table, or a side pedestal. Crafted with smooth finger-joint details from solid white oak.",
    imageUrls: [
      "https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?q=80&w=800&auto=format&fit=crop",
      ph("Nils Stool Angle 3"),
    ],
    stock: 15,
    dimensions: "Dia 35cm × H 45cm",
    material: "Solid White Oak",
  },
  {
    id: "prod-03",
    slug: "haga-dining-chair",
    name: "Haga Dining Chair",
    category: "Chairs",
    tags: ["dining", "chair", "oak", "upholstered"],
    price: 280,
    description:
      "The Haga Dining Chair offers a gently curved backrest in solid oak paired with a seat upholstered in natural flax linen. Suitable for long gatherings and built to last generations.",
    imageUrls: [
      ph("Haga Dining Chair"),
      ph("Haga Dining Chair Side"),
      ph("Haga Dining Chair Back"),
    ],
    stock: 10,
    dimensions: "W 48cm × D 53cm × H 82cm",
    material: "Solid Oak & Linen Fabric",
  },
  {
    id: "prod-04",
    slug: "lund-rocking-chair",
    name: "Lund Rocking Chair",
    category: "Chairs",
    tags: ["rocking", "chair", "relaxation", "living-room"],
    price: 620,
    description:
      "A timeless silhouette brought into the modern home. The Lund Rocking Chair features steam-bent ash rails and a deeply set cushioned seat that invites long evenings in quiet comfort.",
    imageUrls: [
      ph("Lund Rocking Chair"),
      ph("Lund Rocking Chair Side"),
    ],
    stock: 4,
    dimensions: "W 68cm × D 95cm × H 100cm",
    material: "Steam-Bent Ash & Wool Cushion",
  },
  {
    id: "prod-05",
    slug: "bjorn-barrel-chair",
    name: "Bjorn Barrel Chair",
    category: "Chairs",
    tags: ["barrel", "armchair", "velvet", "living-room"],
    price: 780,
    description:
      "A cocoon-like barrel form draped in a deep forest-green velvet with a solid walnut base. The Bjorn Barrel Chair anchors a living space with warmth and confidence.",
    imageUrls: [
      ph("Bjorn Barrel Chair"),
      ph("Bjorn Barrel Chair Angle"),
    ],
    stock: 3,
    dimensions: "W 82cm × D 80cm × H 75cm",
    material: "Solid Walnut & Velvet Upholstery",
  },

  // ─── COFFEE TABLES (3) ──────────────────────────────────────────────────────
  {
    id: "prod-06",
    slug: "arvid-coffee-table",
    name: "Arvid Coffee Table",
    category: "Coffee Tables",
    tags: ["coffee-table", "living-room", "wood", "round"],
    price: 550,
    description:
      "Showcasing structural geometry, the Arvid Coffee Table pairs a robust circular oak top with three blocky cylindrical legs. A beautiful centrepiece that adds organic texture to living spaces.",
    imageUrls: [
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?q=80&w=800&auto=format&fit=crop",
    ],
    stock: 6,
    dimensions: "Dia 90cm × H 38cm",
    material: "Solid Red Oak",
  },
  {
    id: "prod-07",
    slug: "saga-round-table",
    name: "Saga Round Coffee Table",
    category: "Coffee Tables",
    tags: ["coffee-table", "round", "brass", "marble"],
    price: 890,
    description:
      "A marble-top circular coffee table on a hand-formed brushed brass frame. The Saga pairs the cool weight of Calacatta marble with warm metal craftsmanship for a sophisticated centrepiece.",
    imageUrls: [
      ph("Saga Round Table"),
      ph("Saga Round Table Top"),
    ],
    stock: 2,
    dimensions: "Dia 80cm × H 42cm",
    material: "Calacatta Marble & Brushed Brass",
  },
  {
    id: "prod-08",
    slug: "vega-travertine-table",
    name: "Vega Travertine Table",
    category: "Coffee Tables",
    tags: ["coffee-table", "travertine", "stone", "living-room"],
    price: 1100,
    description:
      "Hewn from single-slab Roman travertine, the Vega Coffee Table is a study in natural luxury. Its rough-honed edges and warm ivory tones tell the story of geological time.",
    imageUrls: [
      ph("Vega Travertine Table"),
      ph("Vega Travertine Table Detail"),
    ],
    stock: 1,
    dimensions: "W 110cm × D 60cm × H 36cm",
    material: "Roman Travertine Stone",
  },

  // ─── SHELVES (5) ────────────────────────────────────────────────────────────
  {
    id: "prod-09",
    slug: "dagmar-wall-shelf",
    name: "Dagmar Wall Shelf",
    category: "Shelves",
    tags: ["shelf", "wall", "oak", "minimal"],
    price: 190,
    description:
      "Floating effortlessly on the wall, the Dagmar Wall Shelf is a refined storage surface in solid oak. A single shelf with a concealed bracket system — clutter-free, elegant, and enduring.",
    imageUrls: [
      ph("Dagmar Wall Shelf"),
      ph("Dagmar Wall Shelf Mounted"),
    ],
    stock: 12,
    dimensions: "W 80cm × D 22cm × H 4cm",
    material: "Solid White Oak",
  },
  {
    id: "prod-10",
    slug: "odin-floating-shelves",
    name: "Odin Floating Shelves (Set of 3)",
    category: "Shelves",
    tags: ["shelf", "floating", "set", "minimal"],
    price: 340,
    description:
      "Three staggered wall shelves in different lengths, designed to be installed as a curated composition. Each Odin shelf is solid ash with a natural oil finish and hidden steel brackets.",
    imageUrls: [
      ph("Odin Floating Shelves"),
      ph("Odin Floating Shelves Detail"),
    ],
    stock: 8,
    dimensions: "L 40 / 60 / 80cm × D 20cm × H 3cm",
    material: "Solid Ash & Steel Brackets",
  },
  {
    id: "prod-11",
    slug: "freya-leaning-shelf",
    name: "Freya Leaning Shelf",
    category: "Shelves",
    tags: ["shelf", "leaning", "freestanding", "storage"],
    price: 420,
    description:
      "A tall, elegant leaning ladder shelf in light ash wood. The Freya's five tiered rungs offer flexible, rearrangeable storage — books, plants, ceramics — without drilling a single wall.",
    imageUrls: [
      ph("Freya Leaning Shelf"),
      ph("Freya Leaning Shelf Styled"),
    ],
    stock: 5,
    dimensions: "W 60cm × D 38cm × H 175cm",
    material: "Solid Ash Wood",
  },
  {
    id: "prod-12",
    slug: "rune-modular-shelf",
    name: "Rune Modular Shelving Unit",
    category: "Shelves",
    tags: ["shelf", "modular", "oak", "bookcase"],
    price: 760,
    description:
      "A configurable modular shelving system built from stackable solid oak cubes. Mix open and closed compartments to build exactly the storage footprint your space demands.",
    imageUrls: [
      ph("Rune Modular Shelf"),
      ph("Rune Modular Shelf Open"),
    ],
    stock: 4,
    dimensions: "W 120cm × D 35cm × H 120cm",
    material: "Solid Oak & Brass Hardware",
  },
  {
    id: "prod-13",
    slug: "idun-display-shelf",
    name: "Idun Display Shelf",
    category: "Shelves",
    tags: ["shelf", "display", "arched", "ceramic"],
    price: 280,
    description:
      "An arched-top display shelf that creates a beautiful stage for ceramics, small sculptures, and art objects. Idun is hand-painted in a warm chalk white finish over solid pine.",
    imageUrls: [
      ph("Idun Display Shelf"),
      ph("Idun Display Shelf Styled"),
    ],
    stock: 7,
    dimensions: "W 55cm × D 18cm × H 72cm",
    material: "Solid Pine & Chalk Paint",
  },

  // ─── BEDSIDE TABLES (3) ─────────────────────────────────────────────────────
  {
    id: "prod-14",
    slug: "mira-bedside-table",
    name: "Mira Bedside Table",
    category: "Bedside Tables",
    tags: ["bedside", "nightstand", "oak", "drawer"],
    price: 260,
    description:
      "A minimal bedside companion with a single dovetail-jointed drawer and open lower shelf. The Mira Bedside Table in white oak is quietly refined — exactly what a restful bedroom deserves.",
    imageUrls: [
      ph("Mira Bedside Table"),
      ph("Mira Bedside Table Drawer"),
    ],
    stock: 9,
    dimensions: "W 45cm × D 40cm × H 55cm",
    material: "Solid White Oak",
  },
  {
    id: "prod-15",
    slug: "saga-nightstand",
    name: "Saga Cane Nightstand",
    category: "Bedside Tables",
    tags: ["bedside", "nightstand", "cane", "natural"],
    price: 310,
    description:
      "A warm, handcrafted nightstand with a natural rattan cane front drawer and solid oak frame. The Saga Nightstand softens the bedroom with texture and material honesty.",
    imageUrls: [
      ph("Saga Nightstand"),
      ph("Saga Nightstand Open"),
    ],
    stock: 6,
    dimensions: "W 50cm × D 42cm × H 58cm",
    material: "Solid Oak & Natural Rattan Cane",
  },
  {
    id: "prod-16",
    slug: "elva-marble-nightstand",
    name: "Elva Marble-Top Nightstand",
    category: "Bedside Tables",
    tags: ["bedside", "nightstand", "marble", "brass"],
    price: 490,
    description:
      "A slim two-drawer nightstand with a honed Carrara marble surface and a powder-coated steel frame with brushed brass pulls. The Elva makes luxury feel effortless.",
    imageUrls: [
      ph("Elva Marble Nightstand"),
      ph("Elva Marble Nightstand Detail"),
    ],
    stock: 3,
    dimensions: "W 48cm × D 38cm × H 60cm",
    material: "Carrara Marble, Steel & Brass",
  },

  // ─── WARDROBES (3) ──────────────────────────────────────────────────────────
  {
    id: "prod-17",
    slug: "birk-sliding-wardrobe",
    name: "Birk Sliding Wardrobe",
    category: "Wardrobes",
    tags: ["wardrobe", "sliding", "oak", "large"],
    price: 2200,
    description:
      "A floor-to-ceiling wardrobe with smooth-glide sliding doors in oiled ash. The Birk offers a generous interior with adjustable shelves, a hanging rail, and concealed soft-close mechanisms.",
    imageUrls: [
      ph("Birk Sliding Wardrobe"),
      ph("Birk Sliding Wardrobe Open"),
    ],
    stock: 2,
    dimensions: "W 200cm × D 60cm × H 220cm",
    material: "Ash Veneer & Powder-Coated Steel Frame",
  },
  {
    id: "prod-18",
    slug: "holt-open-wardrobe",
    name: "Holt Open Wardrobe",
    category: "Wardrobes",
    tags: ["wardrobe", "open", "minimalist", "steel"],
    price: 980,
    description:
      "An open wardrobe system on a matte black powder-coated steel frame with solid oak shelves and hanging rails. Holt makes clothing a display — curated and calm.",
    imageUrls: [
      ph("Holt Open Wardrobe"),
      ph("Holt Open Wardrobe Styled"),
    ],
    stock: 5,
    dimensions: "W 120cm × D 45cm × H 185cm",
    material: "Powder-Coated Steel & Solid Oak Shelves",
  },
  {
    id: "prod-19",
    slug: "vinn-compact-wardrobe",
    name: "Vinn Compact Wardrobe",
    category: "Wardrobes",
    tags: ["wardrobe", "compact", "small-space", "oak"],
    price: 740,
    description:
      "Perfect for smaller rooms, the Vinn Compact Wardrobe packs a full hanging zone, two deep shelves, and a drawer into a slender 80cm profile without sacrificing its quiet elegance.",
    imageUrls: [
      ph("Vinn Compact Wardrobe"),
      ph("Vinn Compact Wardrobe Interior"),
    ],
    stock: 7,
    dimensions: "W 80cm × D 50cm × H 190cm",
    material: "Solid Oak & Soft-Close Hardware",
  },

  // ─── SHOE RACKS (3) ─────────────────────────────────────────────────────────
  {
    id: "prod-20",
    slug: "fen-shoe-cabinet",
    name: "Fen Shoe Cabinet",
    category: "Shoe Racks",
    tags: ["shoe-rack", "cabinet", "entryway", "oak"],
    price: 380,
    description:
      "A clean, closed shoe cabinet for the entryway. The Fen's slatted oak front conceals up to 12 pairs across three tipping shelves, keeping the hallway calm and uncluttered.",
    imageUrls: [
      ph("Fen Shoe Cabinet"),
      ph("Fen Shoe Cabinet Open"),
    ],
    stock: 8,
    dimensions: "W 90cm × D 30cm × H 80cm",
    material: "Solid Oak & Tipping Shelf Mechanism",
  },
  {
    id: "prod-21",
    slug: "loke-entryway-rack",
    name: "Loke Entryway Rack",
    category: "Shoe Racks",
    tags: ["shoe-rack", "open", "entryway", "metal"],
    price: 180,
    description:
      "A low-profile open shoe rack on a slim powder-coated black steel frame with natural wood rungs. Fits 6–8 pairs of shoes and doubles as a perch seat with its solid oak top.",
    imageUrls: [
      ph("Loke Entryway Rack"),
      ph("Loke Entryway Rack Side"),
    ],
    stock: 12,
    dimensions: "W 75cm × D 32cm × H 45cm",
    material: "Powder-Coated Steel & Solid Oak Top",
  },
  {
    id: "prod-22",
    slug: "urd-stackable-rack",
    name: "Urd Stackable Shoe Rack",
    category: "Shoe Racks",
    tags: ["shoe-rack", "stackable", "flexible", "bamboo"],
    price: 95,
    description:
      "A modular stackable shoe rack made from certified sustainable bamboo. The Urd locks into itself at any height — start with two tiers and grow as your collection does.",
    imageUrls: [
      ph("Urd Stackable Rack"),
      ph("Urd Stackable Rack 4 Tier"),
    ],
    stock: 20,
    dimensions: "W 60cm × D 28cm × H 25cm (per tier)",
    material: "FSC Certified Bamboo",
  },

  // ─── DINING SETS (3) ────────────────────────────────────────────────────────
  {
    id: "prod-23",
    slug: "karin-dining-set",
    name: "Karin Oak Dining Set (4-Seater)",
    category: "Dining Sets",
    tags: ["dining-set", "table", "chairs", "oak", "set"],
    price: 2100,
    description:
      "The Karin Dining Set pairs the acclaimed Karin Oak Dining Table with four Haga Dining Chairs in a cohesive white oak finish. A curated set for the modern family dining room.",
    imageUrls: [
      ph("Karin Dining Set"),
      ph("Karin Dining Set Overhead"),
    ],
    stock: 3,
    dimensions: "Table: W 180cm × D 90cm × H 75cm",
    material: "Solid White Oak Throughout",
  },
  {
    id: "prod-24",
    slug: "mod-nordic-dining-set",
    name: "Mod Nordic Dining Set (6-Seater)",
    category: "Dining Sets",
    tags: ["dining-set", "nordic", "six-seater", "walnut"],
    price: 3400,
    description:
      "A generously scaled 6-seat dining set in American walnut. The Mod dining table has a live-edge top and tapered hairpin legs, paired with upholstered bench seating in warm terracotta.",
    imageUrls: [
      ph("Mod Nordic Dining Set"),
      ph("Mod Nordic Dining Set Detail"),
    ],
    stock: 2,
    dimensions: "Table: W 220cm × D 100cm × H 76cm",
    material: "American Walnut & Terracotta Fabric",
  },
  {
    id: "prod-25",
    slug: "fjord-bistro-set",
    name: "Fjord Bistro Set (2-Seater)",
    category: "Dining Sets",
    tags: ["dining-set", "bistro", "compact", "indoor-outdoor"],
    price: 680,
    description:
      "A compact bistro dining set designed for smaller dining nooks or a covered terrace. The Fjord's round oak table and two bentwood chairs are stackable for easy storage.",
    imageUrls: [
      ph("Fjord Bistro Set"),
      ph("Fjord Bistro Set Outdoor"),
    ],
    stock: 9,
    dimensions: "Table: Dia 70cm × H 74cm",
    material: "Oiled Teak & Bentwood Chairs",
  },
];
