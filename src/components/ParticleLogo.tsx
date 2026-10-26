import { useEffect, useRef } from "react";

interface ParticleLogoProps {
  src: string;
  height: number;
  className?: string;
  play: boolean;
}

interface Particle {
  tx: number;
  ty: number;
  ox: number;
  oy: number;
  x: number;
  y: number;
  sx: number;
  sy: number;
  r: number;
  g: number;
  b: number;
  a: number;
  delay: number;
  z: number;
}

const DURATION = 900;
const MAX_DELAY = 350;
const REPEL_RADIUS = 80;
const REPEL_STRENGTH = 30;
const EASE = 0.18;

const ParticleLogo = ({ src, height, className, play }: ParticleLogoProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef(0);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const phaseRef = useRef<"reveal" | "idle">("reveal");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 3);
      const scale = height / img.height;
      const w = Math.round(img.width * scale);
      const h = height;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      const sampleCanvas = document.createElement("canvas");
      sampleCanvas.width = w;
      sampleCanvas.height = h;
      const sctx = sampleCanvas.getContext("2d");
      if (!sctx) return;
      sctx.drawImage(img, 0, 0, w, h);
      const data = sctx.getImageData(0, 0, w, h).data;

      const particles: Particle[] = [];
      const step = 1;
      for (let y = 0; y < h; y += step) {
        for (let x = 0; x < w; x += step) {
          const i = (y * w + x) * 4;
          const a = data[i + 3];
          if (a < 40) continue;
          const dist = Math.hypot(x - w / 2, y - h / 2);
          const z = Math.random();
          particles.push({
            tx: x,
            ty: y,
            ox: 0,
            oy: 0,
            x,
            y,
            sx: x + (Math.random() - 0.5) * (120 + z * 100),
            sy: y + (Math.random() - 0.5) * (120 + z * 100) - 30,
            r: data[i],
            g: data[i + 1],
            b: data[i + 2],
            a: a / 255,
            delay: (dist / (w / 2 + h / 2)) * MAX_DELAY + Math.random() * 80,
            z,
          });
        }
      }
      particlesRef.current = particles;
      phaseRef.current = play ? "reveal" : "idle";
      if (!play) {
        particles.forEach((p) => {
          p.x = p.tx;
          p.y = p.ty;
        });
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.scale(dpr, dpr);

      const draw = () => {
        ctx.clearRect(0, 0, w, h);
        for (const p of particlesRef.current) {
          const disp = Math.min(Math.hypot(p.ox, p.oy) / REPEL_STRENGTH, 1);
          const s = step * (1 + disp * p.z * 0.9);
          const a = Math.min(p.a * (1 + disp * 0.35), 1);
          if (disp > 0.05) {
            ctx.shadowColor = `rgba(${p.r},${p.g},${p.b},${Math.min(a * 0.7, 0.6)})`;
            ctx.shadowBlur = disp * p.z * 6;
          } else {
            ctx.shadowBlur = 0;
          }
          ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${a})`;
          ctx.fillRect(p.x - s / 2, p.y - s / 2, s, s);
        }
        ctx.shadowBlur = 0;
      };

      const render = (now: number) => {
        if (phaseRef.current === "reveal") {
          if (startRef.current === null) startRef.current = now;
          const elapsed = now - startRef.current;
          let allDone = true;
          for (const p of particles) {
            const local = elapsed - p.delay;
            const t = Math.min(Math.max(local / DURATION, 0), 1);
            if (t < 1) allDone = false;
            const eased = 1 - Math.pow(1 - t, 3);
            p.x = p.sx + (p.tx - p.sx) * eased;
            p.y = p.sy + (p.ty - p.sy) * eased;
          }
          draw();
          if (allDone) phaseRef.current = "idle";
        } else {
          const m = mouseRef.current;
          for (const p of particles) {
            let desiredOx = 0;
            let desiredOy = 0;
            if (m.active) {
              const dx = p.tx - m.x;
              const dy = p.ty - m.y;
              const dist = Math.hypot(dx, dy);
              if (dist < REPEL_RADIUS && dist > 0.001) {
                const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH * (0.5 + p.z * 1.2);
                desiredOx = (dx / dist) * force;
                desiredOy = (dy / dist) * force;
              }
            }
            p.ox += (desiredOx - p.ox) * EASE;
            p.oy += (desiredOy - p.oy) * EASE;
            p.x = p.tx + p.ox;
            p.y = p.ty + p.oy;
          }
          draw();
        }
        rafRef.current = requestAnimationFrame(render);
      };
      rafRef.current = requestAnimationFrame(render);
    };
    img.src = src;

    const toLocal = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      return { x: clientX - rect.left, y: clientY - rect.top };
    };
    const onMove = (e: MouseEvent) => {
      const { x, y } = toLocal(e.clientX, e.clientY);
      mouseRef.current = { x, y, active: true };
    };
    const onLeave = () => {
      mouseRef.current.active = false;
    };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, [src, height, play]);

  return <canvas ref={canvasRef} className={className} />;
};

export default ParticleLogo;
