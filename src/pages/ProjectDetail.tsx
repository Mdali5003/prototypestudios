import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Play, X } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import CustomCursor from "@/components/CustomCursor";

interface MediaItem {
  id: number;
  src: string;
  title: string;
  type: "video" | "photo";
  vertical?: boolean;
  link?: string;
}

const projectData: Record<string, { title: string; subtitle: string; media: MediaItem[]; vertical?: boolean }> = {
  "set-recording": {
    title: "SET RECORDING",
    subtitle: "FULL SET CAPTURE",
    media: [
      { id: 1, src: "/portfolio/sr-b3b-moblack.mp4", title: "B3B MOBLACK", type: "video", link: "https://player.mediadelivery.net/play/626251/82a1e26f-b954-4d40-bf67-0bdcec7e0013" },
      { id: 2, src: "/portfolio/sr-aaron.mp4", title: "AARON", type: "video", link: "https://player.mediadelivery.net/play/626251/e974526f-3cbe-4ae9-a24f-132b950321e2" },
      { id: 3, src: "/portfolio/sr-amelie-2.mp4", title: "AMELIE 2", type: "video", link: "https://player.mediadelivery.net/play/626251/a188b935-55fc-4935-86b7-9900896d4d51" },
      { id: 4, src: "/portfolio/sr-klang.mp4", title: "KLANG", type: "video", link: "https://player.mediadelivery.net/play/626251/009eb744-ab92-4878-b762-26df971ea8d2" },
      { id: 5, src: "/portfolio/sr-jean-b.mp4", title: "JEAN B", type: "video", link: "https://player.mediadelivery.net/play/626251/64ee90c2-e304-4a77-b8cb-544956a9a8b2" },
      { id: 6, src: "/portfolio/sr-hilde.mp4", title: "HILDE", type: "video", link: "https://www.youtube.com/embed/7BgfGX1m4cw?si=9nfS196G7CpceSlQ" },
    ],
  },
  aftermovie: {
    title: "AFTERMOVIE",
    subtitle: "EVENT RECAP",
    media: [],
  },
  "short-form": {
    title: "SHORT FORM",
    subtitle: "SOCIAL CONTENT",
    media: [
      { id: 1, src: "/portfolio/sf-b3b-moblack.mp4", title: "B3B MOBLACK", type: "video", vertical: true, link: "https://drive.google.com/file/d/1-SRPYG8v_BDDLTg8KCvzzOF4dtZ6cO8Y/preview" },
      { id: 2, src: "/portfolio/sf-amelie.mp4", title: "AMELIE", type: "video", vertical: true, link: "https://drive.google.com/file/d/1R34fLpXyCfLJDbtSuHZKqJSlTIL0emXK/preview" },
      { id: 3, src: "/portfolio/sf-reel22.mp4", title: "REEL", type: "video", vertical: true, link: "https://drive.google.com/file/d/1NgdPJoEazQ9kjKFg8Q0A8OfSNlnnisY0/preview" },
      { id: 4, src: "/portfolio/sf-ga.mp4", title: "G&A", type: "video", vertical: true, link: "https://drive.google.com/file/d/1gwYqq1m4xamyeUXwjK6PFEf3hXeG1-EJ/preview" },
      { id: 5, src: "/portfolio/sf-honeyluv.mp4", title: "HONEYLUV", type: "video", vertical: true, link: "https://drive.google.com/file/d/1XGTdQ2OGRq-LkvtdBNzpGt40TJnSfcoe/preview" },
      { id: 6, src: "/portfolio/sf-livak.mp4", title: "LIVA K", type: "video", vertical: true, link: "https://drive.google.com/file/d/1udbBTIDat8k-fAvFg0yNG5-XUec7EnBD/preview" },
      { id: 7, src: "/portfolio/sf-hilde.mp4", title: "HILDE", type: "video", vertical: true, link: "https://drive.google.com/file/d/1gAsB7E9DE5N3bmc3xbB9dcJoQLHV15C6/preview" },
      { id: 8, src: "/portfolio/sf-ona-missrich.mp4", title: "ONA & MISS RICH", type: "video", vertical: true, link: "https://drive.google.com/file/d/1TEzPXTYE5z0TkeDy3nAHj2hOH_Q_ZPqM/preview" },
      { id: 9, src: "/portfolio/sf-arcadian.mp4", title: "ARCADIAN", type: "video", vertical: true, link: "https://drive.google.com/file/d/1LqHvrOi_AeoOp9sxGB7z5yGIxCEMsAxB/preview" },
    ],
  },
  photos: {
    title: "PHOTOS",
    subtitle: "EVENT PHOTOGRAPHY",
    media: [
      { id: 1, src: "/portfolio/photos/moblack-12.jpg", title: "MOBLACK", type: "photo" },
      { id: 2, src: "/portfolio/photos/amelie-1.png", title: "AMELIE LENS I", type: "photo" },
      { id: 3, src: "/portfolio/photos/amelie-3.png", title: "AMELIE LENS II", type: "photo" },
      { id: 4, src: "/portfolio/photos/amelie-2.png", title: "AMELIE LENS III", type: "photo" },
      { id: 5, src: "/portfolio/photos/francis-11.jpg", title: "FRANCIS", type: "photo" },
      { id: 6, src: "/portfolio/photos/liva-k.jpg", title: "LIVA K", type: "photo" },
      { id: 7, src: "/portfolio/photos/ona-22.jpg", title: "ONA", type: "photo" },
      { id: 8, src: "/portfolio/photos/afrodise-53.jpg", title: "AFRODISE", type: "photo" },
    ],
  },
};

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [loaded, setLoaded] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState<number | null>(null);
  const project = slug ? projectData[slug] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-foreground font-body text-sm tracking-widest">PROJECT NOT FOUND</p>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-background text-foreground transition-opacity duration-[1200ms] ${
        loaded ? "opacity-100" : "opacity-0"
      }`}
    >
      <CustomCursor />

      {/* Top bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 md:px-12 h-20 flex items-center justify-between">
        <Link
          to="/#work"
          className="flex items-center gap-3 font-body text-[11px] tracking-[0.3em] text-muted-foreground hover:text-foreground transition-colors duration-300"
        >
          <ArrowLeft size={14} />
          BACK
        </Link>
        <Link
          to="/"
          className="font-body text-[11px] font-medium tracking-[0.3em] uppercase text-foreground"
        >
          PROTOTYPE STUDIOS
        </Link>
      </nav>

      {/* Hero */}
      <header className="pt-20 md:pt-28 flex flex-col items-center justify-center relative pb-3 md:pb-4">
        <p className="font-body text-[8px] md:text-[10px] tracking-[0.3em] text-muted-foreground mb-1 md:mb-2">
          {project.subtitle}
        </p>
        <h1 className="font-display text-2xl md:text-5xl tracking-[0.04em] text-foreground" style={{ fontWeight: 300 }}>
          {project.title}
        </h1>
      </header>

      {/* Media gallery grid */}
      <section className="px-4 md:px-8 pb-12 md:pb-24">
        {project.media.length === 0 ? (
          <div className="flex items-center justify-center py-32">
            <p className="font-body text-[11px] tracking-[0.3em] text-muted-foreground">
              COMING SOON
            </p>
          </div>
        ) : (
          <div className={`grid gap-2 ${
            project.media.some(m => m.vertical) 
              ? "grid-cols-2 md:grid-cols-3" 
              : "grid-cols-1 md:grid-cols-2"
          }`}>
            {project.media.map((item) =>
              item.type === "video" ? (
                <VideoCard key={item.id} video={item} activeVideoId={activeVideoId} setActiveVideoId={setActiveVideoId} />
              ) : (
                <PhotoCard key={item.id} photo={item} />
              )
            )}
          </div>
        )}
      </section>
    </div>
  );
};

const VideoCard = ({ video, activeVideoId, setActiveVideoId }: { video: MediaItem; activeVideoId: number | null; setActiveVideoId: (id: number | null) => void }) => {
  const [hovered, setHovered] = useState(false);
  const showEmbed = activeVideoId === video.id;
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleClick = () => {
    if (video.link) {
      setActiveVideoId(video.id);
    }
  };

  return (
    <div
      className={`relative overflow-hidden ${video.vertical ? "aspect-[9/16]" : "aspect-video"}`}
    >
      {showEmbed && video.link ? (
        <>
          <iframe
            src={video.link}
            className="absolute inset-0 w-full h-full border-0 z-10"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
          <button
            onClick={() => setActiveVideoId(null)}
            className="absolute top-2 right-2 z-20 bg-background/70 rounded-full p-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={16} />
          </button>
        </>
      ) : (
        <div
          data-cursor="expand"
          onClick={handleClick}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="absolute inset-0 cursor-pointer"
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            src={video.src}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ transform: hovered ? "scale(1.03)" : "scale(1)" }}
          />
          <div
            className={`absolute inset-0 bg-background/40 pointer-events-none transition-opacity duration-500 ${
              hovered ? "opacity-100" : "opacity-0"
            }`}
          />
          <div className={`absolute inset-0 flex items-center justify-center z-10 pointer-events-none transition-opacity duration-500 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}>
            <Play size={40} className="text-foreground fill-foreground/80" strokeWidth={1.5} />
          </div>
        </div>
      )}
    </div>
  );
};

const PhotoCard = ({ photo }: { photo: MediaItem }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      data-cursor="expand"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden"
    >
      <img
        src={photo.src}
        alt={photo.title}
        loading="lazy"
        className="w-full h-auto object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ transform: hovered ? "scale(1.03)" : "scale(1)" }}
      />
      <div
        className={`absolute inset-0 bg-background/20 transition-opacity duration-500 ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
      />
      <div className="absolute inset-0 flex items-end p-6 z-10">
        <p
          className={`font-body text-[11px] tracking-[0.3em] text-foreground transition-all duration-500 ${
            hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          {photo.title}
        </p>
      </div>
    </div>
  );
};

export default ProjectDetail;
