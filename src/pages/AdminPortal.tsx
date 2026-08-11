import { useState, useEffect } from "react";
import { getSubmissions, FormSubmission } from "@/lib/formStore";
import { useNavigate } from "react-router-dom";

// NOTE: Submissions are stored in this browser's localStorage only. This page
// renders data the visitor already owns, so there is nothing here to gate.
// A client-side password check would be trivially bypassable and would give a
// false sense of protection. Real access control requires a backend.
const AdminPortal = () => {
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setSubmissions(getSubmissions());
  }, []);


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

        <p className="font-body text-[11px] tracking-[0.15em] text-muted-foreground/70 leading-relaxed border border-[hsl(0,0%,12%)] p-4 mb-10">
          LOCAL PREVIEW ONLY — RESPONSES ARE SAVED IN THIS BROWSER AND ARE NOT SENT ANYWHERE.
          FORMS SUBMITTED BY VISITORS ON OTHER DEVICES WILL NOT APPEAR HERE.
        </p>



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
