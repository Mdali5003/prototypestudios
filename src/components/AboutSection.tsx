import { useEffect, useRef, useState } from "react";

const stats = [
  { value: "120+", label: "Events Covered" },
  { value: "45+", label: "DJ Collaborations" },
  { value: "3", label: "Countries" },
];

const AboutSection = () => {
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
    <section id="about" ref={ref} className="py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Photo placeholder */}
        <div
          className={`aspect-[4/5] rounded-sm bg-gradient-to-br from-secondary to-card border border-border overflow-hidden flex items-end justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            revealed ? "opacity-100 translate-x-0 blur-0" : "opacity-0 -translate-x-8 blur-[3px]"
          }`}
        >
          <div className="p-8 text-center">
            <p className="text-muted-foreground text-sm">Your photo here</p>
          </div>
        </div>

        {/* Text */}
        <div
          className={`transition-all duration-700 delay-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            revealed ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-6 blur-[3px]"
          }`}
        >
          <p className="text-primary text-sm font-semibold tracking-[0.25em] uppercase mb-3">About</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            The person behind the lens
          </h2>
          <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed text-pretty">
            <p>
              Youmah Studios is built on a passion for music and visual storytelling. I specialize in capturing the raw energy of live events — from intimate club nights to large-scale festivals.
            </p>
            <p>
              Every project gets the same treatment: cinematic color grading, tight editing, and a turnaround that respects your timeline. Whether it's a full DJ set edit, an aftermovie, or aerial coverage, the goal is always the same — make it look and feel as good as it sounded.
            </p>
          </div>

          {/* Stats */}
          <div className="mt-10 flex gap-8">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: revealed ? `${400 + i * 100}ms` : "0ms" }}
              >
                <p className="text-2xl md:text-3xl font-bold text-foreground tabular-nums">{s.value}</p>
                <p className="text-xs text-muted-foreground tracking-wider uppercase mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
