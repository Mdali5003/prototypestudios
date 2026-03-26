import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Play } from "lucide-react";
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
      { id: 1, src: "/portfolio/set-recording.mp4", title: "SET RECORDING 01", type: "video" },
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
      { id: 1, src: "/portfolio/sf-francis.mp4", title: "FRANCIS", type: "video", vertical: true, link: "https://drive.google.com/file/d/12j-HijYSfPF_37-_J3leGQvgd520l0cy/preview" },
      { id: 2, src: "/portfolio/sf-moblack.mp4", title: "MOBLACK", type: "video", vertical: true, link: "https://drive.google.com/file/d/1-gqAw1G14x9cBF5Kk9_Y2pvvXDhHqA2Q/preview" },
      { id: 3, src: "/portfolio/sf-livak.mp4", title: "LIVA K", type: "video", vertical: true, link: "https://drive.google.com/file/d/1udbBTIDat8k-fAvFg0yNG5-XUec7EnBD/preview" },
      { id: 4, src: "/portfolio/sf-hilde.mp4", title: "HILDE", type: "video", vertical: true, link: "https://drive.google.com/file/d/1gAsB7E9DE5N3bmc3xbB9dcJoQLHV15C6/preview" },
      { id: 5, src: "/portfolio/sf-ga.mp4", title: "G&A", type: "video", vertical: true, link: "https://drive.google.com/file/d/1gwYqq1m4xamyeUXwjK6PFEf3hXeG1-EJ/preview" },
      { id: 6, src: "/portfolio/sf-ona-missrich.mp4", title: "ONA & MISS RICH", type: "video", vertical: true, link: "https://drive.google.com/file/d/1TEzPXTYE5z0TkeDy3nAHj2hOH_Q_ZPqM/preview" },
      { id: 7, src: "/portfolio/sf-arcadian.mp4", title: "ARCADIAN", type: "video", vertical: true, link: "https://drive.google.com/file/d/1LqHvrOi_AeoOp9sxGB7z5yGIxCEMsAxB/preview" },
      { id: 8, src: "/portfolio/sf-honeyluv.mp4", title: "HONEYLUV", type: "video", vertical: true, link: "https://drive.google.com/file/d/1XGTdQ2OGRq-LkvtdBNzpGt40TJnSfcoe/preview" },
      { id: 9, src: "/portfolio/sf-amelie.mp4", title: "AMELIE", type: "video", vertical: true, link: "https://drive.google.com/file/d/1R34fLpXyCfLJDbtSuHZKqJSlTIL0emXK/preview" },
      { id: 10, src: "/portfolio/sf-reel22.mp4", title: "REEL", type: "video", vertical: true, link: "https://drive.google.com/file/d/1NgdPJoEazQ9kjKFg8Q0A8OfSNlnnisY0/preview" },
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
      <header className="h-[60vh] flex flex-col items-center justify-center relative">
        <p className="font-body text-[11px] tracking-[0.3em] text-muted-foreground mb-4">
          {project.subtitle}
        </p>
        <h1 className="font-display text-5xl md:text-7xl tracking-[0.04em] text-foreground" style={{ fontWeight: 300 }}>
          {project.title}
        </h1>
      </header>

      {/* Media gallery grid */}
      <section className="px-4 md:px-8 pb-24">
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
                <VideoCard key={item.id} video={item} />
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

const VideoCard = ({ video }: { video: MediaItem }) => {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleClick = () => {
    if (video.link) {
      window.open(video.link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      data-cursor="expand"
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative overflow-hidden cursor-pointer ${video.vertical ? "aspect-[9/16]" : "aspect-video"}`}
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
