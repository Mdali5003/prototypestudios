import { useParams, Link } from "react-router-dom";
import { Play, X } from "lucide-react";
import { useEffect, useState } from "react";
import CustomCursor from "@/components/CustomCursor";

interface Clip {
  id: number;
  src: string;
  title: string;
  link?: string;
}

interface Artist {
  name: string;
  subtitle: string;
  clips: Clip[];
}

const artists: Record<string, Artist> = {
  "mahmut-orhan": {
    name: "MAHMUT ORHAN",
    subtitle: "CENTRAL ASIA TOUR",
    clips: [
      { id: 1, src: "/mahmutorhan/mahmut-1.mp4", title: "MAHMUT ORHAN 1", link: "https://player.mediadelivery.net/play/626251/da8f2729-e563-468d-87c1-aa8b786d23ba" },
      { id: 2, src: "/mahmutorhan/mahmut-2.mp4", title: "MAHMUT ORHAN 2", link: "https://player.mediadelivery.net/play/626251/84a55271-f505-4c02-b687-83a9b79bd5c3" },
      { id: 3, src: "/mahmutorhan/mahmut-3.mp4", title: "MAHMUT ORHAN 3", link: "https://player.mediadelivery.net/play/626251/d594b406-b03d-48fb-aff7-6bc1c7a3ce89" },
      { id: 4, src: "/mahmutorhan/mahmut-4.mp4", title: "MAHMUT ORHAN 4", link: "https://player.mediadelivery.net/play/626251/274241f9-aac1-4d1b-954f-d20a74d3ce6a" },
      { id: 5, src: "/mahmutorhan/mahmut-5.mp4", title: "MAHMUT ORHAN 5", link: "https://player.mediadelivery.net/play/626251/058af243-2230-4f5f-aaca-e4a55d5e81d1" },
      { id: 6, src: "/mahmutorhan/mahmut-6.mp4", title: "MAHMUT ORHAN 6", link: "https://player.mediadelivery.net/play/626251/b2944fe6-6a8a-4c19-9625-7c52d15c03f4" },
      { id: 7, src: "/mahmutorhan/mahmut-7.mp4", title: "MAHMUT ORHAN 7", link: "https://player.mediadelivery.net/play/626251/557a4fc9-290b-4759-aa07-c06986a25bcd" },
      { id: 8, src: "/mahmutorhan/mahmut-8.mp4", title: "MAHMUT ORHAN 8", link: "https://player.mediadelivery.net/play/626251/5f3e116e-812b-4168-a22d-e9f43eeaaacd" },
      { id: 9, src: "/mahmutorhan/mahmut-9.mp4", title: "MAHMUT ORHAN 9", link: "https://player.mediadelivery.net/play/626251/8d4a482c-1dfa-4994-b8cf-024b167ede30" },
      { id: 10, src: "/mahmutorhan/mahmut-10.mp4", title: "MAHMUT ORHAN 10", link: "https://player.mediadelivery.net/play/626251/3718af8b-3bdb-4325-854e-d8375cd7a0c1" },
      { id: 11, src: "/mahmutorhan/reel-7.mp4", title: "REEL 7", link: "https://player.mediadelivery.net/play/626251/4b7ebb2e-7c03-41c0-9386-8d43b18abf3e" },
      { id: 12, src: "/mahmutorhan/reel-13.mp4", title: "REEL 13", link: "https://player.mediadelivery.net/play/626251/881a4ecc-7749-4f2a-a89e-c57239b3bef5" },
      { id: 13, src: "/mahmutorhan/reel-23.mp4", title: "REEL 23", link: "https://player.mediadelivery.net/play/626251/dc7caad2-dae0-433f-a581-a7cd7f33a069" },
      { id: 14, src: "/mahmutorhan/reel-26.mp4", title: "REEL 26", link: "https://player.mediadelivery.net/play/626251/ac8b1b62-9541-4f11-b896-016dbd0bdd18" },
    ],
  },
  "francis-mercier": {
    name: "FRANCIS MERCIER",
    subtitle: "SAVAYA BALI",
    clips: [
      { id: 1, src: "/francis-mercier/francis-mercier-1.mp4", title: "FRANCIS MERCIER 1" },
      { id: 2, src: "/francis-mercier/francis-mercier-2.mp4", title: "FRANCIS MERCIER 2" },
      { id: 3, src: "/francis-mercier/francis-mercier-3.mp4", title: "FRANCIS MERCIER 3" },
      { id: 4, src: "/francis-mercier/francis-mercier-4.mp4", title: "FRANCIS MERCIER 4" },
      { id: 5, src: "/francis-mercier/francis-mercier-5.mp4", title: "FRANCIS MERCIER 5" },
      { id: 6, src: "/francis-mercier/francis-mercier-6.mp4", title: "FRANCIS MERCIER 6" },
    ],
  },
  "aaron-sevilla": {
    name: "AARON SEVILLA",
    subtitle: "SAVAYA BALI",
    clips: [
      { id: 1, src: "/aaron-sevilla/aaron-sevilla-1.mp4", title: "AARON SEVILLA 1" },
      { id: 2, src: "/aaron-sevilla/aaron-sevilla-2.mp4", title: "AARON SEVILLA 2" },
      { id: 3, src: "/aaron-sevilla/aaron-sevilla-3.mp4", title: "AARON SEVILLA 3" },
      { id: 4, src: "/aaron-sevilla/aaron-sevilla-4.mp4", title: "AARON SEVILLA 4" },
      { id: 5, src: "/aaron-sevilla/aaron-sevilla-5.mp4", title: "AARON SEVILLA 5" },
      { id: 6, src: "/aaron-sevilla/aaron-sevilla-6.mp4", title: "AARON SEVILLA 6" },
    ],
  },
  "and-friends": {
    name: "&FRIENDS",
    subtitle: "SAVAYA BALI",
    clips: [
      { id: 1, src: "/and-friends/and-friends-1.mp4", title: "&FRIENDS 1" },
      { id: 2, src: "/and-friends/and-friends-2.mp4", title: "&FRIENDS 2" },
      { id: 3, src: "/and-friends/and-friends-3.mp4", title: "&FRIENDS 3" },
      { id: 4, src: "/and-friends/and-friends-4.mp4", title: "&FRIENDS 4" },
      { id: 5, src: "/and-friends/and-friends-5.mp4", title: "&FRIENDS 5" },
      { id: 6, src: "/and-friends/and-friends-6.mp4", title: "&FRIENDS 6" },
    ],
  },
  "hayden-james": {
    name: "HAYDEN JAMES",
    subtitle: "SAVAYA BALI",
    clips: [
      { id: 1, src: "/savaya/savaya-15.mp4", title: "HAYDEN JAMES 1", link: "https://player.mediadelivery.net/play/626251/581ce356-7f06-4244-b97f-b895e347524c" },
      { id: 2, src: "/hayden-james/hayden-james-1.mp4", title: "HAYDEN JAMES 2", link: "https://player.mediadelivery.net/play/626251/c06835cd-5d5c-4ac4-aafa-b92dc8f59291" },
      { id: 3, src: "/hayden-james/hayden-james-2.mp4", title: "HAYDEN JAMES 3", link: "https://player.mediadelivery.net/play/626251/e7995440-af10-41cd-a997-7e7bfdfb99a2" },
      { id: 4, src: "/hayden-james/hayden-james-3.mp4", title: "HAYDEN JAMES 4", link: "https://player.mediadelivery.net/play/626251/eb12708b-2dc6-404c-93df-87480859b086" },
    ],
  },
  moblack: {
    name: "MOBLACK",
    subtitle: "USHUAIA DUBAI HARBOUR",
    clips: [
      { id: 1, src: "/portfolio/sf-b3b-moblack.mp4", title: "MOBLACK 1", link: "https://player.mediadelivery.net/play/626251/82a1e26f-b954-4d40-bf67-0bdcec7e0013" },
      { id: 2, src: "/moblack/moblack-1.mp4", title: "MOBLACK 2", link: "https://player.mediadelivery.net/play/626251/463b9b1c-5a94-4670-a3a4-9b2e6f136773" },
      { id: 3, src: "/moblack/moblack-2.mp4", title: "MOBLACK 3", link: "https://player.mediadelivery.net/play/626251/69015552-726c-4a72-918c-41880526097b" },
    ],
  },
};

const ArtistDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [loaded, setLoaded] = useState(false);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [activeEmbedId, setActiveEmbedId] = useState<number | null>(null);
  const artist = slug ? artists[slug] : null;

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

  if (!artist) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-foreground font-body text-sm tracking-widest">ARTIST NOT FOUND</p>
      </div>
    );
  }

  const activeClip = artist.clips.find((c) => c.id === activeId) ?? null;

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
        <p className="font-body text-[8px] md:text-[10px] tracking-[0.3em] text-muted-foreground mb-1 md:mb-2">
          {artist.subtitle}
        </p>
        <h1
          className="font-display text-2xl md:text-5xl tracking-[0.04em] text-foreground text-center"
          style={{ fontWeight: 300 }}
        >
          {artist.name}
        </h1>
      </header>

      <section className="px-4 md:px-8 pb-12 md:pb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {artist.clips.map((clip) => (
            <ClipCard
              key={clip.id}
              clip={clip}
              onOpenModal={() => setActiveId(clip.id)}
              activeEmbedId={activeEmbedId}
              setActiveEmbedId={setActiveEmbedId}
            />
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

const ClipCard = ({
  clip,
  onOpenModal,
  activeEmbedId,
  setActiveEmbedId,
}: {
  clip: Clip;
  onOpenModal: () => void;
  activeEmbedId: number | null;
  setActiveEmbedId: (id: number | null) => void;
}) => {
  const [hovered, setHovered] = useState(false);
  const showEmbed = clip.link && activeEmbedId === clip.id;

  const handleClick = () => {
    if (clip.link) {
      setHovered(false);
      setActiveEmbedId(clip.id);
    } else {
      onOpenModal();
    }
  };

  if (showEmbed) {
    return (
      <div className="relative overflow-hidden aspect-[9/16]">
        <iframe
          src={clip.link}
          className="absolute inset-0 w-full h-full border-0 z-10"
          allow="autoplay; encrypted-media"
          allowFullScreen
          style={{ cursor: "default" }}
        />
        <button
          onClick={() => setActiveEmbedId(null)}
          className="absolute top-2 right-2 z-20 bg-background/70 rounded-full p-1 text-muted-foreground hover:text-foreground transition-colors"
          style={{ cursor: "pointer" }}
        >
          <X size={16} />
        </button>
      </div>
    );
  }

  return (
    <div
      data-cursor="expand"
      onClick={handleClick}
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

export default ArtistDetail;
