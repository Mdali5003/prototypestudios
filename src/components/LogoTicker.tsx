import { useEffect, useRef, useState } from "react";

interface Logo {
  src: string;
  alt: string;
}

const logos: Logo[] = [
  { src: "/logos/ushuaia.jpg", alt: "Ushuaia Dubai" },
  { src: "/logos/soho-garden.png", alt: "Soho Garden" },
  { src: "/logos/surf-club-dubai.png", alt: "Surf Club Dubai" },
  { src: "/logos/klangunstler.jpg", alt: "Klangkuenstler" },
  { src: "/logos/mo-black.png", alt: "MoBlack" },
  { src: "/logos/gioli-assia.png", alt: "Gioli & Assia" },
  { src: "/logos/aaron-sevilla.png", alt: "Aaron Sevilla" },
  { src: "/logos/i-hate-models.png", alt: "I Hate Models" },
  { src: "/logos/shimza.webp", alt: "Shimza" },
];

const LogoTicker = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<Logo[]>(logos);

  // Duplicate logos in JS to ensure seamless loop (at least 2x for translate -50%)
  useEffect(() => {
    setItems([...logos, ...logos]);
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden bg-background py-12 md:py-16"
      style={{
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        maskImage:
          "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
      }}
    >
      <div
        ref={trackRef}
        className="flex w-max animate-ticker hover:[animation-play-state:paused]"
      >
        {items.map((logo, i) => (
          <div
            key={`${logo.src}-${i}`}
            className="flex items-center justify-center px-10 md:px-14 py-4 border-r border-[hsl(0,0%,12%)] shrink-0"
          >
            <img
              src={logo.src}
              alt={logo.alt}
              loading="lazy"
              className="h-10 md:h-12 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default LogoTicker;
