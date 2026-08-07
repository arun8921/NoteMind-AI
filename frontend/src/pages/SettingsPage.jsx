import { useState } from "react";
import { Palette, Moon, Sun, Layers, Globe2, ChevronDown, Brain, Sparkles, BellRing, Shield, AlertCircle, Download, Trash, X } from "lucide-react";
import { C } from "../services/theme";
import { Glow } from "../components/common/Glow";
import { GlassCard } from "../components/common/GlassCard";
import { Btn } from "../components/common/Button";
import { Toggle } from "../components/common/Toggle";
import { Sidebar } from "../layouts/Sidebar";
import { TopNav } from "../layouts/TopNav";

const AI_MODELS = [["gpt-4o", "GPT-4o", "Fastest"], ["gpt-4-turbo", "GPT-4 Turbo", "Smartest"], ["gpt-3.5", "GPT-3.5", "Economy"]];
const THEMES = ["dark", "light", "system"];
const NOTIF_ROWS = [
  { label: "Push notifications", sub: "Get notified about AI completions" },
  { label: "Weekly digest", sub: "Summary of your notes and AI actions" },
  { label: "Product updates", sub: "New features and announcements" },
];

export default function SettingsPage() {
  const [notifs, setNotifs] = useState(true);
  const [aiSuggest, setAiSuggest] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [aiModel, setAiModel] = useState("gpt-4o");
  const [theme, setTheme] = useState("dark");
  const [lang] = useState("English");

  return (
    <div className="size-full flex overflow-hidden" style={{ background: C.bg, fontFamily: "'Inter', sans-serif", color: C.text }}>
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <Glow x="-left-48" y="-top-48" color="#6366F1" opacity=".08" />
      </div>
      <Sidebar current="dashboard" />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden z-10">
        <TopNav title="Settings" />
        <main className="flex-1 overflow-y-auto px-8 py-8" style={{ scrollbarWidth: "none" }}>
          <div className="max-w-2xl mx-auto space-y-5">

            <GlassCard className="p-6">
              <h3 className="text-[14px] font-bold mb-5 flex items-center gap-2"><Palette size={15} style={{ color: C.primaryLight }} /> Appearance</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-[13px] font-semibold block mb-3" style={{ color: C.muted }}>Theme</label>
                  <div className="flex gap-3">
                    {THEMES.map(t => (
                      <button key={t} onClick={() => setTheme(t)}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 capitalize"
                        style={{ background: theme === t ? "rgba(99,102,241,.2)" : "rgba(148,163,184,.07)", color: theme === t ? C.primaryLight : C.muted, border: theme === t ? "1px solid rgba(99,102,241,.35)" : `1px solid ${C.hairline}` }}>
                        {t === "dark" ? <Moon size={13} /> : t === "light" ? <Sun size={13} /> : <Layers size={13} />}
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between py-3" style={{ borderTop: `1px solid ${C.hairline}` }}>
                  <div>
                    <p className="text-[13px] font-semibold">Auto-save</p>
                    <p className="text-[12px]" style={{ color: C.muted }}>Automatically save notes as you type</p>
                  </div>
                  <Toggle on={autoSave} onToggle={() => setAutoSave(!autoSave)} />
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="text-[14px] font-bold mb-5 flex items-center gap-2"><Globe2 size={15} style={{ color: C.accent }} /> Language & Region</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[13px] font-semibold">Display language</p>
                  <p className="text-[12px]" style={{ color: C.muted }}>Choose your preferred language</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer" style={{ background: "rgba(148,163,184,.08)", border: `1px solid ${C.hairline}` }}>
                  <span className="text-[13px]">{lang}</span>
                  <ChevronDown size={13} style={{ color: C.muted }} />
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="text-[14px] font-bold mb-5 flex items-center gap-2"><Brain size={15} style={{ color: C.primaryLight }} /> AI Configuration</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-[13px] font-semibold block mb-3" style={{ color: C.muted }}>AI Model</label>
                  <div className="flex gap-3 flex-wrap">
                    {AI_MODELS.map(([val, name, badge]) => (
                      <button key={val} onClick={() => setAiModel(val)}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200"
                        style={{ background: aiModel === val ? "rgba(99,102,241,.2)" : "rgba(148,163,184,.07)", color: aiModel === val ? C.primaryLight : C.muted, border: aiModel === val ? "1px solid rgba(99,102,241,.35)" : `1px solid ${C.hairline}` }}>
                        <Sparkles size={12} />
                        {name}
                        <span className="text-[10px] px-1.5 py-0.5 rounded-md" style={{ background: "rgba(148,163,184,.12)", color: "#64748B" }}>{badge}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between py-3" style={{ borderTop: `1px solid ${C.hairline}` }}>
                  <div>
                    <p className="text-[13px] font-semibold">AI Suggestions</p>
                    <p className="text-[12px]" style={{ color: C.muted }}>Show inline AI writing suggestions</p>
                  </div>
                  <Toggle on={aiSuggest} onToggle={() => setAiSuggest(!aiSuggest)} />
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="text-[14px] font-bold mb-5 flex items-center gap-2"><BellRing size={15} style={{ color: "#F59E0B" }} /> Notifications</h3>
              <div className="space-y-4">
                {NOTIF_ROWS.map(({ label, sub }, i) => (
                  <div key={label} className={`flex items-center justify-between py-3 ${i > 0 ? "border-t" : ""}`} style={{ borderColor: C.hairline }}>
                    <div>
                      <p className="text-[13px] font-semibold">{label}</p>
                      <p className="text-[12px]" style={{ color: C.muted }}>{sub}</p>
                    </div>
                    <Toggle on={i === 0 ? notifs : i === 1 ? false : true} onToggle={i === 0 ? () => setNotifs(!notifs) : () => {}} />
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="text-[14px] font-bold mb-5 flex items-center gap-2"><Shield size={15} style={{ color: C.success }} /> Privacy & Security</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3" style={{ borderBottom: `1px solid ${C.hairline}` }}>
                  <div>
                    <p className="text-[13px] font-semibold">Two-factor authentication</p>
                    <p className="text-[12px]" style={{ color: C.muted }}>Secure your account with 2FA</p>
                  </div>
                  <Toggle on={twoFactor} onToggle={() => setTwoFactor(!twoFactor)} />
                </div>
                <div className="flex items-center justify-between py-3" style={{ borderBottom: `1px solid ${C.hairline}` }}>
                  <div>
                    <p className="text-[13px] font-semibold">Data usage for AI training</p>
                    <p className="text-[12px]" style={{ color: C.muted }}>Allow anonymous usage data to improve AI</p>
                  </div>
                  <Toggle on={false} onToggle={() => {}} />
                </div>
                <Btn variant="outline" size="sm" className="w-full"><Download size={13} /> Export All Notes (JSON)</Btn>
              </div>
            </GlassCard>

            <GlassCard className="p-6" style={{ border: "1px solid rgba(239,68,68,.2)" }}>
              <h3 className="text-[14px] font-bold mb-5 flex items-center gap-2" style={{ color: "#FCA5A5" }}>
                <AlertCircle size={15} style={{ color: C.danger }} /> Danger Zone
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between px-4 py-3.5 rounded-xl" style={{ background: "rgba(239,68,68,.06)", border: "1px solid rgba(239,68,68,.15)" }}>
                  <div>
                    <p className="text-[13px] font-semibold">Delete all notes</p>
                    <p className="text-[12px]" style={{ color: C.muted }}>Permanently delete all 128 notes</p>
                  </div>
                  <Btn variant="danger" size="sm"><Trash size={12} /> Delete All</Btn>
                </div>
                <div className="flex items-center justify-between px-4 py-3.5 rounded-xl" style={{ background: "rgba(239,68,68,.06)", border: "1px solid rgba(239,68,68,.15)" }}>
                  <div>
                    <p className="text-[13px] font-semibold">Delete account</p>
                    <p className="text-[12px]" style={{ color: C.muted }}>Permanently delete your account and all data</p>
                  </div>
                  <Btn variant="danger" size="sm"><X size={12} /> Delete Account</Btn>
                </div>
              </div>
            </GlassCard>

          </div>
        </main>
      </div>
    </div>
  );
}
