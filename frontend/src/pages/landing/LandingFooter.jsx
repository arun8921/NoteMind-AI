import { Brain } from "lucide-react";
import { C } from "../../services/theme";

export function LandingFooter() {
  return (
    <footer className="px-8 py-10" style={{ borderTop: `1px solid ${C.hairline}` }}>
      <div className="flex items-center justify-between max-w-5xl mx-auto">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg,#6366F1,#8B5CF6)" }}>
            <Brain size={13} color="#fff" />
          </div>
          <span className="text-[13px] font-bold">NoteMind<span style={{ color: C.primaryLight }}> AI</span></span>
        </div>
        <p className="text-[12px]" style={{ color: "#475569" }}>© 2026 NoteMind AI. Built for thinkers.</p>
        <div className="flex gap-4">
          {["Privacy", "Terms", "Support"].map(l => (
            <button key={l} className="text-[12px] transition-colors duration-200" style={{ color: "#475569" }}
              onMouseEnter={e => (e.currentTarget.style.color = C.text)}
              onMouseLeave={e => (e.currentTarget.style.color = "#475569")}>{l}</button>
          ))}
        </div>
      </div>
    </footer>
  );
}
