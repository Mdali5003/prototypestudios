import { useEffect, useRef, useState } from "react";

interface Project {
  id: number;
  title: string;
  subtitle: string;
}

const projects: Project[] = [
  { id: 1, title: "SET RECORDING", subtitle: "DUBAI" },
  { id: 2, title: "AFTERMOVIE", subtitle: "EUROPE TOUR" },
  { id: 3, title: "SHORT FORM", subtitle: "ASIA" },
  { id: 4, title: "MULTICAM", subtitle: "FESTIVAL" },
];

const PortfolioSection = () => {
  const [revealed, setRevealed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setRevealed(true); },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="work" ref={ref} className="relative">
      {/* Section label */}
      <div className="px-8 md:px-12 pt-24 pb-8">
        <p
          className={`font-body text-[11px] tracking-[0.3em] uppercase text-muted-foreground transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          SELECTED WORK
        </p>
      </div>

      {/* Full-bleed grid */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            revealed={revealed}
            index={i}
          />
        ))}
      </div>
    </section>
  );
};

const ProjectCard = ({
  project,
  revealed,
  index,
}: {
  project: Project;
  revealed: boolean;
  index: number;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      data-cursor="expand"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative aspect-[4/3] md:aspect-[16/10] overflow-hidden group transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        revealed ? "opacity-100" : "opacity-0"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Background placeholder */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-[hsl(0,0%,8%)] via-[hsl(0,0%,5%)] to-[hsl(0,0%,10%)] transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ transform: hovered ? "scale(1.05)" : "scale(1)" }}
      />

      {/* Hover overlay */}
      <div
        className={`absolute inset-0 bg-background/40 transition-opacity duration-500 ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Title — appears on hover */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <h3
          className={`font-display text-3xl md:text-5xl tracking-[0.05em] text-foreground transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ fontWeight: 300 }}
        >
          {project.title}
        </h3>
        <p
          className={`font-body text-[11px] tracking-[0.3em] text-muted-foreground mt-3 transition-all duration-700 delay-75 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          {project.subtitle}
        </p>
      </div>

      {/* Thin border */}
      <div className="absolute inset-0 border border-[hsl(0,0%,12%)]" />
    </div>
  );
};

export default PortfolioSection;
