import { useEffect, useRef, useState } from "react";
import { addSubmission } from "@/lib/formStore";

const ContactSection = () => {
  const [revealed, setRevealed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addSubmission(formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" ref={ref} className="py-32 md:py-44 px-8 md:px-12">
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

          <div className="flex justify-center pt-4">
            <button
              type="submit"
              disabled={submitted}
              className={`font-body text-[11px] tracking-[0.25em] uppercase px-10 py-4 border transition-all duration-300 active:scale-[0.97] ${
                submitted
                  ? "border-foreground bg-foreground text-background"
                  : "border-[hsl(0,0%,30%)] text-foreground hover:bg-foreground hover:text-background"
              }`}
            >
              {submitted ? "SENT ✓" : "SUBMIT"}
            </button>
          </div>
        </form>

        <div
          className={`mt-12 space-y-2 transition-all duration-1000 delay-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            revealed ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="font-body text-[11px] tracking-[0.2em] text-muted-foreground">
            youmah.7@gmail.com
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
