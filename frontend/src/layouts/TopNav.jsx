import { useState } from "react";
import { Search, Plus, Bell, Moon, Sun } from "lucide-react";
import { C } from "../services/theme";
import { Btn } from "../components/common/Button";
import { useNavigation } from "../hooks/useNavigation";

export function TopNav({ title }) {
  const { navigate } = useNavigation();
  const [dark, setDark] = useState(true);
  const [q, setQ] = useState("");
  const [focus, setFocus] = useState(false);

  return (
    <header className="flex-shrink-0 flex items-center gap-4 px-6 py-3.5 z-10"
      style={{ background: "rgba(15,23,42,.88)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${C.hairline}` }}>
      {title && <h1 className="text-[15px] font-semibold mr-2 flex-shrink-0" style={{ color: C.text }}>{title}</h1>}
      <div className="flex-1 max-w-lg flex items-center gap-2.5 px-4 py-2.5 rounded-xl transition-all duration-200"
        style={{ background: focus ? "rgba(99,102,241,.08)" : "rgba(30,41,59,.9)", border: focus ? `1px solid rgba(99,102,241,.4)` : `1px solid ${C.border}`, boxShadow: focus ? "0 0 0 3px rgba(99,102,241,.1)" : "none" }}>
        <Search size={14} style={{ color: "#64748B", flexShrink: 0 }} />
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search notes…"
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-[#475569]"
          style={{ color: C.text }} />
        <kbd className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: "rgba(148,163,184,.1)", color: "#64748B", fontFamily: "monospace" }}>⌘K</kbd>
      </div>
      <div className="flex items-center gap-2 ml-auto">
        <Btn onClick={() => navigate("editor")} size="sm"><Plus size={13} /> New Note</Btn>
        <button className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
          style={{ background: "rgba(30,41,59,.9)", border: `1px solid ${C.border}` }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(99,102,241,.12)")}
          onMouseLeave={e => (e.currentTarget.style.background = "rgba(30,41,59,.9)")}>
          <Bell size={14} style={{ color: C.muted }} />
          <span className="absolute top-1.5 right-1.5 w-[7px] h-[7px] rounded-full"
            style={{ background: C.primary, boxShadow: "0 0 8px rgba(99,102,241,.9)" }} />
        </button>
        <button onClick={() => setDark(!dark)}
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
          style={{ background: "rgba(30,41,59,.9)", border: `1px solid ${C.border}` }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(99,102,241,.12)")}
          onMouseLeave={e => (e.currentTarget.style.background = "rgba(30,41,59,.9)")}>
          {dark ? <Moon size={14} style={{ color: C.muted }} /> : <Sun size={14} style={{ color: C.muted }} />}
        </button>
        <button onClick={() => navigate("profile")}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-[13px] font-bold transition-all duration-200"
          style={{ background: "linear-gradient(135deg,#6366F1,#14B8A6)", color: "#fff", boxShadow: "0 0 14px rgba(99,102,241,.35)" }}
          onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 0 22px rgba(99,102,241,.55)")}
          onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 0 14px rgba(99,102,241,.35)")}>
          A
        </button>
      </div>
    </header>
  );
}
