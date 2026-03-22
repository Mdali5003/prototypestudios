import { useEffect, useRef, useState } from "react";
import { Send, Instagram, Mail, Phone } from "lucide-react";

const ContactSection = () => {
  const [revealed, setRevealed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setRevealed(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" ref={ref} className="py-24 md:py-32 px-6 md:px-12 bg-secondary/30">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left */}
        <div
          className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            revealed ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-5 blur-[3px]"
          }`}
        >
          <p className="text-primary text-sm font-semibold tracking-[0.25em] uppercase mb-3">Contact</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Let's work together
          </h2>
          <p className="mt-4 text-muted-foreground text-pretty leading-relaxed">
            Got an event coming up? Need content for your next release? Reach out and let's make something worth watching.
          </p>

          <div className="mt-10 space-y-5">
            <a href="mailto:hello@youmahstudios.com" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group">
              <div className="w-10 h-10 rounded-sm bg-card border border-border flex items-center justify-center group-hover:border-primary/30 transition-colors">
                <Mail size={16} className="text-primary" />
              </div>
              <span className="text-sm">hello@youmahstudios.com</span>
            </a>
            <a href="tel:+1234567890" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group">
              <div className="w-10 h-10 rounded-sm bg-card border border-border flex items-center justify-center group-hover:border-primary/30 transition-colors">
                <Phone size={16} className="text-primary" />
              </div>
              <span className="text-sm">+1 (234) 567-890</span>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group">
              <div className="w-10 h-10 rounded-sm bg-card border border-border flex items-center justify-center group-hover:border-primary/30 transition-colors">
                <Instagram size={16} className="text-primary" />
              </div>
              <span className="text-sm">@youmahstudios</span>
            </a>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className={`space-y-5 transition-all duration-700 delay-150 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            revealed ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-6 blur-[3px]"
          }`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-muted-foreground tracking-wider uppercase block mb-2">Name</label>
              <input
                required
                type="text"
                className="w-full bg-card border border-border rounded-sm px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary transition-shadow"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground tracking-wider uppercase block mb-2">Email</label>
              <input
                required
                type="email"
                className="w-full bg-card border border-border rounded-sm px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary transition-shadow"
                placeholder="you@example.com"
              />
            </div>
          </div>
          <div>
            <label className="text-xs text-muted-foreground tracking-wider uppercase block mb-2">Event Type</label>
            <select className="w-full bg-card border border-border rounded-sm px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-shadow appearance-none">
              <option>Club Night</option>
              <option>Festival</option>
              <option>Private Event</option>
              <option>DJ Promo</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-muted-foreground tracking-wider uppercase block mb-2">Message</label>
            <textarea
              required
              rows={4}
              className="w-full bg-card border border-border rounded-sm px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary transition-shadow resize-none"
              placeholder="Tell me about your event, date, and what kind of content you need..."
            />
          </div>
          <button
            type="submit"
            disabled={submitted}
            className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-sm font-semibold text-sm tracking-wide uppercase active:scale-[0.97] transition-all duration-150 ${
              submitted
                ? "bg-green-600 text-white"
                : "bg-primary text-primary-foreground hover:opacity-90"
            }`}
          >
            {submitted ? "Message Sent ✓" : (
              <>
                <Send size={15} />
                Send Message
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
