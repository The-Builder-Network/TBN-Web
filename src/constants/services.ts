/** Taxonomy Interfaces */
export interface TradeTaxonomy {
  slug: string;
}

export interface ServiceTaxonomy {
  slug: string;
  name: string;
  imageUrl: string;
  trades: TradeTaxonomy[];
}

/** Single Source of Truth - Service → Trades Hierarchy */
export const services: ServiceTaxonomy[] = [
  {
    slug: "architectural-services",
    name: "Architectural Services",
    imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=600&fit=crop",
    trades: [
      { slug: "architectural-designer" },
      { slug: "architectural-technician" },
    ],
  },
  {
    slug: "bathroom-fitting",
    name: "Bathroom Fitting",
    imageUrl: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&h=600&fit=crop",
    trades: [{ slug: "bathroom-fitter" }],
  },
  {
    slug: "bricklaying-repointing",
    name: "Bricklaying & Repointing",
    imageUrl: "https://images.unsplash.com/photo-1590237294019-ca0dea0e1265?w=800&h=600&fit=crop",
    trades: [{ slug: "bricklayer" }, { slug: "repointing-specialist" }],
  },
  {
    slug: "carpentry-joinery",
    name: "Carpentry & Joinery",
    imageUrl: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop",
    trades: [
      { slug: "wardrobe-fitter" },
      { slug: "carpenter-joiner" },
      { slug: "cabinet-maker" },
      { slug: "decking-installer" },
    ],
  },
  {
    slug: "carpets-lino-flooring",
    name: "Carpets, Lino & Flooring",
    imageUrl: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop",
    trades: [
      { slug: "carpet-fitter" },
      { slug: "flooring-fitter" },
      { slug: "vinyl-flooring-fitter" },
    ],
  },
  {
    slug: "central-heating",
    name: "Central Heating",
    imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=600&fit=crop",
    trades: [
      { slug: "boiler-installation-specialist" },
      { slug: "boiler-repair-specialist" },
      { slug: "heating-engineer" },
    ],
  },
  {
    slug: "chimney-fireplace",
    name: "Chimney & Fireplace",
    imageUrl: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop",
    trades: [
      { slug: "chimney-sweep" },
      { slug: "stove-fitter" },
      { slug: "fireplace-installer" },
      { slug: "chimney-repair-specialist" },
    ],
  },
  {
    slug: "cleaning-services",
    name: "Cleaning Services",
    imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop",
    trades: [{ slug: "cleaner" }, { slug: "window-cleaner" }],
  },
  {
    slug: "conservatories",
    name: "Conservatories",
    imageUrl: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop",
    trades: [
      { slug: "conservatory-repair-specialist" },
      { slug: "conservatory-installer" },
    ],
  },
  {
    slug: "conversions",
    name: "Conversions",
    imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=600&fit=crop",
    trades: [
      { slug: "conversion-specialist" },
      { slug: "garage-conversion-specialist" },
    ],
  },
  {
    slug: "damp-proofing",
    name: "Damp Proofing",
    imageUrl: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop",
    trades: [{ slug: "damp-proofer" }],
  },
  {
    slug: "demolition-clearance",
    name: "Demolition & Clearance",
    imageUrl: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&h=600&fit=crop",
    trades: [
      { slug: "waste-rubbish-clearance" },
      { slug: "demolition-company" },
    ],
  },
  {
    slug: "driveways-paving",
    name: "Driveways & Paving",
    imageUrl: "https://images.unsplash.com/photo-1588595130265-f2e972d0f0e4?w=800&h=600&fit=crop",
    trades: [
      { slug: "driveways-installer" },
      { slug: "tarmac-driveway-company" },
    ],
  },
  {
    slug: "electrical",
    name: "Electrical",
    imageUrl: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&h=600&fit=crop",
    trades: [{ slug: "electrician" }],
  },
  {
    slug: "extensions",
    name: "Extensions",
    imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop",
    trades: [{ slug: "builder" }, { slug: "extension-builder" }],
  },
  {
    slug: "fascias-soffits-guttering",
    name: "Fascias, Soffits & Guttering",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    trades: [
      { slug: "gutter-cleaning-specialist" },
      { slug: "gutter-repair-specialist" },
      { slug: "guttering-installer" },
      { slug: "fascias-soffits-installer" },
    ],
  },
  {
    slug: "fencing",
    name: "Fencing",
    imageUrl: "https://images.unsplash.com/photo-1533042789716-e9a34b797399?w=800&h=600&fit=crop",
    trades: [{ slug: "fencer" }],
  },
  {
    slug: "gardening-landscaping",
    name: "Gardening & Landscaping",
    imageUrl: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&h=600&fit=crop",
    trades: [
      { slug: "garden-clearance-specialist" },
      { slug: "landscaper" },
      { slug: "gardener" },
      { slug: "garden-maintenance-company" },
    ],
  },
  {
    slug: "gas-works",
    name: "Gas Works",
    imageUrl: "https://images.unsplash.com/photo-1621905252472-128fc6df4e77?w=800&h=600&fit=crop",
    trades: [{ slug: "gas-engineer" }],
  },
  {
    slug: "groundwork-foundations",
    name: "Groundwork & Foundations",
    imageUrl: "https://images.unsplash.com/photo-1590237294019-ca0dea0e1265?w=800&h=600&fit=crop",
    trades: [{ slug: "groundworker" }],
  },
  {
    slug: "handyman",
    name: "Handyman",
    imageUrl: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=800&h=600&fit=crop",
    trades: [{ slug: "handyman" }],
  },
  {
    slug: "insulation",
    name: "Insulation",
    imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=600&fit=crop",
    trades: [{ slug: "insulation-company" }],
  },
  {
    slug: "kitchen-fitting",
    name: "Kitchen Fitting",
    imageUrl: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&h=600&fit=crop",
    trades: [{ slug: "kitchen-fitter" }],
  },
  {
    slug: "locksmith",
    name: "Locksmith",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    trades: [{ slug: "locksmith" }],
  },
  {
    slug: "loft-conversion",
    name: "Loft Conversion",
    imageUrl: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&h=600&fit=crop",
    trades: [{ slug: "loft-conversion-company" }],
  },
  {
    slug: "moving-services",
    name: "Moving Services",
    imageUrl: "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=800&h=600&fit=crop",
    trades: [{ slug: "moving-company" }],
  },
  {
    slug: "new-build",
    name: "New Build",
    imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=600&fit=crop",
    trades: [{ slug: "new-home-builder" }],
  },
  {
    slug: "painting-decorating",
    name: "Painting & Decorating",
    imageUrl: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800&h=600&fit=crop",
    trades: [{ slug: "painter-decorator" }],
  },
  {
    slug: "plastering-rendering",
    name: "Plastering & Rendering",
    imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop",
    trades: [{ slug: "plasterer" }],
  },
  {
    slug: "plumbing",
    name: "Plumbing",
    imageUrl: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=800&h=600&fit=crop",
    trades: [{ slug: "plumber" }],
  },
  {
    slug: "restoration-refurbishment",
    name: "Restoration & Refurbishment",
    imageUrl: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop",
    trades: [{ slug: "building-restoration-refurbishment-company" }],
  },
  {
    slug: "roofing",
    name: "Roofing",
    imageUrl: "https://images.unsplash.com/photo-1632778841148-afb6bffdee87?w=800&h=600&fit=crop",
    trades: [
      { slug: "roof-cleaner" },
      { slug: "roof-repair-specialist" },
      { slug: "roofer" },
    ],
  },
  {
    slug: "security-systems",
    name: "Security Systems",
    imageUrl: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&h=600&fit=crop",
    trades: [{ slug: "cctv-installer" }, { slug: "security-system-installer" }],
  },
  {
    slug: "stonemasonry",
    name: "Stonemasonry",
    imageUrl: "https://images.unsplash.com/photo-1590237294019-ca0dea0e1265?w=800&h=600&fit=crop",
    trades: [{ slug: "stonemason" }],
  },
  {
    slug: "tiling",
    name: "Tiling",
    imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
    trades: [{ slug: "tiler" }],
  },
  {
    slug: "tree-surgery",
    name: "Tree Surgery",
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop",
    trades: [{ slug: "tree-surgeon" }],
  },
  {
    slug: "windows-door-fitting",
    name: "Windows & Door Fitting",
    imageUrl: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop",
    trades: [
      { slug: "double-glazing-repair-specialist" },
      { slug: "door-fitter" },
      { slug: "glazier" },
      { slug: "window-fitter" },
    ],
  },
];

/** Derived Helpers - For Backward Compatibility */
export const serviceSlugs = services.map((s) => s.slug);

export const serviceNames = services.map((s) => s.name);

export const serviceTradeMap = Object.fromEntries(
  services.map((s) => [s.slug, s.trades.map((t) => t.slug)]),
);
