import { useEffect, useRef, useState } from "react";
import { addSubmission } from "@/lib/formStore";

// Web3Forms access key — public by design (client-side submission, rate-limited
// and spam-filtered on their end), get/rotate yours at web3forms.com.
const WEB3FORMS_ACCESS_KEY = "d1a3e28b-f18b-4ad2-81da-ae8c58619000";

const ContactSection = () => {
  const [revealed, setRevealed] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setRevealed(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    addSubmission(formData); // local backup copy, visible at /admin on this device

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New inquiry from ${formData.name} — prototypemedia.co`,
          from_name: "Prototype Media website",
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });
      const result = await res.json();
      if (result.success) {
        setStatus("sent");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" ref={ref} className="pt-4 md:pt-6 pb-12 md:pb-16 px-8 md:px-12">
      <div className="max-w-2xl mx-auto text-center">
        <h2
          className={`font-display text-3xl md:text-[3.2rem] leading-[1.1] text-foreground text-balance transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ fontWeight: 300 }}
        >
          LET'S CREATE SOMETHING UNFORGETTABLE.
        </h2>

        <p
          className={`font-body text-[13px] md:text-[14px] text-muted-foreground mt-6 font-light tracking-wide transition-all duration-1000 delay-150 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Available for events, festivals, and brand partnerships worldwide.
        </p>

        <form
          onSubmit={handleSubmit}
          className={`mt-16 space-y-8 text-left transition-all duration-1000 delay-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div>
            <input
              required
              type="text"
              placeholder="NAME"
              value={formData.name}
              onChange={(e) => setFormData(d => ({ ...d, name: e.target.value }))}
              className="w-full bg-transparent border-b border-[hsl(0,0%,20%)] py-4 font-body text-[13px] tracking-[0.15em] text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors duration-300"
            />
          </div>
          <div>
            <input
              required
              type="email"
              placeholder="EMAIL"
              value={formData.email}
              onChange={(e) => setFormData(d => ({ ...d, email: e.target.value }))}
              className="w-full bg-transparent border-b border-[hsl(0,0%,20%)] py-4 font-body text-[13px] tracking-[0.15em] text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors duration-300"
            />
          </div>
          <div>
            <textarea
              required
              rows={3}
              placeholder="TELL US ABOUT YOUR PROJECT"
              value={formData.message}
              onChange={(e) => setFormData(d => ({ ...d, message: e.target.value }))}
              className="w-full bg-transparent border-b border-[hsl(0,0%,20%)] py-4 font-body text-[13px] tracking-[0.15em] text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors duration-300 resize-none"
            />
          </div>

          <div className="flex flex-col items-center gap-3 pt-4">
            <button
              type="submit"
              disabled={status === "sending" || status === "sent"}
              className={`font-body text-[11px] tracking-[0.25em] uppercase px-10 py-4 border transition-all duration-300 active:scale-[0.97] ${
                status === "sent"
                  ? "border-foreground bg-foreground text-background"
                  : "border-[hsl(0,0%,30%)] text-foreground hover:bg-foreground hover:text-background"
              }`}
            >
              {status === "sending" ? "SENDING…" : status === "sent" ? "SENT ✓" : "GET A QUOTE"}
            </button>
            {status === "error" && (
              <p className="font-body text-[11px] tracking-[0.1em] text-red-400">
                Something went wrong — email us directly at contact@prototypemedia.co
              </p>
            )}
          </div>
        </form>

        <div
          className={`mt-12 space-y-2 transition-all duration-1000 delay-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            revealed ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="font-body text-[11px] tracking-[0.2em] text-muted-foreground">
            contact@prototypemedia.co
          </p>
          <p className="font-body text-[11px] tracking-[0.2em] text-muted-foreground">
            +971 509 325 501
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
