import { useState, useEffect } from "react";
import { getSubmissions, FormSubmission } from "@/lib/formStore";
import { useNavigate } from "react-router-dom";

const ADMIN_PASSWORD = "prototype2024";

const AdminPortal = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (authenticated) {
      setSubmissions(getSubmissions());
    }
  }, [authenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password");
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-6">
          <h1 className="font-display text-2xl text-foreground text-center tracking-wide" style={{ fontWeight: 300 }}>
            ADMIN ACCESS
          </h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="PASSWORD"
            className="w-full bg-transparent border-b border-[hsl(0,0%,20%)] py-4 font-body text-[13px] tracking-[0.15em] text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors duration-300"
          />
          {error && <p className="font-body text-[11px] text-red-500 tracking-wide">{error}</p>}
          <button
            type="submit"
            className="w-full font-body text-[11px] tracking-[0.25em] uppercase px-10 py-4 border border-[hsl(0,0%,30%)] text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
          >
            ENTER
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full font-body text-[11px] tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors"
          >
            ← BACK TO SITE
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground px-6 md:px-12 py-16">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h1 className="font-display text-2xl md:text-3xl tracking-wide" style={{ fontWeight: 300 }}>
            FORM RESPONSES
          </h1>
          <div className="flex gap-4">
            <button
              onClick={() => setSubmissions(getSubmissions())}
              className="font-body text-[11px] tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors"
            >
              REFRESH
            </button>
            <button
              onClick={() => navigate("/")}
              className="font-body text-[11px] tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors"
            >
              ← BACK
            </button>
          </div>
        </div>

        {submissions.length === 0 ? (
          <p className="font-body text-[13px] text-muted-foreground tracking-wide text-center py-20">
            NO SUBMISSIONS YET
          </p>
        ) : (
          <div className="space-y-6">
            <p className="font-body text-[11px] tracking-[0.2em] text-muted-foreground">
              {submissions.length} RESPONSE{submissions.length !== 1 ? "S" : ""}
            </p>
            <div className="space-y-px">
              {submissions.map((sub) => (
                <div
                  key={sub.id}
                  className="border border-[hsl(0,0%,12%)] p-6 md:p-8 hover:border-[hsl(0,0%,25%)] transition-colors duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-baseline gap-3">
                        <span className="font-body text-[11px] tracking-[0.2em] text-muted-foreground uppercase">NAME</span>
                        <span className="font-body text-[14px] text-foreground">{sub.name}</span>
                      </div>
                      <div className="flex items-baseline gap-3">
                        <span className="font-body text-[11px] tracking-[0.2em] text-muted-foreground uppercase">EMAIL</span>
                        <a href={`mailto:${sub.email}`} className="font-body text-[14px] text-foreground hover:text-muted-foreground transition-colors">
                          {sub.email}
                        </a>
                      </div>
                      <div className="pt-2">
                        <span className="font-body text-[11px] tracking-[0.2em] text-muted-foreground uppercase block mb-2">MESSAGE</span>
                        <p className="font-body text-[13px] text-foreground/80 leading-relaxed whitespace-pre-wrap">{sub.message}</p>
                      </div>
                    </div>
                    <span className="font-body text-[10px] tracking-[0.15em] text-muted-foreground/60 shrink-0">
                      {new Date(sub.submittedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPortal;
