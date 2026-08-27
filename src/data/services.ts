// ─── Service Detail Content ──────────────────────────────────────────────────
// Single source of truth for the nine "What We Do" categories. The homepage
// grid renders the card fields; /services/$slug renders the full detail page.
// Keep `slug` values stable — they are public URLs.

export type ServiceCapability = { title: string; body: string }
export type ServiceStep = { label: string; title: string; body: string }
export type ServiceFaq = { q: string; a: string }

export type ServiceDetail = {
  slug: string
  number: string
  /** Card + page heading */
  title: string
  /** Homepage card copy */
  cardBody: string
  metaTitle: string
  metaDescription: string
  /** schema.org Service.serviceType */
  serviceType: string
  /** Page hero headline, split so the second half can take the accent color */
  headline: string
  headlineAccent: string
  lede: string
  /** Opening body paragraphs */
  overview: string[]
  capabilities: ServiceCapability[]
  process: ServiceStep[]
  deliverables: string[]
  /** "This is for you if…" checklist */
  signals: string[]
  faqs: ServiceFaq[]
  /** Slugs of two related services */
  related: string[]
  /** Slugs of the four most closely related Insights articles */
  relatedArticles: string[]
}

export const SERVICES: ServiceDetail[] = [
  // ── 01 ─────────────────────────────────────────────────────────────────────
  {
    slug: 'restaurant-consulting',
    number: '01',
    title: 'Restaurant Consulting',
    cardBody:
      'From concept to grand opening and beyond — operational systems, menu engineering, staff structure, and profitability modeling tailored to your concept and market.',
    metaTitle: 'Restaurant Consulting — Step It Up Strategies',
    metaDescription:
      'Restaurant consulting from concept through grand opening and beyond: operating systems, labor models, menu engineering, prime cost control, and turnaround work led by former owner-operators.',
    serviceType: 'Restaurant Consulting',
    headline: 'Restaurants that run on',
    headlineAccent: 'systems, not heroics',
    lede:
      'We have opened them, run them, and owned them. Every recommendation we make has already survived a Friday night rush.',
    overview: [
      'Most restaurants do not fail because the food is bad. They fail because the systems underneath the food never got built — no costed recipes, no labor model, no daily numbers, no accountability routine. The operator ends up working eighty hours a week as the system.',
      'We build the operating layer that lets the concept stand on its own. That means costed menus, position-by-position staffing guides, opening and closing standards, inventory discipline, and a weekly business review where the numbers are actually read. Then we work the floor and the office alongside your team until the routine holds without us.',
    ],
    capabilities: [
      {
        title: 'Concept & Positioning',
        body: 'Define the concept, price point, daypart mix, and the guest it is built for — then pressure-test it against the trade area before capital is committed.',
      },
      {
        title: 'Pre-Opening Project Management',
        body: 'A critical-path timeline covering build-out, permitting, hiring, training, vendor onboarding, POS build, and the soft-open sequence that protects your opening reputation.',
      },
      {
        title: 'Operating Systems & SOPs',
        body: 'Prep lists, line checks, opening and closing checklists, cash handling, inventory counts, and the daily manager routine that keeps all of it from decaying in month three.',
      },
      {
        title: 'Labor Model & Org Chart',
        body: 'Staffing guides built off forecasted covers rather than habit, with wage bands, scheduling rules, overtime controls, and a clear chain of accountability.',
      },
      {
        title: 'Menu Engineering & Profitability Modeling',
        body: 'Recipe costing, contribution-margin analysis, and pricing strategy tied to a P&L that reconciles — so menu decisions are made on math, not preference.',
      },
      {
        title: 'Prime Cost & Vendor Control',
        body: 'Food and labor tracked as one number, weekly. Vendor bids, order guides, par levels, waste tracking, and invoice auditing to stop the leaks nobody is watching.',
      },
      {
        title: 'Management Development',
        body: 'Hiring profiles, training paths, and manager development so the operation is not dependent on one person knowing everything.',
      },
      {
        title: 'Turnaround & Performance Recovery',
        body: 'A rapid diagnostic on an underperforming unit — prime cost, throughput, staffing, menu, and service — followed by a prioritized ninety-day recovery plan.',
      },
    ],
    process: [
      {
        label: '01',
        title: 'On-Site Discovery',
        body: 'We work your shifts, read your P&L and invoices, walk the kitchen, and talk to the team. No conclusions from a spreadsheet alone.',
      },
      {
        label: '02',
        title: 'Findings & Priorities',
        body: 'A written diagnostic that ranks issues by dollar impact and effort, so you know what to fix first and what can wait.',
      },
      {
        label: '03',
        title: 'Build & Implement',
        body: 'We install the systems with your managers — costed recipes, schedules, checklists, order guides — and train on them in live service.',
      },
      {
        label: '04',
        title: 'Measure & Hand Off',
        body: 'Weekly reviews against the numbers until the routine belongs to your team. We leave documentation, not dependency.',
      },
    ],
    deliverables: [
      'Written operational diagnostic with prioritized action plan',
      'Costed recipe book and engineered menu with target margins',
      'Labor model, org chart, and position-level staffing guides',
      'SOP library: line checks, prep lists, open/close, cash handling',
      'Weekly prime cost and P&L reporting package',
      'Manager training path and accountability meeting cadence',
    ],
    signals: [
      'Sales are fine but nothing is left at the bottom of the P&L',
      'You are the only person who knows how the place actually works',
      'You are opening a new concept and the timeline is slipping',
      'Food or labor cost moves every week and nobody can explain why',
    ],
    faqs: [
      {
        q: 'Do you work with single locations or only groups?',
        a: 'Both. A single owner-operated restaurant and a multi-unit group get the same discipline — the scope and cadence differ, not the standards.',
      },
      {
        q: 'Will you actually work in the restaurant?',
        a: 'Yes. We are on the floor and in the office during service. Systems that are written but never run in real conditions do not survive.',
      },
      {
        q: 'How long does an engagement run?',
        a: 'A focused diagnostic can be a few weeks. A full pre-opening or turnaround engagement typically runs several months so the systems are proven before we step back.',
      },
    ],
    related: ['menu-creation-food-cost-analysis', 'business-accounting'],
    relatedArticles: [
      'what-does-a-restaurant-consultant-do',
      'restaurant-concept-development-consultant',
      'restaurant-turnaround-consulting-that-works',
      'what-restaurant-advisory-services-actually-fix',
    ],
  },

  // ── 02 ─────────────────────────────────────────────────────────────────────
  {
    slug: 'retail-strategy',
    number: '02',
    title: 'Retail Strategy',
    cardBody:
      'Merchandise planning, floor layout optimization, vendor relationships, shrinkage control, and customer experience design for retail environments.',
    metaTitle: 'Retail Strategy Consulting — Step It Up Strategies',
    metaDescription:
      'Retail strategy consulting covering merchandise planning, floor layout and adjacency, inventory turns, shrinkage control, vendor terms, and staff selling standards.',
    serviceType: 'Retail Strategy Consulting',
    headline: 'Every square foot should',
    headlineAccent: 'earn its keep',
    lede:
      'Retail rewards operators who know their turns, their margin by category, and exactly where a customer stops walking.',
    overview: [
      'Retail problems usually look like a sales problem and are actually an inventory problem. Capital is tied up in slow categories, fast movers go out of stock, markdowns quietly eat the margin, and the floor plan sends customers straight past the highest-margin fixture.',
      'We work the merchandise math and the physical floor together — open-to-buy planning, category margin and turn analysis, adjacency and sightline decisions, shrink controls, and selling standards for the staff. The goal is simple: more margin dollars per square foot, with less cash trapped in the back room.',
    ],
    capabilities: [
      {
        title: 'Merchandise & Assortment Planning',
        body: 'Category roles, breadth versus depth, open-to-buy discipline, and a seasonal calendar that stops impulse ordering from setting your inventory position.',
      },
      {
        title: 'Floor Layout & Adjacency',
        body: 'Decompression zone, primary path, sightlines, fixture hierarchy, and end-cap strategy — placing high-margin product where traffic and attention actually land.',
      },
      {
        title: 'Inventory Turns & Markdown Cadence',
        body: 'Turn targets by category, aging reports, disciplined markdown timing, and exit plans for dead stock so cash comes back off the shelf.',
      },
      {
        title: 'Vendor Terms & Sourcing',
        body: 'Vendor consolidation, cost and freight negotiation, payment terms, returns and damage allowances, and exclusivity where it creates a moat.',
      },
      {
        title: 'Shrinkage & Loss Prevention',
        body: 'Cycle counts, receiving verification, register and void audits, refund controls, and the accountability structure that makes shrink visible instead of theoretical.',
      },
      {
        title: 'Customer Experience & Selling Standards',
        body: 'Greeting and approach standards, attachment and add-on selling, checkout flow, loyalty capture, and staff training that lifts basket size without pressure tactics.',
      },
    ],
    process: [
      {
        label: '01',
        title: 'Store Walk & Data Pull',
        body: 'We walk the floor as a customer and as an operator, then pull sales by category, on-hand inventory, aging, and shrink history.',
      },
      {
        label: '02',
        title: 'Margin & Traffic Analysis',
        body: 'Where the margin lives, where the cash is stuck, and where the traffic pattern is working against the assortment.',
      },
      {
        label: '03',
        title: 'Reset & Rebuild',
        body: 'Floor reset, assortment plan, par and reorder points, vendor renegotiation, and staff training on the new standards.',
      },
      {
        label: '04',
        title: 'Track & Adjust',
        body: 'Turn, margin, and shrink reviewed on a set cadence, with adjustments as the season and traffic change.',
      },
    ],
    deliverables: [
      'Category margin, turn, and aging analysis',
      'Assortment plan with open-to-buy framework',
      'Annotated floor plan and fixture placement guide',
      'Receiving, cycle count, and shrink control procedures',
      'Vendor terms summary with negotiation targets',
      'Selling standards and staff training materials',
    ],
    signals: [
      'The back room is full but the shelves have holes',
      'Markdowns are the only tool moving product',
      'Shrink is a number you find out about once a year',
      'Traffic is steady and average basket size is not moving',
    ],
    faqs: [
      {
        q: 'Do you handle physical floor resets?',
        a: 'We plan them and we are there for them. The plan includes fixture placement, adjacency, and signage, and we work the reset with your team.',
      },
      {
        q: 'What if our POS reporting is weak?',
        a: 'That is common. We work with what the system gives us and build the missing reports — often the first deliverable is simply making category performance visible.',
      },
      {
        q: 'Can you help with a retail component inside a restaurant or venue?',
        a: 'Yes. Retail attachments to hospitality concepts are a strong margin lever and we treat them as a real category rather than an afterthought.',
      },
    ],
    related: ['business-accounting', 'website-design'],
    relatedArticles: [
      'retail-visual-merchandising-strategy',
      'retail-floor-plan-optimization-that-sells',
      'how-to-improve-retail-store-margins',
      'how-to-scale-retail-operations',
    ],
  },

  // ── 03 ─────────────────────────────────────────────────────────────────────
  {
    slug: 'entertainment-venues',
    number: '03',
    title: 'Entertainment Venues',
    cardBody:
      'Multi-revenue-stream operations including bar programs, event logistics, staffing frameworks, and the financial controls that keep entertainment businesses healthy.',
    metaTitle: 'Entertainment Venue Consulting — Step It Up Strategies',
    metaDescription:
      'Entertainment venue consulting for multi-revenue operations: bar programs, event and private booking logistics, flexible staffing models, crowd flow, security, and cash controls.',
    serviceType: 'Entertainment Venue Consulting',
    headline: 'Complex venues,',
    headlineAccent: 'controlled operations',
    lede:
      'Bar, kitchen, events, admissions, and attractions all running at once — each with its own margin and its own way of leaking money.',
    overview: [
      'Entertainment venues carry more moving parts than any restaurant. Revenue comes from bar, food, admissions, private events, attractions, and merchandise, and each stream has a different cost structure and a different failure mode. Volume arrives in violent peaks, staffing has to flex with an event calendar, and cash exposure is high.',
      'We build the operating and control structure that lets a venue run hard nights without losing the numbers — bar programs with real pour cost control, event packages priced to margin, a flexible labor model tied to the calendar, crowd flow and security standards, and reporting that separates each revenue stream instead of blending them into one unreadable total.',
    ],
    capabilities: [
      {
        title: 'Revenue Stream Architecture',
        body: 'Bar, food, admissions, events, attractions, and merchandise modeled separately — with margin targets and reporting that keeps them from hiding behind each other.',
      },
      {
        title: 'Bar Program & Pour Cost Control',
        body: 'Menu design for speed, standardized specs, jiggered pours, inventory and variance reporting, and the discipline that keeps liquor cost inside a few points of target.',
      },
      {
        title: 'Event & Private Booking Operations',
        body: 'Package design and pricing, BEO process, deposit and cancellation terms, staffing formulas per guest count, and a run-of-show that survives real events.',
      },
      {
        title: 'Flexible Staffing Frameworks',
        body: 'Core-plus-flex scheduling built off the event calendar, cross-training, call-in tiers, and overtime controls for a business with no average week.',
      },
      {
        title: 'Crowd Flow, Security & Compliance',
        body: 'Entry and ID protocol, occupancy management, queue and throughput design, incident documentation, and responsible-service training standards.',
      },
      {
        title: 'Cash Handling & Financial Controls',
        body: 'Bank and drawer procedures, comp and void authority, ticket reconciliation, register audits, and segregation of duties in a high-cash environment.',
      },
    ],
    process: [
      {
        label: '01',
        title: 'Peak-Night Observation',
        body: 'We work a busy night and an event. Throughput, bottlenecks, service times, and control gaps are only visible under load.',
      },
      {
        label: '02',
        title: 'Stream-by-Stream Diagnostic',
        body: 'Each revenue line broken out with its own cost structure, so it is clear which one is subsidizing the others.',
      },
      {
        label: '03',
        title: 'Install Systems & Controls',
        body: 'Bar specs and inventory, event packages and BEO flow, staffing formulas, cash procedures, and manager training.',
      },
      {
        label: '04',
        title: 'Review Against the Calendar',
        body: 'Post-event debriefs and weekly variance review, tuning staffing and pricing as the calendar and crowd mix evolve.',
      },
    ],
    deliverables: [
      'Revenue stream model with margin targets by line',
      'Bar menu, drink specs, and pour cost variance reporting',
      'Event package pricing, BEO template, and staffing formulas',
      'Flex scheduling framework tied to the event calendar',
      'Cash handling, comp, and void control procedures',
      'Crowd flow, entry, and incident documentation standards',
    ],
    signals: [
      'Big nights feel great and the month still comes in flat',
      'Liquor cost swings and inventory counts never tie out',
      'Private events are sold on instinct rather than costed packages',
      'Staffing is either overstaffed or underwater, rarely right',
    ],
    faqs: [
      {
        q: 'What kinds of venues do you work with?',
        a: 'Bars and nightlife, live music and event spaces, family entertainment, and hybrid concepts that combine attractions with food and beverage.',
      },
      {
        q: 'Can you help with liquor licensing and entertainment permits?',
        a: 'Yes — that is handled under permitting and licensing, and the two engagements are usually run together for a new venue.',
      },
      {
        q: 'Do you train staff directly?',
        a: 'Yes. Bar training, service standards, and responsible-service protocol are delivered to the team, not handed over as a binder.',
      },
    ],
    related: ['beverage-programs-bar-design', 'permitting-licensing'],
    relatedArticles: [
      'what-nightclub-operations-consulting-fixes',
      'event-venue-operations-plan',
      'how-to-fix-venue-bottlenecks',
      'what-licenses-does-a-nightclub-need',
    ],
  },

  // ── 04 ─────────────────────────────────────────────────────────────────────
  {
    slug: 'menu-creation-food-cost-analysis',
    number: '04',
    title: 'Menu Creation & Food Cost Analysis',
    cardBody:
      'Recipe development, costing, and menu engineering for profit maximization. We analyze every line item so your kitchen runs with precision — and profitability.',
    metaTitle: 'Menu Creation & Food Cost Analysis — Step It Up Strategies',
    metaDescription:
      'Menu development and food cost analysis: recipe creation, plate costing to the gram, menu engineering, pricing strategy, yield testing, and waste and variance control.',
    serviceType: 'Food Service Consulting',
    headline: 'A menu is a',
    headlineAccent: 'financial document',
    lede:
      'It should read like a great one and cost out like a spreadsheet. We build both sides at the same time.',
    overview: [
      'A menu decides your food cost, your labor load, your ticket times, your equipment needs, and your check average — usually before anyone tastes a thing. Written without costing, it locks in margin problems that no amount of volume fixes.',
      'We develop recipes and cost them to the gram, run yield tests on the items that matter, and engineer the layout so the high-margin, high-popularity items get the attention they deserve. Then we install the counting and variance discipline that keeps theoretical cost and actual cost from drifting apart.',
    ],
    capabilities: [
      {
        title: 'Recipe Development & Standardization',
        body: 'New items and rebuilt classics, documented with exact quantities, batch yields, plating specs, and photos so execution is identical on every shift.',
      },
      {
        title: 'Plate Costing & Yield Testing',
        body: 'Every component costed at delivered price, with trim and cooking-loss yield tests so the number reflects the kitchen rather than the invoice.',
      },
      {
        title: 'Menu Engineering',
        body: 'Items mapped by contribution margin and popularity, then repositioned, repriced, reworked, or removed — with layout and description work to steer the mix.',
      },
      {
        title: 'Pricing Strategy',
        body: 'Pricing set against target margin, local competitive position, and price psychology, with modeled outcomes before anything goes to print.',
      },
      {
        title: 'Cross-Utilization & Waste Reduction',
        body: 'Shared prep across dishes to cut waste and SKU count, plus prep par levels, batch sizing, and trim usage plans.',
      },
      {
        title: 'Variance & Theoretical vs. Actual',
        body: 'Weekly food cost reporting that compares what the recipes say you should have used to what actually left the walk-in — and names the gap.',
      },
      {
        title: 'Kitchen Training & Rollout',
        body: 'Line training, tasting panels, prep sheets, and a staged rollout so a new menu launches clean instead of blowing up ticket times.',
      },
    ],
    process: [
      {
        label: '01',
        title: 'Audit the Current Menu',
        body: 'Sales mix, item-level margin, invoices, prep methods, and equipment capacity. We find out what is actually making money.',
      },
      {
        label: '02',
        title: 'Develop & Cost',
        body: 'Recipe development and tastings run in parallel with costing and yield tests, so nothing gets loved before it gets priced.',
      },
      {
        label: '03',
        title: 'Engineer & Price',
        body: 'Final item selection, menu layout, descriptions, and pricing modeled against target food cost and check average.',
      },
      {
        label: '04',
        title: 'Roll Out & Control',
        body: 'Line training, prep sheets, par levels, and the weekly variance report that holds the new cost structure in place.',
      },
    ],
    deliverables: [
      'Costed recipe book with plating specs and batch yields',
      'Item-level contribution margin and sales mix analysis',
      'Engineered menu layout with print-ready copy',
      'Pricing model with target food cost by category',
      'Prep sheets, par levels, and waste tracking forms',
      'Weekly theoretical vs. actual food cost report',
    ],
    signals: [
      'Food cost is a surprise at the end of every month',
      'The menu has grown item by item and nobody has costed it',
      'Best sellers may or may not be your worst margins',
      'Prep is inconsistent because recipes live in someone’s head',
    ],
    faqs: [
      {
        q: 'Can you write a full menu from scratch?',
        a: 'Yes — concept-driven development from first draft through costing, tasting, print-ready layout, and line training.',
      },
      {
        q: 'What food cost should we be targeting?',
        a: 'It depends on the concept, service model, and price point. We set the target off your actual P&L structure rather than a rule of thumb.',
      },
      {
        q: 'Do you cost beverage as well?',
        a: 'Yes. Beverage costing and program design is covered under beverage programs and bar layout design, and the two are usually run together.',
      },
    ],
    related: ['beverage-programs-bar-design', 'kitchen-layout-design'],
    relatedArticles: [
      'menu-engineering-vs-menu-design',
      'how-to-design-a-profitable-menu',
      'how-to-price-menu-items-for-profit',
      'how-to-reduce-food-cost-without-cutting-quality',
    ],
  },

  // ── 05 ─────────────────────────────────────────────────────────────────────
  {
    slug: 'beverage-programs-bar-design',
    number: '05',
    title: 'Beverage Programs & Bar Layout Design',
    cardBody:
      'Certified sommeliers and spirit experts design your wine list, cocktail program, and spirits selection from scratch. We also consult on bar layout for optimal speed-of-service and revenue per square foot.',
    metaTitle: 'Beverage Programs & Bar Layout Design — Step It Up Strategies',
    metaDescription:
      'Certified sommeliers and spirits experts build wine lists, cocktail programs, and spirits selections from scratch, plus bar layout design for speed of service and revenue per square foot.',
    serviceType: 'Beverage Consulting',
    headline: 'Beverage is your',
    headlineAccent: 'highest-margin seat',
    lede:
      'Certified sommeliers and spirits specialists design the list. Working operators design the bar it has to be poured from.',
    overview: [
      'Beverage carries the best margin in the building and it is the most commonly mismanaged. Lists get built from vendor incentives instead of guest demand, cocktails are specced without costing, storage and well placement force bartenders to walk, and pour cost drifts a few points a month until nobody remembers what the target was.',
      'Our sommelier and spirits credentials shape the program: a wine list with a real point of view and a workable price ladder, a cocktail menu that is both distinctive and executable at volume, and a spirits selection matched to the concept. Our operating experience shapes the bar itself — station layout, well design, glassware and ice placement, and the physical decisions that determine drinks per hour.',
    ],
    capabilities: [
      {
        title: 'Wine List Development',
        body: 'Built from scratch by certified sommeliers: price ladder, by-the-glass strategy, regional balance, pairing logic, cellar depth, and reserve positioning.',
      },
      {
        title: 'Cocktail Program Design',
        body: 'Signature and classic specs designed for a real bar — batching where it helps, garnish discipline, glassware standards, and costed to the quarter ounce.',
      },
      {
        title: 'Spirits & Beer Selection',
        body: 'Well, call, and premium tiers set deliberately, with craft and local representation, backbar hierarchy, and rotating draft strategy.',
      },
      {
        title: 'Bar Layout & Station Design',
        body: 'Well placement, speed rails, ice and glassware positioning, sink and drain layout, and station zoning designed around bartender steps per drink.',
      },
      {
        title: 'Pour Cost & Inventory Control',
        body: 'Cost targets by category, weekly counts, variance reporting, jigger and free-pour standards, and waste and spill accountability.',
      },
      {
        title: 'Vendor & Distributor Strategy',
        body: 'Distributor relationships, pricing and allowance negotiation, allocation access, and program support without letting incentives write your list.',
      },
      {
        title: 'Bar Team Training & Certification Prep',
        body: 'Service standards, tasting and product education, sequence of service, upsell language, and responsible-service protocol for the whole team.',
      },
    ],
    process: [
      {
        label: '01',
        title: 'Concept & Guest Fit',
        body: 'Who is drinking here, at what price, and in what volume. The program follows the guest and the concept, not our preferences.',
      },
      {
        label: '02',
        title: 'Build the Program',
        body: 'List and cocktail development with tastings, costing on every spec, and a menu structure designed to steer the mix.',
      },
      {
        label: '03',
        title: 'Design the Bar',
        body: 'Station layout and equipment placement reviewed against the drink list, tested against peak-volume assumptions before anything is built.',
      },
      {
        label: '04',
        title: 'Train & Control',
        body: 'Bartender training, service standards, inventory counts, and pour cost variance reporting on a weekly cadence.',
      },
    ],
    deliverables: [
      'Print-ready wine list with by-the-glass and cellar strategy',
      'Costed cocktail specs with batching and garnish standards',
      'Spirits, beer, and backbar tier plan',
      'Annotated bar layout and station design recommendations',
      'Pour cost targets, count sheets, and variance reporting',
      'Bar team training materials and service standards',
    ],
    signals: [
      'Pour cost is high and inventory counts never explain it',
      'The wine list came from a distributor, not a strategy',
      'Bartenders are walking too far to make a standard drink',
      'Cocktails are popular and you do not know what they cost',
    ],
    faqs: [
      {
        q: 'Are your sommeliers actually certified?',
        a: 'Yes. Formal sommelier certification and advanced spirits expertise, applied to program design, cellar management, and staff education.',
      },
      {
        q: 'Can you consult on a bar that is already built?',
        a: 'Yes. We recommend the changes worth making in place, and separate the cheap fixes from the ones that need construction.',
      },
      {
        q: 'Do you help with the liquor license?',
        a: 'Yes — licensing is handled under permitting and licensing, and for new bars the two run in parallel.',
      },
    ],
    related: ['entertainment-venues', 'permitting-licensing'],
    relatedArticles: [
      'how-to-build-beverage-program',
      'bar-menu-consulting-services-that-sell',
      'what-a-bar-layout-design-consultant-fixes',
      'best-bar-beverage-menu-ideas-for-bar-profit',
    ],
  },

  // ── 06 ─────────────────────────────────────────────────────────────────────
  {
    slug: 'kitchen-layout-design',
    number: '06',
    title: 'Kitchen Layout & Design Consulting',
    cardBody:
      'Flow-optimized kitchen designs that reduce labor costs and improve ticket times. We work with your architects and equipment vendors to get it right before the first nail is driven.',
    metaTitle: 'Kitchen Layout & Design Consulting — Step It Up Strategies',
    metaDescription:
      'Commercial kitchen layout and design consulting: workflow zoning, station design, equipment specification, ticket time and labor modeling, and coordination with architects and vendors.',
    serviceType: 'Design Consulting',
    headline: 'Fix the kitchen on paper,',
    headlineAccent: 'not in year two',
    lede:
      'A layout mistake becomes a labor line on every P&L you will ever print. We catch it while it is still a drawing.',
    overview: [
      'Kitchen layout is decided by people who will never work a Saturday in it — architects optimizing for code and space, equipment dealers optimizing for the package they sell. The result is a kitchen where the expo window is too far from the pass, the line crosses itself, and every ticket costs a few extra seconds forever.',
      'We sit on the operator side of that table. We design around the menu you are actually going to cook: station zoning, equipment specified to real production volume, cook-line sequencing, and clean separation of receiving, prep, hot line, cold line, dish, and expo. Then we review the drawings with your architect and vendors and push back before the concrete is poured.',
    ],
    capabilities: [
      {
        title: 'Workflow & Zone Planning',
        body: 'Receiving, storage, prep, hot line, cold line, expo, and dish laid out so product moves one direction and paths stop crossing.',
      },
      {
        title: 'Station Design for the Menu',
        body: 'Each station built around the tickets it will actually fire — reach-in placement, cutting board space, pan layout, and steps per plate.',
      },
      {
        title: 'Equipment Specification & Value Engineering',
        body: 'Equipment sized to real production volume, with capacity and utility requirements verified and dealer packages challenged where the spend is not earning anything.',
      },
      {
        title: 'Ticket Time & Labor Modeling',
        body: 'Projected throughput and labor per station at peak, so the layout is proven against a busy night before it is built.',
      },
      {
        title: 'Architect & Vendor Coordination',
        body: 'We review drawings, sit in design meetings, and represent operational reality against plans optimized for code and square footage.',
      },
      {
        title: 'Code, Ventilation & Safety Review',
        body: 'Hood and make-up air coverage, floor drains and finishes, handwashing and warewashing placement, and health-code separation reviewed alongside your design team.',
      },
    ],
    process: [
      {
        label: '01',
        title: 'Menu-First Requirements',
        body: 'We start from the menu and forecasted volume. Cooking method mix drives equipment, and equipment drives layout.',
      },
      {
        label: '02',
        title: 'Layout & Equipment Plan',
        body: 'Zone plan, station-level design, and an equipment schedule with capacities, utilities, and priority ranking.',
      },
      {
        label: '03',
        title: 'Drawing Review',
        body: 'Redlines against architect and vendor drawings, with operational justification for every change we ask for.',
      },
      {
        label: '04',
        title: 'Build Support & Commissioning',
        body: 'Site walks during build-out, equipment start-up verification, and station setup with the opening kitchen team.',
      },
    ],
    deliverables: [
      'Annotated kitchen zone and workflow plan',
      'Station-by-station design with equipment placement',
      'Equipment schedule with capacities, utilities, and priorities',
      'Throughput and labor projection at peak volume',
      'Redlined drawing comments for architect and vendors',
      'Opening station setup and mise en place standards',
    ],
    signals: [
      'You are building or renovating and the plans came from a dealer package',
      'Ticket times are long and the cooks are constantly in each other’s way',
      'Prep happens wherever there is room that day',
      'Equipment was bought for a menu you no longer serve',
    ],
    faqs: [
      {
        q: 'Do you replace our architect or kitchen designer?',
        a: 'No. We work alongside them as the operator advocate, making sure the design holds up in service and not just on paper.',
      },
      {
        q: 'Is it too late if construction has started?',
        a: 'Often not. Early build-out still allows meaningful changes, and we will tell you plainly which fixes are still worth making.',
      },
      {
        q: 'Can you help with an existing kitchen we cannot rebuild?',
        a: 'Yes. Reorganizing stations, storage, and equipment placement within the current footprint recovers real time on most lines.',
      },
    ],
    related: ['menu-creation-food-cost-analysis', 'permitting-licensing'],
    relatedArticles: [
      'restaurant-kitchen-layout-design-that-works',
      'how-to-optimize-bar-layout',
      'how-to-fix-venue-bottlenecks',
      'how-to-improve-table-turnover-without-chaos',
    ],
  },

  // ── 07 ─────────────────────────────────────────────────────────────────────
  {
    slug: 'permitting-licensing',
    number: '07',
    title: 'Permitting & Licensing',
    cardBody:
      'Liquor licenses, health permits, occupancy certificates, entertainment licenses — we acquire and maintain all permits required for opening new businesses and sustaining operational readiness.',
    metaTitle: 'Permitting & Licensing Services — Step It Up Strategies',
    metaDescription:
      'Permitting and licensing for restaurants, retail, and entertainment venues: liquor licenses, health permits, certificates of occupancy, entertainment and signage permits, plus renewal tracking.',
    serviceType: 'Regulatory Compliance',
    headline: 'Permits are the',
    headlineAccent: 'quietest way to lose money',
    lede:
      'Rent starts long before revenue does. Every week lost to a permit is a week you pay for and never get back.',
    overview: [
      'Licensing delays are the most expensive kind of delay because nothing else can move around them. Applications get filed in the wrong sequence, a plan review comes back with comments nobody anticipated, an inspection fails on a detail that should have been caught in design — and the opening slides another month with the lease clock running.',
      'We manage the permitting critical path end to end: which approvals are required, what order they have to be filed in, what each inspector will look for, and who is accountable for every document. After opening, we keep the calendar — renewals, recurring inspections, certifications, and postings — so a lapse never threatens a service day.',
    ],
    capabilities: [
      {
        title: 'Liquor & Beverage Licensing',
        body: 'License type selection, application preparation, quota and transfer navigation, zoning and distance verification, and hearing support where required.',
      },
      {
        title: 'Health & Food Service Permits',
        body: 'Plan review submission, food service licensing, manager certifications, pre-opening inspection prep, and correction of comments before they cost a day.',
      },
      {
        title: 'Occupancy & Building Approvals',
        body: 'Certificate of occupancy coordination, building and trade permits, fire and life-safety inspection readiness, and occupancy load documentation.',
      },
      {
        title: 'Entertainment, Signage & Special Use',
        body: 'Live entertainment and amplified sound permits, outdoor and sidewalk seating, signage approvals, special event permits, and conditional use applications.',
      },
      {
        title: 'Permit Critical Path Management',
        body: 'A sequenced timeline with dependencies, submission dates, agency contacts, and an owner for every line — tracked against your opening date.',
      },
      {
        title: 'Renewals & Ongoing Compliance',
        body: 'A live calendar of renewals, recurring inspections, certifications, and required postings, with reminders that land before the deadline does.',
      },
    ],
    process: [
      {
        label: '01',
        title: 'Jurisdiction Audit',
        body: 'Every approval your location and concept require, at city, county, and state level — confirmed with the agencies, not assumed.',
      },
      {
        label: '02',
        title: 'Sequenced Filing Plan',
        body: 'A dependency-mapped timeline showing what must be filed first and what your opening date actually supports.',
      },
      {
        label: '03',
        title: 'Submit & Shepherd',
        body: 'Applications prepared and filed, comments answered, agency follow-up handled, and inspections walked with the team.',
      },
      {
        label: '04',
        title: 'Maintain Readiness',
        body: 'Renewal calendar, document repository, and inspection-ready standards so compliance is a routine rather than a scramble.',
      },
    ],
    deliverables: [
      'Complete permit and license requirement matrix',
      'Sequenced filing timeline mapped to the opening date',
      'Prepared applications and supporting document packages',
      'Inspection preparation checklists by agency',
      'Renewal and recurring compliance calendar',
      'Organized digital repository of every approval on file',
    ],
    signals: [
      'You have a lease and no clear picture of the approval path',
      'A plan review or inspection came back with comments you cannot interpret',
      'Your opening date depends on a liquor license nobody is driving',
      'Renewals are tracked in somebody’s inbox',
    ],
    faqs: [
      {
        q: 'Do you file on our behalf?',
        a: 'We prepare, file, and shepherd applications, and we walk inspections with your team. Owner signatures and any required legal representation stay with you.',
      },
      {
        q: 'How early should we bring you in?',
        a: 'Before the lease is signed if possible. Zoning, occupancy, and liquor availability are site questions, and finding out after signing is the expensive version.',
      },
      {
        q: 'Can you take over compliance for an operating business?',
        a: 'Yes. We audit what is on file, close the gaps, and put the renewal calendar and document repository in place.',
      },
    ],
    related: ['restaurant-consulting', 'kitchen-layout-design'],
    relatedArticles: [
      'what-permits-does-a-restaurant-need',
      'restaurant-permitting-checklist',
      'liquor-license-consulting-help',
      'how-to-open-a-bar-legally',
    ],
  },

  // ── 08 ─────────────────────────────────────────────────────────────────────
  {
    slug: 'website-design',
    number: '08',
    title: 'Website Design',
    cardBody:
      'Modern, conversion-focused websites built to showcase your concept and drive bookings, orders, and inquiries. From brand-aligned visual design to mobile-first builds and ongoing content updates.',
    metaTitle: 'Website Design & Development — Step It Up Strategies',
    metaDescription:
      'Conversion-focused website design and development for restaurants, retail, and venues: mobile-first builds, menu and booking integration, local SEO, and ongoing content updates.',
    serviceType: 'Digital Services',
    headline: 'Your website is the',
    headlineAccent: 'first table you set',
    lede:
      'Most guests decide before they arrive. A slow site with a PDF menu loses them on a phone, in traffic, in ten seconds.',
    overview: [
      'Hospitality and retail sites fail in predictable ways: a menu locked in a PDF, hours that are wrong, a reservation link buried three taps down, photography that undersells the room, and a page that takes six seconds to load on cellular. The concept is good and the site is costing covers.',
      'We build sites around the two or three actions that actually matter — book, order, call, visit, inquire — and design everything else to serve them. Mobile first, fast, accessible, and structured so search engines and map listings understand exactly what you are and where. Content stays maintainable so hours and menus can change without a developer.',
    ],
    capabilities: [
      {
        title: 'Conversion-Focused Design',
        body: 'Page structure built around booking, ordering, and inquiry — clear primary actions, short paths, and no dead ends on mobile.',
      },
      {
        title: 'Brand-Aligned Visual Design',
        body: 'Typography, color, and photography direction that match the room a guest will actually walk into, applied consistently across every page.',
      },
      {
        title: 'Mobile-First Performance Builds',
        body: 'Fast, responsive builds with optimized imagery and accessible markup, tuned for phones on cellular rather than desktops on fiber.',
      },
      {
        title: 'Menus, Booking & Ordering Integration',
        body: 'Live text menus instead of PDFs, plus reservation, waitlist, online ordering, ticketing, and gift card integrations wired in properly.',
      },
      {
        title: 'Local SEO & Structured Data',
        body: 'Location and service markup, map and directory consistency, review surfacing, and metadata so you appear for the searches that convert nearby.',
      },
      {
        title: 'Content Updates & Maintenance',
        body: 'Hours, menus, events, and seasonal changes kept current, with monitoring, backups, and updates handled on an ongoing basis.',
      },
    ],
    process: [
      {
        label: '01',
        title: 'Goals & Guest Path',
        body: 'What a visit should accomplish and what a guest is trying to do. Everything on the page earns its place against that.',
      },
      {
        label: '02',
        title: 'Design & Content',
        body: 'Layout, copy, and photography direction, reviewed on real devices before a line of production code is written.',
      },
      {
        label: '03',
        title: 'Build & Integrate',
        body: 'Production build with menus, booking, and ordering connected, tested for speed and accessibility.',
      },
      {
        label: '04',
        title: 'Launch & Maintain',
        body: 'Launch with search and analytics configured, then ongoing content updates and performance monitoring.',
      },
    ],
    deliverables: [
      'Responsive, production website with source ownership',
      'Structured menu pages that replace PDF downloads',
      'Reservation, ordering, or inquiry integrations',
      'Local SEO setup with structured data and listing consistency',
      'Analytics and search console configuration',
      'Ongoing content update and maintenance plan',
    ],
    signals: [
      'Your menu is a PDF and your hours are wrong somewhere',
      'The site was built years ago and looks old on a phone',
      'You do not know how many people call or book from the site',
      'Search results show a competitor before they show you',
    ],
    faqs: [
      {
        q: 'Do we own the site when it is finished?',
        a: 'Yes. You own the domain, the content, and the build. No hostage arrangements.',
      },
      {
        q: 'Can you update an existing site instead of rebuilding?',
        a: 'Sometimes. If the current platform is sound we improve it. If it is fighting you, rebuilding is usually cheaper than patching.',
      },
      {
        q: 'Do you handle photography?',
        a: 'We direct it and coordinate with photographers. Food and interior photography carries most of the persuasion on a hospitality site.',
      },
    ],
    related: ['retail-strategy', 'restaurant-consulting'],
    relatedArticles: [
      'website-design-for-restaurants',
      'restaurant-website-design-guide-for-operators',
      'restaurant-concept-development-consultant',
      'retail-visual-merchandising-strategy',
    ],
  },

  // ── 09 ─────────────────────────────────────────────────────────────────────
  {
    slug: 'business-accounting',
    number: '09',
    title: 'Full Scale Business Accounting',
    cardBody:
      'End-to-end accounting built for hospitality and retail — bookkeeping, payroll, accounts payable and receivable, financial reporting, and controller-level oversight. We keep your books clean, your cash flow clear, and your business audit-ready.',
    metaTitle: 'Full Scale Business Accounting — Step It Up Strategies',
    metaDescription:
      'Hospitality and retail accounting: bookkeeping, payroll, accounts payable and receivable, sales tax, weekly reporting, budgeting and cash flow forecasting, and controller-level oversight.',
    serviceType: 'Accounting Services',
    headline: 'Books clean,',
    headlineAccent: 'cash flow clear',
    lede:
      'Certified bookkeepers and accountants who read a restaurant P&L the way an operator does — by line, by week, by cause.',
    overview: [
      'Generic accounting treats a restaurant like any other small business: a chart of accounts that buries prime cost, monthly reporting that arrives three weeks late, and no view of the weekly numbers that actually drive the outcome. By the time the statement lands, the month it describes is unrecoverable.',
      'We run the full accounting function on a hospitality and retail chart of accounts — daily sales reconciliation, accounts payable with invoice-level cost coding, payroll and tip handling, sales tax, and month-end close. On top of that sits controller-level oversight: weekly prime cost reporting, budget versus actual, cash flow forecasting, and a review conversation where the variances get explained.',
    ],
    capabilities: [
      {
        title: 'Bookkeeping & Daily Reconciliation',
        body: 'POS-to-bank reconciliation, deposit verification, credit card settlement, comps and voids, and a chart of accounts built for hospitality and retail.',
      },
      {
        title: 'Accounts Payable & Receivable',
        body: 'Invoice capture and cost coding to the right category, approval workflow, payment scheduling to protect cash, vendor statement reconciliation, and collections.',
      },
      {
        title: 'Payroll, Tips & Labor Reporting',
        body: 'Payroll processing, tip pooling and reporting, overtime and break compliance, contractor handling, and labor cost reporting by department.',
      },
      {
        title: 'Sales Tax & Filings',
        body: 'Sales and use tax calculation and filing, exemption handling, tourist and local surtaxes, and 1099 preparation on schedule.',
      },
      {
        title: 'Financial Reporting & Month-End Close',
        body: 'Timely P&L, balance sheet, and cash flow statements with accruals and prepaids handled properly, plus weekly prime cost and department reporting.',
      },
      {
        title: 'Controller-Level Oversight',
        body: 'Budget versus actual review, cash flow forecasting, internal controls and segregation of duties, cost trend analysis, and a standing review of the variances that matter.',
      },
      {
        title: 'Audit, Lender & Tax Readiness',
        body: 'Clean, documented books ready for lenders, investors, insurers, or your CPA — with reconciled support behind every balance.',
      },
    ],
    process: [
      {
        label: '01',
        title: 'Books & Systems Review',
        body: 'We assess the current chart of accounts, reconciliation state, POS and payroll integrations, and controls, then quantify the cleanup required.',
      },
      {
        label: '02',
        title: 'Clean Up & Restructure',
        body: 'Historical reconciliation, corrected coding, and a chart of accounts restructured so prime cost and department margins are readable.',
      },
      {
        label: '03',
        title: 'Run the Function',
        body: 'Daily reconciliation, AP and payroll cycles, tax filings, and month-end close on a published calendar you can rely on.',
      },
      {
        label: '04',
        title: 'Report & Advise',
        body: 'Weekly prime cost and monthly financials delivered with a review conversation — what moved, why, and what to do about it.',
      },
    ],
    deliverables: [
      'Hospitality and retail chart of accounts, reconciled',
      'Monthly P&L, balance sheet, and cash flow statements',
      'Weekly prime cost and department labor reporting',
      'AP aging, payment calendar, and vendor reconciliation',
      'Payroll, tip, and sales tax filings on schedule',
      'Annual budget, cash flow forecast, and variance review',
    ],
    signals: [
      'Financials arrive weeks late and you cannot act on them',
      'You do not know your prime cost until the month is closed',
      'Sales tax and payroll filings are a recurring source of stress',
      'A lender or investor asked for statements you cannot produce',
    ],
    faqs: [
      {
        q: 'Do you replace our CPA?',
        a: 'No. We run the ongoing accounting function and hand your CPA clean, reconciled books at year end, which usually reduces what that work costs.',
      },
      {
        q: 'Can you take over books that are behind?',
        a: 'Yes. Cleanup is common. We scope the catch-up work up front so you know the cost before we start.',
      },
      {
        q: 'What systems do you work in?',
        a: 'We work in the major accounting, POS, and payroll platforms and will recommend a change only when the current stack is genuinely holding you back.',
      },
    ],
    related: ['restaurant-consulting', 'retail-strategy'],
    relatedArticles: [
      'hospitality-financial-controller-services',
      'what-does-an-outsourced-controller-do',
      'restaurant-profit-and-loss-help',
      'how-to-fix-cash-flow-without-guesswork',
    ],
  },
]

export const SERVICE_SLUGS = SERVICES.map((s) => s.slug)

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return SERVICES.find((s) => s.slug === slug)
}
