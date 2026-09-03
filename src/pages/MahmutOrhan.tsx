import { Link } from "react-router-dom";
import { Play, X } from "lucide-react";
import { useEffect, useState } from "react";
import CustomCursor from "@/components/CustomCursor";

interface Clip {
  id: number;
  src: string;
  title: string;
}

const clips: Clip[] = [
  { id: 1, src: "/mahmutorhan/1-u.mp4", title: "1 U" },
  { id: 2, src: "/mahmutorhan/2.mp4", title: "2" },
  { id: 3, src: "/mahmutorhan/2-tash.mp4", title: "2 TASH" },
  { id: 4, src: "/mahmutorhan/4.mp4", title: "4" },
  { id: 5, src: "/mahmutorhan/4-a.mp4", title: "4 A" },
  { id: 6, src: "/mahmutorhan/4-t.mp4", title: "4 T" },
  { id: 7, src: "/mahmutorhan/4-tash.mp4", title: "4 TASH" },
  { id: 8, src: "/mahmutorhan/8-astana.mp4", title: "8 ASTANA" },
  { id: 9, src: "/mahmutorhan/8-t.mp4", title: "8 T" },
  { id: 10, src: "/mahmutorhan/12.mp4", title: "12" },
];

const MahmutOrhan = () => {
  const [loaded, setLoaded] = useState(false);
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    document.body.style.overflow = activeId !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeId]);

  const activeClip = clips.find((c) => c.id === activeId) ?? null;

  return (
    <div
      className={`min-h-screen bg-background text-foreground transition-opacity duration-[1200ms] ${
        loaded ? "opacity-100" : "opacity-0"
      }`}
    >
      <CustomCursor />

      <nav className="fixed top-0 left-0 right-0 z-50 px-8 md:px-12 h-20 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-3 font-body text-[11px] tracking-[0.3em] text-muted-foreground hover:text-foreground transition-colors duration-300"
        >
          BACK
        </Link>
        <Link
          to="/"
          className="font-brand text-[11px] font-medium tracking-[0.3em] uppercase text-foreground"
        >
          PROTOTYPE MEDIA
        </Link>
      </nav>

      <header className="pt-20 md:pt-28 flex flex-col items-center justify-center relative pb-3 md:pb-4">
        <p className="font-body text-[8px] md:text-[10px] tracking-[0.3em] text-muted-foreground mb-1 md:mb-2">
          MAHMUT ORHAN
        </p>
        <h1
          className="font-display text-2xl md:text-5xl tracking-[0.04em] text-foreground text-center"
          style={{ fontWeight: 300 }}
        >
          MAHMUT ORHAN
        </h1>
      </header>

      <section className="px-4 md:px-8 pb-12 md:pb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {clips.map((clip) => (
            <ClipCard key={clip.id} clip={clip} onOpen={() => setActiveId(clip.id)} />
          ))}
        </div>
      </section>

      {activeClip && (
        <div
          className="fixed inset-0 z-[60] bg-background/95 flex items-center justify-center"
          onClick={() => setActiveId(null)}
        >
          <button
            onClick={() => setActiveId(null)}
            className="absolute top-6 right-6 z-10 text-muted-foreground hover:text-foreground transition-colors"
            style={{ cursor: "pointer" }}
          >
            <X size={22} />
          </button>
          <video
            src={activeClip.src}
            className="max-h-[90vh] max-w-[90vw]"
            style={{ aspectRatio: "9 / 16" }}
            autoPlay
            controls
            playsInline
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

const ClipCard = ({ clip, onOpen }: { clip: Clip; onOpen: () => void }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      data-cursor="expand"
      onClick={onOpen}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden aspect-[9/16] cursor-pointer"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        src={clip.src}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ transform: hovered ? "scale(1.03)" : "scale(1)" }}
      />
      <div
        className={`absolute inset-0 bg-background/40 pointer-events-none transition-opacity duration-500 ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`absolute inset-0 flex items-center justify-center z-10 pointer-events-none transition-opacity duration-500 ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <Play size={32} className="text-foreground fill-foreground/80" strokeWidth={1.5} />
      </div>
      <div className="absolute inset-0 flex items-end p-4 z-10 pointer-events-none">
        <p
          className={`font-body text-[10px] tracking-[0.3em] text-foreground transition-all duration-500 ${
            hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          {clip.title}
        </p>
      </div>
    </div>
  );
};

export default MahmutOrhan;
