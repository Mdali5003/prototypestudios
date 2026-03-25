import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const HeroSection = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  // Parallax
  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const y = window.scrollY;
      const bg = sectionRef.current.querySelector("[data-parallax-bg]") as HTMLElement;
      if (bg) bg.style.transform = `translate3d(0, ${y * 0.3}px, 0) scale(1.15)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video background */}
      <div data-parallax-bg className="absolute inset-0 scale-[1.15] origin-center">
        <div className="absolute inset-0 bg-background/60 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background z-10" />
        {/* Placeholder for video — dark ambient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(0,0%,6%)] via-[hsl(0,0%,3%)] to-[hsl(0,0%,8%)]" />
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-50"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/showreel.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Content */}
      <div className="relative z-30 text-center px-6 max-w-5xl mx-auto">
        <p
          className={`font-body text-[11px] tracking-[0.4em] uppercase text-muted-foreground mb-8 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          DUBAI — GLOBAL
        </p>

        <h1
          className={`font-display text-[clamp(3rem,10vw,9rem)] leading-[0.9] tracking-[0.02em] text-foreground transition-all duration-[1400ms] delay-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ fontWeight: 300 }}
        >
          PROTOTYPE
          <br />
          STUDIOS
        </h1>

        <p
          className={`font-body text-[13px] md:text-[15px] tracking-[0.2em] text-muted-foreground mt-8 font-light transition-all duration-[1200ms] delay-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          THE NEW STANDARD IN CONTENT
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center transition-all duration-[1000ms] delay-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <ChevronDown size={18} className="text-muted-foreground animate-bounce" />
      </div>
    </section>
  );
};

export default HeroSection;
