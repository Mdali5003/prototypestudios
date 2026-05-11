import { useEffect, useRef, useState } from "react";
import francisImg from "/portfolio/photos/francis-10.jpg";

const stats = [
  { value: "300+", label: "EVENTS" },
  { value: "4", label: "CONTINENTS" },
  { value: "1", label: "STANDARD" },
];

const AboutSection = () => {
  const [revealed, setRevealed] = useState(false);
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
    <section id="about" ref={ref} className="pt-4 md:pt-6 pb-4 md:pb-6 px-8 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        {/* Photo */}
        <div
          className={`aspect-[3/4] overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <img src={francisImg} alt="Francis live performance" className="w-full h-full object-cover" />
        </div>

        {/* Text */}
        <div
          className={`transition-all duration-1000 delay-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="font-body text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-8">
            ABOUT
          </p>

          <h2 className="font-display text-3xl md:text-[2.8rem] leading-[1.15] text-foreground text-balance" style={{ fontWeight: 300 }}>
            Built for the culture. Trusted by the industry.
          </h2>

          <div className="mt-8 space-y-5 font-body text-[14px] md:text-[15px] text-muted-foreground leading-[1.8] font-light text-pretty">
            <p>
              Prototype Media was founded on one belief. Nightlife deserves world class storytelling. We are a specialist production studio with a singular focus on the nightlife and events industry, producing multicam full set recordings, short form social content, editorial photography, and high production aftermovies.
            </p>
            <p>
              Across 300+ events and counting, spanning continents, cities, and the world's most respected venues, we've built a reputation for delivering content that captures more than just the moment. We capture the feeling.
            </p>
          </div>

          <p className="font-body text-[11px] tracking-[0.3em] text-muted-foreground mt-10 uppercase">
            BASED IN DUBAI. OPERATING GLOBALLY
          </p>

          {/* Stats */}
          <div className="mt-12 flex gap-12 md:gap-16">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${600 + i * 120}ms` }}
              >
                <p className="font-display text-3xl md:text-4xl text-foreground tabular-nums" style={{ fontWeight: 300 }}>
                  {s.value}
                </p>
                <p className="font-body text-[10px] tracking-[0.25em] text-muted-foreground mt-2 uppercase">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
