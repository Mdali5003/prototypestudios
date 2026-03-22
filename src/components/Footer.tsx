const Footer = () => (
  <footer className="py-8 px-6 md:px-12 border-t border-border">
    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="font-bold text-sm tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        YOUMAH<span className="text-primary">.</span>
      </p>
      <p className="text-xs text-muted-foreground">
        © {new Date().getFullYear()} Youmah Studios. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
