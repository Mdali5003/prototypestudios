import { useEffect, useRef, useState, useCallback } from "react";
import { Play, Camera, Film, Plane, ArrowRight, ArrowLeft } from "lucide-react";

const categories = ["All", "Full Set Edits", "Aftermovies", "Photos", "Drone"] as const;
type Category = (typeof categories)[number];

interface PortfolioItem {
  id: number;
  title: string;
  category: Exclude<Category, "All">;
  description: string;
  icon: typeof Play;
  gradient: string;
  color: string;
}

const items: PortfolioItem[] = [
  { id: 1, title: "DJ Noma — Club Vortex", category: "Full Set Edits", description: "Full 2-hour set edit with multicam angles", icon: Film, gradient: "from-primary/20 via-primary/5 to-transparent", color: "text-primary" },
  { id: 2, title: "Horizon Festival 2025", category: "Aftermovies", description: "3-day festival recap with aerial coverage", icon: Film, gradient: "from-orange-800/30 via-orange-900/10 to-transparent", color: "text-orange-400" },
  { id: 3, title: "Warehouse Sessions", category: "Photos", description: "Underground event photography series", icon: Camera, gradient: "from-secondary via-secondary/50 to-transparent", color: "text-muted-foreground" },
  { id: 4, title: "Skyline NYE Party", category: "Drone", description: "Rooftop event captured from above", icon: Plane, gradient: "from-blue-900/25 via-blue-900/10 to-transparent", color: "text-blue-400" },
  { id: 5, title: "DJ Kael — Sunset Session", category: "Full Set Edits", description: "Golden hour beach set with 4K grading", icon: Film, gradient: "from-amber-900/25 via-amber-900/10 to-transparent", color: "text-amber-400" },
  { id: 6, title: "Neon Nights Vol. 3", category: "Photos", description: "Club photography with creative lighting", icon: Camera, gradient: "from-fuchsia-900/20 via-fuchsia-900/5 to-transparent", color: "text-fuchsia-400" },
  { id: 7, title: "Bass Culture Recap", category: "Aftermovies", description: "High-energy aftermovie with crowd footage", icon: Film, gradient: "from-red-900/25 via-red-900/10 to-transparent", color: "text-red-400" },
  { id: 8, title: "Aerial Stage Reveal", category: "Drone", description: "Cinematic stage flyover before doors open", icon: Plane, gradient: "from-teal-900/25 via-teal-900/10 to-transparent", color: "text-teal-400" },
];

const PortfolioSection = () => {
  const [active, setActive] = useState<Category>("All");
  const [revealed, setRevealed] = useState(false);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef({ startX: 0, scrollLeft: 0, dragging: false });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setRevealed(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const updateScrollButtons = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollButtons, { passive: true });
    updateScrollButtons();
    return () => el.removeEventListener("scroll", updateScrollButtons);
  }, [updateScrollButtons, active]);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.7;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  // Drag to scroll
  const onMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    dragState.current = { startX: e.pageX, scrollLeft: scrollRef.current.scrollLeft, dragging: true };
    setIsDragging(false);
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragState.current.dragging || !scrollRef.current) return;
    e.preventDefault();
    const dx = e.pageX - dragState.current.startX;
    if (Math.abs(dx) > 5) setIsDragging(true);
    scrollRef.current.scrollLeft = dragState.current.scrollLeft - dx;
  };
  const onMouseUp = () => { dragState.current.dragging = false; };

  const filtered = active === "All" ? items : items.filter((i) => i.category === active);

  return (
    <section id="work" ref={ref} className="py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div
          className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            revealed ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-5 blur-[3px]"
          }`}
        >
          <p className="text-primary text-sm font-semibold tracking-[0.25em] uppercase mb-3">Portfolio</p>
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-balance">
              Selected Work
            </h2>
            <div className="hidden md:flex gap-2">
              <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 disabled:opacity-20 active:scale-95 transition-all duration-200"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 disabled:opacity-20 active:scale-95 transition-all duration-200"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
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
                  ? "bg-primary text-primary-foreground shadow-[0_0_20px_hsla(34,100%,50%,0.15)]"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Horizontal scroll gallery */}
      <div
        ref={scrollRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        className={`mt-10 flex gap-5 overflow-x-auto px-6 md:px-12 pb-4 scrollbar-hide select-none transition-all duration-700 delay-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none", cursor: isDragging ? "grabbing" : "grab" }}
      >
        {filtered.map((item, i) => {
          const Icon = item.icon;
          const isHovered = hoveredId === item.id;
          return (
            <div
              key={item.id}
              data-cursor="expand"
              onMouseEnter={() => !isDragging && setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative flex-none w-[320px] sm:w-[380px] md:w-[440px] rounded-sm overflow-hidden bg-card border border-border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                borderColor: isHovered ? "hsla(34, 100%, 50%, 0.2)" : undefined,
                transitionDelay: `${i * 60}ms`,
              }}
            >
              {/* Thumbnail area */}
              <div className="relative aspect-[16/10] bg-gradient-to-br bg-secondary/50 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`} />
                
                {/* Play overlay on hover */}
                <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}>
                  <div className="w-16 h-16 rounded-full bg-primary/90 backdrop-blur flex items-center justify-center shadow-[0_0_40px_hsla(34,100%,50%,0.3)]">
                    <Play size={24} fill="hsl(var(--primary-foreground))" className="text-primary-foreground ml-1" />
                  </div>
                </div>

                {/* Category pill */}
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-semibold tracking-[0.2em] uppercase bg-background/70 backdrop-blur-sm text-foreground px-2.5 py-1 rounded-sm">
                    {item.category}
                  </span>
                </div>

                {/* Icon */}
                <div className={`absolute bottom-3 right-3 w-9 h-9 rounded-full bg-background/40 backdrop-blur flex items-center justify-center transition-transform duration-300 ${
                  isHovered ? "scale-0" : "scale-100"
                }`}>
                  <Icon size={16} className={item.color} />
                </div>

                {/* Hover zoom effect on the gradient */}
                <div className={`absolute inset-0 bg-gradient-to-t from-background/80 to-transparent transition-opacity duration-300 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`} />
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="font-semibold text-foreground text-base">{item.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground text-pretty leading-relaxed">{item.description}</p>
                
                {/* Expand on hover */}
                <div className={`flex items-center gap-1.5 mt-3 text-primary text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                  isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                }`}>
                  Watch Now <ArrowRight size={12} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PortfolioSection;
