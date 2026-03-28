import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Project {
  id: number;
  title: string;
  subtitle: string;
  slug: string;
  video?: string;
  image?: string;
}

const projects: Project[] = [
  { id: 1, title: "SET RECORDING", subtitle: "FULL SET CAPTURE", slug: "set-recording", video: "/portfolio/set-recording.mp4" },
  { id: 2, title: "SHORT FORM", subtitle: "SOCIAL CONTENT", slug: "short-form", video: "/portfolio/short-form.mp4" },
  { id: 3, title: "AFTERMOVIES & CONCEPTS", subtitle: "EVENT RECAP", slug: "aftermovie" },
  { id: 4, title: "PHOTOS", subtitle: "EVENT PHOTOGRAPHY", slug: "photos" },
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
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/work/${project.slug}`);
  };
  return (
    <div
      data-cursor="expand"
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative aspect-[4/3] md:aspect-[16/10] overflow-hidden group cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        revealed ? "opacity-100" : "opacity-0"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Video or gradient background */}
      {project.video ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ transform: hovered ? "scale(1.05)" : "scale(1)" }}
          src={project.video}
        />
      ) : (
        <div
          className="absolute inset-0 bg-gradient-to-br from-[hsl(0,0%,8%)] via-[hsl(0,0%,5%)] to-[hsl(0,0%,10%)] transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ transform: hovered ? "scale(1.05)" : "scale(1)" }}
        />
      )}

      {/* Hover overlay */}
      <div
        className={`absolute inset-0 bg-background/40 transition-opacity duration-500 ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Title — appears on hover */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <h3
          className={`font-display tracking-[0.05em] text-foreground transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] text-center ${
            hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          } ${project.title.includes("&") ? "text-2xl md:text-4xl" : "text-3xl md:text-5xl"}`}
          style={{ fontWeight: 300 }}
        >
          {project.title.includes("&") ? (
            <>
              {project.title.split("&")[0].trim()}
              <br />
              <span className="text-xl md:text-3xl tracking-[0.08em]">&</span>
              <br />
              <span className="text-xl md:text-3xl tracking-[0.08em]">{project.title.split("&")[1].trim()}</span>
            </>
          ) : (
            project.title
          )}
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
