import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Logo {
  src: string;
  alt: string;
  link?: string;
}

// Ordered by verified Instagram follower count (highest to lowest), checked 2026-10-25.
// Re-verify before reordering again — these move; past mistakes included trusting
// guessed handles for the wrong account (e.g. a namesake with 31 followers instead
// of the real artist), so always confirm the official account first.
const logos: Logo[] = [
  { src: "/logos/mahmut-orhan.png", alt: "Mahmut Orhan", link: "/artists/mahmut-orhan" }, // 3.0M
  { src: "/logos/amelie-lens.png", alt: "Amelie Lens", link: "/artists/amelie-lens" }, // 2.8M
  { src: "/logos/lost-frequencies.png", alt: "Lost Frequencies", link: "/artists/lost-frequencies" }, // 1.4M
  { src: "/logos/shimza.webp", alt: "Shimza" }, // 1.3M
  { src: "/logos/i-hate-models.png", alt: "I Hate Models", link: "/artists/i-hate-models" }, // 1.2M
  { src: "/logos/klangunstler.jpg", alt: "Klangkuenstler", link: "/artists/klangkuenstler" }, // 927K
  { src: "/logos/aaron-sevilla.png", alt: "Aaron Sevilla", link: "/artists/aaron-sevilla" }, // 881K
  { src: "/logos/gioli-assia.png", alt: "Gioli & Assia" }, // 593K
  { src: "/logos/savaya.png", alt: "Savaya", link: "/clubs/savaya" }, // 552K
  { src: "/logos/francis-mercier.png", alt: "Francis Mercier", link: "/artists/francis-mercier" }, // 461K
  { src: "/logos/soho-garden.png", alt: "Soho Garden", link: "/clubs/soho-garden" }, // 161K
  { src: "/logos/surf-club-dubai.png", alt: "Surf Club Dubai" }, // 144K
  { src: "/logos/mo-black.png", alt: "MoBlack", link: "/artists/moblack" }, // 139K
  { src: "/logos/ushuaia.png", alt: "Ushuaia Dubai", link: "/clubs/ushuaia-dubai-harbour" }, // 135K
  { src: "/logos/honeyluv.png", alt: "Honeyluv", link: "/artists/honeyluv" }, // 124K
  { src: "/logos/armnhmr.png", alt: "ARMNHMR", link: "/artists/armnhmr" }, // 117K
  { src: "/logos/be-beach.png", alt: "Be Beach Dubai" }, // 95.8K
  { src: "/logos/vidojean.png", alt: "Vidojean", link: "/artists/vidojean" }, // 83.6K
  { src: "/logos/hayden-james.png", alt: "Hayden James", link: "/artists/hayden-james" }, // 79.3K
  { src: "/logos/ignez.png", alt: "Ignez", link: "/artists/ignez" }, // 74.9K
  { src: "/logos/atlas-super-club.png", alt: "Atlas Super Club", link: "/clubs/atlassuperclub" }, // 66.2K
  { src: "/logos/kvision.png", alt: "Kvision", link: "/artists/kvision" }, // 63.5K
];

const mid = Math.ceil(logos.length / 2);
const rowA = logos.slice(0, mid);
const rowB = logos.slice(mid);

const larger = new Set(["Ushuaia Dubai", "Klangkuenstler", "Surf Club Dubai", "Mahmut Orhan", "Be Beach Dubai", "Atlas Super Club"]);

const SPEED = 60; // px per second

const LogoTicker = () => {
  return (
    <section className="relative w-full bg-background pt-6 md:pt-8 pb-4">
      <p className="text-center font-body text-[11px] md:text-[12px] tracking-[0.3em] uppercase text-muted-foreground mb-8 md:mb-10">
        Trusted By
      </p>
      <LogoRow items={rowA} />
      <LogoRow items={rowB} reverse />
    </section>
  );
};

const LogoRow = ({ items: rowItems, reverse }: { items: Logo[]; reverse?: boolean }) => {
  const navigate = useNavigate();
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const halfWidthRef = useRef(0);
  const draggingRef = useRef(false);
  const pausedRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);
  const movedRef = useRef(false);
  const [items, setItems] = useState<Logo[]>(rowItems);

  useEffect(() => {
    setItems([...rowItems, ...rowItems]);
  }, [rowItems]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let rafId = 0;
    let lastTs = performance.now();
    const dir = reverse ? 1 : -1;

    offsetRef.current = reverse ? -1 : 0;

    const measure = () => {
      halfWidthRef.current = track.scrollWidth / 2;
      if (reverse) offsetRef.current = -halfWidthRef.current;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);

    const wrap = () => {
      const half = halfWidthRef.current;
      if (half <= 0) return;
      if (offsetRef.current <= -half * 2) offsetRef.current += half;
      if (offsetRef.current > 0) offsetRef.current -= half;
    };

    const tick = (ts: number) => {
      const dt = (ts - lastTs) / 1000;
      lastTs = ts;
      if (!draggingRef.current && !pausedRef.current) {
        offsetRef.current += dir * SPEED * dt;
        wrap();
        track.style.transform = `translate3d(${offsetRef.current}px,0,0)`;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, [items.length, reverse]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return;
    draggingRef.current = true;
    movedRef.current = false;
    dragStartXRef.current = e.clientX;
    dragStartOffsetRef.current = offsetRef.current;
    // Capture is deferred to onPointerMove (only once an actual drag is
    // detected) — capturing here unconditionally would redirect every
    // subsequent pointerup/click to the track itself, silently swallowing
    // clicks on the individual logo links.
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const track = trackRef.current;
    if (!track) return;
    const dx = e.clientX - dragStartXRef.current;
    if (Math.abs(dx) > 8 && !movedRef.current) {
      movedRef.current = true;
      if (!track.hasPointerCapture(e.pointerId)) track.setPointerCapture(e.pointerId);
    }
    offsetRef.current = dragStartOffsetRef.current + dx;
    const half = halfWidthRef.current;
    if (half > 0) {
      if (offsetRef.current <= -half * 2) offsetRef.current += half;
      if (offsetRef.current > 0) offsetRef.current -= half;
    }
    track.style.transform = `translate3d(${offsetRef.current}px,0,0)`;
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    const track = trackRef.current;
    if (track && track.hasPointerCapture(e.pointerId)) {
      track.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <div
      className="relative w-full overflow-hidden py-5 md:py-6"
      style={{
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        maskImage:
          "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
      }}
    >
      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; }}
        onClickCapture={(e) => {
          if (movedRef.current) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
        className="flex w-max will-change-transform cursor-grab active:cursor-grabbing select-none touch-pan-y"
        style={{ transform: "translate3d(0,0,0)" }}
      >
        {items.map((logo, i) => (
          <div
            key={`${logo.src}-${i}`}
            onClick={logo.link ? () => navigate(logo.link!) : undefined}
            data-cursor={logo.link ? "expand" : undefined}
            className={`flex items-center justify-center w-[200px] md:w-[260px] h-24 md:h-28 px-6 md:px-8 border-r border-[hsl(0,0%,12%)] shrink-0 ${logo.link ? "cursor-pointer" : ""}`}
          >
            <img
              src={logo.src}
              alt={logo.alt}
              loading="lazy"
              draggable={false}
              className={`${larger.has(logo.alt) ? "max-h-14 md:max-h-20" : "max-h-11 md:max-h-14"} max-w-full w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoTicker;
