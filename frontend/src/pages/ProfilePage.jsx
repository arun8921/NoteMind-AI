import { useEffect, useState } from "react";
import { Pencil, Check, FileText, Sparkles, Clock, TrendingUp, CreditCard, HardDrive, LogOut } from "lucide-react";
import { C } from "../services/theme";
import { notesApi } from "../services/api";
import { Glow } from "../components/common/Glow";
import { GlassCard } from "../components/common/GlassCard";
import { Btn } from "../components/common/Button";
import { Sidebar } from "../layouts/Sidebar";
import { TopNav } from "../layouts/TopNav";
import { useAuth } from "../hooks/useAuth";
import { useNavigation } from "../hooks/useNavigation";

export default function ProfilePage() {
  const { user, token, updateProfile, logout } = useAuth();
  const { navigate } = useNavigation();
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [saving, setSaving] = useState(false);
  const [notesCount, setNotesCount] = useState(null);

  useEffect(() => {
    notesApi.list(token).then(({ notes }) => setNotesCount(notes.length)).catch(() => setNotesCount(0));
  }, [token]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateProfile({ name, bio });
      setEditMode(false);
    } finally {
      setSaving(false);
    }
  };

  const STATS = [
    { icon: FileText, label: "Notes Created", value: notesCount === null ? "…" : String(notesCount), color: C.primary },
    { icon: Sparkles, label: "AI Actions Used", value: "—", color: "#8B5CF6" },
    { icon: Clock, label: "Hours Writing", value: "—", color: C.accent },
    { icon: TrendingUp, label: "Day Streak", value: "—", color: C.success },
  ];

  return (
    <div className="size-full flex overflow-hidden" style={{ background: C.bg, fontFamily: "'Inter', sans-serif", color: C.text }}>
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <Glow x="-left-48" y="-top-48" color="#6366F1" opacity=".1" />
      </div>
      <Sidebar current="dashboard" />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden z-10">
        <TopNav title="Profile" />
        <main className="flex-1 overflow-y-auto px-8 py-8" style={{ scrollbarWidth: "none" }}>
          <div className="max-w-3xl mx-auto space-y-6">

            <GlassCard className="p-8 relative overflow-hidden">
              <div className="absolute inset-0 opacity-30" style={{ background: "linear-gradient(135deg,rgba(99,102,241,.2),rgba(20,184,166,.1))" }} />
              <div className="relative flex items-start gap-6">
                <div className="relative flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-[28px] font-black"
                    style={{ background: "linear-gradient(135deg,#6366F1,#14B8A6)", color: "#fff", boxShadow: "0 0 30px rgba(99,102,241,.4)" }}>
                    {(user?.name || "?")[0].toUpperCase()}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    {editMode
                      ? <input value={name} onChange={e => setName(e.target.value)} className="text-[22px] font-black bg-transparent outline-none border-b" style={{ color: C.text, borderColor: C.primary }} />
                      : <h2 className="text-[22px] font-black">{user?.name}</h2>}
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold" style={{ background: "rgba(99,102,241,.25)", color: C.primaryLight }}>{user?.plan?.toUpperCase() || "FREE"}</span>
                  </div>
                  <p className="text-[13px] mb-3" style={{ color: C.muted }}>{user?.email}</p>
                  {editMode
                    ? <textarea value={bio} onChange={e => setBio(e.target.value)} rows={2} placeholder="Write a short bio…" className="text-[13px] bg-transparent outline-none resize-none w-full border-b leading-relaxed" style={{ color: C.muted, borderColor: C.border }} />
                    : <p className="text-[13px] leading-relaxed" style={{ color: C.muted }}>{user?.bio || "No bio yet."}</p>}
                </div>
                <div className="flex gap-2">
                  <Btn onClick={editMode ? handleSave : () => setEditMode(true)} disabled={saving} variant={editMode ? "primary" : "outline"} size="sm">
                    {editMode ? <><Check size={13} /> {saving ? "Saving…" : "Save"}</> : <><Pencil size={13} /> Edit</>}
                  </Btn>
                  <Btn onClick={() => { logout(); navigate("landing"); }} variant="ghost" size="sm"><LogOut size={13} /> Log out</Btn>
                </div>
              </div>
            </GlassCard>

            <div className="grid grid-cols-4 gap-4">
              {STATS.map(({ icon: Icon, label, value, color }) => (
                <GlassCard key={label} className="p-5 text-center">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background: `${color}15` }}>
                    <Icon size={18} style={{ color }} />
                  </div>
                  <p className="text-[24px] font-black mb-1">{value}</p>
                  <p className="text-[11px]" style={{ color: C.muted }}>{label}</p>
                </GlassCard>
              ))}
            </div>

            <GlassCard className="p-6">
              <h3 className="text-[14px] font-bold mb-5 flex items-center gap-2"><CreditCard size={15} style={{ color: C.primaryLight }} /> Subscription</h3>
              <div className="flex items-center justify-between p-4 rounded-xl" style={{ background: "linear-gradient(135deg,rgba(99,102,241,.12),rgba(139,92,246,.08))", border: "1px solid rgba(99,102,241,.22)" }}>
                <div>
                  <p className="text-[15px] font-bold">{user?.plan || "Free"} plan</p>
                  <p className="text-[12px] mt-0.5" style={{ color: C.muted }}>Billing isn't wired up yet in this build.</p>
                </div>
                <Btn variant="outline" size="sm" disabled>Manage Plan</Btn>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="text-[14px] font-bold mb-5 flex items-center gap-2"><HardDrive size={15} style={{ color: C.accent }} /> Notes</h3>
              <p className="text-[13px]" style={{ color: C.muted }}>
                You have <span style={{ color: C.primaryLight, fontWeight: 600 }}>{notesCount ?? "…"}</span> notes stored in MongoDB.
              </p>
            </GlassCard>

          </div>
        </main>
      </div>
    </div>
  );
}
