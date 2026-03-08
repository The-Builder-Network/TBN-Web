/** Taxonomy Interfaces */
export interface TradeTaxonomy {
  slug: string;
}

export interface ServiceTaxonomy {
  slug: string;
  name: string;
  trades: TradeTaxonomy[];
}

/** Single Source of Truth - Service → Trades Hierarchy */
export const services: ServiceTaxonomy[] = [
  {
    slug: "architectural-services",
    name: "Architectural Services",
    trades: [
      { slug: "architectural-designer" },
      { slug: "architectural-technician" },
    ],
  },
  {
    slug: "bathroom-fitting",
    name: "Bathroom Fitting",
    trades: [{ slug: "bathroom-fitter" }],
  },
  {
    slug: "bricklaying-repointing",
    name: "Bricklaying & Repointing",
    trades: [{ slug: "bricklayer" }, { slug: "repointing-specialist" }],
  },
  {
    slug: "carpentry-joinery",
    name: "Carpentry & Joinery",
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
    trades: [
      { slug: "carpet-fitter" },
      { slug: "flooring-fitter" },
      { slug: "vinyl-flooring-fitter" },
    ],
  },
  {
    slug: "central-heating",
    name: "Central Heating",
    trades: [
      { slug: "boiler-installation-specialist" },
      { slug: "boiler-repair-specialist" },
      { slug: "heating-engineer" },
    ],
  },
  {
    slug: "chimney-fireplace",
    name: "Chimney & Fireplace",
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
    trades: [{ slug: "cleaner" }, { slug: "window-cleaner" }],
  },
  {
    slug: "conservatories",
    name: "Conservatories",
    trades: [
      { slug: "conservatory-repair-specialist" },
      { slug: "conservatory-installer" },
    ],
  },
  {
    slug: "conversions",
    name: "Conversions",
    trades: [
      { slug: "conversion-specialist" },
      { slug: "garage-conversion-specialist" },
    ],
  },
  {
    slug: "damp-proofing",
    name: "Damp Proofing",
    trades: [{ slug: "damp-proofer" }],
  },
  {
    slug: "demolition-clearance",
    name: "Demolition & Clearance",
    trades: [
      { slug: "waste-rubbish-clearance" },
      { slug: "demolition-company" },
    ],
  },
  {
    slug: "driveways-paving",
    name: "Driveways & Paving",
    trades: [
      { slug: "driveways-installer" },
      { slug: "tarmac-driveway-company" },
    ],
  },
  {
    slug: "electrical",
    name: "Electrical",
    trades: [{ slug: "electrician" }],
  },
  {
    slug: "extensions",
    name: "Extensions",
    trades: [{ slug: "builder" }, { slug: "extension-builder" }],
  },
  {
    slug: "fascias-soffits-guttering",
    name: "Fascias, Soffits & Guttering",
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
    trades: [{ slug: "fencer" }],
  },
  {
    slug: "gardening-landscaping",
    name: "Gardening & Landscaping",
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
    trades: [{ slug: "gas-engineer" }],
  },
  {
    slug: "groundwork-foundations",
    name: "Groundwork & Foundations",
    trades: [{ slug: "groundworker" }],
  },
  {
    slug: "handyman",
    name: "Handyman",
    trades: [{ slug: "handyman" }],
  },
  {
    slug: "insulation",
    name: "Insulation",
    trades: [{ slug: "insulation-company" }],
  },
  {
    slug: "kitchen-fitting",
    name: "Kitchen Fitting",
    trades: [{ slug: "kitchen-fitter" }],
  },
  {
    slug: "locksmith",
    name: "Locksmith",
    trades: [{ slug: "locksmith" }],
  },
  {
    slug: "loft-conversion",
    name: "Loft Conversion",
    trades: [{ slug: "loft-conversion-company" }],
  },
  {
    slug: "moving-services",
    name: "Moving Services",
    trades: [{ slug: "moving-company" }],
  },
  {
    slug: "new-build",
    name: "New Build",
    trades: [{ slug: "new-home-builder" }],
  },
  {
    slug: "painting-decorating",
    name: "Painting & Decorating",
    trades: [{ slug: "painter-decorator" }],
  },
  {
    slug: "plastering-rendering",
    name: "Plastering & Rendering",
    trades: [{ slug: "plasterer" }],
  },
  {
    slug: "plumbing",
    name: "Plumbing",
    trades: [{ slug: "plumber" }],
  },
  {
    slug: "restoration-refurbishment",
    name: "Restoration & Refurbishment",
    trades: [{ slug: "building-restoration-refurbishment-company" }],
  },
  {
    slug: "roofing",
    name: "Roofing",
    trades: [
      { slug: "roof-cleaner" },
      { slug: "roof-repair-specialist" },
      { slug: "roofer" },
    ],
  },
  {
    slug: "security-systems",
    name: "Security Systems",
    trades: [{ slug: "cctv-installer" }, { slug: "security-system-installer" }],
  },
  {
    slug: "stonemasonry",
    name: "Stonemasonry",
    trades: [{ slug: "stonemason" }],
  },
  {
    slug: "tiling",
    name: "Tiling",
    trades: [{ slug: "tiler" }],
  },
  {
    slug: "tree-surgery",
    name: "Tree Surgery",
    trades: [{ slug: "tree-surgeon" }],
  },
  {
    slug: "windows-door-fitting",
    name: "Windows & Door Fitting",
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
