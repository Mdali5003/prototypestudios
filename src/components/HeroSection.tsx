import { useEffect, useRef, useState } from "react";
import { Play, ChevronDown, Volume2, VolumeX } from "lucide-react";

const HeroSection = () => {
  const [visible, setVisible] = useState(false);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 150);
    return () => clearTimeout(t);
  }, []);

  // Parallax on scroll
  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const y = window.scrollY;
      const vid = sectionRef.current.querySelector("[data-parallax-bg]") as HTMLElement;
      const content = sectionRef.current.querySelector("[data-parallax-content]") as HTMLElement;
      if (vid) vid.style.transform = `translate3d(0, ${y * 0.35}px, 0) scale(1.1)`;
      if (content) content.style.transform = `translate3d(0, ${y * 0.15}px, 0)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video background placeholder — replace src with your showreel */}
      <div data-parallax-bg className="absolute inset-0 scale-110 origin-center">
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-transparent z-10" />
        {/* Animated gradient placeholder for video */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/20 animate-pulse" />
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          autoPlay
          loop
          muted={muted}
          playsInline
          poster=""
        >
          {/* Add your showreel video source here */}
          {/* <source src="/showreel.mp4" type="video/mp4" /> */}
        </video>
      </div>

      {/* Grain overlay */}
      <div className="absolute inset-0 opacity-[0.04] z-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />

      {/* Content */}
      <div data-parallax-content className="relative z-30 max-w-5xl mx-auto px-6 text-center">
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
          className={`text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] font-bold leading-[0.92] tracking-tight text-balance transition-all duration-[1100ms] delay-150 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            visible ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-10 blur-[6px]"
          }`}
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
            className="group inline-flex items-center gap-2.5 bg-primary text-primary-foreground px-7 py-3.5 rounded-sm font-semibold text-sm tracking-wide uppercase hover:shadow-[0_0_30px_hsla(34,100%,50%,0.3)] active:scale-[0.97] transition-all duration-200"
          >
            <Play size={16} fill="currentColor" className="group-hover:scale-110 transition-transform duration-200" />
            View Showreel
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 border border-border text-foreground px-7 py-3.5 rounded-sm font-semibold text-sm tracking-wide uppercase hover:bg-secondary/50 hover:border-muted-foreground/30 active:scale-[0.97] transition-all duration-200"
          >
            Get in Touch
          </a>
        </div>
      </div>

      {/* Mute/unmute control */}
      <button
        onClick={() => setMuted(!muted)}
        className="absolute bottom-8 right-8 z-30 w-10 h-10 rounded-full bg-card/60 backdrop-blur border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 active:scale-95 transition-all duration-200"
        aria-label={muted ? "Unmute" : "Mute"}
      >
        {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2">
        <span className="text-[10px] text-muted-foreground tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-muted-foreground/30 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-primary animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
