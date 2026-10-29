import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import CustomCursor from "@/components/CustomCursor";
import { useSEO } from "@/hooks/useSEO";

interface Card {
  slug: string;
  name: string;
  subtitle: string;
  photo: string;
}

const artists: Card[] = [
  { slug: "mahmut-orhan", name: "MAHMUT ORHAN", subtitle: "CENTRAL ASIA TOUR", photo: "/artists/mahmut-orhan.jpg" },
  { slug: "amelie-lens", name: "AMELIE LENS", subtitle: "SOHO GARDEN HIVE", photo: "/artists/amelie-lens.jpg" },
  { slug: "carl-cox", name: "CARL COX", subtitle: "PACHA ICONS DUBAI", photo: "/artists/carl-cox.jpg" },
  { slug: "robin-schulz", name: "ROBIN SCHULZ", subtitle: "BOHEMIA BY FIVE DUBAI", photo: "/artists/robin-schulz.jpg" },
  { slug: "lost-frequencies", name: "LOST FREQUENCIES", subtitle: "BOHEMIA BY FIVE DUBAI", photo: "/artists/lost-frequencies.jpg" },
  { slug: "i-hate-models", name: "I HATE MODELS", subtitle: "SOHO GARDEN HIVE", photo: "/artists/i-hate-models.jpg" },
  { slug: "klangkuenstler", name: "KLANGKUENSTLER", subtitle: "SOHO GARDEN HIVE", photo: "/artists/klangkuenstler.jpg" },
  { slug: "aaron-sevilla", name: "AARON SEVILLA", subtitle: "SAVAYA BALI", photo: "/artists/aaron-sevilla.jpg" },
  { slug: "francis-mercier", name: "FRANCIS MERCIER", subtitle: "SAVAYA BALI", photo: "/artists/francis-mercier.jpg" },
  { slug: "itschyll", name: "ITSCHYLL", subtitle: "&FRIENDS FESTIVAL, MANILA", photo: "/artists/itschyll.jpg" },
  { slug: "moblack", name: "MOBLACK", subtitle: "USHUAIA DUBAI HARBOUR", photo: "/artists/moblack.jpg" },
  { slug: "honeyluv", name: "HONEYLUV", subtitle: "MINISTRY OF SOUND, DUBAI", photo: "/artists/honeyluv.jpg" },
  { slug: "armnhmr", name: "ARMNHMR", subtitle: "&FRIENDS FESTIVAL, MANILA", photo: "/artists/armnhmr.jpg" },
  { slug: "and-friends", name: "&FRIENDS", subtitle: "SAVAYA BALI", photo: "/artists/and-friends.jpg" },
  { slug: "vidojean", name: "VIDOJEAN", subtitle: "INDIA TOUR", photo: "/artists/vidojean.jpg" },
  { slug: "hayden-james", name: "HAYDEN JAMES", subtitle: "SAVAYA BALI", photo: "/artists/hayden-james.jpg" },
  { slug: "ignez", name: "IGNEZ", subtitle: "", photo: "/artists/ignez.jpg" },
];

const venues: Card[] = [
  { slug: "ushuaia-dubai-harbour", name: "USHUAIA", subtitle: "DUBAI HARBOUR", photo: "/venues/ushuaia-dubai-harbour.jpg" },
  { slug: "savaya", name: "SAVAYA", subtitle: "BALI", photo: "/venues/savaya.jpg" },
  { slug: "atlassuperclub", name: "ATLAS SUPER CLUB", subtitle: "BALI", photo: "/venues/atlassuperclub.jpg" },
  { slug: "soho-garden", name: "SOHO GARDEN", subtitle: "DUBAI", photo: "/venues/soho-garden.jpg" },
  { slug: "pacha-icons-dubai", name: "PACHA ICONS", subtitle: "DUBAI", photo: "/venues/pacha-icons-dubai.jpg" },
  { slug: "bohemia-by-five-dubai", name: "BOHEMIA BY FIVE", subtitle: "DUBAI", photo: "/venues/bohemia-by-five-dubai.jpg" },
];

const Work = () => {
  const [loaded, setLoaded] = useState(false);

  useSEO({
    title: "Our Work — Multicam Coverage & Venues",
    description:
      "Multicam coverage for Mahmut Orhan, Carl Cox, Amelie Lens and more, at venues including Ushuaia Dubai Harbour, Savaya Bali, and Pacha Icons Dubai. Browse the full portfolio.",
    path: "/work",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

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

      <header className="pt-20 md:pt-28 flex flex-col items-center justify-center relative pb-6 md:pb-10">
        <h1
          className="font-display text-2xl md:text-5xl tracking-[0.04em] text-foreground text-center"
          style={{ fontWeight: 300 }}
        >
          WORK
        </h1>
      </header>

      <CardSection label="ARTISTS" basePath="/artists" cards={artists} />
      <CardSection label="VENUES" basePath="/clubs" cards={venues} />
    </div>
  );
};

const CardSection = ({ label, basePath, cards }: { label: string; basePath: string; cards: Card[] }) => (
  <section className="px-4 md:px-8 pb-12 md:pb-20">
    <p className="font-body text-[10px] md:text-[11px] tracking-[0.3em] text-muted-foreground mb-4 md:mb-6 text-center">
      {label}
    </p>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
      {cards.map((card) => (
        <CardTile key={card.slug} card={card} to={`${basePath}/${card.slug}`} />
      ))}
    </div>
  </section>
);

const CardTile = ({ card, to }: { card: Card; to: string }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to={to}
      data-cursor="expand"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden aspect-[4/5] block"
    >
      <img
        src={card.photo}
        alt={card.name}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ transform: hovered ? "scale(1.05)" : "scale(1)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 z-10">
        <p className="font-body text-[8px] md:text-[10px] tracking-[0.3em] text-muted-foreground mb-1">
          {card.subtitle}
        </p>
        <h3
          className="font-display text-lg md:text-2xl tracking-[0.05em] text-foreground"
          style={{ fontWeight: 300 }}
        >
          {card.name}
        </h3>
      </div>
      <div className="absolute inset-0 border border-[hsl(0,0%,12%)]" />
    </Link>
  );
};

export default Work;
