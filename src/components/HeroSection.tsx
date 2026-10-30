import { useEffect, useRef, useState } from "react";
import ParticleLogo from "./ParticleLogo";
import MediaTicker from "./MediaTicker";

const BUNNY = "https://player.mediadelivery.net/play/626251";

const setRecording = [
  { src: "/portfolio/set-recording.mp4" },
  { src: "/mahmutorhan/mahmut-1.mp4", link: `${BUNNY}/da8f2729-e563-468d-87c1-aa8b786d23ba` },
  { src: "/portfolio/multicam.mp4" },
  { src: "/amelie-lens/amelie-lens-1.mp4", link: `${BUNNY}/4d746b84-365c-44ba-bdeb-142cef1d26b0` },
  { src: "/portfolio/sr-aaron.mp4", link: `${BUNNY}/e974526f-3cbe-4ae9-a24f-132b950321e2` },
  { src: "/carl-cox/carl-cox-1.mp4", link: `${BUNNY}/6f31517a-b0a4-49d7-94e3-517c307017a0` },
  { src: "/portfolio/sr-amelie-2.mp4", link: `${BUNNY}/a188b935-55fc-4935-86b7-9900896d4d51` },
  { src: "/robin-schulz/robin-schulz-1.mp4", link: `${BUNNY}/046f8943-90fc-4748-837e-384eac7cce14` },
  { src: "/portfolio/sr-b3b-moblack.mp4" },
  { src: "/i-hate-models/i-hate-models-1.mp4", link: `${BUNNY}/639227dc-8731-45c2-bb56-8f0a658411d9` },
  { src: "/portfolio/sr-francis.mp4", link: `${BUNNY}/7d469091-74fd-4da9-87e5-e87118b0fd6c` },
  { src: "/honeyluv/honeyluv-1.mp4", link: `${BUNNY}/3cd3157d-5cfd-4ec7-bda0-95164e86725a` },
  { src: "/portfolio/sr-hilde.mp4", link: "https://www.youtube.com/embed/7BgfGX1m4cw?si=9nfS196G7CpceSlQ" },
  { src: "/armnhmr/armnhmr-1.mp4", link: `${BUNNY}/d99b59d7-8ae5-45c6-a6f5-0cdb0e8db28c` },
  { src: "/portfolio/sr-jean-b.mp4", link: `${BUNNY}/64ee90c2-e304-4a77-b8cb-544956a9a8b2` },
  { src: "/vidojean/vidojean-1.mp4", link: `${BUNNY}/b6cc5cc8-4535-46a7-946d-43155f82897e` },
  { src: "/portfolio/sr-klang.mp4", link: `${BUNNY}/009eb744-ab92-4878-b762-26df971ea8d2` },
  { src: "/hayden-james/hayden-james-1.mp4", link: `${BUNNY}/eb12708b-2dc6-404c-93df-87480859b086` },
  { src: "/ignez/ignez-1.mp4", link: `${BUNNY}/378bf557-aea4-4ba6-9bf2-966bd802f933` },
].map((item) => ({ ...item, type: "video" as const }));

const shortForm = [
  { src: "/portfolio/short-form.mp4" },
  { src: "/mahmutorhan/mahmut-2.mp4", link: `${BUNNY}/84a55271-f505-4c02-b687-83a9b79bd5c3` },
  { src: "/portfolio/short-form-2.mp4" },
  { src: "/amelie-lens/amelie-lens-4.mp4", link: `${BUNNY}/2320c658-277c-4c80-a17d-7134fb047e51` },
  { src: "/portfolio/short-form-3.mp4" },
  { src: "/carl-cox/carl-cox-5.mp4", link: `${BUNNY}/e2d2dc69-b55f-403f-9c94-bb87689dd23e` },
  { src: "/portfolio/short-form-4.mp4" },
  { src: "/robin-schulz/robin-schulz-6.mp4", link: `${BUNNY}/39766dba-6e22-4d69-a85f-651ad4b49dee` },
  { src: "/portfolio/short-form-5.mp4" },
  { src: "/i-hate-models/i-hate-models-4.mp4", link: `${BUNNY}/75c8fc24-7d54-4184-b7e4-b24bbba3aec8` },
  { src: "/portfolio/short-form-6.mp4" },
  { src: "/honeyluv/honeyluv-3.mp4", link: `${BUNNY}/5a155320-71ab-4e85-8334-10ad5c62e626` },
  { src: "/portfolio/short-form-7.mp4" },
  { src: "/armnhmr/armnhmr-3.mp4", link: `${BUNNY}/7a7c1309-0a88-4a42-aed1-f21f19980c0a` },
  { src: "/portfolio/short-form-8.mp4" },
  { src: "/vidojean/vidojean-5.mp4", link: `${BUNNY}/c769c312-509f-4ebe-8562-7bdd3e1c5bfd` },
  { src: "/portfolio/short-form-9.mp4" },
  { src: "/hayden-james/hayden-james-2.mp4", link: `${BUNNY}/e7995440-af10-41cd-a997-7e7bfdfb99a2` },
  { src: "/ignez/ignez-4.mp4", link: `${BUNNY}/790db578-12a6-4671-881f-a2987cd96c01` },
].map((item) => ({ ...item, type: "video" as const }));

const photos = [
  "/portfolio/photos/amelie-1.jpg",
  "/portfolio/photos/amelie-2.jpg",
  "/portfolio/photos/amelie-3.jpg",
  "/portfolio/photos/afrodise-53.jpg",
  "/portfolio/photos/bw-1.jpg",
  "/portfolio/photos/bw-2.jpg",
  "/portfolio/photos/bw-3.jpg",
  "/portfolio/photos/francis-10.jpg",
  "/portfolio/photos/francis-11.jpg",
  "/portfolio/photos/liva-1.jpg",
  "/portfolio/photos/liva-2.jpg",
  "/portfolio/photos/moblack-12.jpg",
].map((src) => ({ src, type: "photo" as const }));

const HeroSection = () => {
  const [visible, setVisible] = useState(false);
  const [logoHeight, setLogoHeight] = useState(180);
  const [playbackOpen, setPlaybackOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);

  // 3D cursor tilt on the hero logo
  useEffect(() => {
    const section = sectionRef.current;
    const tilt = tiltRef.current;
    if (!section || !tilt) return;
    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      tilt.style.transform = `perspective(1000px) rotateY(${px * 22}deg) rotateX(${-py * 22}deg) translateZ(20px)`;
    };
    const onLeave = () => {
      tilt.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px)`;
    };
    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);
    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  useEffect(() => {
    const update = () => setLogoHeight(window.innerWidth < 768 ? 150 : 280);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-background">
      {/* Background: the carousels */}
      <div className="relative z-10 pt-16 md:pt-20 pb-2 md:pb-4">
        <MediaTicker items={setRecording} onPlaybackChange={setPlaybackOpen} />
        <MediaTicker items={shortForm} reverse onPlaybackChange={setPlaybackOpen} />
        <MediaTicker items={photos} onPlaybackChange={setPlaybackOpen} />
      </div>

      {/* Foreground: logo truly centered on the page, flanked by taglines */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-[362px] md:top-[483px] z-40 pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] w-screen flex justify-center md:grid md:grid-cols-[1fr_auto_1fr] items-center gap-6 md:gap-16 px-4 md:px-6 ${
          visible && !playbackOpen ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
        style={{ perspective: "1000px" }}
      >
        <p
          className="hidden md:block justify-self-start font-brand text-[15px] lg:text-[18px] tracking-[0.1em] uppercase text-foreground whitespace-nowrap"
          style={{ fontWeight: 700 }}
        >
          TEAM OF CREATIVES
        </p>

        <div className="relative justify-self-center">
          <div
            className="absolute inset-0 -m-20 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.4) 55%, transparent 75%)",
              filter: "blur(4px)",
            }}
          />
          <div
            ref={tiltRef}
            className="relative transition-transform duration-300 ease-out pointer-events-auto"
            style={{
              transformStyle: "preserve-3d",
              filter: "drop-shadow(0 25px 35px rgba(0,0,0,0.6))",
            }}
          >
            <ParticleLogo src="/logo.png" height={logoHeight} play={visible} />
          </div>
        </div>

        <p
          className="hidden md:block justify-self-end font-brand text-[15px] lg:text-[18px] tracking-[0.1em] uppercase text-foreground whitespace-nowrap"
          style={{ fontWeight: 700 }}
        >
          SPECIALISING IN NIGHTLIFE AND EVENTS
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
