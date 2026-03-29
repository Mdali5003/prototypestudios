const Footer = () => (
  <footer className="relative border-t border-[hsl(0,0%,12%)]">
    {/* Francis photo banner */}
    <div className="relative w-full h-64 md:h-96 overflow-hidden">
      <img
        src="/portfolio/photos/francis-10.jpg"
        alt="Francis live performance"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-background/50" />
    </div>

    {/* Footer text */}
    <div className="py-10 px-8 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-body text-[11px] tracking-[0.25em] uppercase text-muted-foreground">
          PROTOTYPE STUDIOS
        </p>
        <p className="font-body text-[10px] tracking-[0.15em] text-muted-foreground/60">
          © {new Date().getFullYear()} ALL RIGHTS RESERVED
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
