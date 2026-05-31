import { useEffect, useRef, useState } from "react";

interface Logo {
  src: string;
  alt: string;
}

const logos: Logo[] = [
  { src: "/logos/savaya.png", alt: "Savaya" },
  { src: "/logos/ushuaia.png", alt: "Ushuaia Dubai" },
  { src: "/logos/soho-garden.png", alt: "Soho Garden" },
  { src: "/logos/surf-club-dubai.png", alt: "Surf Club Dubai" },
  { src: "/logos/klangunstler.jpg", alt: "Klangkuenstler" },
  { src: "/logos/amelie-lens.png", alt: "Amelie Lens" },
  { src: "/logos/francis-mercier.png", alt: "Francis Mercier" },
  { src: "/logos/mo-black.png", alt: "MoBlack" },
  { src: "/logos/gioli-assia.png", alt: "Gioli & Assia" },
  { src: "/logos/aaron-sevilla.png", alt: "Aaron Sevilla" },
  { src: "/logos/i-hate-models.png", alt: "I Hate Models" },
  { src: "/logos/shimza.webp", alt: "Shimza" },
  { src: "/logos/mahmut-orhan.png", alt: "Mahmut Orhan" },
  { src: "/logos/be-beach.png", alt: "Be Beach Dubai" },
  { src: "/logos/atlas-super-club.png", alt: "Atlas Super Club" },
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
      className="relative w-full overflow-hidden bg-background py-5 md:py-6"
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
        {items.map((logo, i) => {
          const larger = ["Ushuaia Dubai", "Klangkuenstler", "Surf Club Dubai", "Mahmut Orhan", "Be Beach Dubai", "Atlas Super Club"].includes(logo.alt);
          return (
            <div
              key={`${logo.src}-${i}`}
              className="flex items-center justify-center w-[200px] md:w-[260px] h-24 md:h-28 px-6 md:px-8 border-r border-[hsl(0,0%,12%)] shrink-0"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                loading="lazy"
                className={`${larger ? "max-h-14 md:max-h-20" : "max-h-11 md:max-h-14"} max-w-full w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300`}
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default LogoTicker;
