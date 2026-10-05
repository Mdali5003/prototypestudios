import { useParams, Link } from "react-router-dom";
import { Play, X } from "lucide-react";
import { useEffect, useState } from "react";
import CustomCursor from "@/components/CustomCursor";

interface Clip {
  id: number;
  src: string;
  title: string;
  type?: "video" | "photo";
  link?: string;
}

interface Club {
  name: string;
  subtitle: string;
  clips: Clip[];
  columns?: number;
  titleFirst?: boolean;
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
  savaya: {
    name: "SAVAYA",
    subtitle: "BALI",
    titleFirst: true,
    clips: [
      { id: 1, src: "/savaya/savaya-1.mp4", title: "&FRIENDS 1", link: "https://player.mediadelivery.net/play/626251/9cfb6945-c236-4718-ae00-6cb09586328c" },
      { id: 2, src: "/savaya/savaya-2.mp4", title: "&FRIENDS 2", link: "https://player.mediadelivery.net/play/626251/715e1fcd-c630-4ffc-afaf-c68ee2c81230" },
      { id: 3, src: "/savaya/savaya-3.mp4", title: "&FRIENDS 3", link: "https://player.mediadelivery.net/play/626251/59537903-4f21-44f0-961e-2cd956a72c6c" },
      { id: 4, src: "/savaya/savaya-4.mp4", title: "ESTA COBARDÍA — AARON SEVILLA, P RIVAS & OLIVER GIL", link: "https://player.mediadelivery.net/play/626251/fda37ff8-6b6b-4daa-8ac7-05a2cf3b73b2" },
      { id: 6, src: "/savaya/savaya-6.mp4", title: "FAVELA — AARON SEVILLA & ARKAD3", link: "https://player.mediadelivery.net/play/626251/eb94fa40-e05a-4d7e-a190-3803bdb520f1" },
      { id: 7, src: "/savaya/savaya-7.mp4", title: "FRANCIS MERCIER 9", link: "https://player.mediadelivery.net/play/626251/6f520f49-d0e3-4fcb-b51f-a3ac4026f14f" },
      { id: 8, src: "/savaya/savaya-8.mp4", title: "FRANCIS MERCIER — SAVAYA", link: "https://player.mediadelivery.net/play/626251/f5dae8f6-6d4d-4d44-82ae-7c366a2da111" },
      { id: 9, src: "/savaya/savaya-9.mp4", title: "FRANCIS MERCIER — SAVAYA 2", link: "https://player.mediadelivery.net/play/626251/d30f9436-3e02-4908-969d-f580e0ee55b9" },
      { id: 10, src: "/savaya/savaya-10.mp4", title: "ID", link: "https://player.mediadelivery.net/play/626251/3e5f3f1e-94ef-4ee2-b80d-9d470b589f36" },
      { id: 11, src: "/savaya/savaya-11.mp4", title: "&FRIENDS — REEL 9", link: "https://player.mediadelivery.net/play/626251/f0ac4165-f3cd-4606-8683-d3d38af1e253" },
      { id: 12, src: "/savaya/savaya-12.mp4", title: "AARON SEVILLA — REEL 11", link: "https://player.mediadelivery.net/play/626251/8ad4c5b5-b99c-4416-8dab-5b575441ad74" },
      { id: 13, src: "/savaya/savaya-13.mp4", title: "AARON SEVILLA — REEL 14", link: "https://player.mediadelivery.net/play/626251/82d8bb8a-f8bf-4ff3-bc16-fc523ab27cbb" },
      { id: 14, src: "/savaya/savaya-14.mp4", title: "&FRIENDS — REEL 14", link: "https://player.mediadelivery.net/play/626251/0ea2e168-77d4-46da-be94-2c1cc2899c63" },
      { id: 15, src: "/savaya/savaya-15.mp4", title: "HAYDEN JAMES", link: "https://player.mediadelivery.net/play/626251/581ce356-7f06-4244-b97f-b895e347524c" },
      { id: 16, src: "/savaya/savaya-16.mp4", title: "&FRIENDS — REEL 15", link: "https://player.mediadelivery.net/play/626251/bf299823-a72d-4c1c-9201-c1d5f39c8f9b" },
      { id: 17, src: "/savaya/savaya-17.mp4", title: "AARON SEVILLA — REEL 17", link: "https://player.mediadelivery.net/play/626251/2eb256bc-53bd-4fdc-a2f1-625bbd6e34a2" },
      { id: 18, src: "/savaya/savaya-18.mp4", title: "TIC TAC — AARON SEVILLA, FLAVOUR PLUS & FRAN PEREZ", link: "https://player.mediadelivery.net/play/626251/169f64d7-4ed8-44de-97b7-47c2882341f2" },
      { id: 19, src: "/savaya/savaya-19.mp4", title: "TUTTO BENE — AARON SEVILLA, BENY JUNIOR & SAHAR SAX", link: "https://player.mediadelivery.net/play/626251/19ddb2cb-ea05-4ca5-bad8-08dc864043f5" },
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
          to="/work"
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
        {club.titleFirst ? (
          <>
            <h1
              className="font-display text-2xl md:text-5xl tracking-[0.04em] text-foreground text-center mb-1 md:mb-2"
              style={{ fontWeight: 300 }}
            >
              {club.name}
            </h1>
            <p className="font-body text-[8px] md:text-[10px] tracking-[0.3em] text-muted-foreground">
              {club.subtitle}
            </p>
          </>
        ) : (
          <>
            <p className="font-body text-[8px] md:text-[10px] tracking-[0.3em] text-muted-foreground mb-1 md:mb-2">
              {club.subtitle}
            </p>
            <h1
              className="font-display text-2xl md:text-5xl tracking-[0.04em] text-foreground text-center"
              style={{ fontWeight: 300 }}
            >
              {club.name}
            </h1>
          </>
        )}
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
          {activeClip.link ? (
            <iframe
              src={activeClip.link}
              className="w-[90vw] h-[90vh] max-w-[500px] border-0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <video
              src={activeClip.src}
              className="max-h-[90vh] max-w-[90vw]"
              autoPlay
              controls
              playsInline
              onClick={(e) => e.stopPropagation()}
            />
          )}
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
