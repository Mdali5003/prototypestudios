import { useEffect, useRef, useState } from "react";
import { Film, Camera, Clapperboard, Plane } from "lucide-react";

const services = [
  {
    icon: Film,
    title: "Full Set Edits",
    description: "Multicam DJ set edits with professional color grading, audio sync, and dynamic cuts that capture the energy of the performance.",
  },
  {
    icon: Camera,
    title: "Event Photography",
    description: "High-impact stills from clubs, festivals, and private events. Delivered within 48 hours, fully edited and ready to post.",
  },
  {
    icon: Clapperboard,
    title: "Aftermovies",
    description: "Cinematic recap videos that tell the story of your event — from setup to the final track. Built for social and promo use.",
  },
  {
    icon: Plane,
    title: "Drone Footage",
    description: "Licensed aerial cinematography for venue reveals, festival overviews, and dramatic establishing shots.",
  },
];

const ServicesSection = () => {
  const [revealed, setRevealed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setRevealed(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" ref={ref} className="py-24 md:py-32 px-6 md:px-12 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div
          className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            revealed ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-5 blur-[3px]"
          }`}
        >
          <p className="text-primary text-sm font-semibold tracking-[0.25em] uppercase mb-3">What I Do</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-balance" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Services
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-xl text-pretty">
            End-to-end content production for the nightlife and events industry.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className={`group p-6 md:p-8 rounded-sm bg-card border border-border hover:border-primary/25 transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  revealed ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-6 blur-[3px]"
                }`}
                style={{ transitionDelay: revealed ? `${200 + i * 100}ms` : "0ms" }}
              >
                <div className="w-11 h-11 rounded-sm bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-300">
                  <Icon size={20} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed text-pretty">{s.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
