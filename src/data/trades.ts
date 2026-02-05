export interface TradeDetail {
  sectionTitle: string;
  sectionText: string;
}

export interface TradeFAQ {
  question: string;
  answer: string;
}

export interface Trade {
  slug: string;
  name: string;
  title: string;
  description: string;
  details: TradeDetail[];
  faqs: TradeFAQ[];
  imageUrl: string;
}

export const trades: Trade[] = [
  {
    slug: "boiler-installation-specialist",
    name: "Boiler Installation Specialist",
    title: "Find professional boiler installation services near you",
    description:
      "Looking for expert boiler installation? Get matched with certified boiler installation specialists who can install your new boiler safely and efficiently. Read reviews, compare quotes, and hire with confidence.",
    details: [
      {
        sectionTitle: "Why choose a boiler installation specialist?",
        sectionText:
          "Professional boiler installation specialists ensure your heating system is installed correctly and safely. They have the qualifications and experience to handle complex installations, ensuring your home stays warm and your energy bills stay low.",
      },
      {
        sectionTitle: "What to expect from your boiler installation",
        sectionText:
          "A qualified installer will assess your home, recommend the right boiler for your needs, remove your old boiler if necessary, and install your new one following all safety regulations. They'll also provide guidance on maintenance and operation.",
      },
    ],
    faqs: [
      {
        question: "How long does a boiler installation take?",
        answer:
          "A typical boiler installation takes 1-2 days, depending on the complexity of the job and whether any additional pipework is required.",
      },
      {
        question: "Do I need any certifications from my installer?",
        answer:
          "Yes, your boiler installer must be Gas Safe registered. This ensures they're qualified to work safely with gas appliances.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=600&fit=crop",
  },
  {
    slug: "boiler-repair-specialist",
    name: "Boiler Repair Specialist",
    title: "Find reliable boiler repair services near you",
    description:
      "Need your boiler repaired? Connect with Gas Safe registered boiler repair specialists who can diagnose and fix issues quickly. Post your job for free and get matched with local professionals.",
    details: [
      {
        sectionTitle: "Common boiler problems",
        sectionText:
          "Boiler repair specialists can fix a wide range of issues including no heating or hot water, leaking boilers, strange noises, low pressure, and frozen condensate pipes. They'll diagnose the problem and provide expert repairs.",
      },
      {
        sectionTitle: "Why professional boiler repair matters",
        sectionText:
          "Attempting to repair a boiler yourself can be dangerous and illegal. Gas Safe registered engineers have the training and expertise to repair your boiler safely, ensuring it operates efficiently and safely.",
      },
    ],
    faqs: [
      {
        question: "How quickly can someone repair my boiler?",
        answer:
          "Many boiler repair specialists offer same-day or emergency services, especially during winter months. Response times vary depending on location and availability.",
      },
      {
        question: "Should I repair or replace my boiler?",
        answer:
          "This depends on the age of your boiler, the cost of repairs, and its efficiency. A specialist can advise whether repair or replacement is more cost-effective.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop",
  },
  {
    slug: "builder",
    name: "Builder",
    title: "Find experienced builders for your construction project",
    description:
      "Looking for a reliable builder? Connect with experienced builders who can handle everything from small repairs to major construction projects. Read reviews, compare quotes, and hire the right builder for your needs.",
    details: [
      {
        sectionTitle: "What services do builders provide?",
        sectionText:
          "Builders offer a comprehensive range of services including extensions, loft conversions, renovations, structural work, brickwork, and general building repairs. They can manage entire projects from planning to completion.",
      },
      {
        sectionTitle: "Choosing the right builder",
        sectionText:
          "Look for builders with relevant experience, proper insurance, and good customer reviews. Check their previous work, get multiple quotes, and ensure they understand your requirements before starting.",
      },
    ],
    faqs: [
      {
        question: "How do I know if a builder is qualified?",
        answer:
          "Check for memberships in professional bodies, relevant qualifications, insurance documentation, and reviews from previous clients. A reputable builder will happily provide references.",
      },
      {
        question: "Should I get multiple quotes?",
        answer:
          "Yes, it's recommended to get at least three quotes to compare prices and approaches. This helps ensure you're getting fair value and the right builder for your project.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop",
  },
  {
    slug: "cctv-installer",
    name: "CCTV Installer",
    title: "Professional CCTV installation services near you",
    description:
      "Need CCTV installed? Find experienced CCTV installers who can design and install security camera systems for your home or business. Get matched with local professionals today.",
    details: [
      {
        sectionTitle: "CCTV installation services",
        sectionText:
          "Professional CCTV installers assess your property, recommend suitable camera systems, install cameras and recording equipment, set up remote viewing capabilities, and provide training on system operation.",
      },
      {
        sectionTitle: "Benefits of professional installation",
        sectionText:
          "Expert installers ensure optimal camera placement, professional wiring, proper configuration, and integration with existing security systems. They'll also ensure compliance with privacy regulations.",
      },
    ],
    faqs: [
      {
        question: "How many cameras do I need?",
        answer:
          "This depends on your property size and security requirements. A professional installer will assess your property and recommend the optimal number and placement of cameras.",
      },
      {
        question: "Can I view my cameras remotely?",
        answer:
          "Yes, most modern CCTV systems offer remote viewing via smartphone apps or web browsers, allowing you to monitor your property from anywhere.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&h=600&fit=crop",
  },
  {
    slug: "chimney-sweep",
    name: "Chimney Sweep",
    title: "Find professional chimney sweep services near you",
    description:
      "Keep your chimney safe and efficient with professional chimney sweep services. Get matched with experienced chimney sweeps who can clean, inspect, and maintain your chimney.",
    details: [
      {
        sectionTitle: "Why regular chimney sweeping is important",
        sectionText:
          "Regular chimney sweeping removes soot, debris, and creosote buildup that can cause chimney fires or carbon monoxide poisoning. It also improves efficiency and identifies potential issues before they become serious problems.",
      },
      {
        sectionTitle: "What to expect from a chimney sweep",
        sectionText:
          "A professional chimney sweep will protect your home, thoroughly clean your chimney, inspect for damage or blockages, provide a certificate of sweeping, and advise on any necessary repairs or maintenance.",
      },
    ],
    faqs: [
      {
        question: "How often should I have my chimney swept?",
        answer:
          "It's recommended to have your chimney swept at least once a year if you use it regularly, or more frequently if you burn wood regularly.",
      },
      {
        question: "Do chimney sweeps make a mess?",
        answer:
          "Professional chimney sweeps use modern equipment including industrial vacuums and protective sheeting to minimize mess and protect your home.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop",
  },
  {
    slug: "cleaner",
    name: "Cleaner",
    title: "Find reliable cleaning services near you",
    description:
      "Need cleaning help? Connect with professional cleaners who can handle domestic cleaning, deep cleaning, end of tenancy cleaning, and more. Read reviews and hire with confidence.",
    details: [
      {
        sectionTitle: "Types of cleaning services available",
        sectionText:
          "Professional cleaners offer regular domestic cleaning, deep cleaning, end of tenancy cleaning, after builders cleaning, carpet cleaning, and specialized cleaning services tailored to your needs.",
      },
      {
        sectionTitle: "Benefits of professional cleaning",
        sectionText:
          "Professional cleaners bring expertise, professional-grade equipment, and products to ensure thorough cleaning. They save you time and effort while maintaining high standards of cleanliness.",
      },
    ],
    faqs: [
      {
        question: "Do I need to provide cleaning products?",
        answer:
          "Most professional cleaners bring their own supplies and equipment, but this should be confirmed when booking. Some may use your preferred products if requested.",
      },
      {
        question: "How long does a cleaning session take?",
        answer:
          "This varies depending on property size and cleaning type. A typical house clean takes 2-4 hours, while deep cleans may take longer.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop",
  },
  {
    slug: "conservatory-repair-specialist",
    name: "Conservatory Repair Specialist",
    title: "Expert conservatory repair services near you",
    description:
      "Need conservatory repairs? Find specialists who can fix leaking roofs, broken glass, damaged frames, and more. Get your conservatory back to perfect condition.",
    details: [
      {
        sectionTitle: "Common conservatory repairs",
        sectionText:
          "Conservatory repair specialists handle leaking roofs, broken or misted glass panels, damaged frames, faulty doors and windows, cracked seals, and structural issues. They can also upgrade older conservatories.",
      },
      {
        sectionTitle: "Why choose a specialist",
        sectionText:
          "Conservatory specialists understand the unique challenges of these structures and have experience with various conservatory types and manufacturers. They can source matching parts and ensure repairs blend seamlessly.",
      },
    ],
    faqs: [
      {
        question: "Can a conservatory roof be repaired?",
        answer:
          "Yes, most conservatory roof issues can be repaired, including leaks, damaged panels, and worn seals. In some cases, a full roof replacement might be more cost-effective.",
      },
      {
        question: "How long do conservatory repairs take?",
        answer:
          "Simple repairs like replacing glass panels or seals can be completed in a few hours, while more extensive repairs may take several days.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop",
  },
  {
    slug: "double-glazing-repair-specialist",
    name: "Double Glazing Repair Specialist",
    title: "Professional double glazing repair services near you",
    description:
      "Problems with your double glazing? Find specialists who can repair misted windows, broken seals, faulty handles, and more. Get expert repairs without replacing entire windows.",
    details: [
      {
        sectionTitle: "Double glazing repair services",
        sectionText:
          "Specialists can repair misted or foggy windows, replace broken seals, fix faulty locks and handles, repair damaged frames, and resolve drainage issues. They work with all types of double glazed windows.",
      },
      {
        sectionTitle: "Cost-effective alternative to replacement",
        sectionText:
          "Repairing double glazing is often much more affordable than replacement. Specialists can restore functionality and appearance, extending the life of your windows at a fraction of replacement cost.",
      },
    ],
    faqs: [
      {
        question: "Can misted double glazing be repaired?",
        answer:
          "Yes, misted double glazing can often be repaired by replacing the sealed unit within the existing frame, which is more cost-effective than replacing the entire window.",
      },
      {
        question: "How long does double glazing last?",
        answer:
          "Quality double glazing typically lasts 20-35 years, though seals may fail sooner. Regular maintenance and timely repairs can extend their lifespan.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop",
  },
  {
    slug: "electrician",
    name: "Electrician",
    title: "Find qualified electricians near you",
    description:
      "Need electrical work done? Connect with Part P certified electricians who can handle all your electrical needs safely and professionally. From rewiring to installing new circuits, find the right electrician today.",
    details: [
      {
        sectionTitle: "Electrical services available",
        sectionText:
          "Qualified electricians provide rewiring, consumer unit upgrades, new circuits and sockets, lighting installation, electrical inspections and testing, fault finding and repairs, EV charger installation, and emergency electrical services.",
      },
      {
        sectionTitle: "Why choose a qualified electrician",
        sectionText:
          "Qualified electricians ensure work complies with current regulations, provide necessary certificates, prioritize safety, and have insurance to protect you and your property. Never use an unqualified person for electrical work.",
      },
    ],
    faqs: [
      {
        question: "What qualifications should an electrician have?",
        answer:
          "Electricians should be Part P registered and ideally members of schemes like NICEIC, NAPIT, or ECA. They should provide certificates for all work completed.",
      },
      {
        question: "Do I need an electrical safety certificate?",
        answer:
          "If you're a landlord, you must have an Electrical Installation Condition Report (EICR) every 5 years. For homeowners, it's recommended every 10 years or when buying/selling property.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&h=600&fit=crop",
  },
  {
    slug: "garden-clearance-specialist",
    name: "Garden Clearance Specialist",
    title: "Professional garden clearance services near you",
    description:
      "Need your garden cleared? Find specialists who can remove garden waste, overgrown vegetation, old sheds, and more. Get your garden back in shape quickly and efficiently.",
    details: [
      {
        sectionTitle: "Garden clearance services",
        sectionText:
          "Garden clearance specialists remove all types of garden waste including overgrown plants, branches, leaves, old sheds and outbuildings, rubble, and unwanted items. They'll leave your garden clean and tidy.",
      },
      {
        sectionTitle: "Benefits of professional clearance",
        sectionText:
          "Professionals have the equipment, vehicles, and disposal facilities to clear gardens quickly and efficiently. They ensure waste is disposed of responsibly and can often recycle green waste.",
      },
    ],
    faqs: [
      {
        question: "How much does garden clearance cost?",
        answer:
          "Costs vary depending on the amount of waste, difficulty of access, and whether any structures need removing. Most specialists provide quotes after viewing the job.",
      },
      {
        question: "What happens to the waste?",
        answer:
          "Reputable garden clearance companies dispose of waste responsibly, recycling green waste where possible and taking other materials to licensed waste facilities.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800&h=600&fit=crop",
  },
  {
    slug: "gutter-cleaning-specialist",
    name: "Gutter Cleaning Specialist",
    title: "Professional gutter cleaning services near you",
    description:
      "Keep your gutters clear and prevent water damage with professional gutter cleaning services. Find experienced specialists who can clean and maintain your guttering system.",
    details: [
      {
        sectionTitle: "Why gutter cleaning is important",
        sectionText:
          "Blocked gutters can cause water damage to your property, damp problems, and even structural damage. Regular cleaning prevents these issues and extends the life of your guttering system.",
      },
      {
        sectionTitle: "Professional gutter cleaning service",
        sectionText:
          "Specialists use professional equipment including vacuum systems and high-access tools to thoroughly clean gutters, downpipes, and hoppers. They'll also inspect for damage and advise on any necessary repairs.",
      },
    ],
    faqs: [
      {
        question: "How often should gutters be cleaned?",
        answer:
          "Gutters should typically be cleaned at least twice a year, in autumn after leaves fall and in spring. Properties near trees may need more frequent cleaning.",
      },
      {
        question: "Can you clean gutters without ladders?",
        answer:
          "Yes, many specialists use vacuum systems with high-reach poles, allowing safe gutter cleaning from ground level without needing ladders.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
  },
  {
    slug: "gutter-repair-specialist",
    name: "Gutter Repair Specialist",
    title: "Expert gutter repair services near you",
    description:
      "Problems with your gutters? Find specialists who can repair leaking gutters, replace damaged sections, and fix sagging guttering. Protect your property from water damage.",
    details: [
      {
        sectionTitle: "Common gutter repairs",
        sectionText:
          "Gutter repair specialists fix leaking joints, replace damaged sections, repair sagging gutters, unblock downpipes, replace brackets and clips, and seal holes and cracks. They work with all types of guttering.",
      },
      {
        sectionTitle: "Preventing water damage",
        sectionText:
          "Properly functioning gutters are essential for protecting your property from water damage. Timely repairs prevent costly problems like damp, rot, and foundation damage.",
      },
    ],
    faqs: [
      {
        question: "Should I repair or replace my gutters?",
        answer:
          "This depends on the extent of damage and age of your gutters. Minor issues can usually be repaired cost-effectively, while extensively damaged or very old gutters may need replacing.",
      },
      {
        question: "How long do gutter repairs take?",
        answer:
          "Most gutter repairs can be completed in a few hours, though extensive work may take longer. Emergency repairs for leaks are often available.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
  },
  {
    slug: "handyman",
    name: "Handyman",
    title: "Find reliable handyman services near you",
    description:
      "Need odd jobs done around the house? Connect with skilled handymen who can tackle a wide range of tasks from minor repairs to home improvements. Get matched with local professionals today.",
    details: [
      {
        sectionTitle: "Handyman services available",
        sectionText:
          "Handymen handle flat-pack assembly, shelving installation, picture hanging, minor plumbing and electrical work, painting and decorating, fence repairs, door hanging, tile repairs, and much more. They're perfect for those jobs you don't have time for.",
      },
      {
        sectionTitle: "Benefits of hiring a handyman",
        sectionText:
          "Handymen offer versatile skills at reasonable rates, saving you the cost of hiring multiple specialists for small jobs. They're ideal for ongoing home maintenance and can tackle a variety of tasks in one visit.",
      },
    ],
    faqs: [
      {
        question: "What jobs can a handyman do?",
        answer:
          "Handymen can handle most non-specialist jobs around the home. However, they shouldn't undertake work requiring specific certifications like Gas Safe registration or Part P electrical work.",
      },
      {
        question: "How much do handymen charge?",
        answer:
          "Rates vary by location and expertise, typically ranging from £20-40 per hour. Many handymen offer day rates for larger jobs or multiple tasks.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=800&h=600&fit=crop",
  },
  {
    slug: "moving-company",
    name: "Moving Company",
    title: "Professional moving and removal services near you",
    description:
      "Planning a move? Find reliable moving companies that can handle everything from packing to transport. Get quotes from local removal specialists and make your move stress-free.",
    details: [
      {
        sectionTitle: "Moving services available",
        sectionText:
          "Professional moving companies offer packing services, furniture disassembly and reassembly, secure transport, storage solutions, specialist item moving (pianos, antiques), and international removals. They handle everything to make your move smooth.",
      },
      {
        sectionTitle: "Why hire professional movers",
        sectionText:
          "Professional movers have experience, proper equipment, insurance, and trained teams to handle your belongings safely. They save you time, effort, and stress while protecting your possessions during the move.",
      },
    ],
    faqs: [
      {
        question: "How much do moving companies cost?",
        answer:
          "Costs depend on distance, volume of items, services required, and timing. Most companies provide detailed quotes after assessing your needs. Expect to pay more for last-minute or weekend moves.",
      },
      {
        question: "Do moving companies provide insurance?",
        answer:
          "Reputable moving companies carry goods in transit insurance, but coverage levels vary. Check what's included and consider additional insurance for valuable items.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=800&h=600&fit=crop",
  },
  {
    slug: "painter-decorator",
    name: "Painter & Decorator",
    title: "Find professional painters and decorators near you",
    description:
      "Transform your home with professional painting and decorating services. Connect with skilled painters and decorators who deliver quality finishes for interior and exterior projects.",
    details: [
      {
        sectionTitle: "Painting and decorating services",
        sectionText:
          "Professional painters and decorators provide interior and exterior painting, wallpapering, plastering repairs, woodwork painting, feature walls, textured finishes, and color consultation. They ensure high-quality, long-lasting results.",
      },
      {
        sectionTitle: "Benefits of professional decorating",
        sectionText:
          "Professionals bring expertise in surface preparation, paint selection, and application techniques that ensure superior results. They work efficiently, protect your furnishings, and deliver finishes that last.",
      },
    ],
    faqs: [
      {
        question: "How long does it take to paint a room?",
        answer:
          "A single room typically takes 1-2 days including preparation and allowing for drying time. Larger projects or those requiring extensive preparation take longer.",
      },
      {
        question: "Do I need to move furniture?",
        answer:
          "Professional decorators usually move furniture and protect it with dust sheets, though clearing the room makes the job easier and faster. Discuss this when getting quotes.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800&h=600&fit=crop",
  },
  {
    slug: "plasterer",
    name: "Plasterer",
    title: "Professional plastering services near you",
    description:
      "Need plastering work? Find skilled plasterers who can handle skimming, rendering, repairs, and new plaster installation. Get smooth, professional finishes for your walls and ceilings.",
    details: [
      {
        sectionTitle: "Plastering services available",
        sectionText:
          "Professional plasterers provide skimming, full re-plastering, patch repairs, rendering, dry lining, coving installation, and decorative plasterwork. They work on both new builds and renovation projects.",
      },
      {
        sectionTitle: "Why hire a professional plasterer",
        sectionText:
          "Plastering requires skill and experience to achieve smooth, even finishes. Professional plasterers have the expertise and tools to deliver quality results that provide the perfect surface for decoration.",
      },
    ],
    faqs: [
      {
        question: "How long does plaster take to dry?",
        answer:
          "Plaster typically takes 1-2 weeks to fully dry, depending on thickness and conditions. Light colors may show through new plaster, so a mist coat is recommended before final painting.",
      },
      {
        question: "What's the difference between plastering and skimming?",
        answer:
          "Skimming is applying a thin finishing layer of plaster over existing plaster or plasterboard. Plastering generally refers to applying multiple thicker layers to bare walls or damaged surfaces.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop",
  },
  {
    slug: "plumber",
    name: "Plumber",
    title: "Find qualified plumbers near you",
    description:
      "Need plumbing services? Connect with qualified plumbers who can handle everything from leaky taps to bathroom installations. Get reliable plumbing solutions from experienced professionals.",
    details: [
      {
        sectionTitle: "Plumbing services available",
        sectionText:
          "Qualified plumbers provide leak repairs, tap and toilet installation, bathroom fitting, boiler services, radiator installation, pipe repairs and replacement, unblocking drains, and emergency plumbing services.",
      },
      {
        sectionTitle: "Why choose a qualified plumber",
        sectionText:
          "Qualified plumbers ensure work meets building regulations, prevent water damage, provide guarantees on work, and have insurance coverage. For gas work, ensure they're Gas Safe registered.",
      },
    ],
    faqs: [
      {
        question: "What qualifications should a plumber have?",
        answer:
          "Plumbers should have relevant NVQ qualifications or City & Guilds certificates. For gas work, Gas Safe registration is mandatory. Many are also members of professional bodies like CIPHE.",
      },
      {
        question: "Do plumbers provide emergency services?",
        answer:
          "Many plumbers offer emergency call-out services for urgent issues like burst pipes or major leaks, though these typically cost more than standard appointments.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=800&h=600&fit=crop",
  },
  {
    slug: "roof-cleaner",
    name: "Roof Cleaner",
    title: "Professional roof cleaning services near you",
    description:
      "Keep your roof in top condition with professional cleaning services. Find specialists who can safely clean moss, algae, and debris from your roof, extending its lifespan.",
    details: [
      {
        sectionTitle: "Roof cleaning services",
        sectionText:
          "Professional roof cleaners remove moss, algae, lichen, and debris from roofs using safe, effective methods. They can also apply treatments to prevent regrowth and protect your roof tiles.",
      },
      {
        sectionTitle: "Benefits of roof cleaning",
        sectionText:
          "Regular cleaning removes growth that can damage tiles and cause leaks. It improves your property's appearance, prevents water damage, and extends your roof's lifespan, potentially saving thousands in repairs.",
      },
    ],
    faqs: [
      {
        question: "How often should I have my roof cleaned?",
        answer:
          "Most roofs benefit from cleaning every 3-5 years, though this varies depending on your location, surrounding trees, and roof type. North-facing roofs may need more frequent cleaning.",
      },
      {
        question: "Will roof cleaning damage my tiles?",
        answer:
          "When done properly by professionals using appropriate methods, roof cleaning is safe and won't damage tiles. Avoid high-pressure washing which can cause damage.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1632778841148-afb6bffdee87?w=800&h=600&fit=crop",
  },
  {
    slug: "roof-repair-specialist",
    name: "Roof Repair Specialist",
    title: "Expert roof repair services near you",
    description:
      "Problems with your roof? Find specialists who can repair leaks, replace tiles, fix flashing, and handle all types of roof repairs. Protect your home from water damage.",
    details: [
      {
        sectionTitle: "Roof repair services",
        sectionText:
          "Roof repair specialists fix leaks, replace broken or missing tiles, repair or replace flashing, fix valley issues, repair flat roofs, seal around chimneys and vents, and address storm damage.",
      },
      {
        sectionTitle: "Importance of timely repairs",
        sectionText:
          "Small roof problems can quickly become major issues causing extensive water damage, structural problems, and costly repairs. Professional repairs protect your home and save money in the long run.",
      },
    ],
    faqs: [
      {
        question: "How do I know if my roof needs repairs?",
        answer:
          "Signs include missing or damaged tiles, water stains on ceilings, leaks during rain, loose flashing, sagging areas, or moss and algae growth. Regular inspections can catch problems early.",
      },
      {
        question: "Can roof repairs be done in winter?",
        answer:
          "Many repairs can be done year-round, though extreme weather may delay work. Emergency repairs are typically available regardless of season.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1604609377545-66d81f6ae5ae?w=800&h=600&fit=crop",
  },
  {
    slug: "wardrobe-fitter",
    name: "Wardrobe Fitter",
    title: "Professional wardrobe fitting services near you",
    description:
      "Need wardrobes fitted? Find experienced fitters who can install built-in wardrobes, sliding door wardrobes, and flat-pack wardrobes. Get perfect storage solutions professionally installed.",
    details: [
      {
        sectionTitle: "Wardrobe fitting services",
        sectionText:
          "Professional wardrobe fitters install built-in wardrobes, fit sliding door systems, assemble flat-pack wardrobes, create bespoke storage solutions, and ensure perfect alignment and smooth operation.",
      },
      {
        sectionTitle: "Benefits of professional fitting",
        sectionText:
          "Professionals ensure wardrobes are level, secure, and function correctly. They handle challenges like uneven walls or floors and can modify designs to fit your space perfectly.",
      },
    ],
    faqs: [
      {
        question: "How long does wardrobe fitting take?",
        answer:
          "Simple flat-pack wardrobes take a few hours, while built-in or sliding door systems may take 1-2 days depending on complexity and size.",
      },
      {
        question: "Can wardrobes be fitted on any wall?",
        answer:
          "Most walls can accommodate wardrobes, though stud walls may need reinforcement. Professional fitters assess your walls and ensure secure installation.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
  },
  {
    slug: "window-cleaner",
    name: "Window Cleaner",
    title: "Professional window cleaning services near you",
    description:
      "Keep your windows sparkling clean with professional window cleaning services. Find reliable window cleaners offering regular or one-off cleans for homes and businesses.",
    details: [
      {
        sectionTitle: "Window cleaning services",
        sectionText:
          "Professional window cleaners provide regular domestic window cleaning, commercial window cleaning, one-off deep cleans, conservatory cleaning, gutter cleaning, and high-access window cleaning using poles or cherry pickers.",
      },
      {
        sectionTitle: "Benefits of professional cleaning",
        sectionText:
          "Professional window cleaners have the equipment and expertise to safely clean all windows, including high or difficult-to-reach ones. Regular cleaning maintains your property's appearance and extends window life.",
      },
    ],
    faqs: [
      {
        question: "How often should windows be cleaned?",
        answer:
          "Most homes benefit from window cleaning every 4-8 weeks. Frequency depends on location, weather, and personal preference. Commercial properties often require more frequent cleaning.",
      },
      {
        question: "Do window cleaners clean inside and out?",
        answer:
          "Most window cleaners clean both sides, though some may charge extra for internal cleaning. Discuss your requirements when booking.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=800&h=600&fit=crop",
  },
  {
    slug: "roofer",
    name: "Roofer",
    title: "Find professional roofers near you",
    description:
      "Need roofing work done? Connect with experienced roofers who can handle repairs, replacements, and new roof installations. Get quality roofing services from trusted professionals.",
    details: [
      {
        sectionTitle: "Roofing services available",
        sectionText:
          "Professional roofers provide new roof installation, full re-roofing, repairs, flat roofing, pitched roofing, tile and slate work, fascias and soffits, guttering, and roof maintenance. They work on all types of properties.",
      },
      {
        sectionTitle: "Choosing the right roofer",
        sectionText:
          "Look for roofers with relevant experience, proper insurance, good reviews, and memberships in trade associations. A quality roofer provides detailed quotes, uses good materials, and guarantees their work.",
      },
    ],
    faqs: [
      {
        question: "How long does a new roof take to install?",
        answer:
          "A typical residential roof replacement takes 1-2 weeks, depending on size, weather, and complexity. Simple repairs may be completed in a day.",
      },
      {
        question: "What type of roofing is best?",
        answer:
          "The best roofing depends on your property type, budget, and preferences. A professional roofer can advise on suitable options including tiles, slates, metal, or flat roofing systems.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1632778841148-afb6bffdee87?w=800&h=600&fit=crop",
  },
  {
    slug: "carpenter-joiner",
    name: "Carpenter & Joiner",
    title: "Find skilled carpenters and joiners near you",
    description:
      "Need carpentry work? Connect with experienced carpenters and joiners who can handle everything from bespoke furniture to structural work. Get quality craftsmanship for your project.",
    details: [
      {
        sectionTitle: "Carpentry and joinery services",
        sectionText:
          "Carpenters and joiners provide bespoke furniture, fitted kitchens, staircases, doors and windows, flooring, decking, roof carpentry, renovations, and general woodwork. They combine traditional skills with modern techniques.",
      },
      {
        sectionTitle: "Difference between carpenter and joiner",
        sectionText:
          "Joiners typically work in workshops creating items like doors, windows, and furniture. Carpenters work on-site installing these items and doing structural work. Many professionals offer both services.",
      },
    ],
    faqs: [
      {
        question: "How much do carpenters charge?",
        answer:
          "Rates vary by location and expertise, typically £20-40 per hour or £150-300 per day. Bespoke projects are usually quoted after discussion of requirements.",
      },
      {
        question: "Can carpenters design as well as build?",
        answer:
          "Many experienced carpenters and joiners offer design services and can create technical drawings for approval before starting work.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop",
  },
  {
    slug: "landscaper",
    name: "Landscaper",
    title: "Professional landscaping services near you",
    description:
      "Transform your outdoor space with professional landscaping services. Find experienced landscapers who can design and create beautiful, functional gardens.",
    details: [
      {
        sectionTitle: "Landscaping services available",
        sectionText:
          "Professional landscapers provide garden design, paving and patios, decking, fencing, turfing, planting, water features, garden lighting, retaining walls, and complete garden makeovers.",
      },
      {
        sectionTitle: "Benefits of professional landscaping",
        sectionText:
          "Professional landscapers bring design expertise, knowledge of plants and materials, and skills to create stunning outdoor spaces. They handle all aspects from planning to completion, ensuring quality results.",
      },
    ],
    faqs: [
      {
        question: "How long does landscaping take?",
        answer:
          "Timescales vary greatly depending on project size and complexity. Simple jobs may take a few days, while complete garden transformations can take several weeks.",
      },
      {
        question: "Do I need planning permission for landscaping?",
        answer:
          "Most landscaping doesn't require planning permission, though some features like walls over certain heights or work affecting drainage might need approval. Your landscaper can advise.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&h=600&fit=crop",
  },
  {
    slug: "bathroom-fitter",
    name: "Bathroom Fitter",
    title: "Professional bathroom fitting services near you",
    description:
      "Planning a new bathroom? Find experienced bathroom fitters who can handle complete installations from design to completion. Get your dream bathroom professionally fitted.",
    details: [
      {
        sectionTitle: "Bathroom fitting services",
        sectionText:
          "Bathroom fitters provide complete bathroom installations, renovations, suite replacements, tiling, plumbing, electrical work, flooring, and can project manage your entire bathroom transformation.",
      },
      {
        sectionTitle: "Why hire a bathroom specialist",
        sectionText:
          "Bathroom fitters coordinate all trades, ensure proper waterproofing and ventilation, understand building regulations, and deliver professional finishes. They save you time and stress while ensuring quality results.",
      },
    ],
    faqs: [
      {
        question: "How long does a bathroom installation take?",
        answer:
          "A complete bathroom renovation typically takes 1-2 weeks, depending on the extent of work. Simple suite replacements may take just a few days.",
      },
      {
        question: "Do bathroom fitters provide design services?",
        answer:
          "Many bathroom fitters offer design consultations and can help you plan your bathroom layout and select fixtures and fittings within your budget.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&h=600&fit=crop",
  },
  {
    slug: "bricklayer",
    name: "Bricklayer",
    title: "Find skilled bricklayers near you",
    description:
      "Need bricklaying services? Connect with experienced bricklayers who can handle everything from garden walls to house extensions. Get quality brickwork from skilled professionals.",
    details: [
      {
        sectionTitle: "Bricklaying services available",
        sectionText:
          "Professional bricklayers provide house extensions, garden walls, boundary walls, retaining walls, repairs and repointing, chimney work, block work, and decorative brickwork. They ensure strong, lasting structures.",
      },
      {
        sectionTitle: "Importance of quality brickwork",
        sectionText:
          "Quality brickwork is essential for structural integrity and appearance. Experienced bricklayers ensure proper foundations, correct mortar mix, and weather-resistant construction that will last for decades.",
      },
    ],
    faqs: [
      {
        question: "How much do bricklayers charge?",
        answer:
          "Bricklayers typically charge per brick laid or day rate. Rates vary by region and project complexity. Expect to pay £40-60 per hour or £200-350 per day.",
      },
      {
        question: "What's the difference between bricklaying and blockwork?",
        answer:
          "Bricklaying uses bricks for visible work, while blockwork uses larger concrete blocks typically for foundations or internal walls that will be covered.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1590237294019-ca0dea0e1265?w=800&h=600&fit=crop",
  },
  {
    slug: "gas-engineer",
    name: "Gas Engineer",
    title: "Find Gas Safe registered engineers near you",
    description:
      "Need gas work done? Connect with Gas Safe registered engineers who can handle boiler installations, repairs, servicing, and all gas appliance work safely and professionally.",
    details: [
      {
        sectionTitle: "Gas engineering services",
        sectionText:
          "Gas Safe engineers provide boiler installation and repairs, central heating installation, gas safety inspections, appliance installation, gas leak detection and repair, servicing, and emergency gas services.",
      },
      {
        sectionTitle: "Why Gas Safe registration matters",
        sectionText:
          "By law, only Gas Safe registered engineers can work on gas appliances and systems. They have the training, qualifications, and insurance to work safely, protecting you and your family from carbon monoxide and explosion risks.",
      },
    ],
    faqs: [
      {
        question: "How can I check a gas engineer is qualified?",
        answer:
          "All gas engineers must be Gas Safe registered. Check their Gas Safe ID card and verify their registration online at gasaferegister.co.uk using their license number.",
      },
      {
        question: "How often should gas appliances be serviced?",
        answer:
          "Boilers should be serviced annually to maintain efficiency and safety. Landlords are legally required to arrange annual gas safety checks for all gas appliances.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1621905252472-128fc6df4e77?w=800&h=600&fit=crop",
  },
  {
    slug: "carpet-fitter",
    name: "Carpet Fitter",
    title: "Professional carpet fitting services near you",
    description:
      "Need new carpets fitted? Find experienced carpet fitters who can measure, supply, and install carpets to perfection. Get quality carpet fitting at competitive prices.",
    details: [
      {
        sectionTitle: "Carpet fitting services",
        sectionText:
          "Professional carpet fitters provide measuring and estimating, carpet supply, underlay supply and fitting, carpet fitting, gripper installation, furniture moving, and waste removal. They ensure smooth, lasting results.",
      },
      {
        sectionTitle: "Benefits of professional fitting",
        sectionText:
          "Professional fitters have the tools and expertise to fit carpets without wrinkles, tears, or visible seams. They ensure proper underlay, secure fixing, and neat trimming for a perfect finish.",
      },
    ],
    faqs: [
      {
        question: "How long does carpet fitting take?",
        answer:
          "A typical room takes a few hours, while a whole house might take 1-2 days depending on size and complexity. Fitters usually complete domestic jobs in one day.",
      },
      {
        question: "Do I need to remove furniture?",
        answer:
          "Many carpet fitters will move furniture as part of the service, though clearing rooms beforehand speeds up the job. Heavy items may require help or additional cost.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop",
  },
  {
    slug: "kitchen-fitter",
    name: "Kitchen Fitter",
    title: "Professional kitchen fitting services near you",
    description:
      "Planning a new kitchen? Find experienced kitchen fitters who can handle complete installations from design to completion. Get your dream kitchen professionally fitted.",
    details: [
      {
        sectionTitle: "Kitchen fitting services",
        sectionText:
          "Kitchen fitters provide complete kitchen installations, unit fitting, worktop templating and fitting, appliance installation, tiling, plumbing and electrical work coordination, and can project manage your entire kitchen transformation.",
      },
      {
        sectionTitle: "Why hire a kitchen specialist",
        sectionText:
          "Kitchen fitters coordinate all trades, ensure precise measurements and fitting, understand building regulations, and deliver professional finishes. They save you time and stress while ensuring quality results.",
      },
    ],
    faqs: [
      {
        question: "How long does a kitchen installation take?",
        answer:
          "A complete kitchen installation typically takes 1-2 weeks, depending on size and complexity. Simple unit replacements may take just a few days.",
      },
      {
        question: "Do kitchen fitters provide design services?",
        answer:
          "Many kitchen fitters offer design consultations and can help you plan your kitchen layout and select units and appliances within your budget.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&h=600&fit=crop",
  },
  {
    slug: "cabinet-maker",
    name: "Cabinet Maker",
    title: "Find skilled cabinet makers near you",
    description:
      "Need bespoke cabinets or furniture? Connect with experienced cabinet makers who can create custom storage solutions and furniture tailored to your space and style.",
    details: [
      {
        sectionTitle: "Cabinet making services",
        sectionText:
          "Cabinet makers create bespoke kitchen cabinets, bathroom vanities, wardrobes, bookcases, storage solutions, and custom furniture. They combine traditional craftsmanship with modern techniques and materials.",
      },
      {
        sectionTitle: "Benefits of bespoke cabinets",
        sectionText:
          "Custom-made cabinets maximize your space, match your exact requirements, and offer superior quality to mass-produced alternatives. They're designed to fit perfectly and last for decades.",
      },
    ],
    faqs: [
      {
        question: "How long does it take to make bespoke cabinets?",
        answer:
          "Timescales vary depending on complexity and current workload, typically 4-8 weeks from design approval to installation. Simple projects may be quicker.",
      },
      {
        question: "Are bespoke cabinets expensive?",
        answer:
          "Bespoke cabinets cost more than mass-produced options but offer superior quality, perfect fit, and personalization. Many find the investment worthwhile for the quality and longevity.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&h=600&fit=crop",
  },
  {
    slug: "tiler",
    name: "Tiler",
    title: "Professional tiling services near you",
    description:
      "Need tiling work done? Find experienced tilers who can tile bathrooms, kitchens, floors, and more. Get quality tiling with professional finishes.",
    details: [
      {
        sectionTitle: "Tiling services available",
        sectionText:
          "Professional tilers provide floor tiling, wall tiling, bathroom tiling, kitchen tiling, outdoor tiling, tile repairs, grouting, and can work with ceramic, porcelain, natural stone, and mosaic tiles.",
      },
      {
        sectionTitle: "Why hire a professional tiler",
        sectionText:
          "Professional tilers ensure proper surface preparation, straight lines, even spacing, and water-resistant finishes. They have the tools and expertise to handle cuts, corners, and challenging layouts.",
      },
    ],
    faqs: [
      {
        question: "How long does tiling take?",
        answer:
          "A typical bathroom takes 2-3 days including preparation and allowing grout to cure. Larger areas or intricate patterns take longer.",
      },
      {
        question: "Do I need to remove old tiles first?",
        answer:
          "Sometimes old tiles can be tiled over if they're secure and level, but usually removal is recommended for best results. A professional tiler can advise on your specific situation.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
  },
  {
    slug: "door-fitter",
    name: "Door Fitter",
    title: "Professional door fitting services near you",
    description:
      "Need new doors fitted? Find experienced door fitters who can install internal doors, external doors, and fire doors professionally. Get smooth operation and perfect fit.",
    details: [
      {
        sectionTitle: "Door fitting services",
        sectionText:
          "Door fitters install internal doors, external doors, fire doors, sliding doors, bi-fold doors, French doors, and can adjust or repair existing doors. They ensure perfect alignment and smooth operation.",
      },
      {
        sectionTitle: "Importance of professional fitting",
        sectionText:
          "Properly fitted doors hang straight, open and close smoothly, and seal correctly. Professional fitting ensures security, energy efficiency, and longevity while preventing common problems like sticking or drafts.",
      },
    ],
    faqs: [
      {
        question: "How long does it take to fit a door?",
        answer:
          "A standard internal door typically takes 1-2 hours per door. External doors may take half a day including adjusting frames and ensuring weatherproofing.",
      },
      {
        question: "Can you fit doors to existing frames?",
        answer:
          "Yes, doors can often be fitted to existing frames if they're in good condition and the right size. New frames may be needed for different sized doors or damaged frames.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
  },
  {
    slug: "glazier",
    name: "Glazier",
    title: "Professional glazing services near you",
    description:
      "Need glass work done? Find experienced glaziers who can repair or replace windows, fit double glazing, and handle all types of glass work professionally and safely.",
    details: [
      {
        sectionTitle: "Glazing services available",
        sectionText:
          "Professional glaziers provide window repairs, double glazing installation, emergency glass replacement, mirrors, glass doors, conservatory glass, splashbacks, and specialist glass work. They handle all types of glass safely.",
      },
      {
        sectionTitle: "Emergency glazing services",
        sectionText:
          "Many glaziers offer 24/7 emergency services for broken windows, providing rapid boarding up and glass replacement to secure your property and minimize disruption.",
      },
    ],
    faqs: [
      {
        question: "How quickly can broken glass be replaced?",
        answer:
          "Emergency glaziers can often board up immediately and replace glass within 24-48 hours, depending on glass type and size. Standard replacements may take longer.",
      },
      {
        question: "Can just the glass be replaced in double glazing?",
        answer:
          "Yes, often just the sealed unit can be replaced within existing frames, which is more cost-effective than replacing entire windows.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop",
  },
  {
    slug: "stove-fitter",
    name: "Stove Fitter",
    title: "Professional stove and fireplace installation near you",
    description:
      "Want a wood burner or stove installed? Find qualified stove fitters who can install, service, and maintain stoves and fireplaces safely and professionally.",
    details: [
      {
        sectionTitle: "Stove fitting services",
        sectionText:
          "Stove fitters provide wood burner installation, multi-fuel stove installation, chimney lining, fireplace installation, flue installation, servicing, and repairs. They ensure safe, compliant installations.",
      },
      {
        sectionTitle: "Building regulations and safety",
        sectionText:
          "Stove installation must comply with building regulations. Professional fitters understand clearances, hearth requirements, ventilation needs, and provide the necessary certificates for building control.",
      },
    ],
    faqs: [
      {
        question: "Do I need building regulations approval?",
        answer:
          "Yes, stove installations require building regulations approval. Registered installers can self-certify their work and provide the necessary certificates.",
      },
      {
        question: "Can any chimney be used for a wood burner?",
        answer:
          "Existing chimneys often need lining for wood burners. A professional will inspect your chimney and advise on requirements, including whether a twin-wall flue system is needed.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop",
  },
  {
    slug: "window-fitter",
    name: "Window Fitter",
    title: "Professional window fitting services near you",
    description:
      "Need new windows installed? Find experienced window fitters who can install uPVC, aluminum, or timber windows professionally. Get energy-efficient windows expertly fitted.",
    details: [
      {
        sectionTitle: "Window fitting services",
        sectionText:
          "Window fitters install uPVC windows, aluminum windows, timber windows, sash windows, bay windows, and can handle complete window replacement including making good and finishing.",
      },
      {
        sectionTitle: "Benefits of professional fitting",
        sectionText:
          "Professional window fitters ensure weatherproof installation, proper sealing, correct operation, and building regulations compliance. Quality fitting is essential for energy efficiency and longevity.",
      },
    ],
    faqs: [
      {
        question: "How long does window installation take?",
        answer:
          "A typical house with 8-10 windows usually takes 2-3 days, though this varies with window type and any remedial work needed. Individual windows take a few hours each.",
      },
      {
        question: "Do I need planning permission for new windows?",
        answer:
          "Most window replacements don't need planning permission, though conservation areas or listed buildings have restrictions. Your fitter can advise on requirements.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop",
  },
  {
    slug: "tree-surgeon",
    name: "Tree Surgeon",
    title: "Professional tree surgery services near you",
    description:
      "Need tree work done? Find qualified tree surgeons who can safely prune, remove, and maintain trees. Get expert arboricultural services from experienced professionals.",
    details: [
      {
        sectionTitle: "Tree surgery services",
        sectionText:
          "Tree surgeons provide tree felling, pruning and crown reduction, stump grinding, hedge trimming, emergency tree work, tree health assessments, and tree planting. They work safely at height using specialist equipment.",
      },
      {
        sectionTitle: "Why hire a professional tree surgeon",
        sectionText:
          "Tree work is dangerous and requires proper training, equipment, and insurance. Professional tree surgeons work safely, understand tree biology, and ensure work doesn't damage trees or property.",
      },
    ],
    faqs: [
      {
        question: "Do I need permission to remove a tree?",
        answer:
          "Trees with Tree Preservation Orders (TPOs) or in conservation areas require permission. Your tree surgeon can advise on whether permission is needed for your trees.",
      },
      {
        question: "What qualifications should a tree surgeon have?",
        answer:
          "Look for NPTC (National Proficiency Tests Council) qualifications, professional memberships like the Arboricultural Association, and comprehensive insurance including public liability.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop",
  },
  {
    slug: "gardener",
    name: "Gardener",
    title: "Find professional gardening services near you",
    description:
      "Need help maintaining your garden? Connect with experienced gardeners who offer regular maintenance, landscaping, and garden care services. Keep your garden looking beautiful year-round.",
    details: [
      {
        sectionTitle: "Gardening services available",
        sectionText:
          "Professional gardeners provide regular maintenance, lawn mowing, hedge trimming, weeding, planting, pruning, garden clearance, turfing, and seasonal garden care. They keep your garden healthy and attractive.",
      },
      {
        sectionTitle: "Benefits of regular garden maintenance",
        sectionText:
          "Regular professional care keeps gardens healthy, prevents problems, and maintains property value. Gardeners bring expertise in plant care, pest control, and seasonal tasks that ensure year-round garden beauty.",
      },
    ],
    faqs: [
      {
        question: "How often should I have my garden maintained?",
        answer:
          "This depends on garden size and your requirements. Most gardens benefit from fortnightly or monthly visits, though weekly visits may be needed during growing season.",
      },
      {
        question: "Do gardeners bring their own equipment?",
        answer:
          "Most professional gardeners bring all necessary tools and equipment, though some may use your lawnmower or other large items if preferred. Confirm when booking.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800&h=600&fit=crop",
  },
  {
    slug: "locksmith",
    name: "Locksmith",
    title: "Professional locksmith services near you",
    description:
      "Locked out or need locks changed? Find experienced locksmiths offering emergency lockout services, lock fitting, and security upgrades. Fast, reliable locksmith services available.",
    details: [
      {
        sectionTitle: "Locksmith services available",
        sectionText:
          "Professional locksmiths provide emergency lockout services, lock repairs and replacements, security upgrades, key cutting, UPVC door lock specialists, safe opening, and security consultations.",
      },
      {
        sectionTitle: "Emergency locksmith services",
        sectionText:
          "Many locksmiths offer 24/7 emergency services for lockouts, broken keys, or security issues. They can gain non-destructive entry and replace locks immediately to secure your property.",
      },
    ],
    faqs: [
      {
        question: "How quickly can a locksmith arrive?",
        answer:
          "Emergency locksmiths typically arrive within 30-60 minutes, though this varies by location and time of day. Many operate 24/7 for urgent situations.",
      },
      {
        question: "Will my door be damaged?",
        answer:
          "Professional locksmiths use non-destructive entry methods whenever possible. Damage is rare and typically only occurs with certain lock types or when specifically requested.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
  },
  {
    slug: "architectural-designer",
    name: "Architectural Designer",
    title: "Professional architectural design services near you",
    description:
      "Planning a building project? Find experienced architectural designers who can create plans, handle planning applications, and design your perfect space.",
    details: [
      {
        sectionTitle: "Architectural design services",
        sectionText:
          "Architectural designers provide design consultations, measured surveys, design drawings, planning applications, building regulations applications, 3D visualizations, and project management services.",
      },
      {
        sectionTitle: "Why hire an architectural designer",
        sectionText:
          "Professional designers maximize your space, ensure compliance with regulations, create functional beautiful spaces, and can save money by avoiding costly mistakes. They handle the entire design process from concept to approval.",
      },
    ],
    faqs: [
      {
        question:
          "What's the difference between an architect and architectural designer?",
        answer:
          "Architects are specifically qualified and registered with the ARB. Architectural designers may have similar skills but aren't registered architects. Both can design homes and handle planning applications.",
      },
      {
        question: "How much do architectural designers charge?",
        answer:
          "Fees vary by project size and complexity, typically 8-15% of build costs or fixed fees for smaller projects. Initial consultations are often free or low-cost.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=600&fit=crop",
  },
  {
    slug: "groundworker",
    name: "Groundworker",
    title: "Professional groundwork services near you",
    description:
      "Need groundwork done? Find experienced groundworkers who can handle foundations, drainage, and site preparation for building projects. Get quality groundwork professionally completed.",
    details: [
      {
        sectionTitle: "Groundwork services available",
        sectionText:
          "Groundworkers provide excavation, foundations, drainage installation, concrete work, paving sub-bases, retaining walls, site clearance, and preparation for driveways, patios, and building projects.",
      },
      {
        sectionTitle: "Importance of quality groundwork",
        sectionText:
          "Proper groundwork is essential for any building project. Quality groundwork ensures stable foundations, effective drainage, and longevity of structures built above. It prevents costly future problems.",
      },
    ],
    faqs: [
      {
        question: "What qualifications should groundworkers have?",
        answer:
          "Look for relevant construction qualifications, CSCS cards, proper insurance, and experience with your type of project. Many groundworkers have NVQs in groundwork or construction.",
      },
      {
        question: "How long does groundwork take?",
        answer:
          "This varies greatly depending on project size and complexity. Simple residential foundations might take a week, while larger or complex projects take longer.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1590237294019-ca0dea0e1265?w=800&h=600&fit=crop",
  },
  {
    slug: "stonemason",
    name: "Stonemason",
    title: "Find skilled stonemasons near you",
    description:
      "Need stonework done? Connect with experienced stonemasons who can handle stone walls, restoration, paving, and specialist stone work. Get traditional craftsmanship for lasting results.",
    details: [
      {
        sectionTitle: "Stonemasonry services",
        sectionText:
          "Stonemasons provide stone walls, restoration work, stone paving, fireplaces, archways, garden features, repointing, and can work with natural stone, restoration, and new builds.",
      },
      {
        sectionTitle: "Traditional skills for lasting results",
        sectionText:
          "Stonemasons combine traditional techniques with modern knowledge to create or restore stonework that lasts centuries. Their expertise ensures structural integrity and aesthetic beauty.",
      },
    ],
    faqs: [
      {
        question: "What's the difference between stonemasons and bricklayers?",
        answer:
          "Stonemasons specialize in working with natural stone, requiring different skills and tools than bricklaying. They understand stone properties, cutting, shaping, and traditional building techniques.",
      },
      {
        question: "How much does stonework cost?",
        answer:
          "Stonework is typically more expensive than brickwork due to material costs and specialized skills. Costs vary by project type and stone chosen. Most masons provide detailed quotes.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1590237294019-ca0dea0e1265?w=800&h=600&fit=crop",
  },
  {
    slug: "heating-engineer",
    name: "Heating Engineer",
    title: "Professional heating engineer services near you",
    description:
      "Need heating system work? Find qualified heating engineers who can install, repair, and maintain all types of heating systems. Keep your home warm and efficient.",
    details: [
      {
        sectionTitle: "Heating engineer services",
        sectionText:
          "Heating engineers install and repair boilers, design and install central heating systems, fit radiators, install underfloor heating, provide system power flushes, and handle emergency heating repairs.",
      },
      {
        sectionTitle: "Qualifications and expertise",
        sectionText:
          "Heating engineers should have relevant qualifications and, for gas systems, must be Gas Safe registered. They understand heating system design, efficiency, and can recommend the best solutions for your home.",
      },
    ],
    faqs: [
      {
        question:
          "What's the difference between a heating engineer and plumber?",
        answer:
          "While there's overlap, heating engineers specialize in heating systems. Many are both qualified plumbers and heating specialists, particularly those working with boilers and central heating.",
      },
      {
        question: "How can I make my heating more efficient?",
        answer:
          "A heating engineer can recommend upgrades like modern boilers, thermostatic radiator valves, smart controls, system balancing, and power flushing to improve efficiency and reduce bills.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1621905252472-128fc6df4e77?w=800&h=600&fit=crop",
  },
  {
    slug: "insulation-company",
    name: "Insulation Company",
    title: "Professional insulation services near you",
    description:
      "Want to improve your home's energy efficiency? Find insulation specialists who can install loft, cavity wall, and other insulation types. Reduce energy bills and stay comfortable.",
    details: [
      {
        sectionTitle: "Insulation services available",
        sectionText:
          "Insulation companies provide loft insulation, cavity wall insulation, solid wall insulation, floor insulation, pipe and tank insulation, and can advise on grants and energy saving measures.",
      },
      {
        sectionTitle: "Benefits of proper insulation",
        sectionText:
          "Quality insulation reduces heating bills, improves comfort, reduces condensation, and lowers carbon footprint. Professional installation ensures maximum effectiveness and prevents issues like cold spots.",
      },
    ],
    faqs: [
      {
        question: "How much can insulation save on energy bills?",
        answer:
          "Savings vary by property and insulation type, but cavity wall and loft insulation together can save hundreds annually. Properly insulated homes are also more valuable and comfortable.",
      },
      {
        question: "Are there grants available for insulation?",
        answer:
          "Various grants and schemes exist depending on circumstances and location. Insulation companies can advise on available funding and handle applications for you.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=600&fit=crop",
  },
  {
    slug: "fencer",
    name: "Fencer",
    title: "Professional fencing services near you",
    description:
      "Need a new fence or repairs? Find experienced fencers who can install panel fencing, close board, picket fencing, and gates. Get secure, attractive fencing professionally installed.",
    details: [
      {
        sectionTitle: "Fencing services available",
        sectionText:
          "Professional fencers install panel fencing, close board fencing, picket fencing, trellis, gates, repair existing fences, and can work with various materials including wood, metal, and composite.",
      },
      {
        sectionTitle: "Importance of quality fencing",
        sectionText:
          "Quality fencing provides security, privacy, and defines boundaries. Professional installation ensures fences are secure, level, and built to withstand weather, lasting many years with proper treatment.",
      },
    ],
    faqs: [
      {
        question: "How long does fencing last?",
        answer:
          "This depends on material and maintenance. Treated timber fencing typically lasts 15-20 years, while metal and composite fencing can last much longer. Regular treatment extends timber fence life.",
      },
      {
        question: "Do I need permission to erect a fence?",
        answer:
          "Most fences under 2 meters high don't require planning permission, though some restrictions apply near roads or in conservation areas. Check local regulations or consult your fencer.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1533042789716-e9a34b797399?w=800&h=600&fit=crop",
  },
  {
    slug: "waste-rubbish-clearance",
    name: "Waste & Rubbish Clearance Company",
    title: "Find waste and rubbish removal near you for hassle-free clearance",
    description:
      "From clearing out your home to managing a construction project, hiring the right waste and rubbish removals company ensures a hassle-free clean up. Find local rubbish removal services on The Builder Network who are interested and available to help. Read reviews, post your job for free and get matched with waste clearance specialists near you!",
    details: [
      {
        sectionTitle:
          "Looking for local waste and rubbish removal services near you?",
        sectionText:
          "Companies that specialise in waste and rubbish removal near you help to keep your home or workplace clean and clutter-free. They collect, transport and dispose of waste responsibly, handling everything from household junk and garden waste to construction debris and bulky furniture. Need a waste and rubbish removal service? The Builder Network makes it easy. Just post your job for free and local waste removal services in your area will express interest. Not only can you discuss your job with them and request quotes, but you can also browse reviews from other local customers. Get your rubbish and waste clearance started on The Builder Network today.",
      },
      {
        sectionTitle:
          "What services do rubbish removal companies near me provide?",
        sectionText:
          "Whether you need bulk waste collection, skip hire or house clearance, or even concrete removal, waste and rubbish removal companies make the disposal process way more stress free. Along the way, they'll make sure the process is done in a safe and environmentally responsible way. Here are some of the services rubbish removal companies commonly provide: Household Waste Removal: Collecting and disposing of general household rubbish and bulky items. Garden Waste Clearance: Removing green waste, branches, leaves and garden debris. Construction & Renovation Waste: Clearing rubble, bricks, plasterboard, and other building materials. Skip Hire Services: Providing a range of skip sizes for domestic and commercial waste disposal. Appliance disposal: More specialised companies on The Builder Network also offer services like kitchen appliance disposal. The Builder Network makes your search for rubbish removals near you simple. All you need to do is post your job on our site for free, with details about what you need. Then, waste and rubbish clearance companies near you will reach out. All tradespeople on The Builder Network undergo checks at registration, such as ID documents, company details, certifications for regulated jobs and skill assessments, which can help you hire with more confidence.",
      },
    ],
    faqs: [
      {
        question: "What does a waste and rubbish clearance company do?",
        answer:
          "Waste clearance professionals can remove your household, garden, office, and construction waste safely and efficiently. They can handle anything from bulky furniture to renovation debris and make sure it is disposed of properly.",
      },
      {
        question: "Do waste removal companies have insurance?",
        answer:
          "Reputable companies typically have public liability insurance to cover accidental damage during the removal process. Some may also have employer's liability insurance if they have staff handling waste on-site.",
      },
      {
        question: "How do I verify a waste removal company's credentials?",
        answer:
          "Check if they are registered with the Environment Agency as a licensed waste carrier. You can also verify their credentials through customer reviews, trade accreditations or by asking for references from past clients. It's why The Builder Network makes sure tradespeople, sole traders and companies, are qualified by obtaining certifications for regulated jobs or assessing their expertise through an online skills check.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&h=600&fit=crop",
  },
  {
    slug: "demolition-company",
    name: "Demolition Company",
    title: "Professional demolition services near you",
    description:
      "Need demolition work? Find experienced demolition companies who can safely demolish buildings, structures, or remove internal walls. Licensed, insured professionals for all demolition needs.",
    details: [
      {
        sectionTitle: "Demolition services available",
        sectionText:
          "Demolition companies provide building demolition, structural demolition, internal wall removal, garage and outbuilding demolition, site clearance, asbestos removal, and waste disposal. They ensure safe, compliant demolition.",
      },
      {
        sectionTitle: "Safety and regulations",
        sectionText:
          "Professional demolition requires proper planning, safety measures, and compliance with regulations. Licensed companies have the expertise, equipment, and insurance to demolish safely while protecting surrounding properties.",
      },
    ],
    faqs: [
      {
        question: "Do I need permission for demolition work?",
        answer:
          "Some demolition requires planning permission or prior notification to building control. Your demolition company will advise on requirements and can handle necessary applications.",
      },
      {
        question: "How long does demolition take?",
        answer:
          "This varies greatly by project size. Small structures might be demolished in a day, while larger buildings require careful planning and may take weeks including waste removal.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1590237294019-ca0dea0e1265?w=800&h=600&fit=crop",
  },
  {
    slug: "decking-installer",
    name: "Decking Installer",
    title: "Professional decking installation services near you",
    description:
      "Want a new deck? Find experienced decking installers who can design and build beautiful, durable decking for your garden. Transform your outdoor space with quality decking.",
    details: [
      {
        sectionTitle: "Decking installation services",
        sectionText:
          "Decking installers provide design consultations, ground preparation, timber and composite decking installation, balustrades and handrails, steps, lighting, and can create multi-level decks and custom designs.",
      },
      {
        sectionTitle: "Choosing the right decking",
        sectionText:
          "Professional installers advise on materials (timber or composite), design to suit your space and usage, and ensure proper construction for longevity. Quality installation prevents common problems like warping or wobbling.",
      },
    ],
    faqs: [
      {
        question: "What's better, timber or composite decking?",
        answer:
          "Both have advantages. Timber is traditional and cost-effective but needs regular maintenance. Composite is low-maintenance and long-lasting but more expensive initially. Your installer can advise based on your needs.",
      },
      {
        question: "Do I need planning permission for decking?",
        answer:
          "Decking under 30cm high usually doesn't require permission, though restrictions apply to coverage and proximity to boundaries. Raised decking may need permission. Check with your installer.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&h=600&fit=crop",
  },
  {
    slug: "extension-builder",
    name: "Extension Builder",
    title: "Professional house extension services near you",
    description:
      "Planning a house extension? Find experienced extension builders who can manage your entire project from design to completion. Add valuable space to your home.",
    details: [
      {
        sectionTitle: "Extension building services",
        sectionText:
          "Extension builders handle all aspects including design, planning applications, foundations, construction, roofing, plastering, electrics, plumbing, and finishing. They project manage your entire extension.",
      },
      {
        sectionTitle: "Types of extensions",
        sectionText:
          "Builders can create single and double-storey extensions, side returns, wraparound extensions, and garage conversions. They advise on feasibility, costs, and manage the entire build process.",
      },
    ],
    faqs: [
      {
        question: "Do I need planning permission for an extension?",
        answer:
          "Many extensions fall under permitted development rights and don't need planning permission, but this depends on size, location, and property type. Your builder will advise on requirements.",
      },
      {
        question: "How long does building an extension take?",
        answer:
          "Single-storey extensions typically take 3-4 months, while two-storey extensions take 4-6 months. This includes planning (if needed) and depends on size and complexity.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=600&fit=crop",
  },
  {
    slug: "security-system-installer",
    name: "Security System Installer",
    title: "Professional security system installation near you",
    description:
      "Protect your property with professional security system installation. Find experienced installers who can fit alarms, CCTV, and access control systems.",
    details: [
      {
        sectionTitle: "Security system services",
        sectionText:
          "Security installers provide burglar alarm installation, CCTV systems, access control, smart doorbells, security lighting, monitoring services, and system maintenance. They design systems tailored to your property.",
      },
      {
        sectionTitle: "Professional installation benefits",
        sectionText:
          "Professional installers ensure optimal equipment placement, reliable operation, proper configuration, and compliance with regulations. They provide training and support for effective system use.",
      },
    ],
    faqs: [
      {
        question: "Do security systems require monitoring?",
        answer:
          "This is optional. Self-monitored systems alert you directly via app, while professionally monitored systems alert a control center who can respond. Professional monitoring usually requires a subscription.",
      },
      {
        question: "Can security systems be installed wirelessly?",
        answer:
          "Modern systems often use wireless technology, making installation easier and less invasive. However, wired systems may be preferable in some situations for reliability.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&h=600&fit=crop",
  },
  {
    slug: "conservatory-installer",
    name: "Conservatory Installer",
    title: "Professional conservatory installation services near you",
    description:
      "Want to add a conservatory? Find experienced installers who can design and build beautiful conservatories to extend your living space. Quality construction, professional installation.",
    details: [
      {
        sectionTitle: "Conservatory installation services",
        sectionText:
          "Conservatory installers provide design consultations, base preparation, frame installation, glazing, roofing, electrics, heating, and finishing. They handle everything from planning to completion.",
      },
      {
        sectionTitle: "Choosing your conservatory",
        sectionText:
          "Professional installers advise on styles (Victorian, Edwardian, lean-to, etc.), materials (uPVC, aluminum, timber), glazing options, and ensure designs comply with regulations while suiting your property and budget.",
      },
    ],
    faqs: [
      {
        question: "Do I need planning permission for a conservatory?",
        answer:
          "Many conservatories fall under permitted development and don't need planning permission, subject to size and position limits. Building regulations apply to all conservatories. Your installer will advise.",
      },
      {
        question: "How long does conservatory installation take?",
        answer:
          "From base preparation to completion, most conservatories take 4-6 weeks depending on size and complexity. Custom designs or complex sites may take longer.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop",
  },
  {
    slug: "driveways-installer",
    name: "Driveways Installer",
    title: "Professional driveway installation near you",
    description:
      "Need a new driveway? Find experienced installers who can create block paving, tarmac, resin, or gravel driveways. Quality driveways built to last.",
    details: [
      {
        sectionTitle: "Driveway installation services",
        sectionText:
          "Driveway installers provide design, excavation, base preparation, drainage, and installation of block paving, tarmac, resin bound, gravel, or pattern imprinted concrete driveways. They ensure proper construction for longevity.",
      },
      {
        sectionTitle: "Choosing your driveway type",
        sectionText:
          "Different materials suit different properties and budgets. Installers advise on options considering durability, maintenance, appearance, and cost, ensuring your choice suits your needs and adds value.",
      },
    ],
    faqs: [
      {
        question: "How long does a driveway installation take?",
        answer:
          "Most domestic driveways take 3-5 days including excavation and installation, though this varies by size, type, and site conditions. Concrete and tarmac need curing time before use.",
      },
      {
        question: "Do I need planning permission for a driveway?",
        answer:
          "Driveways over 5m² need permeable surfaces or drainage to an approved area. Planning permission may be needed for dropped kerbs or in conservation areas. Your installer will advise.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1588595130265-f2e972d0f0e4?w=800&h=600&fit=crop",
  },
  {
    slug: "flooring-fitter",
    name: "Flooring Fitter",
    title: "Professional flooring installation services near you",
    description:
      "Need new flooring? Find experienced fitters who can install laminate, engineered wood, solid wood, and luxury vinyl flooring professionally. Beautiful floors, expertly fitted.",
    details: [
      {
        sectionTitle: "Flooring installation services",
        sectionText:
          "Flooring fitters install laminate, engineered wood, solid wood, luxury vinyl, and can prepare sub-floors, fit underlay, handle awkward areas, and provide finishing touches like beading and thresholds.",
      },
      {
        sectionTitle: "Professional fitting benefits",
        sectionText:
          "Professional fitters ensure proper sub-floor preparation, correct installation methods, expansion gaps, and seamless finishes. Quality fitting prevents common problems like gaps, squeaks, or lifting.",
      },
    ],
    faqs: [
      {
        question: "How long does flooring installation take?",
        answer:
          "An average room takes 1-2 days including preparation. Whole houses typically take 3-5 days depending on size and flooring type. Some floors need acclimatizing time before fitting.",
      },
      {
        question: "Do I need to remove old flooring?",
        answer:
          "This depends on the existing floor and new flooring type. Sometimes new flooring can go over old, but removal often gives better results. Your fitter will advise.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop",
  },
  {
    slug: "guttering-installer",
    name: "Guttering Installer",
    title: "Professional guttering installation services near you",
    description:
      "Need new guttering? Find experienced installers who can fit uPVC, cast iron, or aluminum guttering systems. Protect your property with quality guttering installation.",
    details: [
      {
        sectionTitle: "Guttering installation services",
        sectionText:
          "Guttering installers provide full system installation, partial replacement, downpipe installation, gutter guards, and work with various materials including uPVC, cast iron, and aluminum in different colors and styles.",
      },
      {
        sectionTitle: "Importance of quality guttering",
        sectionText:
          "Properly installed guttering protects your property from water damage by effectively channeling rainwater away. Quality installation ensures correct falls, secure fixing, and leak-free joints.",
      },
    ],
    faqs: [
      {
        question: "What type of guttering is best?",
        answer:
          "uPVC is popular for being low-maintenance and cost-effective. Cast iron suits period properties. Aluminum offers durability and color options. Your installer will recommend suitable options.",
      },
      {
        question: "How long does guttering installation take?",
        answer:
          "A typical house guttering replacement takes 1-2 days depending on size and access. Partial replacements or repairs can often be completed in a few hours.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
  },
  {
    slug: "vinyl-flooring-fitter",
    name: "Vinyl Flooring Fitter",
    title: "Professional vinyl flooring installation near you",
    description:
      "Want vinyl flooring installed? Find experienced fitters who can install sheet vinyl and luxury vinyl tiles professionally. Durable, waterproof flooring expertly fitted.",
    details: [
      {
        sectionTitle: "Vinyl flooring installation",
        sectionText:
          "Vinyl fitters install sheet vinyl, luxury vinyl tiles (LVT), and vinyl planks. They prepare sub-floors, ensure moisture protection, create seamless installations, and handle pattern matching and difficult areas.",
      },
      {
        sectionTitle: "Benefits of vinyl flooring",
        sectionText:
          "Vinyl is durable, waterproof, easy to maintain, and available in countless designs. Professional fitting ensures flat, smooth installation that looks great and lasts years.",
      },
    ],
    faqs: [
      {
        question: "Is vinyl flooring suitable for bathrooms?",
        answer:
          "Yes, vinyl's waterproof properties make it ideal for bathrooms and kitchens. Professional fitting ensures seams are sealed and edges are properly finished to prevent water ingress.",
      },
      {
        question: "How long does vinyl flooring last?",
        answer:
          "Quality vinyl flooring properly installed can last 10-20 years or more. Luxury vinyl tiles often have lengthy warranties. Regular cleaning and avoiding excessive moisture extends life.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop",
  },
  {
    slug: "fireplace-installer",
    name: "Fireplace installer",
    title: "Professional fireplace installation services near you",
    description:
      "Want a new fireplace installed? Find experienced installers who can fit gas, electric, or solid fuel fireplaces. Transform your room with a beautiful, safely installed fireplace.",
    details: [
      {
        sectionTitle: "Fireplace installation services",
        sectionText:
          "Fireplace installers fit gas fires, electric fires, open fires, and stoves. They handle hearth construction, fireplace surrounds, flue installation, gas connections, and ensure compliance with regulations.",
      },
      {
        sectionTitle: "Safety and compliance",
        sectionText:
          "Fireplace installation must comply with building regulations. Gas work requires Gas Safe registration. Professional installers ensure safe installation, proper ventilation, and provide necessary certificates.",
      },
    ],
    faqs: [
      {
        question: "What type of fireplace should I choose?",
        answer:
          "This depends on your property, existing chimney (if any), usage, and preferences. Gas fires offer convenience, electric fires are easy to install, wood burners provide ambiance. Your installer will advise.",
      },
      {
        question: "Do I need a chimney for a fireplace?",
        answer:
          "Not necessarily. Electric fires don't need chimneys or flues. Gas fires and wood burners need flues, but these can be installed where no chimney exists using balanced flues or twin-wall systems.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop",
  },
  {
    slug: "architectural-technician",
    name: "Architectural Technician",
    title: "Professional architectural technician services near you",
    description:
      "Need technical drawings or building plans? Find experienced architectural technicians who can create detailed plans, handle building regulations, and support your construction project.",
    details: [
      {
        sectionTitle: "Architectural technician services",
        sectionText:
          "Architectural technicians provide technical drawings, building regulations applications, structural calculations, site surveys, CAD drawings, and project support. They bridge design and construction.",
      },
      {
        sectionTitle: "Technical expertise",
        sectionText:
          "Technicians focus on the technical aspects of building design, ensuring designs are buildable, compliant, and practical. They're skilled in regulations, materials, and construction methods.",
      },
    ],
    faqs: [
      {
        question:
          "What's the difference between an architectural technician and architect?",
        answer:
          "Technicians focus on technical detailing and regulations, while architects typically handle overall design concepts. For many residential projects, technicians provide all necessary services at lower cost.",
      },
      {
        question: "Do architectural technicians handle planning applications?",
        answer:
          "Yes, many architectural technicians handle both planning and building regulations applications, providing drawings and documentation needed for approvals.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=600&fit=crop",
  },
  {
    slug: "chimney-repair-specialist",
    name: "Chimney Repair Specialist",
    title: "Expert chimney repair services near you",
    description:
      "Problems with your chimney? Find specialists who can repair leaning chimneys, damaged stacks, flashing issues, and more. Professional chimney repairs to prevent costly damage.",
    details: [
      {
        sectionTitle: "Chimney repair services",
        sectionText:
          "Chimney repair specialists fix leaning chimneys, rebuild chimney stacks, repair or replace flashing, repoint brickwork, install chimney pots and cowls, repair liners, and address structural issues.",
      },
      {
        sectionTitle: "Importance of timely repairs",
        sectionText:
          "Chimney problems worsen over time and can cause serious damage or safety issues. Professional repairs restore structural integrity, prevent leaks, and ensure safe operation of fires and boilers.",
      },
    ],
    faqs: [
      {
        question: "How do I know if my chimney needs repairs?",
        answer:
          "Signs include leaning, damaged bricks or pointing, water stains, loose pots, cracked flashing, or debris falling into fireplaces. Regular inspections catch problems early.",
      },
      {
        question: "Can chimneys be repaired or do they need rebuilding?",
        answer:
          "Many chimney problems can be repaired cost-effectively. Specialists assess damage and recommend appropriate solutions, which might range from repointing to partial or full rebuilding.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop",
  },
  {
    slug: "garden-maintenance-company",
    name: "Garden Maintenance Company",
    title: "Professional garden maintenance services near you",
    description:
      "Keep your garden in top condition year-round with professional maintenance services. Find companies offering regular garden care, seasonal maintenance, and landscaping upkeep.",
    details: [
      {
        sectionTitle: "Garden maintenance services",
        sectionText:
          "Garden maintenance companies provide regular lawn care, hedge trimming, border maintenance, seasonal planting, pruning, weeding, leaf clearance, and can handle all aspects of garden upkeep.",
      },
      {
        sectionTitle: "Benefits of professional maintenance",
        sectionText:
          "Regular professional care keeps gardens healthy and attractive, prevents problems, saves your time, and maintains property value. Experts bring knowledge of seasonal needs and plant care.",
      },
    ],
    faqs: [
      {
        question: "How often should gardens be professionally maintained?",
        answer:
          "This depends on garden size and style. Most benefit from monthly visits, though growing season may need fortnightly care. Some clients prefer weekly lawn mowing services.",
      },
      {
        question: "Do maintenance companies provide equipment?",
        answer:
          "Yes, professional garden maintenance companies bring all necessary equipment and tools, from mowers and trimmers to specialist machinery.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800&h=600&fit=crop",
  },
  {
    slug: "loft-conversion-company",
    name: "Loft Conversion Company",
    title: "Professional loft conversion services near you",
    description:
      "Want to convert your loft? Find experienced companies who can transform your loft space into usable rooms. Add valuable space and increase your property value.",
    details: [
      {
        sectionTitle: "Loft conversion services",
        sectionText:
          "Loft conversion companies handle design, planning applications, structural work, roofing, insulation, electrics, plumbing, plastering, and finishing. They manage your entire conversion from concept to completion.",
      },
      {
        sectionTitle: "Types of loft conversions",
        sectionText:
          "Companies can create various conversion types including Velux/roof light, dormer, hip to gable, and mansard conversions. They advise on which suits your property and budget best.",
      },
    ],
    faqs: [
      {
        question: "Do I need planning permission for a loft conversion?",
        answer:
          "Many loft conversions fall under permitted development rights, though some require planning permission. Building regulations approval is always required. Your conversion company will advise.",
      },
      {
        question: "How long does a loft conversion take?",
        answer:
          "Most loft conversions take 6-8 weeks once started, though complex conversions may take longer. This excludes planning or building regulations approval time.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&h=600&fit=crop",
  },
  {
    slug: "damp-proofer",
    name: "Damp Proofer",
    title: "Professional damp proofing services near you",
    description:
      "Damp problems in your property? Find specialists who can diagnose and treat rising damp, penetrating damp, and condensation issues. Protect your property from moisture damage.",
    details: [
      {
        sectionTitle: "Damp proofing services",
        sectionText:
          "Damp proofing specialists provide surveys, diagnose damp causes, install damp proof courses, tanking, condensation solutions, mold treatment, and remedial work including replastering and timber treatment.",
      },
      {
        sectionTitle: "Types of damp",
        sectionText:
          "Specialists identify whether you have rising damp, penetrating damp, or condensation, as each requires different treatments. Proper diagnosis ensures effective, lasting solutions.",
      },
    ],
    faqs: [
      {
        question: "How do I know what type of damp I have?",
        answer:
          "Professional damp surveyors use moisture meters and knowledge of symptoms to diagnose damp type. They identify causes and recommend appropriate treatments with guarantees.",
      },
      {
        question: "Are damp proofing treatments guaranteed?",
        answer:
          "Reputable specialists provide long-term guarantees (often 20-30 years) on their work, giving you peace of mind that damp problems are permanently resolved.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop",
  },
  {
    slug: "conversion-specialist",
    name: "Conversion Specialist",
    title: "Professional property conversion services near you",
    description:
      "Want to convert part of your property? Find specialists who handle all types of conversions including garage, basement, and outbuilding conversions. Add valuable living space.",
    details: [
      {
        sectionTitle: "Property conversion services",
        sectionText:
          "Conversion specialists handle garage conversions, basement conversions, outbuilding conversions, barn conversions, and office conversions. They manage all aspects from design to completion including planning and regulations.",
      },
      {
        sectionTitle: "Maximizing your property",
        sectionText:
          "Conversions add valuable living space more cost-effectively than moving or building extensions. Specialists ensure conversions are practical, compliant, and enhance your property value.",
      },
    ],
    faqs: [
      {
        question: "Do conversions need planning permission?",
        answer:
          "This varies by conversion type. Many fall under permitted development, though some need planning permission. Building regulations approval is typically required. Your specialist will advise.",
      },
      {
        question: "How much does a conversion cost compared to an extension?",
        answer:
          "Conversions are often more cost-effective per square meter than extensions since the structure exists. Costs vary greatly depending on conversion type and finishes required.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=600&fit=crop",
  },
  {
    slug: "garage-conversion-specialist",
    name: "Garage Conversion Specialist",
    title: "Professional garage conversion services near you",
    description:
      "Convert your garage into usable living space? Find experienced specialists who can transform your garage into an extra bedroom, office, or living area. Quality conversions, professionally completed.",
    details: [
      {
        sectionTitle: "Garage conversion services",
        sectionText:
          "Garage conversion specialists handle design, building regulations, foundations, damp proofing, insulation, electrics, plumbing, plastering, flooring, and can create any room type from the existing garage structure.",
      },
      {
        sectionTitle: "Benefits of garage conversion",
        sectionText:
          "Converting a garage is often the most cost-effective way to add living space. It's usually quicker and cheaper than building an extension while adding similar value to your property.",
      },
    ],
    faqs: [
      {
        question: "Do I need planning permission to convert my garage?",
        answer:
          "Most garage conversions are permitted development and don't need planning permission, though building regulations approval is required. Restrictions apply in conservation areas and listed buildings.",
      },
      {
        question: "How long does a garage conversion take?",
        answer:
          "Most garage conversions take 4-6 weeks depending on what room type you're creating and the extent of work needed. This includes all building work and finishing.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&h=600&fit=crop",
  },
  {
    slug: "new-home-builder",
    name: "New Home Builder",
    title: "Professional new build home construction services",
    description:
      "Building a new home? Find experienced builders who can manage your entire self-build project from groundworks to completion. Make your dream home a reality.",
    details: [
      {
        sectionTitle: "New home building services",
        sectionText:
          "New home builders provide project management, groundworks, foundations, structure, roofing, first and second fix, and can coordinate all trades. They turn architectural plans into finished homes.",
      },
      {
        sectionTitle: "Self-build project management",
        sectionText:
          "Building a new home is complex. Experienced builders project manage the entire build, coordinate trades, ensure quality workmanship, manage costs, and navigate regulations and inspections.",
      },
    ],
    faqs: [
      {
        question: "How long does it take to build a house?",
        answer:
          "A typical self-build house takes 10-16 months from breaking ground to completion, though this varies greatly depending on size, complexity, and whether project management is full-time or part-time.",
      },
      {
        question: "What does a new home builder actually do?",
        answer:
          "Builders either do the work themselves or project manage specialist subcontractors. They ensure work follows plans and regulations, manage timelines and budgets, and coordinate inspections.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=600&fit=crop",
  },
  {
    slug: "repointing-specialist",
    name: "Repointing Specialist",
    title: "Professional brick repointing services near you",
    description:
      "Deteriorating mortar joints? Find repointing specialists who can restore your brickwork with expert repointing. Protect your property and restore its appearance.",
    details: [
      {
        sectionTitle: "Repointing services",
        sectionText:
          "Repointing specialists remove old mortar and repoint brickwork using appropriate mortar mixes. They work on houses, garden walls, chimneys, and can match existing mortar colors and styles.",
      },
      {
        sectionTitle: "Importance of repointing",
        sectionText:
          "Deteriorated mortar allows water ingress, causing damp and structural damage. Professional repointing using correct techniques and materials protects brickwork and extends building life.",
      },
    ],
    faqs: [
      {
        question: "How often does repointing need doing?",
        answer:
          "This varies by exposure and original mortar quality, but typically brickwork needs repointing every 50-100 years. Exposed walls may need more frequent attention.",
      },
      {
        question: "What mortar should be used for repointing?",
        answer:
          "The mortar must be softer than the bricks to allow moisture movement. Specialists select appropriate mixes, particularly important for older buildings where lime mortar may be needed.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1590237294019-ca0dea0e1265?w=800&h=600&fit=crop",
  },
  {
    slug: "fascias-soffits-installer",
    name: "Fascias & Soffits Installer",
    title: "Professional fascias and soffits installation near you",
    description:
      "Need fascias and soffits replaced? Find experienced installers who can fit uPVC, aluminum, or timber fascias and soffits. Protect your roofline and enhance your property's appearance.",
    details: [
      {
        sectionTitle: "Fascias and soffits installation",
        sectionText:
          "Installers provide removal of old fascias and soffits, installation of new boards in various materials and colors, ventilation installation, and can include guttering replacement for complete roofline renovation.",
      },
      {
        sectionTitle: "Protecting your roofline",
        sectionText:
          "Fascias and soffits protect roof timbers from weather damage. Modern uPVC options are maintenance-free and long-lasting, while timber options suit traditional properties.",
      },
    ],
    faqs: [
      {
        question: "How long do uPVC fascias and soffits last?",
        answer:
          "Quality uPVC fascias and soffits typically last 20-30 years and are virtually maintenance-free, making them cost-effective compared to timber which needs regular painting.",
      },
      {
        question: "Can fascias and soffits be installed over existing ones?",
        answer:
          "Sometimes existing timber can be capped with uPVC if it's in good condition, though full replacement often gives better results and allows inspection of roof timbers.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1632778841148-afb6bffdee87?w=800&h=600&fit=crop",
  },
  {
    slug: "tarmac-driveway-company",
    name: "Tarmac Driveway Company",
    title: "Professional tarmac driveway installation near you",
    description:
      "Want a tarmac driveway? Find experienced companies who can install durable, attractive tarmac driveways. Quality installation for long-lasting results.",
    details: [
      {
        sectionTitle: "Tarmac driveway installation",
        sectionText:
          "Tarmac driveway companies provide excavation, sub-base preparation, edging, tarmac installation, line marking, and can create plain or decorative finishes. They ensure proper construction for longevity.",
      },
      {
        sectionTitle: "Benefits of tarmac driveways",
        sectionText:
          "Tarmac is cost-effective, quick to install, durable, and low-maintenance. It provides a smooth, hard-wearing surface suitable for all vehicles and weather conditions.",
      },
    ],
    faqs: [
      {
        question: "How long does a tarmac driveway last?",
        answer:
          "A properly installed tarmac driveway typically lasts 15-20 years or more with minimal maintenance. Regular sealing can extend its life further.",
      },
      {
        question: "How long before I can use a new tarmac driveway?",
        answer:
          "You can usually use a tarmac driveway within 24 hours of installation, though avoiding heavy loads for a few days is recommended. It reaches full strength after several weeks.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1588595130265-f2e972d0f0e4?w=800&h=600&fit=crop",
  },
  {
    slug: "building-restoration-refurbishment-company",
    name: "Building Restoration & Refurbishment Company",
    title: "Professional building restoration and refurbishment services",
    description:
      "Restoring a period property or refurbishing a building? Find specialists who understand traditional building methods and materials. Expert restoration for lasting results.",
    details: [
      {
        sectionTitle: "Restoration and refurbishment services",
        sectionText:
          "Specialists provide sympathetic restoration of period properties, structural repairs, lime mortar work, traditional plastering, timber repairs, damp treatment, and complete refurbishment managing all trades.",
      },
      {
        sectionTitle: "Specialist knowledge",
        sectionText:
          "Period property restoration requires understanding of traditional materials and methods. Specialists ensure work is sympathetic to the building while meeting modern standards for comfort and efficiency.",
      },
    ],
    faqs: [
      {
        question: "Why can't modern materials be used in old buildings?",
        answer:
          "Traditional buildings need to 'breathe'. Modern impermeable materials can trap moisture causing damage. Specialists use appropriate materials like lime mortar that allow moisture movement.",
      },
      {
        question: "Do restoration projects need special permissions?",
        answer:
          "Listed buildings require listed building consent for most alterations. Properties in conservation areas have restrictions. Specialists understand requirements and handle applications.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop",
  },
];
