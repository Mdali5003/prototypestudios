import { useEffect, useRef, useState } from "react";
import { Film, Camera, Clapperboard, Plane, ArrowUpRight } from "lucide-react";

const services = [
  {
    icon: Film,
    title: "Full Set Edits",
    description: "Multicam DJ set edits with professional color grading, audio sync, and dynamic cuts that capture the energy of the performance.",
    stat: "2–4 hour sets",
  },
  {
    icon: Camera,
    title: "Event Photography",
    description: "High-impact stills from clubs, festivals, and private events. Delivered within 48 hours, fully edited and ready to post.",
    stat: "48hr delivery",
  },
  {
    icon: Clapperboard,
    title: "Aftermovies",
    description: "Cinematic recap videos that tell the story of your event — from setup to the final track. Built for social and promo use.",
    stat: "60–90s edits",
  },
  {
    icon: Plane,
    title: "Drone Footage",
    description: "Licensed aerial cinematography for venue reveals, festival overviews, and dramatic establishing shots.",
    stat: "4K aerial",
  },
];

const ServicesSection = () => {
  const [revealed, setRevealed] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setRevealed(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" ref={ref} className="py-24 md:py-32 px-6 md:px-12 bg-secondary/30 relative overflow-hidden">
      {/* Subtle background element */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary/[0.02] rounded-full blur-[120px]" />
      
      <div className="max-w-7xl mx-auto relative">
        <div
          className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            revealed ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-5 blur-[3px]"
          }`}
        >
          <p className="text-primary text-sm font-semibold tracking-[0.25em] uppercase mb-3">What I Do</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-balance">
            Services
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-xl text-pretty">
            End-to-end content production for the nightlife and events industry.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-px bg-border rounded-sm overflow-hidden">
          {services.map((s, i) => {
            const Icon = s.icon;
            const isHovered = hoveredIdx === i;
            return (
              <div
                key={s.title}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`relative p-8 md:p-10 bg-card transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group ${
                  revealed ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-6 blur-[3px]"
                }`}
                style={{ transitionDelay: revealed ? `${200 + i * 100}ms` : "0ms" }}
              >
                {/* Hover background glow */}
                <div className={`absolute inset-0 bg-gradient-to-br from-primary/[0.04] to-transparent transition-opacity duration-500 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`} />

                <div className="relative">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center transition-all duration-300 ${
                      isHovered ? "bg-primary/20 shadow-[0_0_20px_hsla(0,72%,51%,0.1)]" : ""
                    }`}>
                      <Icon size={22} className="text-primary" />
                    </div>
                    <ArrowUpRight 
                      size={18} 
                      className={`text-primary transition-all duration-300 ${
                        isHovered ? "opacity-100 translate-x-0 -translate-y-0" : "opacity-0 -translate-x-1 translate-y-1"
                      }`} 
                    />
                  </div>
                  
                  <h3 className="text-lg font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed text-pretty">{s.description}</p>
                  
                  <div className={`mt-4 inline-block text-[11px] font-semibold tracking-[0.2em] uppercase text-primary/70 transition-all duration-300 ${
                    isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
                  }`}>
                    {s.stat}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
