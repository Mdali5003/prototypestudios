import { useEffect, useRef, useState } from "react";

const services = [
  {
    title: "MULTICAM PRODUCTION",
    description:
      "Multicam is the foundation of everything we do, and we've built it to be the most reliable, highest-quality coverage in the industry. Every set is captured across multiple synchronized angles, color graded to a cinematic standard, and delivered fast, because speed and quality aren't a trade-off for us, they're the whole point. We're creatively driven at every stage: constantly researching new rigs, camera movements, and edit techniques to make content faster to produce, more efficient to deliver, and more likely to go viral, without ever compromising on quality. That obsession with workflow shows in the numbers: when a client needs it, we can deploy up to 8 cameras and 2 drones and deliver a fully produced multicam package in under 5 hours of the event wrapping.",
  },
  {
    title: "PHOTOGRAPHY",
    description:
      "Our photography is built to convey three things at once: the energy of the room, the scale of the production, and what it actually felt like to be there. We don't just document events, we tell their story frame by frame: wide shots that capture the scale of the crowd and the stage design, tight shots that capture the raw emotion on the dancefloor, and everything in between, shot with a creative eye that sets each gallery apart from standard event coverage. Every image is chosen and edited to hit hard on social and stand on its own as a piece of work, not just a record that the event happened.",
  },
  {
    title: "AFTERMOVIES",
    description:
      "An aftermovie is the story of the night, told the way it actually felt, from the first camera flash to the last beat drop. Our team is obsessed with narrative: building a real arc into every edit instead of just stitching clips together in chronological order. We're constantly hunting for what's different, what's engaging, and what's going to cut through online, pushing new formats, pacing, and sound design into every cut so the final film feels fresh instead of formulaic, and leaves people wanting to watch it again.",
  },
];

const ServicesSection = () => {
  const [revealed, setRevealed] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
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
    <section id="services" ref={ref} className="pt-32 md:pt-44 pb-4 md:pb-6 px-8 md:px-12">
      <div className="max-w-5xl mx-auto">
        <p
          className={`font-body text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-16 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          SERVICES
        </p>

        <div>
          {services.map((s, i) => {
            const isOpen = hoveredIdx === i || openIdx === i;
            return (
              <div
                key={s.title}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                data-cursor="expand"
                className={`border-t border-[hsl(0,0%,15%)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer ${
                  revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${200 + i * 100}ms` }}
              >
                <div className="py-8 md:py-10">
                  <div className="flex items-center justify-between gap-3">
                    <h3
                      className={`font-display text-xl md:text-3xl tracking-[0.03em] transition-colors duration-300 ${
                        isOpen ? "text-foreground" : "text-muted-foreground"
                      }`}
                      style={{ fontWeight: 300 }}
                    >
                      {String(i + 1).padStart(2, "0")}. {s.title}
                    </h3>
                    <span
                      className={`font-body text-lg transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] text-muted-foreground shrink-0 ${
                        isOpen ? "rotate-45 text-foreground" : "rotate-0"
                      }`}
                    >
                      +
                    </span>
                  </div>

                  <div
                    className="grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="font-body text-[14px] md:text-[15px] leading-relaxed text-muted-foreground font-light max-w-2xl pt-5 md:pt-6">
                        {s.description}
                      </p>
                    </div>
                  </div>
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
