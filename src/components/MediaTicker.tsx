import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface MediaItem {
  src: string;
  type: "video" | "photo";
  link?: string;
}

interface MediaTickerProps {
  title?: string;
  subtitle?: string;
  items: MediaItem[];
  reverse?: boolean;
  onPlaybackChange?: (open: boolean) => void;
}

const SPEED = 45; // px per second

const slugify = (src: string) =>
  src.split("/").pop()?.replace(/\.[^.]+$/, "") ?? src;

const MediaTicker = ({ title, subtitle, items, reverse, onPlaybackChange }: MediaTickerProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const halfWidthRef = useRef(0);
  const draggingRef = useRef(false);
  const pausedRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);
  const movedRef = useRef(false);
  const [doubled, setDoubled] = useState<MediaItem[]>(items);
  const [active, setActive] = useState<MediaItem | null>(null);

  useEffect(() => {
    setDoubled([...items, ...items]);
  }, [items]);

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
  }, [doubled.length, reverse]);

  const openItem = (item: MediaItem) => {
    setActive(item);
    history.replaceState(null, "", `#${slugify(item.src)}`);
    onPlaybackChange?.(true);
    pausedRef.current = false;
  };

  const closeItem = () => {
    setActive(null);
    history.replaceState(null, "", location.pathname + location.search);
    onPlaybackChange?.(false);
    pausedRef.current = false;
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return;
    draggingRef.current = true;
    movedRef.current = false;
    dragStartXRef.current = e.clientX;
    dragStartOffsetRef.current = offsetRef.current;
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
    <section className="py-4 md:py-6">
      {title && (
        <div className="w-full text-center mb-4 md:mb-6">
          <h3
            className="font-display text-xl md:text-3xl tracking-[0.05em] text-foreground"
            style={{ fontWeight: 300 }}
          >
            {title}
          </h3>
          {subtitle && (
            <p className="font-body text-[10px] md:text-[11px] tracking-[0.3em] text-muted-foreground mt-2">
              {subtitle}
            </p>
          )}
        </div>
      )}

      <div
        className="relative w-full py-6 -my-6"
        style={{
          overflowX: "hidden",
          overflowY: "visible",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
          maskImage:
            "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
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
          className="flex w-max will-change-transform cursor-grab active:cursor-grabbing select-none touch-pan-y gap-3 md:gap-4 px-3 md:px-4"
          style={{ transform: "translate3d(0,0,0)" }}
        >
          {doubled.map((item, i) => (
            <TickerCard key={`${item.src}-${i}`} item={item} onOpen={() => openItem(item)} />
          ))}
        </div>
      </div>

      {active && createPortal(<Lightbox item={active} onClose={closeItem} />, document.body)}
    </section>
  );
};

const Lightbox = ({ item, onClose }: { item: MediaItem; onClose: () => void }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[200] bg-background/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-10 animate-fade-in"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-5 right-6 md:top-8 md:right-10 text-foreground hover:text-muted-foreground transition-colors z-10"
      >
        <X size={26} strokeWidth={1.5} />
      </button>
      <div
        className="relative max-h-full max-w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {item.type === "video" && item.link ? (
          <div className="relative w-[90vw] max-w-[420px] h-[80vh] max-h-[88vh]" style={{ aspectRatio: "9 / 16" }}>
            <iframe
              src={item.link}
              className="absolute inset-0 w-full h-full border-0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        ) : item.type === "video" ? (
          <video
            src={item.src}
            autoPlay
            controls
            loop
            playsInline
            className="max-h-[88vh] max-w-full w-auto h-auto"
          />
        ) : (
          <img src={item.src} alt="" className="max-h-[88vh] max-w-full w-auto h-auto object-contain" />
        )}
      </div>
    </div>
  );
};

const TickerCard = ({ item, onOpen }: { item: MediaItem; onOpen: () => void }) => {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries[0].isIntersecting;
        setInView(visible);
        if (visible) setShouldLoad(true);
      },
      { rootMargin: "40px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (inView) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [inView, shouldLoad]);

  return (
    <div
      ref={cardRef}
      data-cursor="expand"
      onClick={onOpen}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative shrink-0 w-[150px] h-[266px] md:w-[200px] md:h-[355px] cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
      style={{
        transform: hovered ? "scale(1.14) translateY(-10px)" : "scale(1) translateY(0)",
        zIndex: hovered ? 50 : 1,
      }}
    >
      <div
        className="absolute inset-0 overflow-hidden border border-[hsl(0,0%,12%)] transition-shadow duration-500"
        style={{
          boxShadow: hovered ? "0 20px 50px -10px rgba(0,0,0,0.6)" : "0 0 0 rgba(0,0,0,0)",
        }}
      >
        {item.type === "video" && shouldLoad ? (
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="metadata"
            src={item.src}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
        ) : item.type === "photo" ? (
          <img
            src={item.src}
            alt=""
            loading="lazy"
            draggable={false}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
        ) : (
          <div className="absolute inset-0 bg-[hsl(0,0%,8%)]" />
        )}
        <div
          className={`absolute inset-0 bg-background/20 pointer-events-none transition-opacity duration-500 ${
            hovered ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>
    </div>
  );
};

export default MediaTicker;
