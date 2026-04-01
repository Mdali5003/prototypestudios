import { useState, useEffect } from "react";
import { X } from "lucide-react";

const navLinks = [
  { label: "WORK", href: "#work" },
  { label: "ABOUT", href: "#about" },
  { label: "CONTACT", href: "#contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-opacity duration-1000 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="w-full px-8 md:px-12 flex items-center justify-between h-20">
          <a
            href="#"
            className="font-body text-[11px] font-medium tracking-[0.3em] uppercase text-foreground"
          >
            PROTOTYPE MEDIA
          </a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="font-body text-[11px] tracking-[0.25em] text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden text-foreground p-2 active:scale-95 transition-transform"
            aria-label="Open menu"
          >
            <div className="flex flex-col gap-1.5">
              <div className="w-5 h-px bg-foreground" />
              <div className="w-5 h-px bg-foreground" />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center gap-10 animate-fade-in">
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-6 right-8 text-foreground"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="font-display text-3xl tracking-[0.15em] text-foreground hover:text-muted-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
};

export default Navbar;
