import { useEffect, useState } from "react";
import { Plus, Sparkles, Upload, FileUp, Camera, Mic, FolderPlus, Pin, ChevronRight } from "lucide-react";
import { C } from "../services/theme";
import { notesApi } from "../services/api";
import { toDisplayNote } from "../services/noteUtils";
import { Glow } from "../components/common/Glow";
import { Btn } from "../components/common/Button";
import { NoteCard } from "../components/NoteCard";
import { Sidebar } from "../layouts/Sidebar";
import { TopNav } from "../layouts/TopNav";
import { useNavigation } from "../hooks/useNavigation";
import { useAuth } from "../hooks/useAuth";

const QUICK_ACTIONS = [
  { icon: Plus, label: "New Note", c: C.primary },
  { icon: Upload, label: "Upload PDF", c: "#8B5CF6" },
  { icon: FileUp, label: "Import Doc", c: C.accent },
  { icon: Camera, label: "Scan Image", c: "#F59E0B" },
  { icon: Mic, label: "Voice Note", c: C.success },
  { icon: FolderPlus, label: "New Folder", c: "#EC4899" },
];

export default function DashboardPage() {
  const { navigate } = useNavigation();
  const { token, user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadNotes = async () => {
    try {
      const { notes: list } = await notesApi.list(token);
      setNotes(list.map(toDisplayNote));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadNotes(); }, [token]);

  const createNote = async () => {
    const { note } = await notesApi.create(token, { title: "Untitled note", content: "" });
    navigate("editor", { noteId: note._id });
  };

  const pinned = notes.filter(n => n.pinned);
  const recent = notes.filter(n => !n.pinned);
  const aiActionsCount = notes.length; // placeholder metric until AI-usage tracking exists

  return (
    <div className="size-full flex overflow-hidden" style={{ background: C.bg, fontFamily: "'Inter', sans-serif", color: C.text }}>
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <Glow x="-left-48" y="-top-48" size="w-[500px] h-[500px]" color="#6366F1" opacity=".14" />
        <Glow x="-right-40" y="top-1/2" color="#14B8A6" opacity=".08" />
      </div>
      <Sidebar current="dashboard" />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden z-10">
        <TopNav />
        <main className="flex-1 overflow-y-auto px-7 py-6 space-y-6" style={{ scrollbarWidth: "none" }}>

          <section className="rounded-2xl p-7 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg,rgba(99,102,241,.18),rgba(139,92,246,.1),rgba(20,184,166,.08))", border: "1px solid rgba(99,102,241,.22)" }}>
            <div className="absolute -right-12 -top-12 w-52 h-52 rounded-full opacity-20 blur-3xl" style={{ background: "#6366F1" }} />
            <div className="relative flex items-start justify-between">
              <div>
                <h1 className="text-[28px] font-black mb-1.5">Welcome back, {user?.name?.split(" ")[0] || "there"} 👋</h1>
                <p className="text-[14px] mb-5" style={{ color: C.muted }}>Your AI-powered workspace · {notes.length} notes</p>
                <div className="flex gap-3">
                  <Btn onClick={createNote} size="md"><Plus size={14} /> New Note</Btn>
                  <Btn onClick={() => navigate("ai-chat")} variant="outline" size="md"><Sparkles size={14} /> Ask AI</Btn>
                </div>
              </div>
              <div className="flex-shrink-0 flex gap-4">
                {[[String(notes.length), "Notes", C.primary], [String(pinned.length), "Pinned", C.primaryLight], [String(aiActionsCount), "AI Actions", C.accent]].map(([v, l, c]) => (
                  <div key={l} className="text-center px-5 py-3 rounded-2xl" style={{ background: `${c}12`, border: `1px solid ${c}22` }}>
                    <p className="text-[24px] font-black" style={{ color: c }}>{v}</p>
                    <p className="text-[11px] font-medium" style={{ color: C.muted }}>{l}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-2xl p-5" style={{ background: "rgba(30,41,59,.6)", border: `1px solid ${C.hairline}` }}>
            <h2 className="text-[13px] font-bold mb-4">Quick Actions</h2>
            <div className="flex gap-3">
              {QUICK_ACTIONS.map(({ icon: Icon, label, c }) => (
                <button key={label} onClick={() => label === "New Note" && createNote()}
                  className="flex-1 flex flex-col items-center gap-2 py-4 rounded-xl text-[11px] font-semibold transition-all duration-200"
                  style={{ background: `${c}10`, color: c, border: `1px solid ${c}22` }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 6px 18px ${c}25`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                  <Icon size={18} /> {label}
                </button>
              ))}
            </div>
          </section>

          {error && (
            <p className="text-[13px] px-4 py-3 rounded-xl" style={{ background: "rgba(239,68,68,.1)", color: "#FCA5A5", border: "1px solid rgba(239,68,68,.25)" }}>
              {error}
            </p>
          )}

          {loading ? (
            <p className="text-[13px]" style={{ color: C.muted }}>Loading your notes…</p>
          ) : notes.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-[14px] mb-4" style={{ color: C.muted }}>You don't have any notes yet.</p>
              <Btn onClick={createNote} size="md"><Plus size={14} /> Create your first note</Btn>
            </div>
          ) : (
            <>
              {pinned.length > 0 && (
                <section>
                  <div className="flex items-center gap-2 mb-4">
                    <Pin size={14} style={{ color: C.primaryLight }} />
                    <h2 className="text-[14px] font-bold">Pinned Notes</h2>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {pinned.map(n => <NoteCard key={n.id} note={n} onClick={() => navigate("editor", { noteId: n.id })} />)}
                  </div>
                </section>
              )}

              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[14px] font-bold">Recent Notes</h2>
                  <Btn onClick={createNote} variant="ghost" size="sm">New note <ChevronRight size={12} /></Btn>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {recent.map(n => <NoteCard key={n.id} note={n} onClick={() => navigate("editor", { noteId: n.id })} />)}
                </div>
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
