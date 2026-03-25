import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import CustomCursor from "@/components/CustomCursor";

interface VideoItem {
  id: number;
  src: string;
  title: string;
}

const projectData: Record<string, { title: string; subtitle: string; videos: VideoItem[] }> = {
  "set-recording": {
    title: "SET RECORDING",
    subtitle: "FULL SET CAPTURE",
    videos: [
      { id: 1, src: "/portfolio/set-recording.mp4", title: "SET RECORDING 01" },
    ],
  },
  aftermovie: {
    title: "AFTERMOVIE",
    subtitle: "EVENT RECAP",
    videos: [],
  },
  "short-form": {
    title: "SHORT FORM",
    subtitle: "SOCIAL CONTENT",
    videos: [
      { id: 1, src: "/portfolio/short-form.mp4", title: "SHORT FORM 01" },
    ],
  },
  photos: {
    title: "PHOTOS",
    subtitle: "EVENT PHOTOGRAPHY",
    videos: [],
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

      {/* Video gallery grid */}
      <section className="px-4 md:px-8 pb-24">
        {project.videos.length === 0 ? (
          <div className="flex items-center justify-center py-32">
            <p className="font-body text-[11px] tracking-[0.3em] text-muted-foreground">
              COMING SOON
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {project.videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

const VideoCard = ({ video }: { video: VideoItem }) => {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div
      data-cursor="expand"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative aspect-video overflow-hidden"
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        src={video.src}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ transform: hovered ? "scale(1.03)" : "scale(1)" }}
      />
      <div
        className={`absolute inset-0 bg-background/30 transition-opacity duration-500 ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
      />
      <div className="absolute inset-0 flex items-end p-6 z-10">
        <p
          className={`font-body text-[11px] tracking-[0.3em] text-foreground transition-all duration-500 ${
            hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          {video.title}
        </p>
      </div>
    </div>
  );
};

export default ProjectDetail;
