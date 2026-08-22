import React, { useState, useMemo } from "react";
import {
  Bike, Car, Zap, Search, Menu, X, MapPin, Gauge, Fuel, IndianRupee,
  ChevronRight, ChevronLeft, Star, Check, X as XIcon, Mail, Phone,
  Facebook, Instagram, Youtube, Twitter, Calendar, Clock, Route,
  ShieldCheck, ThumbsUp, ThumbsDown, ArrowRight, Filter, Home as HomeIcon,
  Compass, Newspaper, BookOpen, Users, Info, FileText, ChevronDown
} from "lucide-react";

/* =========================================================
   COLOR TOKENS (kept intentionally small + simple)
   paper   #F6F5F1  – page background
   ink     #1C1C1A  – primary text
   navy    #16324F  – brand / header / nav
   steel   #5B7089  – secondary text / muted
   rust    #C1440E  – CTA / accent
   line    #E3E1D9  – hairline borders
========================================================= */

const CTA = ({ children, onClick, full }) => (
  <button
    onClick={onClick}
    className={`${full ? "w-full" : ""} inline-flex items-center justify-center gap-2 bg-[#C1440E] hover:bg-[#a63a0c] text-white text-sm font-semibold px-5 py-2.5 rounded-md transition-colors`}
  >
    {children}
    <ArrowRight size={16} />
  </button>
);

const GhostBtn = ({ children, onClick, active }) => (
  <button
    onClick={onClick}
    className={`text-sm font-medium px-3 py-1.5 rounded-full border transition-colors ${active ? "bg-[#16324F] text-white border-[#16324F]" : "border-[#E3E1D9] text-[#5B7089] hover:border-[#16324F] hover:text-[#16324F]"
      }`}
  >
    {children}
  </button>
);

const Tag = ({ children }) => (
  <span className="text-[11px] font-semibold uppercase tracking-wide text-[#C1440E] bg-[#C1440E]/10 px-2 py-1 rounded">
    {children}
  </span>
);

const TypeIcon = ({ type, size = 18, className = "" }) => {
  if (type === "Car" || type === "SUV" || type === "Sedan" || type === "Hatchback") return <Car size={size} className={className} />;
  if (type === "Electric Vehicle" || type === "EV") return <Zap size={size} className={className} />;
  return <Bike size={size} className={className} />;
};

/* =========================================================
   SAMPLE EDITORIAL DATA
   Vehicle names below are illustrative placeholders so this
   template can be published without asserting real-world
   brand specs, prices, or claims. Swap in verified data before
   publishing live reviews.
========================================================= */

const VEHICLES = [
  {
    id: "raptor-rs310", name: "Raptor RS310", brand: "Raptor Motors", type: "Motorcycle", segment: "Sports", price: "₹2.85 – 3.10 Lakh", engine: "312cc, liquid-cooled, single-cylinder", power: "34 PS / 27.5 Nm", mileage: "28–32 km/l", topSpeed: "150 km/h", weight: "172 kg", variants: ["Standard", "ABS Dual-Channel", "Race Edition"], colors: ["Racing Red", "Stealth Black", "Pearl White"],
    pros: ["Sharp handling for a middleweight", "Strong mid-range torque", "Well-finished cockpit and switchgear"],
    cons: ["Firm suspension on broken roads", "Heat from the engine in traffic", "Limited under-seat storage"],
    suitableFor: "Riders who want a confident weekend track-day companion that's still usable for daily commutes.",
    summary: "The Raptor RS310 sits at the sporty end of the 300cc class, built around an aggressive riding triangle and a free-revving single-cylinder motor. It's aimed at first-time performance buyers stepping up from smaller commuters.",
    image: "sport"
  },
  {
    id: "trailking-adv650", name: "TrailKing Adventure 650", brand: "TrailKing", type: "Motorcycle", segment: "Adventure", price: "₹5.45 – 6.20 Lakh", engine: "649cc, parallel-twin", power: "47 PS / 56 Nm", mileage: "22–25 km/l", topSpeed: "170 km/h", weight: "199 kg", variants: ["Base", "Tourer (w/ panniers)", "Rally"],
    colors: ["Desert Sand", "Forest Green", "Matte Grey"],
    pros: ["Torquey twin-cylinder engine", "Comfortable for long highway stretches", "Genuine off-road capability"],
    cons: ["Seat height may not suit shorter riders", "Heavier than single-cylinder rivals", "Servicing intervals are frequent"],
    suitableFor: "Long-distance tourers and weekend adventure riders who split time between highway and light off-road trails.",
    summary: "Built for multi-day touring, the Adventure 650 pairs a relaxed ergonomic layout with a torque-rich twin engine, spoked wheels, and long-travel suspension for mixed-terrain riding.",
    image: "adventure"
  },
  {
    id: "cityglide-125", name: "CityGlide 125", brand: "CityGlide", type: "Scooter", segment: "Commuter Scooter", price: "₹78,500 – 89,900", engine: "124cc, air-cooled", power: "8.2 PS / 10.4 Nm", mileage: "48–52 km/l", topSpeed: "92 km/h", weight: "108 kg", variants: ["Standard", "Alloy Wheel", "Connected"],
    colors: ["Matte Blue", "White", "Maroon"],
    pros: ["Excellent daily fuel efficiency", "Spacious under-seat storage", "Light and easy to maneuver in traffic"],
    cons: ["Modest power for highway overtakes", "Basic instrument cluster on base variant", "Ride quality softens with two-up load"],
    suitableFor: "City commuters and first-time two-wheeler buyers who prioritise running costs and ease of use.",
    summary: "The CityGlide 125 is a no-frills commuter scooter designed around low running costs, a light kerb weight, and enough storage for everyday errands.",
    image: "scooter"
  },
  {
    id: "volt-neo-e", name: "Volt Neo Electric", brand: "Volt", type: "Electric Vehicle", segment: "Electric Scooter", price: "₹1.10 – 1.35 Lakh", engine: "Electric motor, 4 kWh battery", power: "6.4 kW / 22 Nm", mileage: "Range: 95–110 km", topSpeed: "78 km/h", weight: "118 kg", variants: ["Standard", "Long Range"],
    colors: ["Ocean Teal", "Graphite", "Ivory"],
    pros: ["Low running cost per km", "Instant torque from standstill", "Quiet, smooth ride in city traffic"],
    cons: ["Real-world range drops in heavy traffic or AC use", "Charging infrastructure still limited in smaller towns", "Higher upfront cost than an equivalent petrol scooter"],
    suitableFor: "Urban riders with predictable daily distances and access to home or workplace charging.",
    summary: "The Volt Neo Electric targets city riders looking to move away from petrol scooters, offering a claimed range suited to daily commutes plus app-based ride data.",
    image: "ev-scooter"
  },
  {
    id: "cruiser-legend-350", name: "Cruiser Legend 350", brand: "Legend Motorcycles", type: "Motorcycle", segment: "Cruiser", price: "₹2.05 – 2.40 Lakh", engine: "349cc, air/oil-cooled, single", power: "20.5 PS / 27 Nm", mileage: "35–38 km/l", topSpeed: "120 km/h", weight: "195 kg", variants: ["Standard", "Dual-Tone", "Chrome Edition"],
    colors: ["Classic Black", "Olive Green", "Burgundy"],
    pros: ["Relaxed, low-slung riding posture", "Strong low-end torque for city riding", "Loyal aftermarket and accessory support"],
    cons: ["Cornering clearance is limited", "Vibrations increase past 90 km/h", "Not ideal for tall highway cruising speeds"],
    suitableFor: "Riders who want a laid-back cruiser for weekend rides and short highway trips rather than outright performance.",
    summary: "The Cruiser Legend 350 leans into classic cruiser proportions — forward-set pegs, a wide handlebar, and a thumping single-cylinder engine tuned for low-rpm character.",
    image: "cruiser"
  },
  {
    id: "streetfighter-400", name: "StreetFighter 400", brand: "Raptor Motors", type: "Motorcycle", segment: "Naked", price: "₹3.60 – 3.95 Lakh", engine: "398cc, liquid-cooled, single", power: "40 PS / 39 Nm", mileage: "26–29 km/l", topSpeed: "165 km/h", weight: "179 kg", variants: ["Standard", "ABS", "Metzeler Tyre Pack"],
    colors: ["Volcano Grey", "Racing Yellow"],
    pros: ["Punchy engine with a strong midrange", "Sharp, communicative handling", "Modern electronics package for the segment"],
    cons: ["Firm ride on city potholes", "Fuel range is on the shorter side", "Premium pricing versus rivals"],
    suitableFor: "Riders upgrading from a smaller commuter who want street-focused performance without a full fairing.",
    summary: "The StreetFighter 400 is the naked sibling to the RS310, trading the fairing for an upright stance while keeping a similarly aggressive chassis and motor tune.",
    image: "naked"
  },
  {
    id: "commuter-pro-150", name: "Commuter Pro 150", brand: "CityGlide", type: "Motorcycle", segment: "Commuter", price: "₹1.15 – 1.35 Lakh", engine: "149cc, air-cooled, single", power: "13.5 PS / 13.4 Nm", mileage: "45–50 km/l", topSpeed: "105 km/h", weight: "138 kg", variants: ["Drum", "Disc", "Disc + Alloy"],
    colors: ["Matte Red", "Blue", "Black"],
    pros: ["Balanced power-to-efficiency ratio", "Comfortable seat for daily commuting", "Low maintenance costs"],
    cons: ["Feels underpowered for two-up highway riding", "Basic suspension setup", "Limited color options on entry variant"],
    suitableFor: "Everyday commuters who want a step up in performance from a 100–125cc bike without a big jump in running costs.",
    summary: "The Commuter Pro 150 fills the gap between entry commuters and performance-focused 150s, aiming for a practical balance of power and fuel economy.",
    image: "commuter"
  },
  {
    id: "nova-ev-hatch", name: "Nova EV Hatch", brand: "Nova Motors", type: "Electric Vehicle", segment: "Hatchback", price: "₹9.5 – 12.8 Lakh", engine: "Electric motor, 30.2 kWh battery", power: "95 kW / 220 Nm", mileage: "Range: 280–310 km", topSpeed: "150 km/h", weight: "1,290 kg", variants: ["Base", "Mid (fast charging)", "Top (sunroof + ADAS)"],
    colors: ["Arctic White", "Deep Blue", "Titanium Grey"],
    pros: ["Practical everyday EV range", "Low running cost versus petrol equivalents", "Quiet cabin and smooth power delivery"],
    cons: ["Fast-charging network still developing outside metros", "Boot space is smaller than the petrol variant", "Home charger installation is an added cost"],
    suitableFor: "City and short-highway drivers who can charge at home or work and want to move to an EV without a large budget jump.",
    summary: "The Nova EV Hatch is positioned as an accessible entry point into electric cars, built on the brand's existing hatchback platform with a dedicated EV powertrain.",
    image: "ev-car"
  },
  {
    id: "terra-suv-15", name: "Terra SUV 1.5", brand: "Terra Motors", type: "Car", segment: "SUV", price: "₹11.2 – 16.4 Lakh", engine: "1.5L turbo-petrol / 1.5L diesel", power: "160 PS / 250 Nm (turbo-petrol)", mileage: "17–19 km/l", topSpeed: "185 km/h", weight: "1,410 kg", variants: ["Base", "Mid", "Top", "Top AWD"],
    colors: ["Sunset Orange", "Pearl White", "Steel Grey"],
    pros: ["Spacious cabin with flexible seating", "Strong mid-range punch from the turbo-petrol", "Comprehensive safety kit even on mid variants"],
    cons: ["Turbo-petrol mileage drops in city traffic", "Firm low-speed ride on the top AWD trim", "Infotainment lags occasionally"],
    suitableFor: "Families needing a comfortable, well-equipped SUV for daily use plus occasional long highway trips.",
    summary: "The Terra SUV 1.5 competes in the crowded compact-SUV space with a focus on cabin space, a strong turbo-petrol option, and a well-rounded safety package.",
    image: "suv"
  },
];

const COMPARISONS = [
  {
    id: "rs310-vs-sf400", aId: "raptor-rs310", bId: "streetfighter-400",
    verdict: "Choose the RS310 for outright sporty riding and track days; choose the StreetFighter 400 if you want a more upright, street-friendly riding position with similar performance.",
    points: [
      { label: "Riding position", a: "Committed, sporty crouch", b: "Upright, street-naked stance" },
      { label: "Power", a: "34 PS", b: "40 PS" },
      { label: "Best for", a: "Track-day enthusiasts", b: "Daily street performance riders" },
      { label: "Price", a: "₹2.85 – 3.10 Lakh", b: "₹3.60 – 3.95 Lakh" },
    ]
  },
  {
    id: "cityglide-vs-voltneo", aId: "cityglide-125", bId: "volt-neo-e",
    verdict: "Pick the CityGlide 125 if refuelling convenience matters most; pick the Volt Neo Electric if your daily distance fits within its range and you can charge at home.",
    points: [
      { label: "Running cost", a: "Moderate (petrol)", b: "Low (electricity)" },
      { label: "Range/Mileage", a: "48–52 km/l", b: "95–110 km per charge" },
      { label: "Refuel time", a: "Under 5 minutes", b: "3–5 hrs (standard charger)" },
      { label: "Price", a: "₹78,500 – 89,900", b: "₹1.10 – 1.35 Lakh" },
    ]
  },
  {
    id: "adv650-vs-cruiser350", aId: "trailking-adv650", bId: "cruiser-legend-350",
    verdict: "The Adventure 650 suits multi-terrain long tours; the Cruiser Legend 350 suits relaxed highway cruising and weekend rides on tarmac.",
    points: [
      { label: "Terrain focus", a: "Highway + off-road", b: "Highway + city" },
      { label: "Engine character", a: "Twin, revvy", b: "Single, torquey low-end" },
      { label: "Touring readiness", a: "High (panniers, screen)", b: "Moderate" },
      { label: "Price", a: "₹5.45 – 6.20 Lakh", b: "₹2.05 – 2.40 Lakh" },
    ]
  },
];

const TRAVEL_ARTICLES = [
  {
    id: "coastal-loop", title: "The Coastal Loop: A 3-Day Ride Along the Eastern Shoreline", type: "Road Trip",
    distance: "620 km round trip", duration: "3 days / 2 nights", difficulty: "Easy – Moderate", bestSeason: "October – February",
    recommendedBikes: ["trailking-adv650", "cruiser-legend-350"],
    summary: "A relaxed coastal route mixing quiet fishing villages, open highway stretches, and a couple of short unpaved detours to viewpoints. Fuel stops are frequent, making it approachable for first-time long-distance riders.",
    highlights: ["Sunrise photo stop at the old lighthouse", "Local seafood lunch halfway through day two", "Optional off-road detour to a hilltop viewpoint"]
  },
  {
    id: "ghat-crossing", title: "Crossing the Ghats: A Weekend Mountain Ride", type: "Destination",
    distance: "310 km round trip", duration: "2 days / 1 night", difficulty: "Moderate – Hard", bestSeason: "November – February",
    recommendedBikes: ["trailking-adv650", "streetfighter-400"],
    summary: "Tight switchbacks, quick elevation changes, and cool mountain air make this a favourite short escape for riders based near the highlands. Roads are well-paved but demand full attention through the hairpins.",
    highlights: ["21 hairpin bends over an 18 km climb", "Waterfall viewpoint at the midway rest stop", "Cool overnight temperatures — pack a base layer"]
  },
  {
    id: "desert-highway", title: "Desert Highway Run: Long, Straight, and Unforgiving on Fuel Planning", type: "Road Trip",
    distance: "540 km one-way", duration: "1 long day or 2 relaxed days", difficulty: "Moderate (heat + fuel planning)", bestSeason: "December – February",
    recommendedBikes: ["trailking-adv650", "raptor-rs310"],
    summary: "Wide-open highway with long gaps between fuel stations. This route rewards bikes with better range and comfortable ergonomics for sustained highway speeds.",
    highlights: ["Fuel stations spaced up to 90 km apart — plan accordingly", "Best ridden early morning to avoid midday heat", "Flat, fast tarmac ideal for maintaining cruising speed"]
  },
];

const NEWS_ITEMS = [
  { id: "n1", date: "18 Aug 2026", tag: "New Launch", title: "TrailKing Updates the Adventure 650 With a Larger Fuel Tank and Revised Suspension", summary: "The refreshed model adds 2 litres of fuel capacity and retuned front forks aimed at long-distance touring riders." },
  { id: "n2", date: "12 Aug 2026", tag: "Electric Vehicles", title: "Volt Expands Charging Partner Network to 40 New Cities", summary: "The expansion targets tier-2 cities, aiming to ease range anxiety for Volt Neo Electric owners on longer trips." },
  { id: "n3", date: "05 Aug 2026", tag: "Industry", title: "Two-Wheeler Retail Sales Rise for the Third Consecutive Month", summary: "Commuter and scooter segments led the growth, with entry-level electric scooters showing the fastest year-on-year gain." },
  { id: "n4", date: "29 Jul 2026", tag: "New Launch", title: "Nova Motors Confirms Facelifted EV Hatch With Longer Range Variant", summary: "A new 'Mid' trim adds fast-charging support and a claimed range increase of roughly 25 km over the outgoing base variant." },
];

const GUIDES = [
  {
    id: "g1", title: "First-Time Buyer's Guide: Choosing Between a Scooter and a Commuter Motorcycle", summary: "How to weigh daily distance, road conditions, and running costs when picking your first two-wheeler.",
    body: ["Scooters generally offer easier low-speed handling, step-through frames, and more storage — ideal for shorter city commutes and riders who value convenience.", "Commuter motorcycles typically offer better ground clearance, a more planted feel at higher speeds, and often better long-term resale value.", "If your commute mixes city and highway stretches regularly, a commuter motorcycle usually holds up better over time. For purely short, stop-start city trips, a scooter's convenience is hard to beat."]
  },
  {
    id: "g2", title: "Switching to an Electric Two-Wheeler: What to Check Before You Buy", summary: "Range claims, charging time, warranty terms, and resale considerations for first-time EV buyers.",
    body: ["Treat manufacturer range figures as best-case numbers — real-world range typically drops 15-25% depending on load, speed, and traffic.", "Check battery warranty terms carefully, including degradation clauses, since the battery is the most expensive component to replace.", "Confirm charging options near your home and workplace before buying, particularly if you don't have access to a private parking spot with a power outlet."]
  },
  {
    id: "g3", title: "How to Read a Bike Spec Sheet Like a Reviewer", summary: "Understanding power, torque, kerb weight, and how they translate to real-world riding feel.",
    body: ["Peak power figures tell you top-end capability, but torque and where it peaks (rpm) tell you more about everyday rideability in traffic.", "Kerb weight matters most at low speed — parking, U-turns, and stop-start traffic — more than it does at highway speed.", "Mileage figures are typically tested under controlled conditions; expect real-world figures to vary with riding style and traffic."]
  },
];

const NAV_STRUCTURE = [
  { key: "reviews", label: "Motorcycle Reviews" },
  { key: "launches", label: "New Launches" },
  { key: "comparisons", label: "Bike Comparisons" },
  { key: "prices", label: "Prices & Variants" },
  { key: "ev", label: "Electric Vehicles" },
  { key: "best", label: "Best Bikes" },
  { key: "guides", label: "Buying Guides" },
  {
    key: "travel", label: "Motorcycle Travel", children: [
      { key: "roadtrips", label: "Road Trips" },
      { key: "destinations", label: "Destinations" },
    ]
  },
  { key: "news", label: "Automotive News" },
];

/* ============================= VISUAL PLACEHOLDER (no external images) ============================= */
const VehicleArt = ({ type, className = "" }) => (
  <div className={`flex items-center justify-center bg-gradient-to-br from-[#16324F] to-[#2C4A6E] ${className}`}>
    <TypeIcon type={type} size={40} className="text-white/90" />
  </div>
);

/* ============================= HEADER ============================= */
function Header({ page, setPage, onSearch }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [travelOpen, setTravelOpen] = useState(false);
  const [q, setQ] = useState("");

  const submitSearch = (e) => {
    e.preventDefault();
    onSearch(q);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#E3E1D9]">
      {/* <div className="bg-[#16324F] text-white text-xs">
        <div className="max-w-6xl mx-auto px-4 py-1.5 flex items-center justify-between">
          <span className="hidden sm:inline">Independent motorcycle & car reviews, comparisons and travel stories.</span>
          <button onClick={() => setPage({ key: "affiliate" })} className="underline decoration-white/40 hover:decoration-white">
            Affiliate Disclosure
          </button>
        </div>
      </div> */}
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <button onClick={() => setPage({ key: "home" })} className="flex items-center gap-2 shrink-0">
          <div className="w-9 h-9 rounded-md bg-[#16324F] flex items-center justify-center">
            <Bike size={20} className="text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight text-[#1C1C1A]">
            Ride  <span className="text-[#C1440E]">Guide</span>
          </span>
        </button>

        <form onSubmit={submitSearch} className="hidden md:flex flex-1 max-w-md items-center border border-[#E3E1D9] rounded-md px-3 py-1.5 focus-within:border-[#16324F]">
          <Search size={16} className="text-[#5B7089]" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search bikes, cars, comparisons..."
            className="flex-1 px-2 text-sm outline-none bg-transparent"
          />
        </form>

        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <nav className="hidden md:block border-t border-[#E3E1D9]">
        <div className="max-w-6xl mx-auto px-4 flex items-center gap-1 text-sm">
          {NAV_STRUCTURE.map((item) =>
            item.children ? (
              <div key={item.key} className="relative" onMouseEnter={() => setTravelOpen(true)} onMouseLeave={() => setTravelOpen(false)}>
                <button
                  onClick={() => setPage({ key: item.key })}
                  className={`flex items-center gap-1 px-3 py-2.5 font-medium hover:text-[#C1440E] ${page.key === item.key || item.children.some(c => c.key === page.key) ? "text-[#C1440E]" : "text-[#1C1C1A]"}`}
                >
                  {item.label} <ChevronDown size={14} />
                </button>
                {travelOpen && (
                  <div className="absolute left-0 top-full bg-white border border-[#E3E1D9] rounded-md shadow-lg py-1 w-44">
                    {item.children.map((c) => (
                      <button key={c.key} onClick={() => setPage({ key: c.key })} className="block w-full text-left px-4 py-2 hover:bg-[#F6F5F1] text-[#1C1C1A]">
                        {c.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <button
                key={item.key}
                onClick={() => setPage({ key: item.key })}
                className={`px-3 py-2.5 font-medium hover:text-[#C1440E] whitespace-nowrap ${page.key === item.key ? "text-[#C1440E]" : "text-[#1C1C1A]"}`}
              >
                {item.label}
              </button>
            )
          )}
        </div>
      </nav>

      {mobileOpen && (
        <div className="md:hidden border-t border-[#E3E1D9] px-4 py-3 space-y-1">
          <form onSubmit={submitSearch} className="flex items-center border border-[#E3E1D9] rounded-md px-3 py-1.5 mb-2">
            <Search size={16} className="text-[#5B7089]" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search..." className="flex-1 px-2 text-sm outline-none" />
          </form>
          {NAV_STRUCTURE.map((item) => (
            <div key={item.key}>
              <button onClick={() => { setPage({ key: item.key }); setMobileOpen(false); }} className="block w-full text-left py-2 text-sm font-medium text-[#1C1C1A]">
                {item.label}
              </button>
              {item.children && (
                <div className="pl-4">
                  {item.children.map((c) => (
                    <button key={c.key} onClick={() => { setPage({ key: c.key }); setMobileOpen(false); }} className="block w-full text-left py-1.5 text-sm text-[#5B7089]">
                      {c.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}

/* ============================= FOOTER ============================= */
function Footer({ setPage }) {
  return (
    <footer className="bg-[#16324F] text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">

        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-md bg-white/10 flex items-center justify-center">
              <Bike size={16} />
            </div>
            <span className="font-bold">RideGuide</span>
          </div>

          <p className="text-white/70 text-sm leading-relaxed">
            Independent reviews, comparisons and travel stories for motorcycle,
            scooter, car and EV buyers.
          </p>

          <div className="flex gap-3 mt-4 text-white/70">
            <a
              href="https://www.facebook.com/profile.php?id=61593464821607"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              <Facebook size={16} />
            </a>

            <a
              href="https://www.instagram.com/rideguideindia/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              <Instagram size={16} />
            </a>

            <a
              href="https://www.youtube.com/@RideGuide-1"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              <Youtube size={16} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-white/90">Explore</h4>
          <ul className="space-y-2 text-white/70">
            {NAV_STRUCTURE.flatMap((n) =>
              n.children ? n.children : [n]
            ).map((n) => (
              <li key={n.key}>
                <button
                  onClick={() => setPage({ key: n.key })}
                  className="hover:text-white"
                >
                  {n.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-white/90">Company</h4>
          <ul className="space-y-2 text-white/70">
            <li>
              <button
                onClick={() => setPage({ key: "about" })}
                className="hover:text-white"
              >
                About Us
              </button>
            </li>
            <li>
              <button
                onClick={() => setPage({ key: "contact" })}
                className="hover:text-white"
              >
                Contact Us
              </button>
            </li>
            <li>
              <button
                onClick={() => setPage({ key: "affiliate" })}
                className="hover:text-white"
              >
                Affiliate Disclosure
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-white/90">Legal</h4>
          <ul className="space-y-2 text-white/70">
            <li>
              <button
                onClick={() => setPage({ key: "privacy" })}
                className="hover:text-white"
              >
                Privacy Policy
              </button>
            </li>
            <li>
              <button
                onClick={() => setPage({ key: "terms" })}
                className="hover:text-white"
              >
                Terms & Conditions
              </button>
            </li>
          </ul>
        </div>

      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-white/60 px-4">
        © 2026 RideGuide. 
      </div>
    </footer>
  );
}

/* ============================= SHARED BITS ============================= */
function AffiliateNotice() {
  return (
    <div className="text-xs text-[#5B7089] bg-[#F6F5F1] border border-[#E3E1D9] rounded-md px-3 py-2 flex items-start gap-2">
      <Info size={14} className="mt-0.5 shrink-0" />
      <span>This page may contain affiliate links. If you enquire or purchase through them, RideGuide may earn a commission at no extra cost to you. See our <button className="underline">Affiliate Disclosure</button> for details.</span>
    </div>
  );
}

function SectionHeading({ eyebrow, title, action }) {
  return (
    <div className="flex items-end justify-between mb-5">
      <div>
        {eyebrow && <div className="text-xs font-semibold uppercase tracking-wide text-[#C1440E] mb-1">{eyebrow}</div>}
        <h2 className="text-2xl font-bold text-[#1C1C1A] tracking-tight">{title}</h2>
      </div>
      {action}
    </div>
  );
}

function VehicleCard({ v, setPage }) {
  return (
    <div className="border border-[#E3E1D9] rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow flex flex-col">
      <VehicleArt type={v.type} className="h-36 w-full" />
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-1">
          <Tag>{v.segment}</Tag>
        </div>
        <h3 className="font-bold text-[#1C1C1A] leading-snug">{v.name}</h3>
        <p className="text-xs text-[#5B7089] mb-2">{v.brand}</p>
        <div className="flex items-center gap-3 text-xs text-[#5B7089] mb-3">
          <span className="flex items-center gap-1"><IndianRupee size={12} />{v.price}</span>
          <span className="flex items-center gap-1"><Gauge size={12} />{v.mileage}</span>
        </div>
        <p className="text-sm text-[#5B7089] mb-4 line-clamp-2">{v.summary}</p>
        <div className="mt-auto flex items-center justify-between gap-2">
          <button onClick={() => setPage({ key: "article", id: v.id })} className="text-sm font-semibold text-[#16324F] hover:text-[#C1440E] flex items-center gap-1">
            Read Review <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================= HOME ============================= */
function Home({ setPage }) {
  const popular = VEHICLES.slice(0, 4);
  const launches = VEHICLES.slice(4, 8);
  return (
    <div>
      <section className="bg-[#16324F]">
        <div className="max-w-6xl mx-auto px-4 py-14 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-[#C1440E] font-semibold text-sm uppercase tracking-wide">Reviews · Comparisons · Travel</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mt-3">
              Real riding knowledge, before you buy or ride out.
            </h1>
            <p className="text-white/70 mt-4 text-lg">
              Specs, prices, honest pros and cons, side-by-side comparisons, and road-tested travel routes for motorcycles, scooters, cars and EVs.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <CTA onClick={() => setPage({ key: "reviews" })}>Browse Reviews</CTA>
              <button onClick={() => setPage({ key: "comparisons" })} className="inline-flex items-center gap-2 text-white font-semibold px-5 py-2.5 rounded-md border border-white/30 hover:bg-white/10">
                Compare Bikes <ChevronRight size={16} />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {popular.slice(0, 4).map((v) => (
              <button key={v.id} onClick={() => setPage({ key: "article", id: v.id })} className="rounded-lg overflow-hidden border border-white/10 text-left bg-white/5 hover:bg-white/10 transition-colors">
                <VehicleArt type={v.type} className="h-20 w-full" />
                <div className="p-2">
                  <p className="text-white text-xs font-semibold truncate">{v.name}</p>
                  <p className="text-white/60 text-[11px]">{v.price}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-14">
        <section>
          <SectionHeading eyebrow="Reader Favourites" title="Popular Motorcycles & Scooters"
            action={<GhostBtn onClick={() => setPage({ key: "best" })}>View Best Bikes</GhostBtn>} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popular.map((v) => <VehicleCard key={v.id} v={v} setPage={setPage} />)}
          </div>
        </section>

        <section>
          <SectionHeading eyebrow="Just In" title="Latest Launches"
            action={<GhostBtn onClick={() => setPage({ key: "launches" })}>All Launches</GhostBtn>} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {launches.map((v) => <VehicleCard key={v.id} v={v} setPage={setPage} />)}
          </div>
        </section>

        <section>
          <SectionHeading eyebrow="Decide Faster" title="Head-to-Head Comparisons"
            action={<GhostBtn onClick={() => setPage({ key: "comparisons" })}>All Comparisons</GhostBtn>} />
          <div className="grid md:grid-cols-3 gap-4">
            {COMPARISONS.map((c) => {
              const a = VEHICLES.find(v => v.id === c.aId), b = VEHICLES.find(v => v.id === c.bId);
              return (
                <button key={c.id} onClick={() => setPage({ key: "compare", id: c.id })} className="text-left border border-[#E3E1D9] rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between text-sm font-bold text-[#1C1C1A]">
                    <span>{a.name}</span>
                    <span className="text-[#C1440E] text-xs">VS</span>
                    <span>{b.name}</span>
                  </div>
                  <p className="text-sm text-[#5B7089] mt-2 line-clamp-2">{c.verdict}</p>
                </button>
              );
            })}
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-8">
          <div>
            <SectionHeading eyebrow="Know Before You Buy" title="Buying Guides"
              action={<GhostBtn onClick={() => setPage({ key: "guides" })}>All Guides</GhostBtn>} />
            <div className="space-y-3">
              {GUIDES.map((g) => (
                <button key={g.id} onClick={() => setPage({ key: "guide", id: g.id })} className="w-full text-left border border-[#E3E1D9] rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
                  <h4 className="font-semibold text-[#1C1C1A]">{g.title}</h4>
                  <p className="text-sm text-[#5B7089] mt-1 line-clamp-2">{g.summary}</p>
                </button>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Ride Further" title="Motorcycle Travel"
              action={<GhostBtn onClick={() => setPage({ key: "travel" })}>All Stories</GhostBtn>} />
            <div className="space-y-3">
              {TRAVEL_ARTICLES.slice(0, 3).map((t) => (
                <button key={t.id} onClick={() => setPage({ key: "travel-article", id: t.id })} className="w-full text-left border border-[#E3E1D9] rounded-lg p-4 bg-white hover:shadow-md transition-shadow flex items-center gap-3">
                  <div className="w-11 h-11 rounded-md bg-[#16324F] flex items-center justify-center shrink-0"><Route size={18} className="text-white" /></div>
                  <div>
                    <h4 className="font-semibold text-[#1C1C1A] leading-snug">{t.title}</h4>
                    <p className="text-xs text-[#5B7089] mt-1">{t.distance} · {t.duration}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

/* ============================= LIST PAGES ============================= */
function ListPage({ pageKey, setPage }) {
  const [typeFilter, setTypeFilter] = useState("All");
  const [sort, setSort] = useState("relevance");

  const config = {
    reviews: { title: "Motorcycle Reviews", eyebrow: "In-Depth Reviews", data: VEHICLES },
    launches: { title: "New Launches", eyebrow: "Just Announced", data: VEHICLES.slice().reverse() },
    prices: { title: "Prices & Variants", eyebrow: "Compare Trims & Costs", data: VEHICLES },
    ev: { title: "Electric Vehicles", eyebrow: "Electric Motorcycles, Scooters & Cars", data: VEHICLES.filter(v => v.type === "Electric Vehicle") },
    best: { title: "Best Bikes", eyebrow: "Reader & Editor Picks", data: VEHICLES.filter(v => v.type === "Motorcycle" || v.type === "Scooter") },
  }[pageKey];

  const types = ["All", ...Array.from(new Set(config.data.map(v => v.type)))];
  let items = typeFilter === "All" ? config.data : config.data.filter(v => v.type === typeFilter);
  if (sort === "price-low") items = [...items].sort((a, b) => parseFloat(a.price.replace(/[^0-9.]/g, "")) - parseFloat(b.price.replace(/[^0-9.]/g, "")));
  if (sort === "price-high") items = [...items].sort((a, b) => parseFloat(b.price.replace(/[^0-9.]/g, "")) - parseFloat(a.price.replace(/[^0-9.]/g, "")));

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <SectionHeading eyebrow={config.eyebrow} title={config.title} />
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex flex-wrap gap-2">
          {types.map((t) => <GhostBtn key={t} active={typeFilter === t} onClick={() => setTypeFilter(t)}>{t}</GhostBtn>)}
        </div>
        <div className="flex items-center gap-2 text-sm text-[#5B7089]">
          <Filter size={14} /> Sort:
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="border border-[#E3E1D9] rounded-md px-2 py-1 text-sm">
            <option value="relevance">Relevance</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>
      {pageKey === "prices" ? (
        <div className="overflow-x-auto border border-[#E3E1D9] rounded-lg">
          <table className="w-full text-sm">
            <thead className="bg-[#F6F5F1] text-left text-[#5B7089]">
              <tr>
                <th className="p-3 font-semibold">Vehicle</th>
                <th className="p-3 font-semibold">Type</th>
                <th className="p-3 font-semibold">Price Range</th>
                <th className="p-3 font-semibold">Variants</th>
                <th className="p-3 font-semibold">Mileage / Range</th>
                <th className="p-3 font-semibold"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((v) => (
                <tr key={v.id} className="border-t border-[#E3E1D9] hover:bg-[#F6F5F1]/60">
                  <td className="p-3 font-semibold text-[#1C1C1A]">{v.name}</td>
                  <td className="p-3 text-[#5B7089]">{v.type}</td>
                  <td className="p-3 text-[#5B7089]">{v.price}</td>
                  <td className="p-3 text-[#5B7089]">{v.variants.length} variants</td>
                  <td className="p-3 text-[#5B7089]">{v.mileage}</td>
                  <td className="p-3">
                    <button onClick={() => setPage({ key: "article", id: v.id })} className="text-[#16324F] font-semibold hover:text-[#C1440E] whitespace-nowrap">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((v) => <VehicleCard key={v.id} v={v} setPage={setPage} />)}
        </div>
      )}
    </div>
  );
}

/* ============================= COMPARISONS LIST ============================= */
function ComparisonsList({ setPage }) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <SectionHeading eyebrow="Decide Faster" title="Bike & Car Comparisons" />
      <div className="grid md:grid-cols-2 gap-4">
        {COMPARISONS.map((c) => {
          const a = VEHICLES.find(v => v.id === c.aId), b = VEHICLES.find(v => v.id === c.bId);
          return (
            <button key={c.id} onClick={() => setPage({ key: "compare", id: c.id })} className="text-left border border-[#E3E1D9] rounded-lg p-5 bg-white hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <VehicleArt type={a.type} className="w-14 h-14 rounded-md shrink-0" />
                <span className="text-xs font-bold text-[#C1440E]">VS</span>
                <VehicleArt type={b.type} className="w-14 h-14 rounded-md shrink-0" />
                <div>
                  <p className="font-bold text-[#1C1C1A] text-sm">{a.name}</p>
                  <p className="font-bold text-[#1C1C1A] text-sm">{b.name}</p>
                </div>
              </div>
              <p className="text-sm text-[#5B7089] mt-3">{c.verdict}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ============================= ARTICLE DETAIL ============================= */
function ArticleDetail({ id, setPage }) {
  const v = VEHICLES.find(x => x.id === id);
  if (!v) return <div className="max-w-4xl mx-auto px-4 py-10">Article not found.</div>;
  const related = VEHICLES.filter(x => x.id !== v.id && (x.segment === v.segment || x.type === v.type)).slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <button onClick={() => setPage({ key: "reviews" })} className="text-sm text-[#5B7089] hover:text-[#16324F] flex items-center gap-1 mb-4">
        <ChevronLeft size={14} /> Back to Reviews
      </button>
      <Tag>{v.segment} · {v.type}</Tag>
      <h1 className="text-3xl md:text-4xl font-extrabold text-[#1C1C1A] mt-3 leading-tight">{v.name} Review: Specs, Price, Mileage & Verdict</h1>
      <p className="text-[#5B7089] mt-3 text-lg">{v.summary}</p>

      <VehicleArt type={v.type} className="w-full h-56 rounded-lg my-6" />

      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Price", value: v.price, icon: IndianRupee },
          { label: "Engine / Motor", value: v.engine, icon: Gauge },
          { label: "Power", value: v.power, icon: Zap },
          { label: "Mileage / Range", value: v.mileage, icon: Fuel },
        ].map((s) => (
          <div key={s.label} className="border border-[#E3E1D9] rounded-lg p-3">
            <s.icon size={16} className="text-[#C1440E] mb-1" />
            <p className="text-xs text-[#5B7089]">{s.label}</p>
            <p className="text-sm font-semibold text-[#1C1C1A]">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#F6F5F1] border border-[#E3E1D9] rounded-lg p-5 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm text-[#5B7089]">Interested in the {v.name}?</p>
            <p className="font-bold text-[#1C1C1A]">Check current offers from authorised dealers.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <CTA onClick={() => { }}>Check Price</CTA>
            <button onClick={() => { }} className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-md border border-[#16324F] text-[#16324F] hover:bg-[#16324F] hover:text-white transition-colors">
              Book Test Ride
            </button>
          </div>
        </div>
        <div className="mt-3"><AffiliateNotice /></div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-[#1C1C1A] mb-3">Specifications</h2>
        <div className="grid sm:grid-cols-2 gap-y-2 gap-x-8 text-sm border border-[#E3E1D9] rounded-lg p-4">
          {[["Engine / Motor", v.engine], ["Power / Torque", v.power], ["Top Speed", v.topSpeed], ["Kerb Weight", v.weight], ["Mileage / Range", v.mileage], ["Available Colours", v.colors.join(", ")]].map(([k, val]) => (
            <div key={k} className="flex justify-between border-b border-[#E3E1D9] py-2 sm:border-none sm:py-0">
              <span className="text-[#5B7089]">{k}</span>
              <span className="font-semibold text-[#1C1C1A] text-right">{val}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-[#1C1C1A] mb-3">Variants & Pricing</h2>
        <div className="space-y-2">
          {v.variants.map((variant, i) => (
            <div key={variant} className="flex items-center justify-between border border-[#E3E1D9] rounded-lg p-3">
              <span className="font-medium text-[#1C1C1A]">{variant}</span>
              <button onClick={() => { }} className="text-sm font-semibold text-[#16324F] hover:text-[#C1440E] flex items-center gap-1">
                View Offer <ChevronRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="grid sm:grid-cols-2 gap-6 mb-8">
        <div>
          <h3 className="font-bold text-[#1C1C1A] mb-2 flex items-center gap-2"><ThumbsUp size={16} className="text-green-700" /> Pros</h3>
          <ul className="space-y-2">
            {v.pros.map((p) => <li key={p} className="text-sm text-[#5B7089] flex gap-2"><Check size={15} className="text-green-700 shrink-0 mt-0.5" />{p}</li>)}
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-[#1C1C1A] mb-2 flex items-center gap-2"><ThumbsDown size={16} className="text-[#C1440E]" /> Cons</h3>
          <ul className="space-y-2">
            {v.cons.map((p) => <li key={p} className="text-sm text-[#5B7089] flex gap-2"><XIcon size={15} className="text-[#C1440E] shrink-0 mt-0.5" />{p}</li>)}
          </ul>
        </div>
      </section>

      <section className="mb-10 bg-white border border-[#E3E1D9] rounded-lg p-5">
        <h3 className="font-bold text-[#1C1C1A] mb-2 flex items-center gap-2"><Users size={16} className="text-[#16324F]" /> Who Is This For?</h3>
        <p className="text-sm text-[#5B7089]">{v.suitableFor}</p>
      </section>

      {related.length > 0 && (
        <section>
          <h3 className="font-bold text-[#1C1C1A] mb-3">Related Vehicles</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {related.map((r) => <VehicleCard key={r.id} v={r} setPage={setPage} />)}
          </div>
        </section>
      )}
    </div>
  );
}

/* ============================= COMPARE DETAIL ============================= */
function CompareDetail({ id, setPage }) {
  const c = COMPARISONS.find(x => x.id === id);
  if (!c) return <div className="max-w-4xl mx-auto px-4 py-10">Comparison not found.</div>;
  const a = VEHICLES.find(v => v.id === c.aId), b = VEHICLES.find(v => v.id === c.bId);
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <button onClick={() => setPage({ key: "comparisons" })} className="text-sm text-[#5B7089] hover:text-[#16324F] flex items-center gap-1 mb-4">
        <ChevronLeft size={14} /> Back to Comparisons
      </button>
      <Tag>Comparison</Tag>
      <h1 className="text-3xl font-extrabold text-[#1C1C1A] mt-3 leading-tight">{a.name} vs {b.name}: Which One Should You Buy?</h1>
      <p className="text-[#5B7089] mt-3 text-lg">{c.verdict}</p>

      <div className="grid grid-cols-2 gap-4 my-6">
        {[a, b].map((v) => (
          <div key={v.id} className="border border-[#E3E1D9] rounded-lg overflow-hidden bg-white">
            <VehicleArt type={v.type} className="h-32 w-full" />
            <div className="p-3">
              <p className="font-bold text-[#1C1C1A] text-sm">{v.name}</p>
              <p className="text-xs text-[#5B7089]">{v.price}</p>
              <button onClick={() => setPage({ key: "article", id: v.id })} className="text-xs font-semibold text-[#16324F] hover:text-[#C1440E] mt-2 flex items-center gap-1">
                Full Review <ChevronRight size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto border border-[#E3E1D9] rounded-lg mb-8">
        <table className="w-full text-sm">
          <thead className="bg-[#F6F5F1] text-[#5B7089]">
            <tr>
              <th className="p-3 text-left font-semibold">Parameter</th>
              <th className="p-3 text-left font-semibold">{a.name}</th>
              <th className="p-3 text-left font-semibold">{b.name}</th>
            </tr>
          </thead>
          <tbody>
            {c.points.map((p) => (
              <tr key={p.label} className="border-t border-[#E3E1D9]">
                <td className="p-3 font-semibold text-[#1C1C1A]">{p.label}</td>
                <td className="p-3 text-[#5B7089]">{p.a}</td>
                <td className="p-3 text-[#5B7089]">{p.b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-[#F6F5F1] border border-[#E3E1D9] rounded-lg p-5">
        <div className="flex flex-wrap gap-3 mb-3">
          <CTA onClick={() => { }}>Explore {a.name}</CTA>
          <CTA onClick={() => { }}>Explore {b.name}</CTA>
        </div>
        <AffiliateNotice />
      </div>
    </div>
  );
}

/* ============================= TRAVEL PAGES ============================= */
function TravelList({ pageKey, setPage }) {
  const data = pageKey === "roadtrips" ? TRAVEL_ARTICLES.filter(t => t.type === "Road Trip")
    : pageKey === "destinations" ? TRAVEL_ARTICLES.filter(t => t.type === "Destination")
      : TRAVEL_ARTICLES;
  const title = pageKey === "roadtrips" ? "Road Trips" : pageKey === "destinations" ? "Destinations" : "Motorcycle Travel";
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <SectionHeading eyebrow="Ride Further" title={title} />
      <div className="grid md:grid-cols-2 gap-5">
        {data.map((t) => (
          <button key={t.id} onClick={() => setPage({ key: "travel-article", id: t.id })} className="text-left border border-[#E3E1D9] rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow">
            <div className="h-36 bg-gradient-to-br from-[#16324F] to-[#2C4A6E] flex items-center justify-center">
              <MapPin size={32} className="text-white/90" />
            </div>
            <div className="p-4">
              <Tag>{t.type}</Tag>
              <h3 className="font-bold text-[#1C1C1A] mt-2">{t.title}</h3>
              <div className="flex flex-wrap gap-3 text-xs text-[#5B7089] mt-2">
                <span className="flex items-center gap-1"><Route size={12} />{t.distance}</span>
                <span className="flex items-center gap-1"><Clock size={12} />{t.duration}</span>
              </div>
              <p className="text-sm text-[#5B7089] mt-2 line-clamp-2">{t.summary}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function TravelDetail({ id, setPage }) {
  const t = TRAVEL_ARTICLES.find(x => x.id === id);
  if (!t) return <div className="max-w-4xl mx-auto px-4 py-10">Article not found.</div>;
  const bikes = t.recommendedBikes.map(id => VEHICLES.find(v => v.id === id)).filter(Boolean);
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <button onClick={() => setPage({ key: "travel" })} className="text-sm text-[#5B7089] hover:text-[#16324F] flex items-center gap-1 mb-4">
        <ChevronLeft size={14} /> Back to Travel
      </button>
      <Tag>{t.type}</Tag>
      <h1 className="text-3xl font-extrabold text-[#1C1C1A] mt-3 leading-tight">{t.title}</h1>
      <div className="h-56 rounded-lg bg-gradient-to-br from-[#16324F] to-[#2C4A6E] flex items-center justify-center my-6">
        <MapPin size={40} className="text-white/90" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[["Distance", t.distance, Route], ["Duration", t.duration, Clock], ["Difficulty", t.difficulty, Gauge], ["Best Season", t.bestSeason, Calendar]].map(([label, val, Icon]) => (
          <div key={label} className="border border-[#E3E1D9] rounded-lg p-3">
            <Icon size={16} className="text-[#C1440E] mb-1" />
            <p className="text-xs text-[#5B7089]">{label}</p>
            <p className="text-sm font-semibold text-[#1C1C1A]">{val}</p>
          </div>
        ))}
      </div>
      <p className="text-[#5B7089] mb-6 leading-relaxed">{t.summary}</p>
      <section className="mb-8">
        <h3 className="font-bold text-[#1C1C1A] mb-2">Route Highlights</h3>
        <ul className="space-y-2">
          {t.highlights.map((h) => <li key={h} className="text-sm text-[#5B7089] flex gap-2"><Check size={15} className="text-green-700 shrink-0 mt-0.5" />{h}</li>)}
        </ul>
      </section>
      <section>
        <h3 className="font-bold text-[#1C1C1A] mb-3">Recommended Motorcycles for This Route</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {bikes.map((v) => <VehicleCard key={v.id} v={v} setPage={setPage} />)}
        </div>
      </section>
    </div>
  );
}

/* ============================= NEWS ============================= */
function NewsPage({ setPage }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <SectionHeading eyebrow="Stay Updated" title="Automotive News" />
      <div className="space-y-4">
        {NEWS_ITEMS.map((n) => (
          <div key={n.id} className="border border-[#E3E1D9] rounded-lg p-4 bg-white flex gap-4">
            <div className="w-11 h-11 rounded-md bg-[#16324F] flex items-center justify-center shrink-0"><Newspaper size={18} className="text-white" /></div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Tag>{n.tag}</Tag>
                <span className="text-xs text-[#5B7089]">{n.date}</span>
              </div>
              <h3 className="font-bold text-[#1C1C1A]">{n.title}</h3>
              <p className="text-sm text-[#5B7089] mt-1">{n.summary}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================= GUIDES ============================= */
function GuidesList({ setPage }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <SectionHeading eyebrow="Know Before You Buy" title="Buying Guides" />
      <div className="space-y-4">
        {GUIDES.map((g) => (
          <button key={g.id} onClick={() => setPage({ key: "guide", id: g.id })} className="w-full text-left border border-[#E3E1D9] rounded-lg p-5 bg-white hover:shadow-md transition-shadow flex gap-4">
            <div className="w-11 h-11 rounded-md bg-[#16324F] flex items-center justify-center shrink-0"><BookOpen size={18} className="text-white" /></div>
            <div>
              <h3 className="font-bold text-[#1C1C1A]">{g.title}</h3>
              <p className="text-sm text-[#5B7089] mt-1">{g.summary}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function GuideDetail({ id, setPage }) {
  const g = GUIDES.find(x => x.id === id);
  if (!g) return <div className="max-w-4xl mx-auto px-4 py-10">Guide not found.</div>;
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <button onClick={() => setPage({ key: "guides" })} className="text-sm text-[#5B7089] hover:text-[#16324F] flex items-center gap-1 mb-4">
        <ChevronLeft size={14} /> Back to Guides
      </button>
      <Tag>Buying Guide</Tag>
      <h1 className="text-3xl font-extrabold text-[#1C1C1A] mt-3 leading-tight">{g.title}</h1>
      <p className="text-[#5B7089] mt-3 text-lg">{g.summary}</p>
      <div className="mt-6 space-y-4">
        {g.body.map((para, i) => <p key={i} className="text-[#1C1C1A] leading-relaxed">{para}</p>)}
      </div>
    </div>
  );
}

/* ============================= SEARCH RESULTS ============================= */
function SearchResults({ query, setPage }) {
  const q = query.toLowerCase();
  const results = VEHICLES.filter(v => v.name.toLowerCase().includes(q) || v.brand.toLowerCase().includes(q) || v.segment.toLowerCase().includes(q) || v.type.toLowerCase().includes(q));
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <SectionHeading eyebrow="Search Results" title={`"${query}" — ${results.length} result${results.length !== 1 ? "s" : ""}`} />
      {results.length === 0 ? (
        <p className="text-[#5B7089]">No matches found. Try a different vehicle name, brand or type.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((v) => <VehicleCard key={v.id} v={v} setPage={setPage} />)}
        </div>
      )}
    </div>
  );
}

/* ============================= STATIC PAGES ============================= */
function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Tag>About Us</Tag>
      <h1 className="text-3xl font-extrabold text-[#1C1C1A] mt-3">About RideGuide</h1>
      <div className="mt-5 space-y-4 text-[#1C1C1A] leading-relaxed">
        <p>RideGuide is an independent automotive publication covering motorcycles, scooters, cars and electric vehicles. We focus on practical, real-world buying information — specifications, pricing, variants, mileage, and honest pros and cons — alongside motorcycle travel stories from riders who've actually covered the routes.</p>
        <p>Our goal is simple: help you make a confident, informed decision, whether that's choosing between two commuter motorcycles or planning your next long-distance ride.</p>
        <p>We keep editorial content and promotional content clearly separated. Some articles include affiliate links to manufacturers, dealers or marketplaces; where they appear, they're disclosed clearly and never influence how we describe a vehicle's strengths or weaknesses.</p>
      </div>
    </div>
  );
}

function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <Tag>Contact Us</Tag>
      <h1 className="text-3xl font-extrabold text-[#1C1C1A] mt-3">Get in Touch</h1>
      <p className="text-[#5B7089] mt-3">Questions about a review, a partnership enquiry, or spotted something that needs correcting? Reach out below.</p>
      <div className="mt-6 border border-[#E3E1D9] rounded-lg p-5 bg-white flex items-center gap-3">
        <div className="w-11 h-11 rounded-md bg-[#16324F] flex items-center justify-center shrink-0"><Mail size={18} className="text-white" /></div>
        <div>
          <p className="text-xs text-[#5B7089]">Email</p>
          <a href="mailto:mahesh.bandaru679@gmail.com" className="font-semibold text-[#16324F] hover:text-[#C1440E]">mahesh.bandaru679@gmail.com</a>
        </div>
      </div>
    </div>
  );
}

function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Tag>Privacy Policy</Tag>
      <h1 className="text-3xl font-extrabold text-[#1C1C1A] mt-3">Privacy Policy</h1>
      <div className="mt-5 space-y-4 text-[#1C1C1A] leading-relaxed text-sm">
        <p>This Privacy Policy explains how RideGuide ("we", "us") collects, uses and protects information when you use this website.</p>
        <h3 className="font-bold text-base mt-4">Information We Collect</h3>
        <p>We may collect information you voluntarily provide (such as through the contact form or email), and non-personal usage data such as pages visited, browser type, and general location, typically via cookies and analytics tools.</p>
        <h3 className="font-bold text-base mt-4">How We Use Information</h3>
        <p>We use collected information to operate and improve the website, respond to enquiries, understand which content is useful to readers, and measure the performance of affiliate links.</p>
        <h3 className="font-bold text-base mt-4">Cookies</h3>
        <p>We may use cookies for analytics and to remember basic preferences. You can disable cookies through your browser settings; some features may not function as intended if you do.</p>
        <h3 className="font-bold text-base mt-4">Third-Party Links</h3>
        <p>Our articles may link to manufacturer, dealer or marketplace websites, including affiliate links. We are not responsible for the privacy practices of external sites.</p>
        <h3 className="font-bold text-base mt-4">Contact</h3>
        <p>For privacy-related questions, contact us at <a href="mailto:mahesh.bandaru679@gmail.com" className="text-[#16324F] font-semibold">mahesh.bandaru679@gmail.com</a>.</p>
      </div>
    </div>
  );
}

function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Tag>Terms & Conditions</Tag>
      <h1 className="text-3xl font-extrabold text-[#1C1C1A] mt-3">Terms & Conditions</h1>
      <div className="mt-5 space-y-4 text-[#1C1C1A] leading-relaxed text-sm">
        <p>By accessing RideGuide, you agree to the following terms.</p>
        <h3 className="font-bold text-base mt-4">Content Accuracy</h3>
        <p>We aim to keep specifications, prices and features accurate and up to date, but manufacturers may revise these without notice. Always verify current pricing, specifications and availability directly with the manufacturer or an authorised dealer before making a purchase decision.</p>
        <h3 className="font-bold text-base mt-4">Not Financial or Purchase Advice</h3>
        <p>Content on this site, including financing information, is for general informational purposes only and does not constitute financial, legal or professional advice. Consult a qualified advisor or lender for guidance specific to your situation.</p>
        <h3 className="font-bold text-base mt-4">Affiliate Relationships</h3>
        <p>Some links on this site are affiliate links. See our Affiliate Disclosure page for details. Their presence does not affect the objectivity of our editorial content.</p>
        <h3 className="font-bold text-base mt-4">Intellectual Property</h3>
        <p>Content on this site is owned by RideGuide unless otherwise credited and may not be reproduced without permission.</p>
        <h3 className="font-bold text-base mt-4">Limitation of Liability</h3>
        <p>RideGuide is not liable for decisions made based on content published on this site, including purchase decisions made using information that may have changed since publication.</p>
      </div>
    </div>
  );
}

function AffiliatePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Tag>Affiliate Disclosure</Tag>
      <h1 className="text-3xl font-extrabold text-[#1C1C1A] mt-3">Affiliate Disclosure</h1>
      <div className="mt-5 space-y-4 text-[#1C1C1A] leading-relaxed text-sm">
        <p>RideGuide participates in affiliate and referral programs with select automobile manufacturers, dealers, and marketplaces. This means that when you click certain links — such as "Check Price," "Explore Bike," "Get Details," "View Offer," "Check Availability," or "Book Test Ride" — and take a qualifying action such as an enquiry, booking or purchase, we may earn a commission or referral fee at no additional cost to you.</p>
        <p>These links only appear where they are directly relevant to the vehicle or comparison being discussed, and only when permitted under the applicable affiliate program's terms. They lead to the official pages of manufacturers, authorised dealers, marketplaces, or approved lead-generation partners.</p>
        <p>Affiliate relationships never influence how we describe a vehicle's specifications, performance, pros or cons. Our editorial opinions are formed independently of any commercial relationship.</p>
        <p>If you have questions about a specific link or partnership, contact us at <a href="mailto:mahesh.bandaru679@gmail.com" className="text-[#16324F] font-semibold">mahesh.bandaru679@gmail.com</a>.</p>
      </div>
    </div>
  );
}

/* ============================= APP ROOT ============================= */
export default function App() {
  const [page, setPage] = useState({ key: "home" });
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (q) => {
    if (!q.trim()) return;
    setSearchQuery(q);
    setPage({ key: "search" });
  };

  const goTo = (p) => {
    setPage(p);
    window.scrollTo?.(0, 0);
  };

  let content;
  switch (page.key) {
    case "home": content = <Home setPage={goTo} />; break;
    case "reviews": case "launches": case "prices": case "ev": case "best":
      content = <ListPage pageKey={page.key} setPage={goTo} />; break;
    case "comparisons": content = <ComparisonsList setPage={goTo} />; break;
    case "compare": content = <CompareDetail id={page.id} setPage={goTo} />; break;
    case "article": content = <ArticleDetail id={page.id} setPage={goTo} />; break;
    case "travel": case "roadtrips": case "destinations":
      content = <TravelList pageKey={page.key} setPage={goTo} />; break;
    case "travel-article": content = <TravelDetail id={page.id} setPage={goTo} />; break;
    case "news": content = <NewsPage setPage={goTo} />; break;
    case "guides": content = <GuidesList setPage={goTo} />; break;
    case "guide": content = <GuideDetail id={page.id} setPage={goTo} />; break;
    case "search": content = <SearchResults query={searchQuery} setPage={goTo} />; break;
    case "about": content = <AboutPage />; break;
    case "contact": content = <ContactPage />; break;
    case "privacy": content = <PrivacyPage />; break;
    case "terms": content = <TermsPage />; break;
    case "affiliate": content = <AffiliatePage />; break;
    default: content = <Home setPage={goTo} />;
  }

  return (
    <div className="min-h-screen bg-[#F6F5F1] font-sans text-[#1C1C1A]">
      <Header page={page} setPage={goTo} onSearch={handleSearch} />
      <main>{content}</main>
      <Footer setPage={goTo} />
    </div>
  );
}
