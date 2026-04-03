import { useEffect, useRef, useState } from "react";

const services = [
  {
    title: "MULTICAM FULL-SET RECORDINGS",
    description: "Complete multi-angle recordings of DJ sets with professional audio sync and cinematic color grading.",
  },
  {
    title: "SHORT-FORM CONTENT",
    description: "Scroll-stopping edits optimized for Instagram, TikTok, and social platforms.",
  },
  {
    title: "EVENT PHOTOGRAPHY",
    description: "High-impact editorial stills that capture the energy, the crowd, and the culture.",
  },
  {
    title: "AFTERMOVIES",
    description: "Cinematic recap films that tell the full story of your event from open to close.",
  },
];

const ServicesSection = () => {
  const [revealed, setRevealed] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setRevealed(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" ref={ref} className="pt-32 md:pt-44 pb-16 md:pb-20 px-8 md:px-12">
      <div className="max-w-7xl mx-auto">
        <p
          className={`font-body text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-16 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          SERVICES
        </p>

        <div>
          {services.map((s, i) => {
            const isHovered = hoveredIdx === i;
            return (
              <div
                key={s.title}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`border-t border-[hsl(0,0%,15%)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${200 + i * 100}ms` }}
              >
                <div className="py-8 md:py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <h3
                    className={`font-body text-[14px] md:text-[16px] tracking-[0.15em] transition-colors duration-300 ${
                      isHovered ? "text-foreground" : "text-muted-foreground"
                    }`}
                    style={{ fontWeight: 400 }}
                  >
                    {s.title}
                  </h3>

                  <p
                    className={`font-body text-[13px] text-muted-foreground font-light max-w-md text-pretty transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isHovered ? "opacity-100 translate-x-0" : "opacity-0 md:translate-x-4"
                    }`}
                  >
                    {s.description}
                  </p>
                </div>
              </div>
            );
          })}
          {/* Bottom border */}
          <div className="border-t border-[hsl(0,0%,15%)]" />
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
