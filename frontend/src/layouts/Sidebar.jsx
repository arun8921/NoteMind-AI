import { Brain, Plus, ChevronRight, Settings, User, LogOut, HardDrive } from "lucide-react";
import { C } from "../services/theme";
import { NAV } from "../services/navData";
import { Btn } from "../components/common/Button";
import { useNavigation } from "../hooks/useNavigation";

const ACCOUNT_ITEMS = [
  { icon: Settings, label: "Settings", page: "settings" },
  { icon: User, label: "Profile", page: "profile" },
];

// `current` is passed explicitly per page (rather than read from context)
// because a couple of pages intentionally keep the "Dashboard" group
// highlighted even while on Profile/Settings — matches original design.
export function Sidebar({ current }) {
  const { navigate } = useNavigation();

  return (
    <aside className="relative z-10 flex-shrink-0 flex flex-col"
      style={{ width: 232, background: "rgba(15,23,42,.9)", backdropFilter: "blur(24px)", borderRight: `1px solid ${C.hairline}` }}>

      <div className="flex items-center gap-3 px-5 pt-6 pb-5">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "linear-gradient(135deg,#6366F1,#8B5CF6)", boxShadow: "0 0 22px rgba(99,102,241,.5)" }}>
          <Brain size={17} color="#fff" />
        </div>
        <span className="text-[15px] font-bold tracking-tight">
          NoteMind<span style={{ color: C.primaryLight }}> AI</span>
        </span>
      </div>

      <div className="px-4 mb-4">
        <Btn onClick={() => navigate("editor")} className="w-full" size="md">
          <Plus size={14} /> New Note
        </Btn>
      </div>

      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-[.12em]" style={{ color: "#475569" }}>Workspace</p>
        {NAV.map(({ icon: Icon, label, page }) => {
          const active = current === page && (page === "dashboard" || page === "editor" || page === "ai-chat");
          return (
            <button key={label} onClick={() => navigate(page)}
              className="w-full flex items-center gap-3 px-3 py-[9px] rounded-xl text-[13px] font-medium transition-all duration-200"
              style={{ background: active ? "rgba(99,102,241,.15)" : "transparent", color: active ? C.primaryLight : C.muted, border: active ? `1px solid rgba(99,102,241,.22)` : "1px solid transparent" }}
              onMouseEnter={e => { if (!active) { e.currentTarget.style.background = C.hairline; e.currentTarget.style.color = C.text; } }}
              onMouseLeave={e => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.muted; } }}>
              <Icon size={15} />
              <span className="flex-1 text-left">{label}</span>
              {active && <ChevronRight size={12} style={{ color: C.primary }} />}
            </button>
          );
        })}

        <p className="px-3 mt-4 mb-2 text-[10px] font-semibold uppercase tracking-[.12em]" style={{ color: "#475569" }}>Account</p>
        {ACCOUNT_ITEMS.map(({ icon: Icon, label, page }) => (
          <button key={label} onClick={() => navigate(page)}
            className="w-full flex items-center gap-3 px-3 py-[9px] rounded-xl text-[13px] font-medium transition-all duration-200"
            style={{ color: C.muted }}
            onMouseEnter={e => { e.currentTarget.style.background = C.hairline; e.currentTarget.style.color = C.text; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.muted; }}>
            <Icon size={15} /> {label}
          </button>
        ))}
      </nav>

      <div className="px-4 pb-2">
        <div className="px-3 py-2 rounded-xl" style={{ background: "rgba(148,163,184,.05)" }}>
          <div className="flex justify-between text-[11px] mb-1.5" style={{ color: C.muted }}>
            <span className="flex items-center gap-1"><HardDrive size={10} /> Storage</span>
            <span style={{ color: C.primaryLight }}>3.2 / 10 GB</span>
          </div>
          <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(148,163,184,.12)" }}>
            <div className="h-full rounded-full" style={{ width: "32%", background: "linear-gradient(90deg,#6366F1,#8B5CF6)" }} />
          </div>
        </div>
      </div>

      <div className="mx-3 mb-4 p-3 rounded-xl flex items-center gap-3"
        style={{ background: "rgba(148,163,184,.06)", border: `1px solid ${C.hairline}` }}>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[13px] font-bold flex-shrink-0"
          style={{ background: "linear-gradient(135deg,#6366F1,#14B8A6)", color: "#fff" }}>A</div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold truncate">Arun S</p>
          <span className="text-[10px] px-1.5 py-0.5 rounded-md font-bold" style={{ background: "rgba(99,102,241,.2)", color: C.primaryLight }}>PRO</span>
        </div>
        <button onClick={() => {}} style={{ color: "#475569" }}
          onMouseEnter={e => (e.currentTarget.style.color = C.danger)}
          onMouseLeave={e => (e.currentTarget.style.color = "#475569")}>
          <LogOut size={14} />
        </button>
      </div>
    </aside>
  );
}
