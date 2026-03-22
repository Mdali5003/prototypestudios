import { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(true);
  const pos = useRef({ x: 0, y: 0 });
  const glow = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Only show custom cursor on desktop
    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    if (isMobile) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (hidden) setHidden(false);
    };

    const onEnter = () => setHidden(false);
    const onLeave = () => setHidden(true);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);

    // Track interactive elements
    const updateHover = () => {
      const els = document.querySelectorAll("a, button, [role='button'], input, textarea, select, [data-cursor='expand']");
      els.forEach((el) => {
        el.addEventListener("mouseenter", () => setHovering(true));
        el.addEventListener("mouseleave", () => setHovering(false));
      });
    };
    updateHover();
    const observer = new MutationObserver(updateHover);
    observer.observe(document.body, { childList: true, subtree: true });

    // Animation loop
    let raf: number;
    const animate = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }
      // Glow follows with lag
      glow.current.x += (pos.current.x - glow.current.x) * 0.08;
      glow.current.y += (pos.current.y - glow.current.y) * 0.08;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${glow.current.x}px, ${glow.current.y}px, 0)`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [hidden]);

  // Don't render on mobile
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return null;

  return (
    <>
      {/* Spotlight glow */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 mix-blend-screen"
        style={{
          width: 400,
          height: 400,
          background: "radial-gradient(circle, hsla(0, 72%, 51%, 0.06) 0%, transparent 70%)",
          opacity: hidden ? 0 : 1,
          transition: "opacity 0.3s",
        }}
      />
      {/* Cursor dot */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-200 ease-out ${
          hovering
            ? "w-12 h-12 border-primary bg-primary/10"
            : "w-3 h-3 border-primary/60 bg-primary/30"
        }`}
        style={{
          opacity: hidden ? 0 : 1,
          transition: "width 0.25s cubic-bezier(0.16,1,0.3,1), height 0.25s cubic-bezier(0.16,1,0.3,1), opacity 0.3s, border-color 0.2s, background 0.2s",
        }}
      />
      <style>{`
        @media (pointer: fine) {
          * { cursor: none !important; }
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
