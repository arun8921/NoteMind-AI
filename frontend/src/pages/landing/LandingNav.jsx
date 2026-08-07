import { Brain } from "lucide-react";
import { C } from "../../services/theme";
import { Btn } from "../../components/common/Button";
import { useNavigation } from "../../hooks/useNavigation";

export function LandingNav() {
  const { navigate } = useNavigation();
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-4"
      style={{ background: "rgba(15,23,42,.88)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${C.hairline}` }}>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg,#6366F1,#8B5CF6)", boxShadow: "0 0 18px rgba(99,102,241,.45)" }}>
          <Brain size={15} color="#fff" />
        </div>
        <span className="text-[15px] font-bold">NoteMind<span style={{ color: C.primaryLight }}> AI</span></span>
      </div>
      <div className="flex items-center gap-6 text-[13px]" style={{ color: C.muted }}>
        {["Features", "Pricing", "Blog", "Docs"].map(l => (
          <button key={l} className="transition-colors duration-200 hover:text-white" style={{ color: C.muted }}
            onMouseEnter={e => (e.currentTarget.style.color = C.text)}
            onMouseLeave={e => (e.currentTarget.style.color = C.muted)}>{l}</button>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <Btn onClick={() => navigate("login")} variant="ghost" size="sm">Sign in</Btn>
        <Btn onClick={() => navigate("register")} size="sm">Get Started</Btn>
      </div>
    </nav>
  );
}
