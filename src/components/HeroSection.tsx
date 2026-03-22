import { useEffect, useRef, useState } from "react";
import { Play, ChevronDown } from "lucide-react";

const HeroSection = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 150);
    return () => clearTimeout(t);
  }, []);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/30" />
      
      {/* Subtle grain overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div
          className={`transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            visible ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-6 blur-[4px]"
          }`}
        >
          <p className="text-primary text-sm font-semibold tracking-[0.25em] uppercase mb-6">
            Event Videography & Photography
          </p>
        </div>

        <h1
          className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight text-balance transition-all duration-[1000ms] delay-150 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            visible ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-8 blur-[4px]"
          }`}
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          YOUMAH
          <br />
          <span className="text-muted-foreground">STUDIOS</span>
        </h1>

        <p
          className={`mt-8 text-muted-foreground text-lg md:text-xl max-w-xl mx-auto text-pretty transition-all duration-[1000ms] delay-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            visible ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-6 blur-[4px]"
          }`}
        >
          Cinematic event coverage for DJs, clubs, and festivals. Full set edits, aftermovies, drone footage & more.
        </p>

        <div
          className={`mt-10 flex flex-col sm:flex-row gap-4 justify-center transition-all duration-[1000ms] delay-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            visible ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-6 blur-[4px]"
          }`}
        >
          <a
            href="#work"
            className="inline-flex items-center gap-2.5 bg-primary text-primary-foreground px-7 py-3.5 rounded-sm font-semibold text-sm tracking-wide uppercase hover:opacity-90 active:scale-[0.97] transition-all duration-150"
          >
            <Play size={16} fill="currentColor" />
            View Work
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 border border-border text-foreground px-7 py-3.5 rounded-sm font-semibold text-sm tracking-wide uppercase hover:bg-secondary/50 active:scale-[0.97] transition-all duration-150"
          >
            Get in Touch
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-muted-foreground" size={24} />
      </div>
    </section>
  );
};

export default HeroSection;
