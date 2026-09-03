import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Logo {
  src: string;
  alt: string;
  link?: string;
}

const logos: Logo[] = [
  { src: "/logos/savaya.png", alt: "Savaya" },
  { src: "/logos/ushuaia.png", alt: "Ushuaia Dubai" },
  { src: "/logos/soho-garden.png", alt: "Soho Garden" },
  { src: "/logos/surf-club-dubai.png", alt: "Surf Club Dubai" },
  { src: "/logos/klangunstler.jpg", alt: "Klangkuenstler" },
  { src: "/logos/amelie-lens.png", alt: "Amelie Lens" },
  { src: "/logos/francis-mercier.png", alt: "Francis Mercier" },
  { src: "/logos/mo-black.png", alt: "MoBlack" },
  { src: "/logos/gioli-assia.png", alt: "Gioli & Assia" },
  { src: "/logos/aaron-sevilla.png", alt: "Aaron Sevilla" },
  { src: "/logos/i-hate-models.png", alt: "I Hate Models" },
  { src: "/logos/shimza.webp", alt: "Shimza" },
  { src: "/logos/mahmut-orhan.png", alt: "Mahmut Orhan", link: "/mahmutorhan" },
  { src: "/logos/be-beach.png", alt: "Be Beach Dubai" },
  { src: "/logos/atlas-super-club.png", alt: "Atlas Super Club" },
];

const SPEED = 60; // px per second

const LogoTicker = () => {
  const navigate = useNavigate();
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const halfWidthRef = useRef(0);
  const draggingRef = useRef(false);
  const pausedRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);
  const movedRef = useRef(false);
  const [items, setItems] = useState<Logo[]>(logos);

  useEffect(() => {
    setItems([...logos, ...logos]);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let rafId = 0;
    let lastTs = performance.now();

    const measure = () => {
      halfWidthRef.current = track.scrollWidth / 2;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);

    const wrap = () => {
      const half = halfWidthRef.current;
      if (half <= 0) return;
      if (offsetRef.current <= -half) offsetRef.current += half;
      if (offsetRef.current > 0) offsetRef.current -= half;
    };

    const tick = (ts: number) => {
      const dt = (ts - lastTs) / 1000;
      lastTs = ts;
      if (!draggingRef.current && !pausedRef.current) {
        offsetRef.current -= SPEED * dt;
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
  }, [items.length]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return;
    draggingRef.current = true;
    movedRef.current = false;
    dragStartXRef.current = e.clientX;
    dragStartOffsetRef.current = offsetRef.current;
    track.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const track = trackRef.current;
    if (!track) return;
    const dx = e.clientX - dragStartXRef.current;
    if (Math.abs(dx) > 8) movedRef.current = true;
    offsetRef.current = dragStartOffsetRef.current + dx;
    const half = halfWidthRef.current;
    if (half > 0) {
      if (offsetRef.current <= -half) offsetRef.current += half;
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
    <section
      className="relative w-full overflow-hidden bg-background py-5 md:py-6"
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
        {items.map((logo, i) => {
          const larger = ["Ushuaia Dubai", "Klangkuenstler", "Surf Club Dubai", "Mahmut Orhan", "Be Beach Dubai", "Atlas Super Club"].includes(logo.alt);
          return (
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
                className={`${larger ? "max-h-14 md:max-h-20" : "max-h-11 md:max-h-14"} max-w-full w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default LogoTicker;
