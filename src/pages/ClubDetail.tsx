import { useParams, Link } from "react-router-dom";
import { Play, X } from "lucide-react";
import { useEffect, useState } from "react";
import CustomCursor from "@/components/CustomCursor";

interface Clip {
  id: number;
  src: string;
  title: string;
  type?: "video" | "photo";
}

interface Club {
  name: string;
  subtitle: string;
  clips: Clip[];
  columns?: number;
}

const clubs: Record<string, Club> = {
  atlassuperclub: {
    name: "ATLAS SUPER CLUB",
    subtitle: "BALI",
    clips: [
      { id: 1, src: "/atlassuperclub/atlassuperclub-1.mp4", title: "HENRY FONG 1" },
      { id: 2, src: "/atlassuperclub/atlassuperclub-2.mp4", title: "HENRY FONG 2" },
      { id: 3, src: "/atlassuperclub/atlassuperclub-3.mp4", title: "SYLK 1" },
      { id: 4, src: "/atlassuperclub/atlassuperclub-4.mp4", title: "SYLK 2" },
      { id: 5, src: "/atlassuperclub/atlassuperclub-5.mp4", title: "FIREBEATZ 1" },
      { id: 6, src: "/atlassuperclub/atlassuperclub-6.mp4", title: "FIREBEATZ 2" },
    ],
  },
  "ushuaia-dubai-harbour": {
    name: "USHUAIA",
    subtitle: "DUBAI HARBOUR",
    columns: 3,
    clips: [
      { id: 1, src: "/ushuaia-dubai-harbour/ushuaia-1.png", title: "USHUAIA 1", type: "photo" },
      { id: 2, src: "/ushuaia-dubai-harbour/ushuaia-2.png", title: "USHUAIA 2", type: "photo" },
      { id: 3, src: "/ushuaia-dubai-harbour/ushuaia-3.png", title: "USHUAIA 3", type: "photo" },
      { id: 4, src: "/ushuaia-dubai-harbour/ushuaia-4.mp4", title: "USHUAIA 4", type: "video" },
      { id: 5, src: "/ushuaia-dubai-harbour/ushuaia-5.mp4", title: "USHUAIA 5", type: "video" },
      { id: 6, src: "/ushuaia-dubai-harbour/ushuaia-6.mp4", title: "USHUAIA 6", type: "video" },
      { id: 7, src: "/ushuaia-dubai-harbour/ushuaia-7.mp4", title: "USHUAIA 7", type: "video" },
      { id: 8, src: "/ushuaia-dubai-harbour/ushuaia-8.mp4", title: "USHUAIA 8", type: "video" },
      { id: 9, src: "/ushuaia-dubai-harbour/ushuaia-9.mp4", title: "USHUAIA 9", type: "video" },
    ],
  },
};

const ClubDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [loaded, setLoaded] = useState(false);
  const [activeId, setActiveId] = useState<number | null>(null);
  const club = slug ? clubs[slug] : null;

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

  if (!club) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-foreground font-body text-sm tracking-widest">CLUB NOT FOUND</p>
      </div>
    );
  }

  const activeClip = club.clips.find((c) => c.id === activeId && c.type !== "photo") ?? null;
  const gridCols = club.columns ?? 4;

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
          {club.subtitle}
        </p>
        <h1
          className="font-display text-2xl md:text-5xl tracking-[0.04em] text-foreground text-center"
          style={{ fontWeight: 300 }}
        >
          {club.name}
        </h1>
      </header>

      <section className="px-4 md:px-8 pb-12 md:pb-24">
        <div
          className={`grid gap-2 ${
            gridCols === 3 ? "grid-cols-3" : "grid-cols-2 md:grid-cols-4"
          }`}
        >
          {club.clips.map((clip) =>
            clip.type === "photo" ? (
              <PhotoCard key={clip.id} clip={clip} square={gridCols === 3} />
            ) : (
              <ClipCard
                key={clip.id}
                clip={clip}
                square={gridCols === 3}
                onOpen={() => setActiveId(clip.id)}
              />
            )
          )}
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

const ClipCard = ({
  clip,
  onOpen,
  square,
}: {
  clip: Clip;
  onOpen: () => void;
  square?: boolean;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      data-cursor="expand"
      onClick={onOpen}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative overflow-hidden cursor-pointer ${square ? "aspect-square" : "aspect-[9/16]"}`}
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

const PhotoCard = ({ clip, square }: { clip: Clip; square?: boolean }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      data-cursor="expand"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative overflow-hidden ${square ? "aspect-square" : "aspect-[3/4]"}`}
    >
      <img
        src={clip.src}
        alt={clip.title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ transform: hovered ? "scale(1.03)" : "scale(1)" }}
      />
      <div
        className={`absolute inset-0 bg-background/20 transition-opacity duration-500 ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
      />
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

export default ClubDetail;
