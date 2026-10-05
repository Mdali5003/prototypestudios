import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import CustomCursor from "@/components/CustomCursor";

interface Card {
  slug: string;
  name: string;
  subtitle: string;
  photo: string;
}

const artists: Card[] = [
  { slug: "mahmut-orhan", name: "MAHMUT ORHAN", subtitle: "CENTRAL ASIA TOUR", photo: "/artists/mahmut-orhan.jpg" },
  { slug: "francis-mercier", name: "FRANCIS MERCIER", subtitle: "SAVAYA BALI", photo: "/artists/francis-mercier.jpg" },
  { slug: "aaron-sevilla", name: "AARON SEVILLA", subtitle: "SAVAYA BALI", photo: "/artists/aaron-sevilla.jpg" },
  { slug: "and-friends", name: "&FRIENDS", subtitle: "SAVAYA BALI", photo: "/artists/and-friends.jpg" },
  { slug: "hayden-james", name: "HAYDEN JAMES", subtitle: "SAVAYA BALI", photo: "/artists/hayden-james.jpg" },
  { slug: "moblack", name: "MOBLACK", subtitle: "USHUAIA DUBAI HARBOUR", photo: "/artists/moblack.jpg" },
];

const venues: Card[] = [
  { slug: "ushuaia-dubai-harbour", name: "USHUAIA", subtitle: "DUBAI HARBOUR", photo: "/venues/ushuaia-dubai-harbour.jpg" },
  { slug: "savaya", name: "SAVAYA", subtitle: "BALI", photo: "/venues/savaya.jpg" },
  { slug: "atlassuperclub", name: "ATLAS SUPER CLUB", subtitle: "BALI", photo: "/venues/atlassuperclub.jpg" },
];

const Work = () => {
  const [loaded, setLoaded] = useState(false);

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
