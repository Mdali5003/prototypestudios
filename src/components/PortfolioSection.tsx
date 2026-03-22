import { useEffect, useRef, useState } from "react";
import { Play, Camera, Film, Plane } from "lucide-react";

const categories = ["All", "Full Set Edits", "Aftermovies", "Photos", "Drone"] as const;
type Category = (typeof categories)[number];

interface PortfolioItem {
  id: number;
  title: string;
  category: Exclude<Category, "All">;
  description: string;
  icon: typeof Play;
  aspect: string;
  gradient: string;
}

const items: PortfolioItem[] = [
  { id: 1, title: "DJ Noma — Club Vortex", category: "Full Set Edits", description: "Full 2-hour set edit with multicam angles", icon: Film, aspect: "aspect-[16/9]", gradient: "from-primary/20 to-transparent" },
  { id: 2, title: "Horizon Festival 2025", category: "Aftermovies", description: "3-day festival recap with aerial coverage", icon: Film, aspect: "aspect-[16/9]", gradient: "from-orange-900/30 to-transparent" },
  { id: 3, title: "Warehouse Sessions", category: "Photos", description: "Underground event photography series", icon: Camera, aspect: "aspect-square", gradient: "from-secondary to-transparent" },
  { id: 4, title: "Skyline NYE Party", category: "Drone", description: "Rooftop event captured from above", icon: Plane, aspect: "aspect-[16/9]", gradient: "from-blue-900/20 to-transparent" },
  { id: 5, title: "DJ Kael — Sunset Session", category: "Full Set Edits", description: "Golden hour beach set with 4K grading", icon: Film, aspect: "aspect-square", gradient: "from-amber-900/20 to-transparent" },
  { id: 6, title: "Neon Nights Vol. 3", category: "Photos", description: "Club photography with creative lighting", icon: Camera, aspect: "aspect-[4/5]", gradient: "from-purple-900/20 to-transparent" },
  { id: 7, title: "Bass Culture Recap", category: "Aftermovies", description: "High-energy aftermovie with crowd footage", icon: Film, aspect: "aspect-[16/9]", gradient: "from-red-900/20 to-transparent" },
  { id: 8, title: "Aerial Stage Reveal", category: "Drone", description: "Cinematic stage flyover before doors open", icon: Plane, aspect: "aspect-[16/9]", gradient: "from-teal-900/20 to-transparent" },
];

const PortfolioSection = () => {
  const [active, setActive] = useState<Category>("All");
  const [revealed, setRevealed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setRevealed(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const filtered = active === "All" ? items : items.filter((i) => i.category === active);

  return (
    <section id="work" ref={ref} className="py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div
          className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            revealed ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-5 blur-[3px]"
          }`}
        >
          <p className="text-primary text-sm font-semibold tracking-[0.25em] uppercase mb-3">Portfolio</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-balance" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Selected Work
          </h2>
        </div>

        {/* Filters */}
        <div
          className={`mt-8 flex flex-wrap gap-2 transition-all duration-700 delay-100 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 text-sm rounded-sm font-medium tracking-wide transition-all duration-200 active:scale-[0.96] ${
                active === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={`group relative rounded-sm overflow-hidden bg-card border border-border cursor-pointer hover:border-primary/30 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  revealed ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-6 blur-[3px]"
                }`}
                style={{ transitionDelay: revealed ? `${200 + i * 80}ms` : "0ms" }}
              >
                <div className={`${item.aspect} bg-gradient-to-br ${item.gradient} bg-secondary/50 flex items-center justify-center`}>
                  <div className="w-14 h-14 rounded-full bg-background/60 backdrop-blur flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon size={22} className="text-primary" />
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs text-primary font-medium tracking-wider uppercase">{item.category}</p>
                  <h3 className="mt-1 font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground text-pretty">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
